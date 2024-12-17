let timerInterval;
let time = 0;

onmessage = function(e) {
    if (e.data.type === 'start') {
        time = e.data.startTime || 0;

        // Запуск таймера
        if (!timerInterval) {
            timerInterval = setInterval(() => {
                if (time > 0) {
                    time--;
                    postMessage({ type: 'tick', time: time });
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    postMessage({ type: 'end' });
                }
            }, 1000);
        }
    }

    if (e.data.type === 'stop') {
        // Остановка таймера
        clearInterval(timerInterval);
        timerInterval = null;
    }

    if (e.data.type === 'reset') {
        // Сброс таймера
        time = e.data.startTime || 0;
    }
};