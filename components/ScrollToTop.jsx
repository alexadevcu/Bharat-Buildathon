'use client';

import { useState, useEffect } from 'react';
import '../app/styles/scroll-to-top.css';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        // Enforce reload to start at the top landing page
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);

            // Show button after scrolling down 300px
            setIsVisible(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.2 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

    return (
        <>
            {/* Top Page Scroll Progress Indicator Bar */}
            <div 
                className="scroll-progress-bar"
                style={{ transform: `scaleX(${scrollProgress / 100})` }}
            />

            {/* Floating Back to Top Button */}
            <button
                className={`scroll-to-top-btn ${isVisible ? 'visible' : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll back to top"
            >
                <svg className="scroll-progress-ring" width="48" height="48" viewBox="0 0 48 48">
                    <circle
                        className="scroll-progress-ring__bg"
                        cx="24"
                        cy="24"
                        r={radius}
                    />
                    <circle
                        className="scroll-progress-ring__circle"
                        cx="24"
                        cy="24"
                        r={radius}
                        style={{
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: strokeDashoffset
                        }}
                    />
                </svg>
                <span className="scroll-to-top-arrow">↑</span>
            </button>
        </>
    );
}
