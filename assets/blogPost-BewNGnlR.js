import{r as a,a as n,i as c,b as e}from"./shared-CNN5y-eg.js";/* empty css             */const p="https://raw.githubusercontent.com/Cindy94502/cindy-data/main/posts.json",b=new URLSearchParams(location.search),v=b.get("id"),g={買房筆記:"cat-teal",南崁生活:"cat-sage","Q&A":"cat-yellow",物件介紹:"cat-peach"};document.getElementById("app").innerHTML=`
  ${a()}
  <div class="post-loading">
    <div class="skeleton-line skeleton-pulse" style="width:60%;height:36px;margin-bottom:16px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:40%;height:14px;margin-bottom:40px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:100%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:95%;height:14px;margin-bottom:10px"></div>
    <div class="skeleton-line skeleton-pulse" style="width:88%;height:14px"></div>
  </div>
  ${n()}
`;c();async function m(){try{const d=await fetch(p);if(!d.ok)throw new Error("fetch failed");const t=(await d.json()).find(o=>o.id===v);if(!t){document.querySelector(".post-loading").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
          <p style="letter-spacing:2px;margin-bottom:24px">找不到這篇文章</p>
          <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
        </div>`;return}const s=g[t.category]||"cat-teal",l=t.date?new Date(t.date).toLocaleDateString("zh-TW",{year:"numeric",month:"long",day:"numeric"}):"";document.title=`${t.title}｜Cindy 王小姐`;const i=t.content?t.content:(t.excerpt||"").split(`
`).filter(o=>o.trim()).map(o=>`<p>${o}</p>`).join("");document.querySelector(".post-loading").outerHTML=`
    <div class="post-page">
      <div class="post-header">
        <div class="post-header-inner">
          <a href="blog.html" class="post-back">${e("ArrowLeft",14,2)} 回到筆記</a>
          <span class="blog-card-cat ${s}" style="position:static;box-shadow:none">${t.category}</span>
          <h1 class="post-title">${t.title}</h1>
          <div class="post-meta">
            ${e("Calendar",14,1.5)} ${l}
            &nbsp;·&nbsp;
            ${e("User",14,1.5)} 王小姐 Cindy
          </div>
        </div>
      </div>

      ${t.cover?`<div class="post-cover"><img src="${t.cover}" alt="${t.title}"></div>`:""}

      <div class="post-body">
        <div class="post-content">
          ${i||'<p style="color:var(--brown-mid)">文章內容準備中…</p>'}
        </div>

        <div class="post-footer-nav">
          <a href="blog.html" class="post-back-btn">
            ${e("ArrowLeft",16,2)} 回到所有筆記
          </a>
        </div>

        <div class="post-contact-card">
          <div class="post-contact-title">有問題想聊聊？</div>
          <div class="post-contact-desc">不管是買房疑問還是想了解南崁行情，歡迎直接找我！</div>
          <div class="post-contact-btns">
            <a href="tel:0963585690" class="post-contact-btn-tel">
              ${e("Phone",15,2)} 0963-585-690
            </a>
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="post-contact-btn-line">
              ${e("MessageCircle",15,2)} LINE 我
            </a>
          </div>
        </div>
      </div>
    </div>`;const r=document.querySelector(".post-content table");r&&r.innerHTML===""&&(r.innerHTML=`
        <thead>
          <tr style="background-color: #f8f9fa; border-bottom: 2px solid #dee2e6;">
            <th style="padding: 12px; text-align: left; font-weight: bold; border: 1px solid #dee2e6; color: var(--brown);">售屋原因</th>
            <th style="padding: 12px; text-align: left; font-weight: bold; border: 1px solid #dee2e6; color: var(--brown);">急迫程度</th>
            <th style="padding: 12px; text-align: left; font-weight: bold; border: 1px solid #dee2e6; color: var(--brown);">議價方向</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #dee2e6;">
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">換屋</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">高</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">強調能快速成交、配合交屋時程</td>
          </tr>
          <tr style="border-bottom: 1px solid #dee2e6; background-color: #fdfdfd;">
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">投資／資產配置</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">低</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">貼近行情，別一次壓太多</td>
          </tr>
          <tr style="border-bottom: 1px solid #dee2e6;">
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">繼承／需要資金</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">中高</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">注意多人繼承要確認全數同意</td>
          </tr>
          <tr style="border-bottom: 1px solid #dee2e6; background-color: #fdfdfd;">
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">隨便賣看看</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">無</td>
            <td style="padding: 12px; border: 1px solid #dee2e6; color: var(--brown-mid);">先觀察，不用急著出價</td>
          </tr>
        </tbody>
      `)}catch{document.querySelector(".post-loading").innerHTML=`<div style="text-align:center;padding:80px 0;color:var(--brown-mid)">
        <p style="letter-spacing:2px;margin-bottom:24px">載入失敗，請稍後再試</p>
        <a href="blog.html" style="color:var(--teal-dark);letter-spacing:2px">← 回到筆記列表</a>
      </div>`}}m();
