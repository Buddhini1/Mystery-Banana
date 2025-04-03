<?php

// Database configuration settings
$host = "localhost";
$user = "root";  
$password = "";  
$database = "mysterybanana"; // Database name

$conn = new mysqli($host, $user, $password, $database); // Create connection

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Handle connection error
}
?>
