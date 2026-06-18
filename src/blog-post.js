import '/src/style.css'
import '/src/blog.css'
import { icon } from '/src/icons.js'
import { renderNav, renderFooter, initCommon } from '/src/shared.js'

const GITHUB_POSTS_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json'

const params = new URLSearchParams(location.search)
const postId = params.get('id')

const CATEGORY_COLORS = {
  '買房筆記': 'cat-teal',
  '南崁生活': 'cat-sage',
  'Q&A': 'cat-yellow',
  '物件介紹': 'cat-peach'
}

document.getElementById('app').innerHTML = `
  ${renderNav('blog')}
  <div class="post-loading">
    <div class="skeleton-line skeleton-pulse" style="width:60%;height:36px;margin-bottom:16px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:40%;height:14px;margin-bottom:40px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:100%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:95%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:88%;height:14px"></div>
  </div>
  ${renderFooter()}
`

initCommon()

async function loadPost() {
  try {
    const res = await fetch(GITHUB_POSTS_URL)
    if (!res.ok) throw new Error('fetch failed')
    const posts = await res.json()
    const post = posts.find(p => p.id === postId)

    if (!post) {
      document.querySelector('.post-loading').innerHTML =
        `<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
          <p style="letter-spacing:2px;margin-bottom:24px">找不到這篇文章</p>
          <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
        </div>`
      return
    }

    const color = CATEGORY_COLORS[post.category] || 'cat-teal'
    const dateStr = post.date
      ? new Date(post.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
      : ''

    // 更新頁面標題
    document.title = `${post.title}｜Cindy 王小姐`

    // 內容：優先用 HTML content，沒有才 fallback 到 excerpt
    const bodyHtml = post.content
      ? post.content
      : (post.excerpt || '').split('\n').filter(line => line.trim()).map(line => `<p>${line}</p>`).join('')

    document.querySelector('.post-loading').outerHTML = `
    <div class="post-page">
      <div class="post-header">
        <div class="post-header-inner">
          <a href="blog.html" class="post-back">${icon('ArrowLeft', 14, 2)} 回到筆記</a>
          <span class="blog-card-cat ${color}" style="position:static;box-shadow:none">${post.category}</span>
          <h1 class="post-title">${post.title}</h1>
          <div class="post-meta">
            ${icon('Calendar', 14, 1.5)} ${dateStr}
            &nbsp;·&nbsp;
            ${icon('User', 14, 1.5)} 王小姐 Cindy
          </div>
        </div>
      </div>

      ${post.cover ? `<div class="post-cover"><img src="${post.cover}" alt="${post.title}"></div>` : ''}

      <div class="post-body">
        <div class="post-content">
          ${bodyHtml || `<p style="color:var(--brown-mid)">文章內容準備中…</p>`}
        </div>

        <div class="post-footer-nav">
          <a href="blog.html" class="post-back-btn">
            ${icon('ArrowLeft', 16, 2)} 回到所有筆記
          </a>
        </div>

        <div class="post-contact-card">
          <div class="post-contact-title">有問題想聊聊？</div>
          <div class="post-contact-desc">不管是買房疑問還是想了解南崁行情，歡迎直接找我！</div>
          <div class="post-contact-btns">
            <a href="tel:0963585690" class="post-contact-btn-tel">
              ${icon('Phone', 15, 2)} 0963-585-690
            </a>
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="post-contact-btn-line">
              ${icon('MessageCircle', 15, 2)} LINE 我
            </a>
          </div>
        </div>
      </div>
    </div>`

  } catch (e) {
    document.querySelector('.post-loading').innerHTML =
      `<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
        <p style="letter-spacing:2px;margin-bottom:24px">載入失敗，請稍後再試</p>
        <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
      </div>`
  }
}

loadPost()
