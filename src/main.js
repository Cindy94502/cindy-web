import './style.css'
import { icon } from './icons.js'
import { renderNav, renderFooter, initCommon } from './shared.js'
import { GITHUB_JSON_URL, formatPrice } from './data.js'
import { districts } from './data-taoyuan.js'
import { bookPages } from './data-taoyuan-book.js'

function tornDivider(fromColor, toColor) {
  return `<div class="torn-divider" style="background:${toColor}">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L0,20 C80,35 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,8 960,22 C1040,36 1120,14 1200,28 C1280,42 1360,16 1440,20 L1440,0 Z" fill="${fromColor}"/>
    </svg>
  </div>`
}

function propPreviewCard(p, index) {
  const tapeColors = ['var(--yellow)', 'var(--pink)', 'var(--teal-light)']
  const imgUrl = p.ogImageUrl || ''
  const iconName = p.buildingCategory === '透天' ? 'House' : 'Building2'
  return `
  <a href="property.html?id=${p.nodeId}" class="prop-card reveal reveal-d${index + 1}">
    <div class="prop-card-img">
      ${imgUrl
        ? `<img src="${imgUrl}" alt="${p.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.objectFit='contain';this.style.opacity='0.4';this.style.padding='20px';this.src='images/house_small.png'">`
        : `<div class="prop-card-img-icon">${icon(iconName, 48, 1, 'prop-placeholder-icon')}</div>`}
      <div class="prop-card-category">${p.buildingCategory || '住宅'}</div>
    </div>
    <div class="prop-card-body">
      <div class="prop-price">${formatPrice(p.price)}</div>
      <div class="prop-name">${p.title}</div>
      <div class="prop-info">
        <span class="prop-tag">${p.layout || ''}</span>
        <span class="prop-tag">${p.buildingCategory || ''}</span>
      </div>
      <div class="prop-card-footer">
        <span class="prop-location">${icon('MapPin', 13, 2, 'prop-loc-icon')} ${p.wixLocation || ''}</span>
        <span class="prop-link">查看詳情 ${icon('ArrowRight', 13, 2)}</span>
      </div>
    </div>
  </a>`
}

