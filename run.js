// خادم ويب بسيط لتشغيل النظام

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'text/javascript; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain'
};

const server = http.createServer((req, res) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    
    // منع الوصول للدليل الرئيسي
    if (req.url === '/' || req.url === '') {
        serveFile('index.html', res);
        return;
    }
    
    // التحقق من المسار الآمن
    const requestedPath = path.join(PUBLIC_DIR, req.url);
    const relativePath = path.relative(PUBLIC_DIR, requestedPath);
    
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        res.writeHead(403);
        res.end('Access Forbidden');
        return;
    }
    
    serveFile(req.url, res);
});

function serveFile(filename, res) {
    const filePath = path.join(PUBLIC_DIR, filename);
    const extname = path.extname(filename);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // إذا لم يجد الملف، حاول تقديم index.html (للتوجيه)
                if (filename !== 'index.html') {
                    serveFile('index.html', res);
                } else {
                    res.writeHead(404);
                    res.end('File not found');
                }
            } else {
                res.writeHead(500);
                res.end('Server error: ' + err.code);
            }
        } else {
            res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(content, 'utf-8');
        }
    });
}

server.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════╗
║      🚀 نظام مارون هاب يعمل بنجاح!           ║
╠═══════════════════════════════════════════════╣
║ العنوان: http://localhost:${PORT}              ║
║ المجلد: ${PUBLIC_DIR}                         ║
╚═══════════════════════════════════════════════╝

📋 تعليمات سريعة:
1. افتح المتصفح على: http://localhost:${PORT}
2. للتحقق من النظام، افتح Console (F12)
3. اكتب: MarwanHub.debug()

🔍 استكشاف الأخطاء:
• تحقق من Console للرسائل
• تأكد من عدم وجود أخطاء في الشبكة
• تأكد من أن الملفات محملة بشكل صحيح

🎯 النظام جاهز للاختبار!
`);
});

// التعامل مع الإغلاق
process.on('SIGINT', () => {
    console.log('\n\n🛑 إيقاف الخادم...');
    server.close(() => {
        console.log('✅ الخادم متوقف');
        process.exit(0);
    });
});
