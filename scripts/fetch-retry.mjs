// 抓 JSON 加重試：GitHub raw 偶爾回 429（請求過於頻繁），重試幾次再放棄
export async function fetchJSON(url, tries = 4) {
  let lastErr
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return await res.json()
    } catch (e) {
      lastErr = e
      const wait = (i + 1) * 20
      console.warn(`抓取失敗（${e.message}），${wait} 秒後重試 ${i + 1}/${tries - 1}：${url}`)
      if (i < tries - 1) await new Promise(r => setTimeout(r, wait * 1000))
    }
  }
  throw lastErr
}
