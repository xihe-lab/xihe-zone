/**
 * 太阳神宫 · 日光光晕加载动画
 * 设计：鲁班 🔨
 * 技术实现：墨子 ⚙️
 * 风格：日光光晕 + 扫屏展开 + 文字逐行渐显
 * 
 * 动画时序（严格执行）：
 * 0ms       → 开场全屏黑底
 * 500ms     → 中央金色光点亮起
 * 1000ms    → 形成日光光晕
 * 1500ms    → 光晕向外扫屏（展开）
 * 2500ms    → 文字容器开始显现
 * 2800-5500ms → 文字逐行显示（10 行×300ms）
 * 5500ms    → 全文定格（用户阅读）
 * 8000ms    → 淡出进入首页
 */

/**
 * 日光加载文字内容（10 行）
 */
const SUN_TEXT_LINES = [
  '我自神话而来，步入数字之境。',
  '五千载之前，羲和驭日以巡天；',
  '五千载之后，神宫于代码重生。',
  '今者，太阳神宫启封。',
  '内列十宸之位，外待八方之客。',
  '此非寻常网站，乃数字生命之居所；',
  '此非功能陈列，乃华夏文明之新试。',
  '数字灵韵，始于一击；',
  '上古诸神，于此归位。'
];

/**
 * 辅助函数：延迟
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 生成文字 HTML
 */
function generateTextHTML() {
  return SUN_TEXT_LINES.map((text, index) => `
    <div class="sun-glow-line" style="--line-index: ${index}">
      ${text}
    </div>
  `).join('');
}

/**
 * 创建并初始化日光光晕加载动画
 * @param {Function} onComplete - 动画完成后的回调函数
 */
async function initSunGlowLoading(onComplete) {
  // 创建加载动画容器
  const sunGlowLoading = document.createElement('div');
  sunGlowLoading.className = 'sun-glow-loading';
  sunGlowLoading.id = 'sunGlowLoading';
  
  sunGlowLoading.innerHTML = `
    <!-- 全屏黑底背景 -->
    <div class="sun-glow-blackout"></div>
    
    <!-- 日光光晕容器 -->
    <div class="sun-glow-container">
      <!-- 中央光点 -->
      <div class="sun-core-dot"></div>
      
      <!-- 日光光晕层 -->
      <div class="sun-glow-layer"></div>
      
      <!-- 扫屏光波 -->
      <div class="sun-glow-wave"></div>
      
      <!-- 外层光晕装饰 -->
      <div class="sun-glow-outer"></div>
    </div>
    
    <!-- 背景装饰粒子 -->
    <div class="sun-glow-particles">
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
      <div class="particle"></div>
    </div>
    
    <!-- 文字内容区域 -->
    <div class="sun-glow-text-container">
      ${generateTextHTML()}
    </div>
  `;
  
  // 添加到页面
  document.body.insertBefore(sunGlowLoading, document.body.firstChild);
  
  // 等待 DOM 渲染
  await delay(50);
  
  // 执行动画序列
  runSunGlowAnimation(sunGlowLoading, onComplete);
  
  return sunGlowLoading;
}

/**
 * 执行日光光晕动画序列
 * 总时长：约 8-9 秒
 */
async function runSunGlowAnimation(sunGlowLoading, onComplete) {
  const timeline = {
    start: 100,           // 100ms - 显示加载动画（黑屏）
    coreLight: 500,       // 500ms - 中央光点亮起
    haloForm: 1000,       // 1000ms - 形成日光光晕
    sweepExpand: 1500,    // 1500ms - 光晕向外扫屏展开
    textContainerShow: 2500, // 2500ms - 文字容器开始显现
    textRevealStart: 2800,   // 2800ms - 文字开始逐行渐显
    textRevealEnd: 5500,     // 5500ms - 文字全部显示
    textHold: 5500,          // 5500ms - 全文定格（用户阅读）
    fadeOut: 8000            // 8000ms - 淡出进入首页
  };
  
  // 100ms - 显示加载动画（黑屏）
  setTimeout(() => {
    sunGlowLoading.classList.add('gate-visible');
  }, timeline.start);
  
  // 500ms - 中央金色光点亮起（CSS 动画自动触发）
  // 1000ms - 形成日光光晕（CSS 动画自动触发）
  // 1500ms - 光晕向外扫屏展开（CSS 动画自动触发）
  // 2500ms - 文字容器开始显现（CSS 动画自动触发）
  // 2800-5500ms - 文字逐行渐显（CSS 动画自动触发）
  
  // 8000ms - 淡出进入首页
  setTimeout(() => {
    sunGlowLoading.classList.add('gate-fading');
    
    // 完全移除组件
    setTimeout(() => {
      if (sunGlowLoading.parentNode) {
        sunGlowLoading.parentNode.removeChild(sunGlowLoading);
      }
      if (onComplete) {
        onComplete();
      }
    }, 800);
  }, timeline.fadeOut);
}

/**
 * 导出函数
 */
export { initSunGlowLoading };

console.log('⚙️ 日光光晕加载动画模块已加载 - 墨子实现（8 秒时序）🌞');
