// 聯絡區的刮除效果：上層是空屋（看房那天），刮開露出有家具的家（住進來以後）。
//
// 兩張圖是同機位的，一家人完全沒動，變的只有家具、衣服和牆的顏色，
// 所以刮開會讀成「同一個地方變了」，不是兩張照片在交替。
//
// 效能上做了四件事，因為底線是爸爸那支 vivo：
//   1. 每秒只重畫 30 幀
//   2. 捲出畫面就停掉整個迴圈
//   3. 沒有刮痕在動、指標也不在上面時自己停
//   4. 手機載小圖（900px），桌機才載 1800px
//
// 要關掉整個效果：main.js 裡把 SHOW_CONTACT_REVEAL 改成 false。

const SETTINGS = {
  brush: 55,        // 筆刷半徑
  rough: 0.55,      // 邊緣粗糙度
  healMs: 2000,     // 刮痕多久癒合回去
  shimmer: 0.5,     // 邊緣蠕動幅度，0 = 靜止
}

const STEPS = 44        // 筆刷輪廓取樣點，太少邊緣會看得出是折線
const MAX_LIVE = 140    // 同時在動的刮痕上限
const FPS = 30

export function initContactReveal() {
  // 只有手機才跑。電腦版的 hero 已經有「Find home」可以看同一張圖，
  // 頁尾維持原本的 teal 底 —— 而且不初始化就完全不會下載那兩張圖。
  const isMobile = matchMedia('(max-width: 900px), (hover: none), (pointer: coarse)').matches
  if (!isMobile) return

  const section = document.getElementById('contact')
  if (!section) return
  createScratchReveal({
    root: section,
    media: section.querySelector('.contact-media'),
    canvas: section.querySelector('.contact-scratch'),
    hint: section.querySelector('.contact-reveal-hint'),
    topSrc: (small) => small ? 'images/home-empty-sm.webp' : 'images/home-empty.webp',
    brush: 78,   // 這一區是滿版的，55 刮起來太細像鉛筆
  })
}

