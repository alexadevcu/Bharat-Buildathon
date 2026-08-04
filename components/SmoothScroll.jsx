'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SmoothScroll() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Skip Lenis on mobile — native touch scroll works better with GSAP pins
        const isMobile = window.innerWidth <= 768;

        if (!isMobile) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                smoothWheel: true,
                touchMultiplier: 1.5,
            });

            lenis.on('scroll', ScrollTrigger.update);
            gsap.ticker.add((time) => { lenis.raf(time * 1000); });
            gsap.ticker.lagSmoothing(0);

            // Store lenis on window so other components can access it
            window.__lenis = lenis;

            // Dynamic Tab Title Change
            const originalTitle = document.title;
            const handleVisibility = () => {
                document.title = document.hidden ? "Come back and Build! 🚀" : originalTitle;
            };
            document.addEventListener('visibilitychange', handleVisibility);

            // Intercept anchor clicks for smooth scrolling
            const handleAnchorClick = (e) => {
                const target = e.target.closest('a');
                if (!target) return;
                const href = target.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    lenis.scrollTo(href, { 
                        offset: 0, 
                        duration: 1.5, 
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
                    });
                }
            };
            document.addEventListener('click', handleAnchorClick);

            return () => {
                lenis.destroy();
                document.removeEventListener('visibilitychange', handleVisibility);
                document.removeEventListener('click', handleAnchorClick);
                delete window.__lenis;
            };
        } else {
            // On mobile, just do native anchor scroll
            const handleAnchorClick = (e) => {
                const target = e.target.closest('a');
                if (!target) return;
                const href = target.getAttribute('href');
                if (href && href.startsWith('#') && href.length > 1) {
                    e.preventDefault();
                    const el = document.querySelector(href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            };
            document.addEventListener('click', handleAnchorClick);
            return () => document.removeEventListener('click', handleAnchorClick);
        }
    }, []);

    return null;
}
