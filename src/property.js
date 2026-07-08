import './style.css'
import './property.css'
import { icon } from './icons.js'
import { renderNav, renderFooter, initCommon } from './shared.js'
import { GITHUB_JSON_URL, formatPrice } from './data.js'

const params = new URLSearchParams(location.search)
const nodeId = params.get('id')

document.getElementById('app').innerHTML = `
  ${renderNav('properties')}
  <div class="property-page">
    <div class="property-loading">載入中...</div>
  </div>
  ${renderFooter()}
`
initCommon()

// 從 Cloudinary 抓所有圖片
async function fetchCloudinaryImages(folder) {
  if (!folder) return []
  try {
    const res = await fetch(`https://res.cloudinary.com/ddzync8km/image/list/${folder}.json`)
    const data = await res.json()
    if (!data.resources || data.resources.length === 0) return []
    return data.resources
      .sort((a, b) => (a.display_name || a.public_id).localeCompare(
        (b.display_name || b.public_id), undefined, { numeric: true }
      ))
      .map(r => `https://res.cloudinary.com/ddzync8km/image/upload/${r.public_id}.${r.format || 'jpg'}`)
  } catch {
    return []
  }
}

function parseFeatures(wixFeatures) {
  if (!wixFeatures) return []
  if (Array.isArray(wixFeatures)) return wixFeatures
  return (wixFeatures.match(/<li>(.*?)<\/li>/g) || [])
    .map(s => s.replace(/<\/?li>/g, '').trim())
}

function similarCard(p) {
  const img = p.ogImageUrl || ''
  return `
  <a href="property.html?id=${p.nodeId}" class="similar-card">
    <div class="similar-img-wrap">
      ${img
        ? `<img src="${img}" alt="${p.title}" loading="lazy">`
        : `<div class="similar-img-placeholder">${icon('Home', 40, 1)}</div>`}
    </div>
    <div class="similar-name">${p.title}</div>
    <div class="similar-reason">${p.reason || ''}</div>
    <div class="similar-price">${formatPrice(p.price)}</div>
  </a>`
}

