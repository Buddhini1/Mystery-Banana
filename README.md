# Mystery Banana Game

## Overview
Mystery Banana Game is an interactive math puzzle game where players solve arithmetic problems. Players select a difficulty level and answer math questions correctly to score points while managing their lives and time.

## Features
- Three Difficulty Levels: 🍃 Easy, 🔥 Medium, 💀 Hard.
- Life System: Players lose lives for incorrect answers, with the game ending once all lives are lost.
- Timer-Based Gameplay: Players must solve puzzles before time runs out.
- Score Tracking & Leaderboard: Players' scores are recorded in a database, and the top players appear on the leaderboard.
- Session Management: Users must log in to play, ensuring progress tracking.
- Monkey Animations: The monkey jumps for correct answers and shakes for wrong ones.

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: PHP, MySQL
- Database: MySQL (stores user details, scores, and session data)
- API Used: External math puzzle API from marcconrad.com

- Fonts: Google Fonts (Baloo 2)

## How to Play
1. Login or Register to start playing.
2. Select a difficulty level from Easy, Medium, or Hard.
3. Solve the math puzzles by choosing the correct answer.
4. Earn points for correct answers, but be careful—wrong answers reduce your lives!
5. Keep playing until you run out of lives.

Check the leaderboard to see how you rank against other players.

## Scoring System
- Correct Answer: +10 Points
- Wrong Answer: -1 Life
- Running out of time: Auto-skip to the next puzzle

## Installation & Setup
1. Clone or download this repository.
2. Set up a local server using XAMPP or WAMP.
3. Create a database named banana_game and import the provided SQL file.
4. Configure database connection in php/db.php:

```php

$host = "localhost";
$user = "root";  
$password = "";  
$database = "mysterybanana";
$conn = new mysqli($host, $user, $password, $database);
```
Run the game by accessing register.html in your browser.

## References
- Math Puzzle API: Marc Conrad’s Math Puzzle API
- Google Fonts: Baloo 2
- Font Awesome: Used for heart icons in the lives display
