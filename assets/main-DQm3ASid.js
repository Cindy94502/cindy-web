import{r as B,b as s,a as C,i as M}from"./shared-C5LVJtgJ.js";import{G as F,c as S,f as H}from"./data-vfwjmF8_.js";function h(e,t){return`<div class="torn-divider" style="background:${t}">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L0,20 C80,35 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,8 960,22 C1040,36 1120,14 1200,28 C1280,42 1360,16 1440,20 L1440,0 Z" fill="${e}"/>
    </svg>
  </div>`}function x(e,t){const a=S(e.ogImageUrl,600),m=e.buildingCategory==="透天"?"House":"Building2";return`
  <a href="property.html?id=${e.nodeId}" class="prop-card reveal reveal-d${t+1}">
    <div class="prop-card-img">
      ${a?`<img src="${a}" alt="${e.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.objectFit='contain';this.style.opacity='0.4';this.style.padding='20px';this.src='images/house_small.png'">`:`<div class="prop-card-img-icon">${s(m,48,1,"prop-placeholder-icon")}</div>`}
      <div class="prop-card-category">${e.buildingCategory||"住宅"}</div>
    </div>
    <div class="prop-card-body">
      <div class="prop-price">${H(e.price)}</div>
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
  ${B()}

  <!-- ── HERO ── -->
  <section id="hero">
    <!-- 桌機滿版背景，由滑鼠橫向位置決定顯示第幾幀。
         用圖片序列不用影片：影片刮動要 seek，跳到還沒下載到的位置就會
         發 Range 請求並卡住（GitHub Pages 上實測一次 0.7 秒）。
         圖片序列沒有這個問題 —— 載到第幾張，第幾格就能刮，換圖就是換圖。
         流量差不多（40 張 WebP 共 1099 KB，影片 1196 KB）。
         img 由 JS 產生，手機完全不會下載。 -->
    <div id="heroScrub" aria-hidden="true"></div>
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

  ${h("#B2CDCB","#FBF8F3")}

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



  ${h("#FBF8F3","#F2EDE4")}

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

  ${h("#F2EDE4","#FBF8F3")}

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

  ${h("#FBF8F3","#7CBBC3")}

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

  ${C()}
`;M();setTimeout(()=>{var e;(e=document.getElementById("heroStrong"))==null||e.classList.add("hero-title-line-animate")},1400);var w;(w=document.getElementById("scrollHint"))==null||w.addEventListener("click",e=>{e.preventDefault();const t=document.getElementById("about");t&&window.scrollTo({top:t.offsetTop-64,behavior:"smooth"})});{const e=document.getElementById("hero"),t=document.getElementById("heroScrub"),a=document.getElementById("heroLoopVideo"),m=matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches,i=matchMedia("(prefers-reduced-motion: reduce)").matches;if(m&&e&&t){const c=[];for(let n=0;n<40;n++){const o=new Image;o.decoding="async",o.alt="",o.className="hero-frame-img",t.appendChild(o),c.push(o)}const f=()=>{c.forEach((n,o)=>{n.addEventListener("load",()=>{},{once:!0}),n.src=`media/frames/${String(o).padStart(2,"0")}.webp`})};document.readyState==="complete"?setTimeout(f,200):window.addEventListener("load",()=>setTimeout(f,200));const $=37/720,E=64,L=960,g=540,u=()=>{const n=t.clientWidth,o=t.clientHeight;if(!n||!o)return;const l=Math.max(n/L,o/g),p=g*l-o,v=p<=0?0:Math.max(0,Math.min(100,(g*$*l-E)/p*100));t.style.setProperty("--hero-vpos",v.toFixed(1)+"%")};if(u(),window.addEventListener("resize",u),i)c[0].addEventListener("load",()=>c[0].classList.add("on"),{once:!0});else{let o=0,l=0,p=!1,v=-1;const b=d=>{d=Math.max(0,Math.min(39,Math.round(d))),d!==v&&c[d].complete&&(v>=0&&c[v].classList.remove("on"),c[d].classList.add("on"),v=d)},y=()=>{l+=(o-l)*.18,b(l),Math.abs(o-l)>.4?requestAnimationFrame(y):p=!1};e.addEventListener("mousemove",d=>{o=(1-d.clientX/window.innerWidth)*39,p||(p=!0,requestAnimationFrame(y))}),c[0].addEventListener("load",()=>b(0),{once:!0})}}else if(a&&!i){const r=()=>{a.autoplay=!0,a.src="media/hero-loop.mp4",a.addEventListener("loadeddata",()=>a.play().catch(()=>{}),{once:!0}),a.play().catch(()=>{})};document.readyState==="complete"?setTimeout(r,300):window.addEventListener("load",()=>setTimeout(r,300))}}async function I(){try{const t=await(await fetch(F)).json(),a=t.filter(i=>i.title&&i.nodeId).slice(0,3);document.getElementById("homePropsGrid").innerHTML=a.map((i,r)=>x(i,r)).join(""),document.getElementById("propsMoreBtn").innerHTML=`查看全部 ${t.length} 筆物件 ${s("ArrowRight",16,2)}`;const m=new IntersectionObserver(i=>{i.forEach(r=>{r.isIntersecting&&r.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll("#homePropsGrid .reveal").forEach(i=>m.observe(i))}catch{document.getElementById("homePropsGrid").innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--brown-mid)">暫時無法載入物件</div>'}}I();
