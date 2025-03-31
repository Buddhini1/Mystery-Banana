<?php
session_start(); // Start the session to use session variables
include 'db.php'; // Include your database connection

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash the password

    // Check if the email is already registered
    $stmt = $conn->prepare("SELECT * FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "Email is already registered!"]);
        $stmt->close();
        $conn->close();
        exit;
    }

    // Insert user data into the database
    $stmt = $conn->prepare("INSERT INTO user (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $password);

    if ($stmt->execute()) {
        // Start session and store user data after successful registration
        $_SESSION['user_id'] = $conn->insert_id; // Store user ID in session
        $_SESSION['user_name'] = $name; // Store user name in session
        $_SESSION['user_email'] = $email; // Store user email in session

        echo json_encode(["status" => "success", "message" => "Registration successful!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed! Please try again."]);
    }

    $stmt->close();
    $conn->close();
}
?>
