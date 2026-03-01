/*
 * LongXia Group Official Website
 * Interactive functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close menu on window resize (if resized to desktop)
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.style.display = '';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768 && navLinks.style.display === 'flex') {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // Contact form handling (front‑end only)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Simple validation
            const name = this.querySelector('input[type="text"]').value.trim();
            const email = this.querySelector('input[type="email"]').value.trim();
            const message = this.querySelector('textarea').value.trim();

            if (!name || !email || !message) {
                alert('Please fill all required fields.');
                return;
            }

            // In a real implementation, this would send to a backend
            // For now, just show a confirmation message
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate network delay
            setTimeout(() => {
                alert('Thank you for your message. The LongXia Group team will review your inquiry and respond promptly.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }

    // Language switcher (placeholder)
    const languageSpans = document.querySelectorAll('.language-switch span');
    languageSpans.forEach(span => {
        span.addEventListener('click', function() {
            if (!this.classList.contains('lang-active') && !this.textContent.includes('/')) {
                // Switch active language
                document.querySelector('.lang-active').classList.remove('lang-active');
                this.classList.add('lang-active');
                // In a real implementation, this would trigger i18n change
                console.log('Language switched to:', this.textContent);
            }
        });
    });

    // Add subtle animation to platform diagram layers on scroll
    const diagramLayers = document.querySelectorAll('.diagram-layer');
    if (diagramLayers.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });

        diagramLayers.forEach((layer, index) => {
            layer.style.opacity = '0';
            layer.style.transform = 'translateX(20px)';
            layer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            layer.style.transitionDelay = (index * 0.1) + 's';
            observer.observe(layer);
        });
    }

    // Update copyright year
    const yearSpan = document.querySelector('#currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Console greeting (subtle branding)
    console.log('%c龙厦集团 | LongXia Group', 'color: #00adb5; font-size: 18px; font-weight: bold;');
    console.log('%cAbsolute rationality. Extreme loyalty.', 'color: #8a8a8a;');
});

// Add a simple parallax effect to hero visual on scroll
window.addEventListener('scroll', function() {
    const visual = document.querySelector('.visual-placeholder');
    if (visual) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        visual.style.transform = `translateY(${rate}px)`;
    }
});