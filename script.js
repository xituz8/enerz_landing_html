/**
 * ENERZ Landing Page - JavaScript
 * Lightweight, performant interactions
 */

(function() {
    'use strict';

    // DOM Elements
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const menuOverlay = document.getElementById('menuOverlay');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    const billingToggle = document.getElementById('billingToggle');
    const pricingCta = document.getElementById('pricingCta');
    const faqItems = document.querySelectorAll('.faq-item');
    const navbar = document.getElementById('navbar');

    // Payment URLs
    const PAYMENT_URLS = {
        monthly: 'https://pay.hub.la/azRo1diUh1n6VGO5CqEj',
        annual: 'https://pay.hub.la/3CDrj6FhJOKMSQ24dsIW'
    };

    // State
    let isAnnual = false;

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
    // BILLING TOGGLE
    // ====================================
    function updateBilling(annual) {
        isAnnual = annual;

        // Update toggle state
        billingToggle?.classList.toggle('annual', annual);

        // Update labels
        document.querySelectorAll('.toggle-label').forEach(label => {
            const isActiveLabel = (label.dataset.billing === 'annual') === annual;
            label.classList.toggle('active', isActiveLabel);
        });

        // Update prices
        const monthlyPrice = document.querySelector('.monthly-price');
        const annualPrice = document.querySelector('.annual-price');
        const annualOnly = document.querySelector('.annual-only');

        if (monthlyPrice && annualPrice) {
            monthlyPrice.classList.toggle('hidden', annual);
            annualPrice.classList.toggle('hidden', !annual);
        }

        if (annualOnly) {
            annualOnly.classList.toggle('hidden', !annual);
        }

        // Update CTA link
        if (pricingCta) {
            pricingCta.href = annual ? PAYMENT_URLS.annual : PAYMENT_URLS.monthly;
        }
    }

    billingToggle?.addEventListener('click', () => {
        updateBilling(!isAnnual);
    });

    // Initialize with monthly selected
    updateBilling(false);

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
        anchor.addEventListener('click', function(e) {
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
    // NAVBAR SCROLL EFFECT
    // ====================================
    let lastScroll = 0;
    let ticking = false;

    function updateNavbar() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
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

})();
