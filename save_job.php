<?php
session_start();
// Only employers may post
if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'employer') {
    http_response_code(403);
    echo 'Forbidden';
    exit;
}

// Basic validation
$required = ['title','company','salary','requirements','location','employment_type','experience_level','h1_visa','deadline','description','contact_email'];
foreach ($required as $f) {
    if (empty($_POST[$f])) {
        header('Location: Index.php');
        exit;
    }
}

require_once __DIR__ . '/db.php';
if (!$pdo) {
    die('Database not configured.');
}

$sql = "INSERT INTO jobs (title, company, salary, requirements, location, employment_type, experience_level, h1_visa, application_deadline, description, application_link, contact_email, created_at)
        VALUES (:title, :company, :salary, :requirements, :location, :employment_type, :experience_level, :h1_visa, :application_deadline, :description, :application_link, :contact_email, NOW())";

$stmt = $pdo->prepare($sql);
$stmt->execute([
    ':title' => $_POST['title'],
    ':company' => $_POST['company'],
    ':salary' => $_POST['salary'],
    ':requirements' => $_POST['requirements'],
    ':location' => $_POST['location'],
    ':employment_type' => $_POST['employment_type'],
    ':experience_level' => $_POST['experience_level'],
    ':h1_visa' => $_POST['h1_visa'],
    ':application_deadline' => $_POST['deadline'],
    ':description' => $_POST['description'],
    ':application_link' => $_POST['application_link'] ?? null,
    ':contact_email' => $_POST['contact_email'],
]);

// Redirect back to the static HTML page so the user returns to the search view
header('Location: Index.html');
exit;
