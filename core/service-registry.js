// سجل الخدمات المركزي

class ServiceRegistry {
    constructor(eventBus, stateManager) {
        this.eventBus = eventBus;
        this.stateManager = stateManager;
        this.services = new Map();
        this.initializedServices = new Set();
        
        console.log('🔧 سجل الخدمات تم إنشاؤه');
    }
    
    // تهيئة جميع الخدمات
    async initialize() {
        console.log('🔄 تهيئة الخدمات...');
        
        // قائمة الخدمات المطلوبة
        const requiredServices = [
            'ConfigService',
            'StorageService',
            'ApiService',
            'AuthService',
            'AnalyticsService'
        ];
        
        // تحميل وتهيئة الخدمات
        for (const serviceName of requiredServices) {
            try {
                await this.loadService(serviceName);
                console.log(`✅ ${serviceName} محملة`);
            } catch (error) {
                console.error(`❌ فشل تحميل ${serviceName}:`, error);
            }
        }
        
        console.log(`🎉 جميع الخدمات محملة (${this.services.size} خدمة)`);
    }
    
    // تحميل خدمة
    async loadService(serviceName) {
        // إذا كانت الخدمة محملة مسبقاً
        if (this.services.has(serviceName)) {
            return this.services.get(serviceName);
        }
        
        try {
            // بناء مسار الخدمة
            const servicePath = `../services/${serviceName.toLowerCase()}.js`;
            
            // استيراد الخدمة
            const module = await import(servicePath);
            const ServiceClass = module.default;
            
            // إنشاء مثيل الخدمة
            const serviceInstance = new ServiceClass(this.eventBus, this.stateManager);
            
            // تهيئة الخدمة
            if (serviceInstance.initialize) {
                await serviceInstance.initialize();
            }
            
            // تسجيل الخدمة
            this.services.set(serviceName, serviceInstance);
            this.initializedServices.add(serviceName);
            
            // إطلاق event تحميل الخدمة
            this.eventBus.emit('service:loaded', {
                name: serviceName,
                instance: serviceInstance,
                timestamp: new Date().toISOString()
            });
            
            console.log(`🔧 ${serviceName} محملة وتهيئتها`);
            
            return serviceInstance;
            
        } catch (error) {
            console.error(`❌ فشل تحميل الخدمة ${serviceName}:`, error);
            throw error;
        }
    }
    
    // الحصول على خدمة
    getService(serviceName) {
        const service = this.services.get(serviceName);
        
        if (!service) {
            console.warn(`⚠️ الخدمة ${serviceName} غير موجودة`);
        }
        
        return service;
    }
    
    // التحقق من وجود خدمة
    hasService(serviceName) {
        return this.services.has(serviceName);
    }
    
    // تسجيل خدمة مخصصة
    registerService(serviceName, serviceInstance) {
        if (this.services.has(serviceName)) {
            console.warn(`⚠️ الخدمة ${serviceName} مسجلة مسبقاً، سيتم استبدالها`);
        }
        
        this.services.set(serviceName, serviceInstance);
        
        // تهيئة الخدمة إذا لزم الأمر
        if (serviceInstance.initialize && !this.initializedServices.has(serviceName)) {
            serviceInstance.initialize().then(() => {
                this.initializedServices.add(serviceName);
            }).catch(error => {
                console.error(`❌ فشل تهيئة الخدمة ${serviceName}:`, error);
            });
        }
        
        console.log(`🆕 خدمة مخصصة مسجلة: ${serviceName}`);
        
        return this;
    }
    
    // إلغاء تسجيل خدمة
    unregisterService(serviceName) {
        const service = this.services.get(serviceName);
        
        if (service && service.destroy) {
            try {
                service.destroy();
            } catch (error) {
                console.error(`❌ خطأ في تدمير الخدمة ${serviceName}:`, error);
            }
        }
        
        this.services.delete(serviceName);
        this.initializedServices.delete(serviceName);
        
        console.log(`🗑️ خدمة ملغية: ${serviceName}`);
        
        return this;
    }
    
