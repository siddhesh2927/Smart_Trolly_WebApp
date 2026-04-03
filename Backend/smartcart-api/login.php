<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Missing credentials"]);
    exit;
}

// Fetch user by username
$stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Invalid username"]);
    exit;
}

$user = $result->fetch_assoc();

// ✅ Use password_verify to check hashed password
if (!password_verify($password, $user['password'])) {
    echo json_encode(["status" => "error", "message" => "Invalid password"]);
    exit;
}

// Auth success
echo json_encode([
    "status" => "success",
    "message" => "Login successful",
    "role" => $user['role'] ?? 'user'
]);

$conn->close();
