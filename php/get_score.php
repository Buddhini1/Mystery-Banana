<?php
include 'db.php'; 

// INTEROPERABILITY: JSON response format (https://tools.ietf.org/html/rfc8259)
header("Content-Type: application/json");

// VIRTUAL IDENTITY: User authentication check
if (!isset($_GET['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Missing user ID."]);
    exit();
}

$user_id = $_GET['user_id'];

// INTEROPERABILITY: Database query to fetch user's current score
$query = "SELECT score FROM user_scores WHERE user_id = ?";
$stmt = $conn->prepare($query); // Prepare SQL statement to prevent SQL injection(https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html)
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
