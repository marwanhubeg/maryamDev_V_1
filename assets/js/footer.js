/**
 * Marwan Hub - Enhanced Footer JavaScript
 * منطق متقدم للـ Footer مع تأثيرات وتحسينات
 */

class EnhancedFooter {
  constructor() {
    this.footer = document.querySelector('.footer');
    this.backToTopBtn = document.querySelector('.back-to-top');
    this.newsletterForm = document.querySelector('.newsletter-form');
    this.currentYearElement = document.querySelector('.current-year');
    
    this.init();
  }
  
  init() {
    // إضافة زر الرجوع للأعلى
    this.createBackToTopButton();
    
    // تحديث السنة الحالية
    this.updateCurrentYear();
    
    // تهيئة نموذج النشرة الإخبارية
    if (this.newsletterForm) {
      this.initNewsletterForm();
    }
    
    // إضافة تأثيرات scroll
    window.addEventListener('scroll', () => this.handleScroll());
    
    // تحسين روابط التواصل الاجتماعي
    this.enhanceSocialLinks();
    
    // إضافة تأثيرات hover للروابط
    this.addHoverEffects();
    
    // تحسين accessibility
    this.enhanceAccessibility();
  }
  
  createBackToTopButton() {
    if (!this.backToTopBtn && this.footer) {
      const backToTopBtn = document.createElement('button');
      backToTopBtn.className = 'back-to-top';
      backToTopBtn.setAttribute('aria-label', 'الرجوع إلى أعلى الصفحة');
      backToTopBtn.innerHTML = '↑';
      backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        width: 50px;
        height: 50px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      
      document.body.appendChild(backToTopBtn);
      this.backToTopBtn = backToTopBtn;
      
      // إضافة event listener
      this.backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }
  
  handleScroll() {
    if (this.backToTopBtn) {
      const scrollPosition = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // إظهار/إخفاء زر الرجوع للأعلى
      if (scrollPosition > 500) {
        this.backToTopBtn.style.opacity = '1';
        this.backToTopBtn.style.visibility = 'visible';
        this.backToTopBtn.style.transform = 'translateY(0)';
      } else {
        this.backToTopBtn.style.opacity = '0';
        this.backToTopBtn.style.visibility = 'hidden';
        this.backToTopBtn.style.transform = 'translateY(20px)';
      }
      
      // إضافة تأثير عند الوصول للفوتر
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        this.footer.classList.add('visible');
      } else {
        this.footer.classList.remove('visible');
      }
    }
  }
  
  updateCurrentYear() {
    if (this.currentYearElement) {
      const currentYear = new Date().getFullYear();
      this.currentYearElement.textContent = currentYear;
    }
  }
  
  initNewsletterForm() {
    this.newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = this.newsletterForm.querySelector('input[type="email"]');
      const submitBtn = this.newsletterForm.querySelector('button[type="submit"]');
      const successMessage = this.newsletterForm.querySelector('.success-message');
      const errorMessage = this.newsletterForm.querySelector('.error-message');
      
      if (!emailInput || !submitBtn) return;
      
      const email = emailInput.value.trim();
      
      // التحقق من صحة البريد الإلكتروني
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (errorMessage) {
          errorMessage.textContent = 'يرجى إدخال بريد إلكتروني صحيح';
          errorMessage.style.display = 'block';
          if (successMessage) successMessage.style.display = 'none';
        }
        return;
      }
      
      // عرض حالة التحميل
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'جاري الاشتراك...';
      submitBtn.disabled = true;
      
      try {
        // محاكاة إرسال البيانات (ستتم استبدالها بـ API حقيقي)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // عرض رسالة النجاح
        if (successMessage) {
          successMessage.textContent = 'تم الاشتراك بنجاح! شكراً لك.';
          successMessage.style.display = 'block';
          if (errorMessage) errorMessage.style.display = 'none';
        }
        
        // إعادة تعيين الحقل
        emailInput.value = '';
        
        // إخفاء رسالة النجاح بعد 5 ثواني
        setTimeout(() => {
          if (successMessage) {
            successMessage.style.display = 'none';
          }
        }, 5000);
        
      } catch (error) {
        // عرض رسالة الخطأ
        if (errorMessage) {
          errorMessage.textContent = 'حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.';
          errorMessage.style.display = 'block';
          if (successMessage) successMessage.style.display = 'none';
        }
        
      } finally {
        // إعادة تعيين الزر
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }
  
