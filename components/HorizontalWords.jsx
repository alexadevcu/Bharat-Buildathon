'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/horizontal-words.css';

gsap.registerPlugin(ScrollTrigger);

const NAVY = '#1B2A4A';

const HorizontalWords = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Mobile: no GSAP at all — pure CSS, no pin, no scroll-jacking
        if (window.innerWidth <= 768) return;

        const ctx = gsap.context(() => {
            const container = sectionRef.current;
            const textRef = container.querySelector('.horizontal-words__relative');
            const letters = container.querySelectorAll('.letter');
            const stickers = container.querySelectorAll('.horizontal-words__sticker');
            const arrows = container.querySelectorAll('.horizontal-words__arrow-svg path, .horizontal-words__arrow-end-svg path');

            const scrollTween = gsap.fromTo(textRef, {
                xPercent: 50
            }, {
                xPercent: -40,
                ease: 'none',
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=3000",
                    scrub: 1,
                    pin: true,
                    onRefresh() {
                        const spacer = container.closest('.pin-spacer') || container.parentElement;
                        if (spacer && spacer !== document.body) spacer.style.backgroundColor = NAVY;
                    }
                }
            });

            letters.forEach((letter) => {
                gsap.from(letter, {
                    yPercent: (Math.random() - 0.5) * 500,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: letter,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 10%',
                        scrub: 0.5
                    }
                });
            });

            stickers.forEach((sticker) => {
                gsap.from(sticker, {
                    scale: 0,
                    yPercent: (Math.random() - 0.5) * 400,
                    rotation: (Math.random() - 0.5) * 60,
                    ease: "elastic.out(1.2, 1)",
                    scrollTrigger: {
                        trigger: sticker,
                        containerAnimation: scrollTween,
                        start: 'left 90%',
                        end: 'left 10%',
                        scrub: 0.5
                    }
                });
            });

            arrows.forEach((arrowPath) => {
                if (arrowPath.getTotalLength) {
                    const pathLen = arrowPath.getTotalLength();
                    gsap.set(arrowPath, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                    gsap.to(arrowPath, {
                        strokeDashoffset: 0,
                        duration: 1,
                        scrollTrigger: {
                            trigger: arrowPath.parentElement,
                            containerAnimation: scrollTween,
                            start: 'left 90%',
                            end: 'left 30%',
                            scrub: 0.5
                        }
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="horizontal-words-section content-section">
            {/* Desktop: animated scrolling text */}
            <div className="horizontal-words__relative desktop-hw-content">
                <div className="horizontal-words__sticker-svg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 386 127" fill="none" className="horizontal-words__arrow-svg">
                        <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L356.5 105.5" stroke="var(--color-saffron)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M2 123C9 35.9999 84.5 17 124 25.9999C217.764 47.3635 207 115 177.5 123C105.777 142.45 110.737 1.99991 232.5 2C310.5 2.00006 366.5 79 376 118L384 97" stroke="var(--color-saffron)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <img src="/assets/Card-Sticker SVG/sticker-smiley.svg" className="horizontal-words__sticker" style={{ width: '120px', left: '20%', top: '-20%', position: 'absolute' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <img src="/assets/Card-Sticker SVG/sticker-camera.svg" className="horizontal-words__sticker" style={{ width: '100px', left: '50%', top: '100%', position: 'absolute' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <img src="/assets/Card-Sticker SVG/sticker-phone.svg" className="horizontal-words__sticker" style={{ width: '110px', left: '80%', top: '-40%', position: 'absolute' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 140 127" fill="none" className="horizontal-words__arrow-end-svg" style={{ left: '100%', top: '0', position: 'absolute' }}>
                        <path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.437 125.078L99.6875 107.891" stroke="var(--color-saffron)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        <path d="M2.03125 2.42188C100.469 2.42188 130.156 52.4219 118.438 125.078L137.969 110.234" stroke="var(--color-saffron)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </div>

                <h2 className="display horizontal-words__h2" aria-label="IDEATE PITCH WIN" style={{ display: 'flex', gap: '40px', alignItems: 'center', whiteSpace: 'nowrap' }}>
                    <div style={{ display: 'flex' }}>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>I</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>D</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>E</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>A</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>T</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>E</div>
                    </div>
                    <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block", color: "var(--color-saffron)" }}>•</div>
                    <div style={{ display: 'flex' }}>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>P</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>I</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>T</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>C</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>H</div>
                    </div>
                    <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block", color: "var(--color-saffron)" }}>•</div>
                    <div style={{ display: 'flex' }}>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>W</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>I</div>
                        <div className="letter" aria-hidden="true" style={{ position: "relative", display: "inline-block" }}>N</div>
                    </div>
                </h2>
            </div>

            {/* Mobile: simple static display */}
            <div className="mobile-hw-content">
                <h2 className="mobile-hw-title" aria-label="IDEATE PITCH WIN">
                    <span>IDEATE</span>
                    <span className="mobile-hw-dot">•</span>
                    <span>PITCH</span>
                    <span className="mobile-hw-dot">•</span>
                    <span>WIN</span>
                </h2>
                <p className="mobile-hw-desc">
                    Join 100+ teams in an 8-hour sprint of pure innovation. Ideate, pitch, and compete for a massive prize pool.
                </p>
            </div>

            <div className="horizontal-words__bottom-text desktop-hw-content">
                <div className="horizontal-words__bottom-text-l">
                    Join 100+ teams in an 8-hour sprint of pure innovation.<br />
                    Ideate, pitch, and compete for a massive prize pool.<br />
                    Are you ready to shape the future?
                </div>
            </div>
        </section>
    );
};

export default HorizontalWords;
