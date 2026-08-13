import{r as y,b as s,a as w,i as $}from"./shared-B7QTijM-.js";import{G as E,c as B,f as C}from"./data-fy7z4F0d.js";function p(e,o){return`<div class="torn-divider" style="background:${o}">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L0,20 C80,35 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,8 960,22 C1040,36 1120,14 1200,28 C1280,42 1360,16 1440,20 L1440,0 Z" fill="${e}"/>
    </svg>
  </div>`}function I(e,o){const t=B(e.ogImageUrl,600),a=e.buildingCategory==="透天"?"House":"Building2";return`
  <a href="property.html?id=${e.nodeId}" class="prop-card reveal reveal-d${o+1}">
    <div class="prop-card-img">
      ${t?`<img src="${t}" alt="${e.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.objectFit='contain';this.style.opacity='0.4';this.style.padding='20px';this.src='images/house_small.png'">`:`<div class="prop-card-img-icon">${s(a,48,1,"prop-placeholder-icon")}</div>`}
      <div class="prop-card-category">${e.buildingCategory||"住宅"}</div>
    </div>
    <div class="prop-card-body">
      <div class="prop-price">${C(e.price)}</div>
      <div class="prop-name">${e.title}</div>
      <div class="prop-info">
        <span class="prop-tag">${e.layout||""}</span>
        <span class="prop-tag">${e.buildingCategory||""}</span>
      </div>
      <div class="prop-card-footer">
        <span class="prop-location">${s("MapPin",13,2,"prop-loc-icon")} ${e.wixLocation||""}</span>
        <span class="prop-link">查看詳情 ${s("ArrowRight",13,2)}</span>
      </div>
    </div>
  </a>`}document.getElementById("app").innerHTML=`
  ${y()}

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
          <a href="properties.html" class="hero-btn-primary">${s("Home",16,2,"btn-icon")} 看看物件</a>
          <a href="#about" class="hero-btn-secondary">${s("User",16,2,"btn-icon")} 認識 Cindy</a>
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
        ${s("ChevronDown",22,1.5,"scroll-arrow-icon")}
        ${s("ChevronDown",22,1.5,"scroll-arrow-icon scroll-arrow-delay")}
      </div>
    </a>
  </section>

  ${p("#B2CDCB","#FBF8F3")}

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
          <span class="about-tag tag-sage">${s("MapPin",13,2)} 住南崁將近20 年</span>
          <span class="about-tag tag-peach">${s("Users",13,2)} 父女搭檔</span>
        </div>
      </div>
    </div>
    <!-- 父女圖 hover 才出現 -->
    <div class="about-dad-wrap">
      <img src="images/cindy_dad.png" alt="父女搭檔" class="about-dad-img">
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
        ${s("Monitor",15,2)} 用整個螢幕看
      </a>
    </div>
  </section>



  ${p("#FBF8F3","#F2EDE4")}

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
          查看全部物件 ${s("ArrowRight",16,2)}
        </a>
      </div>
    </div>
  </section>

  ${p("#F2EDE4","#FBF8F3")}

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
          <div class="form-card-icon">${s("Home",36,1.5,"form-icon-buy")}</div>
          <div class="form-card-title">我想買房</div>
          <div class="form-card-desc">告訴我預算、坪數、區域需求<br>讓我幫你找到對的家</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-rent" data-tf-popup="zlT7vf5X" data-tf-size="90">
          <div class="form-card-icon">${s("KeyRound",36,1.5,"form-icon-rent")}</div>
          <div class="form-card-title">我想租屋</div>
          <div class="form-card-desc">說明租金預算、格局、入住時間<br>我來幫你媒合合適的房源</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-sell" data-tf-popup="cK5kqUM9" data-tf-size="90">
          <div class="form-card-icon">${s("Banknote",36,1.5,"form-icon-sell")}</div>
          <div class="form-card-title">我想賣房</div>
          <div class="form-card-desc">留下物件資訊與聯絡方式<br>讓我為你評估最佳售出策略</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
      </div>
    </div>
  </section>

  ${p("#FBF8F3","#7CBBC3")}

  <!-- ── 聯絡 ── -->
  <section id="contact">
    <div class="contact-inner">
      <h2 class="contact-title reveal">有任何問題都可以<br><strong>直接找我聊聊</strong></h2>
      <p class="contact-sub reveal">不管是買房、賣房還是只是想了解南崁行情，隨時歡迎</p>

      <div class="contact-info-list reveal">
        <div class="contact-info-row">
          <span class="contact-info-icon">${s("Phone",18,1.5)}</span>
          <span class="contact-info-label">Cindy</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0963585690" class="contact-info-value">0963-585-690</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${s("Phone",18,1.5)}</span>
          <span class="contact-info-label">王先生</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0968731280" class="contact-info-value">0968-731-280</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${s("MessageCircle",18,1.5)}</span>
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

  ${w()}
`;$();setTimeout(()=>{var e;(e=document.getElementById("heroStrong"))==null||e.classList.add("hero-title-line-animate")},1400);var u;(u=document.getElementById("scrollHint"))==null||u.addEventListener("click",e=>{e.preventDefault();const o=document.getElementById("about");o&&window.scrollTo({top:o.offsetTop-64,behavior:"smooth"})});{const e=document.getElementById("hero"),o=document.getElementById("heroScrub"),t=document.getElementById("heroScrubVideo"),a=document.getElementById("heroLoopVideo"),i=matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches,r=matchMedia("(prefers-reduced-motion: reduce)").matches;if(i&&e&&t){t.src="media/hero-scrub.mp4";const l=37,b=64,h=()=>{const m=o.clientWidth,c=o.clientHeight;if(!t.videoWidth||!m||!c)return;const n=Math.max(m/t.videoWidth,c/t.videoHeight),d=t.videoHeight*n-c,v=d<=0?0:Math.max(0,Math.min(100,(l*n-b)/d*100));o.style.setProperty("--hero-vpos",v.toFixed(1)+"%")};if(t.addEventListener("loadedmetadata",h),window.addEventListener("resize",h),!r){let c=0,n=0,d=!1;const v=()=>{n+=(c-n)*.14,t.readyState>=2&&Math.abs(t.currentTime-n)>.008&&(t.currentTime=n),Math.abs(c-n)>.004?requestAnimationFrame(v):d=!1};e.addEventListener("mousemove",f=>{t.duration&&(c=(1-f.clientX/window.innerWidth)*t.duration,d||(d=!0,requestAnimationFrame(v)))})}}else if(a&&!r){const l=()=>{a.autoplay=!0,a.src="media/hero-loop.mp4",a.addEventListener("loadeddata",()=>a.play().catch(()=>{}),{once:!0}),a.play().catch(()=>{})};document.readyState==="complete"?setTimeout(l,300):window.addEventListener("load",()=>setTimeout(l,300))}}const g=document.getElementById("about");g&&new IntersectionObserver(o=>{o.forEach(t=>{var a;t.isIntersecting&&((a=document.querySelector(".about-dad-wrap"))==null||a.classList.add("visible"))})},{threshold:.1}).observe(g);async function L(){try{const o=await(await fetch(E)).json(),t=o.filter(i=>i.title&&i.nodeId).slice(0,3);document.getElementById("homePropsGrid").innerHTML=t.map((i,r)=>I(i,r)).join(""),document.getElementById("propsMoreBtn").innerHTML=`查看全部 ${o.length} 筆物件 ${s("ArrowRight",16,2)}`;const a=new IntersectionObserver(i=>{i.forEach(r=>{r.isIntersecting&&r.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll("#homePropsGrid .reveal").forEach(i=>a.observe(i))}catch{document.getElementById("homePropsGrid").innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--brown-mid)">暫時無法載入物件</div>'}}L();
