// Function to check user session
function checkUserSession() {
    // INTEROPERABILITY: Fetch API implementation
    fetch('php/check_session.php')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'error') {
                // If session is expired, redirect to login page
                alert('Session expired. Please log in again.');
                window.location.href = 'login.html'; // Redirect to the login page
            } else {
                console.log('User is logged in, ID:', data.user_id); // https://developer.chrome.com/docs/devtools/console/api/
                fetchLeaderboard(); // Proceed with fetching leaderboard
            }
        })
        .catch(error => {
            // ERROR HANDLING: Secure error reporting
            console.error('Error checking session:', error);
            alert('An error occurred while checking your session.');
            window.location.href = 'login.html'; // Redirect to login on error
        });
}

// INTEROPERABILITY: Function to fetch leaderboard data from PHP backend
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

            /*Loop through fetched leaderboard data and dynamically update the table.
             Event-driven programming as the leaderboard updates when data is received.*/

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
    window.location.href = "dashboard.html"; 
}

// Call the function when the page loads
window.onload = checkUserSession;

// To fetch API refered -https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API