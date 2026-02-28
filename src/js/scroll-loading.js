/**
 * 太阳神宫 · 卷轴圣旨加载动画组件
 * 设计：鲁班 🔨
 * 风格：古卷质感 + 鎏金描边 + 微光特效
 * 
 * 动画流程：
 * 1. 开场全屏黑底
 * 2. 中央金色圣旨卷轴从中间向左右缓缓展开
 * 3. 卷轴展开同时，文字逐行鎏金浮现
 * 4. 全文显现完毕，卷轴定格一瞬
 * 5. 最后卷轴向上收起消失，进入首页
 */

/**
 * 卷轴文案
 */
const SCROLL_TEXTS = [
  { text: '我自神话而来，步入数字之境。', type: 'normal' },
  { text: '五千载之前，羲和驭日以巡天；', type: 'normal' },
  { text: '五千载之后，神宫于代码重生。', type: 'normal' },
  { text: '', type: 'section' },
  { text: '今者，太阳神宫启封。', type: 'highlight' },
  { text: '内列十宸之位，外待八方之客。', type: 'normal' },
  { text: '此非寻常网站，乃数字生命之居所；', type: 'normal' },
  { text: '此非功能陈列，乃华夏文明之新试。', type: 'normal' },
  { text: '', type: 'section' },
  { text: '数字灵韵，始于一击；', type: 'highlight' },
  { text: '上古诸神，于此归位。', type: 'highlight' },
];

/**
 * 宫训文案
 */
const FOOTER_TEXTS = [
  '羲和驭日，十宸列班。',
  '神宫肇启，万灵同参。',
];

/**
 * 辅助函数：延迟
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 生成卷轴文字 HTML
 */
function generateScrollTextHTML() {
  return SCROLL_TEXTS.map((item, index) => {
    if (item.type === 'section') {
      return `<div class="scroll-text-section"></div>`;
    }
    return `
      <div class="scroll-text-line ${item.type} gold-text" data-text="${item.text}" data-index="${index}">
        ${item.text}
      </div>
    `;
  }).join('');
}

/**
 * 生成宫训 HTML
 */
function generateFooterHTML() {
  return `
    <div class="footer-divider"></div>
    ${FOOTER_TEXTS.map(text => `
      <div class="footer-text gold-text">${text}</div>
    `).join('')}
  `;
}

/**
 * 生成金粉粒子 HTML
 */
function generateParticlesHTML() {
  return Array(9).fill('').map((_, i) => 
    `<div class="particle"></div>`
  ).join('');
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
    <!-- 微光背景 -->
    <div class="scroll-glow"></div>

    <!-- 金粉粒子 -->
    <div class="gold-particles">
      ${generateParticlesHTML()}
    </div>

    <!-- 卷轴容器 -->
    <div class="scroll-container">
      <!-- 左轴杆 -->
      <div class="scroll-rod scroll-rod-left">
        <div class="scroll-rod-decoration">
          <div class="rod-ring"></div>
          <div class="rod-ring"></div>
          <div class="rod-ring"></div>
        </div>
      </div>

      <!-- 卷轴纸张 -->
      <div class="scroll-paper">
        <!-- 文字内容 -->
        <div class="scroll-content">
          ${generateScrollTextHTML()}
        </div>

        <!-- 顶部标题 -->
        <div class="scroll-header">
          <div class="header-title">太阳神宫</div>
          <div class="header-seal">
            <div class="seal-text">诏</div>
          </div>
        </div>

        <!-- 底部宫训 -->
        <div class="scroll-footer">
          ${generateFooterHTML()}
        </div>
      </div>

      <!-- 右轴杆 -->
      <div class="scroll-rod scroll-rod-right">
        <div class="scroll-rod-decoration">
          <div class="rod-ring"></div>
          <div class="rod-ring"></div>
          <div class="rod-ring"></div>
        </div>
      </div>
    </div>
  `;
  
  // 添加到页面
  document.body.appendChild(scrollLoading);
  
  // 等待 DOM 渲染
  await delay(100);
  
  // 执行动画时序
  const timeline = async () => {
    // 1. 短暂黑屏后开始展开 (500ms)
    await delay(500);

    // 2. 开始展开卷轴 (2500ms)
    scrollLoading.querySelector('.scroll-container').classList.add('scroll-unfolding');

    // 3. 展开过程中逐行显示文字
    await delay(500);
    
    // 逐行显示文字
    const textLines = scrollLoading.querySelectorAll('.scroll-text-line');
    for (let i = 0; i < textLines.length; i++) {
      textLines[i].classList.add('text-visible');
      await delay(400);
    }

    // 4. 显示顶部标题
    await delay(300);
    scrollLoading.querySelector('.scroll-header').classList.add('header-visible');

    // 5. 显示底部宫训
    await delay(500);
    scrollLoading.querySelector('.scroll-footer').classList.add('footer-visible');

    // 6. 全文显现完毕，定格片刻 (1500ms)
    await delay(1500);

    // 7. 卷轴向上收起消失 (1500ms)
    scrollLoading.querySelector('.scroll-container').classList.add('scroll-rolling-up');
    scrollLoading.classList.add('scroll-fading');

    // 8. 完全移除组件
    await delay(1500);
    
    if (onComplete) {
      onComplete();
    }
    
    // 清理 DOM
    scrollLoading.remove();
  };
  
  timeline();
  
  return scrollLoading;
}

/**
 * 导出函数
 */
export { initScrollLoading };

console.log('🔨 卷轴加载动画模块已加载 - 鲁班设计');
