'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/rounds.css';

gsap.registerPlugin(ScrollTrigger);

export default function Rounds() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.round-card');
            
            // Stagger reveal cards
            gsap.from(cards, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                }
            });

            // Animate connector line
            const connector = document.querySelector('.round-connector-path');
            if (connector && connector.getTotalLength) {
                const pathLen = connector.getTotalLength();
                gsap.set(connector, { strokeDasharray: pathLen, strokeDashoffset: pathLen });
                gsap.to(connector, {
                    strokeDashoffset: 0,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="rounds-section content-section" id="rounds-section">
            <div className="rounds-header">
                <h2 className="display rounds__title">How it Works</h2>
                <p className="rounds__subtitle">The competition will be conducted in two exciting rounds.</p>
            </div>

            <div className="rounds-container" ref={containerRef}>
                {/* SVG Timeline Connector */}
                <div className="rounds-timeline">
                    <svg width="100%" height="100%" viewBox="0 0 100 400" preserveAspectRatio="none">
                        <path className="round-connector-path" d="M50 0 L50 400" stroke="rgba(255,255,255,0.2)" strokeWidth="4" strokeDasharray="10 10" />
                    </svg>
                </div>

                <div className="round-item round-card">
                    <div className="round-number" style={{ backgroundColor: 'var(--color-saffron)' }}>1</div>
                    <div className="round-content">
                        <div className="round-title-row">
                            <h3>Round 1: Device-Free Ideation</h3>
                            <span className="round-badge alert-badge">🚫 Strict No-Device Policy</span>
                        </div>
                        <ul className="round-list">
                            <li><strong style={{color: 'var(--color-saffron)'}}>No Electronics:</strong> Laptops, mobile phones, smartwatches, or any electronic devices are strictly prohibited.</li>
                            <li><strong style={{color: 'var(--color-saffron)'}}>30-Minute Sprint:</strong> Teams will have exactly 30 minutes to brainstorm and develop their core idea.</li>
                            <li><strong style={{color: 'var(--color-saffron)'}}>Idea Canvas:</strong> Solutions must be prepared exclusively on the physical Idea Canvas provided by the organizers.</li>
                        </ul>
                    </div>
                </div>

                <div className="round-item round-card">
                    <div className="round-number" style={{ backgroundColor: 'var(--color-green)' }}>2</div>
                    <div className="round-content">
                        <div className="round-title-row">
                            <h3>Round 2: Final Pitch</h3>
                            <span className="round-badge success-badge">🎙️ Present to Judges</span>
                        </div>
                        <ul className="round-list">
                            <li><strong style={{color: 'var(--color-green)'}}>The Shortlist:</strong> Only the top teams selected from the Round 1 ideation phase will qualify for the finals.</li>
                            <li><strong style={{color: 'var(--color-green)'}}>Presentation:</strong> Finalists will prepare a detailed PowerPoint presentation outlining their solution.</li>
                            <li><strong style={{color: 'var(--color-green)'}}>Live Pitch:</strong> Teams will pitch their solution live before our expert judging panel.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
