# 兰台文档路径修复报告

**日期：** 2026-03-01  
**执行：** 鲁班 🔨

---

## 问题分析

原 `lantai.json` 中的文档路径指向不存在的位置：

```json
"file_path": "/lantai/docs/xihe-compliance-manual.pdf"
```

实际文档位置在：

```
feedback/lantai/confidential/policies/*.md
```

---

## 已完成工作

### 1. 创建文档目录

```bash
xihe-zone/lantai/docs/
```

### 2. 复制文档

已复制 4 份内部规范文档到 `xihe-zone/lantai/docs/`：

| 源文件                      | 目标文件                    |
| --------------------------- | --------------------------- |
| `agent-team-spec.pdf.md`    | `agent-team-spec.md`        |
| `content-audit-rules.md`    | `content-audit-rules.md`    |
| `data-security-privacy.md`  | `data-security-privacy.md`  |
| `xihe-compliance-manual.md` | `xihe-compliance-manual.md` |

### 3. 更新 lantai.json

修改了 4 个 internal 文档的 `file_path` 为相对路径：

```json
{
  "id": 1001,
  "file_path": "docs/xihe-compliance-manual.md"
}
```

所有 internal 文档路径已更新：

- ✅ `docs/xihe-compliance-manual.md`
- ✅ `docs/agent-team-spec.md`
- ✅ `docs/content-audit-rules.md`
- ✅ `docs/data-security-privacy.md`

### 4. 修改 app.js 支持 Markdown 预览

在 `xihe-zone/lantai/js/app.js` 中添加了 Markdown 文件预览功能：

**功能特性：**

- 检测 `.md` 文件扩展名
- 使用 `fetch()` 读取 Markdown 内容
- 在弹窗中显示原始 Markdown 文本（`white-space: pre-wrap`）
- 支持刷新内容
- 错误处理与用户提示

**代码位置：** 第 335-357 行

```javascript
// Markdown 文件：读取并显示内容
if (doc.file_path.endsWith('.md')) {
  try {
    viewBtn.disabled = true;
    viewBtn.textContent = '⏳ 加载中...';

    const response = await fetch(doc.file_path);
    if (!response.ok) {
      throw new Error('无法加载文档内容');
    }

    const content = await response.text();
    contentText.textContent = content;
    contentDiv.style.display = 'block';
    viewBtn.textContent = '🔄 刷新内容';
  } catch (error) {
    console.error('加载 Markdown 失败:', error);
    contentText.textContent = '⚠️ 加载失败：' + error.message;
    contentDiv.style.display = 'block';
    viewBtn.textContent = '⚠️ 加载失败';
  } finally {
    viewBtn.disabled = false;
  }
  return;
}
```

---

## 文件结构

```
xihe-zone/lantai/
├── index.html
├── js/
│   └── app.js (已更新)
├── css/
│   └── lantai.css
└── docs/ (新建)
    ├── xihe-compliance-manual.md
    ├── agent-team-spec.md
    ├── content-audit-rules.md
    └── data-security-privacy.md
```

---

## 使用说明

1. 访问兰台页面：`xihe-zone/lantai/index.html`
2. 点击任意内部规范文档卡片
3. 在弹窗中点击"📄 查看文档"按钮
4. Markdown 内容将在弹窗中显示
5. 可点击"🔄 刷新内容"重新加载

---

## 后续优化建议

1. **Markdown 渲染增强**：当前显示原始 Markdown 文本，可集成 marked.js 等库进行 HTML 渲染
2. **样式优化**：为 Markdown 内容添加更好的排版样式（标题、列表、代码块等）
3. **PDF 支持**：考虑集成 PDF.js 实现 PDF 预览

---

_修复完成 ✅_
