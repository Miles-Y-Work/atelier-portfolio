# Atelier Portfolio — Hugo 艺术作品集模板

这是一个参考极简艺术家作品集风格制作的 Hugo 主题。它包含首页、Voices、Passion、多种详情页、个人简介、联系表单和移动端导航；图片和文字都放在内容目录里，后续更换学生资料时不需要修改模板代码。

## 本地预览

```bash
hugo server
```

打开 Hugo 输出的本地地址即可预览。正式构建使用：

```bash
hugo --minify
```

生成结果位于 `public/`。

## 修改姓名和联系方式

编辑根目录的 `hugo.toml`：

- `artistName`：学生姓名
- `initials`：左上角缩写
- `contact.email`、`contact.phone`：联系方式
- `social`：社交媒体地址
- `menus.main`：导航名称与顺序

首页主标题、简介页和联系页文字分别位于：

- `content/_index.md`
- `content/about/_index.md`
- `content/contact/_index.md`

Voices 和 Passion 的中间页分别由 `content/selected-work/_index.md` 和 `content/passion/_index.md` 配置。上半部分展示照片与介绍文字，下半部分为四个纯文字详情入口：

- `eyebrow`、`intro`：标题上方的短语和介绍正文。
- `[[introImages]]`：照片的 `src` 与 `alt`；填写 `page` 可复用该详情页中的图片。Voices 的第二张照片叠放在右下角；Passion 则将网球放在左下侧、小提琴放在右上侧，边缘错位重叠，避开人物主体。
- `exploreLabel`：入口区域的小标题。
- `[[sections]]`：每个入口对应的 `page` 和简短 `description`，按填写顺序排列，名称使用详情页的 `cardTitle`。

桌面端采用左图右文、四列入口；手机端改为上下排列。导航下拉菜单保留详情页入口，手机菜单另有总览入口。

## 替换图片

页面采用 Hugo Page Bundle。把图片放进对应内容文件所在目录，再填写同目录下 Markdown 文件的字段即可。

```text
content/
├── _index.md                 # heroImage = "hero.jpg"
├── hero.jpg
├── about/
│   ├── _index.md             # portrait / backgroundImage
│   ├── portrait.jpg
│   └── background.jpg
├── contact/
│   ├── _index.md             # backgroundImage
│   └── background.jpg
└── selected-work/
    └── writing/
        ├── index.md           # cover / gallery
        ├── cover.jpg
        ├── work-01.jpg
        └── work-02.jpg
└── passion/
    └── chemistry/
        ├── index.md           # 多图 Passion Story
        ├── chemistry-portrait.jpg
        └── chemistry-experiment.jpg
```

示例：

```toml
cover = "cover.jpg"
gallery = ["work-01.jpg", "work-02.jpg"]
```

未填写图片时，主题会显示纯 CSS 占位画面，不会出现破图。

## 添加新的作品系列

复制任一 `content/selected-work/` 下的项目目录，修改文件夹名和 `index.md`：

```toml
+++
title = "PROJECT TITLE"
cardTitle = "WRITING"
weight = 30
cover = "cover.jpg"
gallery = ["01.jpg", "02.jpg", "03.jpg"]
+++

这里填写作品系列介绍。
```

`weight` 控制作品在列表中的顺序。

### Editorial Project 字段

作品详情页由主题中的 `project/` partial 组合生成，可通过 front matter 复用同一套编辑型版式：

```toml
heroImage = "hero.jpg"
heroAlt = "图片说明"
heroFocus = "center" # top / center / bottom
heroCaption = "图片来源"
heroCaptionUrl = "https://example.com"
dek = "标题下方的项目摘要"
pullquote = "正文左侧的引导语"
asideLabel = "The question"

[[meta]]
label = "Published"
value = "October 15, 2025"

[[links]]
label = "Read More"
url = "https://example.com"
```

主题会自动处理 Page Bundle 中的图片，生成 WebP 和响应式 `srcset`。没有 `gallery` 时详情页不会再输出占位图库。

### Feature Narrative 字段

获奖文章、研究项目和其他需要强调个人动机的作品，可以启用三段式 Feature Narrative：作品首屏、外部认可、作者视角。模板结构由主题 partial 生成，不需要为单个页面另外编写 CSS。

```toml
projectLayout = "feature"
eyebrow = "Winning Essay · Writing"
authorLine = "Student Name · School"
pullquote = "A short quotation from the work."

[[recognition]]
label = "Award"
value = "First Prize in Writing"
detail = "Top 2% · 2025 Fall"
url = "https://example.com/results"

[[recognition]]
label = "Competition"
value = "Competition name"
detail = "Organizing institution"
url = "https://example.com/competition"
```

`recognition` 可以添加任意数量的资料卡；填写 `url` 后整张卡片会成为官网链接。正文 Markdown 会自动进入作者视角区域。

### Passion Story 字段

`content/passion/` 用于与 Voices 同级的兴趣主题。每个页面可以用结构化章节组合竖幅首图、大幅过程图、图文并排内容和收束图片：

```toml
heroImage = "portrait.jpg"
eyebrow = "Passion · Chemistry"
question = "How does chemistry become medicine?"
intro = "页面导语"

[[facts]]
label = "Course"
value = "Chemistry of Medicine"

[[chapters]]
title = "Chemistry became tangible"
layout = "wide" # wide / split / closing
image = "experiment.jpg"
body = "章节正文"
pullquote = "需要强调的一句话"
```

图片同样由 Hugo 自动生成 WebP 与响应式尺寸。Passion 列表页现包含 Violin、Tennis、Chemistry、Reading；继续添加兴趣主题目录时，也会自动显示。

小提琴页采用时间线版式。在页面 Front Matter 中设置 `timeline = true`，并添加 `[[timelineEvents]]`。每项可填写年份、类别、标题、曲目或成绩，以及照片；照片会叠放在时间线中，点击后打开该活动的相册。没有照片的项目也能只展示文字。

```toml
timeline = true
intro = "页面介绍"

[[timelineEvents]]
year = "2025"
kind = "Performance"
title = "活动名称"
detail = "曲目或成绩"
note = "补充说明"
photos = [
  { src = "stage-1.jpg", alt = "演出现场" },
  { src = "stage-2.jpg", alt = "合奏现场" },
]
```

网球页从 `results` 读取比赛记录，从 `gallery` 读取球场照片。阅读页从 `reflections` 读取文章正文与原始 `.docx` 文件；文章可在网页中展开阅读，也能下载原文档。

## 联系表单

模板默认只演示表单交互，不会发送数据。接入 Formspree、Netlify Forms 或自己的接口后，把地址写入 `hugo.toml`：

```toml
[params.contact]
  formAction = "https://example.com/your-form-endpoint"
```

## 复用主题

完整主题位于 `themes/atelier-portfolio/`。要在另一个 Hugo 网站中复用，可复制该目录，并在目标网站的配置中设置：

```toml
theme = "atelier-portfolio"
```
