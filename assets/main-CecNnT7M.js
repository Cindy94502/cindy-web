import{r as l,b as a,a as v,i as p}from"./shared-B4N8x-DF.js";import{G as m,f as g}from"./data-DQaSi1fH.js";function c(s,t){return`<div class="torn-divider" style="background:${t}">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L0,20 C80,35 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,8 960,22 C1040,36 1120,14 1200,28 C1280,42 1360,16 1440,20 L1440,0 Z" fill="${s}"/>
    </svg>
  </div>`}function b(s,t){const i=s.ogImageUrl||"",e=s.buildingCategory==="透天"?"House":"Building2";return`
  <a href="property.html?id=${s.nodeId}" class="prop-card reveal reveal-d${t+1}">
    <div class="prop-card-img">
      ${i?`<img src="${i}" alt="${s.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.objectFit='contain';this.style.opacity='0.4';this.style.padding='20px';this.src='images/house_small.png'">`:`<div class="prop-card-img-icon">${a(e,48,1,"prop-placeholder-icon")}</div>`}
      <div class="prop-card-category">${s.buildingCategory||"住宅"}</div>
    </div>
    <div class="prop-card-body">
      <div class="prop-price">${g(s.price)}</div>
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
  ${l()}

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
          <a href="properties.html" class="hero-btn-primary">${a("Home",16,2,"btn-icon")} 看看物件</a>
          <a href="#about" class="hero-btn-secondary">${a("User",16,2,"btn-icon")} 認識 Cindy</a>
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
        ${a("ChevronDown",22,1.5,"scroll-arrow-icon")}
        ${a("ChevronDown",22,1.5,"scroll-arrow-icon scroll-arrow-delay")}
      </div>
    </a>
  </section>

  ${c("#B2CDCB","#FBF8F3")}

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
        <h2 class="about-title">HI，我是<strong>Cindy</strong><br>大家可以叫我王小姐~</h2>
        <div class="about-divider"></div>
        <p class="about-desc">土生土長的南崁人，從小在這裡長大，對這裡的<strong>每條街道、每個生活圈</strong>都很熟悉。是經由爸爸帶領，踏入了房介這行，此後我們父女便攜手並進。</p>
        <p class="about-desc">很多人問我為什麼大學剛畢業就做房仲——我的想法很簡單：<strong>各行各業都值得嘗試，不要自己設限</strong>。年輕是我的本錢，跑得勤、學得快、不油條。</p>
        <p class="about-desc">要說最喜歡南崁什麼？購物真的太方便，台茂、好市多都在生活圈裡。（缺點是常激發我買買買的購物慾，需要克制 😂）也因為在這裡長大，哪個社區安靜、哪條路會塞、哪間早餐店好吃，<strong>直接問我就好，不用查資料</strong>。</p>
        <p class="about-desc">我有點慢熱，第一次見面可能會有點拘謹，但熱絡了之後就像<strong>朋友一樣相處</strong>，有什麼問題都可以直接問我。買房是大事，慢慢來，我陪你看。</p>
        <div class="about-tags">
          <span class="about-tag tag-sage">${a("MapPin",13,2)} 住南崁將近20 年</span>
          <span class="about-tag tag-peach">${a("Users",13,2)} 父女搭檔</span>
        </div>
      </div>
    </div>
    <!-- 父女圖 hover 才出現 -->
    <div class="about-dad-wrap">
      <img src="images/cindy_dad.png" alt="父女搭檔" class="about-dad-img">
    </div>
  </section>

  ${c("#FBF8F3","#F2EDE4")}

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
          查看全部物件 ${a("ArrowRight",16,2)}
        </a>
      </div>
    </div>
  </section>

  ${c("#F2EDE4","#FBF8F3")}

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
          <div class="form-card-icon">${a("Home",36,1.5,"form-icon-buy")}</div>
          <div class="form-card-title">我想買房</div>
          <div class="form-card-desc">告訴我預算、坪數、區域需求<br>讓我幫你找到對的家</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-rent" data-tf-popup="zlT7vf5X" data-tf-size="90">
          <div class="form-card-icon">${a("KeyRound",36,1.5,"form-icon-rent")}</div>
          <div class="form-card-title">我想租屋</div>
          <div class="form-card-desc">說明租金預算、格局、入住時間<br>我來幫你媒合合適的房源</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-sell" data-tf-popup="cK5kqUM9" data-tf-size="90">
          <div class="form-card-icon">${a("Banknote",36,1.5,"form-icon-sell")}</div>
          <div class="form-card-title">我想賣房</div>
          <div class="form-card-desc">留下物件資訊與聯絡方式<br>讓我為你評估最佳售出策略</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
      </div>
    </div>
  </section>

  ${c("#FBF8F3","#7CBBC3")}

  <!-- ── 聯絡 ── -->
  <section id="contact">
    <div class="contact-inner">
      <h2 class="contact-title reveal">有任何問題都可以<br><strong>直接找我聊聊</strong></h2>
      <p class="contact-sub reveal">不管是買房、賣房還是只是想了解南崁行情，隨時歡迎</p>

      <div class="contact-info-list reveal">
        <div class="contact-info-row">
          <span class="contact-info-icon">${a("Phone",18,1.5)}</span>
          <span class="contact-info-label">Cindy</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0963585690" class="contact-info-value">0963-585-690</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${a("Phone",18,1.5)}</span>
          <span class="contact-info-label">王先生</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0968731280" class="contact-info-value">0968-731-280</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${a("MessageCircle",18,1.5)}</span>
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

  ${v()}
`;p();setTimeout(()=>{var s;(s=document.getElementById("heroStrong"))==null||s.classList.add("hero-title-line-animate")},1400);var d;(d=document.getElementById("scrollHint"))==null||d.addEventListener("click",s=>{s.preventDefault();const t=document.getElementById("about");t&&window.scrollTo({top:t.offsetTop-64,behavior:"smooth"})});const r=document.getElementById("about");r&&new IntersectionObserver(t=>{t.forEach(i=>{var e;i.isIntersecting&&((e=document.querySelector(".about-dad-wrap"))==null||e.classList.add("visible"))})},{threshold:.1}).observe(r);async function h(){try{const t=await(await fetch(m)).json(),i=t.filter(o=>o.title&&o.nodeId).slice(0,3);document.getElementById("homePropsGrid").innerHTML=i.map((o,n)=>b(o,n)).join(""),document.getElementById("propsMoreBtn").innerHTML=`查看全部 ${t.length} 筆物件 ${a("ArrowRight",16,2)}`;const e=new IntersectionObserver(o=>{o.forEach(n=>{n.isIntersecting&&n.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll("#homePropsGrid .reveal").forEach(o=>e.observe(o))}catch{document.getElementById("homePropsGrid").innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--brown-mid)">暫時無法載入物件</div>'}}h();
