/**
 * تكوين تطبيق مارون هاب
 * الملف الرئيسي لبيانات النظام - مصدر واحد للحقيقة
 * @version 1.0.0
 */

export const APP_CONFIG = {
  // معلومات التطبيق
  app: {
    name: "مارون هاب",
    version: "1.0.0",
    description: "منصة متكاملة للتسويق الرقمي والحلول التقنية",
    language: "ar",
    direction: "rtl"
  },

  // بيانات الشركة الرسمية - مصدر واحد
  company: {
    name: "مارون هاب",
    slogan: "نحو مستقبل رقمي متميز",
    description: "شركة رائدة في مجال التسويق الرقمي وتطوير الحلول التقنية في مصر",
    
    // بيانات الاتصال الرسمية
    contact: {
      phone: "01277831988",
      whatsapp: "201277831988",
      email: "marwanhub.eg@gmail.com",
      address: "القاهرة، مصر",
      workingHours: "الأحد - الخميس، 9 صباحاً - 5 مساءً",
      workingDays: ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس"]
    },
    
    // معلومات إضافية
    founded: "2020",
    teamSize: "15+",
    projectsCompleted: "50+"
  },

  // وسائل التواصل الاجتماعي الرسمية
  social: {
    facebook: "https://facebook.com/marwanhub",
    twitter: "https://twitter.com/marwanhub",
    instagram: "https://instagram.com/marwanhub",
    linkedin: "https://linkedin.com/company/marwanhub",
    youtube: "https://youtube.com/@marwanhub"
  },

  // نظام الألوان الرسمي
  colors: {
    primary: "#2563eb",
    secondary: "#7c3aed",
    accent: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b",
    success: "#10b981",
    
    // خلفيات
    background: "#f8fafc",
    surface: "#ffffff",
    
    // نصوص
    text: {
      primary: "#1e293b",
      secondary: "#64748b",
      light: "#94a3b8"
    },
    
    // حدود
    border: "#e2e8f0"
  },

  // نظام الخطوط
  fonts: {
    primary: "'Cairo', sans-serif",
    secondary: "Arial, sans-serif"
  },

  // الأبعاد
  sizes: {
    headerHeight: "80px",
    topBarHeight: "40px",
    containerWidth: "1200px",
    borderRadius: {
      sm: "4px",
      md: "8px",
      lg: "12px",
      xl: "16px",
      full: "9999px"
    }
  },

  // الرسائل النظامية
  messages: {
    success: "تمت العملية بنجاح",
    error: "حدث خطأ، يرجى المحاولة مرة أخرى",
    loading: "جاري التحميل...",
    noData: "لا توجد بيانات لعرضها",
    search: "ابحث عن...",
    submit: "إرسال",
    sending: "جاري الإرسال..."
  },

  // الإعدادات
  settings: {
    enableAnalytics: true,
    enableDarkMode: true,
    enableNotifications: true,
    enableAnimations: true,
    cacheDuration: 3600 // ثانية
  },

  // الروابط المهمة
  links: {
    terms: "#",
    privacy: "#",
    about: "#",
    services: "#",
    portfolio: "#",
    contact: "#",
    blog: "#"
  },

  // نقاط نهاية API (للتطوير المستقبلي)
  api: {
    baseUrl: "https://api.marwanhub.com",
    endpoints: {
      contact: "/api/contact",
      newsletter: "/api/newsletter",
      booking: "/api/booking"
    }
  },

  // محتوى ثابت للأقسام
  sections: {
    hero: {
      title: "حلول رقمية مبتكرة لنمو أعمالك",
      subtitle: "نقدم خدمات متكاملة في التسويق الرقمي، تطوير المواقع، والتصميم الإبداعي",
      cta: {
        primary: "اطلب خدمة",
        secondary: "اعرف أكثر عنا"
      }
    },
    
    services: {
      title: "خدماتنا المتكاملة",
      subtitle: "نقدم مجموعة واسعة من الخدمات الرقمية لدعم نمو أعمالك"
    },
    
    statistics: {
      title: "أرقام تتحدث عنا",
      subtitle: "إنجازاتنا خلال السنوات الماضية"
    },
    
    portfolio: {
      title: "معرض أعمالنا",
      subtitle: "أحدث المشاريع التي نفخر بها"
    },
    
    testimonials: {
      title: "ما يقول عملاؤنا",
      subtitle: "ثقة العملاء هي شهادتنا الحقيقية"
    },
    
    contact: {
      title: "تواصل معنا",
      subtitle: "نحن هنا لمساعدتك في أي وقت"
    }
  }
};

export default APP_CONFIG;
