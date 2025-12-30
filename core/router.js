// نظام التوجيه للصفحات

import routesConfig from '../config/routes-config.js';

class Router {
    constructor(eventBus, stateManager) {
        this.eventBus = eventBus;
        this.stateManager = stateManager;
        this.routes = routesConfig;
        this.currentRoute = null;
        this.previousRoute = null;
        
        console.log('🛣️ الموجه تم إنشاؤه');
    }
    
    // تهيئة الموجه
    initialize() {
        this.setupEventListeners();
        this.handleInitialRoute();
    }
    
    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // تغيير الرابط
        window.addEventListener('hashchange', () => this.handleHashChange());
        
        // زر الرجوع
        window.addEventListener('popstate', () => this.handleHashChange());
        
        // النقر على الروابط الداخلية
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[data-route]');
            if (link) {
                e.preventDefault();
                const path = link.getAttribute('href');
                this.navigate(path);
            }
        });
        
        // الاستماع لأحداث التوجيه
        this.eventBus.on('navigate:to', (data) => {
            this.navigate(data.path);
        });
        
        this.eventBus.on('navigate:back', () => {
            this.goBack();
        });
    }
    
    // التعامل مع المسار الأولي
    handleInitialRoute() {
        const initialPath = this.getCurrentPath();
        this.navigate(initialPath, { replace: true });
    }
    
    // التعامل مع تغيير الرابط
    handleHashChange() {
        const path = this.getCurrentPath();
        this.navigate(path);
    }
    
    // الحصول على المسار الحالي
    getCurrentPath() {
        const hash = window.location.hash.slice(1);
        return hash || '/';
    }
    
    // التنقل إلى مسار
    async navigate(path, options = {}) {
        // تطبيع المسار
        path = this.normalizePath(path);
        
        // البحث عن المسار المطابق
        const route = this.findRoute(path);
        
        if (!route) {
            console.warn(`⚠️ المسار غير موجود: ${path}`);
            this.navigate('/');
            return;
        }
        
        // تحديث الرابط في المتصفح
        this.updateBrowserURL(path, options);
        
        // تحميل الصفحة
        await this.loadPage(route);
        
        // تحديث حالة التوجيه
        this.updateRouteState(route, path);
    }
    
    // تطبيع المسار
    normalizePath(path) {
        // إزالة / في البداية والنهاية
        path = path.replace(/^\/+|\/+$/g, '');
        
        // إضافة / في البداية
        return '/' + (path || '');
    }
    
    // البحث عن مسار مطابق
    findRoute(path) {
        // البحث عن تطابق تام أولاً
        let route = this.routes.find(r => r.path === path);
        
        if (route) return route;
        
        // البحث عن مسار ديناميكي
        route = this.routes.find(r => {
            if (r.path.includes(':')) {
                const routeParts = r.path.split('/');
                const pathParts = path.split('/');
                
                if (routeParts.length !== pathParts.length) return false;
                
                for (let i = 0; i < routeParts.length; i++) {
                    if (routeParts[i].startsWith(':')) continue;
                    if (routeParts[i] !== pathParts[i]) return false;
                }
                
                return true;
            }
            
            return false;
        });
        
        if (route) return route;
        
        // البحث عن المسار الافتراضي
        return this.routes.find(r => r.path === '*');
    }
    
    // تحديث رابط المتصفح
    updateBrowserURL(path, options) {
        if (options.replace) {
            window.history.replaceState(null, '', `#${path}`);
        } else {
            window.history.pushState(null, '', `#${path}`);
        }
    }
    
    // تحميل الصفحة
    async loadPage(route) {
        try {
            // إظهار مؤشر التحميل
            this.showLoader();
            
            // تحميل مكون الصفحة
            const PageComponent = await route.component();
            
            // إنشاء مثيل الصفحة
            const page = new PageComponent.default(this.eventBus, this.stateManager);
            
            // عرض الصفحة
            this.renderPage(page);
            
            // تهيئة الصفحة
            if (page.init) {
                await page.init();
            }
            
            // إطلاق حدث تحميل الصفحة
            this.eventBus.emit('page:loaded', {
                name: route.name,
                path: route.path,
                timestamp: new Date().toISOString()
            });
            
            // إخفاء مؤشر التحميل
            this.hideLoader();
            
        } catch (error) {
            console.error(`❌ خطأ في تحميل الصفحة ${route.path}:`, error);
            
            // تحميل صفحة الخطأ
            this.loadErrorPage(error);
            
            this.hideLoader();
        }
    }
    
    // عرض الصفحة
    renderPage(page) {
        const appContainer = document.getElementById('app');
        
        if (!appContainer) {
            console.error('❌ حاوية التطبيق غير موجودة');
            return;
        }
        
        // تنظيف الحاوية
        appContainer.innerHTML = '';
        
        // عرض الصفحة
        const pageElement = page.render();
        appContainer.innerHTML = pageElement;
        
        // ربط الأحداث إذا كان هناك دالة bindEvents
        if (page.bindEvents) {
            page.bindEvents();
        }
    }
    
    // تحميل صفحة الخطأ
    loadErrorPage(error) {
        const appContainer = document.getElementById('app');
        
        appContainer.innerHTML = `
            <div class="error-page">
                <div class="error-content">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h1>حدث خطأ</h1>
                    <p>عذراً، حدث خطأ في تحميل الصفحة المطلوبة.</p>
                    <p class="error-details">${error.message}</p>
                    <div class="error-actions">
                        <button class="btn btn-primary" id="retry-btn">
                            <i class="fas fa-redo"></i> إعادة المحاولة
                        </button>
                        <button class="btn btn-outline" id="home-btn">
                            <i class="fas fa-home"></i> العودة للرئيسية
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // ربط الأحداث
        document.getElementById('retry-btn').addEventListener('click', () => {
            location.reload();
        });
        
        document.getElementById('home-btn').addEventListener('click', () => {
            this.navigate('/');
        });
    }
    
    // تحديث حالة التوجيه
    updateRouteState(route, path) {
        this.previousRoute = this.currentRoute;
        this.currentRoute = route;
        
        // تحديث حالة التطبيق
        this.stateManager.actions.navigateTo(path);
        
        // إطلاق حدث تغيير المسار
        this.eventBus.emit('route:changed', {
            path,
            routeName: route.name,
            previousRoute: this.previousRoute ? this.previousRoute.path : null
        });
    }
    
    // الرجوع للخلف
    goBack() {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            this.navigate('/');
        }
    }
    
    // إعادة تحميل الصفحة الحالية
    reload() {
        if (this.currentRoute) {
            this.navigate(this.currentRoute.path);
        }
    }
    
    // الحصول على المسار الحالي
    getCurrentRoute() {
        return this.currentRoute;
    }
    
    // الحصول على المسار السابق
    getPreviousRoute() {
        return this.previousRoute;
    }
    
    // إظهار مؤشر التحميل
    showLoader() {
        const loader = document.getElementById('global-loader');
        if (loader) {
            loader.classList.remove('hidden');
        }
    }
    
    // إخفاء مؤشر التحميل
    hideLoader() {
        const loader = document.getElementById('global-loader');
        if (loader) {
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 300);
        }
    }
    
    // تسجيل مسار جديد
    registerRoute(route) {
        this.routes.push(route);
        console.log(`🆕 مسار جديد مسجل: ${route.path}`);
    }
    
    // إلغاء تسجيل مسار
    unregisterRoute(path) {
        this.routes = this.routes.filter(r => r.path !== path);
        console.log(`🗑️ مسار ملغي: ${path}`);
    }
}

export default Router;
