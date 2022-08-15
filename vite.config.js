import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import viteCompression from 'vite-plugin-compression'
import viteSvgIcons from 'vite-plugin-svg-icons'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // outDir: "./www", //打包后的文件目录
    publicDir: 'assets',
    // 去除console
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        assetFileNames: 'css/[name].[hash].css',
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js'
      }
    }
  },
  server: {
    host: '0.0.0.0', // 默认为localhost
    port: 7000, // 端口号
    open: true, // 是否自动打开浏览器
    base: './', // 生产环境路径
    strictPort: true,
    optimizeDeps: {
      include: ['axios', 'element-plus'] // 引入第三方插件
    },
    // externals: {
    //   qq: 'qq'
    // },
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      '^/api': {
        target: 'http://192.168.1.155:8701', // 后端服务实际地址
        changeOrigin: true
        // rewrite: () => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        modifyVars: {},
        javascriptEnabled: true
      }
    }
  },
  plugins: [
    vue(),
    viteSvgIcons({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    viteCompression({
      // 开启gzip模式
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    }),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: name => {
            const newName = name.slice(3)
            return `element-plus/packages/theme-chalk/src/${newName}.scss`
          },
          resolveComponent: name => `element-plus/lib/${name}`
        }
      ]
    })
  ]
})
