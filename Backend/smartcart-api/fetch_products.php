<?php
header("Access-Control-Allow-Origin: *");
require 'db.php';

$sql = "SELECT * FROM products";
$result = $conn->query($sql);
$products = [];

while ($row = $result->fetch_assoc()) {
    $products[] = [
        "id" => (int)$row["id"],
        "name" => $row["name"],
        "price" => (float)$row["price"],
        "barcode" => (string)trim($row["barcode"]) // Force barcode to be string & clean whitespace
    ];
}

echo json_encode($products);
$conn->close();
?>
