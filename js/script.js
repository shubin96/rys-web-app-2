// Carousel functionality for events section
let eventsCurrentSlide = 0;
const totalSlides = 4; // Number of event cards

function moveCarousel(direction) {
    const carousel = document.querySelector('.events-carousel');
    if (!carousel) return; // 安全检查
    
    const cardWidth = 300; // Card width + gap
    
    eventsCurrentSlide += direction;
    
    // Loop back to beginning/end
    if (eventsCurrentSlide < 0) {
        eventsCurrentSlide = totalSlides - 1;
    } else if (eventsCurrentSlide >= totalSlides) {
        eventsCurrentSlide = 0;
    }
    
    const translateX = -eventsCurrentSlide * cardWidth;
    carousel.style.transform = `translateX(${translateX}px)`;
}

// Auto-play carousel
function autoPlayCarousel() {
    moveCarousel(1);
}

// Initialize carousel auto-play
let carouselInterval;

function startCarouselAutoPlay() {
    carouselInterval = setInterval(autoPlayCarousel, 4000); // Change slide every 4 seconds
}

function stopCarouselAutoPlay() {
    clearInterval(carouselInterval);
}

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 检查是否存在轮播容器，如果存在才启动轮播功能
    const carouselContainer = document.querySelector('.events-carousel-container');
    if (carouselContainer) {
        // Start auto-play when page loads
        startCarouselAutoPlay();
        
        // Pause auto-play on hover
        carouselContainer.addEventListener('mouseenter', stopCarouselAutoPlay);
        carouselContainer.addEventListener('mouseleave', startCarouselAutoPlay);
    }

    // 图片轮播功能 - 只在有轮播元素的页面执行
    const imageSlider = document.querySelector('.image-slider');
    if (imageSlider) {
        initImageSlider();
    }
    
    // 移动端导航菜单切换
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 图片轮播功能实现
    function initImageSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        // 检查是否存在轮播元素，如果不存在则直接返回
        if (slides.length === 0 || dots.length === 0) {
            return;
        }
        
        let currentSlide = 0;
        let slideInterval;

        // 显示指定幻灯片
        function showSlide(index) {
            // 处理索引边界
            if (index >= slides.length) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = slides.length - 1;
            } else {
                currentSlide = index;
            }

            // 更新幻灯片显示状态
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            if (slides[currentSlide] && dots[currentSlide]) {
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
        }

        // 下一张幻灯片
        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        // 上一张幻灯片
        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        // 自动播放
        function startSlideShow() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        // 停止自动播放
        function stopSlideShow() {
            clearInterval(slideInterval);
        }

        // 事件监听
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopSlideShow();
                startSlideShow();
            });

            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopSlideShow();
                startSlideShow();
            });
        }

        // 点击圆点切换幻灯片
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopSlideShow();
                startSlideShow();
            });
        });

        // 鼠标悬停时暂停自动播放
        const slider = document.querySelector('.image-slider');
        if (slider) {
            slider.addEventListener('mouseenter', stopSlideShow);
            slider.addEventListener('mouseleave', startSlideShow);
        }

        // 初始化显示第一张幻灯片并开始自动播放
        if (slides.length > 0) {
            showSlide(0);
            startSlideShow();
        }
    }
    // 点击导航链接时关闭移动端菜单
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 导航栏滚动效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // 倒计时功能
    function updateCountdown() {
        // 设置目标日期 (2024年12月15日)
        const targetDate = new Date('2026-12-15T09:00:00').getTime();
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // 如果活动已开始
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            
            // 可以在这里添加活动已开始的提示
            const countdownContainer = document.querySelector('.countdown-container h3');
            if (countdownContainer) {
                countdownContainer.textContent = 'Event has started!';
            }
        }
    }

    // 每秒更新倒计时
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // 赛程标签页切换
    const tabButtons = document.querySelectorAll('.tab-btn');
    const daySchedules = document.querySelectorAll('.day-schedule');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetDay = this.getAttribute('data-day');
            
            // 移除所有活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            daySchedules.forEach(schedule => schedule.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            document.getElementById(targetDay).classList.add('active');
        });
    });

    // 媒体中心标签页切换
    const mediaTabButtons = document.querySelectorAll('.media-tab-btn');
    const mediaGrids = document.querySelectorAll('.media-grid');

    mediaTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetType = this.getAttribute('data-type');
            
            // 移除所有活动状态
            mediaTabButtons.forEach(btn => btn.classList.remove('active'));
            mediaGrids.forEach(grid => grid.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            document.getElementById(targetType).classList.add('active');
        });
    });

    // 数字动画效果
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = target.textContent;
                    const numericValue = parseInt(finalNumber.replace(/[^0-9]/g, ''));
                    
                    if (numericValue > 0) {
                        animateNumber(target, 0, numericValue, finalNumber);
                        observer.unobserve(target);
                    }
                }
            });
        });

        statNumbers.forEach(number => {
            observer.observe(number);
        });
    }

    function animateNumber(element, start, end, originalText) {
        const duration = 2000; // 2秒动画
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // 使用缓动函数
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            if (originalText.includes('万')) {
                element.textContent = current + '万';
            } else if (originalText.includes('+')) {
                element.textContent = current + '+';
            } else {
                element.textContent = current;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = originalText;
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // 启动数字动画
    animateNumbers();

    // 滚动动画效果
    function addScrollAnimations() {
        const animatedElements = document.querySelectorAll('.judge-card, .feature-item, .schedule-item, .media-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    // 启动滚动动画
    addScrollAnimations();

    // 媒体项目点击事件（图片放大效果）
    const mediaItems = document.querySelectorAll('.media-item');
    mediaItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                // 这里可以添加图片放大的模态框功能
                console.log('点击了媒体项目:', img.src);
                // 可以集成lightbox或其他图片查看器
            }
        });
    });

    // 视频播放按钮点击事件
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 这里可以添加视频播放功能
            console.log('点击了播放按钮');
            // 可以集成视频播放器或跳转到视频页面
        });
    });

    // 表单验证（为报名页面准备）
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        return isValid;
    }

    // 添加输入框焦点效果
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // 页面加载动画
    function pageLoadAnimation() {
        const hero = document.querySelector('.hero');
        const navbar = document.querySelector('.navbar');
        
        // 添加加载完成的类
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    }

    // 启动页面加载动画
    pageLoadAnimation();

    // 添加鼠标跟随效果（可选）
    function addMouseFollowEffect() {
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // 可以在这里添加鼠标跟随的视觉效果
    }

    // 性能优化：防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 优化滚动事件
    const optimizedScrollHandler = debounce(() => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);

    // 添加键盘导航支持
    document.addEventListener('keydown', function(e) {
        // ESC键关闭移动端菜单
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    console.log('RYZ YOUR STYLE 网站已加载完成！');
});