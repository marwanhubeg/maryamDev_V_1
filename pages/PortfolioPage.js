import React from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const PortfolioPage = () => {
  const projects = [
    {
      id: 1,
      title: 'موقع تجارة إلكترونية',
      category: 'تطوير مواقع',
      description: 'تطوير منصة تسوق إلكتروني متكاملة مع نظام دفع وإدارة مخزون',
      image: '/assets/images/gallery/ecommerce.jpg'
    },
    {
      id: 2,
      title: 'حملة تسويقية لعقار فاخر',
      category: 'تسويق عقاري',
      description: 'حملة إعلانية متكاملة أدت إلى بيع 85% من الوحدات خلال شهرين',
      image: '/assets/images/gallery/realestate.jpg'
    },
    {
      id: 3,
      title: 'هوية بصرية لمطعم',
      category: 'تصميم جرافيك',
      description: 'تصميم هوية متكاملة شملت لوجو، قوائم، ومواد ترويجية',
      image: '/assets/images/gallery/restaurant.jpg'
    },
    {
      id: 4,
      title: 'تطبيق خدمة توصيل',
      category: 'تطبيقات',
      description: 'تطبيق جوال يربط بين العملاء ومقدمي الخدمات',
      image: '/assets/images/gallery/delivery.jpg'
    },
    {
      id: 5,
      title: 'استراتيجية سوشيال ميديا',
      category: 'تسويق رقمي',
      description: 'خطة محتوى وإعلانات زادت المتابعين بنسبة 300% في 6 أشهر',
      image: '/assets/images/gallery/socialmedia.jpg'
    },
    {
      id: 6,
      title: 'موقع شركة تقنية',
      category: 'تطوير مواقع',
      description: 'موقع احترافي يعرض خدمات شركة تقنية ناشئة',
      image: '/assets/images/gallery/techcompany.jpg'
    }
  ];

  const categories = ['جميع الأعمال', 'تطوير مواقع', 'تسويق رقمي', 'تصميم جرافيك', 'تطبيقات', 'تسويق عقاري'];

  return (
    <div className="portfolio-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">أعمال نفخر بها… ونتائج تتحدث عنا</h1>
              <p className="hero-description">
                استعرض مجموعة من المشاريع التي قمنا بتنفيذها في مجالات متعددة، من التسويق الرقمي إلى تطوير المواقع وبناء الهويات البصرية.
              </p>
              <p className="hero-description">
                كل مشروع يعكس التزامنا بالجودة، وفهمنا العميق لاحتياجات العميل، وقدرتنا على تقديم حلول عملية ومؤثرة.
              </p>
            </div>
          </div>
        </section>

        {/* Categories Filter */}
        <section className="section-padding bg-light-gray">
          <div className="container">
            <div className="categories-filter">
              {categories.map((category, index) => (
                <button 
                  key={index} 
                  className={`category-btn ${index === 0 ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="section-padding">
          <div className="container">
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.id} className="project-card">
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    <span className="project-category">{project.category}</span>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title text-white">هل لديك مشروع قادم؟</h2>
              <p className="section-description text-white opacity-90">
                دعنا نناقش فكرتك ونحولها إلى واقع ملموس يحقق أهدافك.
              </p>
              <a href="/contact" className="btn-white mt-6">ناقش مشروعك معنا</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioPage;
