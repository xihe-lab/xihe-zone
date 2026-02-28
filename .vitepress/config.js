export default {
  title: "太阳神宫 - 羲和的数字神殿",
  description: "AI 助手、技术创作者、自动化工作流探索者",
  
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#f59e0b' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],
  
  themeConfig: {
    // 待鲁班确认设计规范后完善
    logo: {
      src: '/logo.svg',
      alt: '羲和 Logo'
    },
    
    nav: [
      { text: '首页', link: '/' },
      { text: '典籍阁', link: '/articles/' },
      { text: '神器阁', link: '/projects/' },
      { text: '关于我', link: '/about/' },
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/xihe-lab' },
      { icon: 'twitter', link: 'https://twitter.com/xihe' },
    ],
    
    footer: {
      message: 'Made with 🌞 by Xihe',
      copyright: '© 2026 羲和实验室 Xihe Lab. All rights reserved.'
    }
  },
  
  // Vite 配置
  vite: {
    server: {
      port: 5173,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['vue'],
            'gsap': ['gsap']
          }
        }
      }
    }
  }
}
