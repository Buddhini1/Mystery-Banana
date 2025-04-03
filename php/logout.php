<?php
session_start();  // VIRTUAL IDENTITY:Start the session to manage user authentication

// Destroy the session
session_unset();
session_destroy();

// Redirect to login page after logout
header("Location: ../login.html");
exit(); // SECURITY: Prevent further script execution
?>
