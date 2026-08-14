import{r as A,b as t,a as H,i as x}from"./shared-C5LVJtgJ.js";import{G as I,c as R,f as _}from"./data-vfwjmF8_.js";function b(e,o){return`<div class="torn-divider" style="background:${o}">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L0,20 C80,35 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,8 960,22 C1040,36 1120,14 1200,28 C1280,42 1360,16 1440,20 L1440,0 Z" fill="${e}"/>
    </svg>
  </div>`}function P(e,o){const c=R(e.ogImageUrl,600),m=e.buildingCategory==="透天"?"House":"Building2";return`
  <a href="property.html?id=${e.nodeId}" class="prop-card reveal reveal-d${o+1}">
    <div class="prop-card-img">
      ${c?`<img src="${c}" alt="${e.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.objectFit='contain';this.style.opacity='0.4';this.style.padding='20px';this.src='images/house_small.png'">`:`<div class="prop-card-img-icon">${t(m,48,1,"prop-placeholder-icon")}</div>`}
      <div class="prop-card-category">${e.buildingCategory||"住宅"}</div>
    </div>
    <div class="prop-card-body">
      <div class="prop-price">${_(e.price)}</div>
      <div class="prop-name">${e.title}</div>
      <div class="prop-info">
        <span class="prop-tag">${e.layout||""}</span>
        <span class="prop-tag">${e.buildingCategory||""}</span>
      </div>
      <div class="prop-card-footer">
        <span class="prop-location">${t("MapPin",13,2,"prop-loc-icon")} ${e.wixLocation||""}</span>
        <span class="prop-link">查看詳情 ${t("ArrowRight",13,2)}</span>
      </div>
    </div>
  </a>`}document.getElementById("app").innerHTML=`
  ${A()}

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
          <a href="properties.html" class="hero-btn-primary">${t("Home",16,2,"btn-icon")} 看看物件</a>
          <a href="#about" class="hero-btn-secondary">${t("User",16,2,"btn-icon")} 認識 Cindy</a>
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
        ${t("ChevronDown",22,1.5,"scroll-arrow-icon")}
        ${t("ChevronDown",22,1.5,"scroll-arrow-icon scroll-arrow-delay")}
      </div>
    </a>
  </section>

  ${b("#B2CDCB","#FBF8F3")}

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
          <span class="about-tag tag-sage">${t("MapPin",13,2)} 住南崁將近20 年</span>
          <span class="about-tag tag-peach">${t("Users",13,2)} 父女搭檔</span>
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
        ${t("Monitor",15,2)} 用整個螢幕看
      </a>
    </div>
  </section>



  ${b("#FBF8F3","#F2EDE4")}

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
          查看全部物件 ${t("ArrowRight",16,2)}
        </a>
      </div>
    </div>
  </section>

  ${b("#F2EDE4","#FBF8F3")}

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
          <div class="form-card-icon">${t("Home",36,1.5,"form-icon-buy")}</div>
          <div class="form-card-title">我想買房</div>
          <div class="form-card-desc">告訴我預算、坪數、區域需求<br>讓我幫你找到對的家</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-rent" data-tf-popup="zlT7vf5X" data-tf-size="90">
          <div class="form-card-icon">${t("KeyRound",36,1.5,"form-icon-rent")}</div>
          <div class="form-card-title">我想租屋</div>
          <div class="form-card-desc">說明租金預算、格局、入住時間<br>我來幫你媒合合適的房源</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-sell" data-tf-popup="cK5kqUM9" data-tf-size="90">
          <div class="form-card-icon">${t("Banknote",36,1.5,"form-icon-sell")}</div>
          <div class="form-card-title">我想賣房</div>
          <div class="form-card-desc">留下物件資訊與聯絡方式<br>讓我為你評估最佳售出策略</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
      </div>
    </div>
  </section>

  ${b("#FBF8F3","#7CBBC3")}

  <!-- ── 聯絡 ── -->
  <section id="contact">
    <div class="contact-inner">
      <h2 class="contact-title reveal">有任何問題都可以<br><strong>直接找我聊聊</strong></h2>
      <p class="contact-sub reveal">不管是買房、賣房還是只是想了解南崁行情，隨時歡迎</p>

      <div class="contact-info-list reveal">
        <div class="contact-info-row">
          <span class="contact-info-icon">${t("Phone",18,1.5)}</span>
          <span class="contact-info-label">Cindy</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0963585690" class="contact-info-value">0963-585-690</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${t("Phone",18,1.5)}</span>
          <span class="contact-info-label">王先生</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0968731280" class="contact-info-value">0968-731-280</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${t("MessageCircle",18,1.5)}</span>
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

  ${H()}
`;x();setTimeout(()=>{var e;(e=document.getElementById("heroStrong"))==null||e.classList.add("hero-title-line-animate")},1400);var F;(F=document.getElementById("scrollHint"))==null||F.addEventListener("click",e=>{e.preventDefault();const o=document.getElementById("about");o&&window.scrollTo({top:o.offsetTop-64,behavior:"smooth"})});{const e=document.getElementById("hero"),o=document.getElementById("heroScrub"),c=document.getElementById("heroLoopVideo"),m=matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches,d=matchMedia("(prefers-reduced-motion: reduce)").matches;if(m&&e&&o){const a=[];for(let i=0;i<40;i++){const s=new Image;s.decoding="async",s.alt="",s.className="hero-frame-img",o.appendChild(s),a.push(s)}const L=()=>{const i=[],s=new Set;for(const l of[8,4,2,1])for(let n=0;n<40;n+=l)s.has(n)||(s.add(n),i.push(n));return i},w=()=>{for(const i of L())a[i].addEventListener("load",()=>{},{once:!0}),a[i].src=`media/frames/${String(i).padStart(2,"0")}.webp`};document.readyState==="complete"?setTimeout(w,200):window.addEventListener("load",()=>setTimeout(w,200));const B=37/720,C=64,S=960,y=540,E=()=>{const i=o.clientWidth,s=o.clientHeight;if(!i||!s)return;const l=Math.max(i/S,s/y),n=y*l-s,v=n<=0?0:Math.max(0,Math.min(100,(y*B*l-C)/n*100));o.style.setProperty("--hero-vpos",v.toFixed(1)+"%")};if(E(),window.addEventListener("resize",E),d)a[0].addEventListener("load",()=>a[0].classList.add("on"),{once:!0});else{let s=0,l=0,n=!1,v=-1;const $=r=>{if(r=Math.max(0,Math.min(39,Math.round(r))),!a[r].complete||!a[r].naturalWidth){let h=-1;for(let f=1;f<40;f++){const g=r-f,u=r+f;if(g>=0&&a[g].complete&&a[g].naturalWidth){h=g;break}if(u<40&&a[u].complete&&a[u].naturalWidth){h=u;break}}if(h<0)return;r=h}r!==v&&(v>=0&&a[v].classList.remove("on"),a[r].classList.add("on"),v=r)},M=()=>{l+=(s-l)*.18,$(l),Math.abs(s-l)>.4?requestAnimationFrame(M):n=!1};e.addEventListener("mousemove",r=>{s=(1-r.clientX/window.innerWidth)*39,n||(n=!0,requestAnimationFrame(M))}),a[0].addEventListener("load",()=>$(0),{once:!0})}}else if(c&&!d){const p=()=>{c.autoplay=!0,c.src="media/hero-loop.mp4",c.addEventListener("loadeddata",()=>c.play().catch(()=>{}),{once:!0}),c.play().catch(()=>{})};document.readyState==="complete"?setTimeout(p,300):window.addEventListener("load",()=>setTimeout(p,300))}}async function T(){try{const o=await(await fetch(I)).json(),c=o.filter(d=>d.title&&d.nodeId).slice(0,3);document.getElementById("homePropsGrid").innerHTML=c.map((d,p)=>P(d,p)).join(""),document.getElementById("propsMoreBtn").innerHTML=`查看全部 ${o.length} 筆物件 ${t("ArrowRight",16,2)}`;const m=new IntersectionObserver(d=>{d.forEach(p=>{p.isIntersecting&&p.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll("#homePropsGrid .reveal").forEach(d=>m.observe(d))}catch{document.getElementById("homePropsGrid").innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--brown-mid)">暫時無法載入物件</div>'}}T();
