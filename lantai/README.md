# 兰台板块 - 技术文档

> 📜 羲和实验室 - 内部规范文档管理系统

---

## 📢 更新说明

**版本 1.1.0 (2026-03-01)**
- 调整：仅展示内部规范（4 份），国家法规暂不展示
- 简化：移除来源过滤功能（全部为内部文档）
- 优化：统计信息显示规范类型数量

---

## 📁 项目结构

```
xihe-zone/lantai/
├── index.html          # 主页面
├── css/
│   └── lantai.css      # 样式表
├── js/
│   ├── data.js         # 数据模块
│   └── utils.js        # 工具函数模块
└── README.md           # 本文档
```

---

## 📊 数据源

**文件位置:** `feedback/lantai/inbound/doubao/lantai.json`

**数据结构 (v1.1.0):**
- 4 份内部规范文档（id: 1001-1004）
- 4 种类型：合规规范、团队规范、审核规范、数据合规
- 来源：全部为 internal（内部文档）

**文档字段:**
```json
{
  "id": 1001,
  "title": "文档标题",
  "desc": "文档描述",
  "charge_person": "负责人",
  "need_pinyin": true,
  "pinyin": "gāo yáo",
  "file_path": "/path/to/doc.pdf",
  "source": "internal",
  "type": "合规规范"
}
```

**注：** 国家法规（id: 2001-2006）暂不展示，保留在数据源中备用。

---

## 🔧 功能模块

### 1. 数据模块 (data.js)

**核心函数:**

| 函数名 | 功能 |
|--------|------|
| `getAllDocuments()` | 获取所有文档 |
| `groupByType()` | 按类型分组 |
| `groupBySource()` | 按来源分类 |
| `getDocumentById(id)` | 根据 ID 获取文档 |
| `searchDocuments(keyword)` | 搜索文档 |
| `filterByType(type)` | 按类型过滤 |
| `filterBySource(source)` | 按来源过滤 |
| `getDocumentLink(doc)` | 获取文档链接 |
| `isExternalLink(doc)` | 判断是否为外部链接 |
| `getPlatformInfo()` | 获取平台信息 |
| `getStatistics()` | 获取统计数据 |

### 2. 工具函数模块 (utils.js)

**核心函数:**

| 函数名 | 功能 |
|--------|------|
| `renderDocumentList(docs, containerId)` | 渲染文档列表 |
| `renderGroupedDocuments(groupedDocs)` | 渲染分组文档 |
| `renderSearchBox(containerId, placeholder)` | 渲染搜索框 |
| `renderTypeFilter(types, containerId)` | 渲染类型过滤器 |
| `renderSourceFilter(containerId)` | 渲染来源过滤器 |
| `handleSearch(keyword)` | 处理搜索 |
| `handleTypeFilter(type)` | 处理类型过滤 |
| `handleSourceFilter(source)` | 处理来源过滤 |
| `getSafeLinkConfig(doc)` | 获取安全的链接配置 |
| `processInternalPath(filePath)` | 处理内部路径 |
| `processExternalLink(url)` | 处理外部链接（安全校验） |
| `renderPinyin(doc, position)` | 渲染拼音标注 |
| `renderStatistics()` | 渲染统计信息 |
| `escapeHtml(str)` | HTML 转义（防 XSS） |
| `debounce(func, wait)` | 防抖函数 |
| `initLantai(options)` | 初始化兰台板块 |

---

## 🚀 使用方法

### 基础使用

```html
<!-- 引入模块 -->
<script src="js/data.js"></script>
<script src="js/utils.js"></script>

<!-- 容器 -->
<div id="lantai-app"></div>

<!-- 初始化 -->
<script>
  LantaiUtils.initLantai({
    containerId: 'lantai-app',
    enableSearch: true,
    enableFilter: true,
    enableStatistics: true,
    groupByType: false
  });
</script>
```

### 高级使用

```javascript
// 获取所有文档
const docs = LantaiData.getAllDocuments();

// 搜索文档
const results = LantaiData.searchDocuments('合规');

// 按类型过滤
const complianceDocs = LantaiData.filterByType('合规规范');

// 按来源过滤
const internalDocs = LantaiData.filterBySource('internal');

// 获取统计数据
const stats = LantaiData.getStatistics();
```

---

## 🔒 安全特性

### 外部链接处理
- 自动识别 external 类型文档
- 新窗口打开外部链接（`target="_blank"`）
- 添加 `rel="noopener noreferrer"` 防止安全风险
- 协议白名单（仅允许 HTTP/HTTPS）

### XSS 防护
- 所有用户可见文本都经过 `escapeHtml()` 处理
- 防止脚本注入攻击

### 内部路径处理
- 自动规范化内部路径
- 确保路径以 `/` 开头

---

## 📱 响应式设计

- 支持桌面端和移动端
- 自适应布局
- 触摸友好的交互设计

---

## 🎨 样式定制

CSS 变量定义在 `:root` 中，可轻松定制主题：

```css
:root {
  --lantai-primary: #2c5282;      /* 主色调 */
  --lantai-accent: #d69e2e;       /* 强调色 */
  --lantai-internal: #48bb78;     /* 内部文档标识色 */
  --lantai-external: #4299e1;     /* 外部文档标识色 */
}
```

---

## 📋 配置选项

`initLantai()` 支持以下配置：

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `containerId` | string | `'lantai-app'` | 容器 ID |
| `enableSearch` | boolean | `true` | 启用搜索 |
| `enableFilter` | boolean | `true` | 启用过滤器 |
| `enableStatistics` | boolean | `true` | 启用统计信息 |
| `groupByType` | boolean | `false` | 按类型分组显示 |

---

## 🔍 搜索功能

- 支持标题、描述、负责人搜索
- 不区分大小写
- 防抖处理（300ms），避免频繁查询
- 空关键词返回全部文档

---

## 📊 统计信息

显示以下统计数据：
- 总文档数
- 内部文档数量
- 外部法规数量
- 各类型文档分布

---

## 📝 拼音标注

- 通过 `need_pinyin` 字段控制是否显示
- `pinyin` 字段存储拼音内容
- 金色高亮显示，位于标题前

---

## ⚖️ 合规审核

本模块已通过皋陶 ⚖️ 合规审核：
- ✅ 外部链接安全处理
- ✅ XSS 防护
- ✅ 数据隐私保护
- ✅ 内容合规性

---

## 📄 许可证

羲和实验室内部使用

---

*最后更新：2026-03-01*  
*作者：墨子 ⚙️*  
*羲和实验室 Xihe Lab - 技术探索 · 智能创新*
