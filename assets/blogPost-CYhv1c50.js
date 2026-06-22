import{r as C,a as M,i as X,b as c}from"./shared-C_8b4sww.js";/* empty css             */const W="https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json",q=new URLSearchParams(location.search),A=q.get("id"),H={買房筆記:"cat-teal",南崁生活:"cat-sage","Q&A":"cat-yellow",物件介紹:"cat-peach"};document.getElementById("app").innerHTML=`
  ${C()}
  <div class="post-loading">
    <div class="skeleton-line skeleton-pulse" style="width:60%;height:36px;margin-bottom:16px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:40%;height:14px;margin-bottom:40px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:100%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:95%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:88%;height:14px"></div>
  </div>
  ${M()}
`;X();async function D(){try{const d=await fetch(W);if(!d.ok)throw new Error("fetch failed");const e=(await d.json()).find(s=>s.id===A);if(!e){document.querySelector(".post-loading").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
          <p style="letter-spacing:2px;margin-bottom:24px">找不到這篇文章</p>
          <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
        </div>`;return}const $=H[e.category]||"cat-teal",E=e.date?new Date(e.date).toLocaleDateString("zh-TW",{year:"numeric",month:"long",day:"numeric"}):"";document.title=`${e.title}｜Cindy 王小姐`;const T=e.content?e.content:(e.excerpt||"").split(`
`).filter(s=>s.trim()).map(s=>`<p>${s}</p>`).join("");document.querySelector(".post-loading").outerHTML=`
    <div class="post-page">
      <div class="post-header">
        <div class="post-header-inner">
          <a href="blog.html" class="post-back">${c("ArrowLeft",14,2)} 回到筆記</a>
          <span class="blog-card-cat ${$}" style="position:static;box-shadow:none">${e.category}</span>
          <h1 class="post-title">${e.title}</h1>
          <div class="post-meta">
            ${c("Calendar",14,1.5)} ${E}
            &nbsp;·&nbsp;
            ${c("User",14,1.5)} 王小姐 Cindy
          </div>
        </div>
      </div>

      ${e.cover?`<div class="post-cover"><img src="${e.cover}" alt="${e.title}"></div>`:""}

      <div class="post-body">
        <div class="post-content">
          ${T||'<p style="color:var(--brown-mid)">文章內容準備中…</p>'}
        </div>

        <div class="post-footer-nav">
          <a href="blog.html" class="post-back-btn">
            ${c("ArrowLeft",16,2)} 回到所有筆記
          </a>
        </div>

        <div class="post-contact-card">
          <div class="post-contact-title">有問題想聊聊？</div>
          <div class="post-contact-desc">不管是買房疑問還是想了解南崁行情，歡迎直接找我！</div>
          <div class="post-contact-btns">
            <a href="tel:0963585690" class="post-contact-btn-tel">
              ${c("Phone",15,2)} 0963-585-690
            </a>
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="post-contact-btn-line">
              ${c("MessageCircle",15,2)} LINE 我
            </a>
          </div>
        </div>
      </div>
    </div>`,document.querySelectorAll(".post-content .table-wrap").forEach(s=>{const o=s.querySelector(".table-scroll");if(!o)return;const n=o.querySelector("table");if(!n||window.innerWidth>768)return;o.style.overflow="hidden",o.style.position="relative",n.style.minWidth="560px",n.style.width="max-content",n.style.willChange="transform",n.style.transition="none",s.style.position="relative";const l=document.createElement("div");l.className="custom-scrollbar-track";const i=document.createElement("div");i.className="custom-scrollbar-thumb",l.appendChild(i),s.appendChild(l);let r=0;const p=()=>Math.max(0,n.offsetWidth-o.clientWidth),h=()=>{const t=p();if(t<=0){l.style.display="none";return}l.style.display="block";const a=o.clientWidth/n.offsetWidth;i.style.width=a*100+"%";const u=r/t*(100-a*100);i.style.left=u+"%"},y=t=>{const a=p();r=Math.max(0,Math.min(a,t)),n.style.transform="translateX(-"+r+"px)",h()};let f=0,g=0,v=!1;o.addEventListener("touchstart",t=>{f=t.touches[0].clientX,g=r,v=!0},{passive:!0}),o.addEventListener("touchmove",t=>{if(!v)return;const a=t.touches[0].clientX-f;Math.abs(a)>8&&(t.preventDefault(),y(g-a))},{passive:!1}),o.addEventListener("touchend",()=>{v=!1});let m=!1,b=0,w=0;const x=t=>{m=!0,b=t.touches?t.touches[0].clientX:t.clientX,w=r,t.preventDefault()},L=t=>{if(!m)return;const u=(t.touches?t.touches[0].clientX:t.clientX)-b,S=p()/(l.clientWidth-i.offsetWidth);y(w+u*S)},k=()=>{m=!1};i.addEventListener("mousedown",x),i.addEventListener("touchstart",x,{passive:!1}),window.addEventListener("mousemove",L),window.addEventListener("touchmove",L,{passive:!1}),window.addEventListener("mouseup",k),window.addEventListener("touchend",k),setTimeout(h,100),window.addEventListener("resize",h)})}catch{document.querySelector(".post-loading").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
        <p style="letter-spacing:2px;margin-bottom:24px">載入失敗，請稍後再試</p>
        <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
      </div>`}}D();
