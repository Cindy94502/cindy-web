import{r as k,a as C,i as I,b as o}from"./shared-JHOlPo22.js";import{G as L,f as y}from"./data-DQaSi1fH.js";const x=new URLSearchParams(location.search),E=x.get("id");document.getElementById("app").innerHTML=`
  ${k()}
  <div class="property-page">
    <div class="property-loading">載入中...</div>
  </div>
  ${C()}
`;I();async function R(e){if(!e)return[];try{const r=await(await fetch(`https://res.cloudinary.com/ddzync8km/image/list/${e}.json`)).json();return!r.resources||r.resources.length===0?[]:r.resources.sort((a,n)=>(a.display_name||a.public_id).localeCompare(n.display_name||n.public_id,void 0,{numeric:!0})).map(a=>`https://res.cloudinary.com/ddzync8km/image/upload/${a.public_id}.${a.format||"jpg"}`)}catch{return[]}}function S(e){return e?Array.isArray(e)?e:(e.match(/<li>(.*?)<\/li>/g)||[]).map(t=>t.replace(/<\/?li>/g,"").trim()):[]}function h(e){const t=e.ogImageUrl||"";return`
  <a href="property.html?id=${e.nodeId}" class="similar-card">
    <div class="similar-img-wrap">
      ${t?`<img src="${t}" alt="${e.title}" loading="lazy">`:`<div class="similar-img-placeholder">${o("Home",40,1)}</div>`}
    </div>
    <div class="similar-name">${e.title}</div>
    <div class="similar-reason">${e.reason||""}</div>
    <div class="similar-price">${y(e.price)}</div>
  </a>`}function v(e,t,r){const a=document.querySelector(".similar-section");if(!a)return;const n=a.querySelector(".similar-inner"),l=Math.ceil(e.length/3);n.innerHTML=`
    <div class="similar-title-row">
      <div class="section-eyebrow" id="similarEyebrow">${t}</div>
      <h2 class="similar-heading" id="similarHeading">${r}</h2>
    </div>
    ${e.length===0?`
      <div class="similar-empty">目前沒有相符物件，歡迎直接聯絡我查詢！</div>
    `:`
    <div class="similar-carousel-wrap">
      ${e.length>3?`<button class="similar-nav similar-prev" id="similarPrev">${o("ChevronLeft",26,2)}</button>`:""}
      <div class="similar-overflow">
        <div class="similar-grid" id="similarGrid">
          ${e.map(s=>h(s)).join("")}
        </div>
      </div>
      ${e.length>3?`<button class="similar-nav similar-next" id="similarNext">${o("ChevronRight",26,2)}</button>`:""}
    </div>
    ${e.length>3?`
    <div class="similar-dots" id="similarDots">
      ${Array.from({length:l}).map((s,i)=>`<span class="similar-dot ${i===0?"active":""}" data-index="${i}"></span>`).join("")}
    </div>`:""}
    `}
  `,a.style.display="",e.length>3&&p()}function M(e,t){document.querySelector(".similar-section")&&document.querySelectorAll(".clickable-tag").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.tag,l=a.classList.contains("tag-active");if(document.querySelectorAll(".clickable-tag").forEach(s=>s.classList.remove("tag-active")),l){const s=t.filter(i=>i.nodeId!==e.nodeId&&i.title&&(i.buildingCategory===e.buildingCategory||i.priceRange===e.priceRange)).slice(0,9).map(i=>({...i,reason:i.buildingCategory===e.buildingCategory&&i.priceRange===e.priceRange?`同為${i.buildingCategory}・${i.priceRange}`:i.buildingCategory===e.buildingCategory?`同為${i.buildingCategory}`:`同價格區間・${i.priceRange}`}));v(s,"也許你也會喜歡","相似物件")}else{a.classList.add("tag-active");const s=t.filter(i=>i.nodeId!==e.nodeId&&i.title&&((i.tags||"").split(",").map(c=>c.trim()).includes(n)||(i.wixParking||"").trim()===n||(i.wixLocation||"").includes(n)||n.includes(i.wixLocation||""))).slice(0,9).map(i=>({...i,reason:`同樣有「${n}」`}));v(s,`選擇了「${n}」`,"相似物件")}})})}async function P(){try{const t=await(await fetch(L)).json(),r=t.find(n=>n.nodeId===E);if(!r){document.querySelector(".property-loading").innerHTML='<p>找不到這個物件，<a href="properties.html" style="color:var(--teal-dark)">回到物件列表</a></p>';return}document.title=`${r.title} | Cindy 王小姐`;const a=await R(r.cloudinaryFolder);r.ogImageUrl&&!a.includes(r.ogImageUrl)&&a.unshift(r.ogImageUrl);try{const n=await fetch("/cindy-web/market-data.json");n.ok&&(d=(await n.json())[r.nodeId]||null)}catch{d=null}j(r,a,t)}catch{document.querySelector(".property-loading").innerHTML="<p>載入失敗，請稍後再試</p>"}}let d=null;function B(e){var n;if(!d||!((n=d.deals)!=null&&n.length))return"";const t=parseInt(e.roomCount)||0,r=d.deals.map((l,s)=>`
    <tr class="${t&&l.rooms===t?"market-row-match":""}" data-mpage="${Math.floor(s/5)}">
      <td>${l.date}</td>
      <td>${l.floor}</td>
      <td>${l.layout}</td>
      <td>${l.ping}坪</td>
      <td>${l.totalWan}萬${l.hasPark?'<span class="market-badge">車</span>':""}${l.note?`<span class="market-note">${l.note}</span>`:""}</td>
      <td>${l.unitWan!=null?l.unitWan+"萬":"—"}${l.unitHasPark?'<span class="market-badge">車</span>':""}</td>
    </tr>`).join(""),a=Math.ceil(d.deals.length/5);return`
    <div class="property-market-wrap">
      <div class="property-section-title">${o("TrendingUp",16,2)} ${d.community}近期實價登錄</div>
      <div class="market-table-scroll">
        <table class="market-table">
          <thead><tr><th>成交</th><th>樓層</th><th>格局</th><th>總面積</th><th>總價</th><th>單價/坪<span class="market-help" tabindex="0">?<span class="market-tip">依是否有申報車位價格及面積，分為 2 種公式：<br>公式一：總價 ÷ 總面積（單價旁標「車」者含車位）<br>公式二：（總價 − 車位價格）÷（總面積 − 車位面積）</span></span></th></tr></thead>
          <tbody id="marketBody">${r}</tbody>
        </table>
      </div>
      ${a>1?`
      <div class="market-pager">
        <button class="market-pager-btn" id="marketPrev">${o("ChevronLeft",14,2)} 上一頁</button>
        <span class="market-pager-info" id="marketPageInfo"></span>
        <button class="market-pager-btn" id="marketNext">下一頁 ${o("ChevronRight",14,2)}</button>
      </div>`:""}
      <div class="market-source">資料來源：內政部實價登錄，已排除親友間等特殊交易；<br>單價計算比照內政部公式，標「車」者含車位。${t?"<br>底色列為同房型成交資訊":""}<br>行情資訊僅供參考，實際成交價格依個案條件而異。</div>
    </div>`}function T(){const e=document.querySelector(".market-help"),t=e==null?void 0:e.querySelector(".market-tip");if(!e||!t)return;const r=()=>{t.style.visibility="hidden",t.style.display="block";const a=e.getBoundingClientRect(),n=Math.min(430,window.innerWidth*.92);let l=a.right-n;l=Math.max(10,Math.min(l,window.innerWidth-n-10)),t.style.left=l+"px",t.style.transform="none",t.style.top=Math.max(10,a.top-t.offsetHeight-10)+"px",t.style.display="",t.style.visibility=""};e.addEventListener("mouseenter",r),e.addEventListener("focus",r)}function A(){var l,s;const e=document.getElementById("marketBody");if(!e)return;const t=[...e.querySelectorAll("tr")],r=Math.ceil(t.length/5);if(r<=1)return;let a=0;const n=()=>{t.forEach(i=>{i.style.display=i.dataset.mpage==a?"":"none"}),document.getElementById("marketPageInfo").textContent=`${a+1} / ${r}`,document.getElementById("marketPrev").disabled=a===0,document.getElementById("marketNext").disabled=a===r-1};(l=document.getElementById("marketPrev"))==null||l.addEventListener("click",()=>{a>0&&(a--,n())}),(s=document.getElementById("marketNext"))==null||s.addEventListener("click",()=>{a<r-1&&(a++,n())}),n()}function U(e){return e.length===0?`<div class="gallery-placeholder">${o("Home",80,1,"","var(--sage-dark)")}</div>`:`
    <img class="gallery-main-img" id="galleryMain" src="${e[0]}" alt="物件照片">
    <button class="gallery-arrow prev" id="galleryPrev">${o("ChevronLeft",22,2)}</button>
    <button class="gallery-arrow next" id="galleryNext">${o("ChevronRight",22,2)}</button>
    <div class="gallery-thumbs" id="galleryThumbs">
      ${e.map((t,r)=>`
        <img class="gallery-thumb ${r===0?"active":""}"
             src="${t}" alt="縮圖${r+1}"
             data-index="${r}" loading="lazy">
      `).join("")}
    </div>
  `}function q(e){var l,s;if(e.length===0)return;let t=0;const r=document.getElementById("galleryMain"),a=document.querySelectorAll(".gallery-thumb");function n(i){var c;t=(i+e.length)%e.length,r.style.opacity="0",setTimeout(()=>{r.src=e[t],r.style.opacity="1"},150),a.forEach((m,g)=>m.classList.toggle("active",g===t)),(c=a[t])==null||c.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}(l=document.getElementById("galleryPrev"))==null||l.addEventListener("click",()=>n(t-1)),(s=document.getElementById("galleryNext"))==null||s.addEventListener("click",()=>n(t+1)),a.forEach((i,c)=>i.addEventListener("click",()=>n(c))),document.addEventListener("keydown",i=>{i.key==="ArrowLeft"&&n(t-1),i.key==="ArrowRight"&&n(t+1)})}function j(e,t,r=[]){const a=S(e.wixFeatures),n=(e.tags||"").split(",").filter(Boolean),l=r.filter(s=>s.nodeId!==e.nodeId&&s.title&&(s.buildingCategory===e.buildingCategory||s.priceRange===e.priceRange)).slice(0,9).map(s=>({...s,reason:s.buildingCategory===e.buildingCategory&&s.priceRange===e.priceRange?`同為${s.buildingCategory}・${s.priceRange}`:s.buildingCategory===e.buildingCategory?`同為${s.buildingCategory}`:`同價格區間・${s.priceRange}`}));document.querySelector(".property-page").innerHTML=`
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
          ${n.map((s,i)=>`<span class="property-tag clickable-tag tag-color-${i%5}" data-tag="${s}">${s}</span>`).join("")}
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

        ${B(e)}

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

        ${a.length>0?`
        <div class="property-features">
          <div class="property-section-title">${o("Star",16,2)} 物件特色</div>
          <ul>${a.map(s=>`<li>${s}</li>`).join("")}</ul>
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
              <div class="sidebar-agent-name">王小姐</div>
              <div class="sidebar-agent-title">中信房屋南崁一極</div>
            </div>
          </div>
          <div class="sidebar-price">${y(e.price)}</div>
          <div class="sidebar-btns">
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="sidebar-btn-line">
              ${o("MessageCircle",16,2)} LINE 我詢問
            </a>
            <a href="tel:0963585690" class="sidebar-btn-tel">
              ${o("Phone",16,2)} 王小姐 0963-585-690
            </a>
            <a href="tel:0968731280" class="sidebar-btn-tel">
              ${o("Phone",16,2)} 王先生 0968-731-280
            </a>
          </div>
          <div class="sidebar-note">不管是問行情還是想看房<br>隨時都可以找我</div>
          <!-- 分享區塊 -->
          <div class="sidebar-share">
            <div class="sidebar-share-label">分享此物件</div>
            <div class="sidebar-share-btns">
              <button id="btnShareLine" class="share-btn share-btn-line">${o("MessageCircle",14,2)} LINE</button>
              <button id="btnShareFb" class="share-btn share-btn-fb">${o("MessageCircle",14,2)} Messenger</button>
              <button id="btnCopyLink" class="share-btn share-btn-copy">${o("Link",14,2)} 複製連結</button>
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
          ${l.length>3?`<button class="similar-nav similar-prev" id="similarPrev">${o("ChevronLeft",26,2)}</button>`:""}
          <div class="similar-overflow">
            <div class="similar-grid" id="similarGrid">
              ${l.map(s=>h(s)).join("")}
            </div>
          </div>
          ${l.length>3?`<button class="similar-nav similar-next" id="similarNext">${o("ChevronRight",26,2)}</button>`:""}
        </div>
        ${l.length>3?`
        <div class="similar-dots" id="similarDots">
          ${Array.from({length:Math.ceil(l.length/3)}).map((s,i)=>`<span class="similar-dot ${i===0?"active":""}" data-index="${i}"></span>`).join("")}
        </div>`:""}
      </div>
    </div>`:""}

  `,_(e,t),q(t),z(e),A(),T(),M(e,r),p()}function p(){const e=document.getElementById("similarGrid"),t=document.getElementById("similarPrev"),r=document.getElementById("similarNext"),a=document.querySelectorAll(".similar-dot");if(!e||!t||!r)return;const n=e.querySelectorAll(".similar-card"),l=n.length,s=window.innerWidth<=768?2:3,i=Math.ceil(l/s);let c=0;function m(g){c=Math.max(0,Math.min(g,i-1));const u=parseInt(getComputedStyle(e).columnGap)||40,b=n[0].offsetWidth,$=s*(b+u);e.style.transform=`translateX(-${c*$}px)`,a.forEach((f,w)=>f.classList.toggle("active",w===c)),t.style.opacity=c===0?"0.3":"1",r.style.opacity=c===i-1?"0.3":"1"}t.addEventListener("click",()=>{c>0&&m(c-1)}),r.addEventListener("click",()=>{c<i-1&&m(c+1)}),a.forEach((g,u)=>g.addEventListener("click",()=>m(u))),m(0)}function _(e,t){const r=location.href,a=e.ogImageUrl||t[0]||"",n=(l,s)=>{let i=document.querySelector(`meta[property="${l}"]`);i||(i=document.createElement("meta"),i.setAttribute("property",l),document.head.appendChild(i)),i.setAttribute("content",s)};n("og:title",`${e.title} | Cindy 王小姐`),n("og:description",`💰 售價與詳情請點擊查閱。格局：${e.layout||"—"}，${e.wixLocation||""}精選房源推薦。`),n("og:image",a),n("og:url",r),n("og:type","website")}function z(e){var n,l,s;const t=`https://cindy94502.github.io/cindy-web/p/${encodeURIComponent(e.nodeId)}.html`,r=[e.layout?`格局：${e.layout}`:"",e.buildingSize?`建坪：${e.buildingSize}坪`:"",e.landSize?`土坪：${e.landSize}坪`:""].filter(Boolean).join(`
`),a=`${e.title}｜NT${e.price?(e.price/1e4).toFixed(0)+"萬":"洽談"}｜Cindy 王小姐`+(r?`
`+r:"");(n=document.getElementById("btnCopyLink"))==null||n.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(a+`
`+t);const i=document.getElementById("btnCopyLink");i.textContent="✓ 已複製！",setTimeout(()=>i.textContent="複製連結",2e3)}catch{alert("請手動複製網址")}}),(l=document.getElementById("btnShareLine"))==null||l.addEventListener("click",()=>{window.open(`https://line.me/R/msg/text/?${encodeURIComponent(a+`
`+t)}`,"_blank")}),(s=document.getElementById("btnShareFb"))==null||s.addEventListener("click",()=>{const i=`fb-messenger://share?link=${encodeURIComponent(t)}`;window.location.href=i,setTimeout(()=>{window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(t)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(t)}`,"_blank")},1500)})}P();
