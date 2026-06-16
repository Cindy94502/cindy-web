import{r as n,i as a,a as d,b as l,G as v,f as p}from"./data-Cg2LJW7J.js";function r(s,i){return`<div class="torn-divider" style="background:${i}">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L0,20 C80,35 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,8 960,22 C1040,36 1120,14 1200,28 C1280,42 1360,16 1440,20 L1440,0 Z" fill="${s}"/>
    </svg>
  </div>`}function g(s,i){const e=s.ogImageUrl||"",c=s.buildingCategory==="透天"?"House":"Building2";return`
  <a href="property.html?id=${s.nodeId}" class="prop-card reveal reveal-d${i+1}" target="_blank">
    <div class="prop-card-img">
      ${e?`<img src="${e}" alt="${s.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0">`:`<div class="prop-card-img-icon">${a(c,48,1,"prop-placeholder-icon")}</div>`}
      <div class="prop-card-category">${s.buildingCategory||"住宅"}</div>
    </div>
    <div class="prop-card-body">
      <div class="prop-price">${p(s.price)}</div>
      <div class="prop-name">${s.title}</div>
      <div class="prop-info">
        <span class="prop-tag">${s.layout||""}</span>
        <span class="prop-tag">${s.buildingCategory||""}</span>
      </div>
      <div class="prop-card-footer">
        <span class="prop-location">${a("MapPin",13,2,"prop-loc-icon")} ${s.wixLocation||""}</span>
        <span class="prop-link">查看詳情 ${a("ArrowRight",13,2)}</span>
      </div>
    </div>
  </a>`}document.getElementById("app").innerHTML=`
  ${n()}

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
          <img src="/images/note_ideal.png" alt="理想生活 從家開始">
        </div>
        <div class="hero-btns">
          <a href="properties.html" class="hero-btn-primary">${a("Home",16,2,"btn-icon")} 看看物件</a>
          <a href="#about" class="hero-btn-secondary">${a("User",16,2,"btn-icon")} 認識 Cindy</a>
        </div>
      </div>
      <!-- 右側 Cindy 角色 -->
      <div class="hero-photo-area">
        <img src="/images/cindy_character.png" alt="Cindy 王瑋薰" class="hero-cindy-img">
      </div>
    </div>
    <a href="#about" class="scroll-hint-wrap">
      <span class="scroll-hint-text">SCROLL</span>
      <div class="scroll-line"><div class="scroll-line-inner"></div></div>
    </a>
  </section>

  ${r("#CDD6AE","#FBF8F3")}

  <!-- ── ABOUT ── -->
  <section id="about">
    <div class="about-inner">
      <!-- 左側：兩張便條紙上下排列（不重疊） -->
      <div class="about-left reveal">
        <img src="/images/note_effort.png" alt="今天也在努力的自己" class="about-note-top">
        <img src="/images/note_service.png" alt="用專業替你把關" class="about-note-bottom">
      </div>
      <!-- 右側文字 -->
      <div class="about-text reveal reveal-d2">
        <div class="about-section-label">About Me</div>
        <h2 class="about-title">HI，我是<strong>王瑋薰</strong><br>大家叫我 Cindy</h2>
        <div class="about-divider"></div>
        <p class="about-desc">土生土長的南崁人，從小在這裡長大，對這裡的<strong>每條街道、每個生活圈</strong>都很熟悉。雖然剛入行，但我相信誠懇和用心比資歷更重要。</p>
        <p class="about-desc">我有點慢熟，第一次見面可能會有點拘謹，但熟了之後就像<strong>朋友一樣相處</strong>，有什麼問題都可以直接問我。</p>
        <div class="about-tags">
          <span class="about-tag tag-sage">${a("MapPin",13,2)} 南崁在地 20 年</span>
          <span class="about-tag tag-peach">${a("Users",13,2)} 父女搭檔</span>
          <span class="about-tag tag-teal">${a("Monitor",13,2)} 資訊管理背景</span>
          <span class="about-tag tag-sage">${a("Home",13,2)} 蘆竹大園龜山觀音</span>
        </div>
      </div>
    </div>
  </section>



  ${r("#FBF8F3","#F2EDE4")}

  <!-- ── 精選物件 ── -->
  <section id="properties-preview">
    <div class="properties-inner">
      <div class="section-header reveal">
        <div class="section-header-top">
          <img src="/images/house_plants.png" alt="" class="section-house-deco">
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
          查看全部物件 ${a("ArrowRight",16,2)}
        </a>
      </div>
    </div>
  </section>

  ${r("#F2EDE4","#7CBBC3")}

  <!-- ── 聯絡 ── -->
  <section id="contact">
    <div class="contact-inner">
      <h2 class="contact-title reveal">有任何問題都可以<br><strong>直接找我聊聊</strong></h2>
      <p class="contact-sub reveal">不管是買房、賣房還是只是想了解南崁行情，隨時歡迎</p>
      <div class="contact-cards reveal">
        <div class="contact-card">
          <div class="contact-card-icon">${a("Phone",26,1.5,"contact-icon")}</div>
          <div class="contact-card-label">電 話</div>
          <div class="contact-card-value">0963-585-690</div>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">${a("MessageCircle",26,1.5,"contact-icon")}</div>
          <div class="contact-card-label">LINE ID</div>
          <div class="contact-card-value">@019nrmqw</div>
        </div>
        <div class="contact-card">
          <div class="contact-card-icon">${a("MapPin",26,1.5,"contact-icon")}</div>
          <div class="contact-card-label">服務區域</div>
          <div class="contact-card-value">蘆竹・大園・龜山</div>
        </div>
      </div>
      <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="contact-btn reveal">
        ${a("MessageCircle",18,2,"contact-btn-icon")} LINE 我
      </a>
    </div>
  </section>

  ${d()}
`;l();setTimeout(()=>{var s;(s=document.getElementById("heroStrong"))==null||s.classList.add("hero-title-line-animate")},1400);async function h(){try{const i=await(await fetch(v)).json(),e=i.filter(t=>t.title&&t.nodeId).slice(0,3);document.getElementById("homePropsGrid").innerHTML=e.map((t,o)=>g(t,o)).join(""),document.getElementById("propsMoreBtn").innerHTML=`查看全部 ${i.length} 筆物件 ${a("ArrowRight",16,2)}`;const c=new IntersectionObserver(t=>{t.forEach(o=>{o.isIntersecting&&o.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll("#homePropsGrid .reveal").forEach(t=>c.observe(t))}catch{document.getElementById("homePropsGrid").innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--brown-mid)">暫時無法載入物件</div>'}}h();
