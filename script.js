document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const replayButton = document.getElementById('replayButton');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const gameGrid = document.getElementById('gameGrid');

    let score = 0;
    let timeLeft = 30; // 30 seconds time limit
    let timer;
    let moleInterval;

    startButton.addEventListener('click', startGame);
    replayButton.addEventListener('click', startGame);

    function startGame() {
        resetGame();
        generateHoles();
        startTimer();
        startMoleInterval();
    }

    function resetGame() {
        score = 0;
        timeLeft = 30;
        clearInterval(timer);
        clearInterval(moleInterval);
        updateDisplay();
        gameGrid.innerHTML = '';
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
                alert(`Game Over! Your score is ${score}`);
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
        }, 1500);
    }

    function updateDisplay() {
        scoreDisplay.textContent = score;
        timerDisplay.textContent = timeLeft;
    }

    gameGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('hole') && event.target.classList.contains('active')) {
            score++;
            updateDisplay();
            event.target.classList.remove('active');
        }
    });
});