document.getElementById('app').innerHTML = `
  ${renderNav('index')}

  <!-- ── HERO ── -->
  <section id="hero">
    <div class="hero-inner">
      <!-- 左側文字 -->
      <div class="hero-text">
        <div class="hero-eyebrow"><span class="hero-eyebrow-dot"></span>南崁在地 · 中信房屋</div>
        <h1 class="hero-title">
          南崁長大的人<br>
          <strong id="heroStrong">陪你找到家</strong>
        </h1>
        <div class="hero-subtitle-img">
          <img src="images/note_ideal.png" alt="理想生活 從家開始">
        </div>
        <div class="hero-btns">
          <a href="properties.html" class="hero-btn-primary">${icon('Home', 16, 2, 'btn-icon')} 看看物件</a>
          <a href="#about" class="hero-btn-secondary">${icon('User', 16, 2, 'btn-icon')} 認識 Cindy</a>
        </div>
      </div>
      <!-- 右側 Cindy 角色 -->
      <div class="hero-photo-area">
        <!-- 新增說話泡泡 -->
        <div class="hero-bubble">
          <span>嗨！有任何房地產問題<br>都可以找我聊聊喔！</span>
          <div class="hero-bubble-arrow"></div>
        </div>
        <img src="images/cindy_character.png" alt="Cindy 王小姐" class="hero-cindy-img">
      </div>
    </div>
    <a href="#about" class="scroll-hint-wrap" id="scrollHint">
      <span class="scroll-hint-text">SCROLL</span>
      <div class="scroll-arrow-wrap">
        ${icon('ChevronDown', 22, 1.5, 'scroll-arrow-icon')}
        ${icon('ChevronDown', 22, 1.5, 'scroll-arrow-icon scroll-arrow-delay')}
      </div>
    </a>
  </section>

  ${tornDivider('#B2CDCB', '#FBF8F3')}

  <!-- ── ABOUT ── -->
  <section id="about">
    <div class="about-inner">
      <!-- 左側：兩張便條紙上下排列（不重疊） -->
      <div class="about-left reveal">
        <img src="images/note_effort.png" alt="今天也在努力的自己" class="about-note-top">
        <img src="images/note_service.png" alt="用專業替你把關" class="about-note-bottom">
      </div>
      <!-- 右側文字 -->
      <div class="about-text reveal reveal-d2">
        <div class="about-section-label">About Me</div>
        <h2 class="about-title">HI，我是<strong>薰</strong><br>大家可以叫我Cindy~</h2>
        <div class="about-divider"></div>
        <p class="about-desc">土生土長的南崁人，從小在這裡長大，對這裡的<strong>每條街道、每個生活圈</strong>都很熟悉。是經由爸爸帶領，踏入了房介這行，此後我們父女便攜手並進。</p>
        <p class="about-desc">很多人問我為什麼大學剛畢業就做房仲？我的想法很簡單：<strong>各行各業都值得嘗試，不要自己設限</strong>。年輕是我的本錢，跑得勤、學得快、不油條。</p>
        <p class="about-desc">要說最喜歡南崁什麼？購物真的太方便，台茂、好市多都在生活圈裡。（缺點是常激發我買買買的購物慾，需要克制 😂）也因為在這裡長大，哪個社區安靜、哪條路會塞、哪間早餐店好吃，<strong>直接問我就好，不用查資料</strong>。</p>
        <p class="about-desc">我有點慢熱，第一次見面可能會有點拘謹，但熱絡了之後就像<strong>朋友一樣相處</strong>，有什麼問題都可以直接問我。買房是大事，慢慢來，我陪你看。</p>
        <div class="about-tags">
          <span class="about-tag tag-sage">${icon('MapPin', 13, 2)} 住南崁將近20 年</span>
          <span class="about-tag tag-peach">${icon('Users', 13, 2)} 父女搭檔</span>
        </div>
      </div>
    </div>
    <!-- 父女圖 hover 才出現 -->
    <div class="about-dad-wrap">
      <img src="images/cindy_dad.png" alt="父女搭檔" class="about-dad-img">
    </div>
  </section>

  <!-- ── 認識桃園 ── -->
  <section id="taoyuan">
    <div class="taoyuan-inner">
      <div class="section-header reveal">
        <div class="section-header-top">
          <img src="images/house_plants.png" alt="" class="section-house-deco">
        </div>
        <div class="section-eyebrow">Taoyuan 2030</div>
        <h2 class="section-title">跟我一起<strong>認識桃園</strong></h2>
        <div class="section-underline"></div>
        <p class="taoyuan-intro">住在這裡快 20 年，桃園接下來要變成什麼樣子，我也很好奇。整理了一支短片，帶你快速看一輪～</p>
      </div>
      <div class="taoyuan-video-wrap reveal reveal-d2">
        <video
          class="taoyuan-video"
          src="videos/taoyuan-2030.mp4"
          poster="videos/taoyuan-2030-poster.jpg"
          controls
          muted
          playsinline
          preload="metadata">
        </video>
      </div>
      <div class="taoyuan-tags reveal reveal-d2">
        <span class="taoyuan-tag">🚄 G13捷運明年通車</span>
        <span class="taoyuan-tag">🏙️ 三心六線</span>
        <span class="taoyuan-tag">🌳 生活機能升級</span>
      </div>
      <p class="taoyuan-caption">更多桃園建設進度與生活圈分析，歡迎加 LINE 跟我聊聊</p>
      <div class="taoyuan-btn-row reveal reveal-d2">
        <button class="taoyuan-book-btn" id="taoyuanBookBtn">
          ${icon('BookOpen', 15, 2)} 圖文版慢慢看
        </button>
        <button class="taoyuan-book-btn" id="taoyuanMapBtn">
          ${icon('MapPin', 15, 2)} 桃園生活機能地圖
        </button>
      </div>
    </div>
  </section>

  ${tornDivider('#FBF8F3', '#F2EDE4')}

  <!-- ── 桃園2030 電子書浮動視窗 ── -->
  <div class="tbook-overlay" id="tbookOverlay">
    <div class="tbook-modal">
      <button class="tbook-close" id="tbookClose" aria-label="關閉">✕</button>
      <div class="tbook-page" id="tbookPage"></div>
      <button class="tbook-nav tbook-prev" id="tbookPrev" aria-label="上一頁">${icon('ChevronLeft', 22, 2)}</button>
      <button class="tbook-nav tbook-next" id="tbookNext" aria-label="下一頁">${icon('ChevronRight', 22, 2)}</button>
      <div class="tbook-dots" id="tbookDots"></div>
    </div>
  </div>

  <!-- ── 桃園地圖 浮動視窗 ── -->
  <div class="tmap-overlay" id="tmapOverlay">
    <div class="tmap-modal">
      <button class="tbook-close" id="tmapClose" aria-label="關閉">✕</button>
      <div class="section-header">
        <div class="section-eyebrow">Taoyuan Living Guide</div>
        <h2 class="section-title">桃園<strong>13區生活機能地圖</strong></h2>
        <div class="section-underline"></div>
        <p class="tmap-hint">滑過（手機點一下）看看每個區的生活機能</p>
      </div>
      <div class="tmap-wrap">
        <img src="images/taoyuan-map.png" alt="桃園13區地圖" class="tmap-img" id="tmapImg">
        ${districts.map((d, i) => `
        <button class="tmap-hotspot" data-index="${i}" aria-label="${d.name}"
          style="left:${d.area.x}%; top:${d.area.y}%; width:${d.area.w}%; height:${d.area.h}%;">
        </button>`).join('')}
        <div class="tmap-card" id="tmapCard">
          <div class="tmap-card-name" id="tmapCardName"></div>
          <div class="tmap-card-facts" id="tmapCardFacts"></div>
          <div class="tmap-card-info" id="tmapCardCommute"></div>
          <div class="tmap-card-info" id="tmapCardFit"></div>
          <div class="tmap-card-note" id="tmapCardNote"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- ── 精選物件 ── -->
  <section id="properties-preview">
    <div class="properties-inner">
      <div class="section-header reveal">
        <div class="section-header-top">
          <img src="images/house_plants.png" alt="" class="section-house-deco">
        </div>
        <div class="section-eyebrow">精選物件</div>
        <h2 class="section-title">幫你找到<strong>最適合的家</strong></h2>
        <div class="section-underline"></div>
      </div>
      <div class="props-grid" id="homePropsGrid">
        <div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--brown-mid);letter-spacing:2px">載入中...</div>
      </div>
      <div class="props-more reveal">
        <a href="properties.html" class="props-more-btn" id="propsMoreBtn">
          查看全部物件 ${icon('ArrowRight', 16, 2)}
        </a>
      </div>
    </div>
  </section>

  ${tornDivider('#F2EDE4', '#FBF8F3')}

  <!-- ── 需求表單 ── -->
  <section id="forms">
    <div class="forms-inner">
      <div class="section-header reveal">
        <div class="section-eyebrow">快速諮詢</div>
        <h2 class="section-title">告訴我你的需求</h2>
        <div class="section-underline"></div>
        <p class="forms-subtitle">填寫表單後我會盡快與你聯繫</p>
      </div>
      <div class="forms-grid reveal">
        <button class="form-card form-card-buy" data-tf-popup="HEcOmZt1" data-tf-size="90">
          <div class="form-card-icon">${icon('Home', 36, 1.5, 'form-icon-buy')}</div>
          <div class="form-card-title">我想買房</div>
          <div class="form-card-desc">告訴我預算、坪數、區域需求<br>讓我幫你找到對的家</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-rent" data-tf-popup="zlT7vf5X" data-tf-size="90">
          <div class="form-card-icon">${icon('KeyRound', 36, 1.5, 'form-icon-rent')}</div>
          <div class="form-card-title">我想租屋</div>
          <div class="form-card-desc">說明租金預算、格局、入住時間<br>我來幫你媒合合適的房源</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-sell" data-tf-popup="cK5kqUM9" data-tf-size="90">
          <div class="form-card-icon">${icon('Banknote', 36, 1.5, 'form-icon-sell')}</div>
          <div class="form-card-title">我想賣房</div>
          <div class="form-card-desc">留下物件資訊與聯絡方式<br>讓我為你評估最佳售出策略</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
      </div>
    </div>
  </section>

  ${tornDivider('#FBF8F3', '#7CBBC3')}

  <!-- ── 聯絡 ── -->
  <section id="contact">
    <div class="contact-inner">
      <h2 class="contact-title reveal">有任何問題都可以<br><strong>直接找我聊聊</strong></h2>
      <p class="contact-sub reveal">不管是買房、賣房還是只是想了解南崁行情，隨時歡迎</p>

      <div class="contact-info-list reveal">
        <div class="contact-info-row">
          <span class="contact-info-icon">${icon('Phone', 18, 1.5)}</span>
          <span class="contact-info-label">Cindy</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0963585690" class="contact-info-value">0963-585-690</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${icon('Phone', 18, 1.5)}</span>
          <span class="contact-info-label">王先生</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0968731280" class="contact-info-value">0968-731-280</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${icon('MessageCircle', 18, 1.5)}</span>
          <span class="contact-info-label">LINE</span>
          <span class="contact-info-divider">|</span>
          <span class="contact-info-value">@019nrmqw</span>
        </div>
      </div>

      <div class="contact-action-btns reveal">
        <a href="tel:0963585690" class="contact-action-btn contact-action-tel">
          <img src="images/btn_tel.png" alt="電話詢問" class="contact-action-img">
        </a>
        <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="contact-action-btn contact-action-line">
          <img src="images/btn_line.png" alt="LINE 加入好友" class="contact-action-img">
        </a>
      </div>
    </div>
  </section>

  ${renderFooter()}
`

