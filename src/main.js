// CSS 不在這裡 import：五個頁面的 HTML 都已經用 <link> 依序載入
// style.css → 頁面專屬 → mobile.css。JS 再 import 一次的話，
// 開發時 Vite 會把它注入到 <head> 最後面，反而蓋掉 mobile.css，
// 造成開發環境跟正式站表現不一致（正式站是照 <link> 的順序打包）。
import { icon } from './icons.js'
import { renderNav, renderFooter, initCommon } from './shared.js'
import { GITHUB_JSON_URL, formatPrice, cdn } from './data.js'
import { districts } from './data-taoyuan.js'
import { bookPages } from './data-taoyuan-book.js'

// 桃園 2030 區塊開關 — 2026-08-04 關閉。
// 原因：通車時間、三心六線這類數字會變，寫在網站上錯了是自己的責任；
//       而且她的物件 92% 在蘆竹、8% 在大園，講整個桃園跟實際守備範圍不符。
//       這些內容改成帶看時口頭說明。要開回來把 false 改成 true 即可。
const SHOW_TAOYUAN = false

function tornDivider(fromColor, toColor) {
  return `<div class="torn-divider" style="background:${toColor}">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L0,20 C80,35 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,8 960,22 C1040,36 1120,14 1200,28 C1280,42 1360,16 1440,20 L1440,0 Z" fill="${fromColor}"/>
    </svg>
  </div>`
}

