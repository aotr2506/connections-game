let currentRound = 0;
let score = 0;
let timerInterval;
let selectedWords = [];

function startRound(roundNumber) {
    const gridContainer = document.getElementById('grid-container');
    const timerElement = document.getElementById('timer');
    const roundData = wordsRounds[roundNumber];
    
    // Clear previous content
    gridContainer.innerHTML = '';
    selectedWords = [];

    // Shuffle and display words
    const shuffledWords = shuffleArray(roundData.words);
    shuffledWords.forEach(word => {
        const wordCard = document.createElement('div');
        wordCard.className = 'word-card';
        wordCard.innerText = word;
        wordCard.addEventListener('click', () => toggleWordSelection(wordCard));
        gridContainer.appendChild(wordCard);
    });

    // Start the timer
    startTimer(5, timerElement);
}

function toggleWordSelection(wordCard) {
    wordCard.classList.toggle('selected');
    const word = wordCard.innerText;

    if (selectedWords.includes(word)) {
        selectedWords = selectedWords.filter(w => w !== word);
    } else {
        selectedWords.push(word);
    }
}

function startTimer(minutes, timerElement) {
    clearInterval(timerInterval);
    let timeLeft = minutes * 60;

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.innerText = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Moving to the next round.");
            nextRound();
        }

        timeLeft--;
    }, 1000);
}

function nextRound() {
    if (currentRound < wordsRounds.length - 1) {
        currentRound++;
        startRound(currentRound);
    } else {
        alert(`Game over! Your final score is: ${score}`);
    }
}

function checkConnection() {
    const roundData = wordsRounds[currentRound];
    let isCorrect = false;

    roundData.connections.forEach(connection => {
        if (selectedWords.length === connection.length && selectedWords.every(word => connection.includes(word))) {
            isCorrect = true;
        }
    });

    if (isCorrect) {
        alert("Correct connection!");
        score += 10; // Increase score for correct answer
    } else {
        alert("Incorrect connection.");
    }

    // Update score
    document.getElementById('score').innerText = `Score: ${score}`;
    selectedWords = [];
    document.querySelectorAll('.word-card.selected').forEach(card => card.classList.remove('selected'));
}

document.getElementById('submit-connection').addEventListener('click', checkConnection);

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Start the first round
startRound(currentRound);
