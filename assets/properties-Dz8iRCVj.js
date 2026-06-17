import{r as $,b as t,a as k,i as b}from"./shared-D41nLD-t.js";import{C as w,L as E,P as L,G as S,f as C}from"./data-DQaSi1fH.js";const q='<img src="images/house_small.png" alt="" class="filter-deco-img" aria-hidden="true">';function I(e,r){const a=e.ogImageUrl||"";return e.buildingCategory,`
  <a href="property.html?id=${e.nodeId}" class="prop-card-full" 
     data-category="${e.buildingCategory||""}"
     data-room="${e.roomCount||""}"
     data-price="${e.priceRange||""}"
     data-search="${(e.title+" "+(e.tags||"")+" "+(e.wixLocation||"")+" "+(e.roomCount||"")+" "+(e.layout||"")).toLowerCase()}">
    <div class="prop-card-img">
      ${a?`<img src="${a}" alt="${e.title}" loading="lazy" onerror="this.parentElement.classList.add('prop-card-img-empty');this.remove()">`:""}
      <div class="prop-card-category">${e.buildingCategory||e.category||"住宅"}</div>
    </div>
    <div class="prop-card-body">
      <div class="prop-price">${C(e.price)}</div>
      <div class="prop-name">${e.title}</div>
      <div class="prop-desc">${(e.tags||"").split(",").filter(Boolean).slice(0,3).join("・")}</div>
      <div class="prop-info">
        <span class="prop-tag">${e.layout||""}</span>
        <span class="prop-tag">${e.buildingCategory||""}</span>
        <span class="prop-tag">${e.wixParking||""}</span>
      </div>
      <div class="prop-card-footer">
        <span class="prop-location">${t("MapPin",13,2,"prop-loc-icon")} ${e.wixLocation||""}</span>
        <span class="prop-link">查看詳情 ${t("ArrowRight",13,2)}</span>
      </div>
    </div>
  </a>`}function B(){return`<div class="prop-skeleton">
    <div class="skeleton-img skeleton-pulse"></div>
    <div class="prop-card-body">
      <div class="skeleton-line skeleton-pulse" style="width:40%;height:20px;margin-bottom:8px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:80%;height:14px;margin-bottom:6px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:60%;height:12px"></div>
    </div>
  </div>`}document.getElementById("app").innerHTML=`
  ${$()}

  <div class="props-page-header">
    <div class="props-page-header-inner">
      <div class="props-page-header-left">
        <div class="props-page-eyebrow"><span class="nav-logo-dot"></span>精選物件</div>
        <h1 class="props-page-title">買房精選物件</h1>
      </div>
      <div class="props-page-header-right">
        <div class="filter-search-wrap">
          <span class="filter-search-icon">${t("Search",14,2)}</span>
          <input type="text" id="filterSearch" class="filter-search-input" placeholder="搜尋地區、特色、關鍵字…">
        </div>
        <div class="filter-quick-tags">
          <button class="quick-tag" data-keyword="台茂">${t("ShoppingBag",11,2)} 近台茂</button>
          <button class="quick-tag" data-keyword="好市多">${t("ShoppingBag",11,2)} 近好市多</button>
          <button class="quick-tag" data-keyword="A10">${t("MapPin",11,2)} 機捷A10</button>
          <button class="quick-tag" data-keyword="航空城">${t("MapPin",11,2)} 航空城</button>
          <button class="quick-tag" data-keyword="河濱公園">${t("MapPin",11,2)} 河濱公園</button>
          <button class="quick-tag" data-keyword="新成屋">${t("Star",11,2)} 新成屋</button>
          <button class="quick-tag" data-keyword="投資收租">${t("Banknote",11,2)} 投資收租</button>
          <button class="quick-tag" data-keyword="透天">${t("House",11,2)} 透天</button>
        </div>
      </div>
    </div>
  </div>

  <div class="props-filter-section">
    <div class="props-filter-inner">
      <div class="filter-group">
        <span class="filter-group-label">物件類型</span>
        <div class="filter-radio-row">
          <label class="filter-radio-item">
            <input type="radio" name="category" value="all" checked>
            <span class="filter-radio-dot"></span>
            <span class="filter-radio-text">所有</span>
          </label>
          ${w.map(e=>`
          <label class="filter-radio-item">
            <input type="radio" name="category" value="${e}">
            <span class="filter-radio-dot"></span>
            <span class="filter-radio-text">${e}</span>
          </label>`).join("")}
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-group-label">格局</span>
        <div class="filter-select-wrap">
          <select class="filter-select" id="filterLayout">
            <option value="all">選擇格局</option>
            ${E.map(e=>`<option value="${e}">${e}</option>`).join("")}
          </select>
          <span class="filter-select-arrow">${t("ChevronDown",14,2)}</span>
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-group-label">價格區間</span>
        <div class="filter-select-wrap">
          <select class="filter-select" id="filterPrice">
            <option value="all">選擇價格區間</option>
            ${L.map(e=>`<option value="${e}">${e}</option>`).join("")}
          </select>
          <span class="filter-select-arrow">${t("ChevronDown",14,2)}</span>
        </div>
      </div>
      <div class="filter-deco">${q}</div>
    </div>
  </div>

  <div class="props-page-body">
    <div class="props-count">載入中...</div>
    <div class="props-full-grid" id="propsGrid">
      ${[...Array(6)].map(()=>B()).join("")}
    </div>
  </div>

  ${k()}
`;b();let v=[];async function x(){try{const e=await fetch(S);if(!e.ok)throw new Error("fetch failed");v=await e.json(),P(v)}catch{document.getElementById("propsGrid").innerHTML=`<div class="props-empty show">
        ${t("AlertCircle",36,1.5)}
        <p>載入失敗，請稍後再試</p>
      </div>`,document.querySelector(".props-count").textContent=""}}function P(e){const r=document.getElementById("propsGrid");r.innerHTML=e.length?e.map((s,o)=>I(s)).join("")+`<div class="props-empty" id="propsEmpty">
        ${t("Search",40,1.2)}
        <p>這個條件目前沒有物件<br>歡迎直接聯絡我詢問</p>
      </div>`:`<div class="props-empty show">${t("Search",40)}<p>目前沒有物件</p></div>`,document.querySelector(".props-count").innerHTML=`共 <strong id="propCount">${e.length}</strong> 筆物件`;const a=document.getElementById("heroStatNum");a&&(a.textContent=e.length),document.querySelectorAll(".prop-card-full").forEach((s,o)=>{s.classList.add("reveal",`reveal-d${o%3+1}`)});const i=new IntersectionObserver(s=>{s.forEach(o=>{o.isIntersecting&&o.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll(".reveal").forEach(s=>i.observe(s)),A()}function A(){var r;function e(){var d,p;const a=((d=document.querySelector('input[name="category"]:checked'))==null?void 0:d.value)||"all",i=document.getElementById("filterLayout").value,s=document.getElementById("filterPrice").value,o=(((p=document.getElementById("filterSearch"))==null?void 0:p.value)||"").toLowerCase().trim(),g=document.querySelectorAll(".prop-card-full");let n=0;g.forEach(l=>{const m=a==="all"||l.dataset.category===a,h=i==="all"||l.dataset.room===i,y=s==="all"||l.dataset.price===s,f=!o||(l.dataset.search||"").includes(o),u=m&&h&&y&&f;l.classList.toggle("hidden",!u),u&&n++}),document.getElementById("propCount").textContent=n;const c=document.getElementById("propsEmpty");c&&c.classList.toggle("show",n===0)}document.querySelectorAll('input[name="category"]').forEach(a=>a.addEventListener("change",e)),document.getElementById("filterLayout").addEventListener("change",e),document.getElementById("filterPrice").addEventListener("change",e),(r=document.getElementById("filterSearch"))==null||r.addEventListener("input",e),document.querySelectorAll(".quick-tag").forEach(a=>{a.addEventListener("click",()=>{const i=document.getElementById("filterSearch"),s=a.dataset.keyword;i.value===s?(i.value="",a.classList.remove("active")):(i.value=s,document.querySelectorAll(".quick-tag").forEach(o=>o.classList.remove("active")),a.classList.add("active")),e()})})}x();
