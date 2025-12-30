import React from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const AboutPage = () => {
  const values = [
    { id: 1, title: 'الإبداع', description: 'نبتكر حلولًا جديدة تناسب تحديات العصر الرقمي' },
    { id: 2, title: 'الجودة', description: 'نلتزم بأعلى معايير الجودة في كل ما نقدمه' },
    { id: 3, title: 'الموثوقية', description: 'نحن شركاء يمكن الاعتماد عليهم في تحقيق الأهداف' },
    { id: 4, title: 'الشراكة', description: 'نعمل كجزء من فريقك لتحقيق النجاح المشترك' },
    { id: 5, title: 'التطوير المستمر', description: 'نتطور باستمرار لنواكب أحدث التقنيات والاتجاهات' }
  ];

  return (
    <div className="about-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">Marwan Hub – شريكك في النمو الرقمي</h1>
              <p className="hero-description">
                Marwan Hub هي وكالة تسويق رقمي متكاملة تأسست عام 2020، مقرها القاهرة، وتهدف إلى مساعدة الشركات الناشئة والمتوسطة على بناء حضور رقمي قوي وتحقيق نمو حقيقي ومستدام.
              </p>
              <p className="hero-description">
                نحن نعمل بعقلية الشراكة، لا التنفيذ فقط. نفهم البيزنس، نحلل السوق، ونبني حلولًا مصممة خصيصًا لتحقيق أهدافك.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding bg-light-gray">
          <div className="container">
            <h2 className="section-title text-center">قيمنا الأساسية</h2>
            <div className="values-grid">
              {values.map((value) => (
                <div key={value.id} className="value-card">
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Vision */}
        <section className="section-padding">
          <div className="container">
            <div className="mission-vision-grid">
              <div className="mission-card">
                <h2 className="section-title">رؤيتنا</h2>
                <p className="section-description">
                  أن نكون الشريك الرقمي المفضل للشركات الطموحة في السوق العربي، من خلال تقديم حلول مبتكرة تحقق نموًا مستدامًا وتأثيرًا حقيقيًا.
                </p>
              </div>
              <div className="vision-card">
                <h2 className="section-title">رسالتنا</h2>
                <p className="section-description">
                  تمكين الشركات من تحقيق أهدافها الرقمية عبر حلول استراتيجية مدروسة، تنفيذ احترافي، وشراكة حقيقية تقوم على الثقة والنتائج الملموسة.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title text-white">هل تبحث عن شريك رقمي موثوق؟</h2>
              <p className="section-description text-white opacity-90">
                تواصل معنا اليوم لتبدأ رحلة النمو الرقمي لشركتك.
              </p>
              <a href="/contact" className="btn-white mt-6">تواصل معنا</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
