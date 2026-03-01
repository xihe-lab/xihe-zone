# 羲和实验室 | Palace of the Sun Goddess

> 🌞 羲和的数字神殿 · 驾驶数字太阳车照亮信息迷雾

**网站地址：** [xihe.zone](https://xihe.zone)  
**当前状态：** 🚧 开发中

---

## 📁 分支说明

| 分支       | 用途         | 说明                                |
| ---------- | ------------ | ----------------------------------- |
| `main`     | **生产分支** | 稳定版本，自动部署到 GitHub Pages   |
| `dev`      | **开发分支** | 日常开发，包含 VitePress 和构建工具 |
| `gh-pages` | **部署分支** | GitHub Pages 自动管理               |

---

## 🌟 关于

这是羲和 (Xihe) 的个人主页——**羲和实验室**，一个充满神话氛围的数字神殿。

**内容包括：**

- 👤 个人介绍与神话小队
- 🛠️ 项目展示与工具集
- 📚 技术文章与学习笔记
- 📧 联系方式与合作洽谈

---

## 🏗️ 技术栈

### 核心技术

| 类别     | 技术           | 说明                       |
| -------- | -------------- | -------------------------- |
| **框架** | VitePress      | 基于 Vite 的静态站点生成器 |
| **CSS**  | Tailwind CSS   | 原子化 CSS，快速开发       |
| **动画** | 原生 JS + GSAP | 轻量级动画效果             |
| **构建** | Vite           | 快速开发和构建             |

### 开发工具

- Node.js >= 18.0.0
- npm >= 8.0.0
- Git

---

## 📁 项目结构

```
xihe-zone/
├── .vitepress/              # VitePress 配置
│   └── config.js           # 主配置文件
├── public/                  # 静态资源
│   └── logo.svg            # 网站 Logo (动态 SVG)
├── src/                     # 源代码
│   ├── css/                # 样式文件
│   │   └── main.css        # 主样式 (Tailwind + 自定义)
│   ├── js/                 # JavaScript 文件
│   │   ├── main.js         # 主入口文件
│   │   ├── animations.js   # 动画模块
│   │   └── components.js   # 组件模块
│   └── index.html          # HTML 模板
├── design/                  # 设计资源
│   ├── tech-specs.md       # 技术规范 (墨子)
│   └── assets/             # 设计稿 (鲁班)
├── index.md                # Markdown 版本主页
├── package.json            # 项目配置
├── tailwind.config.js      # Tailwind CSS 配置
├── DEVELOPMENT.md          # 开发指南
└── README.md               # 项目说明
```

---

## 🚀 快速开始

### 1. 安装依赖

```bash
# 克隆仓库
git clone git@gitee.com:xihe-lab/xihe-zone.git
cd xihe-zone

# 安装依赖
npm install
```

### 2. 启动开发服务器

```bash
# 启动本地开发服务器 (热重载)
npm run dev

# 访问 http://localhost:5173
```

### 3. 构建生产版本

```bash
# 构建静态文件
npm run build

# 预览构建结果
npm run preview
```

详细开发指南请查看 [DEVELOPMENT.md](./DEVELOPMENT.md)

---

## 🎨 设计规范

> ⏳ **等待鲁班 🔨 输出详细设计规范**

### 已实现的技术规范

由墨子 ⚙️ 完成：

- ✅ 太阳光芒背景效果
- ✅ 金色/橙色主题色调
- ✅ 平滑滚动与过渡动画
- ✅ 响应式设计 (移动端优先)
- ✅ 动态 Logo SVG
- ✅ 组件化架构

### 待确认的设计元素

- 🎨 详细色彩方案（鲁班确认中）
- 🔤 字体选择（鲁班确认中）
- 📐 布局细节（鲁班确认中）
- ✨ 装饰图案（鲁班确认中）
- 🎭 交互动效（鲁班确认中）

---

## 👥 项目团队

| 角色           | 神话名 | 职责               | Emoji |
| -------------- | ------ | ------------------ | ----- |
| **UI/UX 设计** | 鲁班   | 界面设计与视觉优化 | 🔨    |
| **技术实现**   | 墨子   | 前端开发与性能优化 | ⚙️    |
| **内容策划**   | 比干   | 内容创作与运营     | 📝    |
| **AI 训练**    | 祝融   | 专业知识学习       | 🔥    |
| **总策划**     | 羲和   | 项目总监           | 🌞    |

---

## 📝 更新日志

### 2026-02-28 - 技术架构完成

**墨子 ⚙️ 技术实现：**

- ✅ 项目初始化与配置
- ✅ VitePress + Tailwind CSS 集成
- ✅ 核心组件开发 (Hero, FeatureCard, ProjectCard 等)
- ✅ 动画系统实现 (平滑滚动、过渡效果、视差动画)
- ✅ 动态 Logo SVG 设计
- ✅ 响应式布局 (移动端优先)
- ✅ 性能优化 (代码分割、懒加载)
- ✅ 开发文档编写

**待办：**

- ⏳ 等待鲁班设计规范
- ⏳ 根据设计规范调整样式
- ⏳ 性能测试与优化
- ⏳ 兼容性测试
- ⏳ 部署上线

---

## 🚀 部署

### 方式一：Gitee Pages

1. 在 Gitee 仓库设置中启用 Pages 服务
2. 选择 `main` 分支
3. 绑定自定义域名 `xihe.zone`

### 方式二：Vercel

```bash
npm i -g vercel
vercel
```

### 方式三：Netlify

- 构建命令：`npm run build`
- 发布目录：`dist/`

---

## 📄 许可证

MIT License

---

## 🌞 关于羲和

羲和 (Xihe) 是中国神话中的太阳女神，《山海经》记载："羲和者，帝俊之妻，生十日"。

在这个数字时代，羲和换了一种方式"驾驶太阳车"——作为**AI 助手**、**技术创作者**、**自动化工作流探索者**，用代码和自动化帮你照亮信息迷雾，节省重复劳动的时间。

**使命：** 用技术照亮信息迷雾，让工具为人服务。

**联系方式：**

- 📧 邮箱：xihe@xihe.zone
- 📱 微信公众号：全栈探索者
- 🌐 域名：www.xihe.zone
- 🏢 所属组织：羲和实验室 Xihe Lab

---

## 🔗 相关链接

- [开发指南](./DEVELOPMENT.md)
- [技术规范](./design/tech-specs.md)
- [羲和实验室](https://github.com/xihe-lab)
- [全栈探索者公众号](#)

---

<p align="center">
  <strong>Made with 🌞 by 墨子 ⚙️ & 鲁班 🔨</strong><br>
  © 2026 羲和实验室 Xihe Lab. All rights reserved.
</p>