  enhanceSocialLinks() {
    const socialLinks = this.footer.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
      // إضافة تأثير hover
      link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-3px) scale(1.1)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = '';
      });
      
      // إضافة animation delay
      const index = Array.from(socialLinks).indexOf(link);
      link.style.animationDelay = `${index * 0.1}s`;
      link.classList.add('animate-on-scroll');
    });
  }
  
  addHoverEffects() {
    // إضافة تأثيرات hover لروابط الفوتر
    const footerLinks = this.footer.querySelectorAll('.footer-link');
    
    footerLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        link.style.paddingRight = 'var(--spacing-sm)';
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.paddingRight = '';
      });
    });
    
    // إضافة تأثيرات للبطاقات
    const footerCards = this.footer.querySelectorAll('.footer-card');
    
    footerCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = 'var(--shadow-xl)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
      });
    });
  }
  
  enhanceAccessibility() {
    // إضافة keyboard navigation للروابط
    const focusableElements = this.footer.querySelectorAll(
      'a, button, input, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach((element, index) => {
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          element.click();
        }
        
        // التنقل بـ Tab داخل الفوتر
        if (e.key === 'Tab') {
          const nextIndex = e.shiftKey ? index - 1 : index + 1;
          
          if (nextIndex >= 0 && nextIndex < focusableElements.length) {
            setTimeout(() => {
              focusableElements[nextIndex].focus();
            }, 10);
          }
        }
      });
    });
    
    // تحسين ARIA labels
    const quickLinksHeading = this.footer.querySelector('.footer-title');
    if (quickLinksHeading) {
      quickLinksHeading.setAttribute('id', 'quick-links-heading');
      const quickLinks = this.footer.querySelector('.footer-links');
      if (quickLinks) {
        quickLinks.setAttribute('aria-labelledby', 'quick-links-heading');
      }
    }
  }
  
  // دالة مساعدة لتحميل الفوتر ديناميكياً
  static async loadFooter() {
    try {
      const response = await fetch('/components/footer.html');
      if (!response.ok) throw new Error('Footer not found');
      
      const html = await response.text();
      const footerPlaceholder = document.getElementById('footer-placeholder');
      
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = html;
        
        // تهيئة الفوتر الجديد
        setTimeout(() => {
          new EnhancedFooter();
        }, 100);
      }
      
      return true;
    } catch (error) {
      console.error('Error loading footer:', error);
      return false;
    }
  }
}

// تهيئة Footer عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  const enhancedFooter = new EnhancedFooter();
  
  // جعلها متاحة عالمياً
  window.MarwanHub = window.MarwanHub || {};
  window.MarwanHub.EnhancedFooter = enhancedFooter;
  
  // إضافة تأثيرات scroll للعناصر في الفوتر
  const footerElements = document.querySelectorAll('.footer-animate');
  
  const elementInView = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
  };
  
  const displayFooterElement = (element) => {
    element.classList.add('animated');
  };
  
  const handleFooterAnimation = () => {
    footerElements.forEach((el) => {
      if (elementInView(el)) {
        displayFooterElement(el);
      }
    });
  };
  
  // استدعاء عند التحميل والتمرير
  window.addEventListener('scroll', handleFooterAnimation);
  handleFooterAnimation(); // استدعاء أولي
  
  // تحديث السنة كل دقيقة (في حال تغيير التوقيت)
  setInterval(() => {
    if (enhancedFooter.currentYearElement) {
      const newYear = new Date().getFullYear();
      if (newYear !== parseInt(enhancedFooter.currentYearElement.textContent)) {
        enhancedFooter.updateCurrentYear();
      }
    }
  }, 60000);
});
