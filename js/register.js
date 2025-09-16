// 报名页面JavaScript功能
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // 表单验证规则
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            pattern: /^[\u4e00-\u9fa5a-zA-Z\s]+$/,
            message: '请输入有效的姓名（2-20个字符，仅支持中文、英文）'
        },
        gender: {
            required: true,
            message: '请选择性别'
        },
        birthDate: {
            required: true,
            custom: validateAge,
            message: '请选择出生日期，参赛者需年满16周岁'
        },
        idCard: {
            required: true,
            pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            message: '请输入有效的身份证号码'
        },
        phone: {
            required: true,
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入有效的手机号码'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: '请输入有效的邮箱地址'
        },
        category: {
            required: true,
            message: '请选择参赛组别'
        },
        level: {
            required: true,
            message: '请选择舞蹈水平'
        },
        experience: {
            required: true,
            min: 0,
            max: 50,
            message: '请输入有效的舞龄（0-50年）'
        },
        motivation: {
            required: true,
            minLength: 20,
            maxLength: 500,
            message: '请详细描述参赛动机（20-500字）'
        },
        videoUrl: {
            required: true,
            pattern: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|douyin\.com|bilibili\.com|v\.qq\.com).+/,
            message: '请输入有效的视频链接'
        },
        emergencyName: {
            required: true,
            minLength: 2,
            message: '请输入紧急联系人姓名'
        },
        emergencyRelation: {
            required: true,
            message: '请选择与紧急联系人的关系'
        },
        emergencyPhone: {
            required: true,
            pattern: /^1[3-9]\d{9}$/,
            message: '请输入有效的紧急联系人电话'
        },
        agreeTerms: {
            required: true,
            message: '请阅读并同意参赛协议'
        },
        agreePrivacy: {
            required: true,
            message: '请同意个人信息使用条款'
        }
    };

    // 年龄验证函数
    function validateAge(value) {
        if (!value) return false;
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1 >= 16;
        }
        return age >= 16;
    }

    // 实时验证函数
    function validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = validationRules[fieldName];
        
        if (!rules) return true;
        
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message') || createErrorElement(formGroup);
        
        // 必填验证
        if (rules.required && (!value || (field.type === 'checkbox' && !field.checked))) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        // 如果字段为空且非必填，则通过验证
        if (!value && !rules.required) {
            hideError(field, errorElement);
            return true;
        }
        
        // 长度验证
        if (rules.minLength && value.length < rules.minLength) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        if (rules.maxLength && value.length > rules.maxLength) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        // 数值范围验证
        if (rules.min !== undefined && parseFloat(value) < rules.min) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        if (rules.max !== undefined && parseFloat(value) > rules.max) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        // 正则表达式验证
        if (rules.pattern && !rules.pattern.test(value)) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        // 自定义验证
        if (rules.custom && !rules.custom(value)) {
            showError(field, errorElement, rules.message);
            return false;
        }
        
        hideError(field, errorElement);
        return true;
    }

    // 创建错误提示元素
    function createErrorElement(formGroup) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
        return errorElement;
    }

    // 显示错误
    function showError(field, errorElement, message) {
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.closest('.form-group').classList.add('has-error');
    }

    // 隐藏错误
    function hideError(field, errorElement) {
        field.classList.remove('error');
        errorElement.style.display = 'none';
        field.closest('.form-group').classList.remove('has-error');
    }

    // 为所有表单字段添加实时验证
    const formFields = form.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        // 失焦时验证
        field.addEventListener('blur', () => validateField(field));
        
        // 输入时验证（延迟执行）
        let timeout;
        field.addEventListener('input', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => validateField(field), 500);
        });
        
        // 聚焦效果
        field.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.closest('.form-group').classList.remove('focused');
            }
        });
    });

    // 身份证号码自动格式化
    const idCardField = document.getElementById('idCard');
    idCardField.addEventListener('input', function() {
        let value = this.value.replace(/\s/g, '').toUpperCase();
        if (value.length > 18) {
            value = value.substring(0, 18);
        }
        this.value = value;
    });

    // 手机号码格式化
    const phoneFields = [document.getElementById('phone'), document.getElementById('emergencyPhone')];
    phoneFields.forEach(field => {
        field.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) {
                value = value.substring(0, 11);
            }
            this.value = value;
        });
    });

    // 舞龄输入限制
    const experienceField = document.getElementById('experience');
    experienceField.addEventListener('input', function() {
        let value = parseInt(this.value);
        if (isNaN(value) || value < 0) {
            this.value = 0;
        } else if (value > 50) {
            this.value = 50;
        }
    });

    // 文本域字符计数
    const textareas = form.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = textarea.getAttribute('maxlength') || 500;
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = 'text-align: right; color: #888; font-size: 0.8rem; margin-top: 0.5rem;';
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${textarea.value.length}/${maxLength}`;
            counter.style.color = remaining < 50 ? '#ff4757' : '#888';
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter();
    });

    // 表单提交处理
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // 验证所有字段
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showNotification('请检查并修正表单中的错误信息', 'error');
            // 滚动到第一个错误字段
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }
        
        // 显示加载状态
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // 收集表单数据
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // 模拟提交到服务器
            await submitRegistration(data);
            
            // 提交成功
            showSuccessMessage();
            form.reset();
            
        } catch (error) {
            console.error('提交失败:', error);
            showNotification('提交失败，请稍后重试', 'error');
        } finally {
            // 恢复按钮状态
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // 模拟提交函数
    async function submitRegistration(data) {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 这里应该是实际的API调用
        console.log('提交的报名数据:', data);
        
        // 模拟成功响应
        return { success: true, message: '报名成功' };
    }

    // 显示成功消息
    function showSuccessMessage() {
        const successHtml = `
            <div class="success-message show">
                <i class="fas fa-check-circle"></i>
                <h3>报名提交成功！</h3>
                <p>我们已收到您的报名信息，将在3个工作日内通过邮件或电话与您联系确认。</p>
                <p>报名编号：<strong>RYZ${Date.now()}</strong></p>
                <p>请保存好您的报名编号，以便后续查询。</p>
            </div>
        `;
        
        form.insertAdjacentHTML('beforebegin', successHtml);
        
        // 滚动到成功消息
        document.querySelector('.success-message').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // 5秒后自动隐藏
        setTimeout(() => {
            const successMsg = document.querySelector('.success-message');
            if (successMsg) {
                successMsg.remove();
            }
        }, 10000);
    }

    // 通知函数
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff4757' : '#2ed573'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // 重置表单函数
    window.resetForm = function() {
        if (confirm('确定要重置表单吗？所有已填写的信息将被清空。')) {
            form.reset();
            
            // 清除所有错误状态
            formFields.forEach(field => {
                field.classList.remove('error');
                const formGroup = field.closest('.form-group');
                formGroup.classList.remove('has-error', 'focused');
                const errorElement = formGroup.querySelector('.error-message');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
            
            // 重置字符计数器
            textareas.forEach(textarea => {
                const counter = textarea.parentNode.querySelector('.char-counter');
                if (counter) {
                    const maxLength = textarea.getAttribute('maxlength') || 500;
                    counter.textContent = `0/${maxLength}`;
                    counter.style.color = '#888';
                }
            });
            
            showNotification('表单已重置', 'info');
        }
    };

    // 自动保存草稿功能
    let autoSaveTimeout;
    function autoSave() {
        clearTimeout(autoSaveTimeout);
        autoSaveTimeout = setTimeout(() => {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            localStorage.setItem('registrationDraft', JSON.stringify(data));
        }, 2000);
    }

    // 为表单字段添加自动保存
    formFields.forEach(field => {
        field.addEventListener('input', autoSave);
    });

    // 页面加载时恢复草稿
    function loadDraft() {
        const draft = localStorage.getItem('registrationDraft');
        if (draft && confirm('检测到未完成的报名信息，是否恢复？')) {
            try {
                const data = JSON.parse(draft);
                Object.keys(data).forEach(key => {
                    const field = form.querySelector(`[name="${key}"]`);
                    if (field) {
                        if (field.type === 'checkbox') {
                            field.checked = data[key] === 'on';
                        } else {
                            field.value = data[key];
                        }
                        
                        // 触发聚焦效果
                        if (field.value) {
                            field.closest('.form-group').classList.add('focused');
                        }
                    }
                });
                showNotification('已恢复之前填写的信息', 'info');
            } catch (error) {
                console.error('恢复草稿失败:', error);
            }
        }
    }

    // 页面加载完成后尝试恢复草稿
    setTimeout(loadDraft, 1000);

    // 页面离开时清除草稿
    window.addEventListener('beforeunload', () => {
        // 如果表单已提交成功，清除草稿
        if (document.querySelector('.success-message')) {
            localStorage.removeItem('registrationDraft');
        }
    });

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .char-counter {
            transition: color 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    console.log('报名页面功能已加载完成');
});