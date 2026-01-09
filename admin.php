<?php
// admin/auth.php - Обработка авторизации в админ-панель

session_start();

// Конфигурация базы данных (в реальном проекте вынесите в отдельный файл)
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'boostmarine_db');

// Проверка метода запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../index.html');
    exit();
}

// Получение данных из формы
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Временная простая проверка (в реальном проекте используйте базу данных и хеширование паролей)
$valid_username = 'admin';
$valid_password_hash = password_hash('admin123', PASSWORD_DEFAULT);

// Проверка учетных данных
if ($username === $valid_username && password_verify($password, $valid_password_hash)) {
    $_SESSION['admin_logged_in'] = true;
    $_SESSION['admin_username'] = $username;
    $_SESSION['admin_login_time'] = time();
    
    // Редирект на админ-панель
    header('Location: admin-panel.html');
    exit();
} else {
    // Ошибка авторизации
    header('Location: ../index.html?admin=true&error=1');
    exit();
}
?>