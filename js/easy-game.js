let currentSolution = null;
let lives = 3;
let score = 0;
let gameOver = false;
let userId = null;

// Fetch user session
function fetchUserSession() {
    return fetch("../php/check_session.php")
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
    if (gameOver) return;
    fetch("https://marcconrad.com/uob/banana/api.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById("puzzle-image").src = data.question;
            currentSolution = data.solution;
            resetMonkeyAnimation(); // Reset animations for new puzzle
        })
        .catch(error => console.error("Puzzle fetch error:", error));
}

// Skip puzzle
function skipPuzzle() {
    if (gameOver) return;
    fetchPuzzle();
}

// Update lives display
function updateLives() {
    const livesContainer = document.getElementById("lives-container");
    livesContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fas", i < lives ? "fa-heart" : "fa-heart-broken", "heart-icon");
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

    fetch("../php/update_score.php", {
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
function handleAnswerClick(event) {
    if (gameOver) return;

    let userAnswer = parseInt(event.target.textContent);
    let monkey = document.getElementById("monkey");

    if (userAnswer === currentSolution) {
        document.getElementById("feedback").textContent = "🎉 Correct!";
        score += 10;
        updateScoreDisplay();
        monkey.classList.add("jump"); // Monkey jumps 🎉

        setTimeout(() => {
            fetchPuzzle();
        }, 2000);
    } else {
        lives--;
        updateLives();
        monkey.classList.add("shake"); // Monkey shakes ❌

        if (lives === 0) {
            gameOver = true;
            document.getElementById("feedback").textContent = "💀 Game Over!";
            updateScoreInDB();
            document.getElementById("restart-btn").style.display = "block";
        } else {
            document.getElementById("feedback").textContent = "❌ Wrong! Try again.";
        }
    }

    // Remove animation class after it plays to allow re-triggering
    setTimeout(resetMonkeyAnimation, 1000);
}

// Reset animations
function resetMonkeyAnimation() {
    let monkey = document.getElementById("monkey");
    monkey.classList.remove("jump", "shake");
}

// Restart the game
function restartGame() {
    score = 0;
    lives = 3;
    gameOver = false;
    updateScoreDisplay();
    updateLives();
    document.getElementById("feedback").textContent = "";
    document.getElementById("restart-btn").style.display = "none";
    fetchPuzzle();
}

// Initialize game
function initializeGame() {
    fetchUserSession().then(() => {
        fetchPuzzle();
        updateLives();

        document.querySelectorAll(".num-btn").forEach(button => {
            button.removeEventListener("click", handleAnswerClick);
            button.addEventListener("click", handleAnswerClick);
        });

        document.getElementById("skip-btn")?.addEventListener("click", skipPuzzle);
        document.getElementById("restart-btn")?.addEventListener("click", restartGame);
    });
}

// Ensure script loads after DOM is ready
document.addEventListener("DOMContentLoaded", initializeGame);
