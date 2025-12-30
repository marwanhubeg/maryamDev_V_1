// شريط الإعلانات المتحرك

class AnnouncementBar {
    constructor(eventBus, stateManager) {
        this.eventBus = eventBus;
        this.stateManager = stateManager;
        this.announcements = [
            "🎉 عرض خاص! خصم 20% على جميع الخدمات لهذا الشهر",
            "🚀 جرب خدمتنا الجديدة: التسويق العقاري الرقمي",
            "📞 اتصل بنا الآن للحصول على استشارة مجانية: 01277831988",
            "⭐ قيمنا على Google واحصل على خصم 10%",
            "📧 اشترك في نشرتنا البريدية لآخر العروض"
        ];
        this.currentIndex = 0;
        this.intervalId = null;
    }
    
    render() {
        return `
            <div class="announcement-bar">
                <div class="container">
                    <div class="announcement-content">
                        <span class="announcement-icon">
                            <i class="fas fa-bullhorn"></i>
                        </span>
                        <div class="announcement-text" id="announcement-text">
                            ${this.announcements[this.currentIndex]}
                        </div>
                        <button class="announcement-close" id="announcement-close">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    async init() {
        this.bindEvents();
        this.startRotation();
    }
    
    bindEvents() {
        // زر الإغلاق
        document.addEventListener('click', (e) => {
            if (e.target.closest('#announcement-close')) {
                this.hide();
            }
        });
        
        // النقر على الإعلان
        document.addEventListener('click', (e) => {
            if (e.target.closest('.announcement-text')) {
                this.handleAnnouncementClick();
            }
        });
    }
    
    startRotation() {
        // تغيير الإعلان كل 5 ثواني
        this.intervalId = setInterval(() => {
            this.nextAnnouncement();
        }, 5000);
    }
    
    nextAnnouncement() {
        this.currentIndex = (this.currentIndex + 1) % this.announcements.length;
        this.updateDisplay();
    }
    
    updateDisplay() {
        const textElement = document.getElementById('announcement-text');
        if (textElement) {
            // تأثير التلاشي
            textElement.style.opacity = '0';
            setTimeout(() => {
                textElement.textContent = this.announcements[this.currentIndex];
                textElement.style.opacity = '1';
            }, 300);
        }
    }
    
    hide() {
        const bar = document.querySelector('.announcement-bar');
        if (bar) {
            bar.style.transform = 'translateY(-100%)';
            setTimeout(() => {
                bar.style.display = 'none';
            }, 300);
            
            // إيقاف التدوير
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            
            // حفظ في التخزين المحلي
            localStorage.setItem('announcement_closed', 'true');
        }
    }
    
    handleAnnouncementClick() {
        const announcement = this.announcements[this.currentIndex];
        this.eventBus.emit('announcement:clicked', {
            text: announcement,
            index: this.currentIndex
        });
    }
    
    destroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

export default AnnouncementBar;
