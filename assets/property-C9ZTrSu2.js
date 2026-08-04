import{r as k,a as C,i as L,b as c}from"./shared-CRs0bZB6.js";import{G as I,f as u}from"./data-DQaSi1fH.js";const x=new URLSearchParams(location.search),E=x.get("id");document.getElementById("app").innerHTML=`
  ${k()}
  <div class="property-page">
    <div class="property-loading">載入中...</div>
  </div>
  ${C()}
`;L();async function S(e){if(!e)return[];try{const s=await(await fetch(`https://res.cloudinary.com/ddzync8km/image/list/${e}.json`)).json();return!s.resources||s.resources.length===0?[]:s.resources.sort((a,r)=>(a.display_name||a.public_id).localeCompare(r.display_name||r.public_id,void 0,{numeric:!0})).map(a=>`https://res.cloudinary.com/ddzync8km/image/upload/${a.public_id}.${a.format||"jpg"}`)}catch{return[]}}function R(e){return e?Array.isArray(e)?e:(e.match(/<li>(.*?)<\/li>/g)||[]).map(i=>i.replace(/<\/?li>/g,"").trim()):[]}function h(e){const i=e.ogImageUrl||"";return`
  <a href="property.html?id=${e.nodeId}" class="similar-card">
    <div class="similar-img-wrap">
      ${i?`<img src="${i}" alt="${e.title}" loading="lazy">`:`<div class="similar-img-placeholder">${c("Home",40,1)}</div>`}
    </div>
    <div class="similar-name">${e.title}</div>
    <div class="similar-reason">${e.reason||""}</div>
    <div class="similar-price">${u(e.price)}</div>
  </a>`}function y(e,i,s){const a=document.querySelector(".similar-section");if(!a)return;const r=a.querySelector(".similar-inner"),l=Math.ceil(e.length/3);r.innerHTML=`
    <div class="similar-title-row">
      <div class="section-eyebrow" id="similarEyebrow">${i}</div>
      <h2 class="similar-heading" id="similarHeading">${s}</h2>
    </div>
    ${e.length===0?`
      <div class="similar-empty">目前沒有相符物件，歡迎直接聯絡我查詢！</div>
    `:`
    <div class="similar-carousel-wrap">
      ${e.length>3?`<button class="similar-nav similar-prev" id="similarPrev">${c("ChevronLeft",26,2)}</button>`:""}
      <div class="similar-overflow">
        <div class="similar-grid" id="similarGrid">
          ${e.map(n=>h(n)).join("")}
        </div>
      </div>
      ${e.length>3?`<button class="similar-nav similar-next" id="similarNext">${c("ChevronRight",26,2)}</button>`:""}
    </div>
    ${e.length>3?`
    <div class="similar-dots" id="similarDots">
      ${Array.from({length:l}).map((n,t)=>`<span class="similar-dot ${t===0?"active":""}" data-index="${t}"></span>`).join("")}
    </div>`:""}
    `}
  `,a.style.display="",e.length>3&&p()}function M(e,i){document.querySelector(".similar-section")&&document.querySelectorAll(".clickable-tag").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.tag,l=a.classList.contains("tag-active");if(document.querySelectorAll(".clickable-tag").forEach(n=>n.classList.remove("tag-active")),l){const n=i.filter(t=>t.nodeId!==e.nodeId&&t.title&&(t.buildingCategory===e.buildingCategory||t.priceRange===e.priceRange)).slice(0,9).map(t=>({...t,reason:t.buildingCategory===e.buildingCategory&&t.priceRange===e.priceRange?`同為${t.buildingCategory}・${t.priceRange}`:t.buildingCategory===e.buildingCategory?`同為${t.buildingCategory}`:`同價格區間・${t.priceRange}`}));y(n,"也許你也會喜歡","相似物件")}else{a.classList.add("tag-active");const n=i.filter(t=>t.nodeId!==e.nodeId&&t.title&&((t.tags||"").split(",").map(o=>o.trim()).includes(r)||(t.wixParking||"").trim()===r||(t.wixLocation||"").includes(r)||r.includes(t.wixLocation||""))).slice(0,9).map(t=>({...t,reason:`同樣有「${r}」`}));y(n,`選擇了「${r}」`,"相似物件")}})})}async function B(){try{const i=await(await fetch(I)).json(),s=i.find(r=>r.nodeId===E);if(!s){document.querySelector(".property-loading").innerHTML='<p>找不到這個物件，<a href="properties.html" style="color:var(--teal-dark)">回到物件列表</a></p>';return}document.title=`${s.title} | Cindy 小薰`;const a=await S(s.cloudinaryFolder);s.ogImageUrl&&!a.includes(s.ogImageUrl)&&a.unshift(s.ogImageUrl);try{const r=await fetch("/cindy-web/market-data.json");r.ok&&(v=(await r.json())[s.nodeId]||null)}catch{v=null}j(s,a,i)}catch{document.querySelector(".property-loading").innerHTML="<p>載入失敗，請稍後再試</p>"}}let v=null;function P(e){return""}function A(){const e=document.querySelector(".market-help"),i=e==null?void 0:e.querySelector(".market-tip");if(!e||!i)return;const s=()=>{i.style.visibility="hidden",i.style.display="block";const a=e.getBoundingClientRect(),r=Math.min(430,window.innerWidth*.92);let l=a.right-r;l=Math.max(10,Math.min(l,window.innerWidth-r-10)),i.style.left=l+"px",i.style.transform="none",i.style.top=Math.max(10,a.top-i.offsetHeight-10)+"px",i.style.display="",i.style.visibility=""};e.addEventListener("mouseenter",s),e.addEventListener("focus",s)}function T(){var l,n;const e=document.getElementById("marketBody");if(!e)return;const i=[...e.querySelectorAll("tr")],s=Math.ceil(i.length/5);if(s<=1)return;let a=0;const r=()=>{i.forEach(t=>{t.style.display=t.dataset.mpage==a?"":"none"}),document.getElementById("marketPageInfo").textContent=`${a+1} / ${s}`,document.getElementById("marketPrev").disabled=a===0,document.getElementById("marketNext").disabled=a===s-1};(l=document.getElementById("marketPrev"))==null||l.addEventListener("click",()=>{a>0&&(a--,r())}),(n=document.getElementById("marketNext"))==null||n.addEventListener("click",()=>{a<s-1&&(a++,r())}),r()}function q(e){return e.length===0?`<div class="gallery-placeholder">${c("Home",80,1,"","var(--sage-dark)")}</div>`:`
    <img class="gallery-main-img" id="galleryMain" src="${e[0]}" alt="物件照片">
    <button class="gallery-arrow prev" id="galleryPrev">${c("ChevronLeft",22,2)}</button>
    <button class="gallery-arrow next" id="galleryNext">${c("ChevronRight",22,2)}</button>
    <div class="gallery-thumbs" id="galleryThumbs">
      ${e.map((i,s)=>`
        <img class="gallery-thumb ${s===0?"active":""}"
             src="${i}" alt="縮圖${s+1}"
             data-index="${s}" loading="lazy">
      `).join("")}
    </div>
  `}function U(e){var l,n;if(e.length===0)return;let i=0;const s=document.getElementById("galleryMain"),a=document.querySelectorAll(".gallery-thumb");function r(t){var o;i=(t+e.length)%e.length,s.style.opacity="0",setTimeout(()=>{s.src=e[i],s.style.opacity="1"},150),a.forEach((d,m)=>d.classList.toggle("active",m===i)),(o=a[i])==null||o.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}(l=document.getElementById("galleryPrev"))==null||l.addEventListener("click",()=>r(i-1)),(n=document.getElementById("galleryNext"))==null||n.addEventListener("click",()=>r(i+1)),a.forEach((t,o)=>t.addEventListener("click",()=>r(o))),document.addEventListener("keydown",t=>{t.key==="ArrowLeft"&&r(i-1),t.key==="ArrowRight"&&r(i+1)})}function j(e,i,s=[]){const a=R(e.wixFeatures),r=(e.tags||"").split(",").filter(Boolean),l=s.filter(n=>n.nodeId!==e.nodeId&&n.title&&(n.buildingCategory===e.buildingCategory||n.priceRange===e.priceRange)).slice(0,9).map(n=>({...n,reason:n.buildingCategory===e.buildingCategory&&n.priceRange===e.priceRange?`同為${n.buildingCategory}・${n.priceRange}`:n.buildingCategory===e.buildingCategory?`同為${n.buildingCategory}`:`同價格區間・${n.priceRange}`}));document.querySelector(".property-page").innerHTML=`
    <div class="property-gallery">
      ${q(i)}
    </div>

    <div class="property-body">
      <div class="property-main">
        <h1 class="property-title">${e.title}</h1>
        <div class="property-price-row">
          <div class="property-price">${u(e.price)}</div>
          ${e.priceRange?`<div class="property-price-range">（${e.priceRange}）</div>`:""}
        </div>
        <div class="property-tags">
          ${r.map((n,t)=>`<span class="property-tag clickable-tag tag-color-${t%5}" data-tag="${n}">${n}</span>`).join("")}
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

        ${P()}

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
          <div class="sidebar-price">${u(e.price)}</div>
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
              ${l.map(n=>h(n)).join("")}
            </div>
          </div>
          ${l.length>3?`<button class="similar-nav similar-next" id="similarNext">${c("ChevronRight",26,2)}</button>`:""}
        </div>
        ${l.length>3?`
        <div class="similar-dots" id="similarDots">
          ${Array.from({length:Math.ceil(l.length/3)}).map((n,t)=>`<span class="similar-dot ${t===0?"active":""}" data-index="${t}"></span>`).join("")}
        </div>`:""}
      </div>
    </div>`:""}

  `,_(e,i),U(i),z(e),T(),A(),M(e,s),p()}function p(){const e=document.getElementById("similarGrid"),i=document.getElementById("similarPrev"),s=document.getElementById("similarNext"),a=document.querySelectorAll(".similar-dot");if(!e||!i||!s)return;const r=e.querySelectorAll(".similar-card"),l=r.length,n=window.innerWidth<=768?2:3,t=Math.ceil(l/n);let o=0;function d(m){o=Math.max(0,Math.min(m,t-1));const g=parseInt(getComputedStyle(e).columnGap)||40,b=r[0].offsetWidth,$=n*(b+g);e.style.transform=`translateX(-${o*$}px)`,a.forEach((f,w)=>f.classList.toggle("active",w===o)),i.style.opacity=o===0?"0.3":"1",s.style.opacity=o===t-1?"0.3":"1"}i.addEventListener("click",()=>{o>0&&d(o-1)}),s.addEventListener("click",()=>{o<t-1&&d(o+1)}),a.forEach((m,g)=>m.addEventListener("click",()=>d(g))),d(0)}function _(e,i){const s=location.href,a=e.ogImageUrl||i[0]||"",r=(l,n)=>{let t=document.querySelector(`meta[property="${l}"]`);t||(t=document.createElement("meta"),t.setAttribute("property",l),document.head.appendChild(t)),t.setAttribute("content",n)};r("og:title",`${e.title} | Cindy 小薰`),r("og:description",`💰 售價與詳情請點擊查閱。格局：${e.layout||"—"}，${e.wixLocation||""}精選房源推薦。`),r("og:image",a),r("og:url",s),r("og:type","website")}function z(e){var r,l,n;const i=`https://cindy94502.github.io/cindy-web/p/${encodeURIComponent(e.nodeId)}.html`,s=[e.layout?`格局：${e.layout}`:"",e.buildingSize?`建坪：${e.buildingSize}坪`:"",e.landSize?`土坪：${e.landSize}坪`:""].filter(Boolean).join(`
`),a=`${e.title}｜NT${e.price?(e.price/1e4).toFixed(0)+"萬":"洽談"}｜Cindy 小薰`+(s?`
`+s:"");(r=document.getElementById("btnCopyLink"))==null||r.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(a+`
`+i);const t=document.getElementById("btnCopyLink");t.textContent="✓ 已複製！",setTimeout(()=>t.textContent="複製連結",2e3)}catch{alert("請手動複製網址")}}),(l=document.getElementById("btnShareLine"))==null||l.addEventListener("click",()=>{window.open(`https://line.me/R/msg/text/?${encodeURIComponent(a+`
`+i)}`,"_blank")}),(n=document.getElementById("btnShareFb"))==null||n.addEventListener("click",()=>{const t=`fb-messenger://share?link=${encodeURIComponent(i)}`;window.location.href=t,setTimeout(()=>{window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(i)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(i)}`,"_blank")},1500)})}B();
