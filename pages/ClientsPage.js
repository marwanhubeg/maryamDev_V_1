import React from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const ClientsPage = () => {
  const clients = [
    { id: 1, name: 'شركة التقنية المتطورة', logo: '/assets/images/clients/tech-co.png', category: 'تقنية' },
    { id: 2, name: 'مطعم الذواقة', logo: '/assets/images/clients/restaurant.png', category: 'مطاعم' },
    { id: 3, name: 'أكاديمية التعليم', logo: '/assets/images/clients/academy.png', category: 'تعليم' },
    { id: 4, name: 'عقارات النخبة', logo: '/assets/images/clients/realestate.png', category: 'عقارات' },
    { id: 5, name: 'متجر الأزياء', logo: '/assets/images/clients/fashion.png', category: 'تجزئة' },
    { id: 6, name: 'عيادة طبية', logo: '/assets/images/clients/clinic.png', category: 'صحة' },
    { id: 7, name: 'شركة سياحة', logo: '/assets/images/clients/travel.png', category: 'سياحة' },
    { id: 8, name: 'استوديو تصميم', logo: '/assets/images/clients/design.png', category: 'تصميم' },
    { id: 9, name: 'مكتب محاماة', logo: '/assets/images/clients/law.png', category: 'خدمات' },
    { id: 10, name: 'شركة بناء', logo: '/assets/images/clients/construction.png', category: 'إنشاءات' },
    { id: 11, name: 'صالون تجميل', logo: '/assets/images/clients/beauty.png', category: 'جمال' },
    { id: 12, name: 'نادي رياضي', logo: '/assets/images/clients/gym.png', category: 'لياقة' }
  ];

  const testimonials = [
    {
      id: 1,
      text: 'تعاملنا مع Marwan Hub كان نقلة نوعية لوجودنا الرقمي. استراتيجيتهم المبنية على البيانات ساعدتنا في زيادة المبيعات بنسبة 40%.',
      author: 'أحمد محمود',
      position: 'مدير التسويق - شركة التقنية المتطورة'
    },
    {
      id: 2,
      text: 'المهنية والالتزام بالمواعيد كانت من أهم نقاط القوة في التعامل مع فريق Marwan Hub. أنصح أي شركة تبحث عن شريك رقمي موثوق.',
      author: 'سارة أحمد',
      position: 'مالكة مطعم الذواقة'
    },
    {
      id: 3,
      text: 'موقعنا الجديد الذي طوره فريق Marwan Hub ساهم في زيادة العملاء بنسبة 60% خلال أول شهر من الإطلاق.',
      author: 'محمد الخولي',
      position: 'مدير عام أكاديمية التعليم'
    }
  ];

  return (
    <div className="clients-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">شركاء نجاح نعتز بثقتهم</h1>
              <p className="hero-description">
                نفخر بالعمل مع مجموعة متنوعة من الشركات والعلامات التجارية التي وثقت بنا كشريك تسويقي وتقني.
              </p>
              <p className="hero-description">
                نحن لا نبحث عن كثرة العملاء، بل عن علاقات طويلة المدى قائمة على النتائج والثقة المتبادلة.
              </p>
            </div>
          </div>
        </section>

        {/* Clients Logos */}
        <section className="section-padding">
          <div className="container">
            <h2 className="section-title text-center">شركاؤنا في النجاح</h2>
            <div className="clients-grid">
              {clients.map((client) => (
                <div key={client.id} className="client-logo">
                  <img src={client.logo} alt={client.name} />
                  <p className="client-name">{client.name}</p>
                  <span className="client-category">{client.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section-padding bg-light-gray">
          <div className="container">
            <h2 className="section-title text-center">ماذا يقول شركاؤنا عنا؟</h2>
            <div className="testimonials-grid">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-content">
                    <p className="testimonial-text">"{testimonial.text}"</p>
                  </div>
                  <div className="testimonial-author">
                    <h4 className="author-name">{testimonial.author}</h4>
                    <p className="author-position">{testimonial.position}</p>
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
              <h2 className="section-title text-white">انضم إلى شركاء النجاح</h2>
              <p className="section-description text-white opacity-90">
                كن التالي في قائمة عملائنا الناجحين. تواصل معنا لبدء شراكتك مع Marwan Hub.
              </p>
              <a href="/contact" className="btn-white mt-6">انضم إلينا الآن</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ClientsPage;
