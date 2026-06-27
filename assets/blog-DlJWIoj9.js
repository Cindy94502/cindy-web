import{r as d,a as g,i as v,b as c}from"./shared-JHmo5_zB.js";/* empty css             */const b="https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json",h=["全部","買房筆記","南崁生活","Q&A","物件介紹"],p={買房筆記:"cat-teal",南崁生活:"cat-sage","Q&A":"cat-yellow",物件介紹:"cat-peach"};function m(e){const l=p[e.category]||"cat-teal",o=e.date?new Date(e.date).toLocaleDateString("zh-TW",{year:"numeric",month:"long",day:"numeric"}):"";return`
  <a href="blog-post.html?id=${e.id}" class="blog-card reveal">
    <div class="blog-card-header ${l}">
      ${e.cover?`<img src="${e.cover}" alt="${e.title}" class="blog-card-cover">`:`<div class="blog-card-cover-placeholder">${c("BookOpen",36,1)}</div>`}
      <span class="blog-card-cat">${e.category}</span>
    </div>
    <div class="blog-card-body">
      <div class="blog-card-date">${c("Calendar",12,1.5)} ${o}</div>
      <h2 class="blog-card-title">${e.title}</h2>
      <p class="blog-card-excerpt">${e.excerpt}</p>
      <span class="blog-card-more">閱讀更多 ${c("ArrowRight",13,2)}</span>
    </div>
  </a>`}function u(){return`<div class="blog-skeleton">
    <div class="skeleton-img skeleton-pulse"></div>
    <div style="padding:20px;display:flex;flex-direction:column;gap:10px">
      <div class="skeleton-line skeleton-pulse" style="width:30%;height:12px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:80%;height:18px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:100%;height:12px"></div>
    </div>
  </div>`}document.getElementById("app").innerHTML=`
  ${d()}
  <div class="blog-header">
    <div class="blog-header-inner">
      <div class="blog-eyebrow"><span class="nav-logo-dot"></span>學習筆記</div>
      <h1 class="blog-title">房產<strong>筆記</strong></h1>
      <p class="blog-subtitle">我在學的，你也可以一起學 ✍️</p>
    </div>
  </div>
  <div class="blog-filter-bar">
    <div class="blog-filter-inner">
      ${h.map(e=>`<button class="blog-cat-btn ${e==="全部"?"active":""}" data-cat="${e}">${e}</button>`).join("")}
    </div>
  </div>
  <div class="blog-body">
    <div class="blog-grid" id="blogGrid">
      ${[...Array(6)].map(()=>u()).join("")}
    </div>
  </div>
  ${g()}
`;v();async function y(){try{const e=await fetch(b);if(!e.ok)throw new Error("fetch failed");const l=await e.json(),o=document.getElementById("blogGrid");if(!l.length){o.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--brown-mid);letter-spacing:2px">記筆中，敬請期待…</div>';return}o.innerHTML=l.map(t=>m(t)).join(""),document.querySelectorAll(".blog-cat-btn").forEach(t=>{t.addEventListener("click",()=>{document.querySelectorAll(".blog-cat-btn").forEach(s=>s.classList.remove("active")),t.classList.add("active");const a=t.dataset.cat;document.querySelectorAll(".blog-card").forEach(s=>{var i;const r=a==="全部"||((i=s.querySelector(".blog-card-cat"))==null?void 0:i.textContent)===a;s.style.display=r?"":"none"})})});const n=new IntersectionObserver(t=>{t.forEach(a=>{a.isIntersecting&&a.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll(".reveal").forEach(t=>n.observe(t))}catch{document.getElementById("blogGrid").innerHTML='<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--brown-mid)">載入失敗，請稍後再試</div>'}}y();
