document.addEventListener('DOMContentLoaded', () => {
    const images = [
        "WhatsApp Image 2026-04-23 at 10.06.07 PM (2).jpeg",
        "WhatsApp Image 2026-04-23 at 10.06.09 PM (1).jpeg",
        "WhatsApp Image 2026-04-23 at 10.06.09 PM.jpeg",
        "WhatsApp Image 2026-04-23 at 10.06.10 PM (1).jpeg",
        "WhatsApp Image 2026-04-23 at 10.06.10 PM (2).jpeg",
        "WhatsApp Image 2026-04-23 at 10.06.14 PM.jpeg",
        "WhatsApp Image 2026-04-23 at 10.06.15 PM (1).jpeg",
        "WhatsApp Image 2026-04-23 at 10.06.17 PM (1).jpeg",
        "WhatsApp Image 2026-04-23 at 10.06.17 PM (2).jpeg",
        "WhatsApp Image 2026-04-23 at 9.35.44 PM.jpeg",
        "WhatsApp Image 2026-04-23 at 9.35.45 PM.jpeg",
        "WhatsApp Image 2026-04-23 at 9.35.46 PM.jpeg",
        "WhatsApp Image 2026-04-23 at 9.35.48 PM.jpeg"
    ];

    const galleryGrid = document.getElementById('gallery-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.getElementById('close-lightbox');
    const backLightboxBtn = document.getElementById('back-lightbox');
    const lightboxCaption = document.getElementById('lightbox-caption');

    const quotes = [
        "A sister is both your mirror and your opposite.",
        "Sisters are different flowers from the same garden.",
        "There is no better friend than a sister, and no better sister than you.",
        "A sister is a little bit of childhood that can never be lost.",
        "Side by side or miles apart, we are always connected by heart.",
        "You are my compass, my guide, and my biggest cheerleader.",
        "A loyal sister is worth a thousand friends.",
        "Having a sister is like having a best friend you can’t get rid of.",
        "Sisters function as safety nets in a chaotic world.",
        "To have a loving relationship with a sister is to have a soulmate for life.",
        "No matter how much we argue, we cannot be drawn apart.",
        "A sister shares childhood memories and grown-up dreams.",
        "Because angels are sometimes busy, God created sisters like you."
    ];

    // Observer for scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Populate gallery
    images.forEach((imgName, index) => {
        // Create item container
        const item = document.createElement('div');
        item.className = 'masonry-item';

        // Image wrapper for overlay
        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'img-wrapper';

        // Create image element
        const img = document.createElement('img');
        img.src = `images/${imgName}`;
        img.alt = `Memory ${index + 1}`;
        img.loading = 'lazy'; // For performance

        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'masonry-overlay';
        overlay.innerHTML = `<h3>Memory ✨</h3>`;

        imgWrapper.appendChild(img);
        imgWrapper.appendChild(overlay);

        // Create Caption
        const caption = document.createElement('div');
        caption.className = 'masonry-caption';
        caption.innerHTML = `<p>"${quotes[index] || "A memory to cherish forever."}"</p>`;

        // Append
        item.appendChild(imgWrapper);
        item.appendChild(caption);
        galleryGrid.appendChild(item);

        // Start observing for scroll animation
        observer.observe(item);

        // Add Lightbox Event
        imgWrapper.addEventListener('click', () => {
            lightboxImg.src = img.src;
            if (lightboxCaption) {
                lightboxCaption.innerHTML = `"${quotes[index] || "A memory to cherish forever."}"`;
                lightboxCaption.classList.add('animate-caption');
            }
            if (window.innerWidth <= 600) {
                lightboxImg.className = 'lightbox-content lightbox-img-animate';
            }
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // prevent scrolling
        });
    });

    // Close Lightbox
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // enable scrolling
        setTimeout(() => {
            lightboxImg.src = '';
            lightboxImg.className = 'lightbox-content';
            if (lightboxCaption) {
                lightboxCaption.innerHTML = '';
                lightboxCaption.classList.remove('animate-caption');
            }
        }, 300); // clear after fade out

        // Mobile only: random tile effects on returning to album
        if (window.innerWidth <= 600) {
            const items = document.querySelectorAll('.masonry-item');
            const mobileAnim = ['fadeInUp', 'zoomIn', 'slideInLeft', 'slideInRight'];

            items.forEach(item => {
                // Remove observer classes and styles
                item.classList.remove('animate');
                item.style.animation = 'none';

                // Force reflow
                void item.offsetWidth;

                // Assign new random animation
                const randomAnim = mobileAnim[Math.floor(Math.random() * mobileAnim.length)];
                const randomDelay = Math.random() * 0.4;
                item.style.animation = `${randomAnim} 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${randomDelay}s`;
            });
        }
    };

    closeLightboxBtn.addEventListener('click', closeLightbox);

    // Add event listener to the new mobile back button
    if (backLightboxBtn) {
        backLightboxBtn.addEventListener('click', closeLightbox);
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Final Surprise Logic
    const openGiftBtn = document.getElementById('open-gift-btn');
    const unlockSection = document.getElementById('unlock-section');
    const unlockBtn = document.getElementById('unlock-btn');
    const unlockCode = document.getElementById('unlock-code');
    const giftBox = document.getElementById('gift-reveal');
    const errorMsg = document.getElementById('error-msg');

    if (openGiftBtn && unlockSection) {
        openGiftBtn.addEventListener('click', () => {
            openGiftBtn.textContent = 'Opening Your Gift... ✨';
            openGiftBtn.style.pointerEvents = 'none';
            openGiftBtn.style.animation = 'none'; // stop floating

            // Wait briefly before revealing the lock challenge
            setTimeout(() => {
                const initialText = document.getElementById('initial-surprise-text');
                if (initialText) initialText.style.display = 'none';
                openGiftBtn.style.display = 'none';
                unlockSection.style.display = 'flex';
                unlockSection.style.animation = 'fadeInUp 0.8s ease forwards';
            }, 1000);
        });
    }

    if (unlockBtn && giftBox) {
        unlockBtn.addEventListener('click', () => {
            let val = unlockCode.value.toLowerCase().trim();
            if (val === "budhi24042004") {
                errorMsg.style.display = 'none';

                const customAlert = document.getElementById('custom-alert-overlay');
                const customAlertBtn = document.getElementById('custom-alert-btn');
                
                customAlert.classList.add('show');
                
                customAlertBtn.addEventListener('click', () => {
                    customAlert.classList.remove('show');
                    
                    // Show gift and hide form elegantly
                    unlockSection.style.display = 'none';
                    giftBox.classList.add('active'); // trigger reveal
                    
                    // Smooth scroll down to the final message
                    setTimeout(() => {
                        giftBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                }, { once: true });
            } else {
                errorMsg.style.display = 'block';
                // Trigger shake
                errorMsg.style.animation = 'none';
                void errorMsg.offsetWidth; // force reflow
                errorMsg.style.animation = 'shake 0.4s ease';
            }
        });

        // Also trigger on enter key
        if (unlockCode) {
            unlockCode.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') unlockBtn.click();
            });
        }
    }

    // PIN Reveal Logic
    const revealPinBtn = document.getElementById('reveal-pin-btn');
    const hiddenPin = document.getElementById('hidden-pin');

    if (revealPinBtn && hiddenPin) {
        revealPinBtn.addEventListener('click', () => {
            // Lock to Unlock Animation
            revealPinBtn.innerHTML = '🔓✨...';
            revealPinBtn.style.pointerEvents = 'none';

            setTimeout(() => {
                revealPinBtn.style.display = 'none';
                hiddenPin.innerHTML = 'Thought I’ll make you call me? 😄<br><br><b>PIN:</b> 472704 ❤️';
                hiddenPin.classList.add('show');
            }, 800);
        });
    }
});
