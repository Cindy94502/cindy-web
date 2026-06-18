import { defineConfig } from 'vite'
import { resolve } from 'path'

// 自動為所有 HTML 注入 favicon（enforce: post 確保在 Vite 處理後才注入）
function injectFavicon() {
  return {
    name: 'inject-favicon',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html) {
      // 先移除任何現有的 favicon link，再統一注入正確的
      const cleaned = html.replace(/<link[^>]*rel=["']icon["'][^>]*>/gi, '')
      return cleaned.replace(
        /<\/head>/,
        `  <link rel="icon" type="image/png" href="/cindy-web/images/my-logo.png">\n  </head>`
      )
    }
  }
}

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/cindy-web/' : '/',
  plugins: [injectFavicon()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        properties: resolve(__dirname, 'properties.html'),
        property: resolve(__dirname, 'property.html'),
        blog: resolve(__dirname, 'blog.html'),
        blogPost: resolve(__dirname, 'blog-post.html'),
      }
    }
  }
}))
