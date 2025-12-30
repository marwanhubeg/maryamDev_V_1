import React from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import HeroSection from '../components/layout/HeroSection';
import ServicesSection from '../components/layout/ServicesSection';
import StatisticsSection from '../components/layout/StatisticsSection';
import GallerySection from '../components/layout/GallerySection';
import ContactSection from '../components/layout/ContactSection';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Services Preview */}
        <section id="services" className="section-padding">
          <div className="container">
            <h2 className="section-title">حلول رقمية متكاملة</h2>
            <p className="section-description">
              نقدم في Marwan Hub مجموعة من الحلول الرقمية المصممة خصيصًا لتنمية أعمالك وبناء حضور قوي في السوق الرقمي.
            </p>
            <ServicesSection isPreview={true} />
            <div className="text-center mt-8">
              <a href="/services" className="btn-primary">اكتشف جميع خدماتنا</a>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section id="statistics" className="section-padding bg-light-gray">
          <div className="container">
            <StatisticsSection />
          </div>
        </section>

        {/* Portfolio Preview */}
        <section id="portfolio" className="section-padding">
          <div className="container">
            <h2 className="section-title">أعمال نفتخر بها</h2>
            <p className="section-description">
              مجموعة من المشاريع الناجحة التي قمنا بتنفيذها لعملائنا في مختلف المجالات.
            </p>
            <GallerySection isPreview={true} />
            <div className="text-center mt-8">
              <a href="/portfolio" className="btn-secondary">شاهد جميع أعمالنا</a>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact-cta" className="section-padding bg-primary text-white">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title text-white">مستعدون لبدء مشروعك القادم؟</h2>
              <p className="section-description text-white opacity-90">
                تواصل معنا اليوم واحصل على استشارة مجانية لتطوير استراتيجيتك الرقمية.
              </p>
              <a href="/contact" className="btn-white mt-6">ابدأ مشروعك الآن</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
