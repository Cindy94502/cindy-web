import './style.css'
import './properties.css'
import { icon } from './icons.js'
import { renderNav, renderFooter, initCommon } from './shared.js'
import { GITHUB_JSON_URL, PRICE_RANGES, LAYOUTS, CATEGORIES, formatPrice } from './data.js'

const tapeColors = ['var(--yellow)', 'var(--pink)', 'var(--teal-light)', 'var(--peach)', 'var(--sage)', 'var(--yellow)']

// 右側裝飾插圖 - 換成真實圖片
const houseSvg = `<img src="images/house_small.png" alt="" class="filter-deco-img" aria-hidden="true">`

function propCard(p, index) {
  const tape = tapeColors[index % tapeColors.length]
  // 組 Cloudinary 圖片 URL
  const imgUrl = p.ogImageUrl ||
    (p.cloudinaryFolder ? `https://res.cloudinary.com/ddzync8km/image/upload/${p.cloudinaryFolder}_0.jpg` : '')
  const iconName = p.buildingCategory === '透天' ? 'House' : 'Building2'

  return `
  <a href="property.html?id=${p.nodeId}" class="prop-card-full" 
     data-category="${p.buildingCategory || ''}"
     data-room="${p.roomCount || ''}"
     data-price="${p.priceRange || ''}"
     data-search="${(p.title + ' ' + (p.tags || '') + ' ' + (p.wixLocation || '') + ' ' + (p.roomCount || '') + ' ' + (p.layout || '')).toLowerCase()}">
    <div class="prop-card-img">
      ${imgUrl
        ? `<img src="${imgUrl}" alt="${p.title}" loading="lazy" onerror="this.src='images/house_small.png';this.style.objectFit='contain';this.style.opacity='0.5';this.style.padding='20px'">`
        : `<div class="prop-card-img-icon"><img src="images/house_small.png" alt="" style="height:80px;opacity:0.5"></div>`
      }
      <div class="prop-card-category">${p.buildingCategory || p.category || '住宅'}</div>
    </div>
    <div class="prop-card-body">
      <div class="prop-price">${formatPrice(p.price)}</div>
      <div class="prop-name">${p.title}</div>
      <div class="prop-desc">${(p.tags || '').split(',').filter(Boolean).slice(0, 3).join('・')}</div>
      <div class="prop-info">
        <span class="prop-tag">${p.layout || ''}</span>
        <span class="prop-tag">${p.buildingCategory || ''}</span>
        <span class="prop-tag">${p.wixParking || ''}</span>
      </div>
      <div class="prop-card-footer">
        <span class="prop-location">${icon('MapPin', 13, 2, 'prop-loc-icon')} ${p.wixLocation || ''}</span>
        <span class="prop-link">查看詳情 ${icon('ArrowRight', 13, 2)}</span>
      </div>
    </div>
  </a>`
}

// 骨架 loading
function skeletonCard() {
  return `<div class="prop-skeleton">
    <div class="skeleton-img skeleton-pulse"></div>
    <div class="prop-card-body">
      <div class="skeleton-line skeleton-pulse" style="width:40%;height:20px;margin-bottom:8px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:80%;height:14px;margin-bottom:6px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:60%;height:12px"></div>
    </div>
  </div>`
}

document.getElementById('app').innerHTML = `
  ${renderNav('properties')}

  <div class="props-page-header">
    <div class="props-page-header-inner">
      <div class="props-page-header-left">
        <div class="props-page-eyebrow"><span class="nav-logo-dot"></span>精選物件</div>
        <h1 class="props-page-title">買房精選物件</h1>
      </div>
      <div class="props-page-header-right">
        <div class="filter-search-wrap">
          <span class="filter-search-icon">${icon('Search', 14, 2)}</span>
          <input type="text" id="filterSearch" class="filter-search-input" placeholder="搜尋地區、特色、關鍵字…">
        </div>
        <div class="filter-quick-tags">
          <button class="quick-tag" data-keyword="台茂">${icon('ShoppingBag', 11, 2)} 近台茂</button>
          <button class="quick-tag" data-keyword="好市多">${icon('ShoppingBag', 11, 2)} 近好市多</button>
          <button class="quick-tag" data-keyword="A10">${icon('MapPin', 11, 2)} 機捷A10</button>
          <button class="quick-tag" data-keyword="航空城">${icon('MapPin', 11, 2)} 航空城</button>
          <button class="quick-tag" data-keyword="河濱公園">${icon('MapPin', 11, 2)} 河濱公園</button>
          <button class="quick-tag" data-keyword="新成屋">${icon('Star', 11, 2)} 新成屋</button>
          <button class="quick-tag" data-keyword="投資收租">${icon('Banknote', 11, 2)} 投資收租</button>
          <button class="quick-tag" data-keyword="透天">${icon('House', 11, 2)} 透天</button>
        </div>
      </div>
    </div>
  </div>

  <div class="props-filter-section">
    <div class="props-filter-inner">
      <div class="filter-group">
        <span class="filter-group-label">物件類型</span>
        <div class="filter-radio-row">
          <label class="filter-radio-item">
            <input type="radio" name="category" value="all" checked>
            <span class="filter-radio-dot"></span>
            <span class="filter-radio-text">所有</span>
          </label>
          ${CATEGORIES.map(c => `
          <label class="filter-radio-item">
            <input type="radio" name="category" value="${c}">
            <span class="filter-radio-dot"></span>
            <span class="filter-radio-text">${c}</span>
          </label>`).join('')}
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-group-label">格局</span>
        <div class="filter-select-wrap">
          <select class="filter-select" id="filterLayout">
            <option value="all">選擇格局</option>
            ${LAYOUTS.map(l => `<option value="${l}">${l}</option>`).join('')}
          </select>
          <span class="filter-select-arrow">${icon('ChevronDown', 14, 2)}</span>
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-group-label">價格區間</span>
        <div class="filter-select-wrap">
          <select class="filter-select" id="filterPrice">
            <option value="all">選擇價格區間</option>
            ${PRICE_RANGES.map(r => `<option value="${r}">${r}</option>`).join('')}
          </select>
          <span class="filter-select-arrow">${icon('ChevronDown', 14, 2)}</span>
        </div>
      </div>
      <div class="filter-deco">${houseSvg}</div>
    </div>
  </div>

  <div class="props-page-body">
    <div class="props-count">載入中...</div>
    <div class="props-full-grid" id="propsGrid">
      ${[...Array(6)].map(() => skeletonCard()).join('')}
    </div>
  </div>

  ${renderFooter()}
`

