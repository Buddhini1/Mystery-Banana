let currentSolution = null;
let lives = 3;
let score = 0;
let gameOver = false;
let timerInterval = null;
let timeRemaining = 30; // Default 30 seconds for both levels
let userId = null;

// Select monkey element
const monkey = document.getElementById("monkey");

// Fetch user session from the backend
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
        .catch(error => console.error("Session fetch error:", error)); // Log any session errors
}

// Fetch a new puzzle
function fetchPuzzle() {
    if (gameOver) return; // Stop fetching if game is over

    fetch("https://marcconrad.com/uob/banana/api.php") // External API to get new puzzle
        .then(response => response.json())
        .then(data => {
            document.getElementById("puzzle-image").src = data.question;
            currentSolution = data.solution;
        })
        .catch(error => console.error("Puzzle fetch error:", error));
}

// ✅ Fix: Ensure the skip button exists before accessing it
function skipPuzzle() {
    if (gameOver) return;
    startTimer(30); // Restart the timer from 30 seconds
    fetchPuzzle();
}

// Update lives display
function updateLives() {
    const livesContainer = document.getElementById("lives-container");
    livesContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const heartIcon = document.createElement("i"); // Create a heart icon
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

    fetch("../php/update_score.php", { // Send updated score to the database via PHP
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
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

// Monkey Jump Animation
function monkeyJump() {
    monkey.classList.add("jump");
    setTimeout(() => monkey.classList.remove("jump"), 600); // Remove class after animation
}

// Monkey Shake Animation
function monkeyShake() {
    monkey.classList.add("shake");
    setTimeout(() => monkey.classList.remove("shake"), 500); // Remove class after animation
}

// Handle user answer
function handleAnswerClick(event) {
    if (gameOver) return;

    let userAnswer = parseInt(event.target.textContent);

    if (userAnswer === currentSolution) {
        document.getElementById("feedback").textContent = "🎉 Correct!";
        score += 10;
        updateScoreDisplay();
        
        // Monkey jumps when correct
        monkeyJump();

        setTimeout(() => {
            fetchPuzzle();  // Fetch a new puzzle after correct answer
            startTimer(30); // Restart the timer for the new puzzle
        }, 2000); // Wait for 2 seconds to show the correct feedback before loading the next puzzle
    } else {
        lives--;  // Reduce lives if answer is incorrect
        updateLives();
        monkeyShake(); // Monkey shakes when wrong

        if (lives === 0) {
            gameOver = true;
            document.getElementById("feedback").textContent = "💀 Game Over!";
            updateScoreInDB(); // Send the final score to the database
            document.getElementById("restart-btn").style.display = "block";
            clearInterval(timerInterval); // Stop the timer when game over
        } else {
            document.getElementById("feedback").textContent = "❌ Wrong! Try again.";
        }
    }
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
    startTimer(30); // Start the timer again
}

// Timer function 
function startTimer(seconds) {
    timeRemaining = seconds;
    document.getElementById("timer").textContent = timeRemaining; // Display the initial time in the timer element

    // Start countdown
    if (timerInterval) {
        clearInterval(timerInterval); // Clear existing timer
    }

    timerInterval = setInterval(() => {
        timeRemaining--;
        document.getElementById("timer").textContent = timeRemaining; // Update the timer text

        // If time runs out
        if (timeRemaining <= 0) {
            clearInterval(timerInterval); // Stop the timer
            document.getElementById("feedback").textContent = "Time's Up! Next Puzzle";

            // Generate the next puzzle
            fetchPuzzle();
            
            startTimer(30); // Restart the timer for 30 seconds
        }
    }, 1000);
}

// Initialize the game based on the current page
function initializeGame() {
    fetchUserSession().then(() => {
        const currentPage = window.location.pathname.split('/').pop();

        // Set 30 seconds timer for both pages (medium and hard levels)
        startTimer(30); 

        fetchPuzzle();
        updateLives();

        // Attach event listeners to answer buttons
        document.querySelectorAll(".num-btn").forEach(button => {
            button.removeEventListener("click", handleAnswerClick);
            button.addEventListener("click", handleAnswerClick);
        });

        // Attach event listener to restart button
        const restartBtn = document.getElementById("restart-btn");
        if (restartBtn) {
            restartBtn.removeEventListener("click", restartGame);
            restartBtn.addEventListener("click", restartGame);
        }
    });
}

// Ensure script loads after the DOM is ready
document.addEventListener("DOMContentLoaded", initializeGame);


// fetch API - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API