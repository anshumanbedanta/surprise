document.addEventListener('DOMContentLoaded', () => {
    const countdownView = document.getElementById('countdown-view');
    const celebrationView = document.getElementById('celebration-view');
    const hoursSpan = document.getElementById('hours');
    const minutesSpan = document.getElementById('minutes');
    const secondsSpan = document.getElementById('seconds');
    const giftBtn = document.getElementById('gift-btn');

    // Setting the timer strictly for her birthday countdown!
    const targetDate = new Date("April 24, 2026 00:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        let difference = targetDate - now;

        if (difference <= 0) {
            // It's Birthday Time!
            showCelebration();
            return;
        }

        // Add 24 hours logic if there are any days left to keep the UI clean as 'Hours'
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Display
        hoursSpan.textContent = hours.toString().padStart(2, '0');
        minutesSpan.textContent = minutes.toString().padStart(2, '0');
        secondsSpan.textContent = seconds.toString().padStart(2, '0');
    }

    let confettiInterval;

    function showCelebration() {
        if (!countdownView.classList.contains('hidden')) {
            countdownView.classList.add('hidden');
            setTimeout(() => {
                countdownView.style.display = 'none';
                celebrationView.style.display = 'block';

                // Allow display change to process before removing hidden class for transition
                setTimeout(() => {
                    celebrationView.classList.remove('hidden');
                    triggerInitialConfetti();
                }, 50);

            }, 800); // Wait for fade out
        }
    }

    function triggerInitialConfetti() {
        var duration = 5 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ff5e94', '#a056f3', '#ff8a5c']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ff5e94', '#a056f3', '#ff8a5c']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    // Check if it's already the birthday initially
    if (new Date().getTime() >= targetDate) {
        countdownView.style.display = 'none';
        celebrationView.classList.remove('hidden');
        triggerInitialConfetti();
    } else {
        celebrationView.style.display = 'none';
        updateCountdown();
        // Update countdown every second
        setInterval(updateCountdown, 1000);
    }

    giftBtn.addEventListener('click', () => {
        // Redirect to the photo album after a slight delay
        giftBtn.textContent = 'Opening Your Surprise... ✨';
        giftBtn.style.pointerEvents = 'none';

        // Quick burst of confetti before transition
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#ff5e94', '#a056f3', '#ff8a5c']
        });

        setTimeout(() => {
            window.location.href = 'album.html';
        }, 1500);
    });
});
