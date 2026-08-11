'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);

    // Site load entrance animation for Navbar
    useEffect(() => {
        const root = navRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.navbar-pill',
                { y: -60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
            );
        }, root);

        return () => ctx.revert();
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            <header className="navbar-floating-wrapper" ref={navRef}>
                <nav className="navbar-pill">
                    {/* Left: Organisers Logos */}
                    <div className="navbar-pill__logos">
                        <img
                            src="/assets/logos/cu.png"
                            alt="Chandigarh University"
                            className="navbar-pill__logo-img navbar-pill__logo-cu"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span className="navbar-pill__logo-divider" />
                        <img
                            src="/assets/logos/adc-cu.png"
                            alt="Alexa Developers Community"
                            className="navbar-pill__logo-img navbar-pill__logo-adc"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span className="navbar-pill__logo-divider" />
                        <img
                            src="/assets/logos/gfg-cu.png"
                            alt="GeeksforGeeks CU"
                            className="navbar-pill__logo-img navbar-pill__logo-gfg"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>

                    {/* Right: Nav Links + Register Button */}
                    <div className="navbar-pill__links desktop-only">
                        <a href="#" className="navbar-pill__link navbar-pill__link--active">Home</a>
                        <a href="#about" className="navbar-pill__link">About</a>
                        <a href="#rounds" className="navbar-pill__link">Rounds</a>
                        <a href="#schedule" className="navbar-pill__link">Timeline</a>
                        <a href="#prizes" className="navbar-pill__link">Prizes</a>
                        <a href="#faq" className="navbar-pill__link">FAQ</a>
                        <a href="#contact" className="navbar-pill__cta">
                            Contact Us
                        </a>
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        className="mobile-hamburger mobile-only"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`} />
                        <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`} />
                        <div className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`} />
                    </button>
                </nav>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
                {/* Top Bar with Logos Pill & Close Button */}
                <div className="mobile-menu-header">
                    <div className="mobile-menu-logos-top">
                        <img src="/assets/logos/cu.png" alt="CU" className="mobile-logo-cu" />
                        <span className="mobile-logo-divider" />
                        <img src="/assets/logos/adc-cu.png" alt="ADC" className="mobile-logo-adc" />
                        <span className="mobile-logo-divider" />
                        <img src="/assets/logos/gfg-cu.png" alt="GFG" className="mobile-logo-gfg" />
                    </div>
                    <button
                        className="mobile-menu-close-btn"
                        onClick={closeMobileMenu}
                        aria-label="Close menu"
                    >
                        ✕
                    </button>
                </div>

                {/* Mobile Navigation Links */}
                <div className="mobile-menu-content">
                    <a href="#" onClick={closeMobileMenu}>Home</a>
                    <a href="#about" onClick={closeMobileMenu}>About</a>
                    <a href="#rounds" onClick={closeMobileMenu}>Rounds</a>
                    <a href="#schedule" onClick={closeMobileMenu}>Schedule</a>
                    <a href="#prizes" onClick={closeMobileMenu}>Prizes</a>
                    <a href="#faq" onClick={closeMobileMenu}>FAQ</a>
                    <a href="#contact" className="mobile-register-btn" onClick={closeMobileMenu}>Contact Us</a>
                </div>
            </div>
        </>
    );
}
