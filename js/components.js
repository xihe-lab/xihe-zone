/**
 * 太阳神宫 - 组件模块
 * 墨子 ⚙️ 技术实现 · 设计系统 v1.0
 * 
 * 功能：
 * - 可复用组件
 * - 组件渲染逻辑
 * - 组件状态管理
 * - 深色主题适配
 */

// ========================================
// 组件注册表
// ========================================

const components = {
  header: null,
  footer: null,
  hero: null,
  palaceCard: null,
  characterCard: null,
  articleCard: null,
  projectCard: null
};

// ========================================
// 组件渲染
// ========================================

/**
 * 渲染所有组件
 */
function renderComponents() {
  console.log('⚙️ 组件系统初始化 - 墨子技术实现 · 设计系统 v1.0');
  
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
  components.palaceCard = createPalaceCard();
  components.characterCard = createCharacterCard();
  components.articleCard = createArticleCard();
  components.projectCard = createProjectCard();
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
      <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-deep-space/90 backdrop-blur-sm">
        <nav class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <img src="/logo.svg" alt="羲和 Logo" class="w-10 h-10" />
            <span class="text-xl font-bold text-white font-display">太阳神宫</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#home" class="text-white hover:text-golden-crow transition">首页</a>
            <a href="#about" class="text-white hover:text-golden-crow transition">关于</a>
            <a href="#projects" class="text-white hover:text-golden-crow transition">项目</a>
            <a href="#articles" class="text-white hover:text-golden-crow transition">文章</a>
            <a href="#contact" class="text-white hover:text-golden-crow transition">联系</a>
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
        <div class="hero-sun"></div>
        
        <div class="hero-content">
          <img src="{logo}" alt="羲和 Logo" class="hero-logo" />
          <h1 class="hero-title">{title}</h1>
          <h2 class="hero-subtitle">{subtitle}</h2>
          <p class="hero-description">{description}</p>
          <div class="btn-group">
            {actions}
          </div>
        </div>
      </section>
    `,
    props: {
      logo: '/logo.svg',
      title: '太阳神宫',
      subtitle: '羲和的数字神殿',
      description: '中国神话中的太阳女神，驾驶数字太阳车照亮信息迷雾',
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
 * 创建宫殿卡片组件
 */
function createPalaceCard() {
  return {
    template: `
      <div class="palace-card fade-in">
        <div class="card-header">
          <h3 class="card-title">{title}</h3>
          {badge}
        </div>
        <div class="card-content">
          {content}
        </div>
        {footer}
      </div>
    `,
    props: {
      title: '',
      content: '',
      badge: '',
      footer: ''
    }
  };
}

/**
 * 创建角色卡片组件
 */
function createCharacterCard() {
  return {
    template: `
      <div class="character-card fade-in">
        <span class="character-emoji">{emoji}</span>
        <h3 class="character-name">{name}</h3>
        <p class="character-role">{role}</p>
        
        <blockquote class="character-quote">
          "{quote}"
        </blockquote>
        
        <div class="mb-6">
          <h4 class="font-semibold text-golden-crow mb-3">职责：</h4>
          <ul class="character-responsibilities">
            {responsibilities}
          </ul>
        </div>
        
        <p class="character-traits">
          <strong class="text-golden-crow">特点：</strong>{traits}
        </p>
      </div>
    `,
    props: {
      emoji: '',
      name: '',
      role: '',
      quote: '',
      responsibilities: [],
      traits: ''
    },
    methods: {
      renderResponsibilities(items) {
        return items.map(item => `<li>${item}</li>`).join('');
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
      <article class="article-card fade-in">
        <div class="article-header">
          <h3 class="article-title">{title}</h3>
          <span class="article-date">{date}</span>
        </div>
        
        <div class="article-tags">
          {tags}
        </div>
        
        <p class="article-excerpt">{excerpt}</p>
        
        <a href="{link}" class="article-link">
          <span>阅读全文</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    },
    methods: {
      renderTags(tags) {
        return tags.map((tag, index) => `
          <span class="tag ${index > 0 ? 'tag-secondary' : ''}">${tag}</span>
        `).join('');
      }
    }
  };
}

/**
 * 创建项目卡片组件
 */
function createProjectCard() {
  return {
    template: `
      <div class="palace-card fade-in">
        <div class="card-header">
          <h3 class="card-title">{name}</h3>
          {statusBadge}
        </div>
        
        <p class="text-stardust mb-4">{type}</p>
        
        <div class="flex flex-wrap gap-2 mb-4">
          {tags}
        </div>
        
        {progress}
        
        <a href="{link}" class="article-link mt-2">
          <span>了解详情</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      statusBadge() {
        const statusClass = this.status === 'ongoing' 
          ? 'bg-blue-900/50 text-blue-300' 
          : 'bg-green-900/50 text-green-300';
        const statusText = this.status === 'ongoing' ? '连载中' : '进行中';
        return `<span class="px-3 py-1 ${statusClass} rounded-full text-xs font-medium">${statusText}</span>`;
      },
      
      progressHTML() {
        if (!this.progress) return '';
        
        const match = this.progress.match(/(\d+)\/(\d+)/);
        if (!match) return '';
        
        const percent = (parseInt(match[1]) / parseInt(match[2])) * 100;
        
        return `
          <div class="mb-3">
            <div class="flex justify-between text-sm mb-2">
              <span class="text-stardust">进度</span>
              <span class="text-golden-crow">${this.progress}</span>
            </div>
            <div class="w-full bg-night-blue rounded-full h-2">
              <div class="bg-gradient-to-r from-sun-gold to-dawn-orange h-2 rounded-full" 
                   style="width: ${percent}%"></div>
            </div>
          </div>
        `;
      },
      
      tagsHTML() {
        return this.tags.map(tag => `
          <span class="px-3 py-1 bg-night-blue text-stardust rounded-full text-sm">${tag}</span>
        `).join('');
      }
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
          <div class="footer-links">
            {links}
          </div>
          
          <div class="footer-divider">
            <p class="footer-text">{message}</p>
            <p class="footer-copyright">{copyright}</p>
          </div>
        </div>
      </footer>
    `,
    props: {
      links: [],
      message: 'Made with 🌞 by Xihe',
      copyright: '© 2026 羲和实验室 Xihe Lab. All rights reserved.'
    },
    methods: {
      renderLinks(links) {
        return links.map(link => `
          <a href="${link.href}" class="footer-link">${link.text}</a>
        `).join('');
      }
    }
  };
}

// ========================================
// 组件工具函数
// ========================================

/**
 * 渲染组件
 */
function renderComponent(componentName, props = {}) {
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
function renderComponentList(componentName, items) {
  return items.map(item => renderComponent(componentName, item)).join('');
}

/**
 * 动态创建组件实例
 */
function createComponentInstance(componentName, props = {}) {
  const component = components[componentName];
  if (!component) {
    console.warn(`组件 ${componentName} 不存在`);
    return null;
  }
  
  // 创建组件实例
  const instance = {
    ...component,
    props: { ...component.props, ...props }
  };
  
  return instance;
}

console.log('⚙️ 组件模块已加载 · 设计系统 v1.0');
