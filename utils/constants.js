// ملف الثوابت - قيم ثابتة للنظام

// أنواع الخدمات
export const SERVICE_TYPES = {
    DIGITAL_MARKETING: 'digital_marketing',
    GRAPHIC_DESIGN: 'graphic_design',
    WEB_DEVELOPMENT: 'web_development',
    REAL_ESTATE: 'real_estate',
    CONSULTING: 'consulting',
    OTHER: 'other'
};

// أسماء الخدمات بالعربية
export const SERVICE_NAMES = {
    [SERVICE_TYPES.DIGITAL_MARKETING]: 'التسويق الرقمي',
    [SERVICE_TYPES.GRAPHIC_DESIGN]: 'التصميم الجرافيكي',
    [SERVICE_TYPES.WEB_DEVELOPMENT]: 'تطوير المواقع',
    [SERVICE_TYPES.REAL_ESTATE]: 'التسويق العقاري',
    [SERVICE_TYPES.CONSULTING]: 'الاستشارات',
    [SERVICE_TYPES.OTHER]: 'خدمات أخرى'
};

// أيقونات الخدمات
export const SERVICE_ICONS = {
    [SERVICE_TYPES.DIGITAL_MARKETING]: 'fas fa-bullhorn',
    [SERVICE_TYPES.GRAPHIC_DESIGN]: 'fas fa-palette',
    [SERVICE_TYPES.WEB_DEVELOPMENT]: 'fas fa-code',
    [SERVICE_TYPES.REAL_ESTATE]: 'fas fa-building',
    [SERVICE_TYPES.CONSULTING]: 'fas fa-chart-line',
    [SERVICE_TYPES.OTHER]: 'fas fa-cogs'
};

// حالات الطلبات
export const ORDER_STATUS = {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold'
};

// أسماء حالات الطلبات بالعربية
export const ORDER_STATUS_NAMES = {
    [ORDER_STATUS.PENDING]: 'قيد الانتظار',
    [ORDER_STATUS.IN_PROGRESS]: 'قيد التنفيذ',
    [ORDER_STATUS.COMPLETED]: 'مكتمل',
    [ORDER_STATUS.CANCELLED]: 'ملغي',
    [ORDER_STATUS.ON_HOLD]: 'معلق'
};

// ألوان حالات الطلبات
export const ORDER_STATUS_COLORS = {
    [ORDER_STATUS.PENDING]: 'warning',
    [ORDER_STATUS.IN_PROGRESS]: 'info',
    [ORDER_STATUS.COMPLETED]: 'success',
    [ORDER_STATUS.CANCELLED]: 'danger',
    [ORDER_STATUS.ON_HOLD]: 'secondary'
};

// أنواع المستخدمين
export const USER_TYPES = {
    ADMIN: 'admin',
    CLIENT: 'client',
    GUEST: 'guest'
};

// أذونات المستخدمين
export const USER_PERMISSIONS = {
    VIEW_DASHBOARD: 'view_dashboard',
    MANAGE_SERVICES: 'manage_services',
    MANAGE_ORDERS: 'manage_orders',
    MANAGE_USERS: 'manage_users',
    VIEW_REPORTS: 'view_reports',
    MANAGE_SETTINGS: 'manage_settings'
};

// مجموعات الأذونات
export const PERMISSION_GROUPS = {
    [USER_TYPES.ADMIN]: [
        USER_PERMISSIONS.VIEW_DASHBOARD,
        USER_PERMISSIONS.MANAGE_SERVICES,
        USER_PERMISSIONS.MANAGE_ORDERS,
        USER_PERMISSIONS.MANAGE_USERS,
        USER_PERMISSIONS.VIEW_REPORTS,
        USER_PERMISSIONS.MANAGE_SETTINGS
    ],
    [USER_TYPES.CLIENT]: [
        USER_PERMISSIONS.VIEW_DASHBOARD,
        USER_PERMISSIONS.MANAGE_ORDERS
    ],
    [USER_TYPES.GUEST]: []
};

// أنواع الملفات المسموح بها
export const ALLOWED_FILE_TYPES = {
    IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
    DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    ARCHIVES: ['application/zip', 'application/x-rar-compressed']
};

// أحجام الملفات القصوى (بالبايت)
export const MAX_FILE_SIZES = {
    IMAGE: 5 * 1024 * 1024, // 5MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
    ARCHIVE: 20 * 1024 * 1024 // 20MB
};

