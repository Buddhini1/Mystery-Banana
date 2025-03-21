document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Register User
    document.getElementById("register-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        // Check if user exists
        if (users.find(user => user.email === email)) {
            alert("Email already registered! Try logging in.");
            return;
        }

        // Save new user
        users.push({ name, email, password });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registration successful! You can now log in.");
        window.location.href = "index.html";
    });

    // Login User
    document.getElementById("login-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid email or password!");
        }
    });
});
