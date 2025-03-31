<?php
include '../php/db.php'; // Connect to database

header("Content-Type: application/json");

if (!isset($_GET['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Missing user ID."]);
    exit();
}

$user_id = $_GET['user_id'];

// Fetch user's current score
$query = "SELECT score FROM user_scores WHERE user_id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode(["status" => "success", "score" => $row['score']]);
} else {
    echo json_encode(["status" => "success", "score" => 0]); // Default score 0
}

$stmt->close();
$conn->close();
?>
