export const GITHUB_JSON_URL = 'https://raw.githubusercontent.com/Cindy94502/cindy-data/refs/heads/main/properties.json'

export const PRICE_RANGES = ['1,000萬以下', '1,000－1,500萬', '1,500－2,000萬', '2,000萬以上', '洽談']
export const LAYOUTS = ['套房', '2房', '3房', '4房以上']
export const CATEGORIES = ['電梯大樓', '透天', '店面']

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
