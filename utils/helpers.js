// ملف المساعدات - دوال وأدوات مساعدة

// تحويل النصوص العربية
export const arabicText = {
    // الأيام
    days: ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
    
    // الأشهر
    months: [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
    ],
    
    // أوقات الصلاة
    prayerTimes: ['الفجر', 'الشروق', 'الظهر', 'العصر', 'المغرب', 'العشاء'],
    
    // الأرقام العربية
    numbers: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
    
    // تحويل الأرقام إلى عربية
    toArabicNumbers: (num) => {
        return num.toString().replace(/\d/g, (d) => this.numbers[d]);
    },
    
    // تحويل التاريخ إلى عربي
    toArabicDate: (date) => {
        const d = new Date(date);
        const day = this.days[d.getDay()];
        const month = this.months[d.getMonth()];
        const year = this.toArabicNumbers(d.getFullYear());
        const dayNumber = this.toArabicNumbers(d.getDate());
        
        return `${day}، ${dayNumber} ${month} ${year}`;
    }
};

// دوال التنسيق
export const formatters = {
    // تنسيق الأرقام (إضافة فواصل)
    formatNumber: (num) => {
        return new Intl.NumberFormat('ar-EG').format(num);
    },
    
    // تنسيق العملة
    formatCurrency: (amount, currency = 'EGP') => {
        return new Intl.NumberFormat('ar-EG', {
            style: 'currency',
            currency: currency
        }).format(amount);
    },
    
    // تنسيق التاريخ
    formatDate: (date, format = 'medium') => {
        const options = {
            year: 'numeric',
            month: format === 'short' ? 'short' : 'long',
            day: 'numeric',
            weekday: format === 'full' ? 'long' : undefined
        };
        
        return new Date(date).toLocaleDateString('ar-EG', options);
    },
    
    // تنسيق الوقت
    formatTime: (date) => {
        return new Date(date).toLocaleTimeString('ar-EG', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },
    
    // تقصير النص
    truncateText: (text, maxLength = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },
    
    // تحويل بايت إلى حجم مقروء
    formatBytes: (bytes, decimals = 2) => {
        if (bytes === 0) return '0 بايت';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['بايت', 'كيلوبايت', 'ميجابايت', 'جيجابايت', 'تيرابايت'];
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    
    // تنسيق الوقت المنقضي
    formatTimeAgo: (date) => {
        const now = new Date();
        const then = new Date(date);
        const diff = now - then;
        
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
        const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
        
        if (years > 0) return `منذ ${years} ${years === 1 ? 'سنة' : 'سنوات'}`;
        if (months > 0) return `منذ ${months} ${months === 1 ? 'شهر' : 'أشهر'}`;
        if (days > 0) return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
        if (hours > 0) return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
        if (minutes > 0) return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
        
        return 'الآن';
    }
};

// دوال التحقق
export const validators = {
    // التحقق من البريد الإلكتروني
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // التحقق من رقم الهاتف المصري
    isValidEgyptPhone: (phone) => {
        const phoneRegex = /^(?:\+20|0)?1[0125][0-9]{8}$/;
        return phoneRegex.test(phone);
    },
    
    // التحقق من الرقم القومي المصري
    isValidEgyptNationalId: (id) => {
        if (!/^\d{14}$/.test(id)) return false;
        
        const year = parseInt(id.substring(1, 3));
        const month = parseInt(id.substring(3, 5));
        const day = parseInt(id.substring(5, 7));
        const governorate = parseInt(id.substring(7, 9));
        
        if (year < 0 || year > 99) return false;
        if (month < 1 || month > 12) return false;
        if (day < 1 || day > 31) return false;
        if (governorate < 1 || governorate > 27) return false;
        
        return true;
    },
    
    // التحقق من كلمة المرور
    isValidPassword: (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return {
            isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
            minLength: password.length >= minLength,
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
            hasSpecialChar
        };
    },
    
    // التحقق من أن الحقل غير فارغ
    isNotEmpty: (value) => {
        return value !== null && value !== undefined && value.toString().trim() !== '';
    },
    
    // التحقق من أن القيمة رقم
    isNumber: (value) => {
        return !isNaN(parseFloat(value)) && isFinite(value);
    },
    
    // التحقق من أن القيمة ضمن نطاق
    isInRange: (value, min, max) => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= min && num <= max;
    }
};

// دوال المصفوفات
export const arrayHelpers = {
    // البحث في مصفوفة الكائنات
    searchInArray: (array, query, fields) => {
        if (!query) return array;
        
        query = query.toLowerCase();
        return array.filter(item => {
            return fields.some(field => {
                const value = item[field];
                if (value && typeof value === 'string') {
                    return value.toLowerCase().includes(query);
                }
                return false;
            });
        });
    },
    
    // ترتيب مصفوفة
    sortArray: (array, key, order = 'asc') => {
        return [...array].sort((a, b) => {
            const aValue = a[key];
            const bValue = b[key];
            
            if (order === 'asc') {
                return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
            } else {
                return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
            }
        });
    },
    
    // تجميع مصفوفة حسب مفتاح
    groupBy: (array, key) => {
        return array.reduce((groups, item) => {
            const groupKey = item[key];
            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }
            groups[groupKey].push(item);
            return groups;
        }, {});
    },
    
    // إزالة التكرارات
    uniqueBy: (array, key) => {
        const seen = new Set();
        return array.filter(item => {
            const value = item[key];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });
    },
    
    // تقسيم المصفوفة إلى مجموعات
    chunkArray: (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }
};

