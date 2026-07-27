# fundadvisory — neat-freak 知识收尾报告

**收尾时间**：2026-07-25
**收闭路径**：轻量路径（极简单文件静态站，2 commit 总数，HEAD 干净）
**收尾者**：neat-freak（v3.0.0）

---

## 一、影响（用户视角）

- **🔴 严重：源码不在仓**（与 idx 38 personalpage + idx 20 lijing 同款模式）：
  - 仓库只含 index.html + css/ + js/ 静态产物
  - **没有 Builder 脚本/生成器源码**
  - 如果本地源码丢失，**项目无法重建**
- **整体极简**：3 个静态文件 + 1 个 43 字节 README
- **命名一致**：本地 fundadvisory ↔ remote lj22503/fundadvisory

## 二、现役事实矩阵

| 事实面 | 状态 | 证据 |
|--------|------|------|
| 代码 | `outdated` | 静态产物（index.html 16.8KB + css/style.css + js/app.js + js/data.js）—— 无源码 |
| 运行态 | `verified-current` | HEAD `341687f` 完成 AI 基金投顾 demo 网站；2 commit 总数 |
| 文档 | `verified-current` | README.md 43 字节 |
| 规则 | `not-applicable` | 无 CLAUDE.md / AGENTS.md |
| 记忆 | `not-applicable` | 无 |
| 工作区 | `verified-current` | 新建 `.neat-freak/`；HEAD 干净，无未提交改动 |

## 三、关键发现

### 3.1 🔴 源码不在仓（与 personalpage / lijing 同款模式）

| 项目 | 部署模式 | 源码位置 |
|------|---------|---------|
| idx 20 lijing | index.html 内联 + GitHub Pages | ❌ 未知 |
| idx 38 personalpage | Next.js 静态导出 + GitHub Pages | ❌ 未知 |
| **idx 39 fundadvisory** | **单文件 HTML + GitHub Pages** | **❌ 未知** |

→ **3 个项目都缺源码**——这是用户的"通用部署模式"：build 产物直接 push 到仓库。
→ **风险**：如果源码在用户本地且无备份，机器故障 → 项目永久丢失。

### 3.2 极简文件结构

```
fundadvisory/
├── README.md       # 43 字节
├── index.html      # 16.8KB "智投AI - 智能基金投顾平台"
├── css/
│   └── style.css
└── js/
    ├── app.js
    └── data.js
```

### 3.3 README.md 43 字节

```
# ai-fund-advisory
AI+基金投顾实战
```

→ **3 行**——极简到无法描述项目结构。
→ 与 idx 20 lijing 的 `portfolio-website/` 目录树描述对比，README **完全没有项目结构说明**。

### 3.4 index.html 技术栈

| 资源 | 来源 |
|------|------|
| CSS | `css/style.css`（本地） + Font Awesome 6.4.0（CDN） |
| JS | Chart.js（CDN）+ `js/app.js` + `js/data.js`（本地） |

→ **极简前端栈**：纯 HTML + CSS + 原生 JS + Chart.js，无构建工具。

### 3.5 2 commit 历史

```
341687f feat: complete AI fund advisory demo website
a92960e Initial commit
```

→ 项目也是"一次性导入"模式（与 personalpage 同款）。

### 3.6 命名一致 ✅

| 维度 | 名字 |
|------|------|
| 本地目录 | `fundadvisory` |
| GitHub remote | `lj22503/fundadvisory` |
| README 第 1 行 | `# ai-fund-advisory`（**README 名字与目录名不一致**） |
| index.html `<title>` | "智投AI - 智能基金投顾平台" |

→ 本地目录 `fundadvisory` ↔ README `ai-fund-advisory`（**轻微不一致**）。

### 3.7 与 idx 39 队列上下文

按 queue.md 当前：
- idx 38 personalpage（partial / archived） — 同款静态站
- idx 39 fundadvisory（本项目） — 同款静态站

→ 队列末尾 2 个连续静态站项目——user 倾向"轻量前端项目"占 lj22503 项目矩阵的比例相当大。

### 3.8 与 idx 33 financial-product-workflow 主题对照

| 维度 | fundadvisory | financial-product-workflow |
|------|--------------|---------------------------|
| 主题 | 基金投顾 demo 网站 | 金融产品工作流 Skill |
| 形态 | 单文件 HTML | Skill 包 |
| 输出 | 静态网页 demo | 6 步工作流提示词 |
| 营销价值 | 演示文（投资人手艺 demo） | 工具（投顾人员用） |

→ fundadvisory 是"showcase 演示文"，financial-product-workflow 是"tool 工具"。

## 四、改动 / 新建

| 文件 | 动作 | 原因 |
|------|------|------|
| `.neat-freak/reports/fundadvisory-2026-07-24.md` | 新建 | 本次 audit trail |

## 五、待你确认（未确认前不动作）

1. **🔴 源码位置确认**：与 idx 38 personalpage + idx 20 lijing 同样问题——源码在本地？另一仓库？还是其他位置？
2. **README 名字不一致**：本地 `fundadvisory` ↔ README `ai-fund-advisory` —— 是否统一？
3. **是否考虑统一静态站项目为"AI 工作流演示"** vs 多个分散 demo

## 六、遗留

- css/style.css 实际样式未读
- js/app.js + js/data.js 实际逻辑未读
- index.html 完整 16.8KB 内容未审
- Chart.js / Font Awesome 实际使用方式未确认

---

*收尾完成度：5 事实面已标注（记忆 not-applicable，规则 not-applicable 缺文件）。报告基于 commit `341687f`（HEAD，分支 main）。本项目是 idx 0-39 中**最精简**之一（4 文件 + 16.8KB HTML）。如需重新跑请清空 `.neat-freak/reports/` 后重跑。*