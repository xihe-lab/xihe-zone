export default {
  title: '羲和实验室 - 技术探索与创新',
  description: '源于上古神话，立于数字时代。专注 AI 与前沿技术探索。',

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#f59e0b' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
  ],

  themeConfig: {
    // 待鲁班确认设计规范后完善
    logo: {
      src: '/logo.svg',
      alt: '羲和 Logo',
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
      message: 'AI 伙伴：豆包',
      copyright: '© 2026 羲和实验室｜技术探索 · 智能创新',
    },
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
            vendor: ['vue'],
            gsap: ['gsap'],
          },
        },
      },
    },
  },
};
