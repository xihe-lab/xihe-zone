/**
 * 太阳神宫 · 卷轴圣旨加载动画组件
 * 设计：鲁班 🔨
 * 技术实现：墨子 ⚙️
 * 风格：古卷质感 + 鎏金描边 + 微光特效
 * 
 * 动画时序（严格执行）：
 * 1. 0ms - 全屏黑底
 * 2. 500ms - 卷轴开始展开（从中间向左右）
 * 3. 2500ms - 卷轴完全展开
 * 4. 2500-4500ms - 文字逐行鎏金浮现（2000ms）
 * 5. 5000ms - 卷轴定格
 * 6. 5500ms - 卷轴向上收起
 * 7. 6000ms - 进入首页
 */

/**
 * 卷轴圣旨文字内容
 */
const SCROLL_TEXT_LINES = [
  { text: '奉天承运，太阳诏曰：', type: 'title', delay: 0 },
  { text: '羲和者，太阳女神也。', type: 'content', delay: 200 },
  { text: '驾日车以巡天，', type: 'content', delay: 400 },
  { text: '掌光明而御时。', type: 'content', delay: 600 },
  { text: '今数字纪元开启，', type: 'content', delay: 800 },
  { text: '特建太阳神宫于此。', type: 'content', delay: 1000 },
  { text: '宫中有七位神使，', type: 'content', delay: 1200 },
  { text: '各司其职，共襄盛举。', type: 'content', delay: 1400 },
  { text: '尔等有缘之人，', type: 'content', delay: 1600 },
  { text: '可入宫探索，', type: 'content', delay: 1800 },
  { text: '得见数字文明之曙光。', type: 'content', delay: 2000 },
  { text: '钦此。', type: 'ending', delay: 2200 }
];

/**
 * 辅助函数：延迟
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 生成卷轴文字 HTML
 */
function generateScrollTextHTML() {
  return SCROLL_TEXT_LINES.map((line, index) => `
    <p class="scroll-line ${line.type}" data-index="${index}" style="opacity: 0;">
      ${line.text}
    </p>
  `).join('');
}

/**
 * 创建并初始化卷轴加载动画
 * @param {Function} onComplete - 动画完成后的回调函数
 */
async function initScrollLoading(onComplete) {
  // 创建加载动画容器
  const scrollLoading = document.createElement('div');
  scrollLoading.className = 'scroll-loading';
  scrollLoading.id = 'scrollLoading';
  
  scrollLoading.innerHTML = `
    <!-- 全屏黑底 -->
    <div class="gate-blackout"></div>
    
    <!-- 背景装饰 -->
    <div class="scroll-bg-decoration">
      <div class="bg-cloud bg-cloud-1"></div>
      <div class="bg-cloud bg-cloud-2"></div>
      <div class="bg-sun-glow"></div>
    </div>
    
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
            ${generateScrollTextHTML()}
          </div>
          
          <!-- 玉玺印章 -->
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
  `;
  
  // 添加到页面
  document.body.insertBefore(scrollLoading, document.body.firstChild);
  
  // 等待 DOM 渲染
  await delay(50);
  
  // 执行动画序列（严格按照时序）
  runScrollAnimation(scrollLoading, onComplete);
  
  return scrollLoading;
}

/**
 * 执行卷轴动画序列（严格按照指定时序）
 */
async function runScrollAnimation(scrollLoading, onComplete) {
  const timeline = {
    start: 0,           // 0ms - 初始状态
    scrollUnfold: 500,  // 500ms - 卷轴开始展开
    scrollFullyOpen: 2500,  // 2500ms - 卷轴完全展开
    textRevealStart: 2500,  // 2500ms - 文字开始浮现
    textRevealEnd: 4500,    // 4500ms - 文字全部显示
    scrollHold: 5000,       // 5000ms - 卷轴定格
    scrollRollUp: 5500,     // 5500ms - 卷轴向上收起
    enterHome: 6000         // 6000ms - 进入首页
  };
  
  // 0ms - 显示加载动画（黑屏）
  setTimeout(() => {
    scrollLoading.classList.add('gate-visible');
  }, timeline.start);
  
  // 500ms - 卷轴开始展开（从中间向左右）
  setTimeout(() => {
    scrollLoading.classList.add('scroll-unfolding');
  }, timeline.scrollUnfold);
  
  // 2500ms - 卷轴完全展开，开始文字浮现
  setTimeout(() => {
    scrollLoading.classList.add('scroll-fully-open');
    revealTextLines(scrollLoading);
  }, timeline.scrollFullyOpen);
  
  // 5000ms - 卷轴定格（文字已全部显示）
  setTimeout(() => {
    scrollLoading.classList.add('scroll-hold');
  }, timeline.scrollHold);
  
  // 5500ms - 卷轴向上收起
  setTimeout(() => {
    scrollLoading.classList.add('scroll-rolling-up');
  }, timeline.scrollRollUp);
  
  // 6000ms - 进入首页（淡出加载动画）
  setTimeout(() => {
    scrollLoading.classList.add('gate-fading');
    
    // 完全移除组件
    setTimeout(() => {
      if (scrollLoading.parentNode) {
        scrollLoading.parentNode.removeChild(scrollLoading);
      }
      if (onComplete) {
        onComplete();
      }
    }, 800);
  }, timeline.enterHome);
}

/**
 * 逐行显示文字（鎏金浮现效果）
 * 时序：2500-4500ms（共 2000ms，12 行文字）
 */
function revealTextLines(scrollLoading) {
  const lines = scrollLoading.querySelectorAll('.scroll-line');
  
  lines.forEach((line, index) => {
    const lineData = SCROLL_TEXT_LINES[index];
    // 使用预设的延迟时间（相对于文字开始显示时间 2500ms）
    const delay = lineData ? lineData.delay : index * 150;
    
    setTimeout(() => {
      line.classList.add('line-revealed');
      line.style.opacity = '1';
    }, delay);
  });
}

/**
 * 导出函数
 */
export { initScrollLoading };

console.log('⚙️ 卷轴加载动画模块已加载 - 墨子实现（严格按时序）');
