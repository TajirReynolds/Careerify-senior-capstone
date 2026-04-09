<?php
// Returns JSON list of jobs for client-side rendering.
header('Content-Type: application/json; charset=utf-8');
require_once __DIR__ . '/db.php';
if (!isset($pdo) || !$pdo) {
    echo json_encode([]);
    exit;
}
try {
    $stmt = $pdo->query('SELECT * FROM jobs ORDER BY created_at DESC');
    $jobs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($jobs);
} catch (Exception $e) {
    echo json_encode([]);
}
