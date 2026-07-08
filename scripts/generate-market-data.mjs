// 產生 public/market-data.json：每個物件的同社區實價登錄成交明細
// 資料來源：內政部實價登錄開放資料（桃園市 h_lvr_land_a.csv），近 8 季
// 比對：路段 + 完工年；過濾親友/特殊關係/債權/毛胚等失真交易
import { execSync } from 'child_process'
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const PROPS_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/refs/heads/main/properties.json'
const CONFIG = JSON.parse(readFileSync(new URL('./market-config.json', import.meta.url), 'utf8')).communities
const CACHE = resolve(process.env.MARKET_CACHE || 'node_modules/.cache/lvr')
const SEASONS_BACK = 12

function recentSeasons(n) {
  // 民國年季：現在(2026-07) = 115S3；資料延遲，從上一季往回抓
  const now = new Date()
  let y = now.getFullYear() - 1911
  let s = Math.floor(now.getMonth() / 3) + 1
  const out = []
  for (let i = 0; i < n; i++) {
    out.push(`${y}S${s}`)
    s--; if (s === 0) { s = 4; y-- }
  }
  return out
}

function parseCSV(text) {
  const rows = []
  let row = [], field = '', inQ = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQ) {
      if (c === '"') { if (text[i+1] === '"') { field += '"'; i++ } else inQ = false }
      else field += c
    } else if (c === '"') inQ = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n') { row.push(field.replace(/\r$/, '')); rows.push(row); row = []; field = '' }
    else field += c
  }
  if (field || row.length) { row.push(field); rows.push(row) }
  return rows
}

const cnFloor = s => (s || '').replace(/層$/, '樓')

mkdirSync(CACHE, { recursive: true })
const seasons = recentSeasons(SEASONS_BACK)
const allRows = []
for (const season of seasons) {
  const zip = resolve(CACHE, `${season}.zip`)
  const dir = resolve(CACHE, season)
  try {
    if (!existsSync(resolve(dir, 'h_lvr_land_a.csv'))) {
      execSync(`curl -sf -o "${zip}" "https://plvr.land.moi.gov.tw/DownloadSeason?season=${season}&type=zip&fileName=lvr_landcsv.zip"`)
      execSync(`unzip -o -q "${zip}" h_lvr_land_a.csv -d "${dir}"`)
    }
    const rows = parseCSV(readFileSync(resolve(dir, 'h_lvr_land_a.csv'), 'utf8').replace(/^﻿/, ''))
    const header = rows[0]
    const idx = Object.fromEntries(header.map((h, i) => [h, i]))
    for (const r of rows.slice(2)) {
      if (r.length < header.length - 1) continue
      allRows.push({
        district: r[idx['鄉鎮市區']],
        target: r[idx['交易標的']] || '',
        addr: r[idx['土地位置建物門牌']] || '',
        date: r[idx['交易年月日']] || '',
        floor: r[idx['移轉層次']] || '',
        totalFloors: r[idx['總樓層數']] || '',
        done: r[idx['建築完成年月']] || '',
        sqm: parseFloat(r[idx['建物移轉總面積平方公尺']]) || 0,
        rooms: r[idx['建物現況格局-房']] || '',
        halls: r[idx['建物現況格局-廳']] || '',
        baths: r[idx['建物現況格局-衛']] || '',
        total: parseInt(r[idx['總價元']]) || 0,
        parkPrice: parseInt(r[idx['車位總價元']]) || 0,
        parkSqm: parseFloat(r[idx['車位移轉總面積(平方公尺)']] ?? r[idx['車位移轉總面積平方公尺']]) || 0,
        note: r[idx['備註']] || '',
      })
    }
    console.log(`${season} 載入完成`)
  } catch (e) { console.warn(`${season} 抓取失敗（可能尚未釋出）：${e.message.split('\n')[0]}`) }
}

const BAD_NOTE = /親友|特殊關係|債權|債務|毛胚|急買|急賣|瑕疵|受災/

const props = await (await fetch(PROPS_URL)).json()
const output = {}
for (const p of props) {
  const conf = CONFIG.find(c => (p.title || '').includes(c.keyword))
  if (!conf || !p.nodeId) continue
  const deals = allRows.filter(r =>
    r.district === conf.district &&
    r.target.startsWith('房地') &&
    r.addr.includes(conf.road) &&
    r.done.length >= 5 && parseInt(r.done.slice(0, r.done.length - 4)) === conf.year &&
    !BAD_NOTE.test(r.note) &&
    r.total > 0 && r.sqm > 0
  ).map(r => {
    // 車位有標價才拆算單價；有車位但價格登記0元時無法分離，單價不顯示
    const hasPark = r.parkSqm > 0 || r.parkPrice > 0
    const splitPark = r.parkPrice > 0
    const noUnit = hasPark && !splitPark
    const netPrice = splitPark ? r.total - r.parkPrice : r.total
    const netPing = (splitPark ? r.sqm - r.parkSqm : r.sqm) * 0.3025
    const ping = r.sqm * 0.3025
    return {
      date: `${r.date.slice(0, r.date.length - 4)}/${parseInt(r.date.slice(-4, -2))}`,
      dateRaw: r.date,
      floor: cnFloor(r.floor),
      layout: r.rooms ? `${r.rooms}房${r.halls}廳${r.baths}衛` : '—',
      rooms: parseInt(r.rooms) || 0,
      ping: Math.round(ping * 10) / 10,
      totalWan: Math.round(r.total / 10000),
      unitWan: !noUnit && netPing > 0 ? Math.round(netPrice / netPing / 10000 * 10) / 10 : null,
      hasPark,
      parkWan: splitPark ? Math.round(r.parkPrice / 10000) : 0,
      note: /增建/.test(r.note) ? '含增建' : '',
    }
  }).sort((a, b) => b.dateRaw.localeCompare(a.dateRaw)).slice(0, 12)
  if (deals.length) output[p.nodeId] = { community: conf.keyword, deals }
}

writeFileSync(resolve('public', 'market-data.json'), JSON.stringify(output, null, 1))
console.log(`完成：${Object.keys(output).length} 個物件有社區行情，寫入 public/market-data.json`)