function propPreviewCard(p, index) {
  const tapeColors = ['var(--yellow)', 'var(--pink)', 'var(--teal-light)']
  const imgUrl = cdn(p.ogImageUrl, 600)
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
    <!-- 桌機滿版背景影片。不自動播，由滑鼠橫向位置決定播到第幾秒。
         src 留空，等 JS 確認是桌機才填，手機完全不會下載這 1.7MB。 -->
    <div id="heroScrub" aria-hidden="true">
      <video id="heroScrubVideo" poster="media/hero-poster.jpg"
             muted playsinline preload="auto"></video>
    </div>
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
        <!-- 手機版：影片做成一張卡，自動循環播。桌機這張卡會隱藏，
             改成整片滿版背景（見 #heroScrub），由滑鼠橫向刮動控制播放位置。 -->
        <div class="hero-video-card">
          <video id="heroLoopVideo" poster="media/hero-poster.jpg"
                 muted loop playsinline preload="none"
                 aria-label="小薰在草地上跟你打招呼"></video>
        </div>
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
        <p class="about-desc">要說最喜歡南崁什麼？購物真的太方便，台茂、好市多都在生活圈裡。（缺點是常激發我買買買的購物慾，需要克制）也因為在這裡長大，哪個社區安靜、哪條路會塞、哪間早餐店好吃，<strong>直接問我就好，不用查資料</strong>。</p>
        <p class="about-desc">我有點慢熱，第一次見面可能會有點拘謹，但熱絡了之後就像<strong>朋友一樣相處</strong>，有什麼問題都可以直接問我。買房是大事，慢慢來，我陪你看。</p>
        <div class="about-tags">
          <span class="about-tag tag-sage">${icon('MapPin', 13, 2)} 住南崁將近20 年</span>
          <span class="about-tag tag-peach">${icon('Users', 13, 2)} 父女搭檔</span>
        </div>
      </div>
    </div>
  </section>

  <!-- ── 家的故事 ── -->
  <section id="story">
    <div class="story-inner">
      <div class="section-header reveal">
        <div class="section-eyebrow">A Story of Home</div>
        <h2 class="section-title">家的<strong>故事</strong></h2>
        <div class="section-underline"></div>
        <p class="story-intro">想知道我為什麼做這行？這是我對「家」的想法，捲動就會往下走。</p>
      </div>
      <div class="story-embed-frame reveal reveal-d2">
        <iframe
          src="story/index.html?embed=1"
          title="家的故事"
          loading="lazy"
          allowfullscreen></iframe>
      </div>
      <a class="story-embed-open" href="story/index.html" target="_blank" rel="noopener">
        ${icon('Monitor', 15, 2)} 用整個螢幕看
      </a>
    </div>
  </section>

${SHOW_TAOYUAN ? `
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
` : ''}

  ${tornDivider('#FBF8F3', '#F2EDE4')}

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

// ── HERO 影片 ────────────────────────────────────────────────
// 桌機：滑鼠橫向刮動影片（最右＝開頭，最左＝結尾）。
// 手機：沒有滑鼠，改成輕量版自動循環播。
// 只有一邊會下載，src 都是 JS 才填的。
{
  const heroSection = document.getElementById('hero')
  const scrubWrap = document.getElementById('heroScrub')
  const scrubVid = document.getElementById('heroScrubVideo')
  const loopVid = document.getElementById('heroLoopVideo')
  const isDesktop = matchMedia('(min-width: 901px) and (hover: hover) and (pointer: fine)').matches
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches

  if (isDesktop && heroSection && scrubVid) {
    // 等首頁該載的都載完再抓影片，不跟首屏搶頻寬。
    // 手機那條（下面的 else）本來就這樣做，桌機漏了 —— 結果這支 1.7MB
    // 從第一秒就跟所有圖片搶頻寬。實測線上 house_plants.png 才 49KB
    // 卻要 22 秒，note_service.png 要 20.9 秒，就是被它卡住。
    const loadScrub = () => { scrubVid.src = 'media/hero-scrub.mp4' }
    if (document.readyState === 'complete') setTimeout(loadScrub, 200)
    else window.addEventListener('load', () => setTimeout(loadScrub, 200))

    // 她的頭頂位置，寫成「佔影片高度的比例」而不是絕對像素。
    // 原本寫死 37（用 1280×720 量的），換不同解析度的影片就會失準。
    // 目前這支是 1280×720，頭頂逐秒量出來在 y=20～31，取最低的 31 再留一點餘裕 = 37。
    const HEAD_TOP_FRAC = 37 / 720
    const NAV_H = 64   // 固定橫條會蓋住視窗最上面這麼多，頭要留在它下面
    const fitHead = () => {
      const w = scrubWrap.clientWidth, h = scrubWrap.clientHeight
      if (!scrubVid.videoWidth || !w || !h) return
      const s = Math.max(w / scrubVid.videoWidth, h / scrubVid.videoHeight)
      const excess = scrubVid.videoHeight * s - h
      const headTopY = scrubVid.videoHeight * HEAD_TOP_FRAC
      const pct = excess <= 0 ? 0
        : Math.max(0, Math.min(100, (headTopY * s - NAV_H) / excess * 100))
      scrubWrap.style.setProperty('--hero-vpos', pct.toFixed(1) + '%')
    }
    scrubVid.addEventListener('loadedmetadata', fitHead)
    window.addEventListener('resize', fitHead)

    if (!calm) {
      // target 是滑鼠指定的時間，cur 每幀往它靠近一點，不會跟著手抖
      const EASE = 0.14
      // 影片是 6fps，一幀 0.167 秒。這個數字一定要跟影片的幀率一致，
      // 對不上的話下面的「同一幀就不 seek」會失效。
      // 換影片時記得一起改（ffprobe -show_entries stream=r_frame_rate）。
      // 原本的門檻是 0.008 秒，比一幀細二十倍，等於大部分 seek 都是
      // seek 到同一張畫面 —— 畫面沒變，成本照付。
      const STEP = 1 / 6
      let target = 0, cur = 0, running = false
      // 前一個 seek 還沒完成就不要發下一個。連續丟 currentTime 會讓
      // 解碼工作在主執行緒上排隊，滑鼠掃過去就會整個卡住。
      let seeking = false, pending = null

      const seekTo = t => {
        const frame = Math.round(t / STEP) * STEP
        if (Math.abs(scrubVid.currentTime - frame) < STEP * 0.5) return  // 同一幀，不用動
        if (seeking) { pending = frame; return }                          // 排一個，只留最新的
        seeking = true
        scrubVid.currentTime = frame
      }
      scrubVid.addEventListener('seeked', () => {
        seeking = false
        if (pending !== null) { const p = pending; pending = null; seekTo(p) }
      })

      const tick = () => {
        cur += (target - cur) * EASE
        if (scrubVid.readyState >= 2) seekTo(cur)
        // 收在半幀就停：再靠近下去畫面也不會變
        if (Math.abs(target - cur) > STEP * 0.5) requestAnimationFrame(tick)
        else running = false
      }
      // 影片整支下載完之前不要開放刮動。
      // 本機沒有網路所以永遠是順的，但 GitHub Pages 上這支 1.7MB 要下載
      // 44 秒（實測 39 KB/s）。在那之前 seek 到還沒下載到的位置，瀏覽器
      // 得發一個 Range 請求，每次要 0.7 秒 —— 滑鼠一移就整個頓住。
      // 沒準備好時就讓它停在 poster，反正 poster 就是第 0 幀，看不出差別。
      let ready = false
      const checkReady = () => {
        if (ready || !scrubVid.duration || !scrubVid.buffered.length) return
        if (scrubVid.buffered.end(scrubVid.buffered.length - 1) < scrubVid.duration - 0.25) return
        ready = true
        scrubWrap.classList.add('scrub-ready')   // 游標要等能刮了才變成刮動提示
      }
      scrubVid.addEventListener('progress', checkReady)
      scrubVid.addEventListener('canplaythrough', checkReady)
      scrubVid.addEventListener('loadeddata', checkReady)
      // 保底：瀏覽器有時會自己判斷「載夠了」就停止下載，buffered 永遠到不了
      // 結尾，那樣刮動會永遠開不了。載入開始後 25 秒不管有沒有載完都放行 ——
      // 頓一下總比整個 hero 是死的好。
      // 計時要從「影片真的開始下載」起算，不是從腳本執行起算：
      // 影片現在延後到 window.load 之後才抓，從腳本起算會提早燒掉。
      scrubVid.addEventListener('loadstart', () => {
        setTimeout(() => {
          if (ready) return
          ready = true
          scrubWrap.classList.add('scrub-ready')
        }, 25000)
      }, { once: true })

      heroSection.addEventListener('mousemove', e => {
        if (!ready || !scrubVid.duration) return
        target = (1 - e.clientX / window.innerWidth) * scrubVid.duration
        if (!running) { running = true; requestAnimationFrame(tick) }
      })
    }
  } else if (loopVid && !calm) {
    // 手機：等首頁該載的都載完再抓影片，不跟首屏搶頻寬
    const start = () => {
      loopVid.autoplay = true
      loopVid.src = 'media/hero-loop.mp4'
      // 有些瀏覽器要等資料進來才肯播，所以載好再試一次
      loopVid.addEventListener('loadeddata', () => loopVid.play().catch(() => {}), { once: true })
      loopVid.play().catch(() => {})
    }
    if (document.readyState === 'complete') setTimeout(start, 300)
    else window.addEventListener('load', () => setTimeout(start, 300))
  }
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
if (SHOW_TAOYUAN) initTaoyuanMap()

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
if (SHOW_TAOYUAN) initTaoyuanBook()
