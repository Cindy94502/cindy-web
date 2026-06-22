import{r as L,a as k,i as E,b as i}from"./shared-Bsshd9PA.js";/* empty css             */const $="https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json",C=new URLSearchParams(location.search),S=C.get("id"),W={買房筆記:"cat-teal",南崁生活:"cat-sage","Q&A":"cat-yellow",物件介紹:"cat-peach"};document.getElementById("app").innerHTML=`
  ${L()}
  <div id="post-container">
    <div class="post-loading">
      <div class="skeleton-line skeleton-pulse" style="width:60%;height:36px;margin-bottom:16px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:40%;height:14px;margin-bottom:40px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:100%;height:14px;margin-bottom:10px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:95%;height:14px;margin-bottom:10px"></div>
      <div class="skeleton-line skeleton-pulse" style="width:88%;height:14px"></div>
    </div>
  </div>
  ${k()}
`;E();async function T(){try{const l=await fetch($);if(!l.ok)throw new Error("fetch failed");const e=(await l.json()).find(o=>o.id===S);if(!e){document.getElementById("post-container").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
          <p style="letter-spacing:2px;margin-bottom:24px">找不到這篇文章</p>
          <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
        </div>`;return}const f=W[e.category]||"cat-teal",b=e.date?new Date(e.date).toLocaleDateString("zh-TW",{year:"numeric",month:"long",day:"numeric"}):"";document.title=`${e.title}｜Cindy 王小姐`;const w=e.content?e.content:(e.excerpt||"").split(`
`).filter(o=>o.trim()).map(o=>`<p>${o}</p>`).join("");document.getElementById("post-container").innerHTML=`
    <div class="post-page">
      <div class="post-header">
        <div class="post-header-inner">
          <a href="blog.html" class="post-back">${i("ArrowLeft",14,2)} 回到筆記</a>
          <span class="blog-card-cat ${f}" style="position:static;box-shadow:none">${e.category}</span>
          <h1 class="post-title">${e.title}</h1>
          <div class="post-meta">
            ${i("Calendar",14,1.5)} ${b}
            &nbsp;·&nbsp;
            ${i("User",14,1.5)} 王小姐 Cindy
          </div>
        </div>
      </div>

      ${e.cover?`<div class="post-cover"><img src="${e.cover}" alt="${e.title}"></div>`:""}

      <div class="post-body">
        <div class="post-content">
          ${w||'<p style="color:var(--brown-mid)">文章內容準備中…</p>'}
        </div>

        <div class="post-footer-nav">
          <a href="blog.html" class="post-back-btn">
            ${i("ArrowLeft",16,2)} 回到所有筆記
          </a>
        </div>

        <div class="post-contact-card">
          <div class="post-contact-title">有問題想聊聊？</div>
          <div class="post-contact-desc">不管是買房疑問還是想了解南崁行情，歡迎直接找我！</div>
          <div class="post-contact-btns">
            <a href="tel:0963585690" class="post-contact-btn-tel">
              ${i("Phone",15,2)} 0963-585-690
            </a>
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="post-contact-btn-line">
              ${i("MessageCircle",15,2)} LINE 我
            </a>
          </div>
        </div>
      </div>
    </div>`,setTimeout(()=>{document.querySelectorAll(".post-content .table-wrap").forEach(o=>{const s=o.querySelector(".table-scroll");if(!s||window.innerWidth>768)return;o.style.position="relative",o.querySelectorAll(".custom-scrollbar-track").forEach(t=>t.remove());const a=document.createElement("div");a.className="custom-scrollbar-track";const n=document.createElement("div");n.className="custom-scrollbar-thumb",a.appendChild(n),o.appendChild(a);const c=()=>{const t=s.clientWidth/s.scrollWidth;if(t>=1){a.style.display="none";return}a.style.display="block",n.style.width=t*100+"%";const d=s.scrollWidth-s.clientWidth,p=d>0?s.scrollLeft/d*(100-t*100):0;n.style.left=p+"%"};s.addEventListener("scroll",c),window.addEventListener("resize",c),c();let r=!1,v=0,m=0;const h=t=>{r=!0,v=t.touches?t.touches[0].clientX:t.clientX,m=s.scrollLeft,t.preventDefault()},u=t=>{if(!r)return;const p=(t.touches?t.touches[0].clientX:t.clientX)-v,x=s.scrollWidth-s.clientWidth,y=a.clientWidth-n.offsetWidth;y>0&&(s.scrollLeft=m+p/y*x)},g=()=>{r=!1};n.addEventListener("mousedown",h),n.addEventListener("touchstart",h,{passive:!1}),window.addEventListener("mousemove",u),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("mouseup",g),window.addEventListener("touchend",g)})},150)}catch{document.getElementById("post-container").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
        <p style="letter-spacing:2px;margin-bottom:24px">載入失敗，請稍後再試</p>
        <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
      </div>`}}T();