    // الحصول على قائمة الخدمات
    listServices() {
        return Array.from(this.services.entries()).map(([name, instance]) => ({
            name,
            type: instance.constructor.name,
            initialized: this.initializedServices.has(name)
        }));
    }
    
    // إغلاق جميع الخدمات
    async shutdown() {
        console.log('🛑 إغلاق جميع الخدمات...');
        
        const shutdownPromises = [];
        
        this.services.forEach((service, name) => {
            if (service.destroy) {
                shutdownPromises.push(
                    Promise.resolve(service.destroy()).then(() => {
                        console.log(`✅ ${name} أغلقت بنجاح`);
                    }).catch(error => {
                        console.error(`❌ خطأ في إغلاق ${name}:`, error);
                    })
                );
            }
        });
        
        await Promise.all(shutdownPromises);
        
        // تنظيف السجلات
        this.services.clear();
        this.initializedServices.clear();
        
        console.log('✅ جميع الخدمات أغلقت');
    }
    
    // إعادة تحميل خدمة
    async reloadService(serviceName) {
        console.log(`🔄 إعادة تحميل الخدمة ${serviceName}...`);
        
        // إلغاء التسجيل إذا كانت موجودة
        if (this.services.has(serviceName)) {
            await this.unregisterService(serviceName);
        }
        
        // إعادة التحميل
        return this.loadService(serviceName);
    }
    
    // مساعدات للخدمات الشائعة
    get config() {
        return this.getService('ConfigService');
    }
    
    get storage() {
        return this.getService('StorageService');
    }
    
    get api() {
        return this.getService('ApiService');
    }
    
    get auth() {
        return this.getService('AuthService');
    }
    
    get analytics() {
        return this.getService('AnalyticsService');
    }
    
    // تسجيل الخدمات المدمجة
    async registerBuiltinServices() {
        const builtinServices = {
            // خدمة الوقت والتاريخ
            TimeService: class TimeService {
                constructor(eventBus, stateManager) {
                    this.eventBus = eventBus;
                    this.stateManager = stateManager;
                    this.intervalId = null;
                }
                
                initialize() {
                    this.startUpdating();
                    return Promise.resolve();
                }
                
                startUpdating() {
                    this.updateTime();
                    this.intervalId = setInterval(() => this.updateTime(), 60000); // كل دقيقة
                }
                
                updateTime() {
                    const now = new Date();
                    const time = now.toLocaleTimeString('ar-EG', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    });
                    
                    const date = now.toLocaleDateString('ar-EG', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    
                    // تحديث الحالة
                    this.stateManager.setState({
                        time: { current: time, date }
                    });
                    
                    // إطلاق event
                    this.eventBus.emit('time:updated', { time, date });
                }
                
                destroy() {
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                }
            },
            
            // خدمة الطقس
            WeatherService: class WeatherService {
                constructor(eventBus, stateManager) {
                    this.eventBus = eventBus;
                    this.stateManager = stateManager;
                    this.weatherData = null;
                }
                
                async initialize() {
                    await this.fetchWeather();
                    // تحديث الطقس كل 30 دقيقة
                    setInterval(() => this.fetchWeather(), 30 * 60 * 1000);
                }
                
                async fetchWeather() {
                    try {
                        // محاكاة بيانات الطقس (في الإصدار الحقيقي، استدعاء API)
                        this.weatherData = {
                            temperature: 28,
                            condition: 'مشمس',
                            icon: 'fas fa-sun',
                            humidity: 45,
                            windSpeed: 12
                        };
                        
                        // تحديث الحالة
                        this.stateManager.setState({
                            weather: this.weatherData
                        });
                        
                        // إطلاق event
                        this.eventBus.emit('weather:updated', this.weatherData);
                        
                    } catch (error) {
                        console.error('❌ خطأ في جلب بيانات الطقس:', error);
                    }
                }
                
                getWeather() {
                    return this.weatherData;
                }
            }
        };
        
        // تسجيل الخدمات المدمجة
        for (const [name, ServiceClass] of Object.entries(builtinServices)) {
            const instance = new ServiceClass(this.eventBus, this.stateManager);
            this.registerService(name, instance);
        }
    }
}

export default ServiceRegistry;
