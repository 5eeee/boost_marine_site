// Скрипт для админ-панели
document.addEventListener('DOMContentLoaded', function() {
  
  // ==================== ИНИЦИАЛИЗАЦИЯ ====================
  const adminNavItems = document.querySelectorAll('.admin-nav__item');
  const adminTabs = document.querySelectorAll('.admin-tab');
  const currentDateElement = document.getElementById('currentDate');
  const adminLogoutBtn = document.getElementById('adminLogout');
  
  // Установка текущей даты
  if (currentDateElement) {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    currentDateElement.textContent = now.toLocaleDateString('ru-RU', options);
  }
  
  // ==================== УПРАВЛЕНИЕ ВКЛАДКАМИ ====================
  function switchTab(tabId) {
    // Скрываем все вкладки
    adminTabs.forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Показываем выбранную вкладку
    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) {
      activeTab.classList.add('active');
    }
    
    // Обновляем активный элемент меню
    adminNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      }
    });
    
    // Сохраняем выбранную вкладку в sessionStorage
    sessionStorage.setItem('adminActiveTab', tabId);
  }
  
  // Обработка кликов по пунктам меню
  adminNavItems.forEach(item => {
    const link = item.querySelector('.admin-nav__link');
    if (link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const tabId = item.getAttribute('data-tab');
        switchTab(tabId);
      });
    }
  });
  
  // Восстановление последней активной вкладки
  const savedTab = sessionStorage.getItem('adminActiveTab');
  if (savedTab) {
    switchTab(savedTab);
  }
  
  // ==================== УПРАВЛЕНИЕ МОДАЛЬНЫМИ ОКНАМИ ====================
  const modals = document.querySelectorAll('.modal');
  const modalCloseBtns = document.querySelectorAll('.modal__close, .modal__close-btn, .modal__overlay');
  
  // Функция открытия модального окна
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  // Функция закрытия модального окна
  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  // Закрытие модальных окон
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const modal = this.closest('.modal');
      if (modal) {
        closeModal(modal.id);
      }
    });
  });
  
  // Закрытие по ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          closeModal(modal.id);
        }
      });
    }
  });
  
  // Кнопки открытия модальных окон
  const addWorkBtn = document.getElementById('addWorkBtn');
  const addFirstWorkBtn = document.getElementById('addFirstWorkBtn');
  const addServiceBtn = document.getElementById('addServiceBtn');
  const addTeamMemberBtn = document.getElementById('addTeamMemberBtn');
  const addEquipmentBtn = document.getElementById('addEquipmentBtn');
  
  if (addWorkBtn) {
    addWorkBtn.addEventListener('click', () => openModal('addWorkModal'));
  }
  
  if (addFirstWorkBtn) {
    addFirstWorkBtn.addEventListener('click', () => openModal('addWorkModal'));
  }
  
  if (addServiceBtn) {
    addServiceBtn.addEventListener('click', () => openModal('addServiceModal'));
  }
  
  if (addTeamMemberBtn) {
    addTeamMemberBtn.addEventListener('click', () => openModal('addTeamMemberModal'));
  }
  
  if (addEquipmentBtn) {
    addEquipmentBtn.addEventListener('click', () => openModal('addEquipmentModal'));
  }
  
  // ==================== ОБРАБОТКА ФОРМ ====================
  
  // Форма добавления работы
  const addWorkForm = document.getElementById('addWorkForm');
  if (addWorkForm) {
    addWorkForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Получение данных формы
      const formData = new FormData(this);
      const workData = Object.fromEntries(formData.entries());
      
      // Здесь должна быть отправка данных на сервер
      console.log('Данные работы:', workData);
      
      // Показать уведомление об успехе
      showNotification('Работа успешно добавлена!', 'success');
      
      // Закрыть модальное окно
      closeModal('addWorkModal');
      
      // Очистить форму
      this.reset();
    });
  }
  
  // Загрузка изображения для работы
  const workImageUpload = document.getElementById('workImageUpload');
  const workImageInput = document.getElementById('workImage');
  
  if (workImageUpload && workImageInput) {
    workImageUpload.addEventListener('click', () => workImageInput.click());
    
    workImageInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const fileName = this.files[0].name;
        workImageUpload.innerHTML = `
          <i class="fas fa-check-circle" style="color: #27ae60;"></i>
          <p>Файл выбран: ${fileName}</p>
          <p class="file-upload-hint">Кликните для изменения</p>
        `;
      }
    });
    
    // Drag and drop
    workImageUpload.addEventListener('dragover', (e) => {
      e.preventDefault();
      workImageUpload.style.borderColor = '#3498db';
      workImageUpload.style.background = 'rgba(52, 152, 219, 0.05)';
    });
    
    workImageUpload.addEventListener('dragleave', () => {
      workImageUpload.style.borderColor = '';
      workImageUpload.style.background = '';
    });
    
    workImageUpload.addEventListener('drop', (e) => {
      e.preventDefault();
      workImageUpload.style.borderColor = '';
      workImageUpload.style.background = '';
      
      if (e.dataTransfer.files.length) {
        workImageInput.files = e.dataTransfer.files;
        const fileName = e.dataTransfer.files[0].name;
        workImageUpload.innerHTML = `
          <i class="fas fa-check-circle" style="color: #27ae60;"></i>
          <p>Файл выбран: ${fileName}</p>
          <p class="file-upload-hint">Кликните для изменения</p>
        `;
      }
    });
  }
  
  // ==================== УПРАВЛЕНИЕ ЗАЯВКАМИ ====================
  const requestFilterBtns = document.querySelectorAll('.filter-btn[data-filter]');
  
  requestFilterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Обновляем активную кнопку фильтра
      requestFilterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Здесь должна быть фильтрация заявок
      console.log('Фильтр заявок:', filter);
      
      // В реальном проекте здесь AJAX запрос или фильтрация DOM
    });
  });
  
  // ==================== УПРАВЛЕНИЕ НАСТРОЙКАМИ ====================
  const settingsTabBtns = document.querySelectorAll('.settings-tab-btn');
  const settingsTabs = document.querySelectorAll('.settings-tab');
  
  settingsTabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      
      // Обновляем активную кнопку
      settingsTabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Показываем выбранную вкладку
      settingsTabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.id === `settings-${tabId}`) {
          tab.classList.add('active');
        }
      });
    });
  });
  
  // Загрузка изображений для настроек
  const changeLogoBtn = document.getElementById('changeLogoBtn');
  const logoInput = document.getElementById('siteLogo');
  const logoPreview = document.getElementById('logoPreview');
  
  const changeFaviconBtn = document.getElementById('changeFaviconBtn');
  const faviconInput = document.getElementById('siteFavicon');
  const faviconPreview = document.getElementById('faviconPreview');
  
  if (changeLogoBtn && logoInput) {
    changeLogoBtn.addEventListener('click', () => logoInput.click());
    
    logoInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          logoPreview.src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }
  
  if (changeFaviconBtn && faviconInput) {
    changeFaviconBtn.addEventListener('click', () => faviconInput.click());
    
    faviconInput.addEventListener('change', function() {
      if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
          faviconPreview.src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
      }
    });
  }
  
  // ==================== УВЕДОМЛЕНИЯ ====================
  function showNotification(message, type = 'success') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `admin-notification admin-notification--${type}`;
    notification.innerHTML = `
      <div class="admin-notification__content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
      </div>
      <button class="admin-notification__close">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    // Добавляем стили
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 30px;
      background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
      color: white;
      padding: 15px 20px;
      border-radius: var(--admin-radius);
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 15px;
      min-width: 300px;
      max-width: 400px;
      transform: translateX(120%);
      transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Закрытие уведомления
    const closeBtn = notification.querySelector('.admin-notification__close');
    closeBtn.addEventListener('click', () => {
      notification.style.transform = 'translateX(120%)';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    });
    
    // Автоматическое скрытие через 4 секунды
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 4000);
  }
  
  // ==================== ВЫХОД ИЗ АДМИН-ПАНЕЛИ ====================
  if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', function() {
      if (confirm('Вы уверены, что хотите выйти из админ-панели?')) {
        // Здесь должна быть отправка запроса на сервер для выхода
        // Временный редирект
        window.location.href = '../index.html?admin=true';
      }
    });
  }
  
  // ==================== БЫСТРЫЕ ДЕЙСТВИЯ ====================
  const quickActionBtns = document.querySelectorAll('.quick-action-btn');
  
  quickActionBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const action = this.getAttribute('data-action');
      
      switch(action) {
        case 'add-work':
          openModal('addWorkModal');
          switchTab('works');
          break;
        case 'add-service':
          openModal('addServiceModal');
          switchTab('services');
          break;
        case 'add-team':
          openModal('addTeamMemberModal');
          switchTab('team');
          break;
        case 'view-stats':
          showNotification('Статистика доступна в расширенной версии', 'info');
          break;
      }
    });
  });
  
  // ==================== ИНИЦИАЛИЗАЦИЯ ПОИСКА ====================
  const worksSearch = document.getElementById('worksSearch');
  if (worksSearch) {
    worksSearch.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      console.log('Поиск работ:', searchTerm);
      // В реальном проекте здесь фильтрация или AJAX запрос
    });
  }
  
  // ==================== ЗАГРУЗКА ДАННЫХ ====================
  function loadInitialData() {
    // Здесь будут загружаться данные с сервера
    console.log('Загрузка данных админ-панели...');
    
    // Имитация загрузки
    setTimeout(() => {
      // Убираем состояние "пусто" если нужно
      const worksEmpty = document.querySelector('.works-empty');
      if (worksEmpty) {
        // worksEmpty.style.display = 'none';
      }
    }, 1000);
  }
  
  // Загрузка данных при старте
  loadInitialData();
  
  // ==================== КОНТРОЛЬ ЗАГРУЗКИ ====================
  window.addEventListener('load', function() {
    console.log('Админ-панель загружена');
    
    // Показать приветственное уведомление
    setTimeout(() => {
      showNotification('Добро пожаловать в админ-панель Boost Marine!', 'success');
    }, 500);
  });
  
});