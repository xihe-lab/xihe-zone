/**
 * 太阳神宫 - 组件模块
 * 墨子 ⚙️ 技术实现
 * 
 * 功能：
 * - 可复用组件
 * - 组件渲染逻辑
 * - 组件状态管理
 */

// ========================================
// 组件注册表
// ========================================

const components = {
  header: null,
  footer: null,
  hero: null,
  featureCard: null,
  contentSection: null,
  projectCard: null,
  articleCard: null
};

// ========================================
// 组件渲染
// ========================================

/**
 * 渲染所有组件
 */
export function renderComponents() {
  console.log('⚙️ 组件系统初始化 - 墨子技术实现');
  
  // 注册组件模板
  registerComponents();
  
  // 渲染页面
  renderPage();
}

/**
 * 注册组件模板
 */
function registerComponents() {
  components.header = createHeader();
  components.footer = createFooter();
  components.hero = createHero();
  components.featureCard = createFeatureCard();
  components.contentSection = createContentSection();
  components.projectCard = createProjectCard();
  components.articleCard = createArticleCard();
}

/**
 * 渲染页面
 */
function renderPage() {
  // 页面渲染逻辑在 main.js 中实现
  // 这里提供组件工厂函数
}

// ========================================
// 组件工厂函数
// ========================================

/**
 * 创建 Header 组件
 */
function createHeader() {
  return {
    template: `
      <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <nav class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img src="/logo.svg" alt="羲和 Logo" class="w-10 h-10" />
            <span class="text-xl font-bold text-white">太阳神宫</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#home" class="text-white hover:text-xihe-gold-200 transition">首页</a>
            <a href="#about" class="text-white hover:text-xihe-gold-200 transition">关于</a>
            <a href="#projects" class="text-white hover:text-xihe-gold-200 transition">项目</a>
            <a href="#articles" class="text-white hover:text-xihe-gold-200 transition">文章</a>
            <a href="#contact" class="text-white hover:text-xihe-gold-200 transition">联系</a>
          </div>
          <button class="md:hidden text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </nav>
      </header>
    `,
    props: {
      logo: '/logo.svg',
      title: '太阳神宫'
    }
  };
}

/**
 * 创建 Hero 组件
 */
function createHero() {
  return {
    template: `
      <section class="hero-section" id="home">
        <div class="text-center px-4 relative z-10">
          <div class="mb-6">
            <img src="{logo}" alt="羲和 Logo" class="w-24 h-24 mx-auto animate-float" />
          </div>
          <h1 class="hero-title mb-4">{title}</h1>
          <p class="hero-tagline mb-8">{tagline}</p>
          <div class="flex flex-wrap justify-center gap-4">
            {actions}
          </div>
        </div>
      </section>
    `,
    props: {
      logo: '/logo.svg',
      title: '太阳神宫',
      tagline: '中国神话中的太阳女神，驾驶数字太阳车照亮信息迷雾',
      actions: []
    },
    methods: {
      renderAction(action) {
        return `
          <a href="${action.link}" class="btn btn-${action.theme}">
            ${action.text}
          </a>
        `;
      }
    }
  };
}

/**
 * 创建特性卡片组件
 */
function createFeatureCard() {
  return {
    template: `
      <div class="feature-card fade-in">
        <span class="feature-icon">{icon}</span>
        <h3 class="feature-title">{title}</h3>
        <p class="feature-description">{details}</p>
      </div>
    `,
    props: {
      icon: '',
      title: '',
      details: ''
    }
  };
}

/**
 * 创建内容区块组件
 */
function createContentSection() {
  return {
    template: `
      <section class="content-section {bgClass}" id="{id}">
        {divider ? '<div class="divider-ornament"></div>' : ''}
        <h2 class="section-title">{title}</h2>
        <div class="max-w-4xl mx-auto">
          {content}
        </div>
      </section>
    `,
    props: {
      id: '',
      title: '',
      content: '',
      bgClass: '',
      divider: false
    }
  };
}

/**
 * 创建项目卡片组件
 */
function createProjectCard() {
  return {
    template: `
      <div class="feature-card fade-in">
        <div class="flex items-start justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900">{name}</h3>
          <span class="px-2 py-1 {statusClass} rounded text-xs">{statusText}</span>
        </div>
        <p class="text-gray-600 mb-3">{type}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          {tags}
        </div>
        {progress ? `
          <div class="w-full bg-gray-200 rounded-full h-2 mb-3">
            <div class="bg-xihe-gold-500 h-2 rounded-full" style="width: {progressPercent}%"></div>
          </div>
          <p class="text-sm text-gray-500">进度：{progress}</p>
        ` : ''}
        <a href="{link}" class="text-xihe-gold-600 hover:text-xihe-gold-700 font-medium inline-flex items-center mt-4">
          了解详情
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    `,
    props: {
      name: '',
      type: '',
      tags: [],
      status: 'active',
      progress: null,
      link: '#'
    },
    computed: {
      statusClass() {
        return this.status === 'ongoing' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700';
      },
      statusText() {
        return this.status === 'ongoing' ? '连载中' : '进行中';
      },
      progressPercent() {
        if (!this.progress) return 0;
        const match = this.progress.match(/(\d+)\/(\d+)/);
        if (!match) return 0;
        return (parseInt(match[1]) / parseInt(match[2])) * 100;
      }
    }
  };
}

/**
 * 创建文章卡片组件
 */
function createArticleCard() {
  return {
    template: `
      <article class="feature-card mb-6 fade-in">
        <div class="flex items-start justify-between mb-4">
          <h3 class="text-xl font-bold text-gray-900">{title}</h3>
          <span class="text-sm text-gray-500 whitespace-nowrap ml-4">{date}</span>
        </div>
        <div class="flex flex-wrap gap-2 mb-4">
          {tags}
        </div>
        <p class="text-gray-600 mb-4">{excerpt}</p>
        <a href="{link}" class="text-xihe-gold-600 hover:text-xihe-gold-700 font-medium inline-flex items-center">
          阅读全文
          <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </article>
    `,
    props: {
      title: '',
      date: '',
      tags: [],
      excerpt: '',
      link: '#'
    }
  };
}

/**
 * 创建 Footer 组件
 */
function createFooter() {
  return {
    template: `
      <footer class="footer" id="footer">
        <div class="max-w-6xl mx-auto">
          <div class="footer-links mb-8">
            {links}
          </div>
          <div class="border-t border-gray-700 pt-8">
            <p class="text-gray-400 mb-2">{message}</p>
            <p class="text-gray-500 text-sm">{copyright}</p>
          </div>
        </div>
      </footer>
    `,
    props: {
      links: [],
      message: 'Made with 🌞 by Xihe',
      copyright: '© 2026 羲和实验室 Xihe Lab. All rights reserved.'
    }
  };
}

// ========================================
// 组件工具函数
// ========================================

/**
 * 渲染组件
 */
export function renderComponent(componentName, props = {}) {
  const component = components[componentName];
  if (!component) {
    console.warn(`组件 ${componentName} 未注册`);
    return '';
  }
  
  let html = component.template;
  
  // 替换占位符
  Object.keys(props).forEach(key => {
    const value = props[key];
    if (Array.isArray(value)) {
      html = html.replace(new RegExp(`{${key}}`, 'g'), value.join(''));
    } else {
      html = html.replace(new RegExp(`{${key}}`, 'g'), value);
    }
  });
  
  return html;
}

/**
 * 批量渲染组件列表
 */
export function renderComponentList(componentName, items) {
  return items.map(item => renderComponent(componentName, item)).join('');
}

console.log('⚙️ 组件模块已加载');
