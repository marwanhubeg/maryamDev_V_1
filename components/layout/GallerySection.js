/**
 * GallerySection - معرض الحلول
 * @version 2.0.0 - Corporate Modern
 */

export class GallerySection {
  constructor(containerId = 'gallery-section') {
    this.containerId = containerId;
    this.container = null;
    this.solutions = this.getSolutionsData();
    this.activeFilter = 'all';
  }

  getSolutionsData() {
    return [
      {
        id: 1,
        title: "منصة تجارة إلكترونية متكاملة",
        category: "web",
        description: "تطوير نظام بيع إلكتروني متكامل مع أنظمة الدفع والمخزون",
        tags: ["E-commerce", "React", "Node.js"],
        outcome: "زيادة المبيعات بنسبة 300%"
      },
      {
        id: 2,
        title: "حملة تسويق رقمي لعقار فاخر",
        category: "marketing",
        description: "إستراتيجية تسويق متكاملة لمشروع عقاري كبير",
        tags: ["Real Estate", "Digital Marketing", "Social Media"],
        outcome: "بيع 90% من الوحدات خلال 3 أشهر"
      },
      {
        id: 3,
        title: "تصميم هوية بصرية لعلامة تجارية",
        category: "design",
        description: "تطوير الهوية البصرية الكاملة لشركة ناشئة",
        tags: ["Branding", "Logo Design", "Visual Identity"],
        outcome: "تمييز العلامة في السوق التنافسي"
      },
      {
        id: 4,
        title: "نظام إدارة علاقات عملاء",
        category: "solutions",
        description: "تطوير نظام CRM مخصص لشركة خدمات",
        tags: ["CRM", "Custom Software", "Automation"],
        outcome: "تحسين كفاءة المبيعات بنسبة 40%"
      },
      {
        id: 5,
        title: "تطبيق جوال للخدمات اللوجستية",
        category: "mobile",
        description: "تطوير تطبيق لإدارة عمليات الشحن والتوصيل",
        tags: ["Mobile App", "Logistics", "Flutter"],
        outcome: "تقليل وقت التسليم بنسبة 25%"
      },
      {
        id: 6,
        title: "موقع شركة خدمات استشارية",
        category: "web",
        description: "تصميم وتطوير موقع احترافي لشركة استشارات",
        tags: ["Corporate Website", "Consulting", "WordPress"],
        outcome: "زيادة الاستفسارات بنسبة 150%"
      }
    ];
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container #${this.containerId} not found`);
      return;
    }

    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <section class="gallery-section solutions-gallery">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">حلول متميزة</h2>
            <p class="section-subtitle">أحدث المشاريع التي نفخر بتنفيذها لشركائنا</p>
          </div>

          <!-- Filter Buttons -->
          <div class="solutions-filter">
            <button class="filter-btn active" data-filter="all">جميع الحلول</button>
            <button class="filter-btn" data-filter="web">تطوير المواقع</button>
            <button class="filter-btn" data-filter="marketing">التسويق الرقمي</button>
            <button class="filter-btn" data-filter="design">التصميم</button>
            <button class="filter-btn" data-filter="mobile">تطبيقات الجوال</button>
            <button class="filter-btn" data-filter="solutions">حلول مخصصة</button>
          </div>

          <!-- Solutions Grid -->
          <div class="solutions-grid">
            ${this.renderSolutions()}
          </div>
        </div>
      </section>
    `;
  }

  renderSolutions() {
    return this.solutions.map(solution => `
      <div class="solution-card" data-category="${solution.category}">
        <div class="solution-header">
          <div class="solution-category">${this.getCategoryName(solution.category)}</div>
          <div class="solution-outcome">
            <i class="fas fa-chart-line"></i>
            ${solution.outcome}
          </div>
        </div>
        
        <div class="solution-body">
          <h3 class="solution-title">${solution.title}</h3>
          <p class="solution-description">${solution.description}</p>
          
          <div class="solution-tags">
            ${solution.tags.map(tag => `<span class="solution-tag">${tag}</span>`).join('')}
          </div>
        </div>
        
        <div class="solution-footer">
          <button class="btn btn-outline solution-details" data-id="${solution.id}">
            <i class="fas fa-info-circle"></i>
            تفاصيل المشروع
          </button>
        </div>
      </div>
    `).join('');
  }

  getCategoryName(category) {
    const categories = {
      web: "تطوير مواقع",
      marketing: "تسويق رقمي",
      design: "تصميم",
      mobile: "تطبيقات جوال",
      solutions: "حلول مخصصة"
    };
    return categories[category] || category;
  }

  bindEvents() {
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        this.setActiveFilter(filter);
        this.filterSolutions(filter);
      });
    });

    // Solution details buttons
    setTimeout(() => {
      const detailBtns = document.querySelectorAll('.solution-details');
      detailBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const solutionId = e.target.dataset.id || e.target.closest('.solution-details').dataset.id;
          this.showSolutionDetails(solutionId);
        });
      });
    }, 100);
  }

  setActiveFilter(filter) {
    this.activeFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });
  }

  filterSolutions(filter) {
    const solutionCards = document.querySelectorAll('.solution-card');
    
    solutionCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        setTimeout(() => card.classList.add('visible'), 10);
      } else {
        card.classList.remove('visible');
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  }

  showSolutionDetails(solutionId) {
    const solution = this.solutions.find(s => s.id == solutionId);
    if (!solution) return;

    alert(`تفاصيل المشروع:\n\n📌 ${solution.title}\n\n📝 ${solution.description}\n\n🏷️ ${solution.tags.join(' | ')}\n\n🎯 النتيجة: ${solution.outcome}`);
  }
}

export default GallerySection;
