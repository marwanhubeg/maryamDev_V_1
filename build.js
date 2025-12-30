// ملف بناء النظام - يجمع جميع الملفات في حزمة واحدة

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// دالة لقراءة الملفات بشكل متزامن
function readFileSync(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`❌ خطأ في قراءة الملف: ${filePath}`, error);
        return '';
    }
}

// دالة لكتابة الملفات
function writeFileSync(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ تم كتابة الملف: ${filePath}`);
    } catch (error) {
        console.error(`❌ خطأ في كتابة الملف: ${filePath}`, error);
    }
}

// دالة لنسخ المجلدات
function copyDirectory(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDirectory(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// البناء
async function build() {
    console.log('🚀 بدء بناء نظام مارون هاب...');
    
    const startTime = Date.now();
    const buildDir = path.join(__dirname, 'dist');
    
    // إنشاء مجلد dist إذا لم يكن موجوداً
    if (!fs.existsSync(buildDir)) {
        fs.mkdirSync(buildDir, { recursive: true });
    }
    
    try {
        // 1. إنشاء index.html مضغوط
        console.log('📄 بناء ملف index.html...');
        const indexPath = path.join(__dirname, 'index.html');
        const indexContent = readFileSync(indexPath);
        writeFileSync(path.join(buildDir, 'index.html'), indexContent);
        
        // 2. إنشاء main.js مضغوط
        console.log('⚡ بناء ملف main.js...');
        const mainJsPath = path.join(__dirname, 'main.js');
        const mainJsContent = readFileSync(mainJsPath);
        writeFileSync(path.join(buildDir, 'main.js'), mainJsContent);
        
        // 3. نسخ مجلد assets
        console.log('🎨 نسخ ملفات assets...');
        const assetsSrc = path.join(__dirname, 'assets');
        const assetsDest = path.join(buildDir, 'assets');
        copyDirectory(assetsSrc, assetsDest);
        
        // 4. إنشاء ملف app.js مضغوط (يحتوي على جميع المكونات)
        console.log('🧩 تجميع ملفات JavaScript...');
        const appJsContent = await buildAppJs();
        writeFileSync(path.join(buildDir, 'app.js'), appJsContent);
        
        // 5. إنشاء ملف styles.css مضغوط
        console.log('🎭 تجميع ملفات CSS...');
        const stylesContent = buildStyles();
        writeFileSync(path.join(buildDir, 'styles.css'), stylesContent);
        
        // 6. إنشاء ملف manifest.json
        console.log('📋 إنشاء manifest.json...');
        createManifest(buildDir);
        
        // 7. إنشاء service worker
        console.log('🔧 إنشاء service worker...');
        createServiceWorker(buildDir);
        
        // 8. إنشاء ملف robots.txt
        console.log('🤖 إنشاء robots.txt...');
        createRobotsTxt(buildDir);
        
        // 9. إنشاء ملف sitemap.xml
        console.log('🗺️ إنشاء sitemap.xml...');
        createSitemap(buildDir);
        
        const endTime = Date.now();
        const buildTime = ((endTime - startTime) / 1000).toFixed(2);
        
        console.log(`\n🎉 بناء النظام اكتمل بنجاح!`);
        console.log(`⏱️  الوقت المستغرق: ${buildTime} ثانية`);
        console.log(`📁 الموقع النهائي: ${buildDir}`);
        console.log(`\n📊 ملخص الملفات:`);
        
        // حساب أحجام الملفات
        const files = fs.readdirSync(buildDir, { withFileTypes: true });
        let totalSize = 0;
        
        files.forEach(file => {
            const filePath = path.join(buildDir, file.name);
            const stats = fs.statSync(filePath);
            
            if (stats.isFile()) {
                const size = stats.size;
                totalSize += size;
                console.log(`   📄 ${file.name}: ${(size / 1024).toFixed(2)} KB`);
            } else if (stats.isDirectory()) {
                const dirSize = getDirectorySize(filePath);
                totalSize += dirSize;
                console.log(`   📁 ${file.name}/: ${(dirSize / 1024).toFixed(2)} KB`);
            }
        });
        
        console.log(`\n📦 الحجم الإجمالي: ${(totalSize / 1024).toFixed(2)} KB`);
        console.log(`\n🚀 جاهز للنشر!`);
        
    } catch (error) {
        console.error('❌ خطأ في بناء النظام:', error);
        process.exit(1);
    }
}

// بناء ملف app.js المجمع
async function buildAppJs() {
    const imports = [];
    const components = [];
    
    // قائمة الملفات المطلوبة
    const filesToInclude = [
        // النواة
        { path: 'core/app.js', name: 'App' },
        { path: 'core/state-manager.js', name: 'StateManager' },
        { path: 'core/event-bus.js', name: 'EventBus' },
        { path: 'core/router.js', name: 'Router' },
        { path: 'core/service-registry.js', name: 'ServiceRegistry' },
        
        // الخدمات
        { path: 'services/ConfigService.js', name: 'ConfigService' },
        
        // المساعدات
        { path: 'utils/helpers.js', name: 'Helpers' },
        { path: 'utils/constants.js', name: 'Constants' },
        
        // الصفحات
        { path: 'pages/HomePage.js', name: 'HomePage' },
        
        // المكونات
        { path: 'components/ui/Header.js', name: 'Header' },
        { path: 'components/ui/Footer.js', name: 'Footer' },
        { path: 'components/ui/TopBar.js', name: 'TopBar' },
        { path: 'components/ui/AnnouncementBar.js', name: 'AnnouncementBar' }
    ];
    
    // قراءة وتجميع الملفات
    for (const file of filesToInclude) {
        const filePath = path.join(__dirname, file.path);
        if (fs.existsSync(filePath)) {
            const content = readFileSync(filePath);
            
            // استخراج الكود بدون import/export
            const processedContent = processJsContent(content, file.name);
            components.push(`\n// ===== ${file.name} =====\n${processedContent}\n`);
            
            console.log(`   📦 تم تضمين: ${file.path}`);
        }
    }
    
    // إنشاء المحتوى النهائي
    return `
// ============================================
// نظام مارون هاب - النسخة المجمعة
// تم الإنشاء: ${new Date().toISOString()}
// الإصدار: 2.0.0
// ============================================

${components.join('\n')}

// تصدير التطبيق الرئيسي
window.MarwanHub = {
    App,
    StateManager,
    EventBus,
    Router,
    ServiceRegistry,
    ConfigService,
    Helpers,
    Constants,
    HomePage,
    Header,
    Footer,
    TopBar,
    AnnouncementBar
};

console.log('🚀 نظام مارون هاب محمل وجاهز!');
`;
}

