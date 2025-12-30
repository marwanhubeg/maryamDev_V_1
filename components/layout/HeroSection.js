/**
 * HeroSection - القسم الرئيسي الاحترافي
 * @version 2.0.0 - Corporate Modern
 */

import { APP_CONFIG } from '../../config/app-config.js';

export class HeroSection {
  constructor(containerId = 'hero-section') {
    this.containerId = containerId;
    this.container = null;
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
      <section class="hero-section corporate-hero" id="home">
        <div class="container">
          <div class="hero-content">
            <!-- Badge - Premium Quality -->
            <div class="hero-badge">
              <span class="badge-text">حلول رقمية متميزة منذ 2020</span>
            </div>

            <!-- Main Heading -->
            <h1 class="hero-title">
              <span class="title-line">شركاؤك في التحول</span>
              <span class="title-line highlight">الرقمي الناجح</span>
            </h1>

            <!-- Description -->
            <p class="hero-description">
              نقدم استراتيجيات وحلول رقمية متكاملة تساعد شركتك على النمو، 
              زيادة المبيعات، وتعزيز الوجود الرقمي في السوق التنافسي.
            </p>

            <!-- CTA Buttons -->
            <div class="hero-actions">
              <a href="#services" class="btn btn-primary btn-lg hero-cta">
                <i class="fas fa-rocket"></i>
                <span>استكشف حلولنا</span>
              </a>
              <a href="#contact" class="btn btn-outline btn-lg hero-cta">
                <i class="fas fa-calendar-alt"></i>
                <span>استشارة مجانية</span>
              </a>
            </div>

            <!-- Stats Preview -->
            <div class="hero-stats">
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">مشروع ناجح</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">3+</div>
                <div class="stat-label">سنوات خبرة</div>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <div class="stat-number">95%</div>
                <div class="stat-label">رضا العملاء</div>
              </div>
            </div>
          </div>

          <!-- Minimal Hero Visual -->
          <div class="hero-visual">
            <div class="visual-container">
              <div class="visual-element element-1"></div>
              <div class="visual-element element-2"></div>
              <div class="visual-element element-3"></div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  bindEvents() {
    // Smooth scroll for CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-cta');
    ctaButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const target = button.getAttribute('href');
        this.scrollToSection(target);
      });
    });
  }

  scrollToSection(sectionId) {
    const element = document.querySelector(sectionId);
    if (element) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Optional: Add subtle animation on load
  animateElements() {
    setTimeout(() => {
      const elements = document.querySelectorAll('.visual-element');
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('animated');
        }, index * 300);
      });
    }, 500);
  }
}

export default HeroSection;
