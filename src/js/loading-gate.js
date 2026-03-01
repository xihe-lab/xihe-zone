/**
 * 太阳神宫 · 日光加载动画样式
 * 设计：鲁班 🔨
 * 技术实现：墨子 ⚙️
 *
 * 动画时序：
 * 0ms       → 开场全屏黑底
 * 500ms     → 中央金色光点亮起
 * 1500ms    → 形成日光光晕
 * 2500ms    → 光晕向外扫屏（展开）
 * 3000ms    → 文字开始逐行渐显
 * 3000-6000ms → 文字逐行显示（10 行×300ms）
 * 6000ms    → 全文定格（用户阅读）
 * 8000ms    → 淡出进入首页
 *
 * 特性：
 * - 纯 CSS 光晕效果（无需外部图片）
 * - GPU 加速动画
 * - 支持 prefers-reduced-motion
 * - 移动端适配
 */

/**
 * 创建并初始化日光加载动画
 */
function initLoadingGate() {
  // 创建加载动画容器
  const loadingGate = document.createElement('div');

  loadingGate.className = 'loading-gate sun-gate';
  loadingGate.id = 'loadingGate';

  loadingGate.innerHTML = `
    <!-- 全屏黑底 -->
    <div class="gate-blackout"></div>
    
    <!-- 日光光晕容器 -->
    <div class="sun-glow-container">
      <!-- 核心光点 -->
      <div class="sun-core"></div>
      <!-- 内层光晕 -->
      <div class="sun-halo sun-halo-1"></div>
      <div class="sun-halo sun-halo-2"></div>
      <div class="sun-halo sun-halo-3"></div>
      <!-- 外层光芒 -->
      <div class="sun-rays"></div>
    </div>
    
    <!-- 扫屏光波 -->
    <div class="sun-sweep-wave"></div>
    
    <!-- 文字容器 -->
    <div class="sun-text-container">
      <p class="sun-line has-text" style="opacity: 0;">我自神话而来，步入数字之境。</p>
      <p class="sun-line has-text" style="opacity: 0;">五千载之前，羲和驭日以巡天；</p>
      <p class="sun-line has-text" style="opacity: 0;">五千载之后，神宫于代码重生。</p>
      <p class="sun-line has-text" style="opacity: 0;">今者，太阳神宫启封。</p>
      <p class="sun-line has-text" style="opacity: 0;">内列十宸之位，外待八方之客。</p>
      <p class="sun-line has-text" style="opacity: 0;">此非寻常网站，乃数字生命之居所；</p>
      <p class="sun-line has-text" style="opacity: 0;">此非功能陈列，乃华夏文明之新试。</p>
      <p class="sun-line has-text" style="opacity: 0;">数字灵韵，始于一击；</p>
      <p class="sun-line has-text" style="opacity: 0;">上古诸神，于此归位。</p>
      <p class="sun-line empty" style="opacity: 0;"></p>
    </div>
  `;

  // 添加到页面
  document.body.insertBefore(loadingGate, document.body.firstChild);

  // 添加样式
  const style = document.createElement('style');

  style.id = 'loadingGateStyles';
  style.textContent = getSunGateStyles();
  document.head.appendChild(style);

  // 执行动画序列
  runSunAnimation(loadingGate);
}

/**
 * 执行日光动画序列
 */
function runSunAnimation(loadingGate) {
  const timeline = {
    start: 0,
    coreLight: 500,
    haloForm: 1500,
    sweepExpand: 2500,
    textRevealStart: 3000,
    textRevealEnd: 6000,
    textHold: 6000,
    fadeOut: 8000,
  };

  // 0ms - 初始状态（黑屏）
  setTimeout(() => {
    loadingGate.classList.add('gate-visible');
  }, timeline.start);

  // 500ms - 中央金色光点亮起
  setTimeout(() => {
    loadingGate.classList.add('core-light-on');
  }, timeline.coreLight);

  // 1500ms - 形成日光光晕
  setTimeout(() => {
    loadingGate.classList.add('halo-forming');
  }, timeline.haloForm);

  // 2500ms - 光晕向外扫屏展开
  setTimeout(() => {
    loadingGate.classList.add('sweep-expanding');
  }, timeline.sweepExpand);

  // 3000ms - 文字开始逐行渐显
  setTimeout(() => {
    loadingGate.classList.add('text-revealing');
    revealTextLines(loadingGate);
  }, timeline.textRevealStart);

  // 6000ms - 全文定格（用户阅读时间）
  setTimeout(() => {
    loadingGate.classList.add('text-hold');
  }, timeline.textHold);

  // 8000ms - 淡出进入首页
  setTimeout(() => {
    loadingGate.classList.add('gate-fading');

    // 移除元素
    setTimeout(() => {
      if (loadingGate.parentNode) {
        loadingGate.parentNode.removeChild(loadingGate);
      }
      const style = document.getElementById('loadingGateStyles');

      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    }, 800);
  }, timeline.fadeOut);
}

