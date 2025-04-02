let currentSolution = null;
let lives = 3;
let score = 0;
let gameOver = false;
let userId = null;

// Session manegment: Fetch user session
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
        .catch(error => console.error("Session fetch error:", error)); // ERROR HANDLING: Secure error reporting
}

// Fetch a new puzzle
function fetchPuzzle() {
    if (gameOver) return;// Don't fetch new puzzles after the game is over
    fetch("https://marcconrad.com/uob/banana/api.php")  // INTEROPERABILITY: External API call
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
    if (gameOver) return; // Prevent skipping if the game is over
    fetchPuzzle();
}

// Update lives display
function updateLives() {
    const livesContainer = document.getElementById("lives-container");
    livesContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const heartIcon = document.createElement("i");
        heartIcon.classList.add("fas", i < lives ? "fa-heart" : "fa-heart-broken", "heart-icon");
        livesContainer.appendChild(heartIcon); // Prevent skipping if the game is over
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

    fetch("../php/update_score.php", {// INTEROPERABILITY: Send score data to PHP server-side script
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, score: score }) // Pass user ID and score to the server
    })
    .then(response => response.json())
    .then(data => {
        if (data.status !== "success") {
            // Handle error response from the server
            console.error("Failed to update score:", data.message); 
        }
    })
    .catch(error => console.error("Score update request failed:", error));
}

// Handle user answer
function handleAnswerClick(event) {
    if (gameOver) return; // Prevent answering after game over

    let userAnswer = parseInt(event.target.textContent); // Get the answer selected by the user
    let monkey = document.getElementById("monkey");

    if (userAnswer === currentSolution) {
        document.getElementById("feedback").textContent = "🎉 Correct!";
        score += 10;
        updateScoreDisplay(); // Update score display
        monkey.classList.add("jump"); // Monkey jumps

        setTimeout(() => {
            fetchPuzzle();
        }, 2000);
    } else {
        lives--; // Decrease lives
        updateLives();
        monkey.classList.add("shake"); // Monkey shakes

        if (lives === 0) { // Game over if no lives are left
            gameOver = true;
            document.getElementById("feedback").textContent = "💀 Game Over!";
            updateScoreInDB();  // Send the final score to the database
            document.getElementById("restart-btn").style.display = "block"; // Show restart button
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
    fetchUserSession().then(() => { // Fetch user session
        fetchPuzzle(); // Start fetching puzzles
        updateLives(); // Initialize lives display

         // Set up event listeners for answer buttons
        document.querySelectorAll(".num-btn").forEach(button => {
            button.removeEventListener("click", handleAnswerClick);
            button.addEventListener("click", handleAnswerClick);  // Event-driven behavior: Listen for button click
        });

        // Event listener for skip button
        document.getElementById("skip-btn")?.addEventListener("click", skipPuzzle);
        document.getElementById("restart-btn")?.addEventListener("click", restartGame);
    });
}

// Ensure script loads after DOM is ready
document.addEventListener("DOMContentLoaded", initializeGame);
