// 為每個物件產生帶正確 OG 標籤的靜態分享頁 dist/p/<nodeId>.html
// LINE/FB 爬蟲讀到正確縮圖後，一般使用者會被導回 property.html?id=xxx
import { mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const JSON_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/refs/heads/main/properties.json'
const SITE_BASE = 'https://cindy94502.github.io/cindy-web'
const FALLBACK_IMG = `${SITE_BASE}/images/welcome.png`

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const res = await fetch(JSON_URL)
if (!res.ok) throw new Error(`properties.json 抓取失敗: ${res.status}`)
const props = await res.json()

const outDir = resolve('dist', 'p')
mkdirSync(outDir, { recursive: true })

let count = 0
for (const p of props) {
  if (!p.nodeId) continue
  const title = p.title || 'Cindy 王小姐｜南崁在地房產'
  const desc = (p.highlights || p.features || '南崁在地房仲，陪你找到對的家。').slice(0, 100)
  const img = p.ogImageUrl || p.imageUrl || FALLBACK_IMG
  const target = `${SITE_BASE}/property.html?id=${encodeURIComponent(p.nodeId)}`
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<title>${esc(title)} | Cindy 王小姐</title>
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${esc(img)}">
<meta property="og:url" content="${esc(target)}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${esc(img)}">
<meta http-equiv="refresh" content="0;url=${esc(target)}">
<script>location.replace(${JSON.stringify(target)})</script>
</head>
<body><p>跳轉中… <a href="${esc(target)}">${esc(title)}</a></p></body>
</html>`
  writeFileSync(resolve(outDir, `${p.nodeId}.html`), html)
  count++
}
console.log(`已產生 ${count} 個分享頁到 dist/p/`)
