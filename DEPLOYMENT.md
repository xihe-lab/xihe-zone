# 羲和实验室 · 部署指南

> 🌞 羲和的数字神殿部署文档  
> 技术实现：墨子 ⚙️  
> 最后更新：2026-02-28

---

## 📋 目录

- [方案一：静态 HTML 部署（快速）](#方案一静态-html 部署快速)
- [方案二：VitePress + GitHub Actions（完整功能）](#方案二 vitepress-github-actions 完整功能)
- [部署方式对比](#部署方式对比)
- [常见问题](#常见问题)

---

## 方案一：静态 HTML 部署（快速）

**适用场景：** 需要快速上线，不需要 VitePress 的 Markdown 文档功能

### 文件结构

```
xihe-zone/
├── index.html              # 主页面
├── css/
│   └── main.css           # 样式文件
├── js/
│   ├── main.js           # 主逻辑
│   ├── animations.js     # 动画效果
│   └── components.js     # 组件渲染
├── public/
│   └── logo.svg          # Logo 文件
└── ...
```

### 部署步骤

#### 1. GitHub Pages 部署

1. 确保所有文件已提交到 Git：

   ```bash
   git add .
   git commit -m "deploy: 静态 HTML 版本"
   git push origin main
   ```

2. 在 GitHub 仓库设置中：
   - 进入 **Settings** → **Pages**
   - **Source** 选择 `Deploy from a branch`
   - **Branch** 选择 `main`，文件夹选择 `/ (root)`
   - 点击 **Save**

3. 等待几分钟后，访问 `https://yourusername.github.io/xihe-zone/` 即可看到网站

#### 2. 本地测试

直接双击打开 `index.html` 文件，或使用本地服务器：

```bash
# 使用 Python 快速启动本地服务器
python3 -m http.server 8080

# 或使用 Node.js 的 http-server
npx http-server -p 8080
```

然后访问 `http://localhost:8080`

### 优点

- ✅ 无需构建，立即可用
- ✅ 部署简单，直接推送代码
- ✅ GitHub Pages 原生支持
- ✅ 加载速度快

### 缺点

- ❌ 不支持 Markdown 文档
- ❌ 没有 VitePress 的搜索、导航等功能
- ❌ 内容更新需要手动编辑 HTML

---

## 方案二：VitePress + GitHub Actions（完整功能）

**适用场景：** 需要完整的文档功能、Markdown 支持、自动搜索等

### 文件结构

```
xihe-zone/
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions 工作流
├── .vitepress/
│   ├── config.js         # VitePress 配置
│   └── dist/             # 构建输出（自动生成）
├── index.md              # 首页 Markdown
├── src/                  # 源码目录（可选）
├── public/               # 静态资源
└── package.json
```

### 部署步骤

#### 1. 配置 GitHub Pages

1. 在 GitHub 仓库设置中：
   - 进入 **Settings** → **Pages**
   - **Source** 选择 `GitHub Actions`
   - 保存设置

#### 2. 推送代码触发自动部署

```bash
# 提交所有更改
git add .
git commit -m "feat: 配置 VitePress 自动部署"
git push origin main
```

#### 3. 查看部署状态

- 进入 GitHub 仓库的 **Actions** 标签页
- 查看最新的部署工作流运行状态
- 部署成功后，会显示网站 URL

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（热重载）
npm run dev

# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

### 优点

- ✅ 支持 Markdown 文档
- ✅ 自动搜索功能
- ✅ 响应式导航
- ✅ 代码高亮
- ✅ 自动目录生成
- ✅ 完整的 CI/CD 流程

### 缺点

- ❌ 需要构建步骤
- ❌ 部署时间稍长（约 1-2 分钟）
- ❌ 需要 Node.js 环境

---

## 部署方式对比

| 特性              | 方案一（静态 HTML） | 方案二（VitePress）    |
| ----------------- | ------------------- | ---------------------- |
| **部署速度**      | ⚡ 即时             | 🐢 1-2 分钟            |
| **配置复杂度**    | 简单                | 中等                   |
| **Markdown 支持** | ❌                  | ✅                     |
| **搜索功能**      | ❌                  | ✅                     |
| **代码高亮**      | 手动                | 自动                   |
| **响应式导航**    | 手动                | 自动                   |
| **开发体验**      | 编辑 HTML           | Markdown + 热重载      |
| **适用场景**      | 快速上线、简单页面  | 文档站、博客、复杂内容 |

---

## 常见问题

### Q1: GitHub Pages 显示"正在开启神殿之门"但没有内容？

**原因：** 使用了 VitePress 但没有配置自动构建。

**解决方案：**

- 方案 A：使用方案一（静态 HTML），直接部署 `index.html`
- 方案 B：配置 GitHub Actions（方案二），自动构建 VitePress

### Q2: 样式或 JavaScript 文件加载失败？

**检查路径：**

- 确保使用相对路径（如 `css/main.css` 而不是 `/css/main.css`）
- 检查文件是否已提交到 Git
- 清除浏览器缓存后重试

### Q3: GitHub Actions 部署失败？

**排查步骤：**

1. 检查 `.github/workflows/deploy.yml` 语法
2. 确认 `package.json` 中有 `build` 脚本
3. 查看 Actions 日志，找到具体错误
4. 确保 Node.js 版本兼容（推荐 v20+）

### Q4: 如何切换部署方案？

**从方案一切换到方案二：**

1. 配置 GitHub Pages 使用 GitHub Actions
2. 推送包含 `.github/workflows/deploy.yml` 的代码
3. 等待自动构建完成

**从方案二切换到方案一：**

1. 确保根目录有 `index.html`
2. GitHub Pages 设置改为 `Deploy from a branch`
3. 选择 `main` 分支和 `/ (root)` 文件夹

---

## 推荐方案

### 🚀 紧急情况：使用方案一

- 网站需要立即上线
- 内容相对简单
- 不需要文档功能

### 📚 长期规划：使用方案二

- 需要写技术文档
- 内容会频繁更新
- 需要搜索和导航功能

---

## 自定义域名

如果使用自定义域名（如 `www.xihe.zone`）：

1. 在仓库根目录创建 `CNAME` 文件，内容为：

   ```
   www.xihe.zone
   ```

2. 在域名提供商处添加 CNAME 记录：

   ```
   www CNAME yourusername.github.io
   ```

3. 在 GitHub Pages 设置中确认域名配置

---

_🌞 愿羲和实验室永远闪耀！_
