import { icon } from './icons.js'

// 本機開發是 '/'，打包上 GitHub Pages 是 '/cindy-web/'（vite.config 決定）。
const BASE = import.meta.env.BASE_URL

export function renderNav() {
  return `
  <nav id="nav">
    <a href="index.html" class="nav-logo">
      <span class="nav-logo-dot"></span>
      Cindy ${icon('Heart', 16, 2, 'nav-logo-heart')}
    </a>
    <!-- 桌機：藥丸列置中（同 story 頁的 .navpills），六項順序與側邊欄一致。
         手機隱藏，改用右邊的 MENU 開側邊欄 -->
    <div class="nav-links">
      <a href="index.html">首頁</a>
      <a href="index.html#about">關於我</a>
      <a href="properties.html">精選物件</a>
      <a href="blog.html">房產筆記</a>
      <a href="index.html#forms">快速諮詢</a>
      <a href="index.html#contact">聯絡我</a>
    </div>
    <div class="nav-right">
      <button class="menu-btn" id="menuBtn" aria-label="選單">
        <span class="menu-btn-text">MENU</span>
        <div class="menu-btn-lines">
          <span></span><span></span><span></span>
        </div>
      </button>
    </div>
  </nav>

  <!-- 右滑選單 -->
  <div class="menu-overlay" id="menuOverlay">
    <button class="menu-overlay-close" id="menuClose" aria-label="關閉">✕</button>
    <div class="menu-overlay-logo">
      <div class="menu-overlay-logo-circle">
        <img src="images/Cindy.png?v=2" alt="Cindy 小薰" style="width: 100%; height: 100%; object-fit: cover; object-position: top; border-radius: 50%;">
      </div>
    </div>
    <ul class="menu-overlay-links">
      <li>
        <a href="index.html">
          首頁
          <span>Home</span>
        </a>
      </li>
      <li>
        <a href="index.html#about">
          關於我
          <span>About Me</span>
        </a>
      </li>
      <li>
        <a href="properties.html">
          精選物件
          <span>Properties</span>
        </a>
      </li>
      <li>
        <a href="blog.html">
          房產筆記
          <span>Blog</span>
        </a>
      </li>
      <li>
        <a href="index.html#forms">
          快速諮詢
          <span>Contact Form</span>
        </a>
      </li>
      <li>
        <a href="index.html#contact">
          聯絡我
          <span>Contact</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="menu-backdrop" id="menuBackdrop"></div>
  `
}

export function renderFooter() {
  return `
  <footer>
    <div class="footer-brand">Cindy <span>小薰</span></div>
    <div class="footer-copy">欣益不動產開發有限公司 | 中信房屋 南崁一極加盟店</div>
    <div class="footer-copy">© 2026 欣益不動產開發有限公司</div>
    <div class="footer-copy">營業員：王瑋薰(Cindy) · (112)登字第445910號</div>
    <div class="footer-copy">經紀人：黃惠蓉 · (110)桃市經字第001835號</div>
    <!-- 路徑用 BASE_URL，不要寫死 /cindy-web/：
         本機開發時 base 是 /，寫死的話六個連結全部會跑到首頁；
         將來換網域也只要改 vite.config 一個地方。順序與 nav、側邊欄一致。 -->
    <div class="footer-links">
      <a href="${BASE}">首頁</a>
      <a href="${BASE}#about">關於我</a>
      <a href="${BASE}properties.html">精選物件</a>
      <a href="${BASE}blog.html">房產筆記</a>
      <a href="${BASE}#forms">快速諮詢</a>
      <a href="${BASE}#contact">聯絡我</a>
    </div>
  </footer>
  <button class="go-top" id="goTop" aria-label="回到頂部">
    <span class="go-top-arrow">${icon('ChevronUp', 16, 2.5)}</span>
    <span class="go-top-sub">Go to</span>
    <span class="go-top-main">TOP</span>
  </button>

  <!-- 浮動聯絡按鈕 -->
  <div class="float-contact">
    <a href="tel:0963585690" class="float-contact-btn">
      <img src="images/btn_tel.png" alt="電話詢問">
    </a>
    <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="float-contact-btn">
      <img src="images/btn_line.png" alt="LINE 加入好友">
    </a>
  </div>
  `
}

export function initCommon() {
  // 動態設定 favicon，確保每頁都正確（用 PNG，Safari 相容）
  const favicon = document.querySelector("link[rel='icon']") || document.createElement('link')
  favicon.rel = 'icon'
  favicon.type = 'image/png'
  favicon.href = import.meta.env.BASE_URL + 'images/favicon-round.png'
  if (!favicon.parentNode) document.head.appendChild(favicon)
  const nav = document.getElementById('nav')
  const goTop = document.getElementById('goTop')
  const menuBtn = document.getElementById('menuBtn')
  const overlay = document.getElementById('menuOverlay')
  const backdrop = document.getElementById('menuBackdrop')
  const closeBtn = document.getElementById('menuClose')

  // Nav scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80)
    goTop?.classList.toggle('show', window.scrollY > 400)
  })

  goTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

  // Menu open/close
  function openMenu() {
    overlay.classList.add('open')
    backdrop.classList.add('open')
    menuBtn.classList.add('open')
    document.body.style.overflow = 'hidden'
  }
  function closeMenu() {
    overlay.classList.remove('open')
    backdrop.classList.remove('open')
    menuBtn.classList.remove('open')
    document.body.style.overflow = ''
  }

  menuBtn?.addEventListener('click', openMenu)
  closeBtn?.addEventListener('click', closeMenu)
  backdrop?.addEventListener('click', closeMenu)
  overlay?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu))

  // Scroll reveal。預設是「浮上來之後就留著」。
  // 加了 .reveal-both 的元素會來回：離開視窗時淡出縮回，再進來又浮上。
  const reveals = document.querySelectorAll('.reveal')
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible')
      else if (e.target.classList.contains('reveal-both')) e.target.classList.remove('visible')
    })
  }, { threshold: 0.1 })
  reveals.forEach(el => obs.observe(el))
}
