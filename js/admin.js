// 后台管理系统JavaScript功能

// DOM元素
const loginPage = document.getElementById('loginPage');
const adminDashboard = document.getElementById('adminDashboard');
const loginForm = document.getElementById('loginForm');
const logoutBtn = document.getElementById('logoutBtn');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.querySelector('.page-title');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const sidebar = document.querySelector('.sidebar');

// 登录功能
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // 简单的登录验证（实际项目中应该连接后端API）
        if (username === 'admin' && password === 'admin123') {
            // 登录成功
            showSuccessMessage('登录成功！');
            setTimeout(() => {
                loginPage.style.display = 'none';
                adminDashboard.style.display = 'flex';
                // 保存登录状态
                localStorage.setItem('adminLoggedIn', 'true');
            }, 1000);
        } else {
            showErrorMessage('用户名或密码错误！');
        }
    });
}

// 退出登录功能
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        if (confirm('确定要退出登录吗？')) {
            localStorage.removeItem('adminLoggedIn');
            adminDashboard.style.display = 'none';
            loginPage.style.display = 'flex';
            // 清空表单
            if (loginForm) {
                loginForm.reset();
            }
        }
    });
}

// 检查登录状态
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (isLoggedIn === 'true') {
        loginPage.style.display = 'none';
        adminDashboard.style.display = 'flex';
    } else {
        loginPage.style.display = 'flex';
        adminDashboard.style.display = 'none';
    }
}

// 导航功能
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetSection = this.getAttribute('data-section');
        
        // 移除所有活动状态
        navLinks.forEach(nav => nav.parentElement.classList.remove('active'));
        contentSections.forEach(section => section.classList.remove('active'));
        
        // 添加活动状态
        this.parentElement.classList.add('active');
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
        }
        
        // 更新页面标题
        const sectionTitles = {
            'dashboard': '仪表盘',
            'slides': '幻灯片管理',
            'schedule': '赛程管理',
            'registration': '报名管理',
            'media': '媒体管理',
            'news': '新闻管理',
            'settings': '系统设置'
        };
        
        if (pageTitle) {
            pageTitle.textContent = sectionTitles[targetSection] || '管理后台';
        }
        
        // 移动端关闭侧边栏
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('open');
        }
    });
});

// 移动端菜单切换
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
    });
}

// 点击外部区域关闭移动端菜单
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 1024 && 
        !sidebar.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        sidebar.classList.remove('open');
    }
});

// 幻灯片管理功能
function initSlidesManagement() {
    // 添加幻灯片按钮
    const addSlideBtn = document.getElementById('addSlideBtn');
    if (addSlideBtn) {
        addSlideBtn.addEventListener('click', function() {
            showModal('添加幻灯片', createSlideForm());
        });
    }
    
    // 编辑幻灯片按钮
    const editSlideButtons = document.querySelectorAll('.edit-slide');
    editSlideButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showModal('编辑幻灯片', createSlideForm(true));
        });
    });
    
    // 删除幻灯片按钮
    const deleteSlideButtons = document.querySelectorAll('.delete-slide');
    deleteSlideButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('确定要删除这个幻灯片吗？')) {
                showSuccessMessage('幻灯片删除成功！');
                // 这里应该调用API删除幻灯片
            }
        });
    });
}

// 赛程管理功能
function initScheduleManagement() {
    // 添加赛程按钮
    const addEventBtn = document.getElementById('addEventBtn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', function() {
            showModal('添加赛程', createEventForm());
        });
    }
    
    // 编辑赛程按钮
    const editEventButtons = document.querySelectorAll('.edit-event');
    editEventButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showModal('编辑赛程', createEventForm(true));
        });
    });
    
    // 删除赛程按钮
    const deleteEventButtons = document.querySelectorAll('.delete-event');
    deleteEventButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('确定要删除这个赛程吗？')) {
                showSuccessMessage('赛程删除成功！');
                // 这里应该调用API删除赛程
            }
        });
    });
}

// 报名管理功能
function initRegistrationManagement() {
    // 审核通过按钮
    const approveButtons = document.querySelectorAll('.approve-registration');
    approveButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            if (confirm('确定要通过这个报名申请吗？')) {
                showSuccessMessage('报名申请已通过！');
                // 更新状态显示
                const statusElement = this.closest('tr').querySelector('.status');
                if (statusElement) {
                    statusElement.textContent = '已通过';
                    statusElement.className = 'status approved';
                }
                // 隐藏审核按钮
                this.style.display = 'none';
                this.nextElementSibling.style.display = 'none';
            }
        });
    });
    
    // 审核拒绝按钮
    const rejectButtons = document.querySelectorAll('.reject-registration');
    rejectButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const reason = prompt('请输入拒绝原因：');
            if (reason) {
                showSuccessMessage('报名申请已拒绝！');
                // 更新状态显示
                const statusElement = this.closest('tr').querySelector('.status');
                if (statusElement) {
                    statusElement.textContent = '已拒绝';
                    statusElement.className = 'status inactive';
                }
                // 隐藏审核按钮
                this.previousElementSibling.style.display = 'none';
                this.style.display = 'none';
            }
        });
    });
    
    // 查看详情按钮
    const viewButtons = document.querySelectorAll('.view-registration');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            showModal('报名详情', createRegistrationDetailView());
        });
    });
}

