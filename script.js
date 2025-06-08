document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 初始化第二层山脉样式
    initializeSecondMountain();

    // 移动端下拉菜单
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
                const dropdownContent = this.querySelector('.dropdown-content');
                if (this.classList.contains('active')) {
                    dropdownContent.style.display = 'block';
                } else {
                    dropdownContent.style.display = 'none';
                }
            }
        });
    });

    // FAQ切换
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // 主题切换功能
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const icon = themeToggleBtn.querySelector('i');
    
    // 添加炫酷悬浮效果到卡片
    function addCardEffects() {
        const isLightMode = !document.body.classList.contains('dark-mode');
        const cards = document.querySelectorAll('.intro-card, .rule-item, .gameplay-card, .summary-item, .join-method');
        
        if (!isLightMode) { // 黑色主题下的效果
            cards.forEach(card => {
                card.classList.add('card-glow');
                
                // 鼠标移动跟踪光效
                card.addEventListener('mousemove', function(e) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    this.style.setProperty('--x', `${x}px`);
                    this.style.setProperty('--y', `${y}px`);
                });
                
                // 添加粒子背景到每个卡片
                if (!card.querySelector('.card-particles')) {
                    const particles = document.createElement('div');
                    particles.className = 'card-particles';
                    card.appendChild(particles);
                    
                    for (let i = 0; i < 5; i++) {
                        const particle = document.createElement('span');
                        const size = Math.random() * 3 + 1;
                        const posX = Math.random() * 100;
                        const delay = Math.random() * 2;
                        const duration = Math.random() * 3 + 3;
                        
                        particle.style.width = `${size}px`;
                        particle.style.height = `${size}px`;
                        particle.style.left = `${posX}%`;
                        particle.style.animationDelay = `${delay}s`;
                        particle.style.animationDuration = `${duration}s`;
                        
                        particles.appendChild(particle);
                    }
                }
            });
        } else { // 白色主题下移除效果
            cards.forEach(card => {
                card.classList.remove('card-glow');
                const particles = card.querySelector('.card-particles');
                if (particles) {
                    card.removeChild(particles);
                }
            });
        }
    }
    
    // 添加动态背景效果
    function addDynamicBackgrounds() {
        if (document.body.classList.contains('dark-mode')) {
            if (!document.getElementById('tech-grid')) {
                const techSection = document.querySelector('.tech');
                if (techSection) {
                    const grid = document.createElement('div');
                    grid.id = 'tech-grid';
                    techSection.appendChild(grid);
                    
                    // 创建网格线
                    for (let i = 0; i < 20; i++) {
                        const line = document.createElement('div');
                        line.className = 'grid-line';
                        grid.appendChild(line);
                    }
                }
            }
            
            // 添加浮动元素到首屏
            const hero = document.querySelector('.hero');
            if (hero && !document.querySelector('.floating-elements')) {
                const floatingElements = document.createElement('div');
                floatingElements.className = 'floating-elements';
                
                for (let i = 0; i < 10; i++) {
                    const elem = document.createElement('div');
                    elem.className = 'floating-element';
                    
                    // 随机位置、大小和动画延迟
                    const size = Math.random() * 40 + 10;
                    const left = Math.random() * 100;
                    const top = Math.random() * 100;
                    const delay = Math.random() * 10;
                    
                    elem.style.width = `${size}px`;
                    elem.style.height = `${size}px`;
                    elem.style.left = `${left}%`;
                    elem.style.top = `${top}%`;
                    elem.style.animationDelay = `${delay}s`;
                    
                    floatingElements.appendChild(elem);
                }
                
                hero.appendChild(floatingElements);
            }
        } else {
            // 移除特效
            const techGrid = document.getElementById('tech-grid');
            if (techGrid) {
                techGrid.parentNode.removeChild(techGrid);
            }
            
            const floatingElements = document.querySelector('.floating-elements');
            if (floatingElements) {
                floatingElements.parentNode.removeChild(floatingElements);
            }
        }
    }
    
    // 检查本地存储中是否有保存的主题偏好
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        addCardEffects(); // 白色主题也添加效果
        addDynamicBackgrounds();
    }

    // 点击按钮切换主题
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
            
            // 添加炫酷效果
            addCardEffects();
            addDynamicBackgrounds();
            
            // 添加过渡动画
            addThemeTransitionAnimation();
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
            
            // 更新效果
            addCardEffects();
            addDynamicBackgrounds();
            
            // 添加过渡动画
            addThemeTransitionAnimation();
        }
    });

    // 启用暗色模式
    function enableDarkMode() {
        body.classList.add('dark-mode');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
        
        // 添加炫酷效果
        addCardEffects();
        addDynamicBackgrounds();
        
        // 确保第二层山脉正确显示
        const secondMountain = document.querySelector('.minecraft-mountains-second');
        if (secondMountain) {
            secondMountain.style.opacity = '0.7';
            secondMountain.style.filter = 'brightness(0.6)';
        }
        
        // 添加过渡动画
        addThemeTransitionAnimation();
    }

    // 启用亮色模式
    function enableLightMode() {
        body.classList.remove('dark-mode');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
        
        // 更新效果
        addCardEffects();
        addDynamicBackgrounds();
        
        // 确保第二层山脉正确显示
        const secondMountain = document.querySelector('.minecraft-mountains-second');
        if (secondMountain) {
            secondMountain.style.opacity = '0.7';
            secondMountain.style.filter = 'brightness(0.8)';
        }
        
        // 添加过渡动画
        addThemeTransitionAnimation();
    }

    // 主题切换动画
    function addThemeTransitionAnimation() {
        // 创建全屏覆盖层
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = body.classList.contains('dark-mode') ? 'rgba(18, 18, 18, 0.3)' : 'rgba(255, 255, 255, 0.3)';
        overlay.style.zIndex = '9999';
        overlay.style.pointerEvents = 'none';
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.5s ease';
        
        document.body.appendChild(overlay);
        
        // 触发重排以应用动画
        setTimeout(() => {
            overlay.style.opacity = '1';
            
            // 动画结束后删除覆盖层
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(overlay);
                }, 500);
            }, 300);
        }, 10);
    }
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                // 如果在移动设备上并且菜单是打开的，点击后关闭菜单
                if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (hamburger) {
                        hamburger.classList.remove('active');
                    }
                }
                
                // 平滑滚动到目标位置
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 导航栏的高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 页面滚动时的导航栏效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // 向下滚动时使导航栏更加透明
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            navbar.style.opacity = '0.9';
        } 
        // 向上滚动时恢复正常
        else {
            navbar.style.opacity = '1';
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });
    
    // 添加移动端菜单按钮
    function addMobileMenuButton() {
        const navbarContainer = document.querySelector('.navbar-container');
        
        if (!document.querySelector('.hamburger') && navbarContainer) {
            const hamburger = document.createElement('button');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
            
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                this.classList.toggle('active');
                
                // 切换图标
                const icon = this.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            });
            
            navbarContainer.appendChild(hamburger);
        }
    }
    
    // 初始化时检查是否需要添加移动端菜单按钮
    if (window.innerWidth <= 768) {
        addMobileMenuButton();
    }
    
    // 窗口大小变化时检查
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            addMobileMenuButton();
        } else {
            // 如果屏幕变大，关闭移动端菜单
            navMenu.classList.remove('active');
        }
    });

    // 添加首屏滚动渐变效果与视差滚动结合
    const hero = document.querySelector('.hero');
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero h2');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroElements = [heroTitle, heroSubtitle, heroButtons];
    let heroHeight = 0;
    
    // 计算首屏高度
    if (hero) {
        heroHeight = hero.offsetHeight;
        
        // 结合的滚动效果
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            
            // 计算透明度: 从1(完全可见)到0(完全消失)
            // 当滚动到首屏高度的约30%-70%时逐渐消失
            const fadeStart = heroHeight * 0.3;
            const fadeEnd = heroHeight * 0.7;
            const fadeRange = fadeEnd - fadeStart;
            
            if (scrollPosition <= fadeStart) {
                // 滚动位置在渐变开始前，保持完全可见
                heroElements.forEach(element => {
                    if (element) {
                        element.style.opacity = '1';
                        // 不设置transform，让视差效果单独控制
                    }
                });
            } else if (scrollPosition >= fadeEnd) {
                // 滚动位置在渐变结束后，完全消失
                heroElements.forEach(element => {
                    if (element) {
                        element.style.opacity = '0';
                    }
                });
            } else {
                // 滚动位置在渐变区域内，计算渐变值
                const fadePercentage = (scrollPosition - fadeStart) / fadeRange;
                const opacity = 1 - fadePercentage;
                
                heroElements.forEach((element, index) => {
                    if (element) {
                        // 为不同元素添加微小延迟，使效果更加平滑
                        const delayFactor = 0.05 * index;
                        const elementOpacity = Math.max(0, opacity - delayFactor);
                        
                        element.style.opacity = elementOpacity;
                    }
                });
            }
            
            // 视差滚动效果 - 分开控制translate效果
            if (heroElements[0]) { 
                // 标题、副标题、按钮分别以不同速度移动
                heroElements.forEach((elem, index) => {
                    if (elem) {
                        const speed = 0.15 * (index + 1);
                        elem.style.transform = `translateY(${scrollPosition * speed}px)`;
                    }
                });
            }
            
            // 背景视差效果
            document.querySelectorAll('.section-divider').forEach(divider => {
                const speed = 0.5;
                const yPos = -(scrollPosition * speed);
                divider.style.backgroundPosition = `50% ${yPos}px`;
            });
        });
    }

    // 滚动效果：首屏内容渐变消失，视差滚动
    const heroContent = document.querySelector('.hero-container');
    const heroSection = document.querySelector('.hero');
    
    // Minecraft元素视差滚动
    const minecraftBlocks = document.querySelectorAll('.minecraft-block');
    const minecraftMobs = document.querySelectorAll('.minecraft-mob');
    const minecraftItems = document.querySelectorAll('.minecraft-item');
    const minecraftClouds = document.querySelectorAll('.minecraft-cloud');
    const minecraftMountains = document.querySelector('.minecraft-mountains');
    const minecraftMountainsSecond = document.querySelector('.minecraft-mountains-second'); // 添加第二层山脉
    const minecraftScenery = document.querySelector('.minecraft-scenery'); // 添加景观元素容器
    const floatingTexts = document.querySelectorAll('.floating-minecraft-text');
    const miningEffects = document.querySelectorAll('.mining-effect');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        const scrollPercentage = Math.min(scrollPos / heroHeight, 1);
        
        // 首屏内容渐变消失效果
        if (scrollPos <= heroHeight) {
            const opacity = 1 - scrollPercentage * 1.5;
            heroContent.style.opacity = opacity > 0 ? opacity : 0;
            
            // Minecraft元素视差滚动
            minecraftBlocks.forEach((block, index) => {
                const speed = 0.2 + (index % 3) * 0.1;
                const rotation = block.getAttribute('style').includes('rotate') ? 
                    parseFloat(block.getAttribute('style').match(/rotate\(([^)]+)deg\)/)[1]) : 0;
                block.style.transform = `translateY(${scrollPos * speed}px) rotate(${rotation - scrollPos * 0.02}deg)`;
                block.style.opacity = 1 - scrollPercentage * 0.8;
            });
            
            minecraftMobs.forEach((mob, index) => {
                const speed = 0.15 + (index % 2) * 0.05;
                mob.style.transform = `translateY(${scrollPos * speed}px)`;
                mob.style.opacity = 1 - scrollPercentage;
            });
            
            minecraftItems.forEach((item, index) => {
                const speed = 0.25 + (index % 4) * 0.08;
                item.style.transform = `translateY(${scrollPos * speed}px) rotate(${scrollPos * 0.1}deg)`;
                item.style.opacity = 1 - scrollPercentage * 0.9;
            });
            
            minecraftClouds.forEach((cloud, index) => {
                const speed = 0.1 + (index % 3) * 0.05;
                const scaleMatch = cloud.getAttribute('style').match(/scale\(([^)]+)\)/);
                const scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
                cloud.style.transform = `translateY(${scrollPos * speed}px) translateX(${scrollPos * 0.05 * (index+1)}px) scale(${scale})`;
                cloud.style.opacity = 1 - scrollPercentage * 0.8;
            });
            
            if(minecraftMountains) {
                minecraftMountains.style.transform = `translateY(${scrollPos * 0.1}px) scaleY(${1 - scrollPercentage * 0.2})`;
            }
            
            // 第二层山脉视差效果
            if(minecraftMountainsSecond) {
                minecraftMountainsSecond.style.transform = `translateY(${scrollPos * 0.1}px) scaleY(${1 - scrollPercentage * 0.2})`;
            }
            
            // 景观元素(树木和石头)视差效果
            if(minecraftScenery) {
                minecraftScenery.style.transform = `translateY(${scrollPos * 0.1}px)`;
                minecraftScenery.style.opacity = 1 - scrollPercentage * 0.8;
            }
            
            floatingTexts.forEach((text, index) => {
                const speed = 0.3 + (index % 2) * 0.1;
                text.style.transform = `translateY(${scrollPos * speed}px)`;
                text.style.opacity = 1 - scrollPercentage * 1.2;
            });
            
            miningEffects.forEach((effect, index) => {
                const speed = 0.35 + (index % 2) * 0.15;
                effect.style.transform = `translateY(${scrollPos * speed}px)`;
                effect.style.opacity = (1 - scrollPercentage * 1.2) * 0.7;
            });
        }
    });
    
    // 给Minecraft方块添加3D悬停效果
    minecraftBlocks.forEach(block => {
        block.addEventListener('mousemove', function(e) {
            const blockRect = block.getBoundingClientRect();
            const blockCenterX = blockRect.left + blockRect.width / 2;
            const blockCenterY = blockRect.top + blockRect.height / 2;
            
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const angleX = (blockCenterY - mouseY) * 0.1;
            const angleY = (mouseX - blockCenterX) * 0.1;
            
            // 保存原始样式中的transform属性
            let originalTransform = '';
            if (block.hasAttribute('style') && block.getAttribute('style').includes('transform')) {
                const currentTransform = block.getAttribute('style').match(/transform:[^;]+/)[0];
                originalTransform = currentTransform.replace('transform:', '').trim();
            } else {
                // 默认转换
                const originalRotation = block.hasAttribute('style') && block.getAttribute('style').includes('rotate') ? 
                    block.getAttribute('style').match(/rotate\(([^)]+)deg\)/)[1] : 0;
                originalTransform = `rotate(${originalRotation}deg)`;
            }
            
            block.style.transform = `${originalTransform} perspective(500px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
            block.style.transition = 'none';
            block.style.zIndex = 10;
        });
        
        block.addEventListener('mouseleave', function() {
            const originalStyle = block.getAttribute('data-original-style') || '';
            if (originalStyle) {
                block.setAttribute('style', originalStyle);
            } else {
                // 恢复默认样式
                const originalRotation = block.hasAttribute('style') && block.getAttribute('style').includes('rotate') ? 
                    block.getAttribute('style').match(/rotate\(([^)]+)deg\)/)[1] : 0;
                block.style.transform = `rotate(${originalRotation}deg)`;
            }
            block.style.transition = 'transform 0.5s ease';
            block.style.zIndex = 2;
        });
        
        // 保存原始样式
        if (block.hasAttribute('style')) {
            block.setAttribute('data-original-style', block.getAttribute('style'));
        }
    });

    // ===== Minecraft太阳/月亮和天气系统 =====
    
    // 1. 初始化太阳/月亮
    const celestialElement = document.getElementById('minecraft-celestial');
    const skyElement = document.querySelector('.minecraft-sky');
    
    function initializeCelestial() {
        if (!celestialElement) return;
        
        // 检查当前时间
        const now = new Date();
        const hours = now.getHours();
        
        // 判断是白天还是黑夜 (6-18点为白天，其他为黑夜)
        if (hours >= 6 && hours < 18) {
            // 白天 - 显示太阳
            celestialElement.className = 'sun';
            skyElement.classList.remove('night-sky');
            updateSunPosition(hours);
        } else {
            // 黑夜 - 显示月亮
            celestialElement.className = 'moon';
            skyElement.classList.add('night-sky');
            updateMoonPosition(hours);
        }
        
        // 每分钟更新一次位置
        setInterval(function() {
            const newNow = new Date();
            const newHours = newNow.getHours();
            const newMinutes = newNow.getMinutes();
            
            if (newHours >= 6 && newHours < 18) {
                // 白天 - 显示太阳
                if (celestialElement.className !== 'sun') {
                    celestialElement.className = 'sun';
                    skyElement.classList.remove('night-sky');
                }
                updateSunPosition(newHours, newMinutes);
            } else {
                // 黑夜 - 显示月亮
                if (celestialElement.className !== 'moon') {
                    celestialElement.className = 'moon';
                    skyElement.classList.add('night-sky');
                }
                updateMoonPosition(newHours, newMinutes);
            }
        }, 60000); // 每分钟检查
    }
    
    // 更新太阳位置 (早上在左边，傍晚在右边)
    function updateSunPosition(hours, minutes = 0) {
        if (!celestialElement) return;
        
        // 计算太阳在白天的相对位置 (0.0 - 1.0)
        // 6点为0.0 (左边), 18点为1.0 (右边)
        const dayHours = hours + minutes / 60;
        const position = (dayHours - 6) / 12;
        
        // 确定太阳位置
        const leftPos = position * 80 + 10; // 10% - 90%之间移动
        const topPos = 50 - Math.sin(position * Math.PI) * 30; // 高度的弧线，最高点在中午
        
        celestialElement.style.left = `${leftPos}%`;
        celestialElement.style.top = `${topPos}%`;
    }
    
    // 更新月亮位置 (与太阳相反，晚上在左边，凌晨在右边)
    function updateMoonPosition(hours, minutes = 0) {
        if (!celestialElement) return;
        
        // 计算月亮在黑夜的相对位置 (0.0 - 1.0)
        let nightHours;
        
        if (hours >= 18) {
            // 晚上18-24点
            nightHours = hours + minutes / 60;
            const position = (nightHours - 18) / 12;
            
            // 确定月亮位置
            const leftPos = position * 80 + 10; // 10% - 90%之间移动
            const topPos = 50 - Math.sin(position * Math.PI) * 30;
            
            celestialElement.style.left = `${leftPos}%`;
            celestialElement.style.top = `${topPos}%`;
        } else {
            // 凌晨0-6点
            nightHours = hours + minutes / 60 + 6; // +6使其连续
            const position = nightHours / 12;
            
            // 确定月亮位置
            const leftPos = position * 80 + 10; // 继续移动
            const topPos = 50 - Math.sin(position * Math.PI) * 30;
            
            celestialElement.style.left = `${leftPos}%`;
            celestialElement.style.top = `${topPos}%`;
        }
    }
    
    // 2. 初始化天气系统
    const weatherElement = document.getElementById('minecraft-weather');
    const rainContainer = document.querySelector('.rain-container');
    const snowContainer = document.querySelector('.snow-container');
    const thunderContainer = document.querySelector('.thunder-container');
    let currentWeather = 'sunny';
    let weatherTimer;
    let initialWeatherTimer;
    
    // 添加随机天气按钮
    function addWeatherToggleButton() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle || document.getElementById('weather-toggle-btn')) return;
        
        // 创建新的按钮元素
        const weatherToggleBtn = document.createElement('button');
        weatherToggleBtn.id = 'weather-toggle-btn';
        weatherToggleBtn.innerHTML = '<i class="fas fa-cloud-sun"></i>';
        weatherToggleBtn.title = '切换天气';
        
        // 添加样式，与主题按钮保持一致
        weatherToggleBtn.style.width = '50px';
        weatherToggleBtn.style.height = '50px';
        weatherToggleBtn.style.backgroundColor = 'var(--card-bg)';
        weatherToggleBtn.style.border = 'none';
        weatherToggleBtn.style.borderRadius = '50%';
        weatherToggleBtn.style.boxShadow = '0 4px 15px var(--shadow-color)';
        weatherToggleBtn.style.cursor = 'pointer';
        weatherToggleBtn.style.display = 'flex';
        weatherToggleBtn.style.alignItems = 'center';
        weatherToggleBtn.style.justifyContent = 'center';
        weatherToggleBtn.style.fontSize = '1.2rem';
        weatherToggleBtn.style.color = 'var(--text-color)';
        weatherToggleBtn.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease, background-color var(--transition-speed) ease';
        weatherToggleBtn.style.marginTop = '10px';
        
        // 添加悬停效果
        weatherToggleBtn.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 6px 20px var(--shadow-color)';
        });
        
        weatherToggleBtn.addEventListener('mouseout', function() {
            this.style.transform = '';
            this.style.boxShadow = '0 4px 15px var(--shadow-color)';
        });
        
        // 点击事件
        weatherToggleBtn.addEventListener('click', () => {
            // 可以循环切换不同的天气
            const weathers = ['sunny', 'rainy', 'snowy', 'thunder'];
            const currentIndex = weathers.indexOf(currentWeather);
            const nextIndex = (currentIndex + 1) % weathers.length;
            
            // 设置新的天气
            setWeather(weathers[nextIndex]);
            
            // 更新图标
            updateWeatherIcon(weathers[nextIndex]);
        });
        
        // 添加到theme-toggle容器
        themeToggle.appendChild(weatherToggleBtn);
    }
    
    // 更新天气按钮图标
    function updateWeatherIcon(weather) {
        const weatherBtn = document.getElementById('weather-toggle-btn');
        if (!weatherBtn) return;
        
        const icon = weatherBtn.querySelector('i');
        
        switch(weather) {
            case 'sunny':
                icon.className = 'fas fa-cloud-sun';
                break;
            case 'rainy':
                icon.className = 'fas fa-cloud-rain';
                break;
            case 'snowy':
                icon.className = 'fas fa-snowflake';
                break;
            case 'thunder':
                icon.className = 'fas fa-bolt';
                break;
            default:
                icon.className = 'fas fa-cloud-sun';
        }
    }
    
    function initializeWeather() {
        if (!weatherElement) return;
        
        // 初始天气为晴天
        setWeather('sunny');
        
        // 创建一些雪花和雨滴，但先不显示（因为初始天气是晴天）
        // 这样在第一次切换到雪天或雨天时就有预先准备好的元素
        createRaindrops(100);
        createSnowflakes(100);
        
        // 前30秒必须是晴天
        initialWeatherTimer = setTimeout(() => {
            // 30秒后开始随机天气系统
            weatherTimer = setInterval(randomizeWeather, 60000); // 每60秒切换一次
        }, 30000);
        
        // 添加随机天气按钮
        addWeatherToggleButton();
        
        // 生成像素化的方块云
        generatePixelClouds();
    }
    
    // 生成像素化的方块云
    function generatePixelClouds() {
        // 获取hero元素
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        // 获取minecraft-sky元素
        const sky = document.querySelector('.minecraft-sky');
        if (!sky) return;
        
        // 检查现有云的数量，限制最大数量为25个，以避免性能问题
        const existingClouds = document.querySelectorAll('.minecraft-cloud');
        if (existingClouds.length > 25) {
            // 如果云太多，删除最早的几个
            for (let i = 0; i < 5; i++) {
                if (existingClouds[i]) {
                    existingClouds[i].remove();
                }
            }
        }
        
        // 定义分区，增加更多分区减少重叠
        const sections = 8;
        const sectionWidth = 100 / sections;
        
        // 生成2-5个新的云，减少每次生成的数量
        const cloudCount = Math.floor(Math.random() * 4) + 2;
        
        // 随机选择未使用的分区
        const allSections = Array.from({length: sections}, (_, i) => i);
        const shuffledSections = allSections.sort(() => 0.5 - Math.random());
        const selectedSections = shuffledSections.slice(0, cloudCount);
        
        for (let i = 0; i < cloudCount; i++) {
            // 创建新的像素云元素
            const cloud = document.createElement('div');
            cloud.className = 'minecraft-cloud';
            
            // 更加随机的大小、位置、速度
            const scale = Math.random() * 2.2 + 0.8; // 0.8 - 3.0 更大的尺寸范围
            const top = Math.random() * 25 + 2; // 2% - 27% 更高的垂直范围
            
            // 在选定的分区内随机位置，但避免紧贴边缘
            const section = selectedSections[i];
            const left = section * sectionWidth + Math.random() * (sectionWidth * 0.7);
            
            // 更加随机的云速度
            const speed = Math.random() * 80 + 40; // 40s - 120s 速度变化更大
            
            // 应用样式
            cloud.style.transform = `scale(${scale})`;
            cloud.style.top = `${top}%`;
            cloud.style.left = `${left}%`;
            cloud.style.animationDuration = `${speed}s`;
            
            // 计算这朵云的块数 (大的云有更多块)
            const blockCount = Math.floor(Math.random() * 4) + 3 + (scale > 1 ? 3 : 0);
            
            // 创建一个多层的方块结构，使云看起来更3D
            const layers = Math.floor(Math.random() * 3) + 2; // 2-4层，增加层数使云更有3D效果
            
            for (let layer = 0; layer < layers; layer++) {
                // 每一层的块数，上层块数递减
                const layerBlocks = Math.max(3, blockCount - layer);
                
                for (let j = 0; j < layerBlocks; j++) {
                    const cloudBlock = document.createElement('div');
                    cloudBlock.className = 'cloud-block';
                    
                    // 随机摆放在云朵中，创建不规则形状
                    // 上层的方块更集中在中心
                    const spreadFactor = 1 - (layer * 0.25);
                    const centerOffset = j * 18 - (layerBlocks * 9) + Math.random() * 12;
                    const blockX = centerOffset * spreadFactor;
                    const blockY = layer * 8 + Math.random() * 4 - 2; // 增加高度差异
                    
                    cloudBlock.style.left = `${blockX}px`;
                    cloudBlock.style.top = `${blockY}px`;
                    
                    // 随机微调尺寸，增加尺寸变化
                    const sizeVariation = Math.random() * 6 - 3; // -3 到 +3px
                    cloudBlock.style.width = `${26 + sizeVariation}px`;
                    cloudBlock.style.height = `${26 + sizeVariation}px`;
                    
                    // 随机透明度变化，透明度更大
                    const opacityVariation = 0.6 + Math.random() * 0.35;
                    cloudBlock.style.opacity = opacityVariation;
                    
                    // 添加随机的z-index增强3D效果
                    cloudBlock.style.zIndex = layer;
                    
                    // 添加到云中
                    cloud.appendChild(cloudBlock);
                }
            }
            
            // 设置自动移除，让云朵在完成动画后自行移除
            cloud.addEventListener('animationend', () => {
                cloud.remove();
            });
            
            // 添加到天空
            sky.appendChild(cloud);
            
            // 使用setTimeout延迟设置不透明度，触发CSS过渡效果
            setTimeout(() => {
                cloud.style.opacity = '1';
            }, 10);
        }
        
        // 定期生成新的云
        setTimeout(generatePixelClouds, 5000 + Math.random() * 10000); // 5-15秒后生成新云
    }
    
    // 创建雨滴
    function createRaindrops(count) {
        if (!rainContainer) return;
        
        // 清除现有雨滴以避免过多元素导致性能问题
        const existingRaindrops = rainContainer.querySelectorAll('.raindrop');
        if (existingRaindrops.length > 300) {
            // 如果雨滴太多，删除一部分
            for (let i = 0; i < 100; i++) {
                if (existingRaindrops[i]) {
                    existingRaindrops[i].remove();
                }
            }
        }
        
        for (let i = 0; i < count; i++) {
            const raindrop = document.createElement('div');
            raindrop.className = 'raindrop';
            
            // 随机位置和动画
            const xPos = Math.random() * 100;
            const animationDuration = Math.random() * 0.8 + 0.4; // 0.4-1.2秒，比原来的快一些
            
            raindrop.style.left = `${xPos}%`;
            raindrop.style.animationDuration = `${animationDuration}s`;
            raindrop.style.animationDelay = `${Math.random() * 0.5}s`; // 减少延迟，让雨滴更快出现
            
            rainContainer.appendChild(raindrop);
        }
        
        // 持续生成新雨滴，使雨看起来更密集连续
        if (currentWeather === 'rainy' || currentWeather === 'thunder') {
            setTimeout(() => createRaindrops(Math.floor(count / 3)), 400);
        }
    }
    
    // 创建雪花
    function createSnowflakes(count) {
        if (!snowContainer) return;
        
        // 清除现有雪花以避免过多元素导致性能问题
        const existingSnowflakes = snowContainer.querySelectorAll('.snowflake');
        if (existingSnowflakes.length > 300) { // 增加雪花上限
            // 如果雪花太多，删除一部分
            for (let i = 0; i < 100; i++) {
                if (existingSnowflakes[i]) {
                    existingSnowflakes[i].remove();
                }
            }
        }
        
        // 创建雪花元素的函数
        function createSnowflakeElement() {
            const snowflake = document.createElement('div');
            
            // 随机选择雪花尺寸类别
            const sizeClass = Math.random();
            if (sizeClass < 0.3) {
                snowflake.className = 'snowflake small';
            } else if (sizeClass < 0.7) {
                snowflake.className = 'snowflake medium';
            } else {
                snowflake.className = 'snowflake large';
            }
            
            // 随机位置和动画
            const xPos = Math.random() * 100;
            // 使用随机起始位置，不都从顶部开始
            const startYPos = Math.random() * -100; // -100px 到 0px之间随机
            const animationDuration = Math.random() * 5 + 5; // 5-10秒
            
            snowflake.style.left = `${xPos}%`;
            snowflake.style.top = `${startYPos}px`; // 设置初始顶部位置
            snowflake.style.animationDuration = `${animationDuration}s`;
            
            // 延迟时间短一些，避免长时间等待
            const delay = Math.random() * 2;
            snowflake.style.animationDelay = `${delay}s`; 
            
            // 随机旋转初始角度
            const initialRotation = Math.random() * 360;
            snowflake.style.transform = `rotate(${initialRotation}deg)`;
            
            // 设置随机消失时间，确保雪花不会永远存在
            setTimeout(() => {
                if (snowflake.parentNode) {
                    snowflake.parentNode.removeChild(snowflake);
                    
                    // 如果当前天气还是下雪，随机添加新雪花
                    if (currentWeather === 'snowy' && Math.random() < 0.5) {
                        createSnowflakeElement();
                    }
                }
            }, (animationDuration + delay + 2) * 1000); // 比动画时间稍长一些
            
            return snowflake;
        }
        
        // 创建指定数量的雪花
        for (let i = 0; i < count; i++) {
            const snowflake = createSnowflakeElement();
            snowContainer.appendChild(snowflake);
        }
        
        // 持续生成新雪花，使雪看起来更连续
        if (currentWeather === 'snowy') {
            // 注册一个循环定时器，每隔一段时间创建新的雪花
            if (!window.snowflakeInterval) {
                window.snowflakeInterval = setInterval(() => {
                    if (currentWeather === 'snowy') {
                        // 每次添加少量雪花，避免突然大量增加
                        createSnowflakes(Math.floor(Math.random() * 10) + 5);
                    } else {
                        // 如果不再下雪，清除定时器
                        clearInterval(window.snowflakeInterval);
                        window.snowflakeInterval = null;
                    }
                }, 1000); // 每秒检查一次
            }
        }
    }
    
    // 创建闪电特效
    function createLightning() {
        if (!thunderContainer) return;
        
        const lightning = document.createElement('div');
        lightning.className = 'lightning';
        
        // 设置闪电动画
        lightning.style.animation = 'lightning-flash 1.5s';
        
        thunderContainer.appendChild(lightning);
        
        // 闪电动画结束后移除
        setTimeout(() => {
            thunderContainer.removeChild(lightning);
        }, 1500);
    }
    
    // 设置天气状态
    function setWeather(type) {
        if (!weatherElement) return;
        
        // 记录前一个天气状态
        const previousWeather = currentWeather;
        
        // 如果新天气与当前天气相同，不做任何操作
        if (previousWeather === type) return;
        
        // 设置新的天气
        currentWeather = type;
        
        // 更新天气按钮图标
        updateWeatherIcon(type);
        
        // 清除可能存在的雪花定时器
        if (window.snowflakeInterval) {
            clearInterval(window.snowflakeInterval);
            window.snowflakeInterval = null;
        }
        
        // 根据天气类型添加对应的类
        switch(type) {
            case 'rainy':
                // 先移除其他天气类
                weatherElement.classList.remove('snowing', 'thundering');
                
                // 短暂延迟后添加下雨效果，让过渡更平滑
                setTimeout(() => {
                    weatherElement.classList.add('raining');
                    // 增加额外的雨滴以增强效果
                    createRaindrops(150);
                    // 每隔一段时间添加更多雨滴，使雨看起来持续不断
                    setTimeout(() => createRaindrops(100), 300);
                }, 200);
                break;
                
            case 'snowy':
                // 先移除其他天气类
                weatherElement.classList.remove('raining', 'thundering');
                
                // 短暂延迟后添加下雪效果，让过渡更平滑
                setTimeout(() => {
                    weatherElement.classList.add('snowing');
                    
                    // 分4批创建雪花，使其出现更自然
                    // 第一批较少雪花，逐渐增加
                    createSnowflakes(30); 
                    setTimeout(() => createSnowflakes(40), 500);
                    setTimeout(() => createSnowflakes(50), 1000);
                    setTimeout(() => createSnowflakes(60), 1500);
                }, 200);
                break;
                
            case 'thunder':
                // 先移除下雪效果
                weatherElement.classList.remove('snowing');
                
                // 添加雷雨效果
                weatherElement.classList.add('raining', 'thundering');
                
                // 雷雨天气增加更多的雨滴
                createRaindrops(250);
                // 每隔一段时间添加更多雨滴
                setTimeout(() => createRaindrops(150), 200);
                
                // 随机闪电效果
                let thunderCount = 0;
                const randomThunder = setInterval(() => {
                    if (currentWeather !== 'thunder') {
                        clearInterval(randomThunder);
                        return;
                    }
                    
                    createLightning();
                    thunderCount++;
                    
                    // 最多5次闪电
                    if (thunderCount >= 5) {
                        clearInterval(randomThunder);
                    }
                }, Math.random() * 3000 + 1000);
                break;
                
            case 'sunny':
            default:
                // 移除所有天气效果类
                weatherElement.classList.remove('raining', 'snowing', 'thundering');
                break;
        }
    }
    
    // 随机天气
    function randomizeWeather() {
        const weatherTypes = ['sunny', 'rainy', 'snowy', 'thunder', 'sunny', 'sunny']; // 增加晴天概率
        const randomIndex = Math.floor(Math.random() * weatherTypes.length);
        setWeather(weatherTypes[randomIndex]);
    }
    
    // 初始化
    initializeCelestial();
    initializeWeather();
    
    // 初始化第二层山脉函数
    function initializeSecondMountain() {
        const secondMountain = document.querySelector('.minecraft-mountains-second');
        if (secondMountain) {
            // 应用初始样式
            secondMountain.style.opacity = '0.95'; // 保持较高不透明度
            
            // 根据当前主题设置亮度
            if (document.body.classList.contains('dark-mode')) {
                secondMountain.style.filter = 'brightness(0.6)';
            } else {
                secondMountain.style.filter = 'brightness(0.8)';
            }
        }
    }
});