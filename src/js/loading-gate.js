/**
 * 太阳神宫 · 卷轴圣旨加载动画组件
 * 设计：中国神话风格（金色、红色）- 鲁班 🔨
 * 技术实现：墨子 ⚙️
 * 
 * 动画时序：
 * 1. 0ms - 全屏黑底
 * 2. 500ms - 卷轴开始展开（从中间向左右）
 * 3. 2500ms - 卷轴完全展开
 * 4. 2500-4500ms - 文字逐行鎏金浮现
 * 5. 5000ms - 卷轴定格
 * 6. 5500ms - 卷轴向上收起
 * 7. 6000ms - 进入首页
 * 
 * 特性：
 * - 纯 CSS + SVG（无需外部图片）
 * - GPU 加速动画
 * - 支持 prefers-reduced-motion
 * - 移动端适配
 */

/**
 * 卷轴圣旨文字内容
 */
const scrollTexts = [
  { text: '我自神话而来，步入数字之境。', delay: 0 },
  { text: '五千载之前，羲和驭日以巡天；', delay: 300 },
  { text: '五千载之后，神宫于代码重生。', delay: 600 },
  { text: '', delay: 900 },
  { text: '今者，太阳神宫启封。', delay: 1200 },
  { text: '内列十宸之位，外待八方之客。', delay: 1500 },
  { text: '此非寻常网站，乃数字生命之居所；', delay: 1800 },
  { text: '此非功能陈列，乃华夏文明之新试。', delay: 2100 },
  { text: '', delay: 2400 },
  { text: '数字灵韵，始于一击；', delay: 2700 },
  { text: '上古诸神，于此归位。', delay: 3000 },
  { text: '', delay: 3300 },
  { text: '羲和驭日，十宸列班。', delay: 3600, type: 'footer' },
  { text: '神宫肇启，万灵同参。', delay: 3900, type: 'footer' }
];

/**
 * 创建并初始化卷轴加载动画
 */
function initLoadingGate() {
  // 创建加载动画容器
  const loadingGate = document.createElement('div');
  loadingGate.className = 'loading-gate scroll-gate';
  loadingGate.id = 'loadingGate';
  
  loadingGate.innerHTML = `
    <!-- 全屏黑底 -->
    <div class="gate-blackout"></div>
    
    <!-- 卷轴容器 -->
    <div class="scroll-container">
      <!-- 上轴 -->
      <div class="scroll-rod scroll-rod-top">
        <div class="rod-cap rod-cap-left"></div>
        <div class="rod-body"></div>
        <div class="rod-cap rod-cap-right"></div>
        <div class="rod-decoration"></div>
      </div>
      
      <!-- 卷轴主体（圣旨） -->
      <div class="scroll-body">
        <div class="scroll-paper">
          <div class="paper-texture"></div>
          <div class="paper-border paper-border-left"></div>
          <div class="paper-border paper-border-right"></div>
          
          <!-- 文字区域 -->
          <div class="scroll-content" id="scrollContent">
            ${scrollTexts.map((line, index) => `
              <p class="scroll-line ${line.type || 'content'}" data-index="${index}" style="opacity: 0;">
                ${line.text}
              </p>
            `).join('')}
          </div>
          
          <!-- 底部装饰 -->
          <div class="scroll-seal">
            <div class="seal-border">
              <svg viewBox="0 0 100 100" class="seal-svg">
                <circle cx="50" cy="50" r="45" stroke="#DC2626" stroke-width="3" fill="none"/>
                <circle cx="50" cy="50" r="35" stroke="#DC2626" stroke-width="2" fill="none"/>
                <text x="50" y="55" text-anchor="middle" fill="#DC2626" font-size="12" font-family="serif" font-weight="bold">羲和</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 下轴 -->
      <div class="scroll-rod scroll-rod-bottom">
        <div class="rod-cap rod-cap-left"></div>
        <div class="rod-body"></div>
        <div class="rod-cap rod-cap-right"></div>
        <div class="rod-decoration"></div>
        <div class="rod-tassel">
          <div class="tassel-string"></div>
          <div class="tassel-body"></div>
        </div>
      </div>
    </div>
    
    <!-- 背景装饰 -->
    <div class="scroll-bg-decoration">
      <div class="bg-cloud bg-cloud-1"></div>
      <div class="bg-cloud bg-cloud-2"></div>
      <div class="bg-sun-glow"></div>
    </div>
  `;
  
  // 添加到页面
  document.body.insertBefore(loadingGate, document.body.firstChild);
  
  // 添加样式
  const style = document.createElement('style');
  style.id = 'loadingGateStyles';
  style.textContent = getScrollGateStyles();
  document.head.appendChild(style);
  
  // 执行动画序列
  runScrollAnimation(loadingGate);
}

