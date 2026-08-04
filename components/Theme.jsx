'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/theme.css';

gsap.registerPlugin(ScrollTrigger);

const TRACKS_DATA = [
    {
        title: "Smart Cities",
        desc: "Innovate urban infrastructure, transportation, and public services for the cities of tomorrow.",
        icon: "🏢",
        color: "var(--color-navy)"
    },
    {
        title: "Healthcare",
        desc: "Develop solutions for accessible medical care, health tracking, and biotechnology.",
        icon: "🩺",
        color: "var(--color-green)"
    },
    {
        title: "EdTech",
        desc: "Transform the learning experience with digital tools, accessibility, and new methodologies.",
        icon: "📚",
        color: "var(--color-saffron)"
    },
    {
        title: "AgriTech",
        desc: "Empower farmers with smart agriculture, supply chain solutions, and sustainability.",
        icon: "🌾",
        color: "var(--color-gold)"
    },
    {
        title: "Clean Energy",
        desc: "Create eco-friendly alternatives, waste management systems, and renewable energy solutions.",
        icon: "⚡",
        color: "var(--color-darkblue)"
    }
];

export default function Theme() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.theme-card');
            const mm = gsap.matchMedia();
            
            mm.add("(min-width: 769px)", () => {
                gsap.from(cards, {
                    scale: 0.8,
                    y: 60,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                });
            });

            mm.add("(max-width: 768px)", () => {
                gsap.from(cards, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="theme-section content-section" id="theme-section">
            <div className="theme__header">
                <h2 className="display theme__title">Ideathon Tracks</h2>
                <p className="theme__subtitle">Building Innovative Solutions for a Better India</p>
            </div>
            
            <div className="theme__grid">
                {TRACKS_DATA.map((track, i) => (
                    <div key={i} className="theme-card" style={{ '--card-bg': track.color }}>
                        <div className="theme-card__icon">{track.icon}</div>
                        <h3 className="theme-card__title">{track.title}</h3>
                        <p className="theme-card__desc">{track.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
