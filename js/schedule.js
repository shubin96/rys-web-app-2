// 赛程页面JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    // 赛程标签页切换
    const scheduleTabs = document.querySelectorAll('.schedule-tab');
    const scheduleContents = document.querySelectorAll('.schedule-content');
    
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetDay = this.getAttribute('data-day');
            
            // 移除所有活动状态
            scheduleTabs.forEach(t => t.classList.remove('active'));
            scheduleContents.forEach(content => content.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            document.getElementById(targetDay).classList.add('active');
            
            // 重新触发时间轴动画
            setTimeout(() => {
                animateTimelineItems();
            }, 100);
        });
    });
    
    // 时间轴滚动动画
    function animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        timelineItems.forEach(item => {
            item.classList.remove('animate');
            observer.observe(item);
        });
    }
    
    // 初始化时间轴动画
    animateTimelineItems();
    
    // 卡片悬停效果增强
    const cards = document.querySelectorAll('.overview-card, .venue-card, .guide-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // 时间轴项目点击展开详情
    const timelineContents = document.querySelectorAll('.timeline-content');
    timelineContents.forEach(content => {
        content.addEventListener('click', function() {
            // 检查是否已有详情展开
            const existingDetails = this.querySelector('.timeline-details');
            if (existingDetails) {
                existingDetails.remove();
                return;
            }
            
            // 创建详情内容
            const details = createTimelineDetails(this);
            if (details) {
                this.appendChild(details);
                
                // 滚动到详情位置
                setTimeout(() => {
                    details.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }, 100);
            }
        });
    });
    
    // 创建时间轴详情内容
    function createTimelineDetails(timelineContent) {
        const title = timelineContent.querySelector('h4').textContent;
        const details = document.createElement('div');
        details.className = 'timeline-details';
        details.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(255, 107, 53, 0.1);
            border-radius: 8px;
            border-left: 3px solid #ff6b35;
            animation: slideDown 0.3s ease;
        `;
        
        // 根据不同活动类型生成不同的详情内容
        let detailsContent = '';
        
        if (title.includes('预赛')) {
            detailsContent = `
                <h5 style="color: #ff6b35; margin-bottom: 0.5rem;">预赛详情</h5>
                <ul style="color: #b0b0b0; font-size: 0.9rem; line-height: 1.5;">
                    <li>• 每轮比赛时间：90秒</li>
                    <li>• 评分标准：技巧、创意、音乐感、表现力</li>
                    <li>• 晋级规则：评委打分，高分者晋级</li>
                    <li>• 参赛要求：自备音乐，现场DJ播放</li>
                </ul>
            `;
        } else if (title.includes('半决赛')) {
            detailsContent = `
                <h5 style="color: #ff6b35; margin-bottom: 0.5rem;">半决赛详情</h5>
                <ul style="color: #b0b0b0; font-size: 0.9rem; line-height: 1.5;">
                    <li>• 每轮比赛时间：2分钟</li>
                    <li>• 对战形式：1v1淘汰赛</li>
                    <li>• 评委组成：5名国际知名舞者</li>
                    <li>• 现场直播：多平台同步直播</li>
                </ul>
            `;
        } else if (title.includes('决赛')) {
            detailsContent = `
                <h5 style="color: #ff6b35; margin-bottom: 0.5rem;">决赛详情</h5>
                <ul style="color: #b0b0b0; font-size: 0.9rem; line-height: 1.5;">
                    <li>• 比赛形式：Best of 3轮制</li>
                    <li>• 奖金设置：冠军10万，亚军5万，季军2万</li>
                    <li>• 特别奖项：最佳技巧奖、最佳创意奖</li>
                    <li>• 颁奖嘉宾：知名艺人和舞蹈大师</li>
                </ul>
            `;
        } else if (title.includes('表演') || title.includes('开幕') || title.includes('闭幕')) {
            detailsContent = `
                <h5 style="color: #ff6b35; margin-bottom: 0.5rem;">表演详情</h5>
                <ul style="color: #b0b0b0; font-size: 0.9rem; line-height: 1.5;">
                    <li>• 表演时长：15-20分钟</li>
                    <li>• 参演嘉宾：国际知名舞者</li>
                    <li>• 表演风格：多元化街舞展示</li>
                    <li>• 互动环节：观众参与体验</li>
                </ul>
            `;
        } else {
            detailsContent = `
                <h5 style="color: #ff6b35; margin-bottom: 0.5rem;">活动详情</h5>
                <p style="color: #b0b0b0; font-size: 0.9rem; line-height: 1.5;">
                    更多详细信息请关注现场公告或联系组委会。
                </p>
            `;
        }
        
        details.innerHTML = detailsContent;
        return details;
    }
    
    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                max-height: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                max-height: 200px;
                transform: translateY(0);
            }
        }
        
        .timeline-content {
            cursor: pointer;
        }
        
        .timeline-content:hover {
            background: linear-gradient(135deg, #1f1f3a 0%, #1a2650 100%);
        }
        
        .timeline-details {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // 场馆图片懒加载
    const venueImages = document.querySelectorAll('.venue-image img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    venueImages.forEach(img => {
        imageObserver.observe(img);
    });
    
    // 观赛指南链接点击处理
    const guideLinks = document.querySelectorAll('.guide-link');
    guideLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const linkText = this.textContent;
            
            // 模拟不同链接的处理
            switch(linkText) {
                case '立即购票':
                    showModal('购票信息', `
                        <div style="text-align: center;">
                            <h3 style="color: #ff6b35; margin-bottom: 1rem;">票价信息</h3>
                            <div style="margin-bottom: 1rem;">
                                <p><strong>单日票：</strong> ¥180 - ¥680</p>
                                <p><strong>三日通票：</strong> ¥480 - ¥1680</p>
                                <p><strong>VIP套票：</strong> ¥1980 - ¥3980</p>
                            </div>
                            <p style="color: #b0b0b0; font-size: 0.9rem;">VIP套票包含：前排座位、专属休息区、选手见面会、纪念品</p>
                            <button onclick="closeModal()" style="margin-top: 1rem; padding: 0.5rem 2rem; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">关闭</button>
                        </div>
                    `);
                    break;
                case '查看路线':
                    showModal('交通指南', `
                        <div>
                            <h3 style="color: #ff6b35; margin-bottom: 1rem;">如何到达</h3>
                            <div style="margin-bottom: 1rem;">
                                <h4 style="color: #fff;">地铁路线：</h4>
                                <p style="color: #b0b0b0;">地铁1号线体育馆站，1号出口步行5分钟</p>
                                <h4 style="color: #fff;">公交路线：</h4>
                                <p style="color: #b0b0b0;">15路、42路、128路、301路体育馆站</p>
                                <h4 style="color: #fff;">自驾路线：</h4>
                                <p style="color: #b0b0b0;">导航至"上海体育馆"，提供地下停车场</p>
                            </div>
                            <button onclick="closeModal()" style="margin-top: 1rem; padding: 0.5rem 2rem; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">关闭</button>
                        </div>
                    `);
                    break;
                case '查看菜单':
                    showModal('餐饮服务', `
                        <div>
                            <h3 style="color: #ff6b35; margin-bottom: 1rem;">场馆餐饮</h3>
                            <div style="margin-bottom: 1rem;">
                                <h4 style="color: #fff;">快餐区：</h4>
                                <p style="color: #b0b0b0;">汉堡、三明治、炸鸡、薯条 ¥15-35</p>
                                <h4 style="color: #fff;">饮品区：</h4>
                                <p style="color: #b0b0b0;">咖啡、奶茶、果汁、运动饮料 ¥8-25</p>
                                <h4 style="color: #fff;">特色小食：</h4>
                                <p style="color: #b0b0b0;">爆米花、棉花糖、烤肠 ¥5-15</p>
                            </div>
                            <button onclick="closeModal()" style="margin-top: 1rem; padding: 0.5rem 2rem; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">关闭</button>
                        </div>
                    `);
                    break;
                case '了解详情':
                    showModal('拍照须知', `
                        <div>
                            <h3 style="color: #ff6b35; margin-bottom: 1rem;">拍照规定</h3>
                            <div style="margin-bottom: 1rem;">
                                <h4 style="color: #2ed573;">允许：</h4>
                                <ul style="color: #b0b0b0;">
                                    <li>• 使用手机、相机拍照</li>
                                    <li>• 录制短视频（不超过30秒）</li>
                                    <li>• 与朋友合影留念</li>
                                </ul>
                                <h4 style="color: #ff4757;">禁止：</h4>
                                <ul style="color: #b0b0b0;">
                                    <li>• 使用闪光灯</li>
                                    <li>• 长时间录像</li>
                                    <li>• 影响他人观赛</li>
                                    <li>• 商业用途拍摄</li>
                                </ul>
                            </div>
                            <button onclick="closeModal()" style="margin-top: 1rem; padding: 0.5rem 2rem; background: #ff6b35; color: white; border: none; border-radius: 5px; cursor: pointer;">关闭</button>
                        </div>
                    `);
                    break;
            }
        });
    });
    
    // 模态框功能
    function showModal(title, content) {
        const modal = document.createElement('div');
        modal.id = 'infoModal';
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
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
            border: 1px solid rgba(255, 107, 53, 0.3);
            border-radius: 15px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideInUp 0.3s ease;
        `;
        
        modalContent.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h2 style="color: #fff; margin: 0;">${title}</h2>
                <button onclick="closeModal()" style="background: none; border: none; color: #ff6b35; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            ${content}
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // 点击背景关闭
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // ESC键关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    // 关闭模态框
    window.closeModal = function() {
        const modal = document.getElementById('infoModal');
        if (modal) {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    };
    
    // 添加模态框动画CSS
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
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
    `;
    document.head.appendChild(modalStyle);
    
    // 页面滚动时的导航栏效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const navbar = document.querySelector('.navbar');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 平滑滚动到指定时间
    function scrollToTime(time) {
        const timelineItems = document.querySelectorAll('.timeline-time');
        timelineItems.forEach(item => {
            if (item.textContent.includes(time)) {
                item.closest('.timeline-item').scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }
    
    // 添加快速导航功能（可选）
    const quickNav = document.createElement('div');
    quickNav.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(26, 26, 46, 0.9);
        border: 1px solid rgba(255, 107, 53, 0.3);
        border-radius: 10px;
        padding: 1rem 0.5rem;
        z-index: 1000;
        display: none;
    `;
    
    // 当在赛程区域时显示快速导航
    const scheduleSection = document.querySelector('.detailed-schedule');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                quickNav.style.display = 'block';
            } else {
                quickNav.style.display = 'none';
            }
        });
    });
    
    if (scheduleSection) {
        navObserver.observe(scheduleSection);
        document.body.appendChild(quickNav);
    }
    
    console.log('赛程页面功能已加载完成');
});