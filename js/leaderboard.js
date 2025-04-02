function fetchLeaderboard() {
    fetch('php/get_leaderboard.php')
        .then(response => response.json())
        .then(data => {
            if (data.status && data.status === "error") {
                console.error("Error fetching leaderboard:", data.message);
                return;
            }

            const leaderboardBody = document.getElementById("leaderboard-body");
            leaderboardBody.innerHTML = "";  // Clear existing leaderboard

            // Populate the leaderboard table
            data.forEach((player, index) => {
                const row = document.createElement("tr");

                // Rank cell
                const rankCell = document.createElement("td");
                rankCell.textContent = index + 1;
                row.appendChild(rankCell);

                // Player name cell
                const nameCell = document.createElement("td");
                nameCell.textContent = player.name;
                row.appendChild(nameCell);

                // Score cell
                const scoreCell = document.createElement("td");
                scoreCell.textContent = player.score;
                row.appendChild(scoreCell);

                leaderboardBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching leaderboard:", error));
}

// Redirect to dashboard
function goBack() {
    window.location.href = "../dashboard.html"; 
}

// Call the function when the page loads
fetchLeaderboard();




//need to implement session management to levels, leaderboard, and game pages 