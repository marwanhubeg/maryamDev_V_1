import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الخدمات', path: '/services' },
    { name: 'من نحن', path: '/about' },
    { name: 'الأعمال', path: '/portfolio' },
    { name: 'العملاء', path: '/clients' },
    { name: 'المدونة', path: '/blog' },
    { name: 'تواصل معنا', path: '/contact' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <span className="phone">📞 01277831988</span>
              <span className="email">✉️ marwanhub.eg@gmail.com</span>
              <span className="hours">🕘 9 ص - 5 م</span>
            </div>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <span>📘</span>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <span>📸</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="main-header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <Link to="/" className="logo-link">
                <img 
                  src="/assets/images/logos/logo.svg" 
                  alt="Marwan Hub Logo" 
                  className="logo-img"
                />
                <span className="logo-text">Marwan Hub</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <ul className="nav-list">
                {navigation.map((item) => (
                  <li key={item.path} className="nav-item">
                    <Link 
                      to={item.path} 
                      className="nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button */}
            <div className="header-actions">
              <Link to="/contact" className="btn-primary btn-sm">
                ابدأ مشروعك
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="menu-icon">
                {isMenuOpen ? '✕' : '☰'}
              </span>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
            <div className="mobile-nav-content">
              <ul className="mobile-nav-list">
                {navigation.map((item) => (
                  <li key={item.path} className="mobile-nav-item">
                    <Link 
                      to={item.path} 
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mobile-actions">
                <Link 
                  to="/contact" 
                  className="btn-primary btn-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ابدأ مشروعك الآن
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container">
          <div className="announcement-content">
            <span className="announcement-text">
              🎉 احصل على استشارة تسويقية مجانية عند تواصلك معنا لأول مرة
            </span>
            <Link to="/contact" className="announcement-link">
              احصل على الاستشارة →
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
