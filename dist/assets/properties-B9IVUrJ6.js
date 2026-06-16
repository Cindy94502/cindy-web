import{r as h,C as m,L as f,i as a,P as $,a as w,b,G as E,f as C}from"./data-Cg2LJW7J.js";const d=["var(--yellow)","var(--pink)","var(--teal-light)","var(--peach)","var(--sage)","var(--yellow)"],x=`<svg class="filter-deco-svg" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="45" width="50" height="45" fill="#CDD6AE" rx="2"/>
  <path d="M10 50 L45 20 L80 50" fill="#7CBBC3" opacity="0.8"/>
  <rect x="32" y="60" width="14" height="30" fill="#E5B181" rx="1"/>
  <rect x="54" y="60" width="10" height="10" fill="#FBF8F3" rx="1"/>
  <circle cx="90" cy="55" r="12" fill="#CDD6AE" opacity="0.6"/>
  <circle cx="105" cy="60" r="8" fill="#CDD6AE" opacity="0.4"/>
  <rect x="84" y="67" width="4" height="23" fill="#aebf84"/>
  <rect x="98" y="68" width="3" height="22" fill="#aebf84"/>
  <rect x="0" y="90" width="120" height="2" rx="1" fill="#CDD6AE" opacity="0.5"/>
</svg>`;function L(e,i){const l=d[i%d.length],t=e.ogImageUrl||(e.cloudinaryFolder?`https://res.cloudinary.com/ddzync8km/image/upload/${e.cloudinaryFolder}_0.jpg`:""),s=e.buildingCategory==="透天"?"House":"Building2";return`
  <a href="property.html?id=${e.nodeId}" class="prop-card-full" target="_blank"
     data-category="${e.buildingCategory||""}"
     data-room="${e.roomCount||""}"
     data-price="${e.priceRange||""}">
    <div class="prop-card-tape" style="background:${l}"></div>
    <div class="prop-card-img">
      ${t?`<img src="${t}" alt="${e.title}" loading="lazy" onerror="this.style.display='none'">`:`<div class="prop-card-img-icon">${a(s,48,1,"prop-placeholder-icon")}</div>`}
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
        <span class="prop-location">${a("MapPin",13,2,"prop-loc-icon")} ${e.wixLocation||""}</span>
        <span class="prop-link">查看詳情 ${a("ArrowRight",13,2)}</span>
      </div>
    </div>
  </a>`}function k(){return`<div class="prop-skeleton">
    <div class="skeleton-img skeleton-pulse"></div>
    <div class="prop-card-body">
      <div class="skeleton-line skeleton-pulse" style="width:40%;height:20px;margin-bottom:8px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:80%;height:14px;margin-bottom:6px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:60%;height:12px"></div>
    </div>
  </div>`}document.getElementById("app").innerHTML=`
  ${h()}

  <div class="props-page-header">
    <div class="props-page-header-inner">
      <div class="props-page-eyebrow"><span class="nav-logo-dot"></span>精選物件</div>
      <h1 class="props-page-title">買房精選<strong>物件</strong></h1>
      <p class="props-page-sub">蘆竹 · 大園 · 龜山 · 觀音｜住宅 · 透天 · 商辦</p>
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
          ${m.map(e=>`
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
            ${f.map(e=>`<option value="${e}">${e}</option>`).join("")}
          </select>
          <span class="filter-select-arrow">${a("ChevronDown",14,2)}</span>
        </div>
      </div>
      <div class="filter-group">
        <span class="filter-group-label">價格區間</span>
        <div class="filter-select-wrap">
          <select class="filter-select" id="filterPrice">
            <option value="all">選擇價格區間</option>
            ${$.map(e=>`<option value="${e}">${e}</option>`).join("")}
          </select>
          <span class="filter-select-arrow">${a("ChevronDown",14,2)}</span>
        </div>
      </div>
      <div class="filter-deco">${x}</div>
    </div>
  </div>

  <div class="props-page-body">
    <div class="props-count">載入中...</div>
    <div class="props-full-grid" id="propsGrid">
      ${[...Array(6)].map(()=>k()).join("")}
    </div>
  </div>

  <div class="props-cta">
    <div class="props-cta-text">
      <div class="props-cta-title">沒找到喜歡的？</div>
      <div class="props-cta-sub">告訴我你的需求，我來幫你找合適的物件</div>
    </div>
    <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="props-cta-btn">
      ${a("MessageCircle",16,2)} LINE 諮詢
    </a>
  </div>

  ${w()}
`;b();let v=[];async function B(){try{const e=await fetch(E);if(!e.ok)throw new Error("fetch failed");v=await e.json(),I(v)}catch{document.getElementById("propsGrid").innerHTML=`<div class="props-empty show">
        ${a("AlertCircle",36,1.5)}
        <p>載入失敗，請稍後再試</p>
      </div>`,document.querySelector(".props-count").textContent=""}}function I(e){const i=document.getElementById("propsGrid");i.innerHTML=e.length?e.map((t,s)=>L(t,s)).join("")+`<div class="props-empty" id="propsEmpty">
        ${a("Search",40,1.2)}
        <p>這個條件目前沒有物件<br>歡迎直接聯絡我詢問</p>
      </div>`:`<div class="props-empty show">${a("Search",40)}<p>目前沒有物件</p></div>`,document.querySelector(".props-count").innerHTML=`共 <strong id="propCount">${e.length}</strong> 筆物件`,document.querySelectorAll(".prop-card-full").forEach((t,s)=>{t.classList.add("reveal",`reveal-d${s%3+1}`)});const l=new IntersectionObserver(t=>{t.forEach(s=>{s.isIntersecting&&s.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll(".reveal").forEach(t=>l.observe(t)),A()}function A(){function e(){var n;const i=((n=document.querySelector('input[name="category"]:checked'))==null?void 0:n.value)||"all",l=document.getElementById("filterLayout").value,t=document.getElementById("filterPrice").value,s=document.querySelectorAll(".prop-card-full");let r=0;s.forEach(o=>{const g=i==="all"||o.dataset.category===i,u=l==="all"||o.dataset.room===l,y=t==="all"||o.dataset.price===t,p=g&&u&&y;o.classList.toggle("hidden",!p),p&&r++}),document.getElementById("propCount").textContent=r;const c=document.getElementById("propsEmpty");c&&c.classList.toggle("show",r===0)}document.querySelectorAll('input[name="category"]').forEach(i=>i.addEventListener("change",e)),document.getElementById("filterLayout").addEventListener("change",e),document.getElementById("filterPrice").addEventListener("change",e)}B();
