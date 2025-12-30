// تكوين السمة والألوان

const ThemeConfig = {
    // السمة الفاتحة
    light: {
        colors: {
            // الأساسية
            primary: '#2563eb',
            primaryHover: '#1d4ed8',
            primaryLight: '#dbeafe',
            
            // الثانوية
            secondary: '#7c3aed',
            secondaryHover: '#6d28d9',
            secondaryLight: '#ede9fe',
            
            // النجاح والتحذير والخطأ
            success: '#10b981',
            warning: '#f59e0b',
            danger: '#ef4444',
            info: '#3b82f6',
            
            // الرمادية
            gray50: '#f8fafc',
            gray100: '#f1f5f9',
            gray200: '#e2e8f0',
            gray300: '#cbd5e1',
            gray400: '#94a3b8',
            gray500: '#64748b',
            gray600: '#475569',
            gray700: '#334155',
            gray800: '#1e293b',
            gray900: '#0f172a',
            
            // الخلفية والنص
            background: '#ffffff',
            surface: '#f8fafc',
            text: '#1e293b',
            textSecondary: '#64748b',
            textDisabled: '#94a3b8',
            
            // الحدود
            border: '#e2e8f0',
            borderHover: '#cbd5e1',
            
            // الظلال
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            shadowMd: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            shadowLg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        },
        
        // الطباعة
        typography: {
            fontFamily: {
                primary: "'Cairo', sans-serif",
                secondary: "'Arial', sans-serif",
                mono: "'Courier New', monospace"
            },
            fontSize: {
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem'
            },
            fontWeight: {
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800'
            },
            lineHeight: {
                tight: '1.25',
                normal: '1.5',
                relaxed: '1.75',
                loose: '2'
            }
        },
        
        // المسافات
        spacing: {
            px: '1px',
            0: '0',
            0.5: '0.125rem',
            1: '0.25rem',
            1.5: '0.375rem',
            2: '0.5rem',
            2.5: '0.625rem',
            3: '0.75rem',
            3.5: '0.875rem',
            4: '1rem',
            5: '1.25rem',
            6: '1.5rem',
            7: '1.75rem',
            8: '2rem',
            9: '2.25rem',
            10: '2.5rem',
            11: '2.75rem',
            12: '3rem',
            14: '3.5rem',
            16: '4rem',
            20: '5rem',
            24: '6rem',
            28: '7rem',
            32: '8rem',
            36: '9rem',
            40: '10rem',
            44: '11rem',
            48: '12rem',
            52: '13rem',
            56: '14rem',
            60: '15rem',
            64: '16rem',
            72: '18rem',
            80: '20rem',
            96: '24rem'
        },
        
        // الأنماط
        styles: {
            borderRadius: {
                none: '0',
                sm: '0.125rem',
                base: '0.25rem',
                md: '0.375rem',
                lg: '0.5rem',
                xl: '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
                full: '9999px'
            },
            transition: {
                duration: {
                    75: '75ms',
                    100: '100ms',
                    150: '150ms',
                    200: '200ms',
                    300: '300ms',
                    500: '500ms',
                    700: '700ms',
                    1000: '1000ms'
                },
                timing: {
                    linear: 'linear',
                    ease: 'ease',
                    easeIn: 'ease-in',
                    easeOut: 'ease-out',
                    easeInOut: 'ease-in-out'
                }
            },
            zIndex: {
                0: '0',
                10: '10',
                20: '20',
                30: '30',
                40: '40',
                50: '50',
                100: '100'
            }
        }
    },
    
    // السمة الداكنة
    dark: {
        colors: {
            // الأساسية
            primary: '#3b82f6',
            primaryHover: '#60a5fa',
            primaryLight: '#1e40af',
            
            // الثانوية
            secondary: '#8b5cf6',
            secondaryHover: '#a78bfa',
            secondaryLight: '#5b21b6',
            
            // النجاح والتحذير والخطأ
            success: '#34d399',
            warning: '#fbbf24',
            danger: '#f87171',
            info: '#60a5fa',
            
            // الرمادية
            gray50: '#0f172a',
            gray100: '#1e293b',
            gray200: '#334155',
            gray300: '#475569',
            gray400: '#64748b',
            gray500: '#94a3b8',
            gray600: '#cbd5e1',
            gray700: '#e2e8f0',
            gray800: '#f1f5f9',
            gray900: '#f8fafc',
            
            // الخلفية والنص
            background: '#0f172a',
            surface: '#1e293b',
            text: '#f1f5f9',
            textSecondary: '#cbd5e1',
            textDisabled: '#94a3b8',
            
            // الحدود
            border: '#334155',
            borderHover: '#475569',
            
            // الظلال
            shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            shadowMd: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
            shadowLg: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)'
        },
        
        // بقية الإعدادات نفس السمة الفاتحة
        typography: { ...this.light.typography },
        spacing: { ...this.light.spacing },
        styles: { ...this.light.styles }
    },
    
    // السمة الحالية
    current: 'light',
    
    // الدوال المساعدة
    helpers: {
        // تغيير السمة
        toggleTheme: function() {
            this.current = this.current === 'light' ? 'dark' : 'light';
            this.applyTheme();
            return this.current;
        },
        
        // تطبيق السمة
        applyTheme: function() {
            const theme = this[this.current];
            const root = document.documentElement;
            
            // تطبيق الألوان
            Object.entries(theme.colors).forEach(([key, value]) => {
                root.style.setProperty(`--color-${key}`, value);
            });
            
            // تطبيق الطباعة
            Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
                root.style.setProperty(`--font-${key}`, value);
            });
            
            Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
                root.style.setProperty(`--text-${key}`, value);
            });
            
            // تطبيق المسافات
            Object.entries(theme.spacing).forEach(([key, value]) => {
                root.style.setProperty(`--spacing-${key}`, value);
            });
            
            // تطبيق الأنماط
            Object.entries(theme.styles.borderRadius).forEach(([key, value]) => {
                root.style.setProperty(`--radius-${key}`, value);
            });
            
            // حفظ في التخزين المحلي
            localStorage.setItem('theme', this.current);
            
            // إطلاق event تغيير السمة
            window.dispatchEvent(new CustomEvent('themeChanged', {
                detail: { theme: this.current }
            }));
        },
        
        // تهيئة السمة
        initialize: function() {
            // محاولة استعادة السمة المحفوظة
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                this.current = savedTheme;
            }
            
            // تطبيق السمة
            this.applyTheme();
            
            // إضافة زر تغيير السمة
            this.addThemeToggle();
        },
        
        // إضافة زر تغيير السمة
        addThemeToggle: function() {
            // إنشاء الزر إذا لم يكن موجوداً
            if (!document.getElementById('theme-toggle')) {
                const toggleBtn = document.createElement('button');
                toggleBtn.id = 'theme-toggle';
                toggleBtn.className = 'theme-toggle';
                toggleBtn.innerHTML = `
                    <i class="fas fa-moon" data-light-icon></i>
                    <i class="fas fa-sun" data-dark-icon></i>
                `;
                toggleBtn.title = 'تغيير السمة';
                
                toggleBtn.addEventListener('click', () => {
                    this.toggleTheme();
                    this.updateToggleIcon();
                });
                
                // إضافة الزر للصفحة
                document.body.appendChild(toggleBtn);
                
                // تحديث الأيقونة
                this.updateToggleIcon();
            }
        },
        
        // تحديث أيقونة الزر
        updateToggleIcon: function() {
            const toggleBtn = document.getElementById('theme-toggle');
            if (!toggleBtn) return;
            
            const lightIcon = toggleBtn.querySelector('[data-light-icon]');
            const darkIcon = toggleBtn.querySelector('[data-dark-icon]');
            
            if (this.current === 'light') {
                lightIcon.style.display = 'none';
                darkIcon.style.display = 'inline-block';
                toggleBtn.title = 'تفعيل السمة الداكنة';
            } else {
                lightIcon.style.display = 'inline-block';
                darkIcon.style.display = 'none';
                toggleBtn.title = 'تفعيل السمة الفاتحة';
            }
        }
    }
};

// تهيئة السمة تلقائياً
ThemeConfig.helpers.initialize();

export default ThemeConfig;
