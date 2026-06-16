import{r as y,a as g,b as u,G as m,f as o,i}from"./data-Cg2LJW7J.js";const $=new URLSearchParams(location.search),h=$.get("id");document.getElementById("app").innerHTML=`
  ${y()}
  <div class="property-page">
    <div class="property-loading">載入中...</div>
  </div>
  ${g()}
`;u();async function f(e){if(!e)return[];try{const a=await(await fetch(`https://res.cloudinary.com/ddzync8km/image/list/${e}.json`)).json();return!a.resources||a.resources.length===0?[]:a.resources.sort((r,s)=>(r.display_name||r.public_id).localeCompare(s.display_name||s.public_id,void 0,{numeric:!0})).map(r=>`https://res.cloudinary.com/ddzync8km/image/upload/${r.public_id}.${r.format||"jpg"}`)}catch{return[]}}function b(e){return e?(e.match(/<li>(.*?)<\/li>/g)||[]).map(t=>t.replace(/<\/?li>/g,"").trim()):[]}async function w(){try{const a=(await(await fetch(m)).json()).find(s=>s.nodeId===h);if(!a){document.querySelector(".property-loading").innerHTML='<p>找不到這個物件，<a href="properties.html" style="color:var(--teal-dark)">回到物件列表</a></p>';return}document.title=`${a.title} | Cindy 王瑋薰`;const r=await f(a.cloudinaryFolder);a.ogImageUrl&&!r.includes(a.ogImageUrl)&&r.unshift(a.ogImageUrl),x(a,r)}catch{document.querySelector(".property-loading").innerHTML="<p>載入失敗，請稍後再試</p>"}}function L(e){return e.length===0?`<div class="gallery-placeholder">${i("Home",80,1,"","var(--sage-dark)")}</div>`:`
    <img class="gallery-main-img" id="galleryMain" src="${e[0]}" alt="物件照片">
    <button class="gallery-arrow prev" id="galleryPrev">${i("ChevronLeft",22,2)}</button>
    <button class="gallery-arrow next" id="galleryNext">${i("ChevronRight",22,2)}</button>
    <div class="gallery-thumbs" id="galleryThumbs">
      ${e.map((t,a)=>`
        <img class="gallery-thumb ${a===0?"active":""}"
             src="${t}" alt="縮圖${a+1}"
             data-index="${a}" loading="lazy">
      `).join("")}
    </div>
  `}function k(e){var c,d;if(e.length===0)return;let t=0;const a=document.getElementById("galleryMain"),r=document.querySelectorAll(".gallery-thumb");function s(l){var n;t=(l+e.length)%e.length,a.style.opacity="0",setTimeout(()=>{a.src=e[t],a.style.opacity="1"},150),r.forEach((p,v)=>p.classList.toggle("active",v===t)),(n=r[t])==null||n.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"})}(c=document.getElementById("galleryPrev"))==null||c.addEventListener("click",()=>s(t-1)),(d=document.getElementById("galleryNext"))==null||d.addEventListener("click",()=>s(t+1)),r.forEach((l,n)=>l.addEventListener("click",()=>s(n))),document.addEventListener("keydown",l=>{l.key==="ArrowLeft"&&s(t-1),l.key==="ArrowRight"&&s(t+1)})}function x(e,t){const a=b(e.wixFeatures),r=(e.tags||"").split(",").filter(Boolean);document.querySelector(".property-page").innerHTML=`
    <div class="property-gallery">
      ${L(t)}
    </div>

    <div class="property-body">
      <div class="property-main">
        <h1 class="property-title">${e.title}</h1>
        <div class="property-price-row">
          <div class="property-price">${o(e.price)}</div>
          ${e.priceRange?`<div class="property-price-range">（${e.priceRange}）</div>`:""}
        </div>
        <div class="property-tags">
          ${r.map(s=>`<span class="property-tag">${s}</span>`).join("")}
          ${e.wixLocation?`<span class="property-tag">${i("MapPin",12,2)} ${e.wixLocation}</span>`:""}
          ${e.wixParking?`<span class="property-tag">${e.wixParking}</span>`:""}
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

        ${a.length>0?`
        <div class="property-features">
          <div class="property-section-title">${i("Star",16,2)} 物件特色</div>
          <ul>${a.map(s=>`<li>${s}</li>`).join("")}</ul>
        </div>`:""}

        ${e.webDescription?`
        <div class="property-section-title">${i("FileText",16,2)} 物件說明</div>
        <div class="property-desc">${e.webDescription.replace(/<[^>]*>/g,"").replace(/\\n/g,"<br>")}</div>
        `:""}

        <a href="properties.html" style="font-size:13px;color:var(--teal-dark);letter-spacing:2px;display:inline-flex;align-items:center;gap:6px;margin-top:8px">
          ${i("ArrowLeft",14,2)} 回到物件列表
        </a>
      </div>

      <div class="property-sidebar">
        <div class="contact-card-sticky">
          <div class="sidebar-agent">
            <div class="sidebar-agent-avatar">${i("User",28,1.5)}</div>
            <div>
              <div class="sidebar-agent-name">王瑋薰 Cindy</div>
              <div class="sidebar-agent-title">中信房屋南崁一極</div>
            </div>
          </div>
          <div class="sidebar-price">${o(e.price)}</div>
          <div class="sidebar-btns">
            <a href="https://line.me/ti/p/@019nrmqw" target="_blank" class="sidebar-btn-line">
              ${i("MessageCircle",16,2)} LINE 我詢問
            </a>
            <a href="tel:0963585690" class="sidebar-btn-tel">
              ${i("Phone",16,2)} 0963-585-690
            </a>
          </div>
          <div class="sidebar-note">不管是問行情還是想看房<br>隨時都可以找我</div>
        </div>
      </div>
    </div>
  `,k(t)}w();
