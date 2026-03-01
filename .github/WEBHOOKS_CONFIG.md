# GitHub Webhooks 配置指南

> 🔔 让白泽自动接收 PR 通知，实现自动化代码审查

---

## 📋 配置目标

当有新的 PR 提交到 `xihe-zone` 仓库时：

1. GitHub 自动发送 Webhook 通知
2. 白泽自动接收并分析 PR
3. 输出初步审查报告
4. 通知墨子修复问题

---

## 🔧 配置步骤

### 方式一：GitHub 原生 Webhooks（推荐）

#### 1. 创建 Webhook 接收端点

**选项 A：使用 GitHub Actions（最简单）**

创建 `.github/workflows/pr-notification.yml`：

```yaml
name: PR 通知

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 通知白泽
        run: |
          echo "📖 白泽，有新的 PR 需要审查！"
          echo "PR #${{ github.event.pull_request.number }}"
          echo "标题：${{ github.event.pull_request.title }}"
          echo "作者：${{ github.event.pull_request.user.login }}"
          echo "分支：${{ github.event.pull_request.head.ref }}"

          # 可以集成到消息平台
          # curl -X POST ${{ secrets.WEBHOOK_URL }} \
          #   -H "Content-Type: application/json" \
          #   -d '{
          #     "event": "new_pr",
          #     "pr_number": "${{ github.event.pull_request.number }}",
          #     "title": "${{ github.event.pull_request.title }}",
          #     "author": "${{ github.event.pull_request.user.login }}",
          #     "branch": "${{ github.event.pull_request.head.ref }}",
          #     "url": "${{ github.event.pull_request.html_url }}"
          #   }'
```

**选项 B：使用外部 Webhook 服务**

- **Zapier** - 连接 GitHub 到 Slack/钉钉/企业微信
- **n8n** - 自自动化工具
- **Serverless** - AWS Lambda / Vercel Functions

---

#### 2. 配置 GitHub Webhooks

**步骤：**

1. 访问仓库：https://github.com/xihe-lab/xihe-zone/settings/hooks

2. 点击 **Add webhook**

3. 填写配置：

   ```
   Payload URL: https://your-webhook-endpoint.com/github
   Content type: application/json
   Secret: <生成一个随机密钥>
   SSL verification: Enabled
   ```

4. 选择触发事件：
   - ✅ Pull requests
   - ✅ Issues
   - ✅ Push events

5. 点击 **Add webhook**

---

### 方式二：GitHub Actions + 消息推送

#### 1. 创建通知工作流

`.github/workflows/pr-review-notify.yml`：

```yaml
name: PR 审查通知

on:
  pull_request:
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  notify-baize:
    runs-on: ubuntu-latest
    steps:
      - name: 生成审查任务
        run: |
          echo "📖 白泽审查任务"
          echo "================"
          echo "PR #${{ github.event.pull_request.number }}"
          echo "标题：${{ github.event.pull_request.title }}"
          echo "作者：${{ github.event.pull_request.user.login }}"
          echo "分支：${{ github.event.pull_request.head.ref }} → ${{ github.event.pull_request.base.ref }}"
          echo "URL: ${{ github.event.pull_request.html_url }}"
          echo ""
          echo "⏰ 创建时间：$(date)"

      - name: 发送到消息平台（可选）
        if: ${{ secrets.WEBHOOK_URL != '' }}
        run: |
          curl -X POST ${{ secrets.WEBHOOK_URL }} \
            -H "Content-Type: application/json" \
            -d '{
              "type": "pr_review",
              "repository": "${{ github.repository }}",
              "pr_number": ${{ github.event.pull_request.number }},
              "title": "${{ github.event.pull_request.title }}",
              "author": "${{ github.event.pull_request.user.login }}",
              "branch": "${{ github.event.pull_request.head.ref }}",
              "url": "${{ github.event.pull_request.html_url }}",
              "action": "${{ github.event.action }}"
            }'
```

---

### 方式三：企业微信/钉钉机器人

#### 1. 创建机器人

**企业微信：**

1. 群聊 → 机器人 → 添加
2. 复制 Webhook URL
3. 添加到 GitHub Secrets：`WECHAT_WEBHOOK_URL`

**钉钉：**

1. 群设置 → 智能群助手 → 添加机器人
2. 复制 Webhook URL
3. 添加到 GitHub Secrets：`DINGTALK_WEBHOOK_URL`

---

#### 2. 配置通知

`.github/workflows/pr-notify-im.yml`：

