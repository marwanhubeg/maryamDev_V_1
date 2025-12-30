// نظام تمرير الأevents المركزي

class EventBus {
    constructor() {
        // تخزين مستمعي الأevents
        this.listeners = new Map();
        
        // سجل الأevents
        this.eventLog = [];
        this.maxLogSize = 100;
        
        console.log('📡 نظام الأevents تم إنشاؤه');
    }
    
    // إطلاق event
    emit(eventName, data = {}) {
        const timestamp = new Date().toISOString();
        const event = { name: eventName, data, timestamp };
        
        // تسجيل الevent
        this.eventLog.unshift(event);
        if (this.eventLog.length > this.maxLogSize) {
            this.eventLog.pop();
        }
        
        // إيجاد المستمعين لهذا الevent
        const eventListeners = this.listeners.get(eventName) || [];
        
        console.log(`🎯 event تم إطلاقه: ${eventName}`, data);
        
        // استدعاء جميع المستمعين
        eventListeners.forEach(listener => {
            try {
                listener(data, eventName);
            } catch (error) {
                console.error(`❌ خطأ في مستمع الevent ${eventName}:`, error);
            }
        });
        
        // إطلاق event عام لجميع المستمعين
        const allListeners = this.listeners.get('*') || [];
        allListeners.forEach(listener => {
            try {
                listener(event);
            } catch (error) {
                console.error('❌ خطأ في المستمع العام:', error);
            }
        });
        
        return this;
    }
    
    // الاستماع إلى event
    on(eventName, callback) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
        }
        
        this.listeners.get(eventName).push(callback);
        
        console.log(`👂 مستمع مضاف لـ: ${eventName}`);
        
        // إرجاع دالة إلغاء الاشتراك
        return () => this.off(eventName, callback);
    }
    
    // الاستماع إلى event مرة واحدة
    once(eventName, callback) {
        const onceWrapper = (data) => {
            callback(data);
            this.off(eventName, onceWrapper);
        };
        
        return this.on(eventName, onceWrapper);
    }
    
    // إلغاء الاشتراك من event
    off(eventName, callback) {
        if (!this.listeners.has(eventName)) {
            return this;
        }
        
        const listeners = this.listeners.get(eventName);
        const index = listeners.indexOf(callback);
        
        if (index !== -1) {
            listeners.splice(index, 1);
            console.log(`👋 مستمع ألغي لـ: ${eventName}`);
        }
        
        return this;
    }
    
    // إزالة جميع المستمعين لـ event
    offAll(eventName) {
        this.listeners.delete(eventName);
        console.log(`🗑️ جميع المستمعين أزيلوا لـ: ${eventName}`);
        return this;
    }
    
    // إزالة جميع المستمعين
    removeAllListeners() {
        this.listeners.clear();
        console.log('🗑️ جميع المستمعين أزيلوا');
        return this;
    }
    
    // الحصول على عدد المستمعين لـ event
    listenerCount(eventName) {
        const listeners = this.listeners.get(eventName);
        return listeners ? listeners.length : 0;
    }
    
    // الحصول على قائمة جميع الأevents
    eventNames() {
        return Array.from(this.listeners.keys());
    }
    
    // الحصول على سجل الأevents
    getEventLog(limit = 20) {
        return this.eventLog.slice(0, limit);
    }
    
    // فحص إذا كان هناك مستمعون لـ event
    hasListeners(eventName) {
        return this.listenerCount(eventName) > 0;
    }
    
    // إنشاء event مخصص
    createCustomEvent(type, detail = {}) {
        const event = new CustomEvent(type, { detail });
        window.dispatchEvent(event);
        return event;
    }
    
    // الأevents المهمة مسبقاً
    predefinedEvents = {
        // أحداث التطبيق
        APP_STARTED: 'app:started',
        APP_STOPPED: 'app:stopped',
        APP_ERROR: 'app:error',
        
        // أحداث الملاحة
        ROUTE_CHANGED: 'route:changed',
        PAGE_LOADED: 'page:loaded',
        
        // أحداث البيانات
        DATA_LOADED: 'data:loaded',
        DATA_UPDATED: 'data:updated',
        DATA_ERROR: 'data:error',
        
        // أحداث الواجهة
        THEME_CHANGED: 'theme:changed',
        LANGUAGE_CHANGED: 'language:changed',
        MODAL_OPENED: 'modal:opened',
        MODAL_CLOSED: 'modal:closed',
        
        // أحداث المستخدم
        USER_LOGIN: 'user:login',
        USER_LOGOUT: 'user:logout',
        
        // أحداث النماذج
        FORM_SUBMITTED: 'form:submitted',
        FORM_VALIDATED: 'form:validated',
        FORM_ERROR: 'form:error'
    };
    
    // مساعدات للأevents المهمة
    app = {
        started: (data) => this.emit(this.predefinedEvents.APP_STARTED, data),
        stopped: (data) => this.emit(this.predefinedEvents.APP_STOPPED, data),
        error: (error) => this.emit(this.predefinedEvents.APP_ERROR, { error })
    };
    
    route = {
        changed: (path) => this.emit(this.predefinedEvents.ROUTE_CHANGED, { path }),
        pageLoaded: (pageName) => this.emit(this.predefinedEvents.PAGE_LOADED, { pageName })
    };
    
    data = {
        loaded: (type, data) => this.emit(this.predefinedEvents.DATA_LOADED, { type, data }),
        updated: (type, data) => this.emit(this.predefinedEvents.DATA_UPDATED, { type, data }),
        error: (type, error) => this.emit(this.predefinedEvents.DATA_ERROR, { type, error })
    };
    
    ui = {
        themeChanged: (theme) => this.emit(this.predefinedEvents.THEME_CHANGED, { theme }),
        languageChanged: (language) => this.emit(this.predefinedEvents.LANGUAGE_CHANGED, { language }),
        modalOpened: (modalType) => this.emit(this.predefinedEvents.MODAL_OPENED, { modalType }),
        modalClosed: () => this.emit(this.predefinedEvents.MODAL_CLOSED)
    };
}

export default EventBus;