initCommon()

setTimeout(() => {
  document.getElementById('heroStrong')?.classList.add('hero-title-line-animate')
}, 1400)

// Scroll hint 點擊平滑滚動
document.getElementById('scrollHint')?.addEventListener('click', e => {
  e.preventDefault()
  const target = document.getElementById('about')
  if (target) window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
})

// 父女圖 scroll reveal - 監聽 about 區塊
const aboutSection = document.getElementById('about')
if (aboutSection) {
  const dadObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelector('.about-dad-wrap')?.classList.add('visible')
      }
    })
  }, { threshold: 0.1 })
  dadObs.observe(aboutSection)
}

async function loadHomeProps() {
  try {
    const res = await fetch(GITHUB_JSON_URL)
    const props = await res.json()
    const preview = props.filter(p => p.title && p.nodeId).slice(0, 3)
    document.getElementById('homePropsGrid').innerHTML =
      preview.map((p, i) => propPreviewCard(p, i)).join('')
    document.getElementById('propsMoreBtn').innerHTML =
      `查看全部 ${props.length} 筆物件 ${icon('ArrowRight', 16, 2)}`
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    document.querySelectorAll('#homePropsGrid .reveal').forEach(el => obs.observe(el))
  } catch {
    document.getElementById('homePropsGrid').innerHTML =
      `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--brown-mid)">暫時無法載入物件</div>`
  }
}
loadHomeProps()

