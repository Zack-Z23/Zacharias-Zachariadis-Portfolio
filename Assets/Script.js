// Hero Section Fade-in on Page Load
window.addEventListener('load', () => {
    const heroSection = document.querySelector('.hero');
    heroSection.style.opacity = 1;
});
// Toggle the menu on and off when clicking the hamburger icon
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');  // Toggle the nav menu visibility
    hamburger.classList.toggle('open');  // Change hamburger icon to "X"
}
