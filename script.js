document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const replayButton = document.getElementById('replayButton');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const levelDisplay = document.getElementById('level');
    const gameGrid = document.getElementById('gameGrid');

    let score = 0;
    let timeLeft = 30; // 30 seconds time limit
    let level = 1;
    let timer;
    let moleInterval;
    let moleSpeed = 1500; // Initial mole speed

    startButton.addEventListener('click', startGame);
    replayButton.addEventListener('click', startGame);

    function startGame() {
        resetGame();
        generateHoles();
        startTimer();
        startMoleInterval();
        startButton.classList.add('hidden');
        replayButton.classList.add('hidden');
    }

    function resetGame() {
        score = 0;
        timeLeft = 30;
        level = 1;
        moleSpeed = 1500;
        clearInterval(timer);
        clearInterval(moleInterval);
        updateDisplay();
        gameGrid.innerHTML = '';
        startButton.classList.remove('hidden');
        replayButton.classList.add('hidden');
    }

    function generateHoles() {
        for (let i = 0; i < 9; i++) {
            const hole = document.createElement('div');
            hole.classList.add('hole');
            const mole = document.createElement('div');
            mole.classList.add('mole');
            hole.appendChild(mole);
            gameGrid.appendChild(hole);
        }
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                clearInterval(moleInterval);
                gameOver();
            }
        }, 1000);
    }

    function startMoleInterval() {
        moleInterval = setInterval(() => {
            const holes = document.querySelectorAll('.hole');
            const randomHole = holes[Math.floor(Math.random() * holes.length)];
            randomHole.classList.add('active');
            setTimeout(() => {
                randomHole.classList.remove('active');
            }, 1000);
        }, moleSpeed);
    }

    function updateDisplay() {
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
        levelDisplay.textContent = level;
    }

    function gameOver() {
        alert(`Game Over! Your score is ${score}`);
        startButton.classList.remove('hidden');
        replayButton.classList.remove('hidden');
    }

    function nextLevel() {
        level++;
        moleSpeed -= 100; // Increase difficulty by reducing mole speed
        if (moleSpeed < 500) moleSpeed = 500; // Cap the minimum mole speed
        clearInterval(moleInterval);
        startMoleInterval();
    }

    gameGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('hole') && event.target.classList.contains('active')) {
            score++;
            updateDisplay();
            event.target.classList.remove('active');
            if (score % 10 === 0) {
                nextLevel();
            }
        }
    });
});
