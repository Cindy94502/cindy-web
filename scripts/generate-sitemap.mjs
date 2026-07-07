// 產生 dist/sitemap.xml 與 dist/robots.txt，涵蓋主要頁面、物件分享頁、部落格文章
import { writeFileSync } from 'fs'
import { resolve } from 'path'

const SITE_BASE = 'https://cindy94502.github.io/cindy-web'
const PROPS_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/refs/heads/main/properties.json'
const POSTS_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json'

const urls = [
  `${SITE_BASE}/`,
  `${SITE_BASE}/properties.html`,
  `${SITE_BASE}/blog.html`,
]

const props = await (await fetch(PROPS_URL)).json()
for (const p of props) {
  if (p.nodeId) urls.push(`${SITE_BASE}/p/${encodeURIComponent(p.nodeId)}.html`)
}

try {
  const posts = await (await fetch(POSTS_URL)).json()
  for (const post of posts) {
    if (post.id && post.published !== false) urls.push(`${SITE_BASE}/blog-post.html?id=${encodeURIComponent(post.id)}`)
  }
} catch { console.warn('posts.json 抓取失敗，sitemap 不含部落格文章') }

const today = new Date().toISOString().slice(0, 10)
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${u.replace(/&/g, '&amp;')}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>`

writeFileSync(resolve('dist', 'sitemap.xml'), xml)
writeFileSync(resolve('dist', 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_BASE}/sitemap.xml\n`)
console.log(`sitemap.xml 已產生，共 ${urls.length} 個網址`)
