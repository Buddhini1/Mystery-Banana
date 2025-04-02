<?php
include 'db.php'; // Make sure the path is correct

header("Content-Type: application/json");

// Fetch top 15 users and their scores
$query = "SELECT user.id, user.name, user_scores.score 
          FROM user 
          JOIN user_scores ON user.id = user_scores.user_id 
          ORDER BY user_scores.score DESC 
          LIMIT 15";

$result = $conn->query($query);

// Check for errors
if (!$result) {
    echo json_encode(["status" => "error", "message" => "Error fetching leaderboard data."]);
    exit();
}

// Prepare the leaderboard data
$leaderboard = [];
while ($row = $result->fetch_assoc()) {
    $leaderboard[] = [
        'name' => $row['name'],
        'score' => $row['score']
    ];
}

echo json_encode($leaderboard);

$conn->close();
?>
