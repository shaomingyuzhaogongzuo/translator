# 在线翻译器

基于 Vue 3 + Element Plus 开发的在线翻译 Web 应用，支持中文与英语、法语、日语、俄语四种语言互译。

## 🌐 在线预览

👉 [点击访问在线演示](https://shaomingyuzhaogongzuo.github.io/translator/)

## ✨ 功能特性

- 🌐 四种语言互译（英语 / 法语 / 日语 / 俄语）
- 🔍 词汇实时搜索与分类筛选
- 📋 翻译结果一键复制
- 🗑️ 一键清空结果
- 💡 智能推荐可翻译词汇
- 📱 响应式布局，适配 PC 和移动端

## 🛠️ 技术栈

- Vue 3（Composition API + `<script setup>`）
- Vite
- Element Plus
- JavaScript (ES6+)
- HTML5 / CSS3

## 📁 项目结构
src/
├── components/
│ ├── Translator.vue # 主页面（组合其他组件）
│ ├── LanguageSelector.vue # 语言选择器
│ ├── TranslationResult.vue # 翻译结果
│ └── WordHints.vue # 词汇提示
├── utils/
│ └── translationData.js # 翻译数据 + 翻译函数
├── App.vue # 根组件
└── main.js # 应用入口

## 🚀 本地运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
 项目作者
邵明宇 · 南阳理工学院 · 软件工程（移动设备开发方向）

GitHub：@shaomingyuzhaogongzuo
