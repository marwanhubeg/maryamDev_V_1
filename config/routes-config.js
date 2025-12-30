/**
 * Marwan Hub Routing Configuration
 * جميع المسارات المعتمدة للمنصة
 */

const routes = [
  {
    path: '/',
    component: 'HomePage',
    title: 'Marwan Hub | حلول تسويق رقمي وتطوير مواقع للشركات',
    description: 'Marwan Hub وكالة تسويق رقمي وتطوير مواقع في مصر، تقدم حلول متكاملة للشركات الناشئة والمتوسطة'
  },
  {
    path: '/services',
    component: 'ServicesPage',
    title: 'خدمات Marwan Hub | تسويق رقمي – تصميم – تطوير مواقع',
    description: 'اكتشف خدمات Marwan Hub في التسويق الرقمي، التصميم الجرافيكي، وتطوير المواقع. حلول مخصصة لنمو الشركات في السوق المصري'
  },
  {
    path: '/about',
    component: 'AboutPage',
    title: 'من نحن | Marwan Hub – وكالة تسويق رقمي في مصر',
    description: 'تعرف على Marwan Hub، وكالة تسويق رقمي تأسست عام 2020 تقدم حلولًا ذكية في التسويق وتطوير المواقع للشركات'
  },
  {
    path: '/portfolio',
    component: 'PortfolioPage',
    title: 'أعمالنا وحلولنا الرقمية | Marwan Hub',
    description: 'استعرض نماذج من الحلول الرقمية والمشاريع التي نفذتها Marwan Hub في مجالات التسويق، التصميم، وتطوير المواقع'
  },
  {
    path: '/clients',
    component: 'ClientsPage',
    title: 'عملاؤنا | Marwan Hub – شركاء النجاح',
    description: 'تعرف على شركاء النجاح الذين وثقوا ب Marwan Hub كشريك رقمي موثوق في تحقيق أهدافهم'
  },
  {
    path: '/contact',
    component: 'ContactPage',
    title: 'تواصل مع Marwan Hub | استشارة تسويق رقمي مجانية',
    description: 'تواصل مع Marwan Hub الآن واحصل على استشارة مجانية في التسويق الرقمي وتطوير المواقع'
  },
  {
    path: '/blog',
    component: 'BlogPage',
    title: 'مدونة Marwan Hub | نصائح ومقالات تسويقية',
    description: 'مدونة Marwan Hub - مقالات ونصائح في التسويق الرقمي، تطوير المواقع، وبناء الهوية البصرية'
  }
];

// صفحات إضافية للتوسع المستقبلي
const futureRoutes = [
  {
    path: '/careers',
    component: 'CareersPage',
    title: 'الوظائف | انضم لفريق Marwan Hub',
    description: 'انضم لفريق Marwan Hub وكن جزءًا من رحلة النمو الرقمي'
  },
  {
    path: '/privacy',
    component: 'PrivacyPage',
    title: 'سياسة الخصوصية | Marwan Hub',
    description: 'سياسة الخصوصية وشروط الاستخدام لموقع Marwan Hub'
  },
  {
    path: '/terms',
    component: 'TermsPage',
    title: 'الشروط والأحكام | Marwan Hub',
    description: 'الشروط والأحكام العامة لاستخدام خدمات Marwan Hub'
  }
];

// تصدير التكوين
export { routes, futureRoutes };

// دالة مساعدة للبحث عن مسار
export const findRoute = (path) => {
  return routes.find(route => route.path === path) || null;
};

// دالة للحصول على جميع المسارات
export const getAllRoutes = () => {
  return [...routes, ...futureRoutes];
};

// دالة للتحقق من وجود المسار
export const routeExists = (path) => {
  return routes.some(route => route.path === path) || 
         futureRoutes.some(route => route.path === path);
};
