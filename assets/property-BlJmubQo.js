import{r as k,a as C,i as I,b as c}from"./shared-B4N8x-DF.js";import{G as L,f as v}from"./data-DQaSi1fH.js";const E=new URLSearchParams(location.search),x=E.get("id");document.getElementById("app").innerHTML=`
  ${k()}
  <div class="property-page">
    <div class="property-loading">載入中...</div>
  </div>
  ${C()}
`;I();async function R(e){if(!e)return[];try{const r=await(await fetch(`https://res.cloudinary.com/ddzync8km/image/list/${e}.json`)).json();return!r.resources||r.resources.length===0?[]:r.resources.sort((n,s)=>(n.display_name||n.public_id).localeCompare(s.display_name||s.public_id,void 0,{numeric:!0})).map(n=>`https://res.cloudinary.com/ddzync8km/image/upload/${n.public_id}.${n.format||"jpg"}`)}catch{return[]}}function S(e){return e?Array.isArray(e)?e:(e.match(/<li>(.*?)<\/li>/g)||[]).map(i=>i.replace(/<\/?li>/g,"").trim()):[]}function h(e){const i=e.ogImageUrl||"";return`
  <a href="property.html?id=${e.nodeId}" class="similar-card">
    <div class="similar-img-wrap">
      ${i?`<img src="${i}" alt="${e.title}" loading="lazy">`:`<div class="similar-img-placeholder">${c("Home",40,1)}</div>`}
    </div>
    <div class="similar-name">${e.title}</div>
    <div class="similar-reason">${e.reason||""}</div>
    <div class="similar-price">${v(e.price)}</div>
  </a>`}function y(e,i,r){const n=document.querySelector(".similar-section");if(!n)return;const s=n.querySelector(".similar-inner"),l=Math.ceil(e.length/3);s.innerHTML=`
    <div class="similar-title-row">
      <div class="section-eyebrow" id="similarEyebrow">${i}</div>
      <h2 class="similar-heading" id="similarHeading">${r}</h2>
    </div>
    ${e.length===0?`
      <div class="similar-empty">目前沒有相符物件，歡迎直接聯絡我查詢！</div>
    `:`
    <div class="similar-carousel-wrap">
      ${e.length>3?`<button class="similar-nav similar-prev" id="similarPrev">${c("ChevronLeft",26,2)}</button>`:""}
      <div class="similar-overflow">
        <div class="similar-grid" id="similarGrid">
          ${e.map(a=>h(a)).join("")}
        </div>
      </div>
      ${e.length>3?`<button class="similar-nav similar-next" id="similarNext">${c("ChevronRight",26,2)}</button>`:""}
    </div>
    ${e.length>3?`
    <div class="similar-dots" id="similarDots">
      ${Array.from({length:l}).map((a,t)=>`<span class="similar-dot ${t===0?"active":""}" data-index="${t}"></span>`).join("")}
    </div>`:""}
    `}
  `,n.style.display="",e.length>3&&p()}function M(e,i){document.querySelector(".similar-section")&&document.querySelectorAll(".clickable-tag").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.tag,l=n.classList.contains("tag-active");if(document.querySelectorAll(".clickable-tag").forEach(a=>a.classList.remove("tag-active")),l){const a=i.filter(t=>t.nodeId!==e.nodeId&&t.title&&(t.buildingCategory===e.buildingCategory||t.priceRange===e.priceRange)).slice(0,9).map(t=>({...t,reason:t.buildingCategory===e.buildingCategory&&t.priceRange===e.priceRange?`同為${t.buildingCategory}・${t.priceRange}`:t.buildingCategory===e.buildingCategory?`同為${t.buildingCategory}`:`同價格區間・${t.priceRange}`}));y(a,"也許你也會喜歡","相似物件")}else{n.classList.add("tag-active");const a=i.filter(t=>t.nodeId!==e.nodeId&&t.title&&((t.tags||"").split(",").map(o=>o.trim()).includes(s)||(t.wixParking||"").trim()===s||(t.wixLocation||"").includes(s)||s.includes(t.wixLocation||""))).slice(0,9).map(t=>({...t,reason:`同樣有「${s}」`}));y(a,`選擇了「${s}」`,"相似物件")}})})}async function P(){try{const i=await(await fetch(L)).json(),r=i.find(s=>s.nodeId===x);if(!r){document.querySelector(".property-loading").innerHTML='<p>找不到這個物件，<a href="properties.html" style="color:var(--teal-dark)">回到物件列表</a></p>';return}document.title=`${r.title} | Cindy 王小姐`;const n=await R(r.cloudinaryFolder);r.ogImageUrl&&!n.includes(r.ogImageUrl)&&n.unshift(r.ogImageUrl);try{const s=await fetch("/cindy-web/market-data.json");s.ok&&(d=(await s.json())[r.nodeId]||null)}catch{d=null}j(r,n,i)}catch{document.querySelector(".property-loading").innerHTML="<p>載入失敗，請稍後再試</p>"}}let d=null;function B(e){var s;if(!d||!((s=d.deals)!=null&&s.length))return"";const i=parseInt(e.roomCount)||0,r=d.deals.map((l,a)=>`
    <tr class="${i&&l.rooms===i?"market-row-match":""}" data-mpage="${Math.floor(a/5)}">
      <td>${l.date}</td>
      <td>${l.floor}</td>
      <td>${l.layout}</td>
      <td>${l.ping}坪</td>
      <td>${l.totalWan}萬${l.hasPark?'<span class="market-badge">車</span>':""}${l.note?`<span class="market-note">${l.note}</span>`:""}</td>
      <td>${l.unitWan!=null?l.unitWan+"萬":"—"}${l.unitHasPark?'<span class="market-badge">車</span>':""}</td>
    </tr>`).join(""),n=Math.ceil(d.deals.length/5);return`
    <div class="property-market-wrap">
      <div class="property-section-title">${c("TrendingUp",16,2)} ${d.community}近期實價登錄</div>
      <div class="market-table-scroll">
        <table class="market-table">
          <thead><tr><th>成交</th><th>樓層</th><th>格局</th><th>總面積</th><th>總價</th><th>單價/坪</th></tr></thead>
          <tbody id="marketBody">${r}</tbody>
        </table>
      </div>
      ${n>1?`
      <div class="market-pager">
        <button class="market-pager-btn" id="marketPrev">${c("ChevronLeft",14,2)} 上一頁</button>
        <span class="market-pager-info" id="marketPageInfo"></span>
        <button class="market-pager-btn" id="marketNext">下一頁 ${c("ChevronRight",14,2)}</button>
      </div>`:""}
      <div class="market-source">資料來源：內政部實價登錄，已排除親友間等特殊交易。單價比照內政部公式：有申報車位價格及面積者為（總價−車位價）÷（總面積−車位面積），其餘為總價÷總面積；標「車」者含車位${i?"。底色列為同房型成交":""}</div>
    </div>`}function A(){var l,a;const e=document.getElementById("marketBody");if(!e)return;const i=[...e.querySelectorAll("tr")],r=Math.ceil(i.length/5);if(r<=1)return;let n=0;const s=()=>{i.forEach(t=>{t.style.display=t.dataset.mpage==n?"":"none"}),document.getElementById("marketPageInfo").textContent=`${n+1} / ${r}`,document.getElementById("marketPrev").disabled=n===0,document.getElementById("marketNext").disabled=n===r-1};(l=document.getElementById("marketPrev"))==null||l.addEventListener("click",()=>{n>0&&(n--,s())}),(a=document.getElementById("marketNext"))==null||a.addEventListener("click",()=>{n<r-1&&(n++,s())}),s()}function T(e){return e.length===0?`<div class="gallery-placeholder">${c("Home",80,1,"","var(--sage-dark)")}</div>`:`
    <img class="gallery-main-img" id="galleryMain" src="${e[0]}" alt="物件照片">
    <button class="gallery-arrow prev" id="galleryPrev">${c("ChevronLeft",22,2)}</button>
    <button class="gallery-arrow next" id="galleryNext">${c("ChevronRight",22,2)}</button>
    <div class="gallery-thumbs" id="galleryThumbs">
      ${e.map((i,r)=>`
        <img class="gallery-thumb ${r===0?"active":""}"
             src="${i}" alt="縮圖${r+1}"
             data-index="${r}" loading="lazy">
      `).join("")}
    </div>
  `}function U(e){var l,a;if(e.length===0)return;let i=0;const r=document.getElementById("galleryMain"),n=document.querySelectorAll(".gallery-thumb");function s(t){var o;i=(t+e.length)%e.length,r.style.opacity="0",setTimeout(()=>{r.src=e[i],r.style.opacity="1"},150),n.forEach((m,g)=>m.classList.toggle("active",g===i)),(o=n[i])==null||o.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}(l=document.getElementById("galleryPrev"))==null||l.addEventListener("click",()=>s(i-1)),(a=document.getElementById("galleryNext"))==null||a.addEventListener("click",()=>s(i+1)),n.forEach((t,o)=>t.addEventListener("click",()=>s(o))),document.addEventListener("keydown",t=>{t.key==="ArrowLeft"&&s(i-1),t.key==="ArrowRight"&&s(i+1)})}function j(e,i,r=[]){const n=S(e.wixFeatures),s=(e.tags||"").split(",").filter(Boolean),l=r.filter(a=>a.nodeId!==e.nodeId&&a.title&&(a.buildingCategory===e.buildingCategory||a.priceRange===e.priceRange)).slice(0,9).map(a=>({...a,reason:a.buildingCategory===e.buildingCategory&&a.priceRange===e.priceRange?`同為${a.buildingCategory}・${a.priceRange}`:a.buildingCategory===e.buildingCategory?`同為${a.buildingCategory}`:`同價格區間・${a.priceRange}`}));document.querySelector(".property-page").innerHTML=`
    <div class="property-gallery">
      ${T(i)}
    </div>

    <div class="property-body">
      <div class="property-main">
        <h1 class="property-title">${e.title}</h1>
        <div class="property-price-row">
          <div class="property-price">${v(e.price)}</div>
          ${e.priceRange?`<div class="property-price-range">（${e.priceRange}）</div>`:""}
        </div>
        <div class="property-tags">
          ${s.map((a,t)=>`<span class="property-tag clickable-tag tag-color-${t%5}" data-tag="${a}">${a}</span>`).join("")}
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

        ${B(e)}

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
          <ul>${n.map(a=>`<li>${a}</li>`).join("")}</ul>
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
              ${l.map(a=>h(a)).join("")}
            </div>
          </div>
          ${l.length>3?`<button class="similar-nav similar-next" id="similarNext">${c("ChevronRight",26,2)}</button>`:""}
        </div>
        ${l.length>3?`
        <div class="similar-dots" id="similarDots">
          ${Array.from({length:Math.ceil(l.length/3)}).map((a,t)=>`<span class="similar-dot ${t===0?"active":""}" data-index="${t}"></span>`).join("")}
        </div>`:""}
      </div>
    </div>`:""}

  `,q(e,i),U(i),_(e),A(),M(e,r),p()}function p(){const e=document.getElementById("similarGrid"),i=document.getElementById("similarPrev"),r=document.getElementById("similarNext"),n=document.querySelectorAll(".similar-dot");if(!e||!i||!r)return;const s=e.querySelectorAll(".similar-card"),l=s.length,a=window.innerWidth<=768?2:3,t=Math.ceil(l/a);let o=0;function m(g){o=Math.max(0,Math.min(g,t-1));const u=parseInt(getComputedStyle(e).columnGap)||40,b=s[0].offsetWidth,$=a*(b+u);e.style.transform=`translateX(-${o*$}px)`,n.forEach((f,w)=>f.classList.toggle("active",w===o)),i.style.opacity=o===0?"0.3":"1",r.style.opacity=o===t-1?"0.3":"1"}i.addEventListener("click",()=>{o>0&&m(o-1)}),r.addEventListener("click",()=>{o<t-1&&m(o+1)}),n.forEach((g,u)=>g.addEventListener("click",()=>m(u))),m(0)}function q(e,i){const r=location.href,n=e.ogImageUrl||i[0]||"",s=(l,a)=>{let t=document.querySelector(`meta[property="${l}"]`);t||(t=document.createElement("meta"),t.setAttribute("property",l),document.head.appendChild(t)),t.setAttribute("content",a)};s("og:title",`${e.title} | Cindy 王小姐`),s("og:description",`💰 售價與詳情請點擊查閱。格局：${e.layout||"—"}，${e.wixLocation||""}精選房源推薦。`),s("og:image",n),s("og:url",r),s("og:type","website")}function _(e){var s,l,a;const i=`https://cindy94502.github.io/cindy-web/p/${encodeURIComponent(e.nodeId)}.html`,r=[e.layout?`格局：${e.layout}`:"",e.buildingSize?`建坪：${e.buildingSize}坪`:"",e.landSize?`土坪：${e.landSize}坪`:""].filter(Boolean).join(`
`),n=`${e.title}｜NT${e.price?(e.price/1e4).toFixed(0)+"萬":"洽談"}｜Cindy 王小姐`+(r?`
`+r:"");(s=document.getElementById("btnCopyLink"))==null||s.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(n+`
`+i);const t=document.getElementById("btnCopyLink");t.textContent="✓ 已複製！",setTimeout(()=>t.textContent="複製連結",2e3)}catch{alert("請手動複製網址")}}),(l=document.getElementById("btnShareLine"))==null||l.addEventListener("click",()=>{window.open(`https://line.me/R/msg/text/?${encodeURIComponent(n+`
`+i)}`,"_blank")}),(a=document.getElementById("btnShareFb"))==null||a.addEventListener("click",()=>{const t=`fb-messenger://share?link=${encodeURIComponent(i)}`;window.location.href=t,setTimeout(()=>{window.open(`https://www.facebook.com/dialog/send?link=${encodeURIComponent(i)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(i)}`,"_blank")},1500)})}P();
