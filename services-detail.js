// Скрипт для страницы услуг
document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== ПЛАВНАЯ НАВИГАЦИЯ ПО РАЗДЕЛАМ ====================
  const navLinks = document.querySelectorAll('.services-nav-link');
  const sections = document.querySelectorAll('.service-section');
  
  // Функция для обновления активной ссылки в навигации
  function updateActiveNavLink() {
    const scrollY = window.scrollY;
    const headerHeight = document.querySelector('.header').offsetHeight;
    const breadcrumbsHeight = document.querySelector('.breadcrumbs').offsetHeight;
    const offset = headerHeight + breadcrumbsHeight + 100;
    
    // Находим текущий активный раздел
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - offset;
      const sectionHeight = section.offsetHeight;
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    // Обновляем активную ссылку
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }
  
  // Плавный скролл по клику на ссылки навигации
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const header = document.querySelector('.header');
        const breadcrumbs = document.querySelector('.breadcrumbs');
        const headerHeight = header.offsetHeight;
        const breadcrumbsHeight = breadcrumbs.offsetHeight;
        const offset = headerHeight + breadcrumbsHeight + 20;
        const targetPosition = targetElement.offsetTop - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ==================== ОБРАБОТКА КНОПОК ЗАКАЗА ЗВОНКА ====================
  const sidebarCallbackBtn = document.querySelector('.js-sidebar-callback');
  const servicesCallbackBtn = document.querySelector('.js-services-callback');
  
  function showContactForm() {
    const managerContact = document.querySelector('.manager-contact');
    if (managerContact) {
      managerContact.classList.add('active');
      const contactBtn = document.querySelector('.js-btn-contact');
      if (contactBtn) contactBtn.classList.add('active');
      
      // Прокрутка к шапке
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
  
  if (sidebarCallbackBtn) {
    sidebarCallbackBtn.addEventListener('click', showContactForm);
  }
  
  if (servicesCallbackBtn) {
    servicesCallbackBtn.addEventListener('click', showContactForm);
  }
  
  // ==================== ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА ДЛЯ ИЗОБРАЖЕНИЙ (если понадобится) ====================
  function initServiceImages() {
    const serviceImages = document.querySelectorAll('.service-subcategory-image img');
    
    serviceImages.forEach(img => {
      // Добавляем lazy loading
      img.loading = 'lazy';
      
      // Заглушка для отсутствующих изображений
      img.onerror = function() {
        this.src = 'assets/Фото будет позже.png';
        this.alt = 'Иллюстрация услуги';
      };
    });
  }
  
  initServiceImages();
  
  // ==================== АНИМАЦИЯ ПРИ СКРОЛЛЕ ====================
  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.service-subcategory, .services-cta');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(el => {
      observer.observe(el);
    });
  }
  
  initScrollAnimations();
  
  // ==================== ОБРАБОТКА СОБЫТИЙ ПРОКРУТКИ ====================
  window.addEventListener('scroll', updateActiveNavLink);
  
  // Инициализация при загрузке
  updateActiveNavLink();
  
  // ==================== КОНТРОЛЬ ЗАГРУЗКИ ====================
  window.addEventListener('load', function() {
    console.log('Страница услуг загружена');
    
    // Добавляем класс для плавного появления
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 100);
  });
  
});