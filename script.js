/**
 * ENERZ Landing Page - JavaScript
 * Lightweight, performant interactions
 */

(function () {
    'use strict';

    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    const faqItems = document.querySelectorAll('.faq-item');
    const navbar = document.getElementById('navbar');

    // ====================================
    // MOBILE MENU
    // ====================================
    function openMenu() {
        mobileMenu?.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu?.classList.remove('open');
        document.body.style.overflow = '';
    }

    menuToggle?.addEventListener('click', openMenu);
    menuClose?.addEventListener('click', closeMenu);
    menuOverlay?.addEventListener('click', closeMenu);

    // Close menu on link click
    mobileMenuLinks?.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
            closeMenu();
        }
    });

    // ====================================
    // FAQ ACCORDION
    // ====================================
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question?.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('open');
                }
            });

            // Toggle current item
            item.classList.toggle('open', !isOpen);
        });
    });

    // ====================================
    // SMOOTH SCROLL
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();

                const navHeight = navbar?.offsetHeight || 64;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====================================
    // NAVBAR SCROLL EFFECT & PROGRESS LINE
    // ====================================
    let lastScroll = 0;
    let ticking = false;
    const progressLine = document.querySelector('.scroll-progress-line line');
    const logo = document.querySelector('.logo');
    const navCta = document.querySelector('.nav-cta');

    function updateProgressLinePosition() {
        if (!progressLine || !logo || !navbar) return;

        const navbarRect = navbar.getBoundingClientRect();
        const logoRect = logo.getBoundingClientRect();

        // Check if we're on mobile (nav-cta is hidden)
        const isNavCtaVisible = navCta && window.getComputedStyle(navCta).display !== 'none';

        let startX, endX;

        if (isNavCtaVisible) {
            // Desktop: from logo to nav-cta
            const endRect = navCta.getBoundingClientRect();
            startX = logoRect.right - navbarRect.left;
            endX = endRect.left - navbarRect.left;
        } else {
            // Mobile: full width of navbar (centered)
            startX = 0;
            endX = navbarRect.width;
        }

        const lineLength = endX - startX;

        // Update line position
        progressLine.setAttribute('x1', startX);
        progressLine.setAttribute('x2', endX);

        // Update stroke-dasharray to match line length
        progressLine.setAttribute('stroke-dasharray', lineLength);
        progressLine.setAttribute('stroke-dashoffset', lineLength);
    }

    function updateNavbar() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        // Update scroll progress line
        if (progressLine && logo && navbar) {
            const navbarRect = navbar.getBoundingClientRect();
            const logoRect = logo.getBoundingClientRect();

            // Check if we're on mobile (nav-cta is hidden)
            const isNavCtaVisible = navCta && window.getComputedStyle(navCta).display !== 'none';

            let startX, endX;

            if (isNavCtaVisible) {
                // Desktop: from logo to nav-cta
                const endRect = navCta.getBoundingClientRect();
                startX = logoRect.right - navbarRect.left;
                endX = endRect.left - navbarRect.left;
            } else {
                // Mobile: full width of navbar
                startX = 0;
                endX = navbarRect.width;
            }

            const lineLength = endX - startX;

            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollableHeight = documentHeight - windowHeight;
            const scrollPercentage = Math.min(currentScroll / scrollableHeight, 1);

            // Animate from full offset (line hidden) to 0 (fully visible)
            const dashOffset = lineLength - (scrollPercentage * lineLength);
            progressLine.style.strokeDashoffset = dashOffset;

            // Calculate current line end position
            const currentLineEnd = startX + (scrollPercentage * lineLength);

            // Update nav links color based on line position (only on desktop)
            if (isNavCtaVisible) {
                const navLinks = document.querySelectorAll('.nav-links a');
                navLinks.forEach(link => {
                    const linkRect = link.getBoundingClientRect();
                    const linkCenter = linkRect.left + (linkRect.width / 2) - navbarRect.left;

                    // If line has passed the center of this link, make it yellow
                    if (currentLineEnd >= linkCenter) {
                        link.classList.add('crossed');
                    } else {
                        link.classList.remove('crossed');
                    }
                });

                // Also check the CTA button
                const endRect = navCta.getBoundingClientRect();
                const ctaCenter = endRect.left + (endRect.width / 2) - navbarRect.left;
                if (currentLineEnd >= ctaCenter) {
                    navCta.classList.add('crossed');
                } else {
                    navCta.classList.remove('crossed');
                }
            }
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });

    // Initialize progress line on load
    if (progressLine && logo && navCta) {
        updateProgressLinePosition();
        updateNavbar();

        // Recalculate on window resize
        window.addEventListener('resize', () => {
            updateProgressLinePosition();
            updateNavbar();
        });
    }

    // ====================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ====================================
    if ('IntersectionObserver' in window) {
        const animateOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for scroll animations
        document.querySelectorAll('.feature-card, .benefit-card, .faq-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            animateOnScroll.observe(el);
        });
    }

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ====================================
    // VIDEO LAZY LOADING
    // ====================================
    const video = document.querySelector('.video-container video');
    if (video && 'IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(() => {
                        // Autoplay failed, user interaction required
                    });
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.25 });

        videoObserver.observe(video);
    }



    // ====================================
    // TOUCH DEVICE DETECTION
    // ====================================
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }

    // ====================================
    // PREVENT ZOOM ON INPUT FOCUS (iOS)
    // ====================================
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    // ====================================
    // CONTENT PROTECTION
    // ====================================
    // Disable right-click on images, videos, and video containers
    document.addEventListener('contextmenu', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO' || e.target.closest('.video-container')) {
            e.preventDefault();
        }
    });

    // Disable drag and drop on images and videos
    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
        }
    });

})();
