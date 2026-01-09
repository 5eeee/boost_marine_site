// Основные скрипты для сайта Boost Marine
document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== ПЕРЕМЕННЫЕ ====================
  const body = document.body;
  const header = document.querySelector('.header');
  const heroSection = document.querySelector('.hero');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-menu');
  const menuClose = document.querySelector('.js-menu-close');
  const contactBtn = document.querySelector('.js-btn-contact');
  const mobileContactBtn = document.querySelector('.js-mobile-contact');
  const contactFormWindow = document.querySelector('.contact-form-window');
  const formCloseBtn = document.querySelector('.js-form-window-close');
  const footerCallbackBtn = document.querySelector('.js-footer-callback');
  
  // ==================== МОБИЛЬНОЕ МЕНЮ ====================
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mainMenu.classList.add('active');
      body.style.overflow = 'hidden';
      
      // Анимация кнопки
      this.classList.add('active');
    });
  }
  
  // Закрытие меню
  if (menuClose) {
    menuClose.addEventListener('click', function() {
      mainMenu.classList.remove('active');
      body.style.overflow = '';
      if (menuToggle) menuToggle.classList.remove('active');
    });
  }
  
  // Закрытие меню по клику на ссылку
  const menuLinks = document.querySelectorAll('.menu-link');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      mainMenu.classList.remove('active');
      body.style.overflow = '';
      if (menuToggle) menuToggle.classList.remove('active');
    });
  });
  
  // Закрытие меню при клике вне его
  document.addEventListener('click', function(e) {
    if (mainMenu && mainMenu.classList.contains('active') && 
        !mainMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      mainMenu.classList.remove('active');
      body.style.overflow = '';
      if (menuToggle) menuToggle.classList.remove('active');
    }
  });
  
  // ==================== ФОРМА СВЯЗИ С МЕНЕДЖЕРОМ ====================
  function toggleContactForm() {
    const managerContact = document.querySelector('.manager-contact');
    if (managerContact) {
      managerContact.classList.toggle('active');
      
      // Если форма открывается, добавляем класс к кнопке
      if (managerContact.classList.contains('active')) {
        if (contactBtn) contactBtn.classList.add('active');
      } else {
        if (contactBtn) contactBtn.classList.remove('active');
      }
    }
  }
  
  if (contactBtn && contactFormWindow) {
    contactBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleContactForm();
    });
  }
  
  // Мобильная кнопка "Связь" (добавлено по ТЗ)
  if (mobileContactBtn) {
    mobileContactBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Если на мобилке, показываем форму связи
      if (window.innerWidth <= 1023) {
        toggleContactForm();
      }
    });
  }
  
  // Закрытие формы
  if (formCloseBtn) {
    formCloseBtn.addEventListener('click', function() {
      const managerContact = document.querySelector('.manager-contact');
      if (managerContact) {
        managerContact.classList.remove('active');
        if (contactBtn) contactBtn.classList.remove('active');
      }
    });
  }
  
  // Закрытие формы при клике вне
  document.addEventListener('click', function(e) {
    const managerContact = document.querySelector('.manager-contact');
    const contactBtn = document.querySelector('.js-btn-contact');
    const mobileContactBtn = document.querySelector('.js-mobile-contact');
    
    if (managerContact && managerContact.classList.contains('active') && 
        !contactBtn?.contains(e.target) && 
        !mobileContactBtn?.contains(e.target) && 
        !contactFormWindow.contains(e.target)) {
      managerContact.classList.remove('active');
      if (contactBtn) contactBtn.classList.remove('active');
    }
  });
  
  // Обработка формы обратного звонка
  const callbackForm = document.querySelector('.callback-form');
  if (callbackForm) {
    callbackForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      
      // Здесь должен быть AJAX запрос на сервер
      console.log('Данные формы:', data);
      
      // Показываем уведомление
      showNotification('Ваша заявка принята! Мы свяжемся с вами в ближайшее время.', 'success');
      
      // Закрываем форму
      const managerContact = document.querySelector('.manager-contact');
      if (managerContact) {
        managerContact.classList.remove('active');
        if (contactBtn) contactBtn.classList.remove('active');
      }
      
      // Очищаем форму
      this.reset();
    });
  }
  
  // ==================== МАСКА ДЛЯ ТЕЛЕФОНА ====================
  function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('.phone-mask');
    
    phoneInputs.forEach(input => {
      input.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        
        if (value.length > 0) {
          if (value[0] === '7' || value[0] === '8') {
            // Российский формат
            if (value.length <= 1) value = '+7';
            if (value.length <= 4) value = value.substring(0, 4);
            if (value.length <= 7) value = value.substring(0, 7);
            if (value.length <= 9) value = value.substring(0, 9);
            if (value.length <= 11) value = value.substring(0, 11);
            
            let formattedValue = '+7';
            if (value.length > 1) {
              formattedValue += ' (' + value.substring(1, 4);
            }
            if (value.length > 4) {
              formattedValue += ') ' + value.substring(4, 7);
            }
            if (value.length > 7) {
              formattedValue += '-' + value.substring(7, 9);
            }
            if (value.length > 9) {
              formattedValue += '-' + value.substring(9, 11);
            }
            
            this.value = formattedValue;
          } else {
            // Международный формат
            let formattedValue = '+' + value.substring(0, 15);
            this.value = formattedValue;
          }
        }
      });
      
      // Добавляем placeholder при фокусе
      input.addEventListener('focus', function() {
        if (!this.value) {
          this.placeholder = '+7 (___) ___-__-__';
        }
      });
      
      input.addEventListener('blur', function() {
        if (this.value === '+7 (') {
          this.value = '';
          this.placeholder = 'Телефон';
        }
      });
    });
  }
  
  initPhoneMask();
  
  // ==================== ПЛАВНЫЙ СКРОЛЛ ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Закрываем меню, если оно открыто
        if (mainMenu && mainMenu.classList.contains('active')) {
          mainMenu.classList.remove('active');
          body.style.overflow = '';
          if (menuToggle) menuToggle.classList.remove('active');
        }
        
        // Закрываем форму контактов, если открыта
        const managerContact = document.querySelector('.manager-contact');
        if (managerContact && managerContact.classList.contains('active')) {
          managerContact.classList.remove('active');
          if (contactBtn) contactBtn.classList.remove('active');
        }
        
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ==================== ИНИЦИАЛИЗАЦИЯ СЛАЙДЕРА ====================
  function initWorksSlider() {
    const worksSliderEl = document.querySelector('.works-slider');
    if (worksSliderEl) {
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
        },
        on: {
          init: function() {
            console.log('Слайдер работ инициализирован');
          }
        }
      });
      
      return worksSlider;
    }
    return null;
  }
  
  const worksSlider = initWorksSlider();
  
  // ==================== АНИМАЦИЯ ПРИ СКРОЛЛЕ ====================
  function initScrollAnimations() {
    const fadeElements = document.querySelectorAll(
      '.service-card-grid, .team-member, .section-header, ' +
      '.onsite__content, .contact-item, .equipment-category, ' +
      '.onsite-feature, .work-slide'
    );
    
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
    
    console.log('Анимации при скролле инициализированы');
  }
  
  initScrollAnimations();
  
  // ==================== ИЗМЕНЕНИЕ ШАПКИ ПРИ СКРОЛЛЕ ====================
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
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
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
  }
  
  window.addEventListener('scroll', updateHeader);
  updateHeader();
  
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
  
  // ==================== АДАПТИВНОСТЬ HERO ====================
  function handleHeroAdaptive() {
    const heroLists = document.querySelectorAll('.hero__list--desktop');
    const heroBtns = document.querySelectorAll('.hero__btn--mobile');
    const heroTitleLinks = document.querySelectorAll('.hero__title-link');
    const heroTitlesMobile = document.querySelectorAll('.hero__title--mobile');
    const heroTitlesDesktop = document.querySelectorAll('.hero__title--desktop');
    
    if (window.innerWidth <= 1023) {
      // На планшетах и мобильных показываем кнопки
      heroLists.forEach(list => {
        list.style.display = 'none';
      });
      heroBtns.forEach(btn => {
        btn.style.display = 'flex';
      });
      heroTitleLinks.forEach(link => {
        link.style.display = 'none';
      });
      heroTitlesMobile.forEach(title => {
        title.style.display = 'flex';
      });
      heroTitlesDesktop.forEach(title => {
        title.style.display = 'none';
      });
    } else {
      // На десктопе показываем списки
      heroLists.forEach(list => {
        list.style.display = 'block';
      });
      heroBtns.forEach(btn => {
        btn.style.display = 'none';
      });
      heroTitleLinks.forEach(link => {
        link.style.display = 'block';
      });
      heroTitlesMobile.forEach(title => {
        title.style.display = 'none';
      });
      heroTitlesDesktop.forEach(title => {
        title.style.display = 'flex';
      });
    }
  }
  
  // Инициализация и обработка изменения размера окна
  handleHeroAdaptive();
  window.addEventListener('resize', handleHeroAdaptive);
  
  // ==================== ВЫСОТА HERO ====================
  function setHeroHeight() {
    const hero = document.querySelector('.hero');
    if (hero) {
      if (window.innerWidth > 767) {
        hero.style.height = window.innerHeight + 'px';
      } else {
        hero.style.height = '100vh';
        hero.style.minHeight = '600px';
      }
    }
  }
  
  setHeroHeight();
  window.addEventListener('resize', setHeroHeight);
  
  // ==================== ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЙ ====================
  function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.style.opacity = '0';
      img.style.transition = 'opacity 0.5s ease';
      
      img.onload = function() {
        this.style.opacity = '1';
      };
      
      if (img.complete) {
        img.style.opacity = '1';
      }
    });
  }
  
  preloadImages();
  
  // ==================== УВЕДОМЛЕНИЯ ====================
  function showNotification(message, type = 'success') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Добавляем стили
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 25px;
      background: ${type === 'success' ? '#4CAF50' : '#f44336'};
      color: white;
      border-radius: var(--border-radius);
      box-shadow: 0 5px 15px rgba(0,0,0,0.3);
      z-index: 10000;
      transform: translateX(120%);
      transition: transform 0.3s ease;
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
      font-size: 0.95rem;
      max-width: 300px;
      text-align: center;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Автоматическое скрытие через 4 секунды
    setTimeout(() => {
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }
  
  // ==================== КЛИКАБЕЛЬНОСТЬ ЗАГОЛОВКОВ HERO ====================
  const heroTitleLinks = document.querySelectorAll('.hero__title-link');
  heroTitleLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ==================== КНОПКА ОБРАТНОГО ЗВОНКА В ФУТЕРЕ ====================
  if (footerCallbackBtn) {
    footerCallbackBtn.addEventListener('click', function() {
      const managerContact = document.querySelector('.manager-contact');
      if (managerContact) {
        managerContact.classList.add('active');
        if (contactBtn) contactBtn.classList.add('active');
        
        // Прокрутка к шапке
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
  }
  
  // ==================== АДАПТИВНОСТЬ КОМАНДЫ ====================
  function updateTeamGrid() {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return;
    
    const teamMembers = teamGrid.querySelectorAll('.team-member');
    
    if (window.innerWidth >= 1024) {
      // Десктоп - 6 колонок
      teamGrid.style.gridTemplateColumns = 'repeat(6, 1fr)';
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      // Планшет - 3 колонки
      teamGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    } else {
      // Мобилка - 2 колонки
      teamGrid.style.gridTemplateColumns = 'repeat(2, 1fr)';
    }
  }
  
  window.addEventListener('resize', updateTeamGrid);
  window.addEventListener('load', updateTeamGrid);
  
  // ==================== АДМИН-ПАНЕЛЬ ====================
  
  // Проверяем, есть ли параметр admin в URL
  const urlParams = new URLSearchParams(window.location.search);
  const isAdminMode = urlParams.get('admin') === 'true';
  
  if (isAdminMode) {
    // Показываем форму входа в админку
    setTimeout(() => {
      const adminLogin = document.querySelector('#admin-login');
      if (adminLogin) {
        adminLogin.style.display = 'flex';
        
        // Закрытие формы
        const closeBtn = adminLogin.querySelector('.admin-login__close');
        const overlay = adminLogin.querySelector('.admin-login__overlay');
        
        const closeAdminLogin = () => {
          adminLogin.style.display = 'none';
        };
        
        if (closeBtn) closeBtn.addEventListener('click', closeAdminLogin);
        if (overlay) overlay.addEventListener('click', closeAdminLogin);
        
        // Обработка формы входа
        const loginForm = adminLogin.querySelector('#login-form');
        if (loginForm) {
          loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = this.querySelector('#username').value;
            const password = this.querySelector('#password').value;
            
            // Простая проверка (в реальном проекте нужна проверка на сервере)
            if (username === 'admin' && password === 'admin123') {
              closeAdminLogin();
              showAdminPanel();
            } else {
              showNotification('Неверный логин или пароль!', 'error');
            }
          });
        }
      }
    }, 1000);
  }
  
  // Функция для показа админ-панели
  function showAdminPanel() {
    // Скрываем основное содержимое сайта
    document.querySelectorAll('section, .header, .footer, .telegram-widget').forEach(el => {
      el.style.display = 'none';
    });
    
    // Показываем админ-панель
    const adminPanel = document.querySelector('#admin-panel');
    if (adminPanel) {
      adminPanel.style.display = 'flex';
      
      // Инициализация вкладок
      initAdminTabs();
      
      // Кнопка выхода
      const logoutBtn = adminPanel.querySelector('.admin-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
          // Скрываем админ-панель
          adminPanel.style.display = 'none';
          
          // Показываем основное содержимое
          document.querySelectorAll('section, .header, .footer, .telegram-widget').forEach(el => {
            el.style.display = '';
          });
          
          // Обновляем страницу
          window.location.href = window.location.pathname;
        });
      }
    }
  }
  
  // Инициализация вкладок админ-панели
  function initAdminTabs() {
    const navItems = document.querySelectorAll('.admin-nav__item');
    const tabs = document.querySelectorAll('.admin-tab');
    
    navItems.forEach(item => {
      item.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Убираем активный класс у всех элементов навигации
        navItems.forEach(navItem => {
          navItem.classList.remove('active');
        });
        
        // Добавляем активный класс текущему элементу
        this.classList.add('active');
        
        // Скрываем все вкладки
        tabs.forEach(tab => {
          tab.classList.remove('active');
        });
        
        // Показываем выбранную вкладку
        const activeTab = document.querySelector(`#tab-${tabId}`);
        if (activeTab) {
          activeTab.classList.add('active');
        }
      });
    });
  }
  
  // ==================== ДОПОЛНИТЕЛЬНЫЕ УЛУЧШЕНИЯ ====================
  
  // Предотвращение множественного быстрого нажатия на ссылки
  const allLinks = document.querySelectorAll('a[href]');
  allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#' || this.getAttribute('href') === '#!') return;
      
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
  
  // ==================== ИНИЦИАЛИЗАЦИЯ ВСЕХ КАРТОЧЕК С АНИМАЦИЕЙ ====================
  setTimeout(() => {
    const serviceCards = document.querySelectorAll('.service-card-grid');
    const teamMembers = document.querySelectorAll('.team-member');
    const equipmentCategories = document.querySelectorAll('.equipment-category');
    
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
    
    equipmentCategories.forEach((category, index) => {
      setTimeout(() => {
        category.classList.add('visible');
      }, index * 100);
    });
  }, 300);
  
  // ==================== ОБРАБОТЧИКИ ДЛЯ МЕНЮ ====================
  // Центрирование дополнительного меню при изменении размера окна
  function centerAdditionalMenu() {
    const additionalMenu = document.querySelector('.additional-menu');
    if (additionalMenu && window.innerWidth > 1023) {
      const headerContent = document.querySelector('.header-content');
      const logo = document.querySelector('.header .logo');
      const headerRight = document.querySelector('.header-right');
      
      if (headerContent && logo && headerRight) {
        const logoWidth = logo.offsetWidth;
        const rightWidth = headerRight.offsetWidth;
        const totalWidth = headerContent.offsetWidth;
        
        // Центрируем меню между лого и правой частью
        additionalMenu.style.left = `calc(50% + ${(rightWidth - logoWidth) / 4}px)`;
      }
    }
  }
  
  window.addEventListener('resize', centerAdditionalMenu);
  window.addEventListener('load', centerAdditionalMenu);
  
  // ==================== ТЕСТ ФУНКЦИОНАЛЬНОСТИ ====================
  console.log('Boost Marine website loaded successfully!');
  console.log('Для входа в админ-панель добавьте ?admin=true к URL');
  console.log('Команда: 6 членов команды загружены');
  console.log('Слайдер работ:', worksSlider ? 'инициализирован' : 'не найден');
  
  // ==================== ОБРАБОТКА ИЗОБРАЖЕНИЙ КОМАНДЫ ====================
  // Замена заглушек на реальные фото при загрузке
  const teamImages = document.querySelectorAll('.team-member__photo img');
  teamImages.forEach((img, index) => {
    img.onerror = function() {
      // Если изображение не загрузилось, ставим заглушку
      this.src = 'assets/Фото будет позже.png';
      this.alt = 'Фото члена команды';
    };
  });
  
  // ==================== ПРОГРЕСС-БАР СКРОЛЛА ====================
  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--accent-color);
      z-index: 1001;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + "%";
    });
  }
  
  initScrollProgress();
  
  // ==================== АНИМАЦИЯ ПРИ НАВЕДЕНИИ НА КАРТОЧКИ ====================
  const serviceCards = document.querySelectorAll('.service-card-grid');
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // ==================== ПОДСВЕТКА АКТИВНОГО РАЗДЕЛА ====================
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.additional-menu .item, .menu-link');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.5,
      rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  highlightActiveSection();
  
  // ==================== КОНТРОЛЬ ЗАГРУЗКИ ====================
  window.addEventListener('load', function() {
    console.log('Сайт полностью загружен');
    
    // Показываем кнопку "Наверх" если нужно
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add('visible');
    }
    
    // Обновляем сетку команды
    updateTeamGrid();
    
    // Центрируем меню
    centerAdditionalMenu();
    
    // Показываем уведомление о готовности
    setTimeout(() => {
      console.log('Все скрипты инициализированы');
    }, 500);
  });
});