// 创建幻灯片表单
function createSlideForm(isEdit = false) {
    return `
        <form class="modal-form" id="slideForm">
            <div class="form-group">
                <label for="slideTitle">标题</label>
                <input type="text" id="slideTitle" name="title" required ${isEdit ? 'value="主横幅 - 比赛宣传"' : ''}>
            </div>
            <div class="form-group">
                <label for="slideImage">图片</label>
                <input type="file" id="slideImage" name="image" accept="image/*" ${!isEdit ? 'required' : ''}>
            </div>
            <div class="form-group">
                <label for="slideOrder">排序</label>
                <input type="number" id="slideOrder" name="order" min="1" required ${isEdit ? 'value="1"' : ''}>
            </div>
            <div class="form-group">
                <label for="slideStatus">状态</label>
                <select id="slideStatus" name="status" required>
                    <option value="active" ${isEdit ? 'selected' : ''}>启用</option>
                    <option value="inactive">禁用</option>
                </select>
            </div>
            <div class="form-group">
                <label for="slideDescription">描述</label>
                <textarea id="slideDescription" name="description" rows="3">${isEdit ? '比赛主要宣传横幅' : ''}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                <button type="submit" class="btn btn-primary">${isEdit ? '更新' : '添加'}</button>
            </div>
        </form>
    `;
}

// 创建赛程表单
function createEventForm(isEdit = false) {
    return `
        <form class="modal-form" id="eventForm">
            <div class="form-group">
                <label for="eventDate">日期</label>
                <input type="date" id="eventDate" name="date" required ${isEdit ? 'value="2024-01-15"' : ''}>
            </div>
            <div class="form-group">
                <label for="eventStartTime">开始时间</label>
                <input type="time" id="eventStartTime" name="startTime" required ${isEdit ? 'value="10:00"' : ''}>
            </div>
            <div class="form-group">
                <label for="eventEndTime">结束时间</label>
                <input type="time" id="eventEndTime" name="endTime" required ${isEdit ? 'value="12:00"' : ''}>
            </div>
            <div class="form-group">
                <label for="eventName">活动名称</label>
                <input type="text" id="eventName" name="name" required ${isEdit ? 'value="半决赛"' : ''}>
            </div>
            <div class="form-group">
                <label for="eventLocation">地点</label>
                <input type="text" id="eventLocation" name="location" required ${isEdit ? 'value="主舞台"' : ''}>
            </div>
            <div class="form-group">
                <label for="eventStatus">状态</label>
                <select id="eventStatus" name="status" required>
                    <option value="pending" ${isEdit ? 'selected' : ''}>待开始</option>
                    <option value="active">进行中</option>
                    <option value="completed">已完成</option>
                </select>
            </div>
            <div class="form-group">
                <label for="eventDescription">描述</label>
                <textarea id="eventDescription" name="description" rows="3">${isEdit ? '各组别半决赛比赛' : ''}</textarea>
            </div>
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">取消</button>
                <button type="submit" class="btn btn-primary">${isEdit ? '更新' : '添加'}</button>
            </div>
        </form>
    `;
}

// 创建报名详情视图
function createRegistrationDetailView() {
    return `
        <div class="registration-detail">
            <div class="detail-section">
                <h4>基本信息</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>姓名：</label>
                        <span>张三</span>
                    </div>
                    <div class="detail-item">
                        <label>性别：</label>
                        <span>男</span>
                    </div>
                    <div class="detail-item">
                        <label>出生日期：</label>
                        <span>1995-06-15</span>
                    </div>
                    <div class="detail-item">
                        <label>身份证号：</label>
                        <span>110101199506150001</span>
                    </div>
                    <div class="detail-item">
                        <label>手机号码：</label>
                        <span>13800138000</span>
                    </div>
                    <div class="detail-item">
                        <label>邮箱：</label>
                        <span>zhangsan@example.com</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>参赛信息</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>参赛组别：</label>
                        <span>Breaking 成人组</span>
                    </div>
                    <div class="detail-item">
                        <label>舞龄：</label>
                        <span>5年</span>
                    </div>
                    <div class="detail-item">
                        <label>参赛动机：</label>
                        <span>热爱街舞，希望通过比赛提升自己</span>
                    </div>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>作品展示</h4>
                <div class="detail-item">
                    <label>视频链接：</label>
                    <a href="https://example.com/video" target="_blank">查看作品视频</a>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>紧急联系人</h4>
                <div class="detail-grid">
                    <div class="detail-item">
                        <label>姓名：</label>
                        <span>李四</span>
                    </div>
                    <div class="detail-item">
                        <label>关系：</label>
                        <span>朋友</span>
                    </div>
                    <div class="detail-item">
                        <label>电话：</label>
                        <span>13900139000</span>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-secondary" onclick="closeModal()">关闭</button>
                <button type="button" class="btn btn-primary">编辑</button>
            </div>
        </div>
    `;
}

