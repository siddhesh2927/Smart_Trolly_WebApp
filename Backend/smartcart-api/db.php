<?php
$servername = "localhost";
$username = "root";
$password = ""; 
$database = "smartcart_db"; // your database name

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Database connection failed: " . $conn->connect_error]));
}
?>
