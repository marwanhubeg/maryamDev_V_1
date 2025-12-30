/**
 * قسم الخدمات - مارون هاب
 * يعرض 6 خدمات رئيسية مع إمكانيات البحث والتصفية
 * @version 1.0.0
 */

import { APP_CONFIG } from '../../config/app-config.js';

export class ServicesSection {
  constructor(containerId = 'services-section') {
    this.containerId = containerId;
    this.container = null;
    this.services = this.getServicesData();
    this.filteredServices = [...this.services];
    this.activeFilter = 'all';
    
    // عناصر DOM
    this.searchInput = null;
    this.filterButtons = null;
    this.servicesGrid = null;
  }

  // بيانات الخدمات - محتوى حقيقي ومفصل
  getServicesData() {
    return [
      {
        id: 1,
        title: "التسويق الرقمي المتكامل",
        description: "نطور استراتيجيات تسويق رقمية مدروسة تحقق انتشارًا واسعًا وزيادة في المبيعات عبر جميع المنصات الرقمية.",
        detailedDescription: "نقدم حلول تسويق رقمي متكاملة تشمل إدارة وسائل التواصل الاجتماعي، الحملات الإعلانية المدفوعة، تحسين محركات البحث (SEO)، والتسويق عبر البريد الإلكتروني. نضمن لك وصولاً أوسع ونتائج ملموسة.",
        icon: "fas fa-bullhorn",
        category: "digital",
        features: [
          "إدارة متكاملة لوسائل التواصل الاجتماعي",
          "حملات إعلانية مدفوعة على Google & Facebook",
          "تحسين ترتيب موقعك في محركات البحث (SEO)",
          "تسويق عبر البريد الإلكتروني (Email Marketing)",
          "تحليل البيانات وتقارير الأداء الشهرية"
        ],
        duration: "3-6 أشهر",
        startingPrice: "5,000 جنيه",
        popular: true
      },
      {
        id: 2,
        title: "التصميم الجرافيكي والإبداعي",
        description: "تصميمات إبداعية تعبر عن هوية علامتك التجارية وتلفت انتباه جمهورك المستهدف.",
        detailedDescription: "فريقنا من المصممين المبدعين يقدم حلول تصميم شاملة تشمل تصميم الشعارات، الهوية البصرية، المواد الدعائية، التغليف، والإنفوجرافيك. نضمن لك تصميمات احترافية تنافس في السوق.",
        icon: "fas fa-palette",
        category: "design",
        features: [
          "تصميم الشعارات والهوية البصرية (Logo & Branding)",
          "تصميم المواد الدعائية والمطبوعات",
          "تصميم الإنفوجرافيك والرسوم البيانية",
          "تصميم أغلفة المنتجات والتغليف",
          "تصميم العروض التقديمية الاحترافية"
        ],
        duration: "1-4 أسابيع",
        startingPrice: "2,000 جنيه",
        popular: true
      },
      {
        id: 3,
        title: "تطوير المواقع والتطبيقات",
        description: "نطور مواقع إلكترونية وتطبيقات ذكية متجاوبة وسريعة تلبي احتياجات عملك وتطورات العصر الرقمي.",
        detailedDescription: "نقدم خدمات تطوير مواقع وتطبيقات متكاملة تشمل التصميم، البرمجة، الاختبار، والصيانة. نستخدم أحدث التقنيات مثل React, Vue.js, Node.js لضمان أداء عالي وتجربة مستخدم متميزة.",
        icon: "fas fa-code",
        category: "development",
        features: [
          "تطوير مواقع الويب الديناميكية والمتجاوبة",
          "تطبيقات الويب التقدمية (PWA)",
          "تطبيقات الجوال (iOS & Android)",
          "متاجر إلكترونية (E-commerce)",
          "أنظمة إدارة المحتوى (CMS) مخصصة",
          "تكامل مع أنظمة الدفع والخدمات"
        ],
        duration: "4-12 أسبوع",
        startingPrice: "8,000 جنيه",
        popular: false
      },
      {
        id: 4,
        title: "التسويق العقاري الرقمي",
        description: "حلول تسويقية متخصصة للقطاع العقاري تزيد من فرص البيع والإيجار وتعزز وجودك في السوق.",
        detailedDescription: "نطور استراتيجيات تسويق رقمي مخصصة للقطاع العقاري تشمل التسويق عبر منصات العقارات، الحملات الإعلانية المستهدفة، إدارة المحتوى العقاري، وجذب العملاء المحتملين.",
        icon: "fas fa-building",
        category: "real-estate",
        features: [
          "تصميم وإدارة الحملات العقارية المخصصة",
          "جولات افتراضية للوحدات العقارية (Virtual Tours)",
          "إدارة منصات التواصل للعقارات",
          "جذب وتصنيف العملاء المحتملين (Leads)",
          "تحليلات السوق العقاري وتقارير المنافسة"
        ],
        duration: "2-4 أشهر",
        startingPrice: "6,000 جنيه",
        popular: true
      },
      {
        id: 5,
        title: "الاستشارات التسويقية والإدارية",
        description: "استشارات احترافية تساعدك على تطوير استراتيجيات عمل ناجحة واتخاذ قرارات مدروسة.",
        detailedDescription: "نقدم استشارات متخصصة في التسويق والإدارة تساعد الشركات على تحسين أدائها، زيادة أرباحها، والتوسع في أسواق جديدة. فريقنا من الخبراء يدرس وضعك الحالي ويقدم حلولاً عملية وقابلة للتنفيذ.",
        icon: "fas fa-chart-line",
        category: "consulting",
        features: [
          "تحليل السوق والمنافسين الشامل",
          "تطوير خطط عمل واستراتيجيات نمو",
          "استشارات تحسين العمليات والإدارة",
          "تدريب الفرق على المهارات التسويقية",
          "متابعة وتقييم الأداء بشكل مستمر"
        ],
        duration: "1-3 أشهر",
        startingPrice: "3,500 جنيه",
        popular: false
      },
      {
        id: 6,
        title: "حلول رقمية متكاملة للشركات",
        description: "حزم خدمات شاملة تلبي جميع احتياجات شركتك الرقمية من التسويق إلى التطوير والدعم الفني.",
        detailedDescription: "نقدم حزم خدمات متكاملة تشمل جميع جوانب التحول الرقمي للشركات، بدءًا من التخطيط الاستراتيجي، مرورًا بالتنفيذ التقني، وصولاً إلى الدعم والصيانة المستمرة. حلول مصممة خصيصًا لتناسب احتياجات عملك.",
        icon: "fas fa-cogs",
        category: "solutions",
        features: [
          "حزم خدمات رقمية شاملة (All-in-One)",
          "إدارة وتحليل البيانات الضخمة",
          "أنظمة الأتمتة وتكامل الأنظمة",
          "حلول الحوسبة السحابية",
          "الدعم الفني والصيانة المستمرة",
          "تقارير أداء وتطور ربع سنوية"
        ],
        duration: "6-12 شهر",
        startingPrice: "15,000 جنيه",
        popular: false
      }
    ];
  }

