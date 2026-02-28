/**
 * 太阳神宫 · 主 JavaScript 文件
 * 设计系统：v1.0 (鲁班 🔨)
 * 技术实现：墨子 ⚙️
 * 
 * 功能：
 * - 页面初始化
 * - 滚动进度条
 * - 平滑滚动
 * - 交互动画
 * - 性能优化
 */

// ========================================
// 页面初始化
// ========================================

function initApp() {
  console.log('🌞 太阳神宫已启动 - 墨子 ⚙️ 技术实现');
  
  // 隐藏加载状态
  hideLoadingState();
  
  // 初始化滚动进度条
  initScrollProgress();
  
  // 初始化平滑滚动
  initSmoothScroll();
  
  // 初始化滚动动画
  initScrollAnimations();
  
  // 初始化按钮效果
  initButtonEffects();
  
  // 初始化导航栏
  initNavbar();
}

// 检查 DOM 是否已就绪，处理脚本在 body 底部的情况
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  // DOM 已就绪，直接初始化
  initApp();
}

/**
 * 隐藏加载状态
 */
function hideLoadingState() {
  // 页面已完全加载，移除任何加载指示器
  document.body.classList.add('loaded');
}

// ========================================
// 滚动进度条
// ========================================

/**
 * 初始化滚动进度条
 */
function initScrollProgress() {
  const progressBar = document.getElementById('progressBar');
  if (!progressBar) return;
  
  let ticking = false;
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateScrollProgress(progressBar);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/**
 * 更新滚动进度条
 */
function updateScrollProgress(progressBar) {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  progressBar.style.height = `${scrollPercent}%`;
}

// ========================================
// 平滑滚动
// ========================================

/**
 * 初始化平滑滚动
 */
function initSmoothScroll() {
  // 获取所有内部链接
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      // 平滑滚动到目标位置
      const offsetTop = target.offsetTop - 80; // 减去导航栏高度
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // 更新 URL（不触发滚动）
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    });
  });
}

// ========================================
// 滚动动画
// ========================================

/**
 * 初始化滚动动画
 */
function initScrollAnimations() {
  // 使用 Intersection Observer API
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // 只触发一次动画
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // 观察所有需要动画的元素
  document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// 按钮交互效果
// ========================================

/**
 * 初始化按钮效果
 */
function initButtonEffects() {
  const buttons = document.querySelectorAll('.sun-button');
  
  buttons.forEach(button => {
    // 点击波纹效果
    button.addEventListener('click', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      createRipple(button, x, y);
    });
  });
}

/**
 * 创建波纹效果
 */
function createRipple(button, x, y) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = `
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
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
  
  // 添加动画样式（如果不存在）
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
    `;
    document.head.appendChild(style);
  }
  
  setTimeout(() => ripple.remove(), 600);
}

// ========================================
// 导航栏效果
// ========================================

/**
 * 初始化导航栏
 */
function initNavbar() {
  // 可以在这里添加导航栏的滚动效果
  // 例如：滚动时显示/隐藏导航栏
}

// ========================================
// 性能优化工具
// ========================================

/**
 * 防抖函数
 */
function debounce(func, wait) {
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
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ========================================
// 视差效果（可选）
// ========================================

/**
 * 初始化视差效果
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
    const speed = element.dataset.parallax || 0.5;
    const yPos = -(scrollTop * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
}

// ========================================
// 工具函数导出
// ========================================


console.log('⚙️ JavaScript 模块已加载');
