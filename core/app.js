// التطبيق الرئيسي - إدارة النظام بأكمله

import StateManager from './state-manager.js';
import Router from './router.js';
import EventBus from './event-bus.js';
import ServiceRegistry from './service-registry.js';

class App {
    constructor() {
        // المكونات الأساسية
        this.stateManager = null;
        this.router = null;
        this.eventBus = null;
        this.services = null;
        
        // حالة التطبيق
        this.isInitialized = false;
        this.isStarted = false;
        
        // عناصر DOM
        this.appContainer = document.getElementById('app');
        this.loadingScreen = document.getElementById('loading-screen');
    }
    
    // تهيئة التطبيق
    async initialize() {
        try {
            console.log('🚀 تهيئة نظام مارون هاب...');
            
            // 1. إنشاء نظام الأحداث
            this.eventBus = new EventBus();
            console.log('✅ نظام الأحداث جاهز');
            
            // 2. إنشاء مدير الحالة
            this.stateManager = new StateManager();
            console.log('✅ مدير الحالة جاهز');
            
            // 3. إنشاء سجل الخدمات
            this.services = new ServiceRegistry(this.eventBus, this.stateManager);
            await this.services.initialize();
            console.log('✅ سجل الخدمات جاهز');
            
            // 4. تحميل التكوينات
            await this.loadConfigurations();
            console.log('✅ التكوينات محملة');
            
            // 5. إنشاء الموجه
            this.router = new Router(this.eventBus, this.stateManager);
            console.log('✅ الموجه جاهز');
            
            // 6. إعداد مستمعي الأحداث
            this.setupEventListeners();
            console.log('✅ مستمعي الأevents جاهزون');
            
            this.isInitialized = true;
            console.log('🎉 التطبيق مهيأ بنجاح!');
            
        } catch (error) {
            console.error('❌ خطأ في تهيئة التطبيق:', error);
            throw error;
        }
    }
    
    // بدء تشغيل التطبيق
    async start() {
        if (!this.isInitialized) {
            await this.initialize();
        }
        
        try {
            console.log('🚀 بدء تشغيل النظام...');
            
            // 1. عرض الصفحة الرئيسية
            await this.router.navigate('/');
            
            // 2. تحديث الحالة الأولية
            this.stateManager.setState({
                app: {
                    ...this.stateManager.state.app,
                    isStarted: true,
                    startTime: new Date().toISOString()
                }
            });
            
            // 3. إطلاق حدث بدء التشغيل
            this.eventBus.emit('app:started', {
                version: '2.0.0',
                timestamp: new Date().toISOString()
            });
            
            this.isStarted = true;
            console.log('✅ النظام يعمل بنجاح!');
            
        } catch (error) {
            console.error('❌ خطأ في بدء التشغيل:', error);
            throw error;
        }
    }
    
    // تحميل التكوينات
    async loadConfigurations() {
        try {
            // تحميل تكوين التطبيق
            const appConfig = await import('../config/app-config.js');
            this.stateManager.setState({ config: appConfig.default });
            
            // تحميل تكوين المسارات
            const routesConfig = await import('../config/routes-config.js');
            this.stateManager.setState({ routes: routesConfig.default });
            
            // تحميل تكوين السمة
            const themeConfig = await import('../config/theme-config.js');
            this.stateManager.setState({ theme: themeConfig.default });
            
        } catch (error) {
            console.warn('⚠️ خطأ في تحميل التكوينات:', error);
            // استخدام التكوينات الافتراضية
            this.loadDefaultConfigurations();
        }
    }
    
    // تحميل التكوينات الافتراضية
    loadDefaultConfigurations() {
        const defaultConfig = {
            app: {
                name: 'مارون هاب',
                version: '2.0.0',
                description: 'المنصة المتكاملة للخدمات الرقمية'
            },
            company: {
                name: 'مارون هاب',
                phone: '01277831988',
                email: 'marwanhub.eg@gmail.com',
                address: 'القاهرة، مصر',
                workingHours: '9:00 ص - 5:00 م'
            },
            social: {
                facebook: 'https://facebook.com/marwanhub',
                twitter: 'https://twitter.com/marwanhub',
                instagram: 'https://instagram.com/marwanhub',
                linkedin: 'https://linkedin.com/company/marwanhub'
            }
        };
        
        this.stateManager.setState({ config: defaultConfig });
    }
    
    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // حدث تحميل الصفحة
        this.eventBus.on('page:loaded', (data) => {
            console.log(`📄 صفحة محملة: ${data.pageName}`);
        });
        
        // حدث تغيير المسار
        this.eventBus.on('route:changed', (data) => {
            console.log(`🛣️ تغيير المسار إلى: ${data.path}`);
        });
        
        // حدث خطأ
        this.eventBus.on('error:occurred', (error) => {
            console.error('🔥 حدث خطأ:', error);
            this.showErrorMessage(error.message);
        });
        
        // حدث تحميل الخدمة
        this.eventBus.on('service:loaded', (service) => {
            console.log(`🔧 خدمة محملة: ${service.name}`);
        });
    }
    
    // عرض رسالة خطأ
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
                <button class="close-error"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // إزالة الرسالة بعد 5 ثواني
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
        
        // زر الإغلاق
        errorDiv.querySelector('.close-error').addEventListener('click', () => {
            errorDiv.remove();
        });
    }
    
    // إيقاف التطبيق
    async stop() {
        console.log('🛑 إيقاف النظام...');
        
        // إطلاق حدث التوقف
        this.eventBus.emit('app:stopping');
        
        // تنظيف الموارد
        this.eventBus.removeAllListeners();
        
        // إعادة تعيين الحالة
        this.stateManager.setState({
            app: { isStarted: false }
        });
        
        this.isStarted = false;
        console.log('✅ النظام متوقف');
    }
    
    // إعادة تشغيل التطبيق
    async restart() {
        console.log('🔃 إعادة تشغيل النظام...');
        await this.stop();
        await this.start();
    }
}

export default App;
