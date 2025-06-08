# IMSng Minecraft服务器官网

这是一个为IMSng Minecraft服务器定制的响应式官网模板，使用HTML、CSS和JavaScript构建。

## 网站结构

- `index.html` - 主网页文件
- `styles.css` - CSS样式表
- `script.js` - JavaScript脚本
- `src` - 主要文件文件夹

## 功能特点

- **响应式设计**：适配各种屏幕尺寸，从手机到桌面显示器
- **导航栏**：固定在顶部的导航栏，带下拉菜单
- **主题切换**：支持白色(日间)和黑色(夜间)两种主题风格
  - 白色主题：简约、马卡龙色调，梦幻效果
  - 黑色主题：炫酷、科技风配色
- **平滑滚动**：点击导航链接时平滑滚动到指定位置
- **交互式FAQ**：可折叠的常见问题解答部分

## 如何使用

1. 双击`index.html`文件在浏览器中打开网站
2. 使用导航栏访问不同部分
3. 点击右下角的主题切换按钮可以切换日/夜间模式

## 如何修改

### 添加导航项和下拉菜单

在`index.html`中找到以下导航栏代码部分：

```html
<ul class="nav-menu">
    <li class="nav-item">
        <a href="#" class="nav-link">首页</a>
    </li>
    <li class="nav-item dropdown">
        <a href="#" class="nav-link">服务器信息 <i class="fas fa-chevron-down"></i></a>
        <div class="dropdown-content">
            <a href="#intro">基本介绍</a>
            <a href="#gameplay">核心玩法</a>
            <a href="#rules">服务器规则</a>
            <a href="#tech">技术与优化</a>
        </div>
    </li>
    <!-- 添加新的导航项在这里 -->
</ul>
```

添加新的导航项示例:

```html
<!-- 普通导航项 -->
<li class="nav-item">
    <a href="#newSection" class="nav-link">新页面</a>
</li>

<!-- 带下拉菜单的导航项 -->
<li class="nav-item dropdown">
    <a href="#" class="nav-link">新栏目 <i class="fas fa-chevron-down"></i></a>
    <div class="dropdown-content">
        <a href="#section1">子项目1</a>
        <a href="#section2">子项目2</a>
        <a href="https://example.com">外部链接</a>
    </div>
</li>
```

### 修改颜色主题

在`styles.css`文件中，找到以下CSS变量定义：

```css
/* 全局变量 - 白色主题 */
:root {
    /* 基础颜色 */
    --primary-color: #5b8def;
    --secondary-color: #7ed1e2;
    --accent-color: #ffb6c1;
    /* 其他颜色变量... */
}

/* 黑色主题 */
.dark-mode {
    --primary-color: #58a6ff;
    --secondary-color: #6e42c1;
    --accent-color: #f97316;
    /* 其他颜色变量... */
}
```

修改这些变量值可以轻松更改网站的整体配色方案。

## 后续开发建议

1. 添加服务器实时状态显示
2. 集成玩家数据统计和排行榜
3. 添加服务器IP地址复制功能
4. 添加玩家成就展示墙
5. 整合图片画廊展示服务器建筑和风景

## 联系方式

如有问题或建议，请通过官方QQ群联系我们。 