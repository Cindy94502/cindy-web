// 為每個物件產生帶正確 OG 標籤的靜態分享頁 dist/p/<nodeId>.html
// LINE/FB 爬蟲讀到正確縮圖後，一般使用者會被導回 property.html?id=xxx
import { mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const JSON_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/refs/heads/main/properties.json'
const SITE_BASE = 'https://cindy94502.github.io/cindy-web'
const FALLBACK_IMG = `${SITE_BASE}/images/welcome.png`

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// 去掉 HTML 標籤（webDescription、wixFeatures 存的是富文本）
const strip = s => String(s ?? '').replace(/<li>/g, '｜').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').replace(/^｜\s*/, '').trim()
// 15880000 → 「1,588 萬」
const priceText = n => n ? `${Number(n / 10000).toLocaleString('en-US')} 萬` : '價格洽談'

import { fetchJSON } from './fetch-retry.mjs'
const props = await fetchJSON(JSON_URL)

const outDir = resolve('dist', 'p')
mkdirSync(outDir, { recursive: true })

let count = 0
for (const p of props) {
  if (!p.nodeId) continue
  // 卡片標題＝物件名＋價格（像公司格式那樣，一眼看得出是哪一間）
  const cardTitle = [p.title, priceText(p.price)].filter(Boolean).join('｜')
  // 瀏覽器分頁／搜尋結果的標題可以長一點，帶上品牌
  const title = `${cardTitle}｜${p.wixLocation || '南崁'}｜Cindy 小薰 南崁在地房產`
  // 卡片說明＝規格＋地段＋前兩個賣點
  const specs = [p.layout, p.buildingCategory, p.wixParking].filter(Boolean).join('・')
  const sells = strip(p.wixFeatures).split('｜').map(x => x.trim()).filter(Boolean).slice(0, 2).join('、')
  const desc = [
    [specs, p.wixLocation].filter(Boolean).join('｜'),
    sells,
  ].filter(Boolean).join('。').slice(0, 110) || '南崁在地房仲，陪你找到對的家。'
  let img = p.ogImageUrl || p.imageUrl || FALLBACK_IMG
  let imgW = 1024, imgH = 768
  if (img.includes('res.cloudinary.com') && img.includes('/upload/')) {
    // 轉成 FB 建議尺寸，抓取更快、卡片比例一致
    img = img.replace('/upload/', '/upload/w_1200,h_630,c_fill,f_jpg,q_auto/')
    imgW = 1200; imgH = 630
  }
  const target = `${SITE_BASE}/property.html?id=${encodeURIComponent(p.nodeId)}`
  const selfUrl = `${SITE_BASE}/p/${encodeURIComponent(p.nodeId)}.html`
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<title>${esc(title)}</title>
<meta property="og:title" content="${esc(cardTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:image:width" content="${imgW}">
<meta property="og:image:height" content="${imgH}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:url" content="${esc(selfUrl)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(img)}">
<script type="application/ld+json">
${JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'RealEstateListing',
  name: p.title || cardTitle,
  url: selfUrl,
  image: img,
  description: desc,
  ...(p.price ? { offers: { '@type': 'Offer', price: p.price, priceCurrency: 'TWD' } } : {}),
  provider: { '@type': 'RealEstateAgent', name: '欣益不動產開發有限公司（中信房屋 南崁一極加盟店）', telephone: '+886-963-585-690', areaServed: '桃園市蘆竹區' },
})}
</script>
<script>location.replace(${JSON.stringify(target)})</script>
</head>
<body><p>跳轉中… <a href="${esc(target)}">${esc(cardTitle)}</a></p></body>
</html>`
  writeFileSync(resolve(outDir, `${p.nodeId}.html`), html)
  count++
}
console.log(`已產生 ${count} 個分享頁到 dist/p/`)
