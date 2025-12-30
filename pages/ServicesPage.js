import React from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: 'إدارة حسابات السوشيال ميديا باحتراف',
      description: 'نخطط وننفذ استراتيجيات متكاملة لإدارة حضورك على منصات التواصل الاجتماعي لتعزيز التفاعل وزيادة المتابعين.',
      icon: '📱'
    },
    {
      id: 2,
      title: 'الحملات الإعلانية الممولة (Meta – Google)',
      description: 'تصميم وإدارة حملات إعلانية موجهة تحقق أعلى عائد على الاستثمار من خلال تحليل البيانات والتعديل المستمر.',
      icon: '🎯'
    },
    {
      id: 3,
      title: 'تحسين محركات البحث (SEO)',
      description: 'تحسين موقعك لمحركات البحث لزيادة الظهور العضوي وجذب زوار مهتمين بخدماتك ومنتجاتك.',
      icon: '🔍'
    },
    {
      id: 4,
      title: 'تصميم الجرافيك والهوية البصرية',
      description: 'إنشاء هوية بصرية متكاملة تعكس قيم علامتك التجارية وتتميز عن المنافسين.',
      icon: '🎨'
    },
    {
      id: 5,
      title: 'تطوير المواقع والتطبيقات',
      description: 'تطوير مواقع إلكترونية وتطبيقات ذكية سريعة، آمنة، وقابلة للتوسع تناسب احتياجات عملك.',
      icon: '💻'
    },
    {
      id: 6,
      title: 'التسويق العقاري الرقمي',
      description: 'حلول تسويقية متخصصة للمطورين العقاريين تزيد من المبيعات وتعزز الوصول للعملاء المستهدفين.',
      icon: '🏢'
    },
    {
      id: 7,
      title: 'استشارات تسويقية وبناء استراتيجيات',
      description: 'تقديم استشارات متخصصة وبناء استراتيجيات تسويقية مبنية على تحليل السوق والبيانات.',
      icon: '📊'
    }
  ];

  return (
    <div className="services-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section bg-primary text-white">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">حلول تسويق رقمي ذكية تنمو مع أعمالك</h1>
              <p className="hero-description">
                في Marwan Hub نقدم حلول تسويق رقمي متكاملة مبنية على الفهم العميق للسوق، البيانات، والتجربة العملية. 
                هدفنا ليس الظهور فقط، بل تحقيق نتائج حقيقية قابلة للقياس.
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding">
          <div className="container">
            <div className="services-grid">
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-light-gray">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title">مستعد لبدء مشروعك معنا؟</h2>
              <p className="section-description">
                تواصل معنا اليوم لمناقشة احتياجاتك والحصول على خطة عمل مخصصة.
              </p>
              <a href="/contact" className="btn-primary mt-6">ابدأ مشروعك معنا</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicesPage;
