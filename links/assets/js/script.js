document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabLayers = document.querySelectorAll('.item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabLayers.forEach(layer => layer.classList.remove('active-layer'));
            button.classList.add('active');
            
            const targetId = button.getAttribute('data-target');
            const targetLayer = document.getElementById(targetId);
            if(targetLayer) {
                targetLayer.classList.add('active-layer');
            }
        });
    });

    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = hamburgerBtn.querySelector('i');

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.remove('bi-list');
            menuIcon.classList.add('bi-x-lg');
        } else {
            menuIcon.classList.remove('bi-x-lg');
            menuIcon.classList.add('bi-list');
        }
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('bi-x-lg');
            menuIcon.classList.add('bi-list');
        });
    });
});