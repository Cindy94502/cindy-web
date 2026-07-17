// 首頁精選物件動畫展示（改造自 Timed Cards Opening / CodePen dilums NWodZMd）
// 卡片放大成整個容器背景、文字滑入，每幾秒自動換下一間。
// 桌面版限定：手機由 main.js 直接沿用原本的卡片 grid。
import { gsap } from 'gsap'
import { formatPrice } from './data.js'

const ease = 'sine.inOut'

export function initHomeShowcase(container, props) {
  const items = props.filter(p => p.ogImageUrl && p.nodeId).slice(0, 6)
  if (items.length < 3) return false

  container.innerHTML = `
    <div class="hsc-indicator"></div>
    <div class="hsc-stage"></div>
    <div class="hsc-shade"></div>
    <div class="hsc-details" data-d="0"></div>
    <div class="hsc-details" data-d="1"></div>
    <div class="hsc-pagination">
      <div class="hsc-progress"><div class="hsc-progress-fg"></div></div>
      <div class="hsc-numbers"></div>
    </div>
  `
  const stage = container.querySelector('.hsc-stage')
  stage.innerHTML =
    items.map((p, i) => `<div class="hsc-card" id="hscCard${i}" style="background-image:url('${p.ogImageUrl}')"></div>`).join('') +
    items.map((p, i) => `<div class="hsc-card-label" id="hscLabel${i}"><div class="hsc-label-bar"></div><div class="hsc-label-loc">${p.wixLocation || ''}</div><div class="hsc-label-title">${p.title}</div></div>`).join('')
  container.querySelector('.hsc-numbers').innerHTML =
    items.map((_, i) => `<div class="hsc-num" id="hscNum${i}">${i + 1}</div>`).join('')

  const detailBoxes = [...container.querySelectorAll('.hsc-details')]
  detailBoxes.forEach(box => {
    box.innerHTML = `
      <div class="hsc-place-box"><div class="hsc-place"></div></div>
      <div class="hsc-title-box"><div class="hsc-title"></div></div>
      <div class="hsc-desc"></div>
      <div class="hsc-price"></div>
      <div class="hsc-cta">
        <a class="hsc-btn-main" href="#">看看這間 →</a>
      </div>`
  })

  const card = i => `#hscCard${i}`
  const label = i => `#hscLabel${i}`
  const num = i => `#hscNum${i}`
  const N = items.length
  let order = [...Array(N).keys()]
  let flip = 0
  let W = 0, H = 0, offsetLeft = 0, offsetTop = 0
  const cardW = 150, cardH = 210, gap = 26, numSize = 44
  let running = false

  const shortDesc = p => {
    const t = (p.webDescription || '').replace(/<[^>]*>/g, '')
    return t.length > 52 ? t.slice(0, 52) + '…' : t
  }

  function fill(box, p) {
    box.querySelector('.hsc-place').textContent = p.wixLocation || p.buildingCategory || ''
    box.querySelector('.hsc-title').textContent = p.title
    box.querySelector('.hsc-desc').textContent = shortDesc(p)
    box.querySelector('.hsc-price').textContent = formatPrice(p.price)
    box.querySelector('.hsc-btn-main').href = `property.html?id=${p.nodeId}`
  }

  function measure() {
    W = container.clientWidth
    H = container.clientHeight
    offsetLeft = Math.max(W - 640, Math.round(W * 0.42))
    offsetTop = H - 300
  }

  function layout() {
    measure()
    const [active, ...rest] = order
    gsap.set(card(active), { x: 0, y: 0, width: W, height: H, borderRadius: 0 })
    gsap.set(label(active), { opacity: 0 })
    rest.forEach((i, idx) => {
      const x = offsetLeft + idx * (cardW + gap)
      gsap.set(card(i), { x, y: offsetTop, width: cardW, height: cardH, zIndex: 30, borderRadius: 14 })
      gsap.set(label(i), { x, y: offsetTop + cardH - 74, opacity: 1, zIndex: 40 })
      gsap.set(num(i), { x: (idx + 1) * numSize })
    })
    gsap.set(num(active), { x: 0 })
    gsap.set('.hsc-progress-fg', { width: `${(100 / N) * (active + 1)}%` })
  }

  function step() {
    return new Promise(resolve => {
      order.push(order.shift())
      flip = 1 - flip
      const boxA = detailBoxes[flip], boxB = detailBoxes[1 - flip]
      const [active, ...rest] = order
      fill(boxA, items[active])

      gsap.set(boxA, { zIndex: 22, opacity: 0 })
      gsap.set(boxA.querySelectorAll('.hsc-place,.hsc-title'), { y: 70 })
      gsap.set(boxA.querySelectorAll('.hsc-desc,.hsc-price,.hsc-cta'), { y: 40, opacity: 0 })
      gsap.to(boxA, { opacity: 1, delay: 0.35, ease })
      gsap.to(boxA.querySelectorAll('.hsc-place,.hsc-title'), { y: 0, delay: 0.15, duration: 0.65, ease })
      gsap.to(boxA.querySelectorAll('.hsc-desc,.hsc-price,.hsc-cta'), { y: 0, opacity: 1, delay: 0.35, duration: 0.45, stagger: 0.06, ease, onComplete: resolve })
      gsap.to(boxB, { opacity: 0, duration: 0.3, ease })
      gsap.set(boxB, { zIndex: 12 })

      const prv = rest[rest.length - 1]
      gsap.set(card(prv), { zIndex: 10 })
      gsap.set(card(active), { zIndex: 20 })
      gsap.to(card(prv), { scale: 1.4, ease })
      gsap.to(label(active), { y: offsetTop + cardH - 10, opacity: 0, duration: 0.3, ease })
      gsap.to(num(active), { x: 0, ease })
      gsap.to(num(prv), { x: -numSize, ease })
      gsap.to('.hsc-progress-fg', { width: `${(100 / N) * (active + 1)}%`, ease })

      gsap.to(card(active), {
        x: 0, y: 0, width: W, height: H, borderRadius: 0, ease,
        onComplete: () => {
          const xNew = offsetLeft + (rest.length - 1) * (cardW + gap)
          gsap.set(card(prv), { x: xNew, y: offsetTop, width: cardW, height: cardH, zIndex: 30, borderRadius: 14, scale: 1 })
          gsap.set(label(prv), { x: xNew, y: offsetTop + cardH - 74, opacity: 1, zIndex: 40 })
          gsap.set(num(prv), { x: rest.length * numSize })
        },
      })
      rest.forEach((i, idx) => {
        if (i === prv) return
        const xNew = offsetLeft + idx * (cardW + gap)
        gsap.set(card(i), { zIndex: 30 })
        gsap.to(card(i), { x: xNew, y: offsetTop, width: cardW, height: cardH, ease, delay: 0.08 * (idx + 1) })
        gsap.to(label(i), { x: xNew, y: offsetTop + cardH - 74, opacity: 1, zIndex: 40, ease, delay: 0.08 * (idx + 1) })
        gsap.to(num(i), { x: (idx + 1) * numSize, ease })
      })
    })
  }

  async function loop() {
    if (!running) return
    await animate('.hsc-indicator', 2.2, { x: 0 })
    await animate('.hsc-indicator', 0.7, { x: W, delay: 0.3 })
    gsap.set('.hsc-indicator', { x: -W })
    if (!running) return
    await step()
    loop()
  }
  const animate = (t, d, p) => new Promise(r => gsap.to(t, { ...p, duration: d, onComplete: r }))

  // 進入視野才開始跑，離開就暫停（省效能，也避免背景分頁亂跳）
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !running) { running = true; loop() }
      else if (!e.isIntersecting) { running = false }
    })
  }, { threshold: 0.25 })

  // 首圖載好再開場
  const first = new Image()
  let booted = false
  const boot = () => {
    if (booted) return
    if (!container.clientWidth) { setTimeout(boot, 300); return }
    booted = true
    measure()
    fill(detailBoxes[flip], items[order[0]])
    gsap.set(detailBoxes[1 - flip], { opacity: 0, zIndex: 12 })
    gsap.set('.hsc-indicator', { x: -W })
    layout()
    gsap.to(detailBoxes[flip], { opacity: 1, duration: 0.6, ease })
    io.observe(container)
  }
  first.onload = boot
  first.onerror = boot
  first.src = items[0].ogImageUrl
  setTimeout(boot, 5000)

  let rT
  addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(layout, 200) })
  return true
}
