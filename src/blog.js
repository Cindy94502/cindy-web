import '/src/style.css'
import '/src/blog.css'
import { icon } from '/src/icons.js'
import { renderNav, renderFooter, initCommon } from '/src/shared.js'

const GITHUB_POSTS_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json'

const CATEGORIES = ['全部', '買房筆記', '南崁生活', 'Q&A', '物件介紹']

const CATEGORY_COLORS = {
  '買房筆記': 'cat-teal',
  '南崁生活': 'cat-sage',
  'Q&A': 'cat-yellow',
  '物件介紹': 'cat-peach'
}

function postCard(post) {
  const color = CATEGORY_COLORS[post.category] || 'cat-teal'
  const dateStr = post.date
    ? new Date(post.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
    : ''
  return `
  <a href="blog-post.html?id=${post.id}" class="blog-card reveal">
    <div class="blog-card-header ${color}">
      ${post.cover
        ? `<img src="${post.cover}" alt="${post.title}" class="blog-card-cover">`
        : `<div class="blog-card-cover-placeholder">${icon('BookOpen', 36, 1)}</div>`
      }
      <span class="blog-card-cat">${post.category}</span>
    </div>
    <div class="blog-card-body">
      <div class="blog-card-date">${icon('Calendar', 12, 1.5)} ${dateStr}</div>
      <h2 class="blog-card-title">${post.title}</h2>
      <p class="blog-card-excerpt">${post.excerpt}</p>
      <span class="blog-card-more">閱讀更多 ${icon('ArrowRight', 13, 2)}</span>
    </div>
  </a>`
}

function skeletonCard() {
  return `<div class="blog-skeleton">
    <div class="skeleton-img skeleton-pulse"></div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:10px">
      <div class="skeleton-line skeleton-pulse" style="width:30%;height:12px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:80%;height:18px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:100%;height:12px"></div>
    </div>
  </div>`
}

document.getElementById('app').innerHTML = `
  ${renderNav('blog')}
  <div class="blog-header">
    <div class="blog-header-inner">
      <div class="blog-eyebrow"><span class="nav-logo-dot"></span>學習筆記</div>
      <h1 class="blog-title">房產<strong>筆記</strong></h1>
      <p class="blog-subtitle">我在學的，你也可以一起學 ✍️</p>
    </div>
  </div>
  <div class="blog-filter-bar">
    <div class="blog-filter-inner">
      ${CATEGORIES.map(cat =>
        `<button class="blog-cat-btn ${cat === '全部' ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
      ).join('')}
    </div>
  </div>
  <div class="blog-body">
    <div class="blog-grid" id="blogGrid">
      ${[...Array(6)].map(() => skeletonCard()).join('')}
    </div>
  </div>
  ${renderFooter()}
`

initCommon()

async function loadPosts() {
  try {
    const res = await fetch(GITHUB_POSTS_URL)
    if (!res.ok) throw new Error('fetch failed')
    const posts = await res.json()
    const grid = document.getElementById('blogGrid')

    if (!posts.length) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--brown-mid);letter-spacing:2px">記筆中，敬請期待…</div>`
      return
    }

    grid.innerHTML = posts.map(p => postCard(p)).join('')

    document.querySelectorAll('.blog-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.blog-cat-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        const cat = btn.dataset.cat
        document.querySelectorAll('.blog-card').forEach(card => {
          const match = cat === '全部' || card.querySelector('.blog-card-cat')?.textContent === cat
          card.style.display = match ? '' : 'none'
        })
      })
    })

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

  } catch (e) {
    document.getElementById('blogGrid').innerHTML =
      `<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--brown-mid)">載入失敗，請稍後再試</div>`
  }
}

loadPosts()
