#!/usr/bin/env python3
"""
خادم ويب بسيط يدعم Single Page Applications (SPA)
لـ Marwan Hub
"""
import http.server
import socketserver
import os
import sys

PORT = 8000

class SPAHandler(http.server.SimpleHTTPRequestHandler):
    """معالج مخصص لـ SPA يوجّه جميع المسارات إلى index.html"""
    
    def do_GET(self):
        # قائمة الملفات الحقيقية التي يجب أن تخدم بشكل طبيعي
        real_files = [
            '/assets/', '/images/', '/styles/', '/scripts/',
            '.js', '.css', '.png', '.jpg', '.jpeg', '.gif',
            '.svg', '.ico', '.json', '.xml', '.txt'
        ]
        
        # التحقق مما إذا كان المسار لملف حقيقي
        is_real_file = any(self.path.startswith(prefix) or self.path.endswith(suffix) 
                          for prefix, suffix in [(p, p) if '.' not in p else ('', p) 
                          for p in real_files])
        
        if is_real_file and os.path.exists('.' + self.path):
            # خدمة الملف الحقيقي
            super().do_GET()
        else:
            # جميع المسارات الأخرى توجّه إلى index.html
            self.path = '/index.html'
            super().do_GET()
    
    def log_message(self, format, *args):
        """تسجيل طلبات مخصص"""
        print(f"[{self.log_date_time_string()}] {self.address_string()} - {format % args}")

def main():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print(f"🚀 بدء خادم Marwan Hub على المنفذ {PORT}")
    print(f"📁 المجلد الحالي: {os.getcwd()}")
    print(f"🌐 العنوان: http://localhost:{PORT}")
    print(f"📱 يمكنك الوصول من أي جهاز على الشبكة")
    print("-" * 50)
    print("المسارات المتاحة:")
    print("• الرئيسية: /")
    print("• الخدمات: /services")
    print("• من نحن: /about")
    print("• الأعمال: /portfolio")
    print("• العملاء: /clients")
    print("• التواصل: /contact")
    print("• المدونة: /blog")
    print("-" * 50)
    print("اضغط Ctrl+C لإيقاف الخادم")
    
    try:
        with socketserver.TCPServer(("", PORT), SPAHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n\n🛑 توقف الخادم")
    except OSError as e:
        print(f"\n❌ خطأ: {e}")
        print("جرب منفذًا آخر: python server.py 8080")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            PORT = int(sys.argv[1])
        except ValueError:
            print(f"استخدام: {sys.argv[0]} [port]")
            sys.exit(1)
    main()
