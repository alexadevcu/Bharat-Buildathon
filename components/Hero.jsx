'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Hero() {
    const titleRef = useRef(null);

    return (
        <>
            {/* ── Main hero container ── */}
            <div
                className={`vimeo-hero is-playing is-unmuted`}
                style={{ background: 'linear-gradient(135deg, var(--color-navy) 0%, var(--color-black-deep) 100%)', minHeight: '100vh', position: 'relative' }}
            >
                <div className="vimeo-hero__fade" style={{ background: 'linear-gradient(to top, var(--bg-color) 0%, transparent 100%)' }} />

                {/* ① Headline — bottom left, word-by-word layout */}
                <div className="home-header__title">
                    <h1 className="vimeo-hero__title" ref={titleRef} onClick={(e) => e.stopPropagation()} style={{ color: 'var(--color-white)' }}>
                        <span className="vimeo-hero__word">Bharat </span>
                        
                        <span className="vimeo-hero__word is--relative">
                            {/* Oval underline */}
                            <img
                                src="/assets/VimeoHero SVG/oval-underline.svg"
                                alt=""
                                className="home-header__title-line-svg"
                                style={{ stroke: 'var(--color-saffron)' }}
                            />
                            <span>Buildathon</span>
                        </span>
                        
                        <span className="vimeo-hero__word"> 2026</span>

                        <div style={{ flexBasis: '100%', height: 0 }} />

                        <span className="vimeo-hero__word" style={{ fontSize: '0.4em', letterSpacing: '0', fontWeight: 'normal', color: 'var(--color-lightblue)' }}>Ideate. Build. Pitch. Win.</span>
                    </h1>
                    
                    <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
                        <a href="#register" target="_blank" rel="noopener noreferrer" style={{ background: 'var(--color-saffron)', color: 'white', padding: '15px 30px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'} onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}>
                            Register Now
                        </a>
                        <a href="#about" style={{ border: '2px solid var(--color-white)', color: 'white', padding: '15px 30px', borderRadius: '30px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', transition: 'background 0.2s, color 0.2s' }} onMouseEnter={(e) => { e.target.style.background = 'white'; e.target.style.color = 'var(--color-navy)'; }} onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'white'; }}>
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
