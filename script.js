window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
    }
});

// Placeholder script for future interactive additions or 3D Spline asset handling
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio initialized.');

    // Add micro-animations or hover effects here if necessary.
    // The CSS already handles the fadeUp animations, but JavaScript can 
    // be used for scroll-linked animations or cursor effects.

    const ctaButtons = document.querySelectorAll('.btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Ripple or feedback effect
            console.log(`Clicked ${e.target.innerText}`);
        });
    });

    // --- My Work Carousel Logic ---
    const cards = document.querySelectorAll('.card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const carouselCards = document.querySelector('.carousel-cards');

    if (cards.length > 0) {
        let currentIndex = 0;
        const totalCards = cards.length;

        const updateCards = () => {
            cards.forEach((card, index) => {
                // Clear state classes
                card.classList.remove('state-0', 'state-1', 'state--1', 'state-hidden');

                let diff = (index - currentIndex) % totalCards;
                if (diff < 0) diff += totalCards;

                if (diff === 0) {
                    card.classList.add('state-0');
                } else if (diff === 1) {
                    card.classList.add('state-1');
                } else if (diff === totalCards - 1) {
                    card.classList.add('state--1');
                } else {
                    card.classList.add('state-hidden');
                }
            });
        };

        const goNext = () => {
            currentIndex = (currentIndex + 1) % totalCards;
            updateCards();
        };

        const goPrev = () => {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCards();
        };

        if (nextBtn) nextBtn.addEventListener('click', goNext);
        if (prevBtn) prevBtn.addEventListener('click', goPrev);

        // Click on side cards to bring them to front
        cards.forEach((card, index) => {
            card.addEventListener('click', () => {
                if (currentIndex !== index) {
                    currentIndex = index;
                    updateCards();
                }
            });
        });

        // Swipe logic
        let startX = 0;
        let isDragging = false;

        const handleDragStart = (e) => {
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            isDragging = true;
            if (carouselCards) carouselCards.style.cursor = 'grabbing';
        };

        const handleDragEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            if (carouselCards) carouselCards.style.cursor = 'grab';

            const endX = e.type.includes('mouse') ? e.pageX : e.changedTouches[0].clientX;
            const diffX = endX - startX;

            // Threshold for swipe
            if (diffX > 50) {
                goPrev();
            } else if (diffX < -50) {
                goNext();
            }
        };

        if (carouselCards) {
            carouselCards.addEventListener('mousedown', handleDragStart);
            carouselCards.addEventListener('touchstart', handleDragStart, { passive: true });

            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('touchend', handleDragEnd);
        }

        // Initialize Carousel
        updateCards();
    }

    // --- Image Modal Logic (Gallery) ---
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.querySelector('.close-modal');

    if (modal && modalImg) {
        const galleryItems = document.querySelectorAll('.bento-item img');

        const openModal = (src) => {
            modalImg.src = src;
            modal.style.display = 'flex';
            // Trigger reflow for transition
            modal.offsetHeight;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };

        const closeImageModal = () => {
            modal.classList.remove('show');
            setTimeout(() => {
                if (!modal.classList.contains('show')) {
                    modal.style.display = 'none';
                    modalImg.src = '';
                }
            }, 300); // Wait for CSS transition
            document.body.style.overflow = ''; // Restore scrolling
        };

        galleryItems.forEach(img => {
            img.addEventListener('click', function () {
                openModal(this.src);
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', closeImageModal);
        }

        // Close on clicking outside the image
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeImageModal();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeImageModal();
            }
        });
    }
});
