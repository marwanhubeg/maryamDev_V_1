/**
 * خدمة إدارة الصور - مارون هاب
 * @version 1.0.0
 */

export class ImageService {
  constructor() {
    this.imageBasePath = '/assets/images';
    this.placeholderCache = {};
  }

  // الحصول على مسار الصورة
  getImagePath(type, name, usePlaceholder = true) {
    const paths = {
      logo: `${this.imageBasePath}/logos/${name}`,
      hero: `${this.imageBasePath}/heroes/${name}`,
      service: `${this.imageBasePath}/services/${name}`,
      gallery: `${this.imageBasePath}/gallery/${name}`,
      client: `${this.imageBasePath}/clients/${name}`
    };

    const path = paths[type];
    
    // التحقق من وجود الصورة
    if (!usePlaceholder) {
      return path;
    }

    // استخدام placeholders إذا لم توجد الصورة
    return this.getPlaceholderImage(type, name) || path;
  }

  // الحصول على صورة بديلة
  getPlaceholderImage(type, name) {
    if (this.placeholderCache[`${type}-${name}`]) {
      return this.placeholderCache[`${type}-${name}`];
    }

    const placeholders = {
      logo: 'https://via.placeholder.com/200x100/2563eb/ffffff?text=MARWAN+HUB',
      hero: 'https://via.placeholder.com/1920x1080/1e293b/64748b?text=Digital+Solutions',
      service: 'https://via.placeholder.com/800x600/2563eb/ffffff?text=Service',
      gallery: 'https://via.placeholder.com/1200x800/7c3aed/ffffff?text=Project',
      client: 'https://via.placeholder.com/200x100/64748b/ffffff?text=CLIENT'
    };

    const placeholder = placeholders[type];
    this.placeholderCache[`${type}-${name}`] = placeholder;
    
    return placeholder;
  }

  // تحميل صورة
  async loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => {
        console.warn(`Failed to load image: ${url}`);
        resolve(null);
      };
      img.src = url;
    });
  }

  // التحقق من وجود الصورة
  async checkImageExists(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // توليد عنصر img
  createImageElement(type, name, alt = '', classes = '', usePlaceholder = true) {
    const src = this.getImagePath(type, name, usePlaceholder);
    const img = document.createElement('img');
    
    img.src = src;
    img.alt = alt || `${type} image`;
    img.loading = 'lazy';
    
    if (classes) {
      img.className = classes;
    }

    // إضافة حدث خطأ للتحويل للبديل
    img.onerror = () => {
      if (usePlaceholder) {
        img.src = this.getPlaceholderImage(type, name);
      }
    };

    return img;
  }

  // الحصول على جميع الصور المطلوبة
  getRequiredImages() {
    return {
      logos: ['logo.png', 'logo-dark.png', 'favicon.ico'],
      heroes: ['hero-bg.jpg', 'hero-1.jpg', 'hero-2.jpg'],
      services: [
        'digital-marketing.jpg',
        'graphic-design.jpg', 
        'web-development.jpg',
        'real-estate.jpg',
        'consulting.jpg',
        'solutions.jpg'
      ],
      gallery: [
        'project-1.jpg',
        'project-2.jpg',
        'project-3.jpg',
        'project-4.jpg',
        'project-5.jpg',
        'project-6.jpg'
      ],
      clients: [
        'client-1.png',
        'client-2.png',
        'client-3.png',
        'client-4.png',
        'client-5.png',
        'client-6.png'
      ]
    };
  }

  // التحقق من الصور المفقودة
  async checkMissingImages() {
    const required = this.getRequiredImages();
    const missing = {};

    for (const [type, files] of Object.entries(required)) {
      for (const file of files) {
        const url = this.getImagePath(type, file, false);
        const exists = await this.checkImageExists(url);
        
        if (!exists) {
          if (!missing[type]) missing[type] = [];
          missing[type].push(file);
        }
      }
    }

    return missing;
  }
}

// تصدير نسخة مفردة
export const imageService = new ImageService();
export default imageService;