// رسائل الخطأ
export const ERROR_MESSAGES = {
    // عامة
    GENERIC: 'حدث خطأ، يرجى المحاولة مرة أخرى',
    NETWORK_ERROR: 'خطأ في الاتصال بالشبكة',
    SERVER_ERROR: 'خطأ في الخادم',
    
    // المصادقة
    INVALID_CREDENTIALS: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    USER_NOT_FOUND: 'المستخدم غير موجود',
    USER_EXISTS: 'المستخدم مسجل مسبقاً',
    INVALID_TOKEN: 'رمز الدخول غير صالح',
    TOKEN_EXPIRED: 'انتهت صلاحية رمز الدخول',
    
    // التحقق
    REQUIRED_FIELD: 'هذا الحقل مطلوب',
    INVALID_EMAIL: 'البريد الإلكتروني غير صالح',
    INVALID_PHONE: 'رقم الهاتف غير صالح',
    INVALID_PASSWORD: 'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، وتشمل حروف كبيرة وصغيرة وأرقام',
    PASSWORD_MISMATCH: 'كلمة المرور غير متطابقة',
    
    // الملفات
    FILE_TOO_LARGE: 'حجم الملف كبير جداً',
    INVALID_FILE_TYPE: 'نوع الملف غير مسموح به',
    UPLOAD_FAILED: 'فشل رفع الملف',
    
    // النماذج
    FORM_VALIDATION_FAILED: 'البيانات المدخلة غير صحيحة',
    SUBMISSION_FAILED: 'فشل إرسال النموذج'
};

// رسائل النجاح
export const SUCCESS_MESSAGES = {
    // عامة
    OPERATION_SUCCESS: 'تمت العملية بنجاح',
    DATA_SAVED: 'تم حفظ البيانات بنجاح',
    DATA_UPDATED: 'تم تحديث البيانات بنجاح',
    DATA_DELETED: 'تم حذف البيانات بنجاح',
    
    // المصادقة
    LOGIN_SUCCESS: 'تم تسجيل الدخول بنجاح',
    REGISTER_SUCCESS: 'تم إنشاء الحساب بنجاح',
    LOGOUT_SUCCESS: 'تم تسجيل الخروج بنجاح',
    
    // النماذج
    FORM_SUBMITTED: 'تم إرسال النموذج بنجاح',
    CONTACT_SENT: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً',
    QUOTE_REQUESTED: 'تم إرسال طلب عرض السعر، سنتواصل معك قريباً',
    NEWSLETTER_SUBSCRIBED: 'تم الاشتراك في النشرة البريدية بنجاح'
};

// أوقات الانتظار (بالميلي ثانية)
export const TIMEOUTS = {
    SHORT: 1000,
    MEDIUM: 3000,
    LONG: 5000,
    VERY_LONG: 10000
};

// الإعدادات الافتراضية
export const DEFAULT_SETTINGS = {
    THEME: 'light',
    LANGUAGE: 'ar',
    TIMEZONE: 'Africa/Cairo',
    CURRENCY: 'EGP',
    DATE_FORMAT: 'dd/MM/yyyy',
    TIME_FORMAT: '12h',
    NOTIFICATIONS_ENABLED: true,
    SOUNDS_ENABLED: true,
    AUTO_SAVE: true
};

// أكواد الألوان
export const COLOR_CODES = {
    PRIMARY: '#2563eb',
    SECONDARY: '#7c3aed',
    SUCCESS: '#10b981',
    DANGER: '#ef4444',
    WARNING: '#f59e0b',
    INFO: '#3b82f6',
    LIGHT: '#f8fafc',
    DARK: '#1e293b'
};

// رموز العملات
export const CURRENCY_SYMBOLS = {
    EGP: 'ج.م',
    USD: '$',
    EUR: '€',
    GBP: '£',
    SAR: 'ر.س',
    AED: 'د.إ'
};

// المناطق الزمنية
export const TIMEZONES = {
    'Africa/Cairo': 'القاهرة',
    'Asia/Riyadh': 'الرياض',
    'Asia/Dubai': 'دبي',
    'Europe/London': 'لندن',
    'America/New_York': 'نيويورك'
};

