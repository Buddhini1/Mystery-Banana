document.addEventListener("DOMContentLoaded", function () {
    // EVENT-DRIVEN: Form submission handling for both registration and login
     // Register Form Handling
     const registerForm = document.getElementById("register-form");
 
     if (registerForm) {
         registerForm.addEventListener("submit", function (e) {  // EVENT-DRIVEN: Register form submission listener
             e.preventDefault(); // Prevent form from submitting normally
 
             // Get form data and trim spaces
             const name = document.getElementById("register-name").value.trim();
             const email = document.getElementById("register-email").value.trim();
             const password = document.getElementById("register-password").value.trim();
             const confirmPassword = document.getElementById("confirm-password").value.trim();
 
             // VIRTUAL IDENTITY:Password Validation Regex: At least 8 characters, one uppercase, one lowercase, and one number
             const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
 
             // Check if passwords match
             if (password !== confirmPassword) {
                 alert("Passwords do not match. Please confirm your password.");
                 return;
             }
 
             // Validate password
             if (!passwordRegex.test(password)) {
                 alert("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number.");
                 return;
             }
 
             // Prepare data for submission
             const formData = new FormData();
             formData.append('name', name);
             formData.append('email', email);
             formData.append('password', password);
 
             // INTEROPERABILITY:Send registration data to PHP for processing
             fetch("php/register.php", {
                 method: "POST",
                 body: formData,
             })
                 .then(response => response.json())
                 .then(data => {
                     if (data.status === "success") {
                         alert("Registration successful!");
                         window.location.href = "login.html"; // VIRTUAL IDENTITY: Redirect after successful registration
                     } else {
                         alert(data.message); // Show error message
                     }
                 })
                 .catch((error) => console.error("Error:", error));
         });
     }
 
      // EVENT-DRIVEN PROGRAMMING: Form submission handler for login
     const loginForm = document.getElementById("login-form");
 
     if (loginForm) {
         loginForm.addEventListener("submit", function (e) {
             e.preventDefault(); // Prevent form from submitting normally
 
             // Get login data
             const email = document.getElementById("login-email").value.trim();
             const password = document.getElementById("login-password").value.trim();
 
             // Prepare data for submission
             const formData = new FormData();
             formData.append('email', email);
             formData.append('password', password);
 
             // INTEROPERABILITY:Send login data to PHP for processing
             fetch("php/login.php", {
                 method: "POST",
                 body: formData,
             })
                 .then(response => response.json())
                 .then(data => {
                     if (data.status === "success") {
                         alert("Login successful!");
                         window.location.href = "dashboard.html"; // VIRTUAL IDENTITY: Redirect after successful authentication
                     } else {
                         alert(data.message); // Show error message
                     }
                 })
                 .catch((error) => console.error("Error:", error));
         });
     }
 });
 
 // Reference - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API