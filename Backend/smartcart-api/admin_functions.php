<?php
header('Access-Control-Allow-Origin: *');  // Allow all origins
header('Access-Control-Allow-Headers: Content-Type');  // Allow specific headers
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');  // Allow specific HTTP methods
require 'db.php'; // Database connection file

// Handle different actions (get_users, get_user_purchases, get_available_products)
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'get_users':
        getUsers($conn);
        break;

    case 'get_user_purchases':
        getUserPurchases($conn);
        break;

    case 'get_available_products':
        getAvailableProducts($conn);
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
        break;
}

// Fetch all users
function getUsers($conn)
{
    $sql = "SELECT id, username FROM users"; // Assuming a 'users' table with 'id' and 'username'
    $result = $conn->query($sql);
    $users = [];

    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
}

// Fetch all products purchased by a specific user
function getUserPurchases($conn)
{
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = (int)$data['userId'];

    $sql = "
        SELECT p.id, p.name, p.price, p.barcode
        FROM products p
        JOIN purchases pur ON p.id = pur.product_id
        WHERE pur.user_id = $userId
    ";
    $result = $conn->query($sql);
    $purchases = [];

    while ($row = $result->fetch_assoc()) {
        $purchases[] = $row;
    }

    echo json_encode($purchases);
}

// Fetch available products (products that are not sold out)
function getAvailableProducts($conn)
{
    $sql = "SELECT * FROM products WHERE stock > 0"; // Assuming the 'products' table has a 'stock' column
    $result = $conn->query($sql);
    $products = [];

    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }

    echo json_encode($products);
}
?>
