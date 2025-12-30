/**
 * StatisticsSection - إحصائيات مبسطة
 * @version 2.0.0 - Corporate Modern
 */

export class StatisticsSection {
  constructor(containerId = 'statistics-section') {
    this.containerId = containerId;
    this.container = null;
    this.stats = [
      { value: 50, suffix: "+", label: "مشروع ناجح", icon: "fas fa-check-circle" },
      { value: 3, suffix: "+", label: "سنوات خبرة", icon: "fas fa-calendar-alt" },
      { value: 10, suffix: "+", label: "صناعة", icon: "fas fa-industry" },
      { value: 95, suffix: "%", label: "رضا العملاء", icon: "fas fa-heart" }
    ];
    this.hasAnimated = false;
  }

  init() {
    this.container = document.getElementById(this.containerId);
    if (!this.container) {
      console.error(`Container #${this.containerId} not found`);
      return;
    }

    this.render();
    this.setupIntersectionObserver();
  }

  render() {
    this.container.innerHTML = `
      <section class="statistics-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">أرقام تعكس جودة عملنا</h2>
            <p class="section-subtitle">إنجازاتنا تتحدث عن خبرتنا والتزامنا بالتميز</p>
          </div>
          
          <div class="stats-grid">
            ${this.stats.map(stat => `
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="${stat.icon}"></i>
                </div>
                <div class="stat-content">
                  <div class="stat-value" data-target="${stat.value}">0${stat.suffix}</div>
                  <div class="stat-label">${stat.label}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateStats();
          this.hasAnimated = true;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(this.container);
  }

  animateStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    statValues.forEach((element, index) => {
      const target = parseInt(element.dataset.target);
      const suffix = this.stats[index].suffix;
      
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
      }, 30);
    });
  }
}

export default StatisticsSection;
