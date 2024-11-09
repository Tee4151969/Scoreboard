let gameStartSound = new Audio('game-start.mp3'); 
let gameEndSound = new Audio('game-end.mp3'); 

let inputCon = document.querySelector('.input-container');
let scoreBoard = document.querySelector('.score-container');
let team1Input = document.getElementById('team1');
let team1NameElem = document.getElementById('team1Name');
let team1ScoreElem = document.getElementById('team1Score');
let team2Input = document.getElementById('team2');
let team2NameElem = document.getElementById('team2Name');
let team2ScoreElem = document.getElementById('team2Score');


let countdown;
let timeLeft = 600; // 10 minutes in seconds
let isTimerRunning = false;
  


// Function to start the countdown timer
function startTimer() {
	const timerElement = document.getElementById('timer');
   
    countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
       
        // Check if time is up
        if (timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.textContent = "Time's Up!";
			gameEndSound.play()
            disableButtons(); // Disable buttons when time is up
        }
       
        timeLeft--;
    }, 1000);
}


// Function to start or pause the timer
function toggleTimer() {
    const timerButton = document.getElementById('btn-start-time');
   
	 gameStartSound.play();
	
    if (isTimerRunning) {
        // If timer is running, pause it
        clearInterval(countdown);
        timerButton.textContent = 'Start';
        isTimerRunning = false;
    } else {
        // If timer is paused, start it
        startTimer();
        timerButton.textContent = 'Pause';
        isTimerRunning = true;
    }
}
// Function to disable all scoring buttons
function disableButtons() {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => button.disabled = true);
}

function readyGame() {
    // Hide "Ready" button and show "Start" button
	const team1Name = document.getElementById('team1').value;
    const team2Name = document.getElementById('team2').value;

    // Validate if both team names are provided
    if (!team1Name || !team2Name) {
        alert("Please enter names for both teams!");
        return; // Stop the function if validation fails
    }
	if (team1Name && team2Name) {
        document.querySelector('.input-container').style.display = 'none';
        document.querySelector('.score-container').style.display = 'block';

        document.getElementById('team1Name').innerText = team1Name;
        document.getElementById('team2Name').innerText = team2Name;

        document.getElementById('btn-start-time').style.display = 'inline';
        document.getElementById('btn-ready').style.display = 'none';
		
		document.getElementById("group-settime").classList.add("hidden");
    }    
    // You can also set up other initializations here if needed
    startGame(); // Initialize the game (set team names, show score container)
}

function timeToSeconds(time) {
    const [minutes, seconds] = time.split(":").map(Number); // Split by ':' and convert to numbers
    return (minutes * 60) + seconds; // Convert minutes to seconds and add the remaining seconds
}
// Modify startGame to include startTimer
function startGame() {
    const team1Name = document.getElementById('team1').value || 'Team 1';
    const team2Name = document.getElementById('team2').value || 'Team 2';

    document.getElementById('team1Name').textContent = team1Name;
    document.getElementById('team2Name').textContent = team2Name;

    document.querySelector('.score-container').style.display = 'block';

    timeLeft = timeToSeconds(document.getElementById("timer").textContent); // Reset timer to 10 minutes
	 
}

// Function to add score to a specific team
function addScore(value, team) {
    const scoreElement = document.getElementById(`${team}Score`);
    let currentScore = parseInt(scoreElement.textContent);
    currentScore += value;

    if (currentScore < 0) currentScore = 0;
   
    scoreElement.textContent = currentScore;
}

// Function to reset the score and timer
function resetScore() {
    document.getElementById('team1Score').textContent = 0;
    document.getElementById('team2Score').textContent = 0;
}

// Function to reset the game (clears names, hides scoreboard, resets timer)
function resetGame() {
   

		document.getElementById("group-settime").classList.remove("hidden");

  // Show the team name input fields again
    document.querySelector('.team-input').style.display = 'block';
    document.querySelector('.input-container').style.display = 'block';

    // Hide the score container
    document.querySelector('.score-container').style.display = 'none';

    // Reset the team names and scores
    document.getElementById('team1').value = '';
    document.getElementById('team2').value = '';
    document.getElementById('team1Name').innerText = '1';
    document.getElementById('team2Name').innerText = '2';
    document.getElementById('team1Score').innerText = '0';
    document.getElementById('team2Score').innerText = '0';

	clearInterval(countdown); // Stop the timer
    document.getElementById('timer').textContent = '10:00'; // Reset timer display
    isTimerRunning = false;
    enableButtons(); // Re-enable buttons


    // Reset timer to 10:00
  document.getElementById('btn-start-time').textContent = 'Start'; // Reset button text
 
    // Show the Ready button and hide the Start button
    document.getElementById('btn-start-time').style.display = 'none';
    document.getElementById('btn-ready').style.display = 'inline-block';
}
// Function to enable all scoring buttons
function enableButtons() {
    const buttons = document.querySelectorAll('.buttons button');
    buttons.forEach(button => button.disabled = false);
}

// Initial font sizes
let scoreFontSize = 80; // initial font size for scores
let timerFontSize = 50; // initial font size for timer
let teamFontSize = 18; // initial font size for team names

// Change font size for the timer, scores, and team names
function changeFontSize(change) {
    // Update the font sizes for timer, scores, and team names
    scoreFontSize += change;
    timerFontSize += change;
    teamFontSize += change;

    // Apply the new font sizes
    document.getElementById('team1Score').style.fontSize = `${scoreFontSize}px`;
    document.getElementById('team2Score').style.fontSize = `${scoreFontSize}px`;
    document.getElementById('timer').style.fontSize = `${timerFontSize}px`;
    document.getElementById('team1Name').style.fontSize = `${teamFontSize}px`;
    document.getElementById('team2Name').style.fontSize = `${teamFontSize}px`;
}


let timerValue = 600; // Default 10 minutes (600 seconds)

// Update timer display initially
updateTimer();

// Set custom time when clicking "Set Time"
document.getElementById("setTimeButton").addEventListener("click", () => {
    const timeInput = document.getElementById("timeInput").value;
    if (timeInput && timeInput > 0) {
        timerValue = timeInput * 60; // Convert minutes to seconds
        updateTimer();
            }
});

document.getElementById("increaseTimer").addEventListener("click", () => {
    timerValue += 1;
    updateTimer();
});

document.getElementById("decreaseTimer").addEventListener("click", () => {
    if (timerValue > 0) timerValue -= 1;
    updateTimer();
});

function updateTimer() {
 
    const minutes = String(Math.floor(timerValue / 60)).padStart(2, '0');
    const seconds = String(timerValue % 60).padStart(2, '0');
    document.getElementById("timer").textContent = `${minutes}:${seconds}`; } 
	 