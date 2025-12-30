/**
 * Marwan Hub - Forms JavaScript
 * منطق النماذج والتحقق من المدخلات
 */

class ContactForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;
    
    this.init();
  }
  
  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    this.setupValidation();
  }
  
  setupValidation() {
    // التحقق أثناء الكتابة
    this.form.querySelectorAll('input, textarea, select').forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }
  
  validateField(field) {
    const value = field.value.trim();
    const errorElement = document.getElementById(`${field.id}Error`);
    
    if (!errorElement) return;
    
    // مسح الأخطاء السابقة
    errorElement.textContent = '';
    
    // التحقق من الحقول المطلوبة
    if (field.hasAttribute('required') && !value) {
      errorElement.textContent = 'هذا الحقل مطلوب';
      return false;
    }
    
    // التحقق من صيغة البريد الإلكتروني
    if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorElement.textContent = 'البريد الإلكتروني غير صالح';
        return false;
      }
    }
    
    // التحقق من رقم الهاتف
    if (field.type === 'tel' && value) {
      const phoneRegex = /^[0-9+\-\s()]{10,20}$/;
      if (!phoneRegex.test(value)) {
        errorElement.textContent = 'رقم الهاتف غير صالح';
        return false;
      }
    }
    
    return true;
  }
  
  clearError(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }
  
  validateForm() {
    let isValid = true;
    
    this.form.querySelectorAll('input, textarea, select').forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  async handleSubmit(e) {
    e.preventDefault();
    
    if (!this.validateForm()) {
      this.showAlert('يرجى تصحيح الأخطاء في النموذج', 'error');
      return;
    }
    
    // إعداد البيانات للإرسال
    const formData = new FormData(this.form);
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    // عرض حالة التحميل
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';
    submitBtn.disabled = true;
    
    try {
      // محاكاة إرسال البيانات (ستتم استبدالها بـ API حقيقي)
      await this.sendFormData(formData);
      
      this.showAlert('تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا خلال 24 ساعة.', 'success');
      this.form.reset();
      
    } catch (error) {
      this.showAlert('حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.', 'error');
      console.error('Form submission error:', error);
      
    } finally {
      // إعادة تعيين حالة الزر
      btnText.style.display = 'flex';
      btnLoading.style.display = 'none';
      submitBtn.disabled = false;
    }
  }
  
  async sendFormData(formData) {
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // هنا سيتم إضافة API حقيقي
    // مثال: const response = await fetch('/api/contact', { method: 'POST', body: formData });
    
    return { success: true };
  }
  
  showAlert(message, type) {
    // إزالة الإشعارات السابقة
    const existingAlert = this.form.querySelector('.form-alert');
    if (existingAlert) {
      existingAlert.remove();
    }
    
    // إنشاء إشعار جديد
    const alert = document.createElement('div');
    alert.className = `form-alert ${type}`;
    alert.textContent = message;
    alert.style.display = 'block';
    
    // إدراج الإشعار في بداية النموذج
    this.form.insertBefore(alert, this.form.firstChild);
    
    // إزالة الإشعار بعد 5 ثواني
    setTimeout(() => {
      if (alert.parentNode) {
        alert.style.opacity = '0';
        alert.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
          if (alert.parentNode) {
            alert.parentNode.removeChild(alert);
          }
        }, 300);
      }
    }, 5000);
  }
}

// تهيئة النموذج عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  // تهيئة نموذج التواصل
  const contactForm = new ContactForm('contactForm');
  
  // إضافة تأثيرات للـ FAQ
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    if (question && answer) {
      // إخفاء الإجابة في البداية
      answer.style.display = 'none';
      
      question.addEventListener('click', () => {
        const isVisible = answer.style.display === 'block';
        
        // إغلاق جميع الإجابات الأخرى
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherQuestion = otherItem.querySelector('.faq-question');
            
            if (otherAnswer) otherAnswer.style.display = 'none';
            if (otherQuestion) otherQuestion.classList.remove('active');
          }
        });
        
        // تبديل الحالة الحالية
        answer.style.display = isVisible ? 'none' : 'block';
        question.classList.toggle('active', !isVisible);
      });
    }
  });
  
  // إضافة تأثيرات للمكونات
  const contactMethods = document.querySelectorAll('.contact-method');
  contactMethods.forEach((method, index) => {
    method.style.animationDelay = `${index * 0.1}s`;
    method.classList.add('animate-on-scroll');
  });
});

// جعل الفئات متاحة عالمياً
window.MarwanHub = window.MarwanHub || {};
window.MarwanHub.ContactForm = ContactForm;
