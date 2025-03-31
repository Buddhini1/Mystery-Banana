<?php
session_start();  // Ensure session is started

// Destroy the session
session_unset();
session_destroy();

// Redirect to login page after logout
header("Location: ../login.html");
exit();
?>