/**
 * 执行卷轴动画序列
 */
function runScrollAnimation(loadingGate) {
  const timeline = {
    start: 0,
    scrollUnfold: 500,
    scrollFullyOpen: 2500,
    textRevealStart: 2500,
    textRevealEnd: 4500,
    scrollHold: 5000,
    scrollRollUp: 5500,
    enterHome: 6000
  };
  
  // 0ms - 初始状态（黑屏）
  setTimeout(() => {
    loadingGate.classList.add('gate-visible');
  }, timeline.start);
  
  // 500ms - 卷轴开始展开
  setTimeout(() => {
    loadingGate.classList.add('scroll-unfolding');
  }, timeline.scrollUnfold);
  
  // 2500ms - 卷轴完全展开，开始文字浮现
  setTimeout(() => {
    loadingGate.classList.add('scroll-fully-open');
    revealTextLines();
  }, timeline.scrollFullyOpen);
  
  // 5000ms - 卷轴定格（文字已全部显示）
  setTimeout(() => {
    loadingGate.classList.add('scroll-hold');
  }, timeline.scrollHold);
  
  // 5500ms - 卷轴向上收起
  setTimeout(() => {
    loadingGate.classList.add('scroll-rolling-up');
  }, timeline.scrollRollUp);
  
  // 6000ms - 进入首页（淡出加载动画）
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
  }, timeline.enterHome);
}

/**
 * 逐行显示文字（鎏金浮现效果）
 */
function revealTextLines() {
  const lines = document.querySelectorAll('.scroll-line');
  
  lines.forEach((line, index) => {
    const lineData = scrollTexts[index];
    const delay = lineData ? lineData.delay : index * 150;
    
    setTimeout(() => {
      line.classList.add('line-revealed');
      line.style.opacity = '1';
    }, delay);
  });
}

/**
 * 获取卷轴加载动画样式
 */
