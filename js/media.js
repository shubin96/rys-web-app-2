// 媒体中心页面JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 媒体标签页切换
    const mediaTabs = document.querySelectorAll('.media-tab');
    const mediaSections = document.querySelectorAll('.media-section');
    
    mediaTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // 移除所有活动状态
            mediaTabs.forEach(t => t.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            
            // 显示/隐藏对应内容
            filterMediaContent(category);
        });
    });
    
    // 过滤媒体内容
    function filterMediaContent(category) {
        mediaSections.forEach(section => {
            const sectionId = section.id;
            
            if (category === 'all') {
                section.style.display = 'block';
                animateSection(section);
            } else if (category === 'photos' && sectionId === 'photos') {
                section.style.display = 'block';
                animateSection(section);
            } else if (category === 'videos' && sectionId === 'videos') {
                section.style.display = 'block';
                animateSection(section);
            } else if (category === 'news' && sectionId === 'news') {
                section.style.display = 'block';
                animateSection(section);
            } else if (category === 'live' && sectionId === 'live') {
                section.style.display = 'block';
                animateSection(section);
            } else {
                section.style.display = 'none';
            }
        });
    }
    
    // 动画显示区域
    function animateSection(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // 图片查看器功能
    const photoViews = document.querySelectorAll('.photo-view');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    
    let currentImageIndex = 0;
    let imageList = [];
    
    // 收集所有图片
    function collectImages() {
        imageList = [];
        photoViews.forEach((btn, index) => {
            const src = btn.getAttribute('data-src');
            if (src) {
                imageList.push({
                    src: src,
                    index: index
                });
            }
        });
    }
    
    // 初始化图片列表
    collectImages();
    
    // 图片点击事件
    photoViews.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const src = this.getAttribute('data-src');
            if (src) {
                currentImageIndex = index;
                showImage(src);
            }
        });
    });
    
    // 显示图片
    function showImage(src) {
        modalImage.src = src;
        imageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭图片查看器
    function closeImageModal() {
        imageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // 关闭按钮事件
    modalClose.addEventListener('click', closeImageModal);
    
    // 点击背景关闭
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    // 键盘事件
    document.addEventListener('keydown', function(e) {
        if (imageModal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeImageModal();
                    break;
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
            }
        }
    });
    
    // 上一张图片
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
        modalImage.src = imageList[currentImageIndex].src;
    }
    
    // 下一张图片
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % imageList.length;
        modalImage.src = imageList[currentImageIndex].src;
    }
    
    // 导航按钮事件
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // 视频播放功能
    const videoPlayBtns = document.querySelectorAll('.video-play-btn');
    videoPlayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const videoItem = this.closest('.video-item');
            const title = videoItem.querySelector('h4').textContent;
            
            // 模拟视频播放
            showVideoModal(title);
        });
    });
    
    // 直播回放播放功能
    const livePlayBtns = document.querySelectorAll('.live-play-btn');
    livePlayBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const liveItem = this.closest('.live-item');
            const title = liveItem.querySelector('h4').textContent;
            
            // 模拟直播回放播放
            showVideoModal(title, true);
        });
    });
    
    // 显示视频模态框
    function showVideoModal(title, isLive = false) {
        const modal = document.createElement('div');
        modal.className = 'video-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
            background: #1a1a2e;
            border-radius: 15px;
            padding: 2rem;
            max-width: 800px;
            width: 90%;
            text-align: center;
            animation: slideInUp 0.3s ease;
        `;
        
        videoContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="color: #fff; margin: 0;">${title}</h3>
                <button class="close-video" style="background: none; border: none; color: #ff6b35; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <div style="aspect-ratio: 16/9; background: #000; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <div style="text-align: center; color: #fff;">
                    <i class="fas fa-play" style="font-size: 3rem; margin-bottom: 1rem; color: #ff6b35;"></i>
                    <p style="margin: 0;">视频播放器</p>
                    <p style="margin: 0.5rem 0 0; font-size: 0.9rem; color: #b0b0b0;">点击播放按钮开始观看</p>
                </div>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button class="play-video" style="background: #ff6b35; color: #fff; border: none; padding: 0.8rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600;">
                    <i class="fas fa-play"></i> 播放视频
                </button>
                ${isLive ? '<button class="fullscreen-btn" style="background: #2ed573; color: #fff; border: none; padding: 0.8rem 2rem; border-radius: 25px; cursor: pointer; font-weight: 600; margin-left: 1rem;"><i class="fas fa-expand"></i> 全屏观看</button>' : ''}
            </div>
        `;
        
        modal.appendChild(videoContainer);
        document.body.appendChild(modal);
        
        // 关闭事件
        const closeBtn = videoContainer.querySelector('.close-video');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => modal.remove(), 300);
            }
        });
        
        // 播放按钮事件
        const playBtn = videoContainer.querySelector('.play-video');
        playBtn.addEventListener('click', () => {
            // 模拟播放
            playBtn.innerHTML = '<i class="fas fa-pause"></i> 暂停';
            playBtn.style.background = '#2ed573';
            
            setTimeout(() => {
                playBtn.innerHTML = '<i class="fas fa-play"></i> 播放视频';
                playBtn.style.background = '#ff6b35';
            }, 3000);
        });
    }
    
    // 新闻链接点击事件
    const newsLinks = document.querySelectorAll('.news-link');
    newsLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const newsItem = this.closest('.news-item');
            const title = newsItem.querySelector('h3, h4').textContent;
            
            showNewsModal(title, newsItem);
        });
    });
    
    // 显示新闻详情模态框
    function showNewsModal(title, newsItem) {
        const modal = document.createElement('div');
        modal.className = 'news-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        `;
        
        const newsContainer = document.createElement('div');
        newsContainer.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 1px solid rgba(255, 107, 53, 0.3);
            border-radius: 15px;
            padding: 2rem;
            max-width: 700px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideInUp 0.3s ease;
        `;
        
        const category = newsItem.querySelector('.news-category').textContent;
        const description = newsItem.querySelector('p').textContent;
        
        newsContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
                <div>
                    <span style="background: rgba(255, 107, 53, 0.9); color: #fff; padding: 0.3rem 0.8rem; border-radius: 15px; font-size: 0.8rem; font-weight: 500;">${category}</span>
                    <h2 style="color: #fff; margin: 1rem 0 0; line-height: 1.4;">${title}</h2>
                </div>
                <button class="close-news" style="background: none; border: none; color: #ff6b35; font-size: 1.5rem; cursor: pointer; margin-left: 1rem;">&times;</button>
            </div>
            <div style="color: #b0b0b0; line-height: 1.6; margin-bottom: 2rem;">
                <p style="margin-bottom: 1.5rem;">${description}</p>
                <p>这是一篇关于${title}的详细报道。本次活动展现了街舞文化的魅力和活力，吸引了众多观众的关注。</p>
                <p>街舞作为一种充满活力的艺术形式，不仅展现了舞者的技巧和创意，更传递了积极向上的精神风貌。通过这样的比赛平台，我们看到了年轻一代对于艺术追求的热情和坚持。</p>
                <p>未来，我们将继续致力于推广街舞文化，为更多热爱舞蹈的朋友提供展示才华的舞台。让我们一起期待下一次的精彩演出！</p>
            </div>
            <div style="border-top: 1px solid rgba(255, 107, 53, 0.2); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <div style="color: #888; font-size: 0.9rem;">
                    <span><i class="fas fa-calendar"></i> 发布时间：2024-01-20</span>
                    <span style="margin-left: 1rem;"><i class="fas fa-user"></i> 作者：赛事组委会</span>
                </div>
                <div style="display: flex; gap: 1rem;">
                    <button style="background: none; border: 1px solid #ff6b35; color: #ff6b35; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer; font-size: 0.9rem;">
                        <i class="fas fa-share"></i> 分享
                    </button>
                    <button style="background: none; border: 1px solid #2ed573; color: #2ed573; padding: 0.5rem 1rem; border-radius: 20px; cursor: pointer; font-size: 0.9rem;">
                        <i class="fas fa-heart"></i> 收藏
                    </button>
                </div>
            </div>
        `;
        
        modal.appendChild(newsContainer);
        document.body.appendChild(modal);
        
        // 关闭事件
        const closeBtn = newsContainer.querySelector('.close-news');
        closeBtn.addEventListener('click', () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => modal.remove(), 300);
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => modal.remove(), 300);
            }
        });
    }
    
    // 下载按钮功能
    const downloadBtns = document.querySelectorAll('.download-btn');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.textContent.trim();
            
            // 模拟下载过程
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 准备下载...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i> 下载完成';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    
                    // 显示下载提示
                    showDownloadNotification(btnText);
                }, 1500);
            }, 2000);
        });
    });
    
    // 显示下载通知
    function showDownloadNotification(type) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(45deg, #2ed573, #1dd1a1);
            color: #fff;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(46, 213, 115, 0.3);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
        `;
        
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-download"></i>
                <span>${type}已开始下载</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // 懒加载图片
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // 滚动动画
    const animateElements = document.querySelectorAll('.photo-item, .video-item, .news-item, .live-item');
    const scrollObserver = new IntersectionObserver((entries) => {
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
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        scrollObserver.observe(element);
    });
    
    // 添加动画CSS
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(animationStyle);
    
    // 搜索功能（可选）
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.style.cssText = `
            position: fixed;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            background: rgba(26, 26, 46, 0.9);
            border: 1px solid rgba(255, 107, 53, 0.3);
            border-radius: 25px;
            padding: 0.5rem;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        
        searchContainer.innerHTML = `
            <input type="text" placeholder="搜索媒体..." style="
                background: transparent;
                border: none;
                color: #fff;
                padding: 0.5rem 1rem;
                width: 200px;
                outline: none;
                font-size: 0.9rem;
            ">
            <button style="
                background: #ff6b35;
                border: none;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                color: #fff;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <i class="fas fa-search"></i>
            </button>
        `;
        
        document.body.appendChild(searchContainer);
        
        // 搜索功能实现
        const searchInput = searchContainer.querySelector('input');
        const searchBtn = searchContainer.querySelector('button');
        
        function performSearch() {
            const query = searchInput.value.toLowerCase().trim();
            if (!query) return;
            
            // 简单的搜索实现
            const allItems = document.querySelectorAll('.photo-item, .video-item, .news-item, .live-item');
            allItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(query)) {
                    item.style.display = 'block';
                    item.style.border = '2px solid #ff6b35';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // 可选：添加搜索功能
    // addSearchFunctionality();
    
    console.log('媒体中心页面功能已加载完成');
});