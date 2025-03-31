<?php
$host = "localhost";
$user = "root";  // Change this if you have a different username
$password = "";  // Change if you set a MySQL password
$database = "banana_game";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
