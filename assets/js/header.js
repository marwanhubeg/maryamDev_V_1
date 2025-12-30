/**
 * Marwan Hub - Enhanced Header JavaScript
 * منطق متقدم للـ Header مع تأثيرات وتحسينات
 */

class EnhancedHeader {
  constructor() {
    this.header = document.querySelector('.header');
    this.mainHeader = document.querySelector('.main-header');
    this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    this.mobileNav = document.querySelector('.mobile-nav');
    this.announcementBar = document.querySelector('.announcement-bar');
    this.searchToggle = document.querySelector('.search-toggle');
    this.searchContainer = document.querySelector('.search-container');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.lastScrollPosition = 0;
    this.isScrolling = false;
    this.isMobileMenuOpen = false;
    this.isSearchOpen = false;
    
    this.init();
  }
  
  init() {
    // إضافة تأثيرات scroll
    window.addEventListener('scroll', () => this.handleScroll());
    
    // تهيئة القائمة المتنقلة
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // تهيئة البحث
    if (this.searchToggle) {
      this.searchToggle.addEventListener('click', () => this.toggleSearch());
    }
    
    // إغلاق القائمة عند النقر على رابط
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMobileMenu());
    });
    
    // إضافة active class للروابط الحالية
    this.setActiveNavLink();
    
    // تهيئة dropdown menus
    this.initDropdowns();
    
    // إضافة تأثيرات hover للروابط
    this.addHoverEffects();
    
    // تحسين accessibility
    this.enhanceAccessibility();
  }
  
  handleScroll() {
    if (this.isScrolling) return;
    
    this.isScrolling = true;
    const currentScroll = window.pageYOffset;
    const isScrollingDown = currentScroll > this.lastScrollPosition;
    const isAtTop = currentScroll < 100;
    
    // تأثير sticky header
    if (currentScroll > 100) {
      this.header.classList.add('scrolled');
      
      if (isScrollingDown && !this.isMobileMenuOpen) {
        this.header.classList.add('hidden');
      } else {
        this.header.classList.remove('hidden');
      }
    } else {
      this.header.classList.remove('scrolled', 'hidden');
    }
    
    // إخفاء announcement bar عند التمرير لأسفل
    if (this.announcementBar && isScrollingDown && currentScroll > 200) {
      this.announcementBar.classList.add('hidden');
    } else if (this.announcementBar) {
      this.announcementBar.classList.remove('hidden');
    }
    
    // تحديث last scroll position
    this.lastScrollPosition = currentScroll;
    
    // إعادة تعيين flag
    setTimeout(() => {
      this.isScrolling = false;
    }, 100);
  }
  
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.setAttribute('aria-expanded', this.isMobileMenuOpen);
      this.mobileMenuBtn.classList.toggle('active');
    }
    
    if (this.mobileNav) {
      this.mobileNav.classList.toggle('open');
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
    
    // إغلاق البحث إذا كان مفتوحاً
    if (this.isSearchOpen) {
      this.closeSearch();
    }
  }
  
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      this.mobileMenuBtn.classList.remove('active');
    }
    
    if (this.mobileNav) {
      this.mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  
  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
    
    if (this.searchToggle) {
      this.searchToggle.setAttribute('aria-expanded', this.isSearchOpen);
      this.searchToggle.classList.toggle('active');
    }
    
    if (this.searchContainer) {
      this.searchContainer.classList.toggle('open');
      
      if (this.isSearchOpen) {
        const searchInput = this.searchContainer.querySelector('input[type="search"]');
        if (searchInput) {
          setTimeout(() => searchInput.focus(), 300);
        }
      }
    }
    
    // إغلاق القائمة المتنقلة إذا كانت مفتوحة
    if (this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }
  
  closeSearch() {
    this.isSearchOpen = false;
    
    if (this.searchToggle) {
      this.searchToggle.setAttribute('aria-expanded', 'false');
      this.searchToggle.classList.remove('active');
    }
    
    if (this.searchContainer) {
      this.searchContainer.classList.remove('open');
    }
  }
  
  setActiveNavLink() {
    const currentPath = window.location.pathname;
    
    this.navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      
      if (linkPath === currentPath || 
          (currentPath.includes(linkPath) && linkPath !== '/')) {
        link.classList.add('active');
        
        // إضافة active للـ parent item في dropdown
        const parentItem = link.closest('.dropdown');
        if (parentItem) {
          parentItem.classList.add('active');
        }
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
      const toggle = dropdown.querySelector('.dropdown-toggle');
      const menu = dropdown.querySelector('.dropdown-menu');
      
      if (toggle && menu) {
        // Desktop hover
        dropdown.addEventListener('mouseenter', () => {
          if (window.innerWidth > 1024) {
            this.openDropdown(dropdown);
          }
        });
        
        dropdown.addEventListener('mouseleave', () => {
          if (window.innerWidth > 1024) {
            this.closeDropdown(dropdown);
          }
        });
        
        // Mobile click
        toggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 1024) {
            e.preventDefault();
            this.toggleDropdown(dropdown);
          }
        });
      }
    });
    
    // إغلاق جميع dropdowns عند النقر خارجها
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.dropdown')) {
        this.closeAllDropdowns();
      }
    });
  }
  
  openDropdown(dropdown) {
    dropdown.classList.add('open');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
      menu.style.animation = 'dropdownFadeIn 0.3s ease forwards';
    }
  }
  
  closeDropdown(dropdown) {
    dropdown.classList.remove('open');
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
      menu.style.animation = '';
    }
  }
  
  toggleDropdown(dropdown) {
    if (dropdown.classList.contains('open')) {
      this.closeDropdown(dropdown);
    } else {
      // إغلاق جميع dropdowns الأخرى
      this.closeAllDropdowns();
      this.openDropdown(dropdown);
    }
  }
  
  closeAllDropdowns() {
    document.querySelectorAll('.dropdown.open').forEach(dropdown => {
      this.closeDropdown(dropdown);
    });
  }
  
  addHoverEffects() {
    // إضافة تأثيرات hover للروابط
    this.navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1024) {
          link.style.transform = 'translateY(-2px)';
        }
      });
      
      link.addEventListener('mouseleave', () => {
        link.style.transform = '';
      });
    });
  }
  
  enhanceAccessibility() {
    // إضافة keyboard navigation
    document.addEventListener('keydown', (e) => {
      // إغلاق القائمة المتنقلة بـ ESC
      if (e.key === 'Escape') {
        if (this.isMobileMenuOpen) {
          this.closeMobileMenu();
        }
        if (this.isSearchOpen) {
          this.closeSearch();
        }
        this.closeAllDropdowns();
      }
      
      // التنقل بـ Tab في القائمة المتنقلة
      if (e.key === 'Tab' && this.isMobileMenuOpen) {
        const focusableElements = this.mobileNav.querySelectorAll(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
    
    // تحسين ARIA labels
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.setAttribute('aria-label', 'فتح/إغلاق القائمة');
    }
    
    if (this.searchToggle) {
      this.searchToggle.setAttribute('aria-label', 'فتح/إغلاق البحث');
    }
  }
  
  // دالة مساعدة للبحث
  search(query) {
    console.log('Searching for:', query);
    // هنا سيتم إضافة منطق البحث الحقيقي
  }
}

// تهيئة Header عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  const enhancedHeader = new EnhancedHeader();
  
  // جعلها متاحة عالمياً
  window.MarwanHub = window.MarwanHub || {};
  window.MarwanHub.EnhancedHeader = enhancedHeader;
  
  // إضافة تأثيرات scroll للعناصر
  const scrollElements = document.querySelectorAll('.scroll-animate');
  
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };
  
  const displayScrollElement = (element) => {
    element.classList.add('scrolled');
  };
  
  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.25)) {
        displayScrollElement(el);
      }
    });
  };
  
  // استدعاء عند التحميل والتمرير
  window.addEventListener('scroll', handleScrollAnimation);
  handleScrollAnimation(); // استدعاء أولي
});
