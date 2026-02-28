# Commit 规范文档 - xihe-zone

> 🏠 羲和实验室首页仓库 Commit 规范

---

## 📋 标准格式

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>(<scope>): <subject>

<body>

<footer>
```

---

## 🔖 Type 类型

| Type | 说明 | 示例 |
|------|------|------|
| `feat` | 新功能 | `feat(page): 添加新的页面模块` |
| `fix` | 修复 bug | `fix(design): 修复设计文件问题` |
| `docs` | 文档更新 | `docs(config): 更新配置说明` |
| `style` | 代码格式 | `style(component): 格式化组件代码` |
| `refactor` | 重构 | `refactor(page): 重构页面结构` |
| `test` | 测试相关 | `test(component): 添加组件测试` |
| `chore` | 辅助工具变动 | `chore(deps): 更新依赖版本` |
| `perf` | 性能优化 | `perf(page): 优化页面加载速度` |
| `ci` | CI/CD 配置 | `ci(action): 更新工作流配置` |
| `build` | 构建系统 | `build(webpack): 更新构建配置` |

---

## 📁 Scope 范围（xihe-zone）

| Scope | 说明 |
|-------|------|
| `page` | 前端代码/页面 |
| `design` | 设计文件 |
| `config` | 配置文件 |
| `action` | GitHub Actions |
| `component` | 组件开发 |
| `style` | 样式文件 |

---

## ✍️ 示例

### 前端功能
```
feat(page): 添加分身介绍页面

新增鲁班和墨子分身的介绍页面，包含：
- 职责说明
- 工作展示
- 联系方式

设计稿：design/avatar-section.fig
```

### 设计文件
```
fix(design): 修复设计文件路径问题

修正了资源文件引用路径，
确保构建时能正确找到所有素材。

Fixes: #15
```

### GitHub Actions
```
ci(action): 添加自动部署工作流

配置了 push 到 main 分支后自动部署到
GitHub Pages 的流程。

- 构建优化
- 缓存配置
- 错误通知
```

### 性能优化
```
perf(page): 优化首页加载速度

- 图片懒加载
- 代码分割
- 资源预加载

Lighthouse 分数提升 25%
```

---

## 🚀 配置自动加载

本仓库已配置自动加载 Commit 模板：

```bash
git config commit.template .gitmessage
```

提交时会自动打开模板文件作为参考。

---

*最后更新：2026-02-28*  
*羲和实验室 Xihe Palace*