// 模态框功能
function showModal(title, content) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
        </div>
    `;
    
    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
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
        }
        
        .modal-container {
            background: rgba(26, 26, 46, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 15px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 1.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .modal-header h3 {
            color: #fff;
            margin: 0;
            font-size: 1.3rem;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 5px;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(255, 0, 0, 0.2);
            color: #ff4757;
        }
        
        .modal-content {
            padding: 1.5rem;
        }
        
        .modal-form .form-group {
            margin-bottom: 1.5rem;
        }
        
        .modal-form label {
            display: block;
            color: #fff;
            font-weight: 500;
            margin-bottom: 0.5rem;
        }
        
        .modal-form input,
        .modal-form select,
        .modal-form textarea {
            width: 100%;
            padding: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(0, 255, 255, 0.3);
            border-radius: 8px;
            color: #fff;
            font-size: 0.9rem;
            transition: all 0.3s ease;
        }
        
        .modal-form input:focus,
        .modal-form select:focus,
        .modal-form textarea:focus {
            outline: none;
            border-color: #00ffff;
            box-shadow: 0 0 10px rgba(0, 255, 255, 0.3);
        }
        
        .form-actions {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            margin-top: 2rem;
        }
        
        .registration-detail {
            color: #fff;
        }
        
        .detail-section {
            margin-bottom: 2rem;
        }
        
        .detail-section h4 {
            color: #00ffff;
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
        }
        
        .detail-item {
            display: flex;
            gap: 0.5rem;
        }
        
        .detail-item label {
            font-weight: 600;
            color: rgba(255, 255, 255, 0.8);
            min-width: 80px;
        }
        
        .detail-item span,
        .detail-item a {
            color: #fff;
        }
        
        .detail-item a {
            color: #00ffff;
            text-decoration: none;
        }
        
        .detail-item a:hover {
            color: #ff00ff;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
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
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // 绑定表单提交事件
    const form = modal.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessMessage('操作成功！');
            closeModal();
        });
    }
    
    // 点击外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// 关闭模态框
function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// 消息提示功能
function showMessage(message, type = 'info') {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message-toast message-${type}`;
    messageContainer.innerHTML = `
        <div class="message-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="message-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // 添加消息样式
    if (!document.querySelector('#message-styles')) {
        const style = document.createElement('style');
        style.id = 'message-styles';
        style.textContent = `
            .message-toast {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(26, 26, 46, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 10px;
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                z-index: 10001;
                min-width: 300px;
                animation: slideInRight 0.3s ease;
                border-left: 4px solid;
            }
            
            .message-success {
                border-left-color: #2ed573;
            }
            
            .message-error {
                border-left-color: #ff4757;
            }
            
            .message-info {
                border-left-color: #00ffff;
            }
            
            .message-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                color: #fff;
            }
            
            .message-success .message-content i {
                color: #2ed573;
            }
            
            .message-error .message-content i {
                color: #ff4757;
            }
            
            .message-info .message-content i {
                color: #00ffff;
            }
            
            .message-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: 3px;
                transition: all 0.3s ease;
            }
            
            .message-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: #fff;
            }
            
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
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageContainer);
    
    // 自动关闭
    setTimeout(() => {
        if (messageContainer.parentElement) {
            messageContainer.remove();
        }
    }, 5000);
}

function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showInfoMessage(message) {
    showMessage(message, 'info');
}

// 搜索功能
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        // 这里可以实现搜索功能
        console.log('搜索:', searchTerm);
    });
}

// 通知功能
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', function() {
        showInfoMessage('暂无新通知');
    });
}

// 用户菜单功能
const userMenuBtn = document.querySelector('.user-menu-btn');
if (userMenuBtn) {
    userMenuBtn.addEventListener('click', function() {
        // 这里可以显示用户菜单下拉
        console.log('用户菜单点击');
    });
}

// 窗口大小改变时的响应
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('open');
    }
});

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态
    checkLoginStatus();
    
    // 初始化各个管理模块
    initSlidesManagement();
    initScheduleManagement();
    initRegistrationManagement();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// 键盘快捷键
document.addEventListener('keydown', function(e) {
    // ESC 关闭模态框
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl + / 聚焦搜索框
    if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// 防止页面刷新时丢失状态
window.addEventListener('beforeunload', function() {
    // 这里可以保存当前状态
});

// 导出功能（用于其他模块调用）
window.AdminManager = {
    showModal,
    closeModal,
    showSuccessMessage,
    showErrorMessage,
    showInfoMessage
};