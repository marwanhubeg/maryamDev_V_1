import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الخدمات', path: '/services' },
    { name: 'من نحن', path: '/about' },
    { name: 'الأعمال', path: '/portfolio' },
    { name: 'العملاء', path: '/clients' },
    { name: 'المدونة', path: '/blog' },
    { name: 'تواصل معنا', path: '/contact' }
  ];

  const services = [
    { name: 'التسويق الرقمي', path: '/services#digital-marketing' },
    { name: 'تصميم الجرافيك', path: '/services#graphic-design' },
    { name: 'تطوير المواقع', path: '/services#web-development' },
    { name: 'تحسين محركات البحث', path: '/services#seo' },
    { name: 'التسويق العقاري', path: '/services#real-estate' },
    { name: 'الاستشارات التسويقية', path: '/services#consulting' }
  ];

  const contactInfo = {
    phone: '01277831988',
    whatsapp: '+201277831988',
    email: 'marwanhub.eg@gmail.com',
    address: 'القاهرة – جمهورية مصر العربية',
    hours: 'السبت – الخميس | 9 صباحًا – 5 مساءً'
  };

  const socialLinks = [
    { name: 'Facebook', icon: '📘', url: '#' },
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'LinkedIn', icon: '💼', url: '#' },
    { name: 'Instagram', icon: '📸', url: '#' },
    { name: 'YouTube', icon: '📺', url: '#' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Main Footer */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-col company-info">
              <div className="footer-logo">
                <Link to="/" className="logo-link">
                  <img 
                    src="/assets/images/logos/logo-white.svg" 
                    alt="Marwan Hub Logo" 
                    className="logo-img"
                  />
                  <span className="logo-text">Marwan Hub</span>
                </Link>
              </div>
              <p className="company-description">
                Marwan Hub وكالة تسويق رقمي وتطوير مواقع في مصر تقدم حلولًا متكاملة للشركات الناشئة والمتوسطة لبناء حضور رقمي قوي وتحقيق نمو مستدام.
              </p>
              <div className="footer-social">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url} 
                    className="social-link"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="social-icon">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h3 className="footer-title">روابط سريعة</h3>
              <ul className="footer-links">
                {quickLinks.map((link) => (
                  <li key={link.path} className="footer-link-item">
                    <Link to={link.path} className="footer-link">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="footer-col">
              <h3 className="footer-title">خدماتنا</h3>
              <ul className="footer-links">
                {services.map((service) => (
                  <li key={service.path} className="footer-link-item">
                    <Link to={service.path} className="footer-link">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-col">
              <h3 className="footer-title">تواصل معنا</h3>
              <ul className="contact-info">
                <li className="contact-item">
                  <span className="contact-icon">📞</span>
                  <a href={`tel:${contactInfo.phone}`} className="contact-link">
                    {contactInfo.phone}
                  </a>
                </li>
                <li className="contact-item">
                  <span className="contact-icon">📱</span>
                  <a href={`https://wa.me/${contactInfo.whatsapp}`} className="contact-link">
                    {contactInfo.whatsapp}
                  </a>
                </li>
                <li className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <a href={`mailto:${contactInfo.email}`} className="contact-link">
                    {contactInfo.email}
                  </a>
                </li>
                <li className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span className="contact-text">{contactInfo.address}</span>
                </li>
                <li className="contact-item">
                  <span className="contact-icon">🕘</span>
                  <span className="contact-text">{contactInfo.hours}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© {currentYear} Marwan Hub. جميع الحقوق محفوظة.</p>
            </div>
            <div className="footer-legal">
              <Link to="/privacy" className="legal-link">
                سياسة الخصوصية
              </Link>
              <Link to="/terms" className="legal-link">
                الشروط والأحكام
              </Link>
              <Link to="/sitemap" className="legal-link">
                خريطة الموقع
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
