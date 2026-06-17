import{r as w,a as C,i as L,b as o}from"./shared-Zy1XvVyR.js";/* empty css               */import{G as x,f as v}from"./data-DQaSi1fH.js";const I=new URLSearchParams(location.search),k=I.get("id");document.getElementById("app").innerHTML=`
  ${w()}
  <div class="property-page">
    <div class="property-loading">載入中...</div>
  </div>
  ${C()}
`;L();async function E(e){if(!e)return[];try{const s=await(await fetch(`https://res.cloudinary.com/ddzync8km/image/list/${e}.json`)).json();return!s.resources||s.resources.length===0?[]:s.resources.sort((r,n)=>(r.display_name||r.public_id).localeCompare(n.display_name||n.public_id,void 0,{numeric:!0})).map(r=>`https://res.cloudinary.com/ddzync8km/image/upload/${r.public_id}.${r.format||"jpg"}`)}catch{return[]}}function S(e){return e?(e.match(/<li>(.*?)<\/li>/g)||[]).map(a=>a.replace(/<\/?li>/g,"").trim()):[]}function y(e){const a=e.ogImageUrl||"";return`
  <a href="property.html?id=${e.nodeId}" class="similar-card">
    <div class="similar-img-wrap">
      ${a?`<img src="${a}" alt="${e.title}" loading="lazy">`:`<div class="similar-img-placeholder">${o("Home",40,1)}</div>`}
    </div>
    <div class="similar-name">${e.title}</div>
    <div class="similar-reason">${e.reason||""}</div>
    <div class="similar-price">${v(e.price)}</div>
  </a>`}function u(e,a,s){const r=document.querySelector(".similar-section");if(!r)return;const n=r.querySelector(".similar-inner"),c=Math.ceil(e.length/3);n.innerHTML=`
    <div class="similar-title-row">
      <div class="section-eyebrow" id="similarEyebrow">${a}</div>
      <h2 class="similar-heading" id="similarHeading">${s}</h2>
    </div>
    ${e.length===0?`
      <div class="similar-empty">目前沒有相符物件，歡迎直接聯絡我查詢！</div>
    `:`
    <div class="similar-carousel-wrap">
      ${e.length>3?`<button class="similar-nav similar-prev" id="similarPrev">${o("ChevronLeft",26,2)}</button>`:""}
      <div class="similar-overflow">
        <div class="similar-grid" id="similarGrid">
          ${e.map(i=>y(i)).join("")}
        </div>
      </div>
      ${e.length>3?`<button class="similar-nav similar-next" id="similarNext">${o("ChevronRight",26,2)}</button>`:""}
    </div>
    ${e.length>3?`
    <div class="similar-dots" id="similarDots">
      ${Array.from({length:c}).map((i,t)=>`<span class="similar-dot ${t===0?"active":""}" data-index="${t}"></span>`).join("")}
    </div>`:""}
    `}
  `,r.style.display="",e.length>3&&p()}function R(e,a){document.querySelector(".similar-section")&&document.querySelectorAll(".clickable-tag").forEach(r=>{r.addEventListener("click",()=>{const n=r.dataset.tag,c=r.classList.contains("tag-active");if(document.querySelectorAll(".clickable-tag").forEach(i=>i.classList.remove("tag-active")),c){const i=a.filter(t=>t.nodeId!==e.nodeId&&t.title&&(t.buildingCategory===e.buildingCategory||t.priceRange===e.priceRange)).slice(0,9).map(t=>({...t,reason:t.buildingCategory===e.buildingCategory&&t.priceRange===e.priceRange?`同為${t.buildingCategory}・${t.priceRange}`:t.buildingCategory===e.buildingCategory?`同為${t.buildingCategory}`:`同價格區間・${t.priceRange}`}));u(i,"也許你也會喜歡","相似物件")}else{r.classList.add("tag-active");const i=a.filter(t=>t.nodeId!==e.nodeId&&t.title&&((t.tags||"").split(",").map(l=>l.trim()).includes(n)||(t.wixParking||"").trim()===n||(t.wixLocation||"").includes(n)||n.includes(t.wixLocation||""))).slice(0,9).map(t=>({...t,reason:`同樣有「${n}」`}));u(i,`選擇了「${n}」`,"相似物件")}})})}async function M(){try{const a=await(await fetch(x)).json(),s=a.find(n=>n.nodeId===k);if(!s){document.querySelector(".property-loading").innerHTML='<p>找不到這個物件，<a href="properties.html" style="color:var(--teal-dark)">回到物件列表</a></p>';return}document.title=`${s.title} | Cindy 王瑋薰`;const r=await E(s.cloudinaryFolder);s.ogImageUrl&&!r.includes(s.ogImageUrl)&&r.unshift(s.ogImageUrl),A(s,r,a)}catch{document.querySelector(".property-loading").innerHTML="<p>載入失敗，請稍後再試</p>"}}function P(e){return e.length===0?`<div class="gallery-placeholder">${o("Home",80,1,"","var(--sage-dark)")}</div>`:`
    <img class="gallery-main-img" id="galleryMain" src="${e[0]}" alt="物件照片">
    <button class="gallery-arrow prev" id="galleryPrev">${o("ChevronLeft",22,2)}</button>
    <button class="gallery-arrow next" id="galleryNext">${o("ChevronRight",22,2)}</button>
    <div class="gallery-thumbs" id="galleryThumbs">
      ${e.map((a,s)=>`
        <img class="gallery-thumb ${s===0?"active":""}"
             src="${a}" alt="縮圖${s+1}"
             data-index="${s}" loading="lazy">
      `).join("")}
    </div>
  `}function T(e){var c,i;if(e.length===0)return;let a=0;const s=document.getElementById("galleryMain"),r=document.querySelectorAll(".gallery-thumb");function n(t){var l;a=(t+e.length)%e.length,s.style.opacity="0",setTimeout(()=>{s.src=e[a],s.style.opacity="1"},150),r.forEach((d,m)=>d.classList.toggle("active",m===a)),(l=r[a])==null||l.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}(c=document.getElementById("galleryPrev"))==null||c.addEventListener("click",()=>n(a-1)),(i=document.getElementById("galleryNext"))==null||i.addEventListener("click",()=>n(a+1)),r.forEach((t,l)=>t.addEventListener("click",()=>n(l))),document.addEventListener("keydown",t=>{t.key==="ArrowLeft"&&n(a-1),t.key==="ArrowRight"&&n(a+1)})}function A(e,a,s=[]){const r=S(e.wixFeatures),n=(e.tags||"").split(",").filter(Boolean),c=s.filter(i=>i.nodeId!==e.nodeId&&i.title&&(i.buildingCategory===e.buildingCategory||i.priceRange===e.priceRange)).slice(0,9).map(i=>({...i,reason:i.buildingCategory===e.buildingCategory&&i.priceRange===e.priceRange?`同為${i.buildingCategory}・${i.priceRange}`:i.buildingCategory===e.buildingCategory?`同為${i.buildingCategory}`:`同價格區間・${i.priceRange}`}));document.querySelector(".property-page").innerHTML=`
    <div class="property-gallery">
      ${P(a)}
    </div>

    <div class="property-body">
      <div class="property-main">
        <h1 class="property-title">${e.title}</h1>
        <div class="property-price-row">
          <div class="property-price">${v(e.price)}</div>
          ${e.priceRange?`<div class="property-price-range">（${e.priceRange}）</div>`:""}
        </div>
        <div class="property-tags">
          ${n.map((i,t)=>`<span class="property-tag clickable-tag tag-color-${t%5}" data-tag="${i}">${i}</span>`).join("")}
          ${e.wixLocation?`<span class="property-tag tag-location">${o("MapPin",12,2)} ${e.wixLocation}</span>`:""}
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

        ${e.mapAddress||e.wixLocation?`
        <div class="property-map-wrap">
          <div class="property-section-title">${o("MapPin",16,2)} 周邊環境</div>
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
          <div class="property-section-title">${o("Play",16,2)} 物件影片</div>
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

        ${r.length>0?`
        <div class="property-features">
          <div class="property-section-title">${o("Star",16,2)} 物件特色</div>
          <ul>${r.map(i=>`<li>${i}</li>`).join("")}</ul>
        </div>`:""}

        ${e.webDescription?`
        <div class="property-section-title">${o("FileText",16,2)} 物件說明</div>
        <div class="property-desc">${e.webDescription.replace(/<[^>]*>/g,"").replace(/\\n/g,"<br>")}</div>
        `:""}

        <a href="properties.html" style="font-size:13px;color:var(--teal-dark);letter-spacing:2px;display:inline-flex;align-items:center;gap:6px;margin-top:8px">
          ${o("ArrowLeft",14,2)} 回到物件列表
        </a>
      </div>

      <div class="property-sidebar">
        <div class="contact-card-sticky">
          <div class="sidebar-agent">
            <div class="sidebar-agent-avatar"><img src="images/Cindy.png" alt="Cindy" style="width:100%;height:100%;object-fit:cover;border-radius:50%"></div>
            <div>
              <div class="sidebar-agent-name">王瑋薰 Cindy</div>
              <div class="sidebar-agent-title">中信房屋南崁一極</div>
            </div>
          </div>
          <div class="sidebar-price">${v(e.price)}</div>
          <div class="sidebar-btns">
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="sidebar-btn-line">
              ${o("MessageCircle",16,2)} LINE 我詢問
            </a>
            <a href="tel:0963585690" class="sidebar-btn-tel">
              ${o("Phone",16,2)} Cindy 0963-585-690
            </a>
            <a href="tel:0968731280" class="sidebar-btn-tel">
              ${o("Phone",16,2)} 王俊棋 0968-731-280
            </a>
          </div>
          <div class="sidebar-note">不管是問行情還是想看房<br>隨時都可以找我</div>
          <!-- 分享區塊 -->
          <div class="sidebar-share">
            <div class="sidebar-share-label">分享此物件</div>
            <div class="sidebar-share-btns">
              <button id="btnShareLine" class="share-btn share-btn-line">${o("MessageCircle",14,2)} LINE</button>
              <button id="btnShareFb" class="share-btn share-btn-fb">${o("Share2",14,2)} FB</button>
              <button id="btnCopyLink" class="share-btn share-btn-copy">${o("Link",14,2)} 複製連結</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    ${c.length>0?`
    <div class="similar-section">
      <div class="similar-inner">
        <div class="similar-title-row">
          <div class="section-eyebrow" id="similarEyebrow">也許你也會喜歡</div>
          <h2 class="similar-heading" id="similarHeading">相似物件</h2>
        </div>
        <div class="similar-carousel-wrap">
          ${c.length>3?`<button class="similar-nav similar-prev" id="similarPrev">${o("ChevronLeft",26,2)}</button>`:""}
          <div class="similar-overflow">
            <div class="similar-grid" id="similarGrid">
              ${c.map(i=>y(i)).join("")}
            </div>
          </div>
          ${c.length>3?`<button class="similar-nav similar-next" id="similarNext">${o("ChevronRight",26,2)}</button>`:""}
        </div>
        ${c.length>3?`
        <div class="similar-dots" id="similarDots">
          ${Array.from({length:Math.ceil(c.length/3)}).map((i,t)=>`<span class="similar-dot ${t===0?"active":""}" data-index="${t}"></span>`).join("")}
        </div>`:""}
      </div>
    </div>`:""}

  `,q(e,a),T(a),B(e),R(e,s),p()}function p(){const e=document.getElementById("similarGrid"),a=document.getElementById("similarPrev"),s=document.getElementById("similarNext"),r=document.querySelectorAll(".similar-dot");if(!e||!a||!s)return;const n=e.querySelectorAll(".similar-card"),c=n.length,i=3,t=Math.ceil(c/i);let l=0;function d(m){l=Math.max(0,Math.min(m,t-1));const g=parseInt(getComputedStyle(e).columnGap)||40,b=n[0].offsetWidth,h=i*(b+g);e.style.transform=`translateX(-${l*h}px)`,r.forEach(($,f)=>$.classList.toggle("active",f===l)),a.style.opacity=l===0?"0.3":"1",s.style.opacity=l===t-1?"0.3":"1"}a.addEventListener("click",()=>{l>0&&d(l-1)}),s.addEventListener("click",()=>{l<t-1&&d(l+1)}),r.forEach((m,g)=>m.addEventListener("click",()=>d(g))),d(0)}function q(e,a){var c;const s=location.href,r=e.ogImageUrl||a[0]||"",n=(i,t)=>{let l=document.querySelector(`meta[property="${i}"]`);l||(l=document.createElement("meta"),l.setAttribute("property",i),document.head.appendChild(l)),l.setAttribute("content",t)};n("og:title",`${e.title} | Cindy 王瑋薰`),n("og:description",((c=e.webDescription)==null?void 0:c.replace(/<[^>]*>/g,"").slice(0,100))||"南崁在地房產諮詢"),n("og:image",r),n("og:url",s),n("og:type","website")}function B(e){var r,n,c;const a=location.href,s=`${e.title}｜NT${e.price?(e.price/1e4).toFixed(0)+"萬":"洽談"}｜Cindy 王瑋薰`;(r=document.getElementById("btnCopyLink"))==null||r.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(a);const i=document.getElementById("btnCopyLink");i.textContent="✓ 已複製！",setTimeout(()=>i.textContent="複製連結",2e3)}catch{alert("請手動複製網址")}}),(n=document.getElementById("btnShareLine"))==null||n.addEventListener("click",()=>{window.open(`https://line.me/R/msg/text/?${encodeURIComponent(s+`
`+a)}`,"_blank")}),(c=document.getElementById("btnShareFb"))==null||c.addEventListener("click",()=>{const i=`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(a)}`;window.open(i,"_blank")})}M();
