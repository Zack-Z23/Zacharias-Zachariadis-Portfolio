document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.project-toggle');
    toggles.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.project-card');
            const expanded = card.classList.toggle('expanded');
            button.setAttribute('aria-expanded', String(expanded));
            button.textContent = expanded ? 'Show less' : 'Learn more';
        });
    });

    const revealTargets = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealTargets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach((el, i) => {
            el.style.transitionDelay = `${Math.min(i % 5, 4) * 60}ms`;
            observer.observe(el);
        });
    } else {
        revealTargets.forEach(el => el.classList.add('is-visible'));
    }
});

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    navMenu.classList.toggle('active');
    hamburger.classList.toggle('open');
}
