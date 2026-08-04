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

        // ② Start white (on-dark) — video is dark background
        if (navbar) { navbar.classList.add('on-dark'); navbar.classList.remove('on-light'); }

        const updateNavbarColor = () => {
            if (!navbar || !contentSection || !footerEl) return;
            const scrollPos = window.scrollY + navbar.offsetHeight / 2;
            const contentTop = contentSection.getBoundingClientRect().top + window.scrollY;

            const showreelSection = document.querySelector('#showreel-section');
            const showreelTop = showreelSection ? showreelSection.getBoundingClientRect().top + window.scrollY : Infinity;

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
            } else if (scrollPos >= showreelTop) {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            } else if (scrollPos >= contentTop) {
                navbar.classList.add('on-light'); navbar.classList.remove('on-dark');
            } else {
                navbar.classList.add('on-dark'); navbar.classList.remove('on-light');
            }
        };

        window.addEventListener('scroll', updateNavbarColor);
        updateNavbarColor();

        // Wiggle on logo and whatsapp (desktop only)
        const cleanups = [];
        const logoTruus = document.querySelector('.logo-truus');
        if (logoTruus && window.innerWidth > 768) cleanups.push(initWiggle(logoTruus, WIGGLE_CONFIG.logoTruus));

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

        // ─── Navbar Left (Work) Hover ───
        const navLeft = document.querySelector('.nav-left');
        const workBox = document.querySelector('.nav-work-box');

        if (navLeft && workBox) {
            const workInner = workBox.querySelector('.nav-popout-inner');
            const workItems = workInner ? Array.from(workInner.children) : [];

            gsap.set(workBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const boxRect = workBox.getBoundingClientRect();
            const navLeftRect = navLeft.getBoundingClientRect();

            const originX = (navLeftRect.left + navLeftRect.width / 2) - boxRect.left;
            const originY = 0; // scale from top
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

        // ─── Navbar Right (WhatsApp) Hover ───
        const navRight = document.querySelector('.nav-right');
        const waBox = document.querySelector('.nav-wa-box');
        const waSvgPath = document.querySelector('.nav-bar__whatsapp-svg path');

        if (navRight && waBox) {
            const waInner = waBox.querySelector('.nav-popout-inner');
            const waItems = waInner ? Array.from(waInner.children) : [];
            const waIcon = document.querySelector('.nav-bar__whatsapp-svg');

            // Temporarily show to measure both the box AND the WA icon center
            gsap.set(waBox, { visibility: 'visible', scale: 1, opacity: 1 });
            const waBoxRect = waBox.getBoundingClientRect();
            const waIconRect = waIcon ? waIcon.getBoundingClientRect() : waBoxRect;
            // Icon center relative to the box's own top-left
            const waOriginX = (waIconRect.left + waIconRect.width / 2) - waBoxRect.left;
            const waOriginY = (waIconRect.top + waIconRect.height / 2) - waBoxRect.top;
            const waOrigin = `${waOriginX}px ${waOriginY}px`;

            // Start collapsed, scaling FROM the WA icon center
            gsap.set(waBox, {
                visibility: 'hidden',
                scale: 0,
                opacity: 0,
                transformOrigin: waOrigin
            });
            gsap.set(waItems, { y: 10, opacity: 0 });

            const onEnterRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                showOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: '#0e6634ff', duration: 0.3 }); // Darker WA green

                gsap.set(waBox, { visibility: 'visible' });
                // Box grows out smoothly from the WA icon center
                gsap.fromTo(waBox,
                    { scale: 0, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out' }
                );
                // Items emerge while box is growing
                gsap.to(waItems, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power3.out', delay: 0.18 });
            };

            const onLeaveRight = () => {
                gsap.killTweensOf(waBox);
                gsap.killTweensOf(waItems);
                hideOverlay();
                if (waSvgPath) gsap.to(waSvgPath, { fill: 'currentColor', duration: 0.3 });

                // Items fade quickly
                gsap.to(waItems, { y: 10, opacity: 0, duration: 0.15, ease: 'power2.in' });
                // Box shrinks back into WA icon smoothly
                gsap.to(waBox, {
                    scale: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: 'expo.in',
                    delay: 0.05,
                    onComplete: () => gsap.set(waBox, { visibility: 'hidden' })
                });
            };

            navRight.addEventListener('mouseenter', onEnterRight);
            navRight.addEventListener('mouseleave', onLeaveRight);
            cleanups.push(() => {
                navRight.removeEventListener('mouseenter', onEnterRight);
                navRight.removeEventListener('mouseleave', onLeaveRight);
            });
        }

        // ─── Work Item: badge wiggle + image tilt on hover ───
        const workItems = document.querySelectorAll('.nav-work-item');
        workItems.forEach(item => {
            const badge = item.querySelector('.nav-work-badge');
            const img = item.querySelector('.nav-work-item__img');
            let wiggleTween;

            const onItemEnter = () => {
                // Wiggle badge intensity 2
                if (badge) {
                    gsap.set(badge, { transformOrigin: 'center center' });
                    wiggleTween = gsap.to(badge, { rotation: 5, duration: 0.15, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
                // Tilt image slightly right
                if (img) gsap.to(img, { rotation: 16, scale: 1.15, duration: 0.25, ease: 'power2.out' });
            };
            const onItemLeave = () => {
                if (wiggleTween) { wiggleTween.kill(); }
                if (badge) gsap.to(badge, { rotation: 0, duration: 0.3, ease: 'power2.out' });
                if (img) gsap.to(img, { rotation: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
            };
            item.addEventListener('mouseenter', onItemEnter);
            item.addEventListener('mouseleave', onItemLeave);
            cleanups.push(() => {
                item.removeEventListener('mouseenter', onItemEnter);
                item.removeEventListener('mouseleave', onItemLeave);
            });
        });

        // ─── All Our Work btn: wiggle intensity 4 (bubble handled by CursorBubble) ───
        const workBtn = document.querySelector('.nav-work-btn');
        if (workBtn) {
            let btnWiggle;
            const onBtnEnter = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnText) {
                    gsap.set(btnText, { transformOrigin: 'center center', display: 'inline-block' });
                    btnWiggle = gsap.to(btnText, { rotation: 4, duration: 0.12, repeat: -1, yoyo: true, ease: 'steps(1)' });
                }
            };
            const onBtnLeave = () => {
                const btnText = workBtn.querySelector('.nav-work-btn__text');
                if (btnWiggle) { btnWiggle.kill(); }
                if (btnText) gsap.to(btnText, { rotation: 0, duration: 0.3, ease: 'power2.out' });
            };
            workBtn.addEventListener('mouseenter', onBtnEnter);
            workBtn.addEventListener('mouseleave', onBtnLeave);
            cleanups.push(() => {
                workBtn.removeEventListener('mouseenter', onBtnEnter);
                workBtn.removeEventListener('mouseleave', onBtnLeave);
            });
        }

        return () => {
            window.removeEventListener('scroll', updateNavbarColor);
            cleanups.forEach(fn => fn && fn());
        };
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <div className="nav-overlay"></div>
            <nav className={`navbar ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} style={{ pointerEvents: 'none' }}>
                <div className="nav-left desktop-only" style={{ pointerEvents: 'auto' }}>
                    <div className="nav-hover-trigger">
                        <div className="logo-work-container" style={{ width: 'auto', height: 'auto' }}>
                            <button
                                className="logo-work-text"
                                aria-label="Explore Sections"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    background: 'rgba(15, 23, 42, 0.75)',
                                    backdropFilter: 'blur(12px)',
                                    WebkitBackdropFilter: 'blur(12px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    color: '#ffffff',
                                    padding: '10px 18px',
                                    borderRadius: '50px',
                                    fontSize: '0.95rem',
                                    fontWeight: 700,
                                    fontFamily: "'Epilogue', sans-serif",
                                    cursor: 'pointer',
                                    marginLeft: 0,
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                                <span>Explore Sections</span>
                            </button>
                        </div>

                        {/* Pop-out Box for Left Side */}
                        <div className="nav-popout nav-work-box" style={{ width: '220px' }}>
                            <div className="nav-popout-inner" style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                <a href="#about" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.15rem', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '8px' }}>About</a>
                                <a href="#theme" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.15rem', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '8px' }}>Themes</a>
                                <a href="#rounds" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.15rem', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '8px' }}>Rounds</a>
                                <a href="#schedule" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.15rem', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '8px' }}>Schedule</a>
                                <a href="#judging" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.15rem', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '8px' }}>Judging</a>
                                <a href="#faq" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.15rem', fontWeight: 600, borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '8px' }}>FAQ</a>
                                <a href="#sponsors" style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.15rem', fontWeight: 600 }}>Sponsors</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className="mobile-hamburger" onClick={toggleMobileMenu} style={{ pointerEvents: 'auto' }}>
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
