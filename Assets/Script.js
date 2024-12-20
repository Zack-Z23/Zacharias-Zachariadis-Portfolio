
window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero');
    heroSection.style.opacity = 1;
});

function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');  
    hamburger.classList.toggle('open');  
}
