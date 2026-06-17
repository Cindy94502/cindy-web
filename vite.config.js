import { defineConfig } from 'vite'
import { resolve } from 'path'

// 自動為所有 HTML 注入 favicon
function injectFavicon() {
  return {
    name: 'inject-favicon',
    transformIndexHtml(html) {
      return html.replace(
        /<\/head>/,
        `  <link rel="icon" href="/cindy-web/favicon.ico">\n  </head>`
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
