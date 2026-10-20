const track = document.querySelector('.carousel-track');

if (track) {
    const cards = [...track.querySelectorAll('.dish-card')];
    const previous = document.querySelector('.carousel-prev');
    const next = document.querySelector('.carousel-next');
    const status = document.querySelector('.carousel-status');
    const mobile = window.matchMedia('(max-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let scrollFrame;

    function offset(element) {
        return element.getBoundingClientRect().left
            - track.getBoundingClientRect().left + track.scrollLeft;
    }

    function currentIndex() {
        let nearest = 0;
        cards.forEach((card, index) => {
            if (Math.abs(offset(card) - 16 - track.scrollLeft)
                < Math.abs(offset(cards[nearest]) - 16 - track.scrollLeft)) {
                nearest = index;
            }
        });
        return nearest;
    }

    function updateControls() {
        if (!mobile.matches) return;
        const index = currentIndex();
        previous.disabled = index === 0;
        next.disabled = index === cards.length - 1;
        const message = `Plato ${index + 1} de ${cards.length}`;
        if (status.textContent !== message) status.textContent = message;
    }

    function goTo(index) {
        const card = cards[Math.max(0, Math.min(index, cards.length - 1))];
        track.scrollTo({
            left: offset(card) - 16,
            behavior: reducedMotion.matches ? 'instant' : 'smooth'
        });
    }

    previous.addEventListener('click', () => goTo(currentIndex() - 1));
    next.addEventListener('click', () => goTo(currentIndex() + 1));
    track.addEventListener('scroll', () => {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = requestAnimationFrame(updateControls);
    }, { passive: true });
    track.addEventListener('keydown', event => {
        if (!mobile.matches || event.target !== track) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            goTo(currentIndex() + (event.key === 'ArrowRight' ? 1 : -1));
        }
    });
    window.addEventListener('resize', updateControls);

    document.querySelectorAll('.carousel-arrow').forEach(arrow => {
        arrow.addEventListener('click', event => {
            event.preventDefault();
            const target = document.querySelector(arrow.getAttribute('href'));
            if (target) {
                track.scrollTo({
                    left: offset(target),
                    behavior: reducedMotion.matches ? 'instant' : 'smooth'
                });
            }
        });
    });
    updateControls();
}
