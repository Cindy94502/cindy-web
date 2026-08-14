export const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/refs/heads/main/properties.json'

export const PRICE_RANGES = ['1,000萬以下', '1,000－1,500萬', '1,500－2,000萬', '2,000萬以上', '洽談']
export const LAYOUTS = ['套房', '2房', '3房', '4房以上']
// 2026-08-13 新增「公寓」：鎮三街那間是 46 年的 5 樓無電梯公寓，
// 歸到「電梯大樓」是錯的，客戶點進來會覺得被騙。
// 這裡不加的話，物件頁的類別篩選按鈕就沒有這一項，那間會篩不到。
export const CATEGORIES = ['電梯大樓', '公寓', '透天', '店面']

// 格式化價格
export function formatPrice(price) {
  if (!price || price === 0) return 'NT$ 洽談'
  return `NT$ ${(price / 10000).toFixed(0)} 萬`
}

// 從 Cloudinary folder 組出圖片 URL
export function getCloudinaryUrl(folder) {
  if (!folder) return ''
  return `https://res.cloudinary.com/ddzync8km/image/upload/${folder}_0.jpg`
}

// 幫 Cloudinary 圖片加上尺寸與壓縮參數。
// 資料庫存的是原圖網址（平均 418 KB，最大到 1.1 MB），直接用會很重；
// 實測同一張 819 KB → 49 KB，卡片只有 300 多 px 寬，肉眼看不出差別。
// 已經有參數的網址不重複加；非 Cloudinary 的網址原樣回傳。
export function cdn(url, width = 600) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url || ''
  if (/\/upload\/[a-z]_[^/]*\//.test(url)) return url
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`)
}
