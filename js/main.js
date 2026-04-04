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

  // 表单验证
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // 基础验证
      if (!name || !phone || !email || !message) {
        alert('请填写所有必填字段');
        return;
      }
      
      // 邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('请输入有效的邮箱地址');
        return;
      }
      
      // 电话格式验证（简单验证：至少7位数字）
      const phoneRegex = /^[\d\s\-()+ ]{7,20}$/;
      if (!phoneRegex.test(phone)) {
        alert('请输入有效的电话号码');
        return;
      }
      
      // 模拟提交成功
      alert('感谢您的留言！我们会尽快与您联系。');
      contactForm.reset();
    });
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
});