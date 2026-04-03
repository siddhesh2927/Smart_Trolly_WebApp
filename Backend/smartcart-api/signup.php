<?php

header("Access-Control-Allow-Origin: *"); // Allow for all origins
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db.php'; // connect to your my sql database 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = password_hash($data->password, PASSWORD_BCRYPT);
$role = $data->role;

$stmt = $conn->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $password, $role);
$response = [];

if ($stmt->execute()) {
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
    $response['message'] = $stmt->error;
}

echo json_encode($response);