function initTaoyuanMap() {
  const card = document.getElementById('tmapCard')
  const nameEl = document.getElementById('tmapCardName')
  const factsEl = document.getElementById('tmapCardFacts')
  const noteEl = document.getElementById('tmapCardNote')
  const wrap = document.querySelector('.tmap-wrap')
  if (!wrap) return

  const show = (btn) => {
    const d = districts[+btn.dataset.index]
    nameEl.textContent = d.name
    factsEl.textContent = d.facts
    const commuteEl = document.getElementById('tmapCardCommute')
    const fitEl = document.getElementById('tmapCardFit')
    commuteEl.innerHTML = d.commute ? `${icon('Car', 13, 2, 'tmap-info-icon')} ${d.commute}` : ''
    commuteEl.style.display = d.commute ? '' : 'none'
    fitEl.innerHTML = d.fit ? `${icon('Users', 13, 2, 'tmap-info-icon')} ${d.fit}` : ''
    fitEl.style.display = d.fit ? '' : 'none'
    noteEl.innerHTML = d.cindyNote ? `${icon('MessageCircle', 13, 2, 'tmap-note-icon')} ${d.cindyNote}` : ''
    noteEl.style.display = d.cindyNote ? '' : 'none'

    const wrapRect = wrap.getBoundingClientRect()
    const btnRect = btn.getBoundingClientRect()
    card.style.display = 'block'
    const cardW = card.offsetWidth
    let left = btnRect.left - wrapRect.left + btnRect.width / 2 - cardW / 2
    left = Math.max(8, Math.min(left, wrapRect.width - cardW - 8))
    card.style.left = left + 'px'
    let top = btnRect.top - wrapRect.top - card.offsetHeight - 12
    if (top < 8) top = btnRect.bottom - wrapRect.top + 12
    card.style.top = top + 'px'
    card.classList.add('tmap-card-active')
  }
  const hide = () => card.classList.remove('tmap-card-active')

  // 各區熱區矩形互有重疊（區形不規則），改用「游標離哪區中心最近」判定，
  // 避免 DOM 順序在後的區搶走重疊帶的點擊（例如點新屋出現觀音）
  const btns = [...document.querySelectorAll('.tmap-hotspot')]
  const pickDistrict = (e) => {
    const r = wrap.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width * 100
    const py = (e.clientY - r.top) / r.height * 100
    let best = null, bestDist = Infinity
    districts.forEach((d, i) => {
      const a = d.area
      if (px < a.x || px > a.x + a.w || py < a.y || py > a.y + a.h) return
      const dx = (px - (a.x + a.w / 2)) / a.w
      const dy = (py - (a.y + a.h / 2)) / a.h
      const dist = dx * dx + dy * dy
      if (dist < bestDist) { bestDist = dist; best = i }
    })
    return best
  }
  // 用 pointermove 並限定滑鼠：手機點擊會先觸發模擬 mousemove 再觸發 click，
  // 造成卡片先開後關的閃現，觸控裝置只走 click 的開關邏輯
  wrap.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return
    if (e.target.closest('.tmap-card')) return
    const i = pickDistrict(e)
    if (i === null) { hide(); return }
    if (!card.classList.contains('tmap-card-active') || nameEl.textContent !== districts[i].name) show(btns[i])
  })
  wrap.addEventListener('click', (e) => {
    if (e.target.closest('.tmap-card')) return
    e.stopPropagation()
    const i = pickDistrict(e)
    if (i === null) { hide(); return }
    if (card.classList.contains('tmap-card-active') && nameEl.textContent === districts[i].name) hide()
    else show(btns[i])
  })
  btns.forEach(btn => btn.addEventListener('focus', () => show(btn)))
  wrap.addEventListener('mouseleave', hide)
  document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) hide() })

  const openBtn = document.getElementById('taoyuanMapBtn')
  const mapOverlay = document.getElementById('tmapOverlay')
  const mapClose = document.getElementById('tmapClose')
  if (openBtn && mapOverlay) {
    const openMap = () => { mapOverlay.classList.add('tmap-open'); document.body.style.overflow = 'hidden' }
    const closeMap = () => { mapOverlay.classList.remove('tmap-open'); document.body.style.overflow = ''; hide() }
    openBtn.addEventListener('click', openMap)
    mapClose.addEventListener('click', closeMap)
    mapOverlay.addEventListener('click', (e) => { if (e.target === mapOverlay) closeMap() })
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mapOverlay.classList.contains('tmap-open')) closeMap()
    })
  }
}
initTaoyuanMap()

