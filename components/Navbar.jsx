'use client';

import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { WIGGLE_CONFIG } from '@/lib/data';

function initWiggle(element, intensity) {
    const target = element.querySelector('[data-wiggle-target]') || element;
    gsap.set(target, { transformOrigin: 'center center' });
    let tween;
    const onEnter = () => {
        tween = gsap.to(target, { rotation: intensity, duration: 0.17, repeat: -1, yoyo: true, ease: 'steps(1)' });
    };
    const onLeave = () => {
        if (tween) { tween.kill(); gsap.to(target, { rotation: 0, duration: 0.3, ease: 'power2.out' }); }
    };
    element.addEventListener('mouseenter', onEnter);
    element.addEventListener('mouseleave', onLeave);
    return () => {
        element.removeEventListener('mouseenter', onEnter);
        element.removeEventListener('mouseleave', onLeave);
    };
}

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        const contentSection = document.querySelector('.content-section');
        const footerEl = document.querySelector('.main-footer');

        if (navbar) { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const serviceCardsSection = document.querySelector('.service-cards-wrapper');
            const serviceCardsTop = serviceCardsSection ? serviceCardsSection.getBoundingClientRect().top + window.scrollY : Infinity;

            const doubleMarquee = document.querySelector('.Double-marquee');
            const doubleMarqueeTop = doubleMarquee ? doubleMarquee.getBoundingClientRect().top + window.scrollY : Infinity;
            const footerTop = footerEl.getBoundingClientRect().top + window.scrollY;

            if (scrollPos >= footerTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= doubleMarqueeTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= serviceCardsTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo (desktop only)
        const cleanups = [];
        const logoTruus = document.querySelector('.logo-truus');
        if (logoTruus && window.innerWidth > 768) {
            cleanups.push(initWiggle(logoTruus, WIGGLE_CONFIG.logoTruus));
        }

        // Desktop Hover logic
        if (window.innerWidth > 768) {
            const overlay = document.querySelector('.nav-overlay');
            if (overlay) {
                gsap.set(overlay, { opacity: 0, visibility: 'hidden' });
            }
            const showOverlay = () => {
                if (overlay) {
                    gsap.set(overlay, { visibility: 'visible' });
                    gsap.to(overlay, { opacity: 1, duration: 0.35, ease: 'power2.out' });
                }
            };
            const hideOverlay = () => {
                if (overlay) {
                    gsap.to(overlay, { opacity: 0, duration: 0.3, ease: 'power2.in', onComplete: () => gsap.set(overlay, { visibility: 'hidden' }) });
                }
            };

            const navLeft = document.querySelector('.nav-left');
            const workBox = document.querySelector('.nav-work-box');

            if (navLeft && workBox) {
                const workInner = workBox.querySelector('.nav-popout-inner');
                const workItems = workInner ? Array.from(workInner.children) : [];

                gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
                const boxRect = workBox.getBoundingClientRect();
                const navLeftRect = navLeft.getBoundingClientRect();

                const originX = (navLeftRect.left + navLeftRect.width / 2) - boxRect.left;
                const originY = 0; 
                const workOrigin = `${originX}px ${originY}px`;

                gsap.set(workBox, {
                    visibility: 'hidden',
                    scale: 0,
                    opacity: 0,
                    transformOrigin: workOrigin
                });
                gsap.set(workItems, { y: 10, opacity: 0 });

                const onEnterLeft = () => {
                    gsap.killTweensOf(workBox);
                    gsap.killTweensOf(workItems);
                    showOverlay();

                    gsap.set(workBox, { visibility: 'visible' });
                    gsap.fromTo(workBox,
                        { scale: 0, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                    );
                    gsap.to(workItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
                };

                const onLeaveLeft = () => {
                    gsap.killTweensOf(workBox);
                    gsap.killTweensOf(workItems);
                    hideOverlay();

                    gsap.to(workItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                    gsap.to(workBox, {
                        scale: 0,
                        opacity: 0,
                        duration: 0.3,
                        ease: 'expo.in',
                        delay: 0.05,
                        onComplete: () => gsap.set(workBox, { visibility: 'hidden' })
                    });
                };

                navLeft.addEventListener('mouseenter', onEnterLeft);
                navLeft.addEventListener('mouseleave', onLeaveLeft);
                cleanups.push(() => {
                    navLeft.removeEventListener('mouseenter', onEnterLeft);
                    navLeft.removeEventListener('mouseleave', onLeaveLeft);
                });
            }
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className={`navbar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <div className="nav-left desktop-only">
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container">
                            <span className="logo-work-text" style={{ fontSize: '1.2rem', fontWeight: 600 }}>Explore Sections</span>
                        </div>

                        <div className="nav-popout nav-work-box" style={{ width: '220px' }}>
                            <div className="nav-popout-inner" style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '80vh', overflowY: 'auto' }}>
                                <a href="#about" className="nav-popout-link">About</a>
                                <a href="#theme" className="nav-popout-link">Themes</a>
                                <a href="#rounds" className="nav-popout-link">Rounds</a>
                                <a href="#schedule" className="nav-popout-link">Schedule</a>
                                <a href="#judging" className="nav-popout-link">Judging</a>
                                <a href="#prizes" className="nav-popout-link">Prizes</a>
                                <a href="#faq" className="nav-popout-link">FAQ</a>
                                <a href="#sponsors" className="nav-popout-link" style={{ borderBottom: 'none' }}>Sponsors</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="nav-center">
                    <h1 className="logo-truus" style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0, whiteSpace: 'nowrap' }}>BHARAT BUILDATHON</h1>
                </div>

                <div className="nav-right desktop-only">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdFxoWH_VBfuiZ3l421pqWCBLbH496XMPEk8RfkIDD2qr7hkw/viewform" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', background: 'var(--color-saffron)', color: 'var(--color-white)', padding: '10px 20px', borderRadius: '50px', fontWeight: 600, fontSize: '1.1rem' }}>
                        Register Now
                    </a>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="mobile-hamburger" onClick={toggleMobileMenu}>
                    <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                    <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                    <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-menu-logos">
                    <div className="mobile-menu-logos-top">
                        <img src="/assets/CU Logo red &white.png" alt="CU" />
                        <img src="/assets/Alexa Developers Community White.png" alt="ADC" />
                        <img src="/assets/GfG Horizontal Combination Mark (Dark Mode)@2x.png" alt="GFG" />
                    </div>
                </div>

                <div style={{ width: '100%', paddingRight: '30px', display: 'flex', justifyContent: 'flex-end', marginBottom: '30px' }}>
                    <div className="mobile-menu-close" onClick={(e) => {
                        const el = e.currentTarget;
                        el.style.transform = 'rotate(90deg) scale(0.8)';
                        setTimeout(() => {
                            closeMobileMenu();
                            setTimeout(() => { el.style.transform = 'none'; }, 300);
                        }, 150);
                    }} style={{ fontSize: '2.5rem', cursor: 'pointer', color: 'var(--color-white)', zIndex: 1002, transition: 'transform 0.15s ease-in-out' }}>✕</div>
                </div>

                <div className="mobile-menu-content">
                    <a href="#about" onClick={closeMobileMenu}>About</a>
                    <a href="#theme" onClick={closeMobileMenu}>Themes</a>
                    <a href="#rounds" onClick={closeMobileMenu}>Rounds</a>
                    <a href="#schedule" onClick={closeMobileMenu}>Schedule</a>
                    <a href="#judging" onClick={closeMobileMenu}>Judging</a>
                    <a href="#prizes" onClick={closeMobileMenu}>Prizes</a>
                    <a href="#faq" onClick={closeMobileMenu}>FAQ</a>
                    <a href="#sponsors" onClick={closeMobileMenu}>Sponsors</a>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSdFxoWH_VBfuiZ3l421pqWCBLbH496XMPEk8RfkIDD2qr7hkw/viewform" target="_blank" rel="noopener noreferrer" className="mobile-register-btn" onClick={closeMobileMenu}>Register Now</a>
                </div>
            </div>
        </>
    );
}
