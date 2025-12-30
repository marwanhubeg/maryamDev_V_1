// نظام إدارة الحالة المركزي

class StateManager {
    constructor() {
        // الحالة الأولية
        this.state = {
            app: {
                isInitialized: false,
                isStarted: false,
                isLoading: false,
                error: null,
                version: '2.0.0'
            },
            config: {},
            user: {
                isAuthenticated: false,
                data: null,
                permissions: []
            },
            ui: {
                theme: 'light',
                language: 'ar',
                sidebarOpen: false,
                modalOpen: false,
                currentModal: null,
                notifications: []
            },
            data: {
                services: [],
                gallery: [],
                testimonials: [],
                statistics: {},
                filteredServices: []
            },
            forms: {
                contact: {},
                quote: {},
                search: {}
            },
            navigation: {
                currentPage: '/',
                previousPage: null,
                history: []
            }
        };
        
        // المشتركون في التغييرات
        this.subscribers = new Map();
        this.subscriberId = 0;
        
        // تسجيل الحالة السابقة
        this.previousState = JSON.parse(JSON.stringify(this.state));
        
        console.log('🧠 مدير الحالة تم إنشاؤه');
    }
    
    // تحديث الحالة
    setState(newState) {
        // حفظ الحالة السابقة
        this.previousState = JSON.parse(JSON.stringify(this.state));
        
        // دمج الحالة الجديدة
        this.state = this.deepMerge(this.state, newState);
        
        // إطلاق حدث تغيير الحالة
        this.notifySubscribers();
        
        console.log('🔄 الحالة تم تحديثها:', newState);
    }
    
    // دمج عميق للحالة
    deepMerge(target, source) {
        const output = { ...target };
        
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        output[key] = source[key];
                    } else {
                        output[key] = this.deepMerge(target[key], source[key]);
                    }
                } else {
                    output[key] = source[key];
                }
            });
        }
        
        return output;
    }
    
    // التحقق إذا كان الكائن
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }
    
    // الحصول على الحالة
    getState(path = '') {
        if (!path) return this.state;
        
        return path.split('.').reduce((obj, key) => {
            return obj && obj[key] !== undefined ? obj[key] : undefined;
        }, this.state);
    }
    
    // الاشتراك في التغييرات
    subscribe(callback, paths = []) {
        const id = ++this.subscriberId;
        
        this.subscribers.set(id, {
            callback,
            paths,
            id
        });
        
        console.log(`👥 مشترك جديد (ID: ${id})`);
        
        // إرجاع دالة إلغاء الاشتراك
        return () => {
            this.subscribers.delete(id);
            console.log(`👋 المشترك (ID: ${id}) ألغى الاشتراك`);
        };
    }
    
    // إشعار المشتركين
    notifySubscribers() {
        const changedPaths = this.getChangedPaths();
        
        this.subscribers.forEach((subscriber, id) => {
            try {
                // إذا لم يكن هناك مسارات محددة، إرسال كل التغييرات
                if (subscriber.paths.length === 0) {
                    subscriber.callback(this.state, this.previousState, changedPaths);
                } else {
                    // التحقق إذا تغيرت أي من المسارات المشتركة
                    const relevantChanges = changedPaths.filter(path =>
                        subscriber.paths.some(subPath => path.startsWith(subPath))
                    );
                    
                    if (relevantChanges.length > 0) {
                        subscriber.callback(this.state, this.previousState, relevantChanges);
                    }
                }
            } catch (error) {
                console.error(`❌ خطأ في إشعار المشترك ${id}:`, error);
            }
        });
    }
    
    // الحصول على المسارات التي تغيرت
    getChangedPaths() {
        const changedPaths = [];
        
        const compareObjects = (obj1, obj2, path = '') => {
            const allKeys = new Set([
                ...Object.keys(obj1),
                ...Object.keys(obj2)
            ]);
            
            allKeys.forEach(key => {
                const currentPath = path ? `${path}.${key}` : key;
                const val1 = obj1[key];
                const val2 = obj2[key];
                
                if (this.isObject(val1) && this.isObject(val2)) {
                    compareObjects(val1, val2, currentPath);
                } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
                    changedPaths.push(currentPath);
                }
            });
        };
        
        compareObjects(this.previousState, this.state);
        return changedPaths;
    }
    
    // إجراءات مساعدة
    actions = {
        // إجراءات التطبيق
        setLoading: (isLoading) => {
            this.setState({
                app: { ...this.state.app, isLoading }
            });
        },
        
        setError: (error) => {
            this.setState({
                app: { ...this.state.app, error }
            });
        },
        
        clearError: () => {
            this.setState({
                app: { ...this.state.app, error: null }
            });
        },
        
        // إجراءات الواجهة
        toggleTheme: () => {
            const newTheme = this.state.ui.theme === 'light' ? 'dark' : 'light';
            this.setState({
                ui: { ...this.state.ui, theme: newTheme }
            });
            
            // حفظ في التخزين المحلي
            localStorage.setItem('theme', newTheme);
        },
        
        setLanguage: (language) => {
            this.setState({
                ui: { ...this.state.ui, language }
            });
            
            // حفظ في التخزين المحلي
            localStorage.setItem('language', language);
        },
        
        toggleSidebar: () => {
            this.setState({
                ui: { 
                    ...this.state.ui, 
                    sidebarOpen: !this.state.ui.sidebarOpen 
                }
            });
        },
        
        openModal: (modalType) => {
            this.setState({
                ui: { 
                    ...this.state.ui, 
                    modalOpen: true,
                    currentModal: modalType
                }
            });
        },
        
        closeModal: () => {
            this.setState({
                ui: { 
                    ...this.state.ui, 
                    modalOpen: false,
                    currentModal: null
                }
            });
        },
        
        addNotification: (notification) => {
            const notifications = [...this.state.ui.notifications, {
                ...notification,
                id: Date.now(),
                timestamp: new Date().toISOString()
            }];
            
            this.setState({
                ui: { ...this.state.ui, notifications }
            });
            
            // إزالة الإشعار بعد 5 ثواني
            if (!notification.persistent) {
                setTimeout(() => {
                    this.actions.removeNotification(notification.id);
                }, 5000);
            }
        },
        
        removeNotification: (id) => {
            const notifications = this.state.ui.notifications.filter(n => n.id !== id);
            this.setState({
                ui: { ...this.state.ui, notifications }
            });
        },
        
        // إجراءات البيانات
        setServices: (services) => {
            this.setState({
                data: { ...this.state.data, services }
            });
        },
        
        filterServices: (filter) => {
            const filtered = this.state.data.services.filter(service => {
                if (filter === 'all') return true;
                return service.category === filter;
            });
            
            this.setState({
                data: { ...this.state.data, filteredServices: filtered }
            });
        },
        
        // إجراءات الملاحة
        navigateTo: (path) => {
            const history = [...this.state.navigation.history, this.state.navigation.currentPage];
            
            this.setState({
                navigation: {
                    ...this.state.navigation,
                    previousPage: this.state.navigation.currentPage,
                    currentPage: path,
                    history: history.slice(-10) // حفظ آخر 10 صفحات
                }
            });
        },
        
        goBack: () => {
            if (this.state.navigation.history.length > 0) {
                const previousPage = this.state.navigation.history.pop();
                
                this.setState({
                    navigation: {
                        ...this.state.navigation,
                        currentPage: previousPage,
                        history: this.state.navigation.history
                    }
                });
            }
        }
    };
}

export default StateManager;
