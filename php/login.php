<?php
session_start();  // VIRTUAL IDENTITY: Session management for user authentication
include 'db.php';  // INTEROPERABILITY: Database connection

// EVENT-DRIVEN: Handle POST request from login form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Query to find the user
    $sql = "SELECT id, name, password FROM user WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // VIRTUAL IDENTITY: Password verification using password_hash
        if (password_verify($password, $user['password'])) {
            // VIRTUAL IDENTITY: Store user in session
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['name'] = $user['name'];

            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Incorrect password."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "User not found."]);
    }

    $stmt->close();
}
?>