// بيانات افتراضية للعرض
export const MOCK_DATA = {
    SERVICES: [
        {
            id: 1,
            title: 'التسويق الرقمي',
            description: 'حلول تسويق رقمي متكاملة لزيادة ظهور علامتك التجارية',
            icon: 'fas fa-bullhorn',
            category: SERVICE_TYPES.DIGITAL_MARKETING,
            price: 5000,
            duration: '1 شهر',
            features: ['إدارة وسائل التواصل', 'تحسين محركات البحث', 'إعلانات مدفوعة']
        },
        {
            id: 2,
            title: 'تصميم جرافيك',
            description: 'تصميمات إبداعية تعبر عن هوية علامتك التجارية',
            icon: 'fas fa-palette',
            category: SERVICE_TYPES.GRAPHIC_DESIGN,
            price: 3000,
            duration: '2 أسبوع',
            features: ['تصميم شعار', 'هوية بصرية', 'مواد تسويقية']
        },
        {
            id: 3,
            title: 'تطوير مواقع',
            description: 'تصميم وتطوير مواقع ويب متجاوبة وعالية الأداء',
            icon: 'fas fa-code',
            category: SERVICE_TYPES.WEB_DEVELOPMENT,
            price: 15000,
            duration: '6 أسابيع',
            features: ['تصميم متجاوب', 'لوحة تحكم', 'دعم فني']
        },
        {
            id: 4,
            title: 'تسويق عقاري',
            description: 'حلول تسويقية متخصصة في المجال العقاري',
            icon: 'fas fa-building',
            category: SERVICE_TYPES.REAL_ESTATE,
            price: 8000,
            duration: '1 شهر',
            features: ['تصوير العقارات', 'إعلانات مخصصة', 'إدارة العقارات']
        },
        {
            id: 5,
            title: 'استشارات أعمال',
            description: 'استشارات متخصصة لتطوير أعمالك وزيادة أرباحك',
            icon: 'fas fa-chart-line',
            category: SERVICE_TYPES.CONSULTING,
            price: 10000,
            duration: 'مخصص',
            features: ['تحليل السوق', 'خطط تطوير', 'متابعة مستمرة']
        },
        {
            id: 6,
            title: 'خدمات أخرى',
            description: 'خدمات مخصصة تناسب احتياجات أعمالك المختلفة',
            icon: 'fas fa-cogs',
            category: SERVICE_TYPES.OTHER,
            price: 0,
            duration: 'مخصص',
            features: ['حلول مخصصة', 'دعم مستمر', 'مرونة كاملة']
        }
    ],
    
    TESTIMONIALS: [
        {
            id: 1,
            name: 'أحمد محمد',
            role: 'مدير شركة',
            text: 'خدمات ممتازة وسرعة في التنفيذ، أنصح بالتعامل معهم',
            rating: 5,
            image: null
        },
        {
            id: 2,
            name: 'سارة خالد',
            role: 'رائدة أعمال',
            text: 'فريق محترف ساعدني في تطوير عملي بشكل كبير',
            rating: 5,
            image: null
        },
        {
            id: 3,
            name: 'محمد علي',
            role: 'مدير تسويق',
            text: 'نتائج مذهلة في التسويق الرقمي، زادت مبيعاتي بنسبة 40%',
            rating: 4,
            image: null
        }
    ],
    
    GALLERY: [
        {
            id: 1,
            title: 'تصميم شعار',
            category: 'design',
            image: null,
            description: 'تصميم شعار لشركة تقنية'
        },
        {
            id: 2,
            title: 'موقع تجارة إلكترونية',
            category: 'web',
            image: null,
            description: 'تطوير موقع متكامل للتجارة الإلكترونية'
        },
        {
            id: 3,
            title: 'حملة تسويقية',
            category: 'marketing',
            image: null,
            description: 'حملة تسويقية ناجحة على وسائل التواصل'
        }
    ]
};

// تصدير جميع الثوابت
export default {
    SERVICE_TYPES,
    SERVICE_NAMES,
    SERVICE_ICONS,
    ORDER_STATUS,
    ORDER_STATUS_NAMES,
    ORDER_STATUS_COLORS,
    USER_TYPES,
    USER_PERMISSIONS,
    PERMISSION_GROUPS,
    ALLOWED_FILE_TYPES,
    MAX_FILE_SIZES,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    TIMEOUTS,
    DEFAULT_SETTINGS,
    COLOR_CODES,
    CURRENCY_SYMBOLS,
    TIMEZONES,
    MOCK_DATA
};