```yaml
name: PR 通知 - 企业微信

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - name: 发送企业微信通知
        run: |
          curl -X POST ${{ secrets.WECHAT_WEBHOOK_URL }} \
            -H "Content-Type: application/json" \
            -d '{
              "msgtype": "markdown",
              "markdown": {
                "content": "## 📖 白泽审查通知\n\n**PR #${{ github.event.pull_request.number }}**\n\n- **标题：** ${{ github.event.pull_request.title }}\n- **作者：** ${{ github.event.pull_request.user.login }}\n- **分支：** ${{ github.event.pull_request.head.ref }} → ${{ github.event.pull_request.base.ref }}\n- **时间：** $(date +\"%Y-%m-%d %H:%M:%S\")\n\n[查看详情](${{ github.event.pull_request.html_url }})"
              }
            }'
```

---

## 🔐 安全配置

### 1. 添加 Webhook Secret

**GitHub 设置：**

```
Settings → Secrets and variables → Actions
→ New repository secret

名称：WEBHOOK_SECRET
值：<随机生成的密钥>
```

**验证 Webhook：**

```yaml
- name: 验证 Webhook 签名
  run: |
    # 验证 X-Hub-Signature-256 头
    # 确保请求来自 GitHub
```

---

### 2. 权限控制

```yaml
permissions:
  pull-requests: write
  issues: write
  contents: read
```

---

## 📊 完整工作流示例

`.github/workflows/code-review-automation.yml`：

```yaml
name: 自动化代码审查

on:
  pull_request:
    branches: [main, dev]
    types: [opened, synchronize, reopened, ready_for_review]

jobs:
  # 1. 自动化检查
  automated-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: 安装依赖
        run: npm install

      - name: 运行 ESLint
        run: npm run lint

      - name: 运行测试
        run: npm run test

      - name: 构建检查
        run: npm run build

  # 2. 通知白泽
  notify-baize:
    needs: automated-checks
    runs-on: ubuntu-latest
    steps:
      - name: 生成审查报告
        run: |
          echo "📖 白泽审查报告"
          echo "==============="
          echo "PR #${{ github.event.pull_request.number }}"
          echo "自动化检查：${{ needs.automated-checks.result }}"
          echo ""
          echo "待人工审查项目："
          echo "- [ ] 代码逻辑正确性"
          echo "- [ ] 架构设计合理性"
          echo "- [ ] 安全漏洞检查"
          echo "- [ ] 性能影响评估"

      - name: 添加审查标签
        run: |
          # 使用 GitHub CLI 添加标签
          gh pr edit ${{ github.event.pull_request.number }} \
            --add-label "awaiting-review"
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  # 3. 通知相关人员
  notify-team:
    runs-on: ubuntu-latest
    steps:
      - name: 通知墨子
        run: |
          echo "@墨子 你的 PR #${{ github.event.pull_request.number }} 已提交，等待白泽审查"

      - name: 通知白泽
        run: |
          echo "@白泽 有新的 PR 需要审查：#${{ github.event.pull_request.number }}"
```

---

## 📝 使用流程

### 墨子提交 PR

```bash
# 1. 开发完成后
git checkout dev
git add -A
git commit -m "feat: 修复白泽发现的问题"
git push origin dev

# 2. 在 GitHub 上创建 PR
# https://github.com/xihe-lab/xihe-zone/compare/dev
```

### 自动化流程

```
墨子提交 PR
    ↓
GitHub Actions 触发
    ↓
自动化检查（ESLint、测试、构建）
    ↓
通知白泽（消息推送）
    ↓
白泽审查（人工 + 自动）
    ↓
输出审查报告
    ↓
通过 → 合并 | 不通过 → 返回修复
```

---

## 🔍 验证配置

### 1. 测试 Webhook

```bash
# 使用 curl 测试
curl -X POST https://api.github.com/repos/xihe-lab/xihe-zone/hooks \
  -H "Authorization: token <YOUR_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "web",
    "config": {
      "url": "https://your-webhook-endpoint.com/github",
      "content_type": "json"
    },
    "events": ["pull_request"],
    "active": true
  }'
```

### 2. 检查 Actions 日志

访问：https://github.com/xihe-lab/xihe-zone/actions

查看工作流执行日志。

---

## 📋 配置清单

- [ ] 创建 GitHub Actions 工作流
- [ ] 配置 Webhook Secrets
- [ ] 测试自动化检查
- [ ] 配置消息推送（可选）
- [ ] 验证完整流程
- [ ] 文档化审查流程

---

_配置时间：2026-02-28_  
_羲和实验室 Xihe Lab_