// دوال الكائنات
export const objectHelpers = {
    // دمج عميق للكائنات
    deepMerge: (target, source) => {
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
    },
    
    // التحقق إذا كان كائن
    isObject: (item) => {
        return item && typeof item === 'object' && !Array.isArray(item);
    },
    
    // الحصول على قيمة من مسار
    getValue: (obj, path, defaultValue) => {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : defaultValue;
        }, obj);
    },
    
    // تعيين قيمة في مسار
    setValue: (obj, path, value) => {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            return current[key];
        }, obj);
        
        target[lastKey] = value;
        return obj;
    },
    
    // إزافة القيم الفارغة
    removeEmptyValues: (obj) => {
        return Object.fromEntries(
            Object.entries(obj).filter(([_, v]) => v != null && v !== '')
        );
    }
};

// دوال DOM
export const domHelpers = {
    // إنشاء عنصر
    createElement: (tag, attributes = {}, children = []) => {
        const element = document.createElement(tag);
        
        // تعيين السمات
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'textContent') {
                element.textContent = value;
            } else if (key === 'innerHTML') {
                element.innerHTML = value;
            } else if (key.startsWith('on') && typeof value === 'function') {
                const eventName = key.substring(2).toLowerCase();
                element.addEventListener(eventName, value);
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // إضافة الأبناء
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                element.appendChild(child);
            }
        });
        
        return element;
    },
    
    // إضافة فئة مع الانتقال
    addClassWithTransition: (element, className) => {
        element.classList.add(className);
        return new Promise(resolve => {
            const onTransitionEnd = () => {
                element.removeEventListener('transitionend', onTransitionEnd);
                resolve();
            };
            element.addEventListener('transitionend', onTransitionEnd);
        });
    },
    
    // إزالة فئة مع الانتقال
    removeClassWithTransition: (element, className) => {
        return new Promise(resolve => {
            const onTransitionEnd = () => {
                element.removeEventListener('transitionend', onTransitionEnd);
                element.classList.remove(className);
                resolve();
            };
            element.addEventListener('transitionend', onTransitionEnd);
            // تشغيل إعادة التدفق لإطلاق الانتقال
            element.offsetHeight;
        });
    },
    
    // التحقق من ظهور العنصر في الشاشة
    isElementInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // الانتقال السلس إلى عنصر
    smoothScrollToElement: (element, offset = 0) => {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

// دوال التخزين
export const storageHelpers = {
    // حفظ في التخزين المحلي
    saveToLocalStorage: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('❌ خطأ في حفظ البيانات:', error);
            return false;
        }
    },
    
    // التحميل من التخزين المحلي
    loadFromLocalStorage: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('❌ خطأ في تحميل البيانات:', error);
            return defaultValue;
        }
    },
    
    // إزالة من التخزين المحلي
    removeFromLocalStorage: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('❌ خطأ في إزالة البيانات:', error);
            return false;
        }
    },
    
    // مسح التخزين المحلي
    clearLocalStorage: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('❌ خطأ في مسح التخزين:', error);
            return false;
        }
    },
    
    // التخزين في الجلسة
    saveToSessionStorage: (key, value) => {
        try {
            sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('❌ خطأ في حفظ الجلسة:', error);
            return false;
        }
    },
    
    // التحميل من الجلسة
    loadFromSessionStorage: (key, defaultValue = null) => {
        try {
            const item = sessionStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('❌ خطأ في تحميل الجلسة:', error);
            return defaultValue;
        }
    }
};

// تصدير جميع المساعدات
export default {
    arabicText,
    formatters,
    validators,
    arrayHelpers,
    objectHelpers,
    domHelpers,
    storageHelpers
};