function rebuildSimilarSection(filtered, eyebrowText, headingText) {
  const section = document.querySelector('.similar-section')
  if (!section) return

  const inner = section.querySelector('.similar-inner')
  const pages = Math.ceil(filtered.length / 3)

  inner.innerHTML = `
    <div class="similar-title-row">
      <div class="section-eyebrow" id="similarEyebrow">${eyebrowText}</div>
      <h2 class="similar-heading" id="similarHeading">${headingText}</h2>
    </div>
    ${filtered.length === 0 ? `
      <div class="similar-empty">目前沒有相符物件，歡迎直接聯絡我查詢！</div>
    ` : `
    <div class="similar-carousel-wrap">
      ${filtered.length > 3 ? `<button class="similar-nav similar-prev" id="similarPrev">${icon('ChevronLeft', 26, 2)}</button>` : ''}
      <div class="similar-overflow">
        <div class="similar-grid" id="similarGrid">
          ${filtered.map(p => similarCard(p)).join('')}
        </div>
      </div>
      ${filtered.length > 3 ? `<button class="similar-nav similar-next" id="similarNext">${icon('ChevronRight', 26, 2)}</button>` : ''}
    </div>
    ${filtered.length > 3 ? `
    <div class="similar-dots" id="similarDots">
      ${Array.from({length: pages}).map((_, i) =>
        `<span class="similar-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
      ).join('')}
    </div>` : ''}
    `}
  `
  section.style.display = ''
  if (filtered.length > 3) initSimilarCarousel()
}

function initTagFilter(prop, allProps) {
  const section = document.querySelector('.similar-section')
  if (!section) return

  document.querySelectorAll('.clickable-tag').forEach(tagEl => {
    tagEl.addEventListener('click', () => {
      const selectedTag = tagEl.dataset.tag
      const isActive = tagEl.classList.contains('tag-active')
      document.querySelectorAll('.clickable-tag').forEach(t => t.classList.remove('tag-active'))

      if (isActive) {
        const filtered = allProps
          .filter(p => p.nodeId !== prop.nodeId && p.title &&
            (p.buildingCategory === prop.buildingCategory || p.priceRange === prop.priceRange))
          .slice(0, 9)
          .map(p => ({
            ...p,
            reason: p.buildingCategory === prop.buildingCategory && p.priceRange === prop.priceRange
              ? `同為${p.buildingCategory}・${p.priceRange}`
              : p.buildingCategory === prop.buildingCategory
                ? `同為${p.buildingCategory}`
                : `同價格區間・${p.priceRange}`
          }))
        rebuildSimilarSection(filtered, '也許你也會喜歡', '相似物件')
      } else {
        tagEl.classList.add('tag-active')
        const filtered = allProps
          .filter(p => p.nodeId !== prop.nodeId && p.title &&
            ((p.tags || '').split(',').map(t => t.trim()).includes(selectedTag) ||
             (p.wixParking || '').trim() === selectedTag ||
             (p.wixLocation || '').includes(selectedTag) ||
             selectedTag.includes(p.wixLocation || '')))
          .slice(0, 9)
          .map(p => ({ ...p, reason: `同樣有「${selectedTag}」` }))
        rebuildSimilarSection(filtered, `選擇了「${selectedTag}」`, '相似物件')
      }
    })
  })
}

async function loadProperty() {
  try {
    const res = await fetch(GITHUB_JSON_URL)
    const allProps = await res.json()
    const prop = allProps.find(p => p.nodeId === nodeId)
    if (!prop) {
      document.querySelector('.property-loading').innerHTML =
        `<p>找不到這個物件，<a href="properties.html" style="color:var(--teal-dark)">回到物件列表</a></p>`
      return
    }
    document.title = `${prop.title} | Cindy 王小姐`

    // 同步抓 Cloudinary 所有圖
    const images = await fetchCloudinaryImages(prop.cloudinaryFolder)
    if (prop.ogImageUrl && !images.includes(prop.ogImageUrl)) {
      images.unshift(prop.ogImageUrl)
    }

    // 同社區實價登錄行情（沒有就不顯示）
    try {
      const mkRes = await fetch(import.meta.env.BASE_URL + 'market-data.json')
      if (mkRes.ok) marketData = (await mkRes.json())[prop.nodeId] || null
    } catch { marketData = null }

    renderProperty(prop, images, allProps)
  } catch (e) {
    document.querySelector('.property-loading').innerHTML = `<p>載入失敗，請稍後再試</p>`
  }
}

let marketData = null

// 實價登錄區塊開關：資料仍每日產生，確認無誤後改回 true 即可上線
const SHOW_MARKET = false

function renderMarketBlock(prop) {
  if (!SHOW_MARKET) return ''
  if (!marketData || !marketData.deals?.length) return ''
  const myRooms = parseInt(prop.roomCount) || 0
  const rows = marketData.deals.map((d, i) => `
    <tr class="${myRooms && d.rooms === myRooms ? 'market-row-match' : ''}" data-mpage="${Math.floor(i / 5)}">
      <td>${d.date}</td>
      <td>${d.floor}</td>
      <td>${d.layout}</td>
      <td>${d.ping}坪</td>
      <td>${d.totalWan}萬${d.note ? `<span class="market-note">${d.note}</span>` : ''}</td>
      <td>${d.unitWan != null ? d.unitWan + '萬' : '—'}</td>
    </tr>`).join('')
  const pages = Math.ceil(marketData.deals.length / 5)
  return `
    <div class="property-market-wrap">
      <div class="property-section-title">${icon('TrendingUp', 16, 2)} ${marketData.community}近期實價登錄</div>
      <div class="market-table-scroll">
        <table class="market-table">
          <thead><tr><th>成交</th><th>樓層</th><th>格局</th><th>房屋坪</th><th>總價</th><th>單價/坪</th></tr></thead>
          <tbody id="marketBody">${rows}</tbody>
        </table>
      </div>
      ${pages > 1 ? `
      <div class="market-pager">
        <button class="market-pager-btn" id="marketPrev">${icon('ChevronLeft', 14, 2)} 上一頁</button>
        <span class="market-pager-info" id="marketPageInfo"></span>
        <button class="market-pager-btn" id="marketNext">下一頁 ${icon('ChevronRight', 14, 2)}</button>
      </div>` : ''}
      <div class="market-source">資料來源：內政部實價登錄，僅列車位價格完整登記之交易（單價已拆算車位），並排除親友間等特殊交易${myRooms ? '；底色列為同房型成交' : ''}</div>
      <div class="market-cta">
        <div class="market-cta-text">📬 還在觀望？加 Cindy 的 LINE，<strong>每月送你南崁實價登錄整理</strong>，行情變化不漏接</div>
        <a class="market-cta-btn" href="https://line.me/ti/p/@019nrmqw" target="_blank">加 LINE 領行情</a>
      </div>
    </div>`
}

function initMarketPager() {
  const body = document.getElementById('marketBody')
  if (!body) return
  const rows = [...body.querySelectorAll('tr')]
  const pages = Math.ceil(rows.length / 5)
  if (pages <= 1) return
  let page = 0
  const show = () => {
    rows.forEach(r => { r.style.display = r.dataset.mpage == page ? '' : 'none' })
    document.getElementById('marketPageInfo').textContent = `${page + 1} / ${pages}`
    document.getElementById('marketPrev').disabled = page === 0
    document.getElementById('marketNext').disabled = page === pages - 1
  }
  document.getElementById('marketPrev')?.addEventListener('click', () => { if (page > 0) { page--; show() } })
  document.getElementById('marketNext')?.addEventListener('click', () => { if (page < pages - 1) { page++; show() } })
  show()
}

function renderGallery(images) {
  if (images.length === 0) {
    return `<div class="gallery-placeholder">${icon('Home', 80, 1, '', 'var(--sage-dark)')}</div>`
  }
  return `
    <img class="gallery-main-img" id="galleryMain" src="${images[0]}" alt="物件照片">
    <button class="gallery-arrow prev" id="galleryPrev">${icon('ChevronLeft', 22, 2)}</button>
    <button class="gallery-arrow next" id="galleryNext">${icon('ChevronRight', 22, 2)}</button>
    <div class="gallery-thumbs" id="galleryThumbs">
      ${images.map((url, i) => `
        <img class="gallery-thumb ${i === 0 ? 'active' : ''}"
             src="${url}" alt="縮圖${i + 1}"
             data-index="${i}" loading="lazy">
      `).join('')}
    </div>
  `
}

function initGallery(images) {
  if (images.length === 0) return
  let current = 0
  const mainImg = document.getElementById('galleryMain')
  const thumbs = document.querySelectorAll('.gallery-thumb')

  function goTo(index) {
    current = (index + images.length) % images.length
    mainImg.style.opacity = '0'
    setTimeout(() => {
      mainImg.src = images[current]
      mainImg.style.opacity = '1'
    }, 150)
    thumbs.forEach((t, i) => t.classList.toggle('active', i === current))
    // 讓縮圖滾到可見
    thumbs[current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  document.getElementById('galleryPrev')?.addEventListener('click', () => goTo(current - 1))
  document.getElementById('galleryNext')?.addEventListener('click', () => goTo(current + 1))
  thumbs.forEach((t, i) => t.addEventListener('click', () => goTo(i)))

  // 鍵盤左右
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1)
    if (e.key === 'ArrowRight') goTo(current + 1)
  })
}

function renderProperty(prop, images, allProps = []) {
  const features = parseFeatures(prop.wixFeatures)
  const tags = (prop.tags || '').split(',').filter(Boolean)

  // 相似物件：同房型 OR 同價格區間，排除自己，最多3筆
  const similar = allProps
    .filter(p => p.nodeId !== prop.nodeId && p.title &&
      (p.buildingCategory === prop.buildingCategory || p.priceRange === prop.priceRange))
    .slice(0, 9)
    .map(p => ({
      ...p,
      reason: p.buildingCategory === prop.buildingCategory && p.priceRange === prop.priceRange
        ? `同為${p.buildingCategory}・${p.priceRange}`
        : p.buildingCategory === prop.buildingCategory
          ? `同為${p.buildingCategory}`
          : `同價格區間・${p.priceRange}`
    }))

  document.querySelector('.property-page').innerHTML = `
    <div class="property-gallery">
      ${renderGallery(images)}
    </div>

    <div class="property-body">
      <div class="property-main">
        <h1 class="property-title">${prop.title}</h1>
        <div class="property-price-row">
          <div class="property-price">${formatPrice(prop.price)}</div>
          ${prop.priceRange ? `<div class="property-price-range">（${prop.priceRange}）</div>` : ''}
        </div>
        <div class="property-tags">
          ${tags.map((t, i) => `<span class="property-tag clickable-tag tag-color-${i % 5}" data-tag="${t}">${t}</span>`).join('')}
          ${prop.wixLocation ? `<span class="property-tag tag-location">${icon('MapPin', 12, 2)} ${prop.wixLocation}</span>` : ''}
          ${prop.wixParking ? `<span class="property-tag tag-location">${prop.wixParking}</span>` : ''}
        </div>

        <div class="property-specs">
          <div class="spec-item">
            <span class="spec-label">格局</span>
            <span class="spec-value">${prop.layout || '—'}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">房型</span>
            <span class="spec-value">${prop.buildingCategory || '—'}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">房數</span>
            <span class="spec-value">${prop.roomCount || '—'}</span>
          </div>
        </div>

        ${renderMarketBlock(prop)}

        ${(prop.mapAddress || prop.wixLocation) ? `
        <div class="property-map-wrap">
          <div class="property-section-title">${icon('MapPin', 16, 2)} 周邊環境</div>
          <div class="property-map-label">${prop.wixLocation || prop.mapAddress}</div>
          <iframe
            class="property-map"
            src="https://maps.google.com/maps?q=${encodeURIComponent((prop.mapAddress || prop.wixLocation + ' 桃園'))}&output=embed&hl=zh-TW&z=15"
            allowfullscreen loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>` : ''}

        ${prop.youtubeUrl ? `
        <div class="property-video-wrap">
          <div class="property-section-title">${icon('Play', 16, 2)} 物件影片</div>
          <div class="property-video-container">
            <iframe
              src="https://www.youtube.com/embed/${prop.youtubeUrl}"
              title="${prop.title}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen loading="lazy">
            </iframe>
          </div>
        </div>` : ''}

        ${features.length > 0 ? `
        <div class="property-features">
          <div class="property-section-title">${icon('Star', 16, 2)} 物件特色</div>
          <ul>${features.map(f => `<li>${f}</li>`).join('')}</ul>
        </div>` : ''}

        ${prop.webDescription ? `
        <div class="property-section-title">${icon('FileText', 16, 2)} 物件說明</div>
        <div class="property-desc">${prop.webDescription.replace(/<[^>]*>/g, '').replace(/\\n/g, '<br>')}</div>
        ` : ''}

        <a href="properties.html" style="font-size:13px;color:var(--teal-dark);letter-spacing:2px;display:inline-flex;align-items:center;gap:6px;margin-top:8px">
          ${icon('ArrowLeft', 14, 2)} 回到物件列表
        </a>
      </div>

      <div class="property-sidebar">
        <div class="contact-card-sticky">
          <div class="sidebar-agent">
            <div class="sidebar-agent-avatar"><img src="images/Cindy.png" alt="Cindy" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>
            <div>
              <div class="sidebar-agent-name">王小姐</div>
              <div class="sidebar-agent-title">中信房屋南崁一極</div>
            </div>
          </div>
          <div class="sidebar-price">${formatPrice(prop.price)}</div>
          <div class="sidebar-btns">
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="sidebar-btn-line">
              ${icon('MessageCircle', 16, 2)} LINE 我詢問
            </a>
            <a href="tel:0963585690" class="sidebar-btn-tel">
              ${icon('Phone', 16, 2)} 王小姐 0963-585-690
            </a>
            <a href="tel:0968731280" class="sidebar-btn-tel">
              ${icon('Phone', 16, 2)} 王先生 0968-731-280
            </a>
          </div>
          <div class="sidebar-note">不管是問行情還是想看房<br>隨時都可以找我</div>
          <!-- 分享區塊 -->
          <div class="sidebar-share">
            <div class="sidebar-share-label">分享此物件</div>
            <div class="sidebar-share-btns">
              <button id="btnShareLine" class="share-btn share-btn-line">${icon('MessageCircle', 14, 2)} LINE</button>
              <button id="btnShareFb" class="share-btn share-btn-fb">${icon('MessageCircle', 14, 2)} Messenger</button>
              <button id="btnCopyLink" class="share-btn share-btn-copy">${icon('Link', 14, 2)} 複製連結</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    ${similar.length > 0 ? `
    <div class="similar-section">
      <div class="similar-inner">
        <div class="similar-title-row">
          <div class="section-eyebrow" id="similarEyebrow">也許你也會喜歡</div>
          <h2 class="similar-heading" id="similarHeading">相似物件</h2>
        </div>
        <div class="similar-carousel-wrap">
          ${similar.length > 3 ? `<button class="similar-nav similar-prev" id="similarPrev">${icon('ChevronLeft', 26, 2)}</button>` : ''}
          <div class="similar-overflow">
            <div class="similar-grid" id="similarGrid">
              ${similar.map(p => similarCard(p)).join('')}
            </div>
          </div>
          ${similar.length > 3 ? `<button class="similar-nav similar-next" id="similarNext">${icon('ChevronRight', 26, 2)}</button>` : ''}
        </div>
        ${similar.length > 3 ? `
        <div class="similar-dots" id="similarDots">
          ${Array.from({length: Math.ceil(similar.length / 3)}).map((_, i) =>
            `<span class="similar-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`
          ).join('')}
        </div>` : ''}
      </div>
    </div>` : ''}

  `

  setOgMeta(prop, images)
  initGallery(images)
  initShare(prop)
  initMarketPager()
  initTagFilter(prop, allProps)
  initSimilarCarousel()
}

function initSimilarCarousel() {
  const grid = document.getElementById('similarGrid')
  const prev = document.getElementById('similarPrev')
  const next = document.getElementById('similarNext')
  const dots = document.querySelectorAll('.similar-dot')
  if (!grid || !prev || !next) return

  const cards = grid.querySelectorAll('.similar-card')
  const total = cards.length
  const perPage = window.innerWidth <= 768 ? 2 : 3
  const pages = Math.ceil(total / perPage)
  let current = 0

  function goTo(page) {
    current = Math.max(0, Math.min(page, pages - 1))
    const gap = parseInt(getComputedStyle(grid).columnGap) || 40
    const cardW = cards[0].offsetWidth
    const pageWidth = perPage * (cardW + gap)
    grid.style.transform = `translateX(-${current * pageWidth}px)`
    dots.forEach((d, i) => d.classList.toggle('active', i === current))
    prev.style.opacity = current === 0 ? '0.3' : '1'
    next.style.opacity = current === pages - 1 ? '0.3' : '1'
  } 

  prev.addEventListener('click', () => { if (current > 0) goTo(current - 1) })
  next.addEventListener('click', () => { if (current < pages - 1) goTo(current + 1) })
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)))
  goTo(0)
}

function setOgMeta(prop, images) {
  const url = location.href
  const img = prop.ogImageUrl || images[0] || ''
  const setMeta = (property, content) => {
    let el = document.querySelector(`meta[property="${property}"]`)
    if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
    el.setAttribute('content', content)
  }
  setMeta('og:title', `${prop.title} | Cindy 王小姐`)
  // 這樣 LINE 預覽卡片長相會是：
  // 【大圖】：超可愛的 Cindy 形象名片圖
  // 【大標題】：觀音工業區鼎藏大觀透天 | Cindy 王瑋薰
  // 【下方小字描述】：💰 售價與詳情請點擊查閱。南崁在地房產諮詢，陪你找到最適合的家！
  setMeta('og:description', `💰 售價與詳情請點擊查閱。格局：${prop.layout || '—'}，${prop.wixLocation || ''}精選房源推薦。`)
  setMeta('og:image', img)
  setMeta('og:url', url)
  setMeta('og:type', 'website')
}

function initShare(prop) {
  const url = `https://cindy94502.github.io/cindy-web/p/${encodeURIComponent(prop.nodeId)}.html`
  const details = [
    prop.layout ? `格局：${prop.layout}` : '',
    prop.buildingSize ? `建坪：${prop.buildingSize}坪` : '',
    prop.landSize ? `土坪：${prop.landSize}坪` : '',
  ].filter(Boolean).join('\n')
  const title = `${prop.title}｜NT${prop.price ? (prop.price/10000).toFixed(0) + '萬' : '洽談'}｜Cindy 王小姐` + (details ? '\n' + details : '')

  document.getElementById('btnCopyLink')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(title + '\n' + url)
      const btn = document.getElementById('btnCopyLink')
      btn.textContent = '✓ 已複製！'
      setTimeout(() => btn.textContent = '複製連結', 2000)
    } catch { alert('請手動複製網址') }
  })

  document.getElementById('btnShareLine')?.addEventListener('click', () => {
    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(title + '\n' + url)}`, '_blank')
  })

  document.getElementById('btnShareFb')?.addEventListener('click', () => {
    const messengerUrl = `fb-messenger://share?link=${encodeURIComponent(url)}`
    window.location.href = messengerUrl
    setTimeout(() => {
      window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(url)}`, '_blank')
    }, 1500)
  })
}

loadProperty()
