<?php

// Database configuration settings
$host = "localhost";
$user = "root";  
$password = "";  
$database = "banana_game";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
