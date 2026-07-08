// 產生 dist/blog/<id>.html：部落格文章的 SEO 靜態版
// 內容直接寫進 HTML，Google 爬蟲不用跑 JS 就能讀到全文
import { mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const SITE_BASE = 'https://cindy94502.github.io/cindy-web'
const POSTS_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json'
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const posts = await (await fetch(POSTS_URL)).json()
const outDir = resolve('dist', 'blog')
mkdirSync(outDir, { recursive: true })

let count = 0
for (const post of posts) {
  if (!post.id || post.published === false) continue
  const url = `${SITE_BASE}/blog/${post.id}.html`
  const appUrl = `${SITE_BASE}/blog-post.html?id=${post.id}`
  const cover = post.cover || `${SITE_BASE}/images/welcome.png`
  const html = `<!DOCTYPE html>
<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(post.title)}｜Cindy 王小姐 南崁在地房產</title>
<meta name="description" content="${esc(post.excerpt || '')}">
<link rel="canonical" href="${url}">
<meta property="og:title" content="${esc(post.title)}">
<meta property="og:description" content="${esc(post.excerpt || '')}">
<meta property="og:image" content="${esc(cover)}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="article">
<link rel="icon" type="image/png" href="${SITE_BASE}/images/favicon-round.png">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;400;600&family=Noto+Sans+TC:wght@300;400;500&display=swap" rel="stylesheet">
<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: post.title, description: post.excerpt || '', image: cover, datePublished: post.date || '', author: { '@type': 'Person', name: 'Cindy 王小姐', url: SITE_BASE } })}
</script>
<style>
  body { margin:0; background:#FBF8F1; color:#3D2B1F; font-family:'Noto Sans TC',sans-serif; line-height:1.9; }
  .wrap { max-width:720px; margin:0 auto; padding:32px 20px 60px; }
  .site { font-family:'Noto Serif TC',serif; font-size:14px; letter-spacing:2px; margin-bottom:28px; }
  .site a { color:#3D2B1F; text-decoration:none; }
  h1 { font-family:'Noto Serif TC',serif; font-weight:600; font-size:26px; line-height:1.5; }
  .meta { font-size:13px; color:rgba(61,43,31,.55); letter-spacing:1px; margin-bottom:24px; }
  img { max-width:100%; height:auto; border-radius:6px; }
  article h3 { font-family:'Noto Serif TC',serif; margin-top:36px; }
  hr { border:none; border-top:1px dashed rgba(61,43,31,.2); margin:28px 0; }
  .cta { margin-top:48px; padding:20px; background:#fff; border-radius:8px; box-shadow:0 4px 16px rgba(61,43,31,.08); font-size:15px; }
  .cta a { display:inline-block; margin-top:10px; background:#06C755; color:#fff; text-decoration:none; padding:9px 18px; border-radius:6px; font-size:14px; }
  .back { display:inline-block; margin-top:32px; color:#4A8E97; font-size:14px; }
</style>
</head>
<body>
<div class="wrap">
  <div class="site"><a href="${SITE_BASE}/">Cindy ♡ 南崁在地房產</a></div>
  <h1>${esc(post.title)}</h1>
  <div class="meta">${esc(post.category || '')}｜${esc(post.date || '')}</div>
  <article>${post.content}</article>
  <div class="cta">
    📬 想掌握南崁房市？加 Cindy 的 LINE，行情資訊、物件更新不漏接。
    <br><a href="https://line.me/ti/p/@019nrmqw">加 LINE 好友 @019nrmqw</a>
  </div>
  <a class="back" href="${appUrl}">← 回到網站看更多文章</a>
</div>
</body>
</html>`
  writeFileSync(resolve(outDir, `${post.id}.html`), html)
  count++
}
console.log(`已產生 ${count} 篇文章靜態頁到 dist/blog/`)
