// Основные скрипты для сайта Boost Marine с обновлённой логикой

document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== МЕНЮ ДЛЯ МОБИЛЬНЫХ ====================
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;
  let menuOverlay = document.querySelector('.menu-overlay');
  
  // Создаем оверлей, если его нет
  if (!menuOverlay) {
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);
  }
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      nav.classList.toggle('active');
      menuOverlay.classList.toggle('active');
      body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
      });
    });
    
    // Закрытие меню при клике на оверлей
    menuOverlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      nav.classList.remove('active');
      this.classList.remove('active');
      body.style.overflow = '';
    });
    
    // Закрытие меню при клике вне меню
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
      }
    });
  }
  
  // ==================== ПЛАВНЫЙ СКРОЛЛ И ПОДСВЕТКА ====================
  // Десктопные ссылки в HERO
  const heroLinks = document.querySelectorAll('.hero__link');
  
  heroLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      scrollToTarget(targetId, true);
    });
  });
  
  // Мобильные кнопки в HERO
  const heroBtns = document.querySelectorAll('.hero__btn');
  
  heroBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      scrollToTarget(targetId, false);
    });
  });
  
  // Функция плавного скролла с подсветкой
  function scrollToTarget(targetId, shouldHighlight = true) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      // Закрываем меню, если оно открыто
      if (menuToggle && nav.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.style.overflow = '';
      }
      
      // Находим конкретную карточку внутри слайдера
      let cardToHighlight = null;
      if (targetId === '#yacht-slider' || targetId === '#jet-slider') {
        // Скроллим к самому слайдеру
        cardToHighlight = targetElement;
      } else {
        // Ищем карточку с таким ID
        cardToHighlight = document.querySelector(targetId);
      }
      
      // Плавный скролл к элементу
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Подсветка элемента
      if (shouldHighlight && cardToHighlight) {
        setTimeout(() => {
          if (cardToHighlight.classList.contains('service-card')) {
            cardToHighlight.classList.add('highlight');
            
            // Убираем подсветку через 2 секунды
            setTimeout(() => {
              cardToHighlight.classList.remove('highlight');
            }, 2000);
          } else if (cardToHighlight.classList.contains('services-slider')) {
            // Для слайдера мигаем всеми карточками
            const cards = cardToHighlight.querySelectorAll('.service-card');
            cards.forEach(card => {
              card.classList.add('highlight');
            });
            
            setTimeout(() => {
              cards.forEach(card => {
                card.classList.remove('highlight');
              });
            }, 2000);
          }
        }, 500);
      }
    }
  }
  
  // ==================== ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРОВ ====================
  
  // Слайдер для услуг (яхты и катера)
  if (document.querySelector('#yacht-slider')) {
    const yachtSlider = new Swiper('#yacht-slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '#yacht-slider .swiper-button-next--services',
        prevEl: '#yacht-slider .swiper-button-prev--services',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }
  
  // Слайдер для услуг (гидроциклы)
  if (document.querySelector('#jet-slider')) {
    const jetSlider = new Swiper('#jet-slider', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '#jet-slider .swiper-button-next--services',
        prevEl: '#jet-slider .swiper-button-prev--services',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 15,
        },
        480: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 25,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }
  
  // Слайдер для работ
  if (document.querySelector('.works-slider')) {
    const worksSlider = new Swiper('.works-slider', {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        }
      }
    });
  }
  
  // ==================== АНИМАЦИЯ ПРИ СКРОЛЛЕ ====================
  const fadeElements = document.querySelectorAll('.service-card, .team-member, .section-header, .service-category, .onsite__content, .contact-item, .service-slide');
  
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
  
  // ==================== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ВСЕХ ССЫЛОК ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Пропускаем ссылки с отдельной обработкой
    if (anchor.classList.contains('hero__link') || anchor.classList.contains('hero__btn')) return;
    
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Закрываем меню, если оно открыто
        if (menuToggle && nav.classList.contains('active')) {
          menuToggle.classList.remove('active');
          nav.classList.remove('active');
          menuOverlay.classList.remove('active');
          body.style.overflow = '';
        }
        
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ==================== ИЗМЕНЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ ====================
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('.hero');
  
  function updateHeader() {
    const scrollY = window.scrollY;
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;
    
    if (scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Если прокрутили ниже hero, делаем шапку всегда видимой
    if (scrollY > heroHeight - 100) {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.borderBottom = '1px solid var(--border-color)';
    } else if (scrollY > 50) {
      // Плавное появление фона при скролле внутри hero
      const opacity = Math.min((scrollY - 50) / 50, 0.95);
      header.style.background = `rgba(10, 10, 10, ${opacity})`;
    } else {
      header.style.background = 'transparent';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
    
    // Показываем кнопку "Наверх"
    if (scrollToTopBtn) {
      if (scrollY > 500) {
        scrollToTopBtn.classList.add('visible');
      } else {
        scrollToTopBtn.classList.remove('visible');
      }
    }
    
    // Подсветка активного раздела в навигации
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateHeader);
  updateHeader(); // Инициализация при загрузке
  
  // ==================== КНОПКА "НАВЕРХ" ====================
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.setAttribute('aria-label', 'Наверх');
  document.body.appendChild(scrollToTopBtn);
  
  scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // ==================== АДАПТИВНОСТЬ ГЛАВНОГО ЭКРАНА ====================
  function setHeroHeight() {
    const hero = document.querySelector('.hero');
    if (hero && window.innerWidth > 767) {
      hero.style.height = window.innerHeight + 'px';
    } else if (hero && window.innerWidth <= 767) {
      hero.style.height = '100vh';
    }
  }
  
  // Устанавливаем высоту при загрузке и изменении размера окна
  setHeroHeight();
  window.addEventListener('resize', setHeroHeight);
  
  // ==================== ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЙ ====================
  function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      // Добавляем fade-in эффект для изображений
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      img.onload = function() {
        this.style.opacity = '1';
      };
      
      // Если изображение уже загружено
      if (img.complete) {
        img.style.opacity = '1';
      }
    });
  }
  
  preloadImages();
  
  // ==================== ПРОВЕРКА ТАЧ-УСТРОЙСТВ ====================
  function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }
  
  if (isTouchDevice()) {
    document.body.classList.add('touch-device');
  } else {
    document.body.classList.add('no-touch-device');
  }
  
  // ==================== АДАПТИВНАЯ ЛОГИКА ДЛЯ HERO ====================
  function handleHeroAdaptive() {
    const heroLists = document.querySelectorAll('.hero__list--desktop');
    const heroBtns = document.querySelectorAll('.hero__btn--mobile');
    
    if (window.innerWidth <= 1023) {
      // На планшетах и мобильных показываем кнопки, скрываем списки
      heroLists.forEach(list => {
        list.style.display = 'none';
      });
      heroBtns.forEach(btn => {
        btn.style.display = 'flex';
      });
    } else {
      // На десктопе показываем списки, скрываем кнопки
      heroLists.forEach(list => {
        list.style.display = 'block';
      });
      heroBtns.forEach(btn => {
        btn.style.display = 'none';
      });
    }
  }
  
  // Инициализация и обработка изменения размера окна
  handleHeroAdaptive();
  window.addEventListener('resize', handleHeroAdaptive);
  
  // ==================== ИНИЦИАЛИЗАЦИЯ ВСЕХ КАРТОЧЕК С АНИМАЦИЕЙ ====================
  setTimeout(() => {
    const serviceCards = document.querySelectorAll('.service-card');
    const teamMembers = document.querySelectorAll('.team-member');
    
    serviceCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible');
      }, index * 100);
    });
    
    teamMembers.forEach((member, index) => {
      setTimeout(() => {
        member.classList.add('visible');
      }, index * 150);
    });
  }, 300);
  
  console.log('Boost Marine website loaded successfully!');
  
  // ==================== ДОПОЛНИТЕЛЬНЫЕ УЛУЧШЕНИЯ ====================
  
  // Предотвращение множественного быстрого нажатия на ссылки
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      
      // Добавляем небольшую задержку для предотвращения множественных кликов
      if (this.classList.contains('clicked')) {
        e.preventDefault();
        return;
      }
      
      this.classList.add('clicked');
      setTimeout(() => {
        this.classList.remove('clicked');
      }, 1000);
    });
  });
  
  // Плавное появление всего контента при загрузке
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});