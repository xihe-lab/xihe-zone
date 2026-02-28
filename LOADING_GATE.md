# 宫殿大门加载动画 🌞🏛️

> 为羲和实验室首页创建的沉浸式加载动画，让访客体验进入宫殿的仪式感

---

## 📋 功能特性

### 视觉效果
- ✨ **中国神话风格**：金色、红色配色方案
- 🚪 **两扇对开大门**：3D 透视动画效果
- ☀️ **太阳图腾装饰**：SVG 绘制的太阳光芒
- 🔔 **门环细节**：轻微摆动的门环动画
- 💫 **太阳光晕背景**：脉动的光芒效果

### 技术实现
- 🎨 **纯 CSS + SVG**：无需外部图片资源
- ⚡ **GPU 加速**：使用 `transform` 和 `will-change` 优化性能
- ♿ **无障碍支持**：支持 `prefers-reduced-motion`
- 📱 **响应式设计**：适配移动端和桌面端

---

## 🎬 动画流程

```
1. 页面加载 → 显示关闭的宫殿大门 (0ms)
2. 大门缓缓向两侧打开 (500ms - 2500ms)
3. 门后透出太阳光芒 (持续)
4. 大门完全打开后淡出 (2500ms - 3500ms)
5. 显示首页内容 (3500ms+)
```

---

## 📁 文件结构

```
xihe-zone/
├── index.html              # 主入口（已集成）
├── js/
│   ├── loading-gate.js     # 加载动画脚本
│   └── main.js             # 主脚本
└── src/
    ├── index.html          # 源码入口（已集成）
    ├── js/
    │   └── loading-gate.js # 加载动画脚本（源码）
    └── components/
        ├── LoadingGate.jsx # React 组件版本（备用）
        └── LoadingGate.css # 样式文件（备用）
```

---

## 🔧 使用方法

### 方式一：纯 HTML/JS（当前使用）

在 HTML 文件的 `<body>` 结束标签前添加：

```html
<!-- 加载动画 -->
<script src="js/loading-gate.js"></script>
<script src="js/main.js"></script>
```

动画会自动初始化并在 3.5 秒后自动淡出。

### 方式二：React 组件

如果使用 React，可以导入组件：

```jsx
import LoadingGate from './components/LoadingGate';

function App() {
  const [loading, setLoading] = useState(true);
  
  return (
    <>
      {loading && <LoadingGate onComplete={() => setLoading(false)} />}
      <HomePage />
    </>
  );
}
```

---

## 🎨 自定义配置

### 修改动画时长

编辑 `js/loading-gate.js` 中的定时器：

```javascript
// 大门打开延迟（默认 500ms）
setTimeout(() => {
  loadingGate.classList.add('gate-open');
}, 500);  // 修改此值

// 淡出延迟（默认 2500ms）
setTimeout(() => {
  loadingGate.classList.add('gate-fading');
}, 2500);  // 修改此值

// 移除延迟（默认 3500ms）
setTimeout(() => {
  // 移除元素
}, 3500);  // 修改此值
```

### 修改颜色方案

在 CSS 部分修改颜色变量：

```css
/* 金色系 */
--sun-gold: #F59E0B;
--sun-gold-light: #FCD34D;
--sun-gold-dark: #D97706;

/* 红色系 */
--sun-red: #DC2626;
```

### 修改门钉数量

编辑 `loading-gate.js` 中的门钉生成代码：

```javascript
// 当前：4x4 = 16 个门钉
${Array(16).fill('<div class="stud"></div>').join('')}

// 改为 3x3 = 9 个门钉
${Array(9).fill('<div class="stud"></div>').join('')}
```

---

## ♿ 无障碍支持

动画自动检测用户的系统偏好设置：

```css
@media (prefers-reduced-motion: reduce) {
  /* 禁用所有动画 */
  .gate-door {
    transition: transform 0.01ms !important;
  }
  
  .sun-core, .sun-rays, .knocker-ring {
    animation: none !important;
  }
}
```

如果用户系统设置了"减少动画"，大门会立即打开，跳过所有动画效果。

---

## 🚀 性能优化

### GPU 加速
- 使用 `transform: translateZ(0)` 触发硬件加速
- 使用 `will-change` 提示浏览器优化
- 使用 `backface-visibility: hidden` 减少渲染

### 资源优化
- 纯 CSS + SVG，无外部图片请求
- 内联样式，减少 HTTP 请求
- 动画结束后自动移除 DOM 元素

---

## 📊 浏览器兼容性

| 浏览器 | 版本 | 支持 |
|--------|------|------|
| Chrome | 60+ | ✅ |
| Firefox | 55+ | ✅ |
| Safari | 12+ | ✅ |
| Edge | 79+ | ✅ |
| 移动端 | 现代浏览器 | ✅ |

---

## 🎯 设计理念

> "让每一次访问都成为进入神殿的仪式"

这个加载动画不仅仅是等待页面加载的过渡，而是用户体验的一部分。通过中国神话元素和现代动画技术的结合，创造出独特的品牌印象。

---

## 📝 技术栈

- **纯 JavaScript** - 无依赖
- **CSS3 Animations** - 流畅动画
- **SVG** - 矢量图形
- **Intersection Observer** - 性能优化（可选）

---

## 🔮 未来扩展

- [ ] 添加音效（门打开的声音）
- [ ] 添加更多神话元素（龙纹、云纹）
- [ ] 支持主题切换（白天/黑夜模式）
- [ ] 添加 Easter Egg（点击门环触发特殊效果）

---

*设计：羲和实验室 鲁班 🔨*  
*技术实现：羲和实验室 墨子 ⚙️*  
*版本：v1.0*  
*最后更新：2026-02-28*