  // تهيئة المكون
  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container #${this.containerId} not found`);
      return;
    }

    this.render();
    this.bindEvents();
  }

  // توليد واجهة المستخدم
  render() {
    this.container.innerHTML = `
      <section class="services-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">${APP_CONFIG.sections.services.title}</h2>
            <p class="section-subtitle">${APP_CONFIG.sections.services.subtitle}</p>
          </div>

          <!-- أدوات التحكم: البحث والتصفية -->
          <div class="services-controls">
            <div class="search-box">
              <i class="fas fa-search"></i>
              <input 
                type="text" 
                id="services-search" 
                class="search-input" 
                placeholder="${APP_CONFIG.messages.search} في الخدمات..."
              >
            </div>

            <div class="filter-buttons">
              <button class="filter-btn active" data-filter="all">الكل</button>
              <button class="filter-btn" data-filter="digital">تسويق</button>
              <button class="filter-btn" data-filter="design">تصميم</button>
              <button class="filter-btn" data-filter="development">تطوير</button>
              <button class="filter-btn" data-filter="real-estate">عقاري</button>
              <button class="filter-btn" data-filter="consulting">استشارات</button>
              <button class="filter-btn" data-filter="solutions">حلول</button>
            </div>
          </div>

          <!-- شبكة الخدمات -->
          <div class="services-grid" id="services-grid">
            ${this.renderServicesGrid()}
          </div>

          <!-- رسالة عند عدم العثور على نتائج -->
          <div class="no-results" id="no-results" style="display: none;">
            <i class="fas fa-search"></i>
            <p>${APP_CONFIG.messages.noData}</p>
            <button class="reset-filters">إعادة تعيين الفلاتر</button>
          </div>
        </div>
      </section>
    `;
  }

  // توليد شبكة الخدمات
  renderServicesGrid() {
    return this.filteredServices.map(service => `
      <div class="service-card" data-category="${service.category}" data-id="${service.id}">
        ${service.popular ? '<span class="popular-badge">الأكثر طلبًا</span>' : ''}
        
        <div class="service-icon">
          <i class="${service.icon}"></i>
        </div>
        
        <h3 class="service-title">${service.title}</h3>
        
        <p class="service-description">${service.description}</p>
        
        <div class="service-features">
          <h4>المميزات الرئيسية:</h4>
          <ul>
            ${service.features.slice(0, 3).map(feature => `
              <li><i class="fas fa-check-circle"></i> ${feature}</li>
            `).join('')}
          </ul>
        </div>
        
        <div class="service-meta">
          <div class="meta-item">
            <i class="fas fa-clock"></i>
            <span>${service.duration}</span>
          </div>
          <div class="meta-item">
            <i class="fas fa-tag"></i>
            <span>تبدأ من ${service.startingPrice}</span>
          </div>
        </div>
        
        <div class="service-actions">
          <button class="btn btn-primary service-details" data-id="${service.id}">
            <i class="fas fa-info-circle"></i> التفاصيل
          </button>
          <button class="btn btn-outline service-contact" data-id="${service.id}">
            <i class="fas fa-headset"></i> اطلب خدمة
          </button>
        </div>
      </div>
    `).join('');
  }

  // ربط الأحداث
  bindEvents() {
    // عناصر DOM
    this.searchInput = document.getElementById('services-search');
    this.filterButtons = document.querySelectorAll('.filter-btn');
    this.servicesGrid = document.getElementById('services-grid');
    this.noResults = document.getElementById('no-results');

    // حدث البحث
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => {
        this.filterServices(e.target.value, this.activeFilter);
      });
    }

    // أحداث التصفية
    this.filterButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.setActiveFilter(filter);
        this.filterServices(this.searchInput?.value || '', filter);
      });
    });

    // زر إعادة تعيين الفلاتر
    const resetBtn = document.querySelector('.reset-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }

    // أحداث أزرار الخدمات
    setTimeout(() => {
      document.querySelectorAll('.service-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const serviceId = e.target.dataset.id || e.target.closest('.service-details').dataset.id;
          this.showServiceDetails(serviceId);
        });
      });

      document.querySelectorAll('.service-contact').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const serviceId = e.target.dataset.id || e.target.closest('.service-contact').dataset.id;
          this.requestService(serviceId);
        });
      });
    }, 100);
  }

  // تعيين الفلتر النشط
  setActiveFilter(filter) {
    this.activeFilter = filter;
    
    this.filterButtons.forEach(btn => {
      if (btn.dataset.filter === filter) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // تصفية الخدمات
  filterServices(searchTerm = '', filter = 'all') {
    this.filteredServices = this.services.filter(service => {
      // تطبيق البحث
      const matchesSearch = searchTerm === '' || 
        service.title.includes(searchTerm) ||
        service.description.includes(searchTerm) ||
        service.features.some(f => f.includes(searchTerm));

      // تطبيق التصفية
      const matchesFilter = filter === 'all' || service.category === filter;

      return matchesSearch && matchesFilter;
    });

    this.updateServicesGrid();
  }

  // إعادة تعيين الفلاتر
  resetFilters() {
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    
    this.setActiveFilter('all');
    this.filterServices('', 'all');
  }

  // تحديث عرض الخدمات
  updateServicesGrid() {
    if (!this.servicesGrid) return;

    if (this.filteredServices.length === 0) {
      this.servicesGrid.style.display = 'none';
      if (this.noResults) {
        this.noResults.style.display = 'block';
      }
    } else {
      this.servicesGrid.style.display = 'grid';
      if (this.noResults) {
        this.noResults.style.display = 'none';
      }
      this.servicesGrid.innerHTML = this.renderServicesGrid();
      
      // إعادة ربط الأحداث للخدمات الجديدة
      setTimeout(() => {
        document.querySelectorAll('.service-details').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const serviceId = e.target.dataset.id || e.target.closest('.service-details').dataset.id;
            this.showServiceDetails(serviceId);
          });
        });

        document.querySelectorAll('.service-contact').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const serviceId = e.target.dataset.id || e.target.closest('.service-contact').dataset.id;
            this.requestService(serviceId);
          });
        });
      }, 50);
    }
  }

  // عرض تفاصيل الخدمة
  showServiceDetails(serviceId) {
    const service = this.services.find(s => s.id == serviceId);
    if (!service) return;

    // في النسخة المطورة: يمكن فتح modal أو الانتقال لصفحة تفصيلية
    alert(`تفاصيل الخدمة: ${service.title}\n\n${service.detailedDescription}\n\nالمميزات:\n${service.features.map(f => `• ${f}`).join('\n')}\n\nالمدة: ${service.duration}\nالسعر: يبدأ من ${service.startingPrice}`);
  }

  // طلب الخدمة
  requestService(serviceId) {
    const service = this.services.find(s => s.id == serviceId);
    if (!service) return;

    // توجيه لنموذج الاتصال مع تفاصيل الخدمة
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      const serviceInput = contactForm.querySelector('input[name="service"]') || 
                          document.createElement('input');
      serviceInput.type = 'hidden';
      serviceInput.name = 'service';
      serviceInput.value = service.title;
      
      if (!contactForm.querySelector('input[name="service"]')) {
        contactForm.appendChild(serviceInput);
      }
      
      // تمرير إلى قسم الاتصال
      window.location.hash = '#contact';
      
      // إظهار رسالة
      setTimeout(() => {
        alert(`تم تحديد خدمة: ${service.title}\n\nيرجى إكمال بيانات التواصل في نموذج الاتصال بالأسفل.`);
      }, 500);
    } else {
      alert(`خدمة: ${service.title}\n\nيرجى التواصل معنا عبر:\nالهاتف: ${APP_CONFIG.company.contact.phone}\nالواتساب: ${APP_CONFIG.company.contact.whatsapp}\nالبريد: ${APP_CONFIG.company.contact.email}`);
    }
  }

  // تحديث البيانات
  updateServices(newServices) {
    this.services = newServices;
    this.filterServices(
      this.searchInput?.value || '', 
      this.activeFilter
    );
  }
}

export default ServicesSection;
