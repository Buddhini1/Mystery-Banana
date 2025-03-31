let currentSolution = null;
let timeLeft = 30;
let timerInterval;
let lives = 3;
let score = 0;
let gameOver = false;
let userId = null; // User ID from session

// Fetch user session details
function fetchUserSession() {
    fetch("../php/check_session.php")
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                userId = data.user_id;
            } else {
                alert("Session expired. Redirecting to login...");
                window.location.href = "../login.html";
            }
        })
        .catch(error => console.error("Session fetch error:", error));
}

// Fetch a new puzzle
function fetchPuzzle() {
    if (gameOver) return; // Stop fetching puzzles if game over

    clearInterval(timerInterval);
    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;
    updateLives();

    fetch("https://marcconrad.com/uob/banana/api.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById("puzzle-image").src = data.question;
            currentSolution = data.solution;
            startTimer();
        });
}

// Start countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (gameOver) {
            clearInterval(timerInterval);
            return;
        }

        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            document.getElementById("monkey").classList.add("shake");

            setTimeout(() => {
                document.getElementById("monkey").classList.remove("shake");
                fetchPuzzle();
            }, 2000);
        }
    }, 1000);
}

// Update lives display
function updateLives() {
    const livesContainer = document.getElementById("lives-container");
    livesContainer.innerHTML = '';

    for (let i = 0; i < lives; i++) {
        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fas", "fa-heart", "heart-icon");
        livesContainer.appendChild(heartIcon);
    }

    for (let i = lives; i < 3; i++) {
        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fas", "fa-heart-broken", "heart-icon");
        livesContainer.appendChild(heartIcon);
    }
}

// Update score display
function updateScoreDisplay() {
    document.getElementById("score").textContent = score;
}

// Send score to database
function updateScoreInDB() {
    if (!userId) {
        console.error("User ID is missing. Cannot update score.");
        return;
    }

    fetch("update_score.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, score: score })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== "success") {
            console.error("Failed to update score:", data.message);
        }
    })
    .catch(error => console.error("Score update request failed:", error));
}

// Handle user answer
document.querySelectorAll(".num-btn").forEach(button => {
    button.addEventListener("click", function () {
        if (gameOver) return; // Stop input when game over

        let userAnswer = parseInt(this.textContent);

        if (userAnswer === currentSolution) {
            document.getElementById("feedback").textContent = "🎉 Correct!";
            score += 10;
            updateScoreDisplay();

            setTimeout(() => {
                fetchPuzzle();
            }, 2000);
        } else {
            lives--;
            updateLives();

            if (lives === 0) {
                gameOver = true;
                document.getElementById("feedback").textContent = "💀 Game Over!";
                clearInterval(timerInterval);
                updateScoreInDB();

                document.getElementById("restart-btn").style.display = "block"; // Show restart button
            } else {
                document.getElementById("feedback").textContent = "❌ Wrong! Try again.";
            }
        }
    });
});

// Restart the game manually
document.getElementById("restart-btn").addEventListener("click", function () {
    score = 0;
    lives = 3;
    gameOver = false;
    updateScoreDisplay();
    updateLives();
    document.getElementById("feedback").textContent = "";
    this.style.display = "none"; // Hide restart button
    fetchPuzzle();
});

// Initialize game
fetchUserSession();
fetchPuzzle();
