/**
 * Main Application Entry Point - Marwan Hub v2.0
 * @version 2.0.0 - Corporate Modern
 */

// Import HomePage
import HomePage from './pages/HomePage.js';

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Marwan Hub - Corporate Modern v2.0');
    
    try {
        // Initialize HomePage
        const homePage = new HomePage('app');
        await homePage.init();
        
        console.log('✅ HomePage initialized successfully');
        
        // Add global error handler
        window.addEventListener('error', (event) => {
            console.error('🚨 Global Error:', event.error);
            // يمكن إضافة إشعار للمستخدم هنا
        });
        
    } catch (error) {
        console.error('❌ Failed to initialize application:', error);
        
        // Fallback error message
        const app = document.getElementById('app');
        if (app) {
            app.innerHTML = `
                <div style="padding: 40px; text-align: center; font-family: 'Cairo', sans-serif;">
                    <h2 style="color: #2563eb;">⚠️ حدث خطأ في تحميل التطبيق</h2>
                    <p>نحن نعمل على حل المشكلة. يرجى المحاولة مرة أخرى.</p>
                    <button onclick="location.reload()" style="
                        background: #2563eb;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 8px;
                        cursor: pointer;
                        margin-top: 20px;
                    ">
                        إعادة تحميل الصفحة
                    </button>
                    <p style="margin-top: 30px; font-size: 14px; color: #666;">
                        للدعم الفوري: 01277831988
                    </p>
                </div>
            `;
        }
    }
});

// Add some global utilities
window.MarwanHub = {
    version: '2.0.0',
    debug: () => {
        console.log('🔧 Marwan Hub Debug Info:');
        console.log('- Version:', '2.0.0 (Corporate Modern)');
        console.log('- Container:', document.getElementById('app') ? '✅ موجود' : '❌ غير موجود');
        console.log('- DOM Ready:', document.readyState);
        console.log('- Screen:', `${window.innerWidth}x${window.innerHeight}`);
    },
    reload: () => {
        window.location.reload();
    }
};

console.log('📦 Marwan Hub Main.js loaded');
