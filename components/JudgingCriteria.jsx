'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CARDS_DATA } from '@/lib/data';

export default function ServiceCards() {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animate underline SVG paths on scroll (from HeroSection)
        gsap.to('.title-underline-svg path', {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power3.out',
            stagger: 0.3,
            scrollTrigger: {
                trigger: '.service-cards-wrapper',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });

        initCardAnimations();
    }, []);

    return (
        <>
            {/* ─── "Call us if you need:" Heading ─── */}
            <div className="title-container">
                <h2 className="main-title">Judging Criteria <br/><span className="italic-text" style={{fontSize: "0.5em"}}>how we evaluate</span></h2>
                <svg xmlns="http://www.w3.org/2000/svg" width="160" viewBox="0 0 159 17" fill="none" className="title-underline-svg">
                    <path d="M1 12.1515C53.0771 5.7187 105.529 2.30552 158 1.93652" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M30.2672 15.9461C64.1899 12.8158 98.2663 11.3583 132.33 11.5735" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>

            {/* ─── Service Cards ─── */}
            <div className="cards-wrapper" id="cards-wrapper">
                {CARDS_DATA.map((card) => (
                    <div key={card.color} className={`card card-${card.color}`}>
                        <div className={`card-sticker sticker-${card.sticker}`}>
                            <img
                                src={`/assets/Card-Sticker SVG/sticker-${card.sticker}.svg`}
                                alt=""
                                width="100%"
                                loading="lazy"
                                aria-hidden="true"
                            />
                        </div>
                        <h3 className="card-title">{card.title}</h3>
                        <svg width="100%" height="10" className="card-divider-svg" aria-hidden="true">
                            <use href="#card-divider" />
                        </svg>
                        <ul className="card-list">
                            {card.services.map((service) => (
                                <li key={service}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" className="services-card__bullet-svg" aria-hidden="true">
                                        <use href="#bullet-icon" />
                                    </svg>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

function initCardAnimations() {
    const cards = gsap.utils.toArray('.card');
    if (!cards.length) return;

    const originalData = [
        { rotation: 4 },
        { rotation: -5 },
        { rotation: 5 },
        { rotation: -8 },
        { rotation: 5 }
    ];

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    let leaveTimeout = null;

    if (!isMobile) {
        cards.forEach((card, index) => {
            card.addEventListener('mouseenter', () => {
                if (leaveTimeout) { clearTimeout(leaveTimeout); leaveTimeout = null; }
                
                // Bring hovered card to front
                gsap.set(card, { zIndex: 50 });
                
                // Animate hovered card
                gsap.to(card, { 
                    x: 0, 
                    y: -20, 
                    rotation: 0, 
                    scale: 1.1, 
                    duration: 0.6, 
                    ease: 'back.out(1.5)', 
                    overwrite: true 
                });

                // Push siblings away
                cards.forEach((otherCard, otherIndex) => {
                    if (otherIndex === index) return;
                    
                    const isLeft = otherIndex < index;
                    const distance = Math.abs(index - otherIndex);
                    // Push cards further away based on how close they are
                    const pushX = isLeft ? -(60 / distance) : (60 / distance);
                    const pushY = 10;
                    
                    gsap.to(otherCard, { 
                        x: pushX, 
                        y: pushY, 
                        rotation: originalData[otherIndex].rotation + (isLeft ? -2 : 2), 
                        scale: 0.95, 
                        duration: 0.6, 
                        ease: 'power2.out', 
                        overwrite: true,
                        zIndex: originalData.length - distance // Lower z-index for siblings
                    });
                });
            });

            card.addEventListener('mouseleave', () => {
                leaveTimeout = setTimeout(() => {
                    cards.forEach((c, i) => {
                        gsap.to(c, { 
                            x: 0, 
                            y: 0, 
                            scale: 1, 
                            rotation: originalData[i].rotation, 
                            duration: 0.8, 
                            ease: 'back.out(1.2)', 
                            overwrite: true, 
                            zIndex: i + 1 
                        });
                    });
                }, 50);
            });
        });
    } else {
        // Mobile & Tablet: Let CSS handle a smooth horizontal scroll or vertical stack
        cards.forEach((card, i) => {
            gsap.set(card, { clearProps: "all" });
        });
    }
}
