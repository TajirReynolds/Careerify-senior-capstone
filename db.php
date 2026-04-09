<?php
// Database connection using PDO.
// Fill in your DB credentials below.
$DB_HOST = '127.0.0.1';
$DB_NAME = 'job_search';
$DB_USER = 'db_user';
$DB_PASS = 'db_password';

try {
    $dsn = "mysql:host={$DB_HOST};dbname={$DB_NAME};charset=utf8mb4";
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    // In production don't echo errors. For development you can uncomment:
    // echo 'DB connection failed: ' . $e->getMessage();
    $pdo = null;
}

?>
