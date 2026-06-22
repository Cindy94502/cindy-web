import{r as x,a as L,i as k,b as a}from"./shared-Cw5G1Ixq.js";/* empty css             */const $="https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json",E=new URLSearchParams(location.search),S=E.get("id"),C={買房筆記:"cat-teal",南崁生活:"cat-sage","Q&A":"cat-yellow",物件介紹:"cat-peach"};document.getElementById("app").innerHTML=`
  ${x()}
  <div class="post-loading">
    <div class="skeleton-line skeleton-pulse" style="width:60%;height:36px;margin-bottom:16px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:40%;height:14px;margin-bottom:40px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:100%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:95%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:88%;height:14px"></div>
  </div>
  ${L()}
`;k();async function T(){try{const i=await fetch($);if(!i.ok)throw new Error("fetch failed");const t=(await i.json()).find(o=>o.id===S);if(!t){document.querySelector(".post-loading").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
          <p style="letter-spacing:2px;margin-bottom:24px">找不到這篇文章</p>
          <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
        </div>`;return}const g=C[t.category]||"cat-teal",y=t.date?new Date(t.date).toLocaleDateString("zh-TW",{year:"numeric",month:"long",day:"numeric"}):"";document.title=`${t.title}｜Cindy 王小姐`;const b=t.content?t.content:(t.excerpt||"").split(`
`).filter(o=>o.trim()).map(o=>`<p>${o}</p>`).join("");document.querySelector(".post-loading").outerHTML=`
    <div class="post-page">
      <div class="post-header">
        <div class="post-header-inner">
          <a href="blog.html" class="post-back">${a("ArrowLeft",14,2)} 回到筆記</a>
          <span class="blog-card-cat ${g}" style="position:static;box-shadow:none">${t.category}</span>
          <h1 class="post-title">${t.title}</h1>
          <div class="post-meta">
            ${a("Calendar",14,1.5)} ${y}
            &nbsp;·&nbsp;
            ${a("User",14,1.5)} 王小姐 Cindy
          </div>
        </div>
      </div>

      ${t.cover?`<div class="post-cover"><img src="${t.cover}" alt="${t.title}"></div>`:""}

      <div class="post-body">
        <div class="post-content">
          ${b||'<p style="color:var(--brown-mid)">文章內容準備中…</p>'}
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
    </div>`,document.querySelectorAll(".post-content .table-wrap").forEach(o=>{const s=o.querySelector(".table-scroll");if(!s)return;o.style.position="relative";const n=document.createElement("div");n.className="custom-scrollbar-track";const l=document.createElement("div");l.className="custom-scrollbar-thumb",n.appendChild(l),o.insertBefore(n,s.nextSibling);const c=()=>{const e=s.clientWidth/s.scrollWidth;if(e>=1){n.style.display="none";return}n.style.display="block",l.style.width=e*100+"%";const u=s.scrollLeft/s.scrollWidth*100;l.style.left=u+"%"};s.addEventListener("scroll",c),window.addEventListener("resize",c),setTimeout(c,100);let r=!1,d=0,p=0;const v=e=>{r=!0,d=e.touches?e.touches[0].clientX:e.clientX,p=s.scrollLeft,e.preventDefault()},m=e=>{if(!r)return;const f=(e.touches?e.touches[0].clientX:e.clientX)-d,w=s.scrollWidth/n.clientWidth;s.scrollLeft=p+f*w},h=()=>{r=!1};l.addEventListener("mousedown",v),l.addEventListener("touchstart",v,{passive:!1}),window.addEventListener("mousemove",m),window.addEventListener("touchmove",m,{passive:!1}),window.addEventListener("mouseup",h),window.addEventListener("touchend",h)})}catch{document.querySelector(".post-loading").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
        <p style="letter-spacing:2px;margin-bottom:24px">載入失敗，請稍後再試</p>
        <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
      </div>`}}T();
