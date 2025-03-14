let currentSolution = null;
let timeLeft = 30;
let timerInterval;

// Fetch a new puzzle
function fetchPuzzle() {
    clearInterval(timerInterval);
    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;

    fetch("https://marcconrad.com/uob/banana/api.php")
        .then(response => response.json())
        .then(data => {
            document.getElementById("puzzle-image").src = data.question;
            currentSolution = data.solution;
            startTimer();
        });
}

// Start the countdown timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            document.getElementById("feedback").textContent = "⏰ Time's up! Moving to next puzzle...";
            document.getElementById("monkey").classList.add("shake");

            setTimeout(() => {
                document.getElementById("monkey").classList.remove("shake");
                fetchPuzzle();
            }, 2000);
        }
    }, 1000);
}

// Handle answer selection
document.querySelectorAll(".num-btn").forEach(button => {
    button.addEventListener("click", function () {
        let userAnswer = parseInt(this.textContent);
        
        if (userAnswer === currentSolution) {
            document.getElementById("feedback").textContent = "🎉 Correct!";
            document.getElementById("monkey").classList.add("jump");

            setTimeout(() => {
                document.getElementById("monkey").classList.remove("jump");
                fetchPuzzle();
            }, 2000);
        } else {
            document.getElementById("feedback").textContent = "❌ Wrong! Try again.";
        }
    });
});

// Load the first puzzle
fetchPuzzle();