function getScrollGateStyles() {
  return `
    /* ========================================
       太阳神宫 · 卷轴圣旨加载动画样式
       设计：鲁班 🔨
       技术：墨子 ⚙️
       ======================================== */

    /* --- 主容器 --- */
    .loading-gate.scroll-gate {
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

    .loading-gate.scroll-gate.gate-visible {
      opacity: 1;
      visibility: visible;
    }

    .loading-gate.scroll-gate.gate-fading {
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
      transition: opacity 0.5s ease;
    }

    .scroll-gate.gate-visible .gate-blackout {
      opacity: 0;
      transition-delay: 0.2s;
    }

    /* --- 背景装饰 --- */
    .scroll-bg-decoration {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      overflow: hidden;
    }

    .bg-sun-glow {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 800px;
      background: radial-gradient(
        circle,
        rgba(245, 158, 11, 0.15) 0%,
        rgba(245, 158, 11, 0.08) 30%,
        rgba(245, 158, 11, 0.03) 50%,
        transparent 70%
      );
      border-radius: 50%;
      animation: bg-glow-pulse 4s ease-in-out infinite;
    }

    .bg-cloud {
      position: absolute;
      background: radial-gradient(
        ellipse,
        rgba(255, 255, 255, 0.03) 0%,
        transparent 70%
      );
      border-radius: 50%;
      animation: cloud-float 20s ease-in-out infinite;
    }

    .bg-cloud-1 {
      width: 400px;
      height: 200px;
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    .bg-cloud-2 {
      width: 500px;
      height: 250px;
      bottom: 20%;
      right: 10%;
      animation-delay: -10s;
    }

    @keyframes bg-glow-pulse {
      0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
    }

    @keyframes cloud-float {
      0%, 100% { transform: translateX(0); }
      50% { transform: translateX(30px); }
    }

    /* --- 卷轴容器 --- */
    .scroll-container {
      position: relative;
      z-index: 10;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90vw;
      max-width: 800px;
      transform: scale(0.8);
      opacity: 0;
      transition: transform 2s cubic-bezier(0.4, 0, 0.2, 1), opacity 2s ease;
    }

    .scroll-gate.scroll-unfolding .scroll-container {
      transform: scale(1);
      opacity: 1;
    }

    .scroll-gate.scroll-rolling-up .scroll-container {
      transform: translateY(-100vh) scale(0.9);
      opacity: 0;
      transition: transform 0.5s cubic-bezier(0.6, 0, 0.4, 1), opacity 0.5s ease;
    }

    /* --- 卷轴上下轴 --- */
    .scroll-rod {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .scroll-rod-top,
    .scroll-rod-bottom {
      width: 100%;
      height: 60px;
    }

    .scroll-rod-bottom {
      margin-top: -5px;
    }

    .rod-body {
      flex: 1;
      height: 100%;
      background: linear-gradient(
        180deg,
        #D97706 0%,
        #F59E0B 30%,
        #FCD34D 50%,
        #F59E0B 70%,
        #D97706 100%
      );
      border-radius: 30px;
      box-shadow: 
        0 4px 20px rgba(245, 158, 11, 0.4),
        inset 0 2px 10px rgba(255, 255, 255, 0.3),
        inset 0 -2px 10px rgba(0, 0, 0, 0.2);
      position: relative;
    }

    .rod-cap {
      position: absolute;
      width: 80px;
      height: 80px;
      background: radial-gradient(
        circle at 30% 30%,
        #FCD34D 0%,
        #F59E0B 50%,
        #D97706 100%
      );
      border-radius: 50%;
      box-shadow: 
        0 4px 15px rgba(245, 158, 11, 0.5),
        inset -2px -2px 5px rgba(0, 0, 0, 0.3);
      z-index: 5;
    }

    .rod-cap-left {
      left: -40px;
    }

    .rod-cap-right {
      right: -40px;
    }

    .rod-decoration {
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: repeating-linear-gradient(
        90deg,
        transparent,
        transparent 20px,
        rgba(180, 83, 9, 0.3) 20px,
        rgba(180, 83, 9, 0.3) 22px
      );
      border-radius: 30px;
      pointer-events: none;
    }

    .rod-tassel {
      position: absolute;
      bottom: -60px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      z-index: 3;
    }

    .tassel-string {
      width: 3px;
      height: 30px;
      background: linear-gradient(180deg, #D97706, #DC2626);
    }

    .tassel-body {
      width: 30px;
      height: 50px;
      background: linear-gradient(
        180deg,
        #DC2626 0%,
        #B91C1C 50%,
        #7F1D1D 100%
      );
      border-radius: 0 0 15px 15px;
      box-shadow: 0 4px 10px rgba(220, 38, 38, 0.4);
      position: relative;
    }

    .tassel-body::before {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 20px;
      background: radial-gradient(
        ellipse at top,
        #DC2626 0%,
        transparent 70%
      );
      filter: blur(2px);
    }

    /* --- 卷轴主体（圣旨纸张） --- */
    .scroll-body {
      width: 100%;
      min-height: 400px;
      max-height: 60vh;
      position: relative;
      overflow: hidden;
    }

    .scroll-paper {
      position: relative;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        180deg,
        #FEF3C7 0%,
        #FDE68A 50%,
        #FEF3C7 100%
      );
      box-shadow: 
        0 10px 40px rgba(0, 0, 0, 0.3),
        inset 0 0 60px rgba(245, 158, 11, 0.1);
      overflow: hidden;
    }

    .paper-texture {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: 
        url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
      opacity: 0.5;
      pointer-events: none;
    }

    .paper-border {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 60px;
      background: linear-gradient(
        90deg,
        rgba(245, 158, 11, 0.2) 0%,
        rgba(245, 158, 11, 0.1) 50%,
        rgba(245, 158, 11, 0.2) 100%
      );
      border-left: 2px solid rgba(217, 119, 6, 0.3);
      border-right: 2px solid rgba(217, 119, 6, 0.3);
    }

    .paper-border-left {
      left: 0;
    }

    .paper-border-right {
      right: 0;
    }

    /* --- 文字内容区域 --- */
    .scroll-content {
      position: relative;
      padding: 60px 80px 40px;
      text-align: center;
      z-index: 10;
    }

    .scroll-line {
      font-family: 'Noto Serif SC', 'Songti SC', serif;
      font-size: clamp(1.125rem, 2.5vw, 1.5rem);
      margin: 0.75rem 0;
      line-height: 1.8;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .scroll-line.line-revealed {
      opacity: 1;
      transform: translateY(0);
    }

    .scroll-line.title {
      font-size: clamp(1.5rem, 3.5vw, 2rem);
      font-weight: 900;
      background: linear-gradient(180deg, #FCD34D 0%, #F59E0B 50%, #D97706 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 30px rgba(245, 158, 11, 0.5);
      margin-bottom: 1.5rem;
      letter-spacing: 0.1em;
    }

    .scroll-line.content {
      color: #1A1A2E;
      font-weight: 500;
    }

    .scroll-line.ending {
      font-size: clamp(1.25rem, 3vw, 1.75rem);
      font-weight: 700;
      color: #DC2626;
      margin-top: 2rem;
      letter-spacing: 0.2em;
    }

    /* 鎏金浮现效果 */
    .scroll-line.line-revealed.content,
    .scroll-line.line-revealed.ending {
      animation: gold-shimmer 1.5s ease-out;
    }

    @keyframes gold-shimmer {
      0% {
        background-position: -200% center;
      }
      100% {
        background-position: 200% center;
      }
    }

    /* --- 玉玺印章 --- */
    .scroll-seal {
      position: absolute;
      bottom: 20px;
      right: 80px;
      width: 100px;
      height: 100px;
      z-index: 20;
      opacity: 0;
      transform: scale(0.8);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .scroll-gate.scroll-fully-open .scroll-seal {
      opacity: 1;
      transform: scale(1);
      transition-delay: 2s;
    }

    .seal-border {
      width: 100%;
      height: 100%;
      border: 4px solid #DC2626;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(220, 38, 38, 0.05);
      box-shadow: 
        0 0 20px rgba(220, 38, 38, 0.3),
        inset 0 0 10px rgba(220, 38, 38, 0.1);
    }

    .seal-svg {
      width: 80%;
      height: 80%;
    }

    /* --- 响应式设计 --- */
    @media (max-width: 768px) {
      .scroll-container {
        width: 95vw;
        max-width: 500px;
      }

      .scroll-rod-top,
      .scroll-rod-bottom {
        height: 40px;
      }

      .rod-cap {
        width: 50px;
        height: 50px;
      }

      .rod-cap-left {
        left: -25px;
      }

      .rod-cap-right {
        right: -25px;
      }

      .scroll-content {
        padding: 40px 50px 30px;
      }

      .paper-border {
        width: 30px;
      }

      .scroll-seal {
        width: 70px;
        height: 70px;
        bottom: 15px;
        right: 40px;
      }

      .rod-tassel {
        display: none;
      }
    }

    /* --- 无障碍支持 --- */
    @media (prefers-reduced-motion: reduce) {
      .scroll-container,
      .scroll-line,
      .scroll-seal,
      .gate-blackout {
        transition: none !important;
        animation: none !important;
      }

      .scroll-gate.scroll-unfolding .scroll-container,
      .scroll-gate.scroll-fully-open .scroll-container {
        transform: scale(1);
        opacity: 1;
      }

      .scroll-line.line-revealed {
        opacity: 1;
        transform: none;
      }
    }

    /* --- 性能优化 --- */
    .scroll-container,
    .scroll-rod,
    .rod-cap,
    .scroll-paper {
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
