import React from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const BlogPage = () => {
  return (
    <div className="blog-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content text-center">
              <h1 className="hero-title">المدونة</h1>
              <p className="hero-description">
                قريبًا – مقالات ونصائح في التسويق الرقمي
              </p>
              <p className="hero-description">
                نعمل حالياً على إعداد محتوى قيم ومفيد يساعدك في تطوير استراتيجيتك الرقمية
              </p>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="section-padding">
          <div className="container">
            <div className="coming-soon text-center">
              <div className="coming-soon-icon">📝</div>
              <h2 className="section-title">قريبًا مع Marwan Hub</h2>
              <p className="section-description">
                نحن نجهز لك مجموعة من المقالات والنصائح في مجال التسويق الرقمي، تطوير المواقع، 
                وبناء الهوية البصرية التي ستساعدك في تنمية أعمالك.
              </p>
              
              <div className="topics-preview">
                <h3 className="topics-title">مواضيع ستجدها في مدونتنا:</h3>
                <div className="topics-grid">
                  <div className="topic-card">
                    <h4>استراتيجيات التسويق الرقمي</h4>
                    <p>أحدث الأساليب والتقنيات في التسويق الإلكتروني</p>
                  </div>
                  <div className="topic-card">
                    <h4>تحسين محركات البحث SEO</h4>
                    <p>نصائح عملية لتحسين ظهور موقعك في البحث</p>
                  </div>
                  <div className="topic-card">
                    <h4>إدارة السوشيال ميديا</h4>
                    <p>كيفية بناء حضور قوي على منصات التواصل</p>
                  </div>
                  <div className="topic-card">
                    <h4>تطوير المواقع والتطبيقات</h4>
                    <p>أفضل الممارسات في التطوير التقني</p>
                  </div>
                </div>
              </div>

              <div className="subscribe-cta">
                <h3 className="subscribe-title">كن أول من يعلم عند الإطلاق</h3>
                <div className="subscribe-form">
                  <input 
                    type="email" 
                    placeholder="أدخل بريدك الإلكتروني" 
                    className="subscribe-input"
                  />
                  <button className="btn-primary">اشترك</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-white">
          <div className="container">
            <div className="text-center">
              <h2 className="section-title text-white">هل لديك استفسار؟</h2>
              <p className="section-description text-white opacity-90">
                تواصل معنا مباشرة للحصول على استشارة مجانية أو مناقشة مشروعك.
              </p>
              <a href="/contact" className="btn-white mt-6">تواصل معنا الآن</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
