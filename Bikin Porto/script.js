// Create floating particles
function createFloatingParticles() {
    const animatedBg = document.querySelector('.animated-bg');

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 10 + 10 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        animatedBg.appendChild(particle);
    }
}

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Fade in animation on scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Project functions
function openProject(projectName) {
    const messages = {
        'cybershield': 'Opening CyberShield Pro - Advanced cybersecurity platform demo...',
        'neurotrade': 'Opening NeuroTrade AI - Intelligent trading platform demo...',
        'metaspace': 'Opening MetaSpace Hub - Virtual reality collaboration demo...'
    };
    alert(messages[projectName] || 'Opening project demo...');
}

function openGithub(projectName) {
    alert(`Opening GitHub repository for ${projectName}...`);
}

// Social media functions
function openSocial(platform) {
    const urls = {
        github: 'https://github.com/dymasyoga',
        linkedin: 'https://linkedin.com/in/dymasyoga',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
    };
    window.open(urls[platform], '_blank');
}

// Contact form
function sendMessage(event) {
    event.preventDefault();

    // Show success message
    const button = event.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;

    button.innerHTML = '<i class="fas fa-check mr-2"></i>Pesan Terkirim!';
    button.style.background = 'linear-gradient(135deg, #10b981, #059669)';

    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
        event.target.reset();
    }, 2000);
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');

    if (mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        icon.className = 'fas fa-bars text-lg';
    } else {
        mobileMenu.classList.add('active');
        icon.className = 'fas fa-times text-lg';
    }
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const icon = document.getElementById('mobile-menu-icon');

    mobileMenu.classList.remove('active');
    icon.className = 'fas fa-bars text-lg';
}

// Initialize everything
window.addEventListener('load', () => {
    createFloatingParticles();
    handleScrollAnimations();
    initializeTheme();

    // Add theme button event listener
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // Animate counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.counter').closest('section');
    if (statsSection) {
        observer.observe(statsSection);
    }
});

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    const icon = themeBtn.querySelector('i');

    if (body.classList.contains('light-theme')) {
        // Switch to dark theme
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to light theme
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'light');
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    const icon = themeBtn.querySelector('i');

    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        icon.className = 'fas fa-sun';
    } else {
        body.classList.add('dark-theme');
        icon.className = 'fas fa-moon';
    }
}

// Handle scroll events
window.addEventListener('scroll', () => {
    handleScrollAnimations();
});