// 同一套刮除邏輯，hero 和聯絡區共用。
// root 用來做 IntersectionObserver（捲出畫面就停）、media 決定 canvas 尺寸。
// flip: 水平鏡射。hero 需要這個 —— 圖是照聯絡區構的（一家人在左下），
// 但 hero 左邊要留給標題，鏡射之後人就到右邊了。
// 鏡射做在 canvas 內部（不是用 CSS transform 翻整個 canvas），
// 這樣滑鼠座標不用跟著換算，刮哪裡就開哪裡。
export function createScratchReveal({
  root, media, canvas, hint, topSrc, onReady,
  flip = false,
  brush = SETTINGS.brush,   // 筆刷半徑。畫面越大要越粗，不然刮起來像用鉛筆
  posY = 0.5,               // 垂直裁切中心，要跟該層 CSS 的 object-position 一致
  // 滑鼠事件掛在哪。預設掛在 canvas 上，但那樣任何蓋在上面的東西
  // （標題、按鈕、浮動聯絡鈕）都會變成刮不到的死角。
  // 傳整個 hero 進來的話，事件會從上層元素冒泡上來，整片都有反應 ——
  // 這就是小薰那層刮動的做法（它掛在 heroSection 上）。
  listenOn = null,
  enabled = true,           // hero 要等切到「找到家」才開
}) {
  if (!root || !media || !canvas) return null

  const ctx = canvas.getContext('2d')
  const baked = document.createElement('canvas')
  const bctx = baked.getContext('2d')
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
  const small = matchMedia('(max-width: 900px)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 2)

  const { rough, healMs, shimmer } = SETTINGS
  let live = []
  let rafId = null, lastFrame = 0, inView = false
  let last = null, hover = null, touchStart = null, decided = null
  let ready = false, bakedCount = 0, demoed = false
  let active = enabled
  const surface = listenOn || canvas

  const topImg = new Image()
  topImg.decoding = 'async'
  topImg.onload = () => { ready = true; sizeCanvas(); onReady?.() }
  topImg.src = topSrc(small)

  // ── 撕紙邊緣 ──
  // 半徑隨「角度」變化。單純疊幾個抖動的圓會得到一坨泡泡，
  // 而且單層低頻雜訊繞一圈只跨過六到八個格點，邊緣會變成多邊形，
  // 所以這裡用四層不同頻率疊起來。
  const hash = (x, y) => {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
    return n - Math.floor(n)
  }
  const noise2 = (x, y) => {
    const ix = Math.floor(x), iy = Math.floor(y)
    const fx = x - ix, fy = y - iy
    const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy)
    const a = hash(ix, iy), b = hash(ix + 1, iy)
    const c = hash(ix, iy + 1), d = hash(ix + 1, iy + 1)
    return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
  }
  const fbm = (x, y) => {
    let v = 0, amp = 0.5
    for (let i = 0; i < 4; i++) { v += amp * noise2(x, y); x *= 2.1; y *= 2.1; amp *= 0.42 }
    return v
  }

  function blob(c, x, y, t, alpha) {
    const r = brush * dpr * (0.35 + 0.65 * alpha)
    // seed 要「跳」不能「漸變」，不然相鄰刮痕形狀幾乎一樣，滑過去像同一個章蓋一排
    const seed = hash(Math.floor(x / 9), Math.floor(y / 9)) * 97
    const rot = seed * 0.7
    c.beginPath()
    for (let i = 0; i <= STEPS; i++) {
      const a = i / STEPS * Math.PI * 2 + rot
      const ca = Math.cos(a), sa = Math.sin(a)
      const n1 = fbm(ca * 2.6 + seed + t, sa * 2.6 + seed)
      const n2 = fbm(ca * 5.3 - seed, sa * 5.3 + seed + t * 0.7)
      const rr = r * (0.72 + (n1 * 0.62 + n2 * 0.3) * rough)
      const px = x + Math.cos(a) * rr, py = y + Math.sin(a) * rr
      i === 0 ? c.moveTo(px, py) : c.lineTo(px, py)
    }
    c.closePath()
    const g = c.createRadialGradient(x, y, r * 0.15, x, y, r * 1.18)
    g.addColorStop(0, `rgba(0,0,0,${alpha})`)
    g.addColorStop(0.62, `rgba(0,0,0,${alpha * 0.96})`)
    g.addColorStop(1, 'rgba(0,0,0,0)')
    c.fillStyle = g
    c.fill()
  }

  function drawTop() {
    const w = canvas.width, h = canvas.height
    ctx.globalCompositeOperation = 'source-over'
    ctx.clearRect(0, 0, w, h)
    const ir = topImg.width / topImg.height, cr = w / h
    let dw, dh, dx, dy
    // 這裡要跟 style.css 的 .contact-layer object-position 完全一致，
    // 不然上層 canvas 和下層 img 會差幾十像素，刮開就會看到房間錯位。
    if (ir > cr) { dh = h; dw = h * ir; dx = (w - dw) / 2; dy = 0 }
    else { dw = w; dh = w / ir; dx = 0; dy = (h - dh) * posY }
    if (flip) {
      ctx.save()
      ctx.translate(w, 0); ctx.scale(-1, 1)
      ctx.drawImage(topImg, dx, dy, dw, dh)
      ctx.restore()
    } else {
      ctx.drawImage(topImg, dx, dy, dw, dh)
    }
  }

  function render(now) {
    rafId = requestAnimationFrame(render)
    if (now - lastFrame < 1000 / FPS) return
    lastFrame = now

    const t = now * 0.0004 * shimmer
    drawTop()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.drawImage(baked, 0, 0)

    if (healMs > 0) live = live.filter(s => now - s.t < healMs)
    for (const s of live) {
      const a = healMs > 0 ? 1 - (now - s.t) / healMs : 1
      blob(ctx, s.x, s.y, t, Math.max(0, a))
    }
    // 指標停著不動時每幀重畫，洞才會留在原地
    if (hover) blob(ctx, hover.x, hover.y, t, 1)

    if (live.length === 0 && !hover && (healMs > 0 || shimmer === 0)) {
      cancelAnimationFrame(rafId); rafId = null
      drawTop()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.drawImage(baked, 0, 0)
    }
  }
  const ensureLoop = () => { if (!rafId && inView && !reduced) rafId = requestAnimationFrame(render) }

  function addStamp(x, y) {
    if (reduced) {
      blob(bctx, x, y, 0, 1); bakedCount++
      drawTop()
      ctx.globalCompositeOperation = 'destination-out'
      ctx.drawImage(baked, 0, 0)
      return
    }
    live.push({ x, y, t: performance.now() })
    if (healMs === 0 && live.length > MAX_LIVE) {
      const old = live.shift(); blob(bctx, old.x, old.y, 0, 1); bakedCount++
    } else if (live.length > MAX_LIVE * 2) live.shift()
    ensureLoop()
  }

  function scratchLine(x0, y0, x1, y1) {
    const dist = Math.hypot(x1 - x0, y1 - y0)
    const steps = Math.max(1, Math.ceil(dist / (brush * dpr * 0.45)))
    for (let i = 0; i <= steps; i++) {
      addStamp(x0 + (x1 - x0) * i / steps, y0 + (y1 - y0) * i / steps)
    }
  }

  function sizeCanvas() {
    const r = media.getBoundingClientRect()
    if (!r.width) return
    canvas.width = baked.width = Math.round(r.width * dpr)
    canvas.height = baked.height = Math.round(r.height * dpr)
    bctx.clearRect(0, 0, baked.width, baked.height)
    bakedCount = 0; live = []
    if (ready) drawTop()
  }

  const pos = (e) => {
    const r = canvas.getBoundingClientRect()
    const p = e.touches ? e.touches[0] : e
    return { x: (p.clientX - r.left) * dpr, y: (p.clientY - r.top) * dpr }
  }

  // 桌機：滑過去就刮，不用按。
  // mouseenter 一定要重設起點，不然滑鼠離開再從別的角落回來，
  // 會從上次的位置連一條線過來，畫面上憑空多一道長刮痕。
  surface.addEventListener('mouseenter', (e) => { if (ready && active) { last = hover = pos(e); ensureLoop() } })
  surface.addEventListener('mousemove', (e) => {
    if (!ready || !active) return
    const p = pos(e)
    if (last) { scratchLine(last.x, last.y, p.x, p.y); hideHint() }
    last = hover = p
    ensureLoop()
  })
  surface.addEventListener('mouseleave', () => { last = hover = null })

  // 手機：橫向才刮，直向讓頁面正常捲動
  surface.addEventListener('touchstart', (e) => {
    if (!ready || !active) return
    const t = e.touches[0]
    touchStart = { x: t.clientX, y: t.clientY }; decided = null; last = pos(e)
  }, { passive: true })
  surface.addEventListener('touchmove', (e) => {
    if (!ready || !active || !touchStart) return
    const t = e.touches[0]
    if (decided === null) {
      const dx = Math.abs(t.clientX - touchStart.x), dy = Math.abs(t.clientY - touchStart.y)
      if (dx < 6 && dy < 6) return
      decided = dx > dy ? 'scratch' : 'scroll'
      if (decided === 'scratch') hideHint()
    }
    if (decided !== 'scratch') return
    e.preventDefault()
    const p = pos(e); scratchLine(last.x, last.y, p.x, p.y); last = hover = p
    ensureLoop()
  }, { passive: false })
  const endTouch = () => { touchStart = null; decided = null; hover = null }
  surface.addEventListener('touchend', endTouch)
  surface.addEventListener('touchcancel', endTouch)

  // 自己先刮一小道，不然沒人知道可以刮
  function demo() {
    if (reduced) return
    const w = canvas.width, h = canvas.height, y = h * 0.66
    let x = w * 0.30
    const to = w * 0.46
    const step = () => {
      scratchLine(x, y, Math.min(x + w * 0.02, to), y + Math.sin(x / 60) * 6)
      x += w * 0.02
      if (x < to) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  let hintTimer = null
  function hideHint() { hint?.classList.add('is-gone'); clearTimeout(hintTimer) }

  // 示範刮痕要等到「捲進畫面」才刮。
  // 綁在圖片載入的話，使用者還在頁面上方，那一道刮痕早就癒合掉了，
  // 等他捲到這裡只會看到一張沒動靜的圖，不知道可以刮。
  new IntersectionObserver((es) => {
    inView = es[0].isIntersecting
    if (inView) {
      ensureLoop()
      if (!demoed && ready) { demoed = true; demo() }
      if (!hintTimer) hintTimer = setTimeout(hideHint, 6000)
    } else if (rafId) { cancelAnimationFrame(rafId); rafId = null }
  }, { threshold: 0.25 }).observe(root)

  let rt
  addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(sizeCanvas, 150) })

  // 給呼叫端用：hero 切換模式時要能暫停／恢復，還原則是重來一次
  return {
    resize: sizeCanvas,
    reset() {
      bctx.clearRect(0, 0, baked.width, baked.height)
      bakedCount = 0; live = []; hover = null; last = null
      if (ready) { drawTop(); demoed = false }
    },
    setActive(on) {
      active = on
      if (!on) { last = hover = null }
      inView = on
      if (on) { ensureLoop(); if (!demoed && ready) { demoed = true; demo() } }
      else if (rafId) { cancelAnimationFrame(rafId); rafId = null }
    },
  }
}
