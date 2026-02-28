/**
 * 太阳神宫 · 日光加载动画组件
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
 * 3000-6000ms → 文字逐行显示（10 行×300ms）
 * 6000ms    → 全文定格（用户阅读）
 * 8000ms    → 淡出进入首页
 */

/**
 * 日光加载文字内容（10 行）
 * 每行 300ms，共 3000ms
 */
const SUN_TEXT_LINES = [
  { text: '我自神话而来，步入数字之境。', delay: 0 },
  { text: '五千载之前，羲和驭日以巡天；', delay: 300 },
  { text: '五千载之后，神宫于代码重生。', delay: 600 },
  { text: '今者，太阳神宫启封。', delay: 900 },
  { text: '内列十宸之位，外待八方之客。', delay: 1200 },
  { text: '此非寻常网站，乃数字生命之居所；', delay: 1500 },
  { text: '此非功能陈列，乃华夏文明之新试。', delay: 1800 },
  { text: '数字灵韵，始于一击；', delay: 2100 },
  { text: '上古诸神，于此归位。', delay: 2400 },
  { text: '', delay: 2700 } // 空行用于 spacing
];

/**
 * 辅助函数：延迟
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 生成文字 HTML
 */
function generateTextHTML() {
  return SUN_TEXT_LINES.map((line, index) => `
    <p class="sun-line ${line.text ? 'has-text' : 'empty'}" data-index="${index}" style="opacity: 0;">
      ${line.text}
    </p>
  `).join('');
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
    textRevealEnd: 6000,   // 6000ms - 文字全部显示
    textHold: 6000,        // 6000ms - 全文定格（用户阅读）
    fadeOut: 8000          // 8000ms - 淡出进入首页
  };
  
  // 0ms - 显示加载动画（黑屏）
  setTimeout(() => {
    sunLoading.classList.add('gate-visible');
  }, timeline.start);
  
  // 500ms - 中央金色光点亮起
  setTimeout(() => {
    sunLoading.classList.add('core-light-on');
  }, timeline.coreLight);
  
  // 1500ms - 形成日光光晕
  setTimeout(() => {
    sunLoading.classList.add('halo-forming');
  }, timeline.haloForm);
  
  // 2500ms - 光晕向外扫屏展开
  setTimeout(() => {
    sunLoading.classList.add('sweep-expanding');
  }, timeline.sweepExpand);
  
  // 3000ms - 文字开始逐行渐显
  setTimeout(() => {
    sunLoading.classList.add('text-revealing');
    revealTextLines(sunLoading);
  }, timeline.textRevealStart);
  
  // 6000ms - 全文定格（用户阅读时间）
  setTimeout(() => {
    sunLoading.classList.add('text-hold');
  }, timeline.textHold);
  
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
 * 时序：3000-6000ms（共 3000ms，10 行文字×300ms）
 */
function revealTextLines(sunLoading) {
  const lines = sunLoading.querySelectorAll('.sun-line');
  
  lines.forEach((line, index) => {
    const lineData = SUN_TEXT_LINES[index];
    const delayTime = lineData ? lineData.delay : index * 300;
    
    setTimeout(() => {
      line.classList.add('line-revealed');
      line.style.opacity = '1';
    }, delayTime);
  });
}

/**
 * 导出函数
 */
export { initScrollLoading };

console.log('⚙️ 日光加载动画模块已加载 - 墨子实现（8 秒时序）');