// معالجة محتوى JavaScript
function processJsContent(content, componentName) {
    // إزالة import statements
    let processed = content.replace(/import\s+.*?\s+from\s+['"][^'"]+['"];?\n?/g, '');
    
    // إزالة export default
    processed = processed.replace(/export\s+default\s+/g, '');
    
    // إزالة export statements
    processed = processed.replace(/export\s+{[^}]+};?\n?/g, '');
    
    return processed;
}

// بناء ملف الأنماط المجمع
function buildStyles() {
    const stylesDir = path.join(__dirname, 'assets', 'styles');
    const cssFiles = ['variables.css', 'reset.css', 'base.css'];
    
    let stylesContent = '/* أنماط نظام مارون هاب - النسخة المجمعة */\n\n';
    
    cssFiles.forEach(file => {
        const filePath = path.join(stylesDir, file);
        if (fs.existsSync(filePath)) {
            const content = readFileSync(filePath);
            stylesContent += `/* === ${file} === */\n${content}\n\n`;
            console.log(`   🎨 تم تضمين: ${file}`);
        }
    });
    
    // ضغط CSS
    stylesContent = minifyCss(stylesContent);
    
    return stylesContent;
}

// ضغط CSS
function minifyCss(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // إزالة التعليقات
        .replace(/\s+/g, ' ') // إزالة المسافات الزائدة
        .replace(/\s*([{};:,])\s*/g, '$1') // إزالة المسافات حول الرموز
        .trim();
}

// إنشاء manifest.json
function createManifest(buildDir) {
    const manifest = {
        name: 'مارون هاب - المنصة المتكاملة',
        short_name: 'مارون هاب',
        description: 'المنصة المتكاملة للخدمات الرقمية والعقارية',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563eb',
        icons: [
            {
                src: 'assets/images/logos/icon-192.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'assets/images/logos/icon-512.png',
                sizes: '512x512',
                type: 'image/png'
            }
        ],
        lang: 'ar',
        dir: 'rtl'
    };
    
    writeFileSync(
        path.join(buildDir, 'manifest.json'),
        JSON.stringify(manifest, null, 2)
    );
}

// إنشاء service worker
function createServiceWorker(buildDir) {
    const swContent = `
// Service Worker لنظام مارون هاب
const CACHE_NAME = 'marwan-hub-v2.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/main.js',
    '/app.js',
    '/styles.css',
    '/manifest.json'
];

// التثبيت
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
            .then(() => self.skipWaiting())
    );
});

// التنشيط
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// جلب الطلبات
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});
`;
    
    writeFileSync(path.join(buildDir, 'sw.js'), swContent);
}

// إنشاء robots.txt
function createRobotsTxt(buildDir) {
    const robotsContent = `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/

Sitemap: /sitemap.xml
`;
    
    writeFileSync(path.join(buildDir, 'robots.txt'), robotsContent);
}

// إنشاء sitemap.xml
function createSitemap(buildDir) {
    const pages = [
        { url: '/', priority: '1.0', changefreq: 'daily' },
        { url: '/services', priority: '0.9', changefreq: 'weekly' },
        { url: '/portfolio', priority: '0.8', changefreq: 'weekly' },
        { url: '/about', priority: '0.7', changefreq: 'monthly' },
        { url: '/contact', priority: '0.8', changefreq: 'monthly' },
        { url: '/blog', priority: '0.6', changefreq: 'weekly' }
    ];
    
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages.map(page => `
    <url>
        <loc>https://marwanhub.com${page.url}</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('')}
</urlset>`;
    
    writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemapContent);
}

// حساب حجم المجلد
function getDirectorySize(dir) {
    let size = 0;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
        const entryPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            size += getDirectorySize(entryPath);
        } else {
            const stats = fs.statSync(entryPath);
            size += stats.size;
        }
    }
    
    return size;
}

// تشغيل البناء
build().catch(console.error);
