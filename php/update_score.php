<?php
include 'db.php';  // Connect to database

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
$user_id = $data['user_id'];
$score = $data['score'];

if (!isset($user_id) || !isset($score)) {
    echo json_encode(["status" => "error", "message" => "Invalid request."]);
    exit();
}

// Check if user already has a score entry
$check_query = "SELECT score FROM user_scores WHERE user_id = ?";
$stmt = $conn->prepare($check_query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // User exists, update score (add new score to existing one)
    $update_query = "UPDATE user_scores SET score = score + ? WHERE user_id = ?";
    $stmt = $conn->prepare($update_query);
    $stmt->bind_param("ii", $score, $user_id);
} else {
    // No previous score, insert new record
    $insert_query = "INSERT INTO user_scores (user_id, score) VALUES (?, ?)";
    $stmt = $conn->prepare($insert_query);
    $stmt->bind_param("ii", $user_id, $score);
}



if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Score updated."]);
} else {
    echo json_encode(["status" => "error", "message" => "Database update failed."]);
}

$stmt->close();
$conn->close();
?>
