/**
 * Marwan Hub - Main JavaScript File
 * منطق JavaScript العام للموقع
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Marwan Hub Website Loaded');
  
  // تهيئة جميع المكونات
  initNavigation();
  initForms();
  initAnimations();
  
  // إضافة سنة حقوق النشر الحالية
  updateCopyrightYear();
});

/**
 * تهيئة نظام التنقل
 */
function initNavigation() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('open');
      this.setAttribute('aria-expanded', 
        mobileNav.classList.contains('open'));
    });
    
    // إغلاق القائمة عند النقر على رابط
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // إضافة تأثير active للروابط الحالية
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });
}

/**
 * تهيئة النماذج
 */
function initForms() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // محاكاة الإرسال
      submitBtn.textContent = 'جاري الإرسال...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        // هنا سيتم إضافة API حقيقي
        showNotification('تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا خلال 24 ساعة.', 'success');
        this.reset();
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

/**
 * تهيئة الرسوم المتحركة
 */
function initAnimations() {
  // إضافة تأثيرات fade-in للعناصر
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // مراقبة جميع العناصر التي تحتاج animation
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/**
 * تحديث سنة حقوق النشر
 */
function updateCopyrightYear() {
  const copyrightElements = document.querySelectorAll('.copyright-year');
  const currentYear = new Date().getFullYear();
  
  copyrightElements.forEach(el => {
    if (el.textContent.includes('2025')) {
      el.textContent = el.textContent.replace('2025', currentYear);
    }
  });
}

/**
 * عرض إشعار للمستخدم
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.setAttribute('role', 'alert');
  
  // إضافة الأنماط
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: 'var(--spacing-md) var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    color: 'white',
    zIndex: '9999',
    animation: 'slideIn 0.3s ease-out'
  });
  
  if (type === 'success') {
    notification.style.backgroundColor = 'var(--color-success)';
  } else if (type === 'error') {
    notification.style.backgroundColor = 'var(--color-error)';
  } else {
    notification.style.backgroundColor = 'var(--color-info)';
  }
  
  document.body.appendChild(notification);
  
  // إزالة الإشعار بعد 5 ثواني
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

/**
 * تحميل مكون HTML ديناميكياً
 */
async function loadComponent(componentName, targetElement) {
  try {
    const response = await fetch(`/components/${componentName}.html`);
    if (!response.ok) throw new Error('Component not found');
    
    const html = await response.text();
    targetElement.innerHTML = html;
    
    // إعادة تهيئة أي JavaScript داخل المكون
    if (typeof initComponent === 'function') {
      initComponent();
    }
    
    return true;
  } catch (error) {
    console.error('Error loading component:', error);
    return false;
  }
}

// جعل الدوال متاحة عالمياً للاستخدام
window.MarwanHub = {
  initNavigation,
  initForms,
  initAnimations,
  showNotification,
  loadComponent
};
