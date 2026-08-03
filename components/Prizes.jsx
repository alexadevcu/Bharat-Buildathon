'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/prizes.css';

export default function Prizes() {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const podiums = gsap.utils.toArray('.podium');
        
        // Initial state
        gsap.set(podiums, { y: 150, opacity: 0 });

        // Staggered rise animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        // Order: 2nd, 1st, 3rd for dramatic effect
        tl.to(podiums[0], { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' }, 0);
        tl.to(podiums[1], { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.5)' }, 0.2); 
        tl.to(podiums[2], { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.2)' }, 0.4);

        // Participation banner animation
        gsap.fromTo('.participation-banner', 
            { scale: 0.9, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: {
                trigger: '.participation-banner',
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }}
        );

    }, []);

    return (
        <section ref={containerRef} className="prizes-section content-section" id="prizes">
            <div className="prizes__container">
                <div className="prizes__header">
                    <h2 className="display prizes__title">PRIZES</h2>
                    <p className="prizes__subtitle">Rewards for the Innovators</p>
                </div>
                
                <div className="podium-wrapper">
                    {/* 2nd Place */}
                    <div className="podium podium--second">
                        <div className="podium__trophy">🥈</div>
                        <div className="podium__rank">2nd Place</div>
                        <div className="podium__details">Trophy + Certificate</div>
                        <div className="podium__base"></div>
                    </div>
                    
                    {/* 1st Place */}
                    <div className="podium podium--first">
                        <div className="podium__trophy">🏆</div>
                        <div className="podium__rank">1st Place</div>
                        <div className="podium__details">Trophy + Certificate</div>
                        <div className="podium__base"></div>
                    </div>

                    {/* 3rd Place */}
                    <div className="podium podium--third">
                        <div className="podium__trophy">🥉</div>
                        <div className="podium__rank">3rd Place</div>
                        <div className="podium__details">Trophy + Certificate</div>
                        <div className="podium__base"></div>
                    </div>
                </div>

                <div className="participation-banner">
                    <div className="participation-banner__content">
                        <h3>🌟 Participation Certificates 🌟</h3>
                        <p>All other participating teams will receive official certificates of participation.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