function initTaoyuanBook() {
  const btn = document.getElementById('taoyuanBookBtn')
  const overlay = document.getElementById('tbookOverlay')
  const closeBtn = document.getElementById('tbookClose')
  const prevBtn = document.getElementById('tbookPrev')
  const nextBtn = document.getElementById('tbookNext')
  const pageEl = document.getElementById('tbookPage')
  const dotsEl = document.getElementById('tbookDots')
  if (!btn || !overlay) return

  let idx = 0

  dotsEl.innerHTML = bookPages.map((_, i) => `<span class="tbook-dot" data-i="${i}"></span>`).join('')
  const dots = [...dotsEl.querySelectorAll('.tbook-dot')]

  const render = () => {
    const p = bookPages[idx]
    pageEl.innerHTML = p.image ? `
      <div class="tbook-page-num">${idx + 1} / ${bookPages.length}</div>
      <div class="tbook-img-wrap tbook-img-wrap-full"><img src="${p.image}" alt="${p.title}" class="tbook-img tbook-img-full" loading="lazy"></div>
      ${p.extra ? `<p class="tbook-body">${p.extra}</p>` : ''}
    ` : `
      <div class="tbook-page-num">${idx + 1} / ${bookPages.length}</div>
      <h3 class="tbook-title">${p.title}</h3>
      ${p.subtitle ? `<div class="tbook-subtitle">${p.subtitle}</div>` : ''}
      ${p.stats ? `<div class="tbook-stats">${p.stats.map(([k, v]) => `
        <div class="tbook-stat"><div class="tbook-stat-k">${k}</div><div class="tbook-stat-v">${v}</div></div>
      `).join('')}</div>` : ''}
      ${p.body ? `<p class="tbook-body">${p.body}</p>` : ''}
    `
    dots.forEach((d, i) => d.classList.toggle('tbook-dot-active', i === idx))
    prevBtn.disabled = idx === 0
    nextBtn.disabled = idx === bookPages.length - 1
  }

  const open = () => { idx = 0; render(); overlay.classList.add('tbook-open'); document.body.style.overflow = 'hidden' }
  const close = () => { overlay.classList.remove('tbook-open'); document.body.style.overflow = '' }

  let flipping = false
  const go = (n) => {
    const newIdx = Math.max(0, Math.min(bookPages.length - 1, idx + n))
    if (newIdx === idx || flipping) return
    flipping = true
    const dir = n > 0 ? 'next' : 'prev'
    pageEl.classList.add(dir === 'next' ? 'tbook-flip-out-next' : 'tbook-flip-out-prev')
    pageEl.addEventListener('animationend', function onOut() {
      pageEl.removeEventListener('animationend', onOut)
      idx = newIdx
      render()
      pageEl.classList.remove('tbook-flip-out-next', 'tbook-flip-out-prev')
      pageEl.classList.add(dir === 'next' ? 'tbook-flip-in-next' : 'tbook-flip-in-prev')
      pageEl.addEventListener('animationend', function onIn() {
        pageEl.removeEventListener('animationend', onIn)
        pageEl.classList.remove('tbook-flip-in-next', 'tbook-flip-in-prev')
        flipping = false
      }, { once: true })
    }, { once: true })
  }

  btn.addEventListener('click', open)
  closeBtn.addEventListener('click', close)
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close() })
  prevBtn.addEventListener('click', () => go(-1))
  nextBtn.addEventListener('click', () => go(1))
  dots.forEach(d => d.addEventListener('click', () => go(+d.dataset.i - idx)))
  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('tbook-open')) return
    if (e.key === 'Escape') close()
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  })

  // 手機滑動翻頁
  let touchX = null
  pageEl.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX })
  pageEl.addEventListener('touchend', (e) => {
    if (touchX == null) return
    const dx = e.changedTouches[0].clientX - touchX
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touchX = null
  })
}
initTaoyuanBook()
