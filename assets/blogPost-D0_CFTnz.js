import{r as L,a as k,i as $,b as a}from"./shared-Cw5G1Ixq.js";/* empty css             */const E="https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json",S=new URLSearchParams(location.search),C=S.get("id"),T={買房筆記:"cat-teal",南崁生活:"cat-sage","Q&A":"cat-yellow",物件介紹:"cat-peach"};document.getElementById("app").innerHTML=`
  ${L()}
  <div class="post-loading">
    <div class="skeleton-line skeleton-pulse" style="width:60%;height:36px;margin-bottom:16px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:40%;height:14px;margin-bottom:40px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:100%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:95%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:88%;height:14px"></div>
  </div>
  ${k()}
`;$();async function W(){try{const i=await fetch(E);if(!i.ok)throw new Error("fetch failed");const t=(await i.json()).find(o=>o.id===C);if(!t){document.querySelector(".post-loading").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
          <p style="letter-spacing:2px;margin-bottom:24px">找不到這篇文章</p>
          <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
        </div>`;return}const y=T[t.category]||"cat-teal",b=t.date?new Date(t.date).toLocaleDateString("zh-TW",{year:"numeric",month:"long",day:"numeric"}):"";document.title=`${t.title}｜Cindy 王小姐`;const w=t.content?t.content:(t.excerpt||"").split(`
`).filter(o=>o.trim()).map(o=>`<p>${o}</p>`).join("");document.querySelector(".post-loading").outerHTML=`
    <div class="post-page">
      <div class="post-header">
        <div class="post-header-inner">
          <a href="blog.html" class="post-back">${a("ArrowLeft",14,2)} 回到筆記</a>
          <span class="blog-card-cat ${y}" style="position:static;box-shadow:none">${t.category}</span>
          <h1 class="post-title">${t.title}</h1>
          <div class="post-meta">
            ${a("Calendar",14,1.5)} ${b}
            &nbsp;·&nbsp;
            ${a("User",14,1.5)} 王小姐 Cindy
          </div>
        </div>
      </div>

      ${t.cover?`<div class="post-cover"><img src="${t.cover}" alt="${t.title}"></div>`:""}

      <div class="post-body">
        <div class="post-content">
          ${w||'<p style="color:var(--brown-mid)">文章內容準備中…</p>'}
        </div>

        <div class="post-footer-nav">
          <a href="blog.html" class="post-back-btn">
            ${a("ArrowLeft",16,2)} 回到所有筆記
          </a>
        </div>

        <div class="post-contact-card">
          <div class="post-contact-title">有問題想聊聊？</div>
          <div class="post-contact-desc">不管是買房疑問還是想了解南崁行情，歡迎直接找我！</div>
          <div class="post-contact-btns">
            <a href="tel:0963585690" class="post-contact-btn-tel">
              ${a("Phone",15,2)} 0963-585-690
            </a>
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="post-contact-btn-line">
              ${a("MessageCircle",15,2)} LINE 我
            </a>
          </div>
        </div>
      </div>
    </div>`,document.querySelectorAll(".post-content .table-wrap").forEach(o=>{const e=o.querySelector(".table-scroll");if(!e)return;const c=e.querySelector("table");c&&window.innerWidth<=768&&(c.style.minWidth="560px",c.style.width="max-content"),o.style.position="relative";const n=document.createElement("div");n.className="custom-scrollbar-track";const l=document.createElement("div");l.className="custom-scrollbar-thumb",n.appendChild(l),o.insertBefore(n,e.nextSibling);const r=()=>{const s=e.clientWidth/e.scrollWidth;if(s>=1){n.style.display="none";return}n.style.display="block",l.style.width=s*100+"%";const g=e.scrollLeft/e.scrollWidth*100;l.style.left=g+"%"};e.addEventListener("scroll",r),window.addEventListener("resize",r),setTimeout(r,100);let d=!1,p=0,v=0;const h=s=>{d=!0,p=s.touches?s.touches[0].clientX:s.clientX,v=e.scrollLeft,s.preventDefault()},m=s=>{if(!d)return;const f=(s.touches?s.touches[0].clientX:s.clientX)-p,x=e.scrollWidth/n.clientWidth;e.scrollLeft=v+f*x},u=()=>{d=!1};l.addEventListener("mousedown",h),l.addEventListener("touchstart",h,{passive:!1}),window.addEventListener("mousemove",m),window.addEventListener("touchmove",m,{passive:!1}),window.addEventListener("mouseup",u),window.addEventListener("touchend",u)})}catch{document.querySelector(".post-loading").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
        <p style="letter-spacing:2px;margin-bottom:24px">載入失敗，請稍後再試</p>
        <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
      </div>`}}W();
