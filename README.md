<div align="center">

<img src="./docs/img/logo.png" width="110" alt="站点 Logo" />

# WYF 的个人网站

**厦门大学马来西亚分校 · 计算机科学与技术**

[![网站](https://img.shields.io/badge/%E7%BD%91%E7%AB%99-%E5%9C%A8%E7%BA%BF%E8%AE%BF%E9%97%AE-2ea44f?style=flat-square)](https://ryan1702.github.io/first-website/)
[![部署](https://github.com/Ryan1702/first-website/actions/workflows/PublishMySite.yml/badge.svg)](https://github.com/Ryan1702/first-website/actions/workflows/PublishMySite.yml)
[![MkDocs](https://img.shields.io/badge/MkDocs-Material-526CFE?style=flat-square)](https://squidfunk.github.io/mkdocs-material/)
[![许可](https://img.shields.io/badge/%E5%86%85%E5%AE%B9-CC%20BY%204.0-lightgrey?style=flat-square)](https://creativecommons.org/licenses/by/4.0/deed.zh)

个人学习站点 —— 课内笔记 · 算法竞赛 · 教学讲义 · 21 天刷题计划

### [👉 在线访问](https://ryan1702.github.io/first-website/)

</div>

---

## 📖 这是什么

用 [MkDocs](https://www.mkdocs.org/) + [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) 搭建的静态站点，收录我大学期间的课内笔记、课外算法学习记录，以及给学生准备的讲义与刷题计划。

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 `gh-pages` 分支，站点实时更新。

## 🗂 内容板块

| 板块 | 内容 | 入口 |
| :--- | :--- | :--- |
| **课内学习** | 学习计划、离散数学、反腐败、专业写作、链表与栈笔记 | [进入](https://ryan1702.github.io/first-website/in-school/) |
| **课外学习** | C++ 基础 17 篇、算法大全 90+ 篇、题解 5 篇 | [进入](https://ryan1702.github.io/first-website/out-school/) |
| **教学资料** | 24 讲 PDF 讲义、洛谷 21 天刷题计划（60 题） | [进入](https://ryan1702.github.io/first-website/teaching/) |
| **个人介绍** | 学习经历、专业技能、竞赛奖项 | [进入](https://ryan1702.github.io/first-website/about/) |

## 🛠 技术栈

- **MkDocs 1.6** + **Material for MkDocs 9** —— 静态站点生成与主题
- **KaTeX** —— 数学公式渲染
- **GitHub Actions** —— 推送即自动构建部署
- **GitHub Pages** —— 托管在 `gh-pages` 分支
- 支持浅色 / 深色双模式、全文搜索、代码一键复制

## 📁 目录结构

```text
first-website/
├── mkdocs.yml                  # 站点配置与导航
├── docs/                       # 全部内容
│   ├── index.md                # 首页
│   ├── about.md                # 个人介绍
│   ├── 404.md                  # 404 页面
│   ├── css/custom.css          # 自定义样式
│   ├── img/                    # 图片资源
│   ├── in-school/              # 课内学习
│   ├── out-school/             # 课外学习（C++ / 算法大全 / 题解）
│   └── teaching/               # 教学资料（PDF 讲义 + 刷题计划）
├── .github/
│   ├── workflows/              # 自动部署工作流
│   └── social-preview.png      # 分享链接缩略图
├── overrides/
│   └── 404.html                # 自定义 404 页面模板
└── .gitignore
```

> 讲义目录下的 LaTeX 源文件（`.tex` / `.synctex.gz` / `.sty`）不纳入版本控制，只保留构建好的 PDF。

## 🚀 本地预览

```bash
# 1. 安装依赖
pip install "mkdocs<2.0" mkdocs-material

# 2. 启动本地服务
mkdocs serve          # 打开 http://127.0.0.1:8000

# 3. 只构建不启动
mkdocs build
```

## ⚙️ 部署

```bash
git add .
git commit -m "更新内容"
git push origin main   # 推送后自动触发 Actions → gh-pages
```

部署状态见上方徽章，或查看 [Actions 记录](https://github.com/Ryan1702/first-website/actions)。

## 📄 许可协议

| 范围 | 协议 |
| :--- | :--- |
| 文字内容、笔记、讲义 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.zh) —— 转载请注明出处 |
| 站点代码与配置 | [MIT](./LICENSE) |

## 🐰 关于这只玉桂狗

<img src="./docs/img/1.jpg" width="170" align="right" alt="Cinnamoroll" />

站点的吉祥物，也是背景图与 Logo 的来源。它出现在首页、404 页面和浏览器标签页里。

> 玉桂狗尊嘟很可爱啊啊啊 —— 详见 [个人介绍](https://ryan1702.github.io/first-website/about/)

<br clear="right" />

---

<div align="center">

Made with ☕ by [Ryan1702](https://github.com/Ryan1702)

Powered by [MkDocs Material](https://squidfunk.github.io/mkdocs-material/)

</div>
