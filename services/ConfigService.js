// خدمة التكوين - إدارة تكوين التطبيق

import AppConfig from '../config/app-config.js';

class ConfigService {
    constructor(eventBus, stateManager) {
        this.eventBus = eventBus;
        this.stateManager = stateManager;
        this.config = { ...AppConfig };
        this.customConfig = {};
    }
    
    async initialize() {
        console.log('⚙️ تهيئة خدمة التكوين...');
        
        try {
            // محاولة تحميل التكوين المخصص من التخزين المحلي
            await this.loadCustomConfig();
            
            // دمج التكوينات
            this.mergeConfigs();
            
            // تحديث الحالة
            this.updateState();
            
            // إطلاق event
            this.eventBus.emit('config:loaded', {
                config: this.config,
                timestamp: new Date().toISOString()
            });
            
            console.log('✅ خدمة التكوين مهيأة');
            
        } catch (error) {
            console.error('❌ خطأ في تهيئة خدمة التكوين:', error);
            throw error;
        }
    }
    
    // تحميل التكوين المخصص من التخزين المحلي
    async loadCustomConfig() {
        try {
            const savedConfig = localStorage.getItem('marwan_hub_config');
            if (savedConfig) {
                this.customConfig = JSON.parse(savedConfig);
                console.log('📂 التكوين المخصص محمل من التخزين المحلي');
            }
        } catch (error) {
            console.warn('⚠️ لا يمكن تحميل التكوين المخصص:', error);
            this.customConfig = {};
        }
    }
    
    // دمج التكوينات
    mergeConfigs() {
        // دمج عميق للتكوينات
        this.config = this.deepMerge(this.config, this.customConfig);
    }
    
    // دمج عميق للكائنات
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
    
    // التحقق إذا كان كائن
    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    }
    
    // تحديث حالة التطبيق
    updateState() {
        this.stateManager.setState({
            config: this.config
        });
    }
    
    // الحصول على التكوين
    getConfig(path = '') {
        if (!path) return this.config;
        
        return path.split('.').reduce((obj, key) => {
            return obj && obj[key] !== undefined ? obj[key] : undefined;
        }, this.config);
    }
    
    // تحديث التكوين
    updateConfig(newConfig, saveToStorage = true) {
        // دمج التغييرات
        this.customConfig = this.deepMerge(this.customConfig, newConfig);
        this.mergeConfigs();
        
        // تحديث الحالة
        this.updateState();
        
        // حفظ في التخزين المحلي إذا مطلوب
        if (saveToStorage) {
            this.saveCustomConfig();
        }
        
        // إطلاق event
        this.eventBus.emit('config:updated', {
            config: this.config,
            changes: newConfig,
            timestamp: new Date().toISOString()
        });
        
        console.log('🔄 التكوين تم تحديثه:', newConfig);
        
        return this.config;
    }
    
    // حفظ التكوين المخصص في التخزين المحلي
    saveCustomConfig() {
        try {
            localStorage.setItem('marwan_hub_config', JSON.stringify(this.customConfig));
            console.log('💾 التكوين المخصص محفوظ في التخزين المحلي');
        } catch (error) {
            console.error('❌ لا يمكن حفظ التكوين المخصص:', error);
        }
    }
    
    // إعادة تعيين التكوين
    resetConfig() {
        this.customConfig = {};
        this.mergeConfigs();
        this.updateState();
        
        // إزالة من التخزين المحلي
        localStorage.removeItem('marwan_hub_config');
        
        // إطلاق event
        this.eventBus.emit('config:reset', {
            config: this.config,
            timestamp: new Date().toISOString()
        });
        
        console.log('🔄 التكوين تم إعادة تعيينه');
        
        return this.config;
    }
    
    // تصدير التكوين
    exportConfig() {
        const configStr = JSON.stringify(this.config, null, 2);
        const blob = new Blob([configStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `marwan_hub_config_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        URL.revokeObjectURL(url);
        
        console.log('📤 التكوين تم تصديره');
    }
    
    // استيراد التكوين
    async importConfig(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                try {
                    const importedConfig = JSON.parse(event.target.result);
                    this.updateConfig(importedConfig);
                    resolve(this.config);
                } catch (error) {
                    reject(new Error('ملف تكوين غير صالح'));
                }
            };
            
            reader.onerror = () => {
                reject(new Error('خطأ في قراءة الملف'));
            };
            
            reader.readAsText(file);
        });
    }
    
    // الحصول على إصدار التطبيق
    getAppVersion() {
        return this.config.app.version;
    }
    
    // الحصول على اسم الشركة
    getCompanyName() {
        return this.config.company.name;
    }
    
    // الحصول على معلومات الاتصال
    getContactInfo() {
        return {
            phone: this.config.company.phone,
            email: this.config.company.email,
            address: this.config.company.address,
            whatsapp: this.config.company.whatsapp
        };
    }
    
    // الحصول على روابط التواصل الاجتماعي
    getSocialLinks() {
        return this.config.social;
    }
    
    // التحقق من وجود ميزة
    isFeatureEnabled(feature) {
        return this.config.settings[feature] || false;
    }
    
    // تدمير الخدمة
    destroy() {
        console.log('🗑️ خدمة التكوين دمرت');
    }
}

export default ConfigService;
