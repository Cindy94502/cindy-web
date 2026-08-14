import{r as C,a as L,i as I,b as c}from"./shared-Xevyg2o0.js";import{G as x,f as y,c as u}from"./data-fy7z4F0d.js";const E=new URLSearchParams(location.search),S=E.get("id");document.getElementById("app").innerHTML=`
  ${C()}
  <div class="property-page">
    <div class="property-loading">載入中...</div>
  </div>
  ${L()}
`;I();async function R(e){if(!e)return[];try{const s=await(await fetch(`https://res.cloudinary.com/ddzync8km/image/list/${e}.json`)).json();return!s.resources||s.resources.length===0?[]:s.resources.sort((a,r)=>(a.display_name||a.public_id).localeCompare(r.display_name||r.public_id,void 0,{numeric:!0})).map(a=>`https://res.cloudinary.com/ddzync8km/image/upload/${a.public_id}.${a.format||"jpg"}`)}catch{return[]}}function M(e){return e?Array.isArray(e)?e:(e.match(/<li>(.*?)<\/li>/g)||[]).map(t=>t.replace(/<\/?li>/g,"").trim()):[]}function b(e){const t=u(e.ogImageUrl,400);return`
  <a href="property.html?id=${e.nodeId}" class="similar-card">
    <div class="similar-img-wrap">
      ${t?`<img src="${t}" alt="${e.title}" loading="lazy">`:`<div class="similar-img-placeholder">${c("Home",40,1)}</div>`}
    </div>
    <div class="similar-name">${e.title}</div>
    <div class="similar-reason">${e.reason||""}</div>
    <div class="similar-price">${y(e.price)}</div>
  </a>`}function v(e,t,s){const a=document.querySelector(".similar-section");if(!a)return;const r=a.querySelector(".similar-inner"),l=Math.ceil(e.length/3);r.innerHTML=`
    <div class="similar-title-row">
      <div class="section-eyebrow" id="similarEyebrow">${t}</div>
      <h2 class="similar-heading" id="similarHeading">${s}</h2>
    </div>
    ${e.length===0?`
      <div class="similar-empty">目前沒有相符物件，歡迎直接聯絡我查詢！</div>
    `:`
    <div class="similar-carousel-wrap">
      ${e.length>3?`<button class="similar-nav similar-prev" id="similarPrev">${c("ChevronLeft",26,2)}</button>`:""}
      <div class="similar-overflow">
        <div class="similar-grid" id="similarGrid">
          ${e.map(n=>b(n)).join("")}
        </div>
      </div>
      ${e.length>3?`<button class="similar-nav similar-next" id="similarNext">${c("ChevronRight",26,2)}</button>`:""}
    </div>
    ${e.length>3?`
    <div class="similar-dots" id="similarDots">
      ${Array.from({length:l}).map((n,i)=>`<span class="similar-dot ${i===0?"active":""}" data-index="${i}"></span>`).join("")}
    </div>`:""}
    `}
  `,a.style.display="",e.length>3&&p()}function B(e,t){document.querySelector(".similar-section")&&document.querySelectorAll(".clickable-tag").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.tag,l=a.classList.contains("tag-active");if(document.querySelectorAll(".clickable-tag").forEach(n=>n.classList.remove("tag-active")),l){const n=t.filter(i=>i.nodeId!==e.nodeId&&i.title&&(i.buildingCategory===e.buildingCategory||i.priceRange===e.priceRange)).slice(0,9).map(i=>({...i,reason:i.buildingCategory===e.buildingCategory&&i.priceRange===e.priceRange?`同為${i.buildingCategory}・${i.priceRange}`:i.buildingCategory===e.buildingCategory?`同為${i.buildingCategory}`:`同價格區間・${i.priceRange}`}));v(n,"也許你也會喜歡","相似物件")}else{a.classList.add("tag-active");const n=t.filter(i=>i.nodeId!==e.nodeId&&i.title&&((i.tags||"").split(",").map(o=>o.trim()).includes(r)||(i.wixParking||"").trim()===r||(i.wixLocation||"").includes(r)||r.includes(i.wixLocation||""))).slice(0,9).map(i=>({...i,reason:`同樣有「${r}」`}));v(n,`選擇了「${r}」`,"相似物件")}})})}async function P(){try{const t=await(await fetch(x)).json(),s=t.find(r=>r.nodeId===S);if(!s){document.querySelector(".property-loading").innerHTML='<p>找不到這個物件，<a href="properties.html" style="color:var(--teal-dark)">回到物件列表</a></p>';return}document.title=`${s.title} | Cindy 小薰`;const a=await R(s.cloudinaryFolder);s.ogImageUrl&&!a.includes(s.ogImageUrl)&&a.unshift(s.ogImageUrl);try{const r=await fetch("/cindy-web/market-data.json");r.ok&&(h=(await r.json())[s.nodeId]||null)}catch{h=null}_(s,a,t)}catch{document.querySelector(".property-loading").innerHTML="<p>載入失敗，請稍後再試</p>"}}let h=null;function A(e){return""}function T(){const e=document.querySelector(".market-help"),t=e==null?void 0:e.querySelector(".market-tip");if(!e||!t)return;const s=()=>{t.style.visibility="hidden",t.style.display="block";const a=e.getBoundingClientRect(),r=Math.min(430,window.innerWidth*.92);let l=a.right-r;l=Math.max(10,Math.min(l,window.innerWidth-r-10)),t.style.left=l+"px",t.style.transform="none",t.style.top=Math.max(10,a.top-t.offsetHeight-10)+"px",t.style.display="",t.style.visibility=""};e.addEventListener("mouseenter",s),e.addEventListener("focus",s)}function j(){var l,n;const e=document.getElementById("marketBody");if(!e)return;const t=[...e.querySelectorAll("tr")],s=Math.ceil(t.length/5);if(s<=1)return;let a=0;const r=()=>{t.forEach(i=>{i.style.display=i.dataset.mpage==a?"":"none"}),document.getElementById("marketPageInfo").textContent=`${a+1} / ${s}`,document.getElementById("marketPrev").disabled=a===0,document.getElementById("marketNext").disabled=a===s-1};(l=document.getElementById("marketPrev"))==null||l.addEventListener("click",()=>{a>0&&(a--,r())}),(n=document.getElementById("marketNext"))==null||n.addEventListener("click",()=>{a<s-1&&(a++,r())}),r()}function U(e){return e.length===0?`<div class="gallery-placeholder">${c("Home",80,1,"","var(--sage-dark)")}</div>`:`
    <img class="gallery-main-img" id="galleryMain" src="${u(e[0],1400)}" alt="物件照片">
    <button class="gallery-arrow prev" id="galleryPrev">${c("ChevronLeft",22,2)}</button>
    <button class="gallery-arrow next" id="galleryNext">${c("ChevronRight",22,2)}</button>
    <div class="gallery-thumbs" id="galleryThumbs">
      ${e.map((t,s)=>`
        <img class="gallery-thumb ${s===0?"active":""}"
             src="${u(t,200)}" alt="縮圖${s+1}"
             data-index="${s}" loading="lazy">
      `).join("")}
    </div>
  `}function q(e){var l,n;if(e.length===0)return;let t=0;const s=document.getElementById("galleryMain"),a=document.querySelectorAll(".gallery-thumb");function r(i){var o;t=(i+e.length)%e.length,s.style.opacity="0",setTimeout(()=>{s.src=u(e[t],1400),s.style.opacity="1"},150),a.forEach((d,m)=>d.classList.toggle("active",m===t)),(o=a[t])==null||o.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}(l=document.getElementById("galleryPrev"))==null||l.addEventListener("click",()=>r(t-1)),(n=document.getElementById("galleryNext"))==null||n.addEventListener("click",()=>r(t+1)),a.forEach((i,o)=>i.addEventListener("click",()=>r(o))),document.addEventListener("keydown",i=>{i.key==="ArrowLeft"&&r(t-1),i.key==="ArrowRight"&&r(t+1)})}function _(e,t,s=[]){const a=M(e.wixFeatures),r=(e.tags||"").split(",").filter(Boolean),l=s.filter(n=>n.nodeId!==e.nodeId&&n.title&&(n.buildingCategory===e.buildingCategory||n.priceRange===e.priceRange)).slice(0,9).map(n=>({...n,reason:n.buildingCategory===e.buildingCategory&&n.priceRange===e.priceRange?`同為${n.buildingCategory}・${n.priceRange}`:n.buildingCategory===e.buildingCategory?`同為${n.buildingCategory}`:`同價格區間・${n.priceRange}`}));document.querySelector(".property-page").innerHTML=`
    <div class="property-gallery">
      ${U(t)}
    </div>

    <div class="property-body">
      <div class="property-main">
        <h1 class="property-title">${e.title}</h1>
        <div class="property-price-row">
          <div class="property-price">${y(e.price)}</div>
          ${e.priceRange?`<div class="property-price-range">（${e.priceRange}）</div>`:""}
        </div>
        <div class="property-tags">
          ${r.map((n,i)=>`<span class="property-tag clickable-tag tag-color-${i%5}" data-tag="${n}">${n}</span>`).join("")}
          ${e.wixLocation?`<span class="property-tag tag-location">${c("MapPin",12,2)} ${e.wixLocation}</span>`:""}
          ${e.wixParking?`<span class="property-tag tag-location">${e.wixParking}</span>`:""}
        </div>

        <div class="property-specs">
          <div class="spec-item">
            <span class="spec-label">格局</span>
            <span class="spec-value">${e.layout||"—"}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">房型</span>
            <span class="spec-value">${e.buildingCategory||"—"}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">房數</span>
            <span class="spec-value">${e.roomCount||"—"}</span>
          </div>
        </div>

        ${A()}

        ${e.mapAddress||e.wixLocation?`
        <div class="property-map-wrap">
          <div class="property-section-title">${c("MapPin",16,2)} 周邊環境</div>
          <div class="property-map-label">${e.wixLocation||e.mapAddress}</div>
          <iframe
            class="property-map"
            src="https://maps.google.com/maps?q=${encodeURIComponent(e.mapAddress||e.wixLocation+" 桃園")}&output=embed&hl=zh-TW&z=15"
            allowfullscreen loading="lazy"
            referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>`:""}

        ${e.youtubeUrl?`
        <div class="property-video-wrap">
          <div class="property-section-title">${c("Play",16,2)} 物件影片</div>
          <div class="property-video-container">
            <iframe
              src="https://www.youtube.com/embed/${e.youtubeUrl}"
              title="${e.title}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen loading="lazy">
            </iframe>
          </div>
        </div>`:""}

        ${a.length>0?`
        <div class="property-features">
          <div class="property-section-title">${c("Star",16,2)} 物件特色</div>
          <ul>${a.map(n=>`<li>${n}</li>`).join("")}</ul>
        </div>`:""}

        ${e.webDescription?`
        <div class="property-section-title">${c("FileText",16,2)} 物件說明</div>
        <div class="property-desc">${e.webDescription.replace(/<[^>]*>/g,"").replace(/\\n/g,"<br>")}</div>
        `:""}

        <a href="properties.html" style="font-size:13px;color:var(--teal-dark);letter-spacing:2px;display:inline-flex;align-items:center;gap:6px;margin-top:8px">
          ${c("ArrowLeft",14,2)} 回到物件列表
        </a>
      </div>

      <div class="property-sidebar">
        <div class="contact-card-sticky">
          <div class="sidebar-agent">
            <div class="sidebar-agent-avatar"><img src="images/Cindy.png" alt="Cindy" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>
            <div>
              <div class="sidebar-agent-name">小薰</div>
              <div class="sidebar-agent-title">中信房屋南崁一極</div>
            </div>
          </div>
          <div class="sidebar-price">${y(e.price)}</div>
          <div class="sidebar-btns">
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="sidebar-btn-line">
              ${c("MessageCircle",16,2)} LINE 我詢問
            </a>
            <a href="tel:0963585690" class="sidebar-btn-tel">
              ${c("Phone",16,2)} 小薰 0963-585-690
            </a>
            <a href="tel:0968731280" class="sidebar-btn-tel">
              ${c("Phone",16,2)} 王先生 0968-731-280
            </a>
          </div>
          <div class="sidebar-note">不管是問行情還是想看房<br>隨時都可以找我</div>
          <!-- 分享區塊 -->
          <div class="sidebar-share">
            <div class="sidebar-share-label">分享此物件</div>
            <div class="sidebar-share-btns">
              <button id="btnShareLine" class="share-btn share-btn-line">${c("MessageCircle",14,2)} LINE</button>
              <button id="btnShareFb" class="share-btn share-btn-fb">${c("MessageCircle",14,2)} Messenger</button>
              <button id="btnCopyLink" class="share-btn share-btn-copy">${c("Link",14,2)} 複製連結</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    ${l.length>0?`
    <div class="similar-section">
      <div class="similar-inner">
        <div class="similar-title-row">
          <div class="section-eyebrow" id="similarEyebrow">也許你也會喜歡</div>
          <h2 class="similar-heading" id="similarHeading">相似物件</h2>
        </div>
        <div class="similar-carousel-wrap">
          ${l.length>3?`<button class="similar-nav similar-prev" id="similarPrev">${c("ChevronLeft",26,2)}</button>`:""}
          <div class="similar-overflow">
            <div class="similar-grid" id="similarGrid">
              ${l.map(n=>b(n)).join("")}
            </div>
          </div>
          ${l.length>3?`<button class="similar-nav similar-next" id="similarNext">${c("ChevronRight",26,2)}</button>`:""}
        </div>
        ${l.length>3?`
        <div class="similar-dots" id="similarDots">
          ${Array.from({length:Math.ceil(l.length/3)}).map((n,i)=>`<span class="similar-dot ${i===0?"active":""}" data-index="${i}"></span>`).join("")}
        </div>`:""}
      </div>
    </div>`:""}

  `,z(e,t),q(t),N(e),j(),T(),B(e,s),p()}function p(){const e=document.getElementById("similarGrid"),t=document.getElementById("similarPrev"),s=document.getElementById("similarNext"),a=document.querySelectorAll(".similar-dot");if(!e||!t||!s)return;const r=e.querySelectorAll(".similar-card"),l=r.length,n=window.innerWidth<=768?2:3,i=Math.ceil(l/n);let o=0;function d(m){o=Math.max(0,Math.min(m,i-1));const g=parseInt(getComputedStyle(e).columnGap)||40,$=r[0].offsetWidth,f=n*($+g);e.style.transform=`translateX(-${o*f}px)`,a.forEach((w,k)=>w.classList.toggle("active",k===o)),t.style.opacity=o===0?"0.3":"1",s.style.opacity=o===i-1?"0.3":"1"}t.addEventListener("click",()=>{o>0&&d(o-1)}),s.addEventListener("click",()=>{o<i-1&&d(o+1)}),a.forEach((m,g)=>m.addEventListener("click",()=>d(g))),d(0)}function z(e,t){const s=location.href,a=e.ogImageUrl||t[0]||"",r=(l,n)=>{let i=document.querySelector(`meta[property="${l}"]`);i||(i=document.createElement("meta"),i.setAttribute("property",l),document.head.appendChild(i)),i.setAttribute("content",n)};r("og:title",`${e.title} | Cindy 小薰`),r("og:description",`💰 售價與詳情請點擊查閱。格局：${e.layout||"—"}，${e.wixLocation||""}精選房源推薦。`),r("og:image",a),r("og:url",s),r("og:type","website")}function N(e){var o,d,m;const t=`https://cindy94502.github.io/cindy-web/p/${encodeURIComponent(e.nodeId)}.html`,s=[e.layout?`格局：${e.layout}`:"",e.buildingSize?`建坪：${e.buildingSize}坪`:"",e.landSize?`土坪：${e.landSize}坪`:""].filter(Boolean).join(`
`),a=e.price?`${Number(e.price/1e4).toLocaleString("en-US")} 萬`:"價格洽談",r=`${e.title}｜${a}`,l=[s,e.wixLocation||""].filter(Boolean).join(`
`),n=["欣益不動產開發有限公司","中信房屋 南崁一極加盟店","Cindy 小薰　0963-585-690"].join(`
`),i=[r,l].filter(Boolean).join(`
`);(o=document.getElementById("btnCopyLink"))==null||o.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(i+`

`+t+`

`+n);const g=document.getElementById("btnCopyLink");g.textContent="✓ 已複製！",setTimeout(()=>g.textContent="複製連結",2e3)}catch{alert("請手動複製網址")}}),(d=document.getElementById("btnShareLine"))==null||d.addEventListener("click",()=>{window.open(`https://line.me/R/msg/text/?${encodeURIComponent(i+`

`+t+`

`+n)}`,"_blank")}),(m=document.getElementById("btnShareFb"))==null||m.addEventListener("click",()=>{const g=`fb-messenger://share?link=${encodeURIComponent(t)}`;window.location.href=g,setTimeout(()=>{window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(t)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(t)}`,"_blank")},1500)})}P();
