// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-sun';
    } else {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-moon';
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            // Switch to light mode
            body.removeAttribute('data-theme');
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to dark mode
            body.setAttribute('data-theme', 'dark');
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
        
        // Add a subtle animation to the toggle button
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });

    // Smooth scrolling for any anchor links (if added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add hover effects for skill and game cards
    const cards = document.querySelectorAll('.skill-card, .game-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typewriter effect for code
    const codeElement = document.getElementById('typewriter-code');
    const codeText = `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}`;

    let currentIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function typeWriter() {
        if (isPaused) {
            setTimeout(typeWriter, 2000); // Pause for 2 seconds when complete
            isPaused = false;
            return;
        }

        if (!isDeleting && currentIndex < codeText.length) {
            // Typing
            const currentText = codeText.substring(0, currentIndex + 1);
            codeElement.textContent = currentText;
            codeElement.innerHTML += '<span class="cursor">|</span>';
            currentIndex++;
            setTimeout(typeWriter, Math.random() * 100 + 50); // Random typing speed
        } else if (!isDeleting && currentIndex === codeText.length) {
            // Finished typing, pause then start deleting
            isPaused = true;
            setTimeout(() => {
                isDeleting = true;
                typeWriter();
            }, 3000); // Pause for 3 seconds when complete
        } else if (isDeleting && currentIndex > 0) {
            // Deleting
            currentIndex--;
            const currentText = codeText.substring(0, currentIndex);
            codeElement.textContent = currentText;
            codeElement.innerHTML += '<span class="cursor">|</span>';
            setTimeout(typeWriter, 30); // Faster deletion
        } else if (isDeleting && currentIndex === 0) {
            // Finished deleting, start typing again
            isDeleting = false;
            setTimeout(typeWriter, 500); // Short pause before restarting
        }
    }

    // Start the typewriter effect after a delay
    setTimeout(() => {
        typeWriter();
    }, 1500);

    // Add particle effect to hero section (optional enhancement)
    function createParticle() {
        const hero = document.querySelector('.hero');
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'var(--accent-primary)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.6';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.pointerEvents = 'none';
        particle.style.animation = 'float-up 4s linear forwards';
        
        hero.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 4000);
    }

    // Add CSS for particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create particles periodically
    setInterval(createParticle, 2000);

    // Add email click tracking (optional)
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function() {
            console.log('Email link clicked');
            // You can add analytics tracking here if needed
        });
    }

    // Add social link click tracking (optional)
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log('Social link clicked:', this.href);
            // You can add analytics tracking here if needed
        });
    });

    // Performance optimization: Debounce scroll events
    let ticking = false;
    function updateOnScroll() {
        // Add any scroll-based animations here
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Toggle theme with Ctrl/Cmd + D
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            themeToggle.click();
        }
    });

    console.log('OpticsValley website loaded successfully! 🚀');
});
