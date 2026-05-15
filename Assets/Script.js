
window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero');
    heroSection.style.opacity = 1;
});

document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.project-toggle');
    toggles.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.project-card');
            const expanded = card.classList.toggle('expanded');
            button.textContent = expanded ? 'Show less' : 'Learn more';
        });
    });
});

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');  
    hamburger.classList.toggle('open');  
}

