# 本地开发环境

本项目使用 Hugo 生成静态网站，UIkit 资源已包含在主题中。预览和构建不需要数据库、环境变量或 API 密钥。

## 启动预览

在本目录运行：

```bash
./scripts/dev.sh
```

浏览器打开 http://localhost:1313/ 。修改页面、主题和样式后会自动刷新。按 `Ctrl+C` 停止。

## 正式构建

```bash
./scripts/build.sh
```

输出位于 `public/`，可部署至静态网站托管服务。

## 环境与依赖

- Hugo Extended：0.168.0，安装在本项目 `.tools/hugo`，没有修改系统安装。
- Node.js：24.19.0，使用这台电脑已有的 Codex 运行环境。
- pnpm：11.25.0。
- UIkit：3.25.25，已安装到 `node_modules/`。

如需在终端使用 Node、pnpm 和 Git：

```bash
source scripts/env.sh
pnpm dev
pnpm build
```

重新安装 Node 依赖可运行 `pnpm install --ignore-scripts --lockfile=false --store-dir .pnpm-store`。仓库原有 `package-lock.json` 保留，也可在有 npm 的环境中运行 `npm ci`。

`.tools/`、依赖缓存和构建结果均已忽略，不会加入 Git。换一台电脑时需重新安装 Hugo Extended；脚本也支持系统中已安装的 `hugo`。

## 代码位置

- `hugo.toml`：姓名、联系方式、菜单等站点设置。
- `content/`：各页面文字与图片。
- `themes/atelier-portfolio/`：页面模板、样式和交互。

源代码来自 `Miles-Y-Work/atelier-portfolio`，基线提交为 `bb88a1b9e38e35ae7e812d0bc82132ddcf91b8a8`。所有 99 个源文件均按 Git 对象哈希核验，并恢复了该提交的 Git 浅层检出与 `origin/main` 跟踪关系；本地没有更早的提交历史。环境脚本和本文档是本次新增内容。

下载时使用了本机已有的系统代理 `127.0.0.1:7890`。以后若 GitHub 连接超时，可在需要联网的单条命令前设置 `HTTPS_PROXY=http://127.0.0.1:7890`，无需更改系统设置。

## 验证结果

2026-10-22 已完成正式构建，生成 16 个页面并处理 159 张响应式图片。13 个主要页面及各自引用的本地图片、样式和脚本均通过 HTTP 访问检查。

为了兼容当前 Hugo，已将配置中的 `languageCode` 改为 `locale`，模板中对应的 `LanguageCode` 改为 `Locale`。构建没有警告或错误。
