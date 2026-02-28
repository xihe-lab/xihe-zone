/**
 * 太阳神宫 - 动画模块
 * 墨子 ⚙️ 技术实现 · 设计系统 v1.0
 * 
 * 功能：
 * - 页面过渡动画
 * - 滚动视差效果
 * - 交互动画
 * - 太阳光晕特效
 */

// ========================================
// 动画配置
// ========================================

const ANIMATION_CONFIG = {
  duration: 600,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  scrollThreshold: 50,
  parallaxStrength: 0.5

// ========================================
// 初始化动画
// ========================================

  console.log('⚙️ 动画系统初始化 - 墨子技术实现 · 设计系统 v1.0');
  
  // 初始化页面元素动画
  initElementAnimations();
  
  // 初始化滚动视差
  initParallax();
  
  // 初始化按钮交互
  initButtonEffects();
  
  // 初始化卡片悬停效果
  initCardEffects();
  
  // 初始化导航栏效果
  initNavbarEffect();
  
  // 初始化文字渐变动画
  initTextAnimations();
}

/**
 * 初始化元素动画
 */
function initElementAnimations() {
  // Hero 标题动画
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    animateIn(heroTitle, {
      delay: 300,
      duration: 1000,
      offsetY: 50
    });
  }
  
  // Hero 副标题动画
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    animateIn(heroSubtitle, {
      delay: 500,
      duration: 800,
      offsetY: 40
    });
  }
  
  // Hero 描述动画
  const heroDescription = document.querySelector('.hero-description');
  if (heroDescription) {
    animateIn(heroDescription, {
      delay: 700,
      duration: 800,
      offsetY: 30
    });
  }
  
  // Hero 按钮动画
  const heroButtons = document.querySelectorAll('.hero-section .btn');
  heroButtons.forEach((btn, index) => {
    animateIn(btn, {
      delay: 900 + (index * 150),
      duration: 600,
      offsetY: 20
    });
  });
  
  // Hero Logo 动画
  const heroLogo = document.querySelector('.hero-logo');
  if (heroLogo) {
    animateIn(heroLogo, {
      delay: 100,
      duration: 800,
      scale: 0.8
    });
  }
}

/**
 * 元素淡入动画
 */
function animateIn(element, options = {}) {
  const { delay = 0, duration = 600, offsetY = 30, scale = 1 } = options;
  
  element.style.opacity = '0';
  element.style.transform = `translateY(${offsetY}px) scale(${scale})`;
  element.style.transition = `opacity ${duration}ms ${ANIMATION_CONFIG.easing}, transform ${duration}ms ${ANIMATION_CONFIG.easing}`;
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0) scale(1)';
  }, delay);
}

/**
 * 初始化滚动视差效果
 */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax(parallaxElements);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * 更新视差效果
 */
function updateParallax(elements) {
  const scrollTop = window.pageYOffset;
  
  elements.forEach(element => {
    const speed = element.dataset.parallax || ANIMATION_CONFIG.parallaxStrength;
    const yPos = -(scrollTop * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

/**
 * 初始化按钮交互效果
 */
function initButtonEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    // 悬停效果增强 - 太阳光晕
    button.addEventListener('mouseenter', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // 创建光晕效果
      const glow = document.createElement('div');
      glow.className = 'btn-glow';
      glow.style.left = `${x - 50}px`;
      glow.style.top = `${y - 50}px`;
      
      button.style.position = 'relative';
      button.appendChild(glow);
      
      setTimeout(() => {
        glow.style.opacity = '1';
        setTimeout(() => {
          glow.style.opacity = '0';
          setTimeout(() => glow.remove(), 300);
        }, 300);
      }, 10);
    });
    
    // 点击波纹效果
    button.addEventListener('click', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.cssText = `
        position: absolute;
        background: rgba(245, 158, 11, 0.4);
        border-radius: 50%;
        width: 20px;
        height: 20px;
        left: ${x - 10}px;
        top: ${y - 10}px;
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out;
        pointer-events: none;
      `;
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // 添加波纹动画样式
  if (!document.getElementById('ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
    style.textContent = `
      @keyframes ripple-effect {
        to {
          transform: scale(20);
          opacity: 0;
        }
      }
      
      @keyframes shine {
        to {
          background-position: 200% center;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * 初始化卡片悬停效果
 */
function initCardEffects() {
  const cards = document.querySelectorAll('.palace-card, .character-card, .article-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      // 添加微光效果
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const shimmer = document.createElement('div');
      shimmer.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(245, 158, 11, 0.1), transparent);
        border-radius: 50%;
        pointer-events: none;
        left: ${x - 100}px;
        top: ${y - 100}px;
        transition: opacity 0.3s ease;
        z-index: 0;
      `;
      
      card.style.position = 'relative';
      card.insertBefore(shimmer, card.firstChild);
      
      setTimeout(() => {
        shimmer.style.opacity = '1';
        setTimeout(() => {
          shimmer.style.opacity = '0';
          setTimeout(() => shimmer.remove(), 300);
        }, 500);
      }, 10);
    });
  });
}

/**
 * 初始化导航栏效果
 */
function initNavbarEffect() {
  let lastScroll = 0;
  const navbar = document.querySelector('header');
  
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 滚动时隐藏/显示导航栏
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = 'translateY(-100%)';
    } else {
      navbar.style.transform = 'translateY(0)';
    }
    
    // 添加阴影效果
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * 初始化文字动画
 */
function initTextAnimations() {
  // 金色标题效果
  const goldenTitles = document.querySelectorAll('.golden-title, .section-title, .hero-title');
  
  goldenTitles.forEach(title => {
    title.style.backgroundSize = '200% auto';
  });
}

// ========================================
// 滚动动画观察者
// ========================================

/**
 * 创建滚动动画观察者
 */
  const config = {
    threshold: options.threshold || 0.1,
    rootMargin: options.rootMargin || '0px 0px -50px 0px',
    ...options
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // 如果只需要触发一次，取消观察
        if (options.once !== false) {
          entry.unobserve(entry.target);
        }
      }
    });
  }, config);
}

// ========================================
// 工具函数
// ========================================

/**
 * 平滑滚动到指定元素
 */
  const element = document.querySelector(selector);
  if (!element) return;
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;
  
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
}

/**
 * 淡出元素
 */
  element.style.transition = `opacity ${duration}ms ease-out`;
  element.style.opacity = '0';
  
  return new Promise(resolve => {
    setTimeout(() => {
      element.style.display = 'none';
      resolve();
    }, duration);
  });
}

/**
 * 淡入元素
 */
  element.style.display = 'block';
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ease-in`;
  
  return new Promise(resolve => {
    setTimeout(() => {
      element.style.opacity = '1';
      resolve();
    }, duration);
  });
}

/**
 * 序列动画
 */
  elements.forEach((el, index) => {
    setTimeout(() => {
      animationFn(el);
    }, index * stagger);
  });
}

// ========================================
// 性能优化
// ========================================

/**
 * 防抖函数
 */
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数
 */
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 使用 requestAnimationFrame 优化滚动监听
 */
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

console.log('⚙️ 动画模块已加载 · 设计系统 v1.0');
