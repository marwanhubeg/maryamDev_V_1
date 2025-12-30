import React, { useState } from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: '📞',
      title: 'الهاتف',
      value: '01277831988',
      link: 'tel:01277831988'
    },
    {
      icon: '📱',
      title: 'واتساب',
      value: '+201277831988',
      link: 'https://wa.me/201277831988'
    },
    {
      icon: '✉️',
      title: 'البريد الإلكتروني',
      value: 'marwanhub.eg@gmail.com',
      link: 'mailto:marwanhub.eg@gmail.com'
    },
    {
      icon: '🕘',
      title: 'ساعات العمل',
      value: 'السبت – الخميس | 9 صباحًا – 5 مساءً'
    },
    {
      icon: '⚡',
      title: 'دعم فني',
      value: 'متاح 24/7 للعملاء'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // هنا سيتم ربط API الإرسال الفعلي
      await new Promise(resolve => setTimeout(resolve, 1000)); // محاكاة إرسال
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">لنبدأ مشروعك القادم</h1>
              <p className="hero-description">
                هل لديك فكرة؟ مشروع؟ أو تحتاج إلى استشارة تسويقية؟
                فريق Marwan Hub جاهز للتواصل معك ومساعدتك في اتخاذ الخطوة الصحيحة.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding">
          <div className="container">
            <div className="contact-grid">
              {/* Contact Information */}
              <div className="contact-info">
                <h2 className="section-title">تواصل معنا</h2>
                <p className="section-description">
                  اختر الطريقة المناسبة لك للتواصل مع فريقنا. نحن هنا للإجابة على جميع استفساراتك.
                </p>
                
                <div className="contact-methods">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="contact-method">
                      <div className="contact-icon">{info.icon}</div>
                      <div className="contact-details">
                        <h4 className="contact-title">{info.title}</h4>
                        {info.link ? (
                          <a href={info.link} className="contact-value">
                            {info.value}
                          </a>
                        ) : (
                          <p className="contact-value">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="contact-note">
                  <p>📍 العنوان: القاهرة – جمهورية مصر العربية</p>
                  <p>⏱️ وقت الاستجابة: خلال 24 ساعة كحد أقصى</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="contact-form-container">
                <h2 className="section-title">أرسل رسالتك</h2>
                
                {submitStatus === 'success' && (
                  <div className="alert alert-success">
                    تم إرسال رسالتك بنجاح! سيتواصل معك فريقنا خلال 24 ساعة.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="alert alert-error">
                    حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر الهاتف.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-group">
                    <label htmlFor="name">الاسم بالكامل *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="أدخل اسمك"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">البريد الإلكتروني *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@email.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">رقم الهاتف</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject">موضوع الرسالة *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="موضوع الرسالة"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">تفاصيل المشروع أو الاستفسار *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      placeholder="أخبرنا المزيد عن مشروعك أو استفسارك..."
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جاري الإرسال...' : 'تواصل معنا الآن'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
