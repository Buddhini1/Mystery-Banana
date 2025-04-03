<?php

session_start(); // VIRTUAL IDENTITY: Start session to manage user authentication
include 'db.php'; 

// EVENT-DRIVEN:Handle POST request (triggered by form submission)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    
    // VIRTUAL IDENTITY: Secure password hashing
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); //Reference:https://www.php.net/manual/en/function.password-hash.php

    // Check if email exists (INTEROPERABILITY:Database query)
    $stmt = $conn->prepare("SELECT * FROM user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
         // INTEROPERABILITY: Return JSON response to frontend
        echo json_encode(["status" => "error", "message" => "Email is already registered!"]);
        $stmt->close();
        $conn->close();
        exit;
    }

    // Insert new user
    $stmt = $conn->prepare("INSERT INTO user (name, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $password);


    if ($stmt->execute()) {
        //VIRTUAL IDENTITY: Store user data in session. Start session and store user data after successful registration
        $_SESSION['user_id'] = $conn->insert_id; // Store user ID in session
        $_SESSION['user_name'] = $name; // Store user name in session
        $_SESSION['user_email'] = $email; // Store user email in session

        // INTEROPERABILITY: Success or Error response to frontenend
        echo json_encode(["status" => "success", "message" => "Registration successful!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Registration failed! Please try again."]);
    }

    $stmt->close();
    $conn->close();
}
?>
