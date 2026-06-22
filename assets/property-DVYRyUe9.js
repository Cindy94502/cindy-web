import{r as w,a as C,i as L,b as c}from"./shared-CMzD3Qwp.js";import{G as I,f as v}from"./data-DQaSi1fH.js";const k=new URLSearchParams(location.search),x=k.get("id");document.getElementById("app").innerHTML=`
  ${w()}
  <div class="property-page">
    <div class="property-loading">載入中...</div>
  </div>
  ${C()}
`;L();async function E(e){if(!e)return[];try{const s=await(await fetch(`https://res.cloudinary.com/ddzync8km/image/list/${e}.json`)).json();return!s.resources||s.resources.length===0?[]:s.resources.sort((n,r)=>(n.display_name||n.public_id).localeCompare(r.display_name||r.public_id,void 0,{numeric:!0})).map(n=>`https://res.cloudinary.com/ddzync8km/image/upload/${n.public_id}.${n.format||"jpg"}`)}catch{return[]}}function R(e){return e?(e.match(/<li>(.*?)<\/li>/g)||[]).map(a=>a.replace(/<\/?li>/g,"").trim()):[]}function y(e){const a=e.ogImageUrl||"";return`
  <a href="property.html?id=${e.nodeId}" class="similar-card">
    <div class="similar-img-wrap">
      ${a?`<img src="${a}" alt="${e.title}" loading="lazy">`:`<div class="similar-img-placeholder">${c("Home",40,1)}</div>`}
    </div>
    <div class="similar-name">${e.title}</div>
    <div class="similar-reason">${e.reason||""}</div>
    <div class="similar-price">${v(e.price)}</div>
  </a>`}function u(e,a,s){const n=document.querySelector(".similar-section");if(!n)return;const r=n.querySelector(".similar-inner"),l=Math.ceil(e.length/3);r.innerHTML=`
    <div class="similar-title-row">
      <div class="section-eyebrow" id="similarEyebrow">${a}</div>
      <h2 class="similar-heading" id="similarHeading">${s}</h2>
    </div>
    ${e.length===0?`
      <div class="similar-empty">目前沒有相符物件，歡迎直接聯絡我查詢！</div>
    `:`
    <div class="similar-carousel-wrap">
      ${e.length>3?`<button class="similar-nav similar-prev" id="similarPrev">${c("ChevronLeft",26,2)}</button>`:""}
      <div class="similar-overflow">
        <div class="similar-grid" id="similarGrid">
          ${e.map(t=>y(t)).join("")}
        </div>
      </div>
      ${e.length>3?`<button class="similar-nav similar-next" id="similarNext">${c("ChevronRight",26,2)}</button>`:""}
    </div>
    ${e.length>3?`
    <div class="similar-dots" id="similarDots">
      ${Array.from({length:l}).map((t,i)=>`<span class="similar-dot ${i===0?"active":""}" data-index="${i}"></span>`).join("")}
    </div>`:""}
    `}
  `,n.style.display="",e.length>3&&p()}function S(e,a){document.querySelector(".similar-section")&&document.querySelectorAll(".clickable-tag").forEach(n=>{n.addEventListener("click",()=>{const r=n.dataset.tag,l=n.classList.contains("tag-active");if(document.querySelectorAll(".clickable-tag").forEach(t=>t.classList.remove("tag-active")),l){const t=a.filter(i=>i.nodeId!==e.nodeId&&i.title&&(i.buildingCategory===e.buildingCategory||i.priceRange===e.priceRange)).slice(0,9).map(i=>({...i,reason:i.buildingCategory===e.buildingCategory&&i.priceRange===e.priceRange?`同為${i.buildingCategory}・${i.priceRange}`:i.buildingCategory===e.buildingCategory?`同為${i.buildingCategory}`:`同價格區間・${i.priceRange}`}));u(t,"也許你也會喜歡","相似物件")}else{n.classList.add("tag-active");const t=a.filter(i=>i.nodeId!==e.nodeId&&i.title&&((i.tags||"").split(",").map(o=>o.trim()).includes(r)||(i.wixParking||"").trim()===r||(i.wixLocation||"").includes(r)||r.includes(i.wixLocation||""))).slice(0,9).map(i=>({...i,reason:`同樣有「${r}」`}));u(t,`選擇了「${r}」`,"相似物件")}})})}async function M(){try{const a=await(await fetch(I)).json(),s=a.find(r=>r.nodeId===x);if(!s){document.querySelector(".property-loading").innerHTML='<p>找不到這個物件，<a href="properties.html" style="color:var(--teal-dark)">回到物件列表</a></p>';return}document.title=`${s.title} | Cindy 王小姐`;const n=await E(s.cloudinaryFolder);s.ogImageUrl&&!n.includes(s.ogImageUrl)&&n.unshift(s.ogImageUrl),A(s,n,a)}catch{document.querySelector(".property-loading").innerHTML="<p>載入失敗，請稍後再試</p>"}}function T(e){return e.length===0?`<div class="gallery-placeholder">${c("Home",80,1,"","var(--sage-dark)")}</div>`:`
    <img class="gallery-main-img" id="galleryMain" src="${e[0]}" alt="物件照片">
    <button class="gallery-arrow prev" id="galleryPrev">${c("ChevronLeft",22,2)}</button>
    <button class="gallery-arrow next" id="galleryNext">${c("ChevronRight",22,2)}</button>
    <div class="gallery-thumbs" id="galleryThumbs">
      ${e.map((a,s)=>`
        <img class="gallery-thumb ${s===0?"active":""}"
             src="${a}" alt="縮圖${s+1}"
             data-index="${s}" loading="lazy">
      `).join("")}
    </div>
  `}function P(e){var l,t;if(e.length===0)return;let a=0;const s=document.getElementById("galleryMain"),n=document.querySelectorAll(".gallery-thumb");function r(i){var o;a=(i+e.length)%e.length,s.style.opacity="0",setTimeout(()=>{s.src=e[a],s.style.opacity="1"},150),n.forEach((d,m)=>d.classList.toggle("active",m===a)),(o=n[a])==null||o.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}(l=document.getElementById("galleryPrev"))==null||l.addEventListener("click",()=>r(a-1)),(t=document.getElementById("galleryNext"))==null||t.addEventListener("click",()=>r(a+1)),n.forEach((i,o)=>i.addEventListener("click",()=>r(o))),document.addEventListener("keydown",i=>{i.key==="ArrowLeft"&&r(a-1),i.key==="ArrowRight"&&r(a+1)})}function A(e,a,s=[]){const n=R(e.wixFeatures),r=(e.tags||"").split(",").filter(Boolean),l=s.filter(t=>t.nodeId!==e.nodeId&&t.title&&(t.buildingCategory===e.buildingCategory||t.priceRange===e.priceRange)).slice(0,9).map(t=>({...t,reason:t.buildingCategory===e.buildingCategory&&t.priceRange===e.priceRange?`同為${t.buildingCategory}・${t.priceRange}`:t.buildingCategory===e.buildingCategory?`同為${t.buildingCategory}`:`同價格區間・${t.priceRange}`}));document.querySelector(".property-page").innerHTML=`
    <div class="property-gallery">
      ${T(a)}
    </div>

    <div class="property-body">
      <div class="property-main">
        <h1 class="property-title">${e.title}</h1>
        <div class="property-price-row">
          <div class="property-price">${v(e.price)}</div>
          ${e.priceRange?`<div class="property-price-range">（${e.priceRange}）</div>`:""}
        </div>
        <div class="property-tags">
          ${r.map((t,i)=>`<span class="property-tag clickable-tag tag-color-${i%5}" data-tag="${t}">${t}</span>`).join("")}
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

        ${n.length>0?`
        <div class="property-features">
          <div class="property-section-title">${c("Star",16,2)} 物件特色</div>
          <ul>${n.map(t=>`<li>${t}</li>`).join("")}</ul>
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
              <div class="sidebar-agent-name">王小姐</div>
              <div class="sidebar-agent-title">中信房屋南崁一極</div>
            </div>
          </div>
          <div class="sidebar-price">${v(e.price)}</div>
          <div class="sidebar-btns">
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="sidebar-btn-line">
              ${c("MessageCircle",16,2)} LINE 我詢問
            </a>
            <a href="tel:0963585690" class="sidebar-btn-tel">
              ${c("Phone",16,2)} 王小姐 0963-585-690
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
              ${l.map(t=>y(t)).join("")}
            </div>
          </div>
          ${l.length>3?`<button class="similar-nav similar-next" id="similarNext">${c("ChevronRight",26,2)}</button>`:""}
        </div>
        ${l.length>3?`
        <div class="similar-dots" id="similarDots">
          ${Array.from({length:Math.ceil(l.length/3)}).map((t,i)=>`<span class="similar-dot ${i===0?"active":""}" data-index="${i}"></span>`).join("")}
        </div>`:""}
      </div>
    </div>`:""}

  `,U(e,a),P(a),q(e),S(e,s),p()}function p(){const e=document.getElementById("similarGrid"),a=document.getElementById("similarPrev"),s=document.getElementById("similarNext"),n=document.querySelectorAll(".similar-dot");if(!e||!a||!s)return;const r=e.querySelectorAll(".similar-card"),l=r.length,t=window.innerWidth<=768?2:3,i=Math.ceil(l/t);let o=0;function d(m){o=Math.max(0,Math.min(m,i-1));const g=parseInt(getComputedStyle(e).columnGap)||40,b=r[0].offsetWidth,h=t*(b+g);e.style.transform=`translateX(-${o*h}px)`,n.forEach(($,f)=>$.classList.toggle("active",f===o)),a.style.opacity=o===0?"0.3":"1",s.style.opacity=o===i-1?"0.3":"1"}a.addEventListener("click",()=>{o>0&&d(o-1)}),s.addEventListener("click",()=>{o<i-1&&d(o+1)}),n.forEach((m,g)=>m.addEventListener("click",()=>d(g))),d(0)}function U(e,a){const s=location.href,n=e.ogImageUrl||a[0]||"",r=(l,t)=>{let i=document.querySelector(`meta[property="${l}"]`);i||(i=document.createElement("meta"),i.setAttribute("property",l),document.head.appendChild(i)),i.setAttribute("content",t)};r("og:title",`${e.title} | Cindy 王小姐`),r("og:description",`💰 售價與詳情請點擊查閱。格局：${e.layout||"—"}，${e.wixLocation||""}精選房源推薦。`),r("og:image",n),r("og:url",s),r("og:type","website")}function q(e){var n,r,l;const a=location.href,s=`${e.title}｜NT${e.price?(e.price/1e4).toFixed(0)+"萬":"洽談"}｜Cindy 王小姐`;(n=document.getElementById("btnCopyLink"))==null||n.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(a);const t=document.getElementById("btnCopyLink");t.textContent="✓ 已複製！",setTimeout(()=>t.textContent="複製連結",2e3)}catch{alert("請手動複製網址")}}),(r=document.getElementById("btnShareLine"))==null||r.addEventListener("click",()=>{window.open(`https://line.me/R/msg/text/?${encodeURIComponent(s+`
`+a)}`,"_blank")}),(l=document.getElementById("btnShareFb"))==null||l.addEventListener("click",()=>{const t=`fb-messenger://share?link=${encodeURIComponent(a)}`;window.location.href=t,setTimeout(()=>{window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(a)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(a)}`,"_blank")},1500)})}M();
