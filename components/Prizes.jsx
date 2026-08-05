'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/prizes.css';

export default function Prizes() {
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const cards = gsap.utils.toArray('.prize-card');
        gsap.set(cards, { y: 60, opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 75%',
                toggleActions: 'play none none reverse'
            }
        });

        // 2nd Place, 1st Place, 3rd Place entrance
        tl.to(cards[0], { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0)
          .to(cards[1], { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }, 0.15)
          .to(cards[2], { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.3);

        gsap.fromTo('.prize-perks-grid',
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: {
                trigger: '.prize-perks-grid',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }}
        );
    }, []);

    return (
        <section ref={containerRef} className="prizes-section content-section" id="prizes">
            <div className="prizes__container">
                
                {/* Header */}
                <div className="prizes__header">
                    <div className="prizes__badge">
                        <span className="prizes__badge-dot" />
                        REWARDS & RECOGNITION
                    </div>
                    <h2 className="prizes__title">
                        Prizes & Rewards
                    </h2>
                    <div className="prizes__brush" />
                    <p className="prizes__subtitle">
                        Empowering India's Next Generation of Innovators
                    </p>
                </div>

                {/* 3D Prize Cards Layout */}
                <div className="prize-cards-grid">
                    
                    {/* 2nd Place */}
                    <div className="prize-card prize-card--second">
                        <div className="prize-card__badge prize-card__badge--silver">2ND PLACE</div>
                        <div className="prize-card__icon-wrapper">
                            <span className="prize-card__icon">🥈</span>
                        </div>
                        <h3 className="prize-card__rank">Runner Up</h3>
                        <div className="prize-card__main-reward">Winner Trophy + Certificate</div>
                        
                        <ul className="prize-card__perks">
                            <li><span>✓</span> Official Silver Winner Trophy</li>
                            <li><span>✓</span> Certificate of Excellence</li>
                        </ul>

                        {/* Grey/Silver Colored Box Base */}
                        <div className="podium-colored-box podium-colored-box--silver">
                            <span className="podium-colored-box__icon">🎁</span>
                            <span className="podium-colored-box__text">Official GFG Goodies</span>
                        </div>
                    </div>

                    {/* 1st Place (Featured Champion) */}
                    <div className="prize-card prize-card--first prize-card--featured">
                        <div className="prize-card__ribbon">GRAND WINNER</div>
                        <div className="prize-card__badge prize-card__badge--gold">1ST PLACE</div>
                        <div className="prize-card__icon-wrapper">
                            <span className="prize-card__icon">🏆</span>
                        </div>
                        <h3 className="prize-card__rank">Grand Champion</h3>
                        <div className="prize-card__main-reward">Gold Champion Trophy + Certificate</div>
                        
                        <ul className="prize-card__perks">
                            <li><span>✓</span> Official Gold Champion Trophy</li>
                            <li><span>✓</span> Certificate of High Distinction</li>
                            <li><span>✓</span> Incubation & Mentorship Opportunity</li>
                        </ul>

                        {/* Yellow/Gold Colored Box Base */}
                        <div className="podium-colored-box podium-colored-box--gold">
                            <span className="podium-colored-box__icon">🎁</span>
                            <span className="podium-colored-box__text">Official GFG Goodies & Swag Kit</span>
                        </div>
                    </div>

                    {/* 3rd Place */}
                    <div className="prize-card prize-card--third">
                        <div className="prize-card__badge prize-card__badge--bronze">3RD PLACE</div>
                        <div className="prize-card__icon-wrapper">
                            <span className="prize-card__icon">🥉</span>
                        </div>
                        <h3 className="prize-card__rank">2nd Runner Up</h3>
                        <div className="prize-card__main-reward">Bronze Trophy + Certificate</div>
                        
                        <ul className="prize-card__perks">
                            <li><span>✓</span> Official Bronze Winner Trophy</li>
                            <li><span>✓</span> Certificate of Excellence</li>
                        </ul>

                        {/* Orange/Bronze Colored Box Base */}
                        <div className="podium-colored-box podium-colored-box--bronze">
                            <span className="podium-colored-box__icon">🎁</span>
                            <span className="podium-colored-box__text">Official GFG Goodies</span>
                        </div>
                    </div>

                </div>

                {/* Additional Perks Banner */}
                <div className="prize-perks-grid">
                    <div className="prize-perk-card">
                        <div className="prize-perk-card__icon">📜</div>
                        <h4>Participation Certificates</h4>
                        <p>All participating teams receive official verified certificates of participation from CU, ADC & GFG.</p>
                    </div>
                    <div className="prize-perk-card">
                        <div className="prize-perk-card__icon">🎒</div>
                        <h4>Official GFG Swag & Goodies</h4>
                        <p>Exclusive GeeksforGeeks stickers, badges, and goodies for top ideators and presenters.</p>
                    </div>
                    <div className="prize-perk-card">
                        <div className="prize-perk-card__icon">🚀</div>
                        <h4>Mentorship & Networking</h4>
                        <p>Direct exposure to senior faculty, industry mentors, and community leaders from CSE Takshashila.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
