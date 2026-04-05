// 光博光电企业官网 - 交互脚本

document.addEventListener('DOMContentLoaded', function() {
  // 导航栏滚动效果
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 移动端菜单切换
  const menuToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // 点击链接后关闭菜单
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // 滚动动画 - 使用 Intersection Observer
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // 表单验证与提交
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');

  if (contactForm && submitBtn) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      // 基础验证
      if (!name || !phone || !email || !message) {
        showFormMessage('请填写所有必填字段', 'error');
        return;
      }

      // 邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showFormMessage('请输入有效的邮箱地址', 'error');
        return;
      }

      // 电话格式验证（简单验证：至少7位数字）
      const phoneRegex = /^[\d\s\-()+ ]{7,20}$/;
      if (!phoneRegex.test(phone)) {
        showFormMessage('请输入有效的电话号码', 'error');
        return;
      }

      // 显示loading状态
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline-flex';
      submitBtn.disabled = true;

      try {
        // 模拟提交（实际项目中替换为真实API）
        await new Promise(resolve => setTimeout(resolve, 1500));

        // 成功反馈
        showFormMessage('✓ 提交成功！我们将在24小时内与您联系。', 'success');
        contactForm.reset();

      } catch (error) {
        // 失败反馈
        showFormMessage('✗ 提交失败，请稍后重试或电话联系我们。', 'error');
      } finally {
        // 恢复按钮状态
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
      }
    });

    // 表单消息显示函数
    function showFormMessage(text, type) {
      formMessage.style.display = 'block';
      formMessage.textContent = text;
      if (type === 'success') {
        formMessage.style.background = 'rgba(16, 185, 129, 0.1)';
        formMessage.style.color = '#059669';
      } else {
        formMessage.style.background = 'rgba(239, 68, 68, 0.1)';
        formMessage.style.color = '#dc2626';
      }
      // 3秒后自动隐藏
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  }

  // 产品卡片悬停效果
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
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

  // 数字计数动画 - 用于参数展示区
  function animateValue(element, start, end, duration, suffix) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = start + (range * easeOut);

      // 处理特殊格式
      let displayValue;
      if (suffix === 'mm') {
        displayValue = current.toFixed(2) + 'mm';
      } else if (suffix === 'dB/km') {
        displayValue = current.toFixed(3) + 'dB/km';
      } else if (suffix === 'km') {
        displayValue = current.toFixed(0) + 'km';
      } else if (suffix === 'm²') {
        displayValue = current.toFixed(0) + 'm²';
      } else {
        displayValue = current.toFixed(0) + suffix;
      }
      element.textContent = displayValue;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // 使用Intersection Observer触发计数动画
  const specValues = document.querySelectorAll('.spec-value');
  if (specValues.length > 0 && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          entry.target.classList.add('counted');
          const text = entry.target.textContent;
          let num = 0;
          let suffix = '';

          // 解析数值和单位
          const match = text.match(/^([\d.]+)(.*)$/);
          if (match) {
            num = parseFloat(match[1]);
            suffix = match[2] || '';
          }

          // 根据数值类型选择动画时长
          let duration = 1500;
          if (num >= 100) {
            duration = 2000;
          } else if (num < 1) {
            duration = 1000;
          }

          animateValue(entry.target, 0, num, duration, suffix);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    specValues.forEach(function(el) {
      countObserver.observe(el);
    });
  }
});