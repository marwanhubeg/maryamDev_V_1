/**
 * TopBar - الشريط العلوي المبسط
 * @version 2.0.0 - Corporate Modern
 */

import { APP_CONFIG } from '../../config/app-config.js';

export class TopBar {
  constructor(containerId = 'top-bar') {
    this.containerId = containerId;
    this.container = null;
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container #${this.containerId} not found`);
      return;
    }

    this.render();
    this.bindEvents();
    this.startClock();
  }

  render() {
    this.container.innerHTML = `
      <div class="top-bar">
        <div class="container">
          <div class="top-bar-content">
            <!-- الوقت والتاريخ فقط -->
            <div class="top-bar-item" id="datetime-display">
              <i class="fas fa-clock"></i>
              <span id="current-datetime">جاري التحميل...</span>
            </div>

            <!-- مساحة فارغة للمحاذاة -->
            <div class="top-bar-spacer"></div>

            <!-- تغيير السمة فقط -->
            <div class="top-bar-item theme-toggle-container">
              <button class="theme-toggle" id="theme-toggle" aria-label="تغيير السمة">
                <i class="fas fa-${this.isDarkMode ? 'sun' : 'moon'}"></i>
                <span>${this.isDarkMode ? 'الوضع النهاري' : 'الوضع الليلي'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // حدث تغيير السمة
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  startClock() {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      const dateTimeStr = now.toLocaleDateString('ar-EG', options);
      const timeElement = document.getElementById('current-datetime');
      
      if (timeElement) {
        timeElement.textContent = dateTimeStr;
      }
    };

    // تحديث فوري ثم كل دقيقة
    updateDateTime();
    setInterval(updateDateTime, 60000); // كل دقيقة
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode);
    
    // تحديث الأيقونة والنص
    const toggleBtn = document.getElementById('theme-toggle');
    const icon = toggleBtn.querySelector('i');
    const text = toggleBtn.querySelector('span');
    
    if (this.isDarkMode) {
      icon.className = 'fas fa-sun';
      text.textContent = 'الوضع النهاري';
    } else {
      icon.className = 'fas fa-moon';
      text.textContent = 'الوضع الليلي';
    }
    
    // إرسال حدث تغيير السمة
    document.dispatchEvent(new CustomEvent('themeChanged', {
      detail: { isDarkMode: this.isDarkMode }
    }));
  }
}

export default TopBar;
