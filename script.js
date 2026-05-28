document.addEventListener('DOMContentLoaded', () => {
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startStopButton = document.getElementById('start-stop-button');
    const resetButton = document.getElementById('reset-button');

    let timerInterval = null;
    let timeLeft = 25 * 60; // 25 دقیقه در ثانیه
    let isRunning = false;
    let isStudyTime = true; // شروع با زمان مطالعه

    const studyTimeMinutes = 25;
    const breakTimeMinutes = 5;

    function updateTimerDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(remainingSeconds).padStart(2, '0');
    }

    function startTimer() {
        isRunning = true;
        startStopButton.textContent = 'توقف';
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay(timeLeft);

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                isRunning = false;
                startStopButton.textContent = 'شروع';

                if (isStudyTime) {
                    // پایان زمان مطالعه، شروع زمان استراحت
                    alert('زمان مطالعه به پایان رسید! وقت استراحت است.');
                    isStudyTime = false;
                    timeLeft = breakTimeMinutes * 60;
                    updateTimerDisplay(timeLeft);
                    // خودکار شروع زمان استراحت
                    startTimer();
                } else {
                    // پایان زمان استراحت، شروع زمان مطالعه
                    alert('زمان استراحت به پایان رسید! دوباره شروع به مطالعه کن.');
                    isStudyTime = true;
                    timeLeft = studyTimeMinutes * 60;
                    updateTimerDisplay(timeLeft);
                    // خودکار شروع زمان مطالعه
                    startTimer();
                }
            }
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        startStopButton.textContent = 'ادامه';
    }

    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        isStudyTime = true;
        timeLeft = studyTimeMinutes * 60;
        updateTimerDisplay(timeLeft);
        startStopButton.textContent = 'شروع';
    }

    startStopButton.addEventListener('click', () => {
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    });

    resetButton.addEventListener('click', resetTimer);

    // نمایش زمان اولیه
    updateTimerDisplay(timeLeft);
});
