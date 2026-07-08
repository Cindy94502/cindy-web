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
      execSync(`unzip -o -q "${zip}" h_lvr_land_a.csv h_lvr_land_a_park.csv -d "${dir}"`)
    }
    if (!existsSync(resolve(dir, 'h_lvr_land_a_park.csv')) && existsSync(zip)) {
      execSync(`unzip -o -q "${zip}" h_lvr_land_a_park.csv -d "${dir}"`)
    }
    // 車位明細檔：主檔車位價常為0，實際車位價/坪要從這裡用編號串接
    const parkBySerial = {}
    try {
      const pRows = parseCSV(readFileSync(resolve(dir, 'h_lvr_land_a_park.csv'), 'utf8').replace(/^﻿/, ''))
      const ph = pRows[0]
      const pi = Object.fromEntries(ph.map((h, i) => [h, i]))
      for (const pr of pRows.slice(2)) {
        const sn = pr[pi['編號']]
        if (!sn) continue
        if (!parkBySerial[sn]) parkBySerial[sn] = { price: 0, sqm: 0 }
        parkBySerial[sn].price += parseInt(pr[pi['車位價格']]) || 0
        parkBySerial[sn].sqm += parseFloat(pr[pi['車位面積平方公尺']]) || 0
      }
    } catch { /* 舊季檔可能沒有車位明細 */ }
    const rows = parseCSV(readFileSync(resolve(dir, 'h_lvr_land_a.csv'), 'utf8').replace(/^﻿/, ''))
    const header = rows[0]
    const idx = Object.fromEntries(header.map((h, i) => [h, i]))
    for (const r of rows.slice(2)) {
      if (r.length < header.length - 1) continue
      const park = parkBySerial[r[idx['編號']]] || { price: 0, sqm: 0 }
      allRows.push({
        district: r[idx['鄉鎮市區']],
        target: r[idx['交易標的']] || '',
        parkCount: parseInt(((r[idx['交易筆棟數']] || '').match(/車位(\d+)/) || [])[1]) || 0,
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
        parkPrice: (parseInt(r[idx['車位總價元']]) || 0) || park.price,
        parkSqm: (parseFloat(r[idx['車位移轉總面積(平方公尺)']] ?? r[idx['車位移轉總面積平方公尺']]) || 0) || park.sqm,
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
  )
  // 社區車位行情回填順序：config 的 parkWan（來自 Cindy 實際物件）> 官方最近一筆有拆價成交
  const byDate = [...deals].sort((a, b) => b.date.localeCompare(a.date))
  const latestPriced = byDate.find(r => r.parkPrice > 0 && r.parkCount > 0)
  const latestSized = byDate.find(r => r.parkSqm > 0 && r.parkCount > 0)
  const estPrice = conf.parkWan ? conf.parkWan * 10000 : latestPriced ? latestPriced.parkPrice / latestPriced.parkCount : 0
  const estSqm = latestSized ? latestSized.parkSqm / latestSized.parkCount : 20 // 無資料時以坡道平面約6坪(20m²)估

  const dealRows = deals.map(r => {
    const hasPark = r.parkCount > 0 || r.parkSqm > 0 || r.parkPrice > 0
    let parkPrice = r.parkPrice, parkSqm = r.parkSqm, estimated = false
    if (hasPark && parkPrice === 0 && (estPrice > 0 || conf.parkTiers)) {
      // 官方沒拆價 → 用社區車位行情估算，標明是估的
      let per = estPrice
      if (conf.parkTiers) {
        // 多種車位價：有車位坪就挑最接近的，沒有就用第一種
        const ping1 = r.parkSqm > 0 ? r.parkSqm * 0.3025 / Math.max(r.parkCount, 1) : 0
        const tier = ping1 > 0
          ? [...conf.parkTiers].sort((a, b) => Math.abs(a.ping - ping1) - Math.abs(b.ping - ping1))[0]
          : conf.parkTiers[0]
        per = tier.wan * 10000
      }
      parkPrice = Math.round(per * Math.max(r.parkCount, 1))
      if (parkSqm === 0 && estSqm > 0) parkSqm = estSqm * Math.max(r.parkCount, 1)
      estimated = true
    }
    // 車位價已知但車位坪缺登記時，坪數也用社區行情回填，房屋坪才不會被灌大
    if (hasPark && parkPrice > 0 && parkSqm === 0 && estSqm > 0) parkSqm = estSqm * Math.max(r.parkCount, 1)
    const splitPark = parkPrice > 0
    const noUnit = hasPark && !splitPark
    const netPrice = splitPark ? r.total - parkPrice : r.total
    const housePing = (r.sqm - parkSqm) * 0.3025  // 房屋坪 = 建物總坪 - 車位坪
    const netPing = noUnit ? 0 : housePing
    const ping = housePing
    return {
      date: `${r.date.slice(0, r.date.length - 4)}/${parseInt(r.date.slice(-4, -2))}`,
      dateRaw: r.date,
      floor: cnFloor(r.floor),
      layout: r.rooms !== '' ? `${r.rooms}房${r.halls}廳${r.baths}衛` : '—',
      rooms: parseInt(r.rooms) || 0,
      ping: Math.round(ping * 10) / 10,
      totalWan: Math.round(r.total / 10000),
      unitWan: !noUnit && netPing > 0 ? Math.round(netPrice / netPing / 10000 * 10) / 10 : null,
      hasPark,
      parkWan: splitPark ? Math.round(parkPrice / 10000) : 0,
      parkPing: parkSqm > 0 ? Math.round(parkSqm * 0.3025 * 10) / 10 : 0,
      parkEst: estimated,
      note: /增建/.test(r.note) ? '含增建' : '',
    }
  }).sort((a, b) => b.dateRaw.localeCompare(a.dateRaw)).slice(0, 12)
  if (dealRows.length) output[p.nodeId] = { community: conf.keyword, deals: dealRows }
}

writeFileSync(resolve('public', 'market-data.json'), JSON.stringify(output, null, 1))
console.log(`完成：${Object.keys(output).length} 個物件有社區行情，寫入 public/market-data.json`)
