/**
 * 羲和实验室 · 日光加载动画组件（合规版）
 * 设计：鲁班 🔨
 * 技术实现：墨子 ⚙️
 * 风格：日光光晕 + 扫屏展开 + 文字逐行渐显
 * 
 * 动画时序（严格执行）：
 * 0ms       → 开场全屏黑底
 * 500ms     → 中央金色光点亮起
 * 1500ms    → 形成日光光晕
 * 2500ms    → 光晕向外扫屏（展开）
 * 3000ms    → 文字开始逐行渐显
 * 3000-5000ms → 文字逐行显示（4 行×500ms）
 * 5000ms    → 全文定格（用户阅读）
 * 8000ms    → 淡出进入首页
 */

/**
 * 日光加载文字内容（合规版 - 4 行）
 * 每行 500ms，共 2000ms
 */
const SUN_TEXT_LINES = [
  { text: '源于上古神话，立于数字时代。', delay: 0 },
  { text: '以技术为基，以智能为翼。', delay: 500 },
  { text: '羲和实验室，专注 AI 与前沿技术探索。', delay: 1000 },
  { text: '羲和实验室 · 技术探索与创新', delay: 1500, type: 'bottom' }
];

/**
 * 辅助函数：延迟
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 生成文字 HTML
 */
function generateTextHTML() {
  return SUN_TEXT_LINES.map((line, index) => {
    const lineType = line.type || 'main';
    return `
    <p class="sun-glow-line ${lineType}" data-index="${index}" style="opacity: 0;">
      ${line.text}
    </p>
  `;
  }).join('');
}

/**
 * 创建并初始化日光加载动画
 * @param {Function} onComplete - 动画完成后的回调函数
 */
async function initScrollLoading(onComplete) {
  // 创建加载动画容器
  const sunLoading = document.createElement('div');
  sunLoading.className = 'sun-loading';
  sunLoading.id = 'sunLoading';
  
  sunLoading.innerHTML = `
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
  document.body.insertBefore(sunLoading, document.body.firstChild);
  
  // 等待 DOM 渲染
  await delay(50);
  
  // 执行动画序列（严格按照时序）
  runSunAnimation(sunLoading, onComplete);
  
  return sunLoading;
}

/**
 * 执行日光动画序列（严格按照指定时序）
 * 总时长：约 8 秒
 */
async function runSunAnimation(sunLoading, onComplete) {
  const timeline = {
    start: 0,             // 0ms - 初始黑屏
    coreLight: 500,       // 500ms - 中央光点亮起
    haloForm: 1500,       // 1500ms - 形成日光光晕
    sweepExpand: 2500,    // 2500ms - 光晕向外扫屏展开
    textRevealStart: 3000, // 3000ms - 文字开始逐行渐显
    textRevealEnd: 5000,   // 5000ms - 文字全部显示
    textHold: 7000,        // 7000ms - 全文定格（用户阅读）
    fadeOut: 8000          // 8000ms - 淡出进入首页
  };
  
  // 0ms - 显示加载动画（黑屏）
  setTimeout(() => {
    sunLoading.classList.add('gate-visible');
  }, timeline.start);
  
  // 500ms - 中央金色光点亮起（CSS 动画自动触发）
  // 1500ms - 形成日光光晕（CSS 动画自动触发）
  // 2500ms - 光晕向外扫屏展开（CSS 动画自动触发）
  
  // 3000ms - 文字开始逐行渐显
  setTimeout(() => {
    sunLoading.classList.add('text-revealing');
    revealTextLines(sunLoading);
  }, timeline.textRevealStart);
  
  // 8000ms - 淡出进入首页
  setTimeout(() => {
    sunLoading.classList.add('gate-fading');
    
    // 完全移除组件
    setTimeout(() => {
      if (sunLoading.parentNode) {
        sunLoading.parentNode.removeChild(sunLoading);
      }
      if (onComplete) {
        onComplete();
      }
    }, 800);
  }, timeline.fadeOut);
}

/**
 * 逐行显示文字（柔和金色渐显效果）
 * 时序：3000-5000ms（共 2000ms，4 行文字）
 */
function revealTextLines(sunLoading) {
  const lines = sunLoading.querySelectorAll('.sun-line');
  
  lines.forEach((line, index) => {
    const lineData = SUN_TEXT_LINES[index];
    const delayTime = lineData ? lineData.delay : index * 500;
    
    setTimeout(() => {
      line.classList.add('line-revealed');
      line.style.opacity = '1';
    }, 3000 + delayTime); // 基础延迟 3000ms + 每行延迟
  });
}

/**
 * 导出函数
 */
export { initScrollLoading };

console.log('⚙️ 日光加载动画模块已加载 - 墨子实现（8 秒时序·合规版）🌞');
