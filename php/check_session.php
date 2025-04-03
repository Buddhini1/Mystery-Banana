<?php
session_start();// Start the session to track user login status
include_once 'db.php';

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
    exit();
}

// Retrieve the user ID from the session
$user_id = $_SESSION['user_id'];

// Fetch the user's name
$query = "SELECT name FROM user WHERE id = ?";
$stmt = $conn->prepare($query);
// SECURITY: Parameter binding
$stmt->bind_param("i", $user_id);
$stmt->execute();
$stmt->bind_result($name);
$stmt->fetch();
$stmt->close();

//Return success response with user details in JSON format
echo json_encode(["status" => "success", "user_id" => $user_id, "name" => $name]);
?>