initCommon()

// Fetch GitHub JSON
let allProps = []

async function loadProperties() {
  try {
    const res = await fetch(GITHUB_JSON_URL)
    if (!res.ok) throw new Error('fetch failed')
    allProps = await res.json()
    renderProps(allProps)
  } catch (e) {
    document.getElementById('propsGrid').innerHTML =
      `<div class="props-empty show">
        ${icon('AlertCircle', 36, 1.5)}
        <p>載入失敗，請稍後再試</p>
      </div>`
    document.querySelector('.props-count').textContent = ''
  }
}

function renderProps(props) {
  const grid = document.getElementById('propsGrid')
  grid.innerHTML = props.length
    ? props.map((p, i) => propCard(p, i)).join('') +
      `<div class="props-empty" id="propsEmpty">
        ${icon('Search', 40, 1.2)}
        <p>這個條件目前沒有物件<br>歡迎直接聯絡我詢問</p>
      </div>`
    : `<div class="props-empty show">${icon('Search', 40)}<p>目前沒有物件</p></div>`

  document.querySelector('.props-count').innerHTML =
    `共 <strong id="propCount">${props.length}</strong> 筆物件`

  // 更新 hero 數字
  const heroNum = document.getElementById('heroStatNum')
  if (heroNum) heroNum.textContent = props.length

  // scroll reveal
  document.querySelectorAll('.prop-card-full').forEach((el, i) => {
    el.classList.add('reveal', `reveal-d${(i % 3) + 1}`)
  })
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

  setupFilter()
}

function setupFilter() {
  function applyFilter() {
    const category = document.querySelector('input[name="category"]:checked')?.value || 'all'
    const layout = document.getElementById('filterLayout').value
    const price = document.getElementById('filterPrice').value
    const search = (document.getElementById('filterSearch')?.value || '').toLowerCase().trim()
    const cards = document.querySelectorAll('.prop-card-full')
    let visible = 0
    cards.forEach(card => {
      const matchCat = category === 'all' || card.dataset.category === category
      const matchRoom = layout === 'all' || card.dataset.room === layout
      const matchPrice = price === 'all' || card.dataset.price === price
      const matchSearch = !search || (card.dataset.search || '').includes(search)
      const show = matchCat && matchRoom && matchPrice && matchSearch
      card.classList.toggle('hidden', !show)
      if (show) visible++
    })
    document.getElementById('propCount').textContent = visible
    const empty = document.getElementById('propsEmpty')
    if (empty) empty.classList.toggle('show', visible === 0)
  }
  document.querySelectorAll('input[name="category"]').forEach(r => r.addEventListener('change', applyFilter))
  document.getElementById('filterLayout').addEventListener('change', applyFilter)
  document.getElementById('filterPrice').addEventListener('change', applyFilter)
  document.getElementById('filterSearch')?.addEventListener('input', applyFilter)

  // 快速標籤點選
  document.querySelectorAll('.quick-tag').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('filterSearch')
      const keyword = btn.dataset.keyword
      if (input.value === keyword) {
        // 再點一次取消
        input.value = ''
        btn.classList.remove('active')
      } else {
        input.value = keyword
        document.querySelectorAll('.quick-tag').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
      }
      applyFilter()
    })
  })
}

loadProperties()
