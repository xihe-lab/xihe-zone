# 宫殿大门加载动画 - 快速测试指南 🌞

## 🚀 快速测试

### 方法一：本地预览（推荐）

1. **启动本地服务器**
   ```bash
   cd xihe-zone
   python3 -m http.server 8080
   ```

2. **在浏览器中打开**
   ```
   http://localhost:8080/index.html
   ```

3. **观察动画效果**
   - 0-0.5 秒：宫殿大门关闭状态
   - 0.5-2.5 秒：大门缓缓打开
   - 2.5-3.5 秒：大门淡出
   - 3.5 秒后：显示首页内容

### 方法二：使用 VitePress 开发服务器

```bash
cd xihe-zone
npm run dev
```

然后访问显示的本地地址（通常是 http://localhost:5173）

---

## ✅ 验证清单

### 视觉效果
- [ ] 宫殿大门为对开两扇门
- [ ] 门上有太阳图腾装饰（SVG）
- [ ] 门钉排列整齐（4x4 网格）
- [ ] 门环有轻微摆动动画
- [ ] 门楣显示"太阳神宫"文字
- [ ] 背景有太阳光晕效果

### 动画效果
- [ ] 大门在 0.5 秒后开始打开
- [ ] 打开过程持续约 2 秒
- [ ] 大门向两侧旋转打开（3D 效果）
- [ ] 打开后大门淡出（0.8 秒）
- [ ] 动画流畅，无卡顿

### 响应式设计
- [ ] 桌面端显示正常（800px 宽大门）
- [ ] 移动端自动缩小（90vw 宽度）
- [ ] 门钉数量在移动端减少（3x3）

### 无障碍支持
- [ ] 在系统设置"减少动画"后，大门立即打开
- [ ] 动画可被跳过，不影响内容访问

### 性能
- [ ] 动画使用 GPU 加速
- [ ] 无外部图片加载
- [ ] 动画结束后 DOM 元素被移除

---

## 🐛 常见问题

### 问题 1：动画不显示

**原因：** JavaScript 文件未正确加载

**解决：**
```html
<!-- 确保在 </body> 前添加 -->
<script src="js/loading-gate.js"></script>
```

### 问题 2：大门打开方向错误

**原因：** CSS transform-origin 设置错误

**解决：** 检查以下 CSS：
```css
.gate-door-left {
  transform-origin: left center;  /* 左门绕左侧旋转 */
}

.gate-door-right {
  transform-origin: right center;  /* 右门绕右侧旋转 */
}
```

### 问题 3：动画卡顿

**原因：** 未使用 GPU 加速

**解决：** 确保 CSS 包含：
```css
.gate-door, .sun-core, .sun-rays {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### 问题 4：移动端显示异常

**原因：** 未适配小屏幕

**解决：** 检查响应式媒体查询：
```css
@media (max-width: 768px) {
  .gate-container {
    width: 90vw;
    height: 70vh;
  }
}
```

---

## 📱 移动端测试

在 Chrome DevTools 中测试移动端：

1. 打开 DevTools (F12)
2. 点击设备切换按钮 (Ctrl+Shift+M)
3. 选择设备：
   - iPhone 12 Pro (390x844)
   - Pixel 5 (393x851)
   - iPad Air (820x1180)

---

## 🎨 自定义测试

### 测试不同颜色方案

临时修改 CSS 变量：

```javascript
// 在浏览器控制台执行
document.querySelector('#loadingGateStyles').textContent += `
  .sun-core {
    background: radial-gradient(circle, #FF6B6B 0%, #DC2626 40%, #991B1B 70%, transparent 80%);
  }
`;
```

### 测试不同动画速度

在控制台修改动画时长：

```javascript
// 加速测试（0.5 秒完成）
const styles = document.querySelector('#loadingGateStyles');
styles.textContent = styles.textContent.replace(
  /transition: transform 2s/g,
  'transition: transform 0.5s'
);
```

---

## 📊 性能测试

使用 Chrome DevTools Performance 面板：

1. 打开 DevTools (F12)
2. 切换到 Performance 面板
3. 点击录制按钮
4. 刷新页面
5. 停止录制
6. 检查：
   - FPS 是否稳定在 60
   - 是否有长任务（Long Task）
   - Layout Shift 是否为 0

---

## 🌐 跨浏览器测试

| 浏览器 | 测试状态 | 备注 |
|--------|---------|------|
| Chrome 90+ | ✅ | 完美支持 |
| Firefox 88+ | ✅ | 完美支持 |
| Safari 14+ | ✅ | 完美支持 |
| Edge 90+ | ✅ | 完美支持 |
| iOS Safari 14+ | ✅ | 移动端优化 |
| Android Chrome 90+ | ✅ | 移动端优化 |

---

## 📝 测试报告模板

```markdown
## 测试报告

**测试日期：** 2026-02-28
**测试人员：** [姓名]
**测试环境：** [浏览器/设备]

### 视觉效果
- [ ] 宫殿大门显示正常
- [ ] 太阳图腾清晰
- [ ] 颜色符合设计

### 动画流畅度
- [ ] 打开动画流畅
- [ ] 淡出效果自然
- [ ] 无卡顿现象

### 响应式
- [ ] 桌面端正常
- [ ] 平板端正常
- [ ] 手机端正常

### 性能
- [ ] FPS 稳定
- [ ] 无内存泄漏
- [ ] 加载速度快

### 问题记录
[如有问题，请详细描述]

### 改进建议
[如有建议，请列出]
```

---

*测试愉快！🌞*
