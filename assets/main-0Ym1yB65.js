import{r as ye,b as f,a as Me,i as Ee}from"./shared-D8m5nbfh.js";import{G as Se,c as $e,f as Ce}from"./data-vfwjmF8_.js";const me={brush:55,rough:.55,healMs:2e3,shimmer:.5},he=44,Le=140,Fe=30;function xe(){if(!matchMedia("(max-width: 900px), (hover: none), (pointer: coarse)").matches)return;const a=document.getElementById("contact");a&&ue({root:a,media:a.querySelector(".contact-media"),canvas:a.querySelector(".contact-scratch"),hint:a.querySelector(".contact-reveal-hint"),topSrc:i=>i?"images/home-empty-sm.webp":"images/home-empty.webp",brush:78})}function ue({root:o,media:a,canvas:i,hint:m,topSrc:w,onReady:g,flip:y=!1,brush:C=me.brush,posY:I=.5,listenOn:x=null,enabled:V=!0}){if(!o||!a||!i)return null;const u=i.getContext("2d"),M=document.createElement("canvas"),_=M.getContext("2d"),z=matchMedia("(prefers-reduced-motion: reduce)").matches,O=matchMedia("(max-width: 900px)").matches,L=Math.min(window.devicePixelRatio||1,2),{rough:n,healMs:r,shimmer:h}=me;let d=[],b=null,X=0,j=!1,E=null,S=null,k=null,R=null,F=!1,D=!1,G=V;const A=x||i,B=new Image;B.decoding="async",B.onload=()=>{F=!0,Q(),g==null||g()},B.src=w(O);const N=(e,t)=>{const s=Math.sin(e*127.1+t*311.7)*43758.5453;return s-Math.floor(s)},fe=(e,t)=>{const s=Math.floor(e),c=Math.floor(t),l=e-s,p=t-c,v=l*l*(3-2*l),$=p*p*(3-2*p),H=N(s,c),P=N(s+1,c),q=N(s,c+1),W=N(s+1,c+1);return H*(1-v)*(1-$)+P*v*(1-$)+q*(1-v)*$+W*v*$},se=(e,t)=>{let s=0,c=.5;for(let l=0;l<4;l++)s+=c*fe(e,t),e*=2.1,t*=2.1,c*=.42;return s};function Z(e,t,s,c,l){const p=C*L*(.35+.65*l),v=N(Math.floor(t/9),Math.floor(s/9))*97,$=v*.7;e.beginPath();for(let P=0;P<=he;P++){const q=P/he*Math.PI*2+$,W=Math.cos(q),re=Math.sin(q),be=se(W*2.6+v+c,re*2.6+v),we=se(W*5.3-v,re*5.3+v+c*.7),ce=p*(.72+(be*.62+we*.3)*n),le=t+Math.cos(q)*ce,de=s+Math.sin(q)*ce;P===0?e.moveTo(le,de):e.lineTo(le,de)}e.closePath();const H=e.createRadialGradient(t,s,p*.15,t,s,p*1.18);H.addColorStop(0,`rgba(0,0,0,${l})`),H.addColorStop(.62,`rgba(0,0,0,${l*.96})`),H.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=H,e.fill()}function U(){const e=i.width,t=i.height;u.globalCompositeOperation="source-over",u.clearRect(0,0,e,t);const s=B.width/B.height,c=e/t;let l,p,v,$;s>c?(p=t,l=t*s,v=(e-l)/2,$=0):(l=e,p=e/s,v=0,$=(t-p)*I),y?(u.save(),u.translate(e,0),u.scale(-1,1),u.drawImage(B,v,$,l,p),u.restore()):u.drawImage(B,v,$,l,p)}function oe(e){if(b=requestAnimationFrame(oe),e-X<1e3/Fe)return;X=e;const t=e*4e-4*h;U(),u.globalCompositeOperation="destination-out",u.drawImage(M,0,0),d=d.filter(s=>e-s.t<r);for(const s of d){const c=1-(e-s.t)/r;Z(u,s.x,s.y,t,Math.max(0,c))}S&&Z(u,S.x,S.y,t,1),d.length===0&&!S&&r>0&&(cancelAnimationFrame(b),b=null,U(),u.globalCompositeOperation="destination-out",u.drawImage(M,0,0))}const T=()=>{!b&&j&&!z&&(b=requestAnimationFrame(oe))};function ge(e,t){if(z){Z(_,e,t,0,1),U(),u.globalCompositeOperation="destination-out",u.drawImage(M,0,0);return}d.push({x:e,y:t,t:performance.now()}),d.length>Le*2&&d.shift(),T()}function J(e,t,s,c){const l=Math.hypot(s-e,c-t),p=Math.max(1,Math.ceil(l/(C*L*.45)));for(let v=0;v<=p;v++)ge(e+(s-e)*v/p,t+(c-t)*v/p)}function Q(){const e=a.getBoundingClientRect();e.width&&(i.width=M.width=Math.round(e.width*L),i.height=M.height=Math.round(e.height*L),_.clearRect(0,0,M.width,M.height),d=[],F&&U())}const K=e=>{const t=i.getBoundingClientRect(),s=e.touches?e.touches[0]:e;return{x:(s.clientX-t.left)*L,y:(s.clientY-t.top)*L}};A.addEventListener("mouseenter",e=>{F&&G&&(E=S=K(e),T())}),A.addEventListener("mousemove",e=>{if(!F||!G)return;const t=K(e);E&&(J(E.x,E.y,t.x,t.y),te()),E=S=t,T()}),A.addEventListener("mouseleave",()=>{E=S=null}),A.addEventListener("touchstart",e=>{if(!F||!G)return;const t=e.touches[0];k={x:t.clientX,y:t.clientY},R=null,E=K(e)},{passive:!0}),A.addEventListener("touchmove",e=>{if(!F||!G||!k)return;const t=e.touches[0];if(R===null){const c=Math.abs(t.clientX-k.x),l=Math.abs(t.clientY-k.y);if(c<6&&l<6)return;R=c>l?"scratch":"scroll",R==="scratch"&&te()}if(R!=="scratch")return;e.preventDefault();const s=K(e);J(E.x,E.y,s.x,s.y),E=S=s,T()},{passive:!1});const ne=()=>{k=null,R=null,S=null};A.addEventListener("touchend",ne),A.addEventListener("touchcancel",ne);function ae(){if(z)return;const e=i.width,t=i.height,s=t*.66;let c=e*.3;const l=e*.46,p=()=>{J(c,s,Math.min(c+e*.02,l),s+Math.sin(c/60)*6),c+=e*.02,c<l&&requestAnimationFrame(p)};requestAnimationFrame(p)}let ee=null;function te(){m==null||m.classList.add("is-gone"),clearTimeout(ee)}new IntersectionObserver(e=>{j=e[0].isIntersecting,j?(T(),!D&&F&&(D=!0,ae()),ee||(ee=setTimeout(te,6e3))):b&&(cancelAnimationFrame(b),b=null)},{threshold:.25}).observe(o);let ie;return addEventListener("resize",()=>{clearTimeout(ie),ie=setTimeout(Q,150)}),{resize:Q,reset(){_.clearRect(0,0,M.width,M.height),d=[],S=null,E=null,F&&(U(),D=!1)},setActive(e){G=e,e||(E=S=null),j=e,e?(T(),!D&&F&&(D=!0,ae())):b&&(cancelAnimationFrame(b),b=null)}}}function Y(o,a){return`<div class="torn-divider" style="background:${a}">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L0,20 C80,35 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,8 960,22 C1040,36 1120,14 1200,28 C1280,42 1360,16 1440,20 L1440,0 Z" fill="${o}"/>
    </svg>
  </div>`}function pe(o,a){return`<div class="contact-torn contact-torn-${a}">
    <svg viewBox="0 0 1440 48" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,0 L0,20 C80,35 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,8 960,22 C1040,36 1120,14 1200,28 C1280,42 1360,16 1440,20 L1440,0 Z" fill="${o}"/>
    </svg>
  </div>`}function Ae(o,a){const i=$e(o.ogImageUrl,600),m=o.buildingCategory==="透天"?"House":"Building2";return`
  <a href="property.html?id=${o.nodeId}" class="prop-card reveal reveal-d${a+1}">
    <div class="prop-card-img">
      ${i?`<img src="${i}" alt="${o.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0" onerror="this.style.objectFit='contain';this.style.opacity='0.4';this.style.padding='20px';this.src='images/house_small.png'">`:`<div class="prop-card-img-icon">${f(m,48,1,"prop-placeholder-icon")}</div>`}
      <div class="prop-card-category">${o.buildingCategory||"住宅"}</div>
    </div>
    <div class="prop-card-body">
      <div class="prop-price">${Ce(o.price)}</div>
      <div class="prop-name">${o.title}</div>
      <div class="prop-info">
        <span class="prop-tag">${o.layout||""}</span>
        <span class="prop-tag">${o.buildingCategory||""}</span>
      </div>
      <div class="prop-card-footer">
        <span class="prop-location">${f("MapPin",13,2,"prop-loc-icon")} ${o.wixLocation||""}</span>
        <span class="prop-link">查看詳情 ${f("ArrowRight",13,2)}</span>
      </div>
    </div>
  </a>`}document.getElementById("app").innerHTML=`
  ${ye()}

  <!-- ── HERO ── -->
  <section id="hero">
    <!-- 桌機滿版背景，由滑鼠橫向位置決定顯示第幾幀。
         用圖片序列不用影片：影片刮動要 seek，跳到還沒下載到的位置就會
         發 Range 請求並卡住（GitHub Pages 上實測一次 0.7 秒）。
         圖片序列沒有這個問題 —— 載到第幾張，第幾格就能刮，換圖就是換圖。
         流量差不多（40 張 WebP 共 1099 KB，影片 1196 KB）。
         img 由 JS 產生，手機完全不會下載。 -->
    <div id="heroScrub" aria-hidden="true"></div>
    
    <!-- 第二種主視覺：一家人從空屋刮成家。預設不顯示，也不載圖，
         使用者按了「找到家」才建立，不然首屏會多背 350 KB。 -->
    <div id="heroHome" class="hero-home" aria-hidden="true">
      <img class="hero-home-layer" alt="">
      <canvas class="hero-home-scratch"></canvas>
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
          <a href="properties.html" class="hero-btn-primary">${f("Home",16,2,"btn-icon")} 看看物件</a>
          <a href="#about" class="hero-btn-secondary">${f("User",16,2,"btn-icon")} 認識 Cindy</a>
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
    
    <!-- 放在 .hero-inner 之後：桌機是絕對定位在右下角，DOM 順序無所謂；
         手機改成靜態排版，要接在影片卡下面才對，所以必須排在 inner 後面。 -->
    <div class="hero-mode" role="group" aria-label="切換主視覺">
      <button type="button" class="hero-mode-btn is-on" data-mode="cindy" aria-pressed="true">Meet me</button>
      <button type="button" class="hero-mode-btn" data-mode="home" aria-pressed="false">Find home</button>
    </div>
    <a href="#about" class="scroll-hint-wrap" id="scrollHint">
      <span class="scroll-hint-text">SCROLL</span>
      <div class="scroll-arrow-wrap">
        ${f("ChevronDown",22,1.5,"scroll-arrow-icon")}
        ${f("ChevronDown",22,1.5,"scroll-arrow-icon scroll-arrow-delay")}
      </div>
    </a>
  </section>

  ${Y("#B2CDCB","#FBF8F3")}

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
          <span class="about-tag tag-sage">${f("MapPin",13,2)} 住南崁將近20 年</span>
          <span class="about-tag tag-peach">${f("Users",13,2)} 父女搭檔</span>
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
        ${f("Monitor",15,2)} 用整個螢幕看
      </a>
    </div>
  </section>



  ${Y("#FBF8F3","#F2EDE4")}

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
          查看全部物件 ${f("ArrowRight",16,2)}
        </a>
      </div>
    </div>
  </section>

  ${Y("#F2EDE4","#FBF8F3")}

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
          <div class="form-card-icon">${f("Home",36,1.5,"form-icon-buy")}</div>
          <div class="form-card-title">我想買房</div>
          <div class="form-card-desc">告訴我預算、坪數、區域需求<br>讓我幫你找到對的家</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-rent" data-tf-popup="zlT7vf5X" data-tf-size="90">
          <div class="form-card-icon">${f("KeyRound",36,1.5,"form-icon-rent")}</div>
          <div class="form-card-title">我想租屋</div>
          <div class="form-card-desc">說明租金預算、格局、入住時間<br>我來幫你媒合合適的房源</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
        <button class="form-card form-card-sell" data-tf-popup="cK5kqUM9" data-tf-size="90">
          <div class="form-card-icon">${f("Banknote",36,1.5,"form-icon-sell")}</div>
          <div class="form-card-title">我想賣房</div>
          <div class="form-card-desc">留下物件資訊與聯絡方式<br>讓我為你評估最佳售出策略</div>
          <div class="form-card-btn">填寫表單 →</div>
        </button>
      </div>
    </div>
  </section>

  <!-- 電腦版是 teal 底，所以這條「米色撕向 teal」要留著。
       手機版底色換成照片了，這條會被 CSS 藏起來（.before-contact）。 -->
  ${Y("#FBF8F3","#7CBBC3").replace("torn-divider","torn-divider before-contact")}

  <!-- ── 聯絡 ── -->
  <section id="contact" class="contact-reveal">
    ${`
    <div class="contact-media">
      <img class="contact-layer" alt=""
           src="images/home-lived.webp"
           srcset="images/home-lived-sm.webp 900w, images/home-lived.webp 1800w"
           sizes="100vw" loading="lazy" decoding="async">
      <canvas class="contact-scratch"></canvas>
      <div class="contact-reveal-hint"><span>👆</span> 刮刮看</div>
      <!-- 上下用跟全站一樣的撕紙邊，把照片「撕」進頁面裡。
           整個網站每個接縫都是撕的，只有這裡是機器切的直線的話會很突兀。 -->
      ${pe("#FBF8F3","top")}
      ${pe("#7CBBC3","bottom")}
    </div>
    <!-- 標題壓在圖上（桌機），圖裡那面牆就是為它留白的。
         手機螢幕窄，這一段會自動掉到圖片下面，見 style.css -->
    <div class="contact-headline">
      <h2 class="contact-title reveal">有任何問題都可以<br><strong>直接找我聊聊</strong></h2>
      <p class="contact-sub reveal">不管是買房、賣房還是只是想了解南崁行情，隨時歡迎</p>
    </div>`}
    <div class="contact-inner">
      

      <div class="contact-info-list reveal">
        <div class="contact-info-row">
          <span class="contact-info-icon">${f("Phone",18,1.5)}</span>
          <span class="contact-info-label">Cindy</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0963585690" class="contact-info-value">0963-585-690</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${f("Phone",18,1.5)}</span>
          <span class="contact-info-label">王先生</span>
          <span class="contact-info-divider">|</span>
          <a href="tel:0968731280" class="contact-info-value">0968-731-280</a>
        </div>
        <div class="contact-info-row">
          <span class="contact-info-icon">${f("MessageCircle",18,1.5)}</span>
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

  ${Me()}
`;Ee();xe();Be();function Be(){const o=document.getElementById("hero"),a=document.getElementById("heroHome"),i=o==null?void 0:o.querySelector(".hero-mode");if(!o||!a||!i)return;let m=null;i.addEventListener("mouseover",()=>i.classList.add("is-hovering")),i.addEventListener("mouseleave",()=>i.classList.remove("is-hovering")),i.addEventListener("click",w=>{const g=w.target.closest(".hero-mode-btn");if(!g)return;const y=g.dataset.mode;for(const C of i.querySelectorAll(".hero-mode-btn"))C.classList.toggle("is-on",C===g),C.setAttribute("aria-pressed",String(C===g));o.classList.toggle("mode-home",y==="home"),a.setAttribute("aria-hidden",String(y!=="home")),y==="home"?(m||(a.querySelector("img").src="images/home-lived.webp",m=ue({root:o,media:a,canvas:a.querySelector("canvas"),topSrc:()=>"images/home-empty.webp",flip:!0,brush:95,listenOn:o,enabled:!1})),requestAnimationFrame(()=>{m==null||m.resize(),m==null||m.setActive(!0)})):m==null||m.setActive(!1)})}setTimeout(()=>{var o;(o=document.getElementById("heroStrong"))==null||o.classList.add("hero-title-line-animate")},1400);var ve;(ve=document.getElementById("scrollHint"))==null||ve.addEventListener("click",o=>{o.preventDefault();const a=document.getElementById("about");a&&window.scrollTo({top:a.offsetTop-64,behavior:"smooth"})});{const o=document.getElementById("hero"),a=document.getElementById("heroScrub"),i=document.getElementById("heroLoopVideo"),m=matchMedia("(min-width: 901px) and (hover: hover) and (pointer: fine)").matches,w=matchMedia("(prefers-reduced-motion: reduce)").matches;if(m&&o&&a){const y=[];for(let n=0;n<40;n++){const r=new Image;r.decoding="async",r.alt="",r.className="hero-frame-img",a.appendChild(r),y.push(r)}const C=()=>{const n=[],r=new Set;for(const h of[8,4,2,1])for(let d=0;d<40;d+=h)r.has(d)||(r.add(d),n.push(d));return n},I=new Array(40).fill(!1);let x=-1;const V=n=>{if(n=Math.max(0,Math.min(39,Math.round(n))),!I[n]){let r=-1;for(let h=1;h<40;h++){if(n-h>=0&&I[n-h]){r=n-h;break}if(n+h<40&&I[n+h]){r=n+h;break}}if(r<0)return;n=r}n!==x&&(y[n].style.zIndex="2",y[n].classList.add("on"),x>=0&&(y[x].style.zIndex="1",y[x].classList.remove("on")),x=n)},u=()=>{for(const n of C())y[n].addEventListener("load",()=>{const r=()=>{I[n]=!0,x<0&&V(n)};y[n].decode?y[n].decode().then(r,r):r()},{once:!0}),y[n].src=`media/frames/${String(n).padStart(2,"0")}.webp`};document.readyState==="complete"?setTimeout(u,200):window.addEventListener("load",()=>setTimeout(u,200));const M=37/720,_=64,z=960,O=540,L=()=>{const n=a.clientWidth,r=a.clientHeight;if(!n||!r)return;const h=Math.max(n/z,r/O),d=O*h-r,b=d<=0?0:Math.max(0,Math.min(100,(O*M*h-_)/d*100));a.style.setProperty("--hero-vpos",b.toFixed(1)+"%")};if(L(),window.addEventListener("resize",L),!w){let r=0,h=0,d=!1;const b=()=>{h+=(r-h)*.18,V(h),Math.abs(r-h)>.4?requestAnimationFrame(b):d=!1};o.addEventListener("mousemove",X=>{o.classList.contains("mode-home")||(r=(1-X.clientX/window.innerWidth)*39,d||(d=!0,requestAnimationFrame(b)))})}}else if(i&&!w){const g=()=>{i.autoplay=!0,i.src="media/hero-loop.mp4",i.addEventListener("loadeddata",()=>i.play().catch(()=>{}),{once:!0}),i.play().catch(()=>{})};document.readyState==="complete"?setTimeout(g,300):window.addEventListener("load",()=>setTimeout(g,300))}}async function Ie(){try{const a=await(await fetch(Se)).json(),i=a.filter(w=>w.title&&w.nodeId).slice(0,3);document.getElementById("homePropsGrid").innerHTML=i.map((w,g)=>Ae(w,g)).join(""),document.getElementById("propsMoreBtn").innerHTML=`查看全部 ${a.length} 筆物件 ${f("ArrowRight",16,2)}`;const m=new IntersectionObserver(w=>{w.forEach(g=>{g.isIntersecting&&g.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll("#homePropsGrid .reveal").forEach(w=>m.observe(w))}catch{document.getElementById("homePropsGrid").innerHTML='<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--brown-mid)">暫時無法載入物件</div>'}}Ie();