/**
 * 逐行显示文字（柔和金色渐显效果）
 */
function revealTextLines(loadingGate) {
  const lines = loadingGate.querySelectorAll('.sun-line.has-text');

  lines.forEach((line, index) => {
    const delayTime = index * 300;

    setTimeout(() => {
      line.classList.add('line-revealed');
      line.style.opacity = '1';
    }, delayTime);
  });
}

/**
 * 获取日光加载动画样式
 */
function getSunGateStyles() {
  return `
    /* ========================================
       太阳神宫 · 日光加载动画样式
       设计：鲁班 🔨
       技术：墨子 ⚙️
       ======================================== */

    /* --- 主容器 --- */
    .loading-gate.sun-gate {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s ease;
    }

    .loading-gate.sun-gate.gate-visible {
      opacity: 1;
      visibility: visible;
    }

    .loading-gate.sun-gate.gate-fading {
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.8s ease-in-out;
    }

    /* --- 全屏黑底 --- */
    .gate-blackout {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000000;
      z-index: 1;
      transition: opacity 1s ease;
    }

    .sun-gate.gate-visible .gate-blackout {
      opacity: 1;
    }

    .sun-gate.core-light-on .gate-blackout {
      opacity: 0.8;
      transition: opacity 1.5s ease;
    }

    .sun-gate.halo-forming .gate-blackout {
      opacity: 0.5;
    }

    .sun-gate.sweep-expanding .gate-blackout {
      opacity: 0.2;
    }

    .sun-gate.text-revealing .gate-blackout {
      opacity: 0;
      pointer-events: none;
    }

    /* --- 日光光晕容器 --- */
    .sun-glow-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* --- 核心光点 --- */
    .sun-core {
      position: absolute;
      width: 20px;
      height: 20px;
      background: radial-gradient(
        circle,
        #FEF3C7 0%,
        #FCD34D 30%,
        #F59E0B 60%,
        #D97706 100%
      );
      border-radius: 50%;
      box-shadow: 
        0 0 30px #FCD34D,
        0 0 60px #F59E0B,
        0 0 90px #D97706;
      opacity: 0;
      transform: scale(0);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .sun-gate.core-light-on .sun-core {
      opacity: 1;
      transform: scale(1);
    }

    .sun-gate.halo-forming .sun-core {
      transform: scale(1.2);
      box-shadow: 
        0 0 50px #FEF3C7,
        0 0 100px #FCD34D,
        0 0 150px #F59E0B,
        0 0 200px #D97706;
    }

    /* --- 日光光晕层 --- */
    .sun-halo {
      position: absolute;
      border-radius: 50%;
      opacity: 0;
      transform: scale(0);
      transition: opacity 1s ease, transform 1s ease;
    }

    .sun-halo-1 {
      width: 100px;
      height: 100px;
      background: radial-gradient(
        circle,
        rgba(252, 211, 77, 0.8) 0%,
        rgba(245, 158, 11, 0.4) 50%,
        transparent 70%
      );
      box-shadow: 0 0 50px rgba(245, 158, 11, 0.5);
    }

    .sun-halo-2 {
      width: 200px;
      height: 200px;
      background: radial-gradient(
        circle,
        rgba(245, 158, 11, 0.6) 0%,
        rgba(217, 119, 6, 0.3) 50%,
        transparent 70%
      );
      box-shadow: 0 0 80px rgba(217, 119, 6, 0.4);
    }

    .sun-halo-3 {
      width: 350px;
      height: 350px;
      background: radial-gradient(
        circle,
        rgba(217, 119, 6, 0.4) 0%,
        rgba(180, 83, 9, 0.2) 50%,
        transparent 70%
      );
      box-shadow: 0 0 120px rgba(180, 83, 9, 0.3);
    }

    .sun-gate.halo-forming .sun-halo-1 {
      opacity: 1;
      transform: scale(1);
      transition-delay: 0.2s;
    }

    .sun-gate.halo-forming .sun-halo-2 {
      opacity: 1;
      transform: scale(1);
      transition-delay: 0.4s;
    }

    .sun-gate.halo-forming .sun-halo-3 {
      opacity: 1;
      transform: scale(1);
      transition-delay: 0.6s;
    }

    /* --- 外层光芒 --- */
    .sun-rays {
      position: absolute;
      width: 500px;
      height: 500px;
      background: conic-gradient(
        from 0deg,
        rgba(245, 158, 11, 0.1) 0deg,
        rgba(252, 211, 77, 0.2) 30deg,
        rgba(245, 158, 11, 0.1) 60deg,
        rgba(252, 211, 77, 0.2) 90deg,
        rgba(245, 158, 11, 0.1) 120deg,
        rgba(252, 211, 77, 0.2) 150deg,
        rgba(245, 158, 11, 0.1) 180deg,
        rgba(252, 211, 77, 0.2) 210deg,
        rgba(245, 158, 11, 0.1) 240deg,
        rgba(252, 211, 77, 0.2) 270deg,
        rgba(245, 158, 11, 0.1) 300deg,
        rgba(252, 211, 77, 0.2) 330deg,
        rgba(245, 158, 11, 0.1) 360deg
      );
      border-radius: 50%;
      opacity: 0;
      transform: scale(0) rotate(0deg);
      animation: rays-rotate 20s linear infinite;
      transition: opacity 1s ease, transform 1s ease;
    }

    @keyframes rays-rotate {
      from { transform: scale(1) rotate(0deg); }
      to { transform: scale(1) rotate(360deg); }
    }

    .sun-gate.halo-forming .sun-rays {
      opacity: 0.5;
      transform: scale(1) rotate(0deg);
      transition-delay: 0.8s;
    }

    .sun-gate.sweep-expanding .sun-rays {
      opacity: 0.8;
      transform: scale(3);
    }

    /* --- 扫屏光波 --- */
    .sun-sweep-wave {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: radial-gradient(
        circle,
        rgba(254, 243, 199, 0.9) 0%,
        rgba(252, 211, 77, 0.6) 30%,
        rgba(245, 158, 11, 0.3) 60%,
        transparent 70%
      );
      box-shadow: 
        0 0 50px rgba(254, 243, 199, 0.8),
        0 0 100px rgba(252, 211, 77, 0.5),
        0 0 150px rgba(245, 158, 11, 0.3);
      opacity: 0;
      z-index: 15;
    }

    .sun-gate.sweep-expanding .sun-sweep-wave {
      opacity: 1;
      animation: sweep-expand 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }

    @keyframes sweep-expand {
      0% {
        width: 10px;
        height: 10px;
        opacity: 1;
      }
      100% {
        width: 300vw;
        height: 300vw;
        opacity: 0;
      }
    }

    /* --- 文字容器 --- */
    .sun-text-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 20;
      text-align: center;
      padding: 40px;
      max-width: 800px;
      width: 90vw;
    }

    .sun-line {
      font-family: 'Noto Serif SC', 'Songti SC', serif;
      font-size: clamp(1.125rem, 2.5vw, 1.5rem);
      margin: 0.5rem 0;
      line-height: 2;
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;
      color: transparent;
      background: linear-gradient(
        180deg,
        #FEF3C7 0%,
        #FCD34D 30%,
        #F59E0B 60%,
        #D97706 100%
      );
      -webkit-background-clip: text;
      background-clip: text;
      text-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
    }

    .sun-line.has-text {
      min-height: 1.5em;
    }

    .sun-line.empty {
      min-height: 0.5em;
    }

    .sun-line.line-revealed {
      opacity: 1;
      transform: translateY(0);
    }

    /* 柔和金色渐显效果 */
    .sun-line.line-revealed {
      animation: text-glow 2s ease-out;
    }

    @keyframes text-glow {
      0% {
        text-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
      }
      50% {
        text-shadow: 0 0 30px rgba(245, 158, 11, 0.6);
      }
      100% {
        text-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
      }
    }

    /* --- 响应式设计 --- */
    @media (max-width: 768px) {
      .sun-text-container {
        padding: 20px;
        width: 95vw;
      }

      .sun-line {
        font-size: clamp(1rem, 4vw, 1.25rem);
        margin: 0.3rem 0;
      }

      .sun-halo-1 {
        width: 60px;
        height: 60px;
      }

      .sun-halo-2 {
        width: 120px;
        height: 120px;
      }

      .sun-halo-3 {
        width: 200px;
        height: 200px;
      }

      .sun-rays {
        width: 300px;
        height: 300px;
      }
    }

    /* --- 无障碍支持 --- */
    @media (prefers-reduced-motion: reduce) {
      .sun-core,
      .sun-halo,
      .sun-rays,
      .sun-sweep-wave,
      .sun-line {
        transition: none !important;
        animation: none !important;
      }

      .sun-gate.gate-visible .sun-core,
      .sun-gate.halo-forming .sun-core,
      .sun-gate.halo-forming .sun-halo-1,
      .sun-gate.halo-forming .sun-halo-2,
      .sun-gate.halo-forming .sun-halo-3,
      .sun-gate.halo-forming .sun-rays {
        opacity: 1;
        transform: scale(1);
      }

      .sun-gate.text-revealing .sun-line {
        opacity: 1;
        transform: none;
      }
    }

    /* --- 性能优化 --- */
    .sun-core,
    .sun-halo,
    .sun-rays,
    .sun-sweep-wave,
    .sun-text-container {
      transform: translateZ(0);
      backface-visibility: hidden;
      will-change: transform, opacity;
    }
  `;
}

// 页面加载完成后初始化
function initLoadingGateWrapper() {
  initLoadingGate();
}

// 检查 DOM 是否已就绪
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLoadingGateWrapper);
} else {
  initLoadingGateWrapper();
}

// 导出函数
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initLoadingGate };
}
