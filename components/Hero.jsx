'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Hero() {
    const heroRef = useRef(null);

    // GSAP Entrance Animation Sequence for Right-Aligned Hero Content
    useEffect(() => {
        const root = heroRef.current;
        if (!root) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: () => {
                    gsap.set(
                        '.bharat-hero__eyebrow-badge, .bharat-spec-item, .bharat-hero__btn-primary, .bharat-hero__btn-secondary, .bharat-qr-box, .bharat-partners-footer',
                        { clearProps: 'opacity' }
                    );
                }
            });

            tl.fromTo(
                '.bharat-hero__eyebrow-badge',
                { opacity: 0, y: -25 },
                { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
            )
            .fromTo(
                '.bharat-hero__title-bharat',
                { opacity: 0, x: 40, scale: 0.9 },
                { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' },
                '-=0.3'
            )
            .fromTo(
                '.bharat-hero__title-buildathon',
                { opacity: 0, x: 40, scale: 0.9 },
                { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' },
                '-=0.5'
            )
            .fromTo(
                '.bharat-hero__title-ideathon',
                { opacity: 0, x: 40, scale: 0.9 },
                { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: 'back.out(1.5)' },
                '-=0.5'
            )
            .fromTo(
                '.bharat-hero__tagline',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                '-=0.4'
            )
            .fromTo(
                '.bharat-hero__desc',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5 },
                '-=0.3'
            )
            .fromTo(
                '.bharat-spec-item',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)' },
                '-=0.4'
            )
            .fromTo(
                '.bharat-hero__btn-primary',
                { opacity: 0, scale: 0.7, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' },
                '-=0.3'
            )
            .fromTo(
                '.bharat-hero__btn-secondary',
                { opacity: 0, scale: 0.7, y: 20 },
                { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.8)' },
                '-=0.5'
            )
            .fromTo(
                '.bharat-qr-box',
                { opacity: 0, scale: 0.8, y: 30 },
                { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.4)' },
                '-=0.4'
            )
            .fromTo(
                '.bharat-partners-footer',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.7 },
                '-=0.5'
            );

        }, root);

        return () => ctx.revert();
    }, []);

    return (
        <section className="bharat-hero" id="hero" ref={heroRef}>
            {/* Animated Background Video from assets/video1.webm */}
            <div className="bharat-hero__video-wrapper">
                <video
                    src="/assets/video1.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="bharat-hero__video"
                />
                <div className="bharat-hero__video-overlay" />
            </div>

            <div className="bharat-hero__container">
                <div className="bharat-hero__content-grid">
                    {/* Left Column Spacer (Accommodates 3D Emblem in Video) */}
                    <div className="bharat-hero__video-spacer" />

                    {/* Right Column: All Text, Data, Specs & CTAs */}
                    <div className="bharat-hero__text-col">
                        {/* Eyebrow Badge */}
                        <div className="bharat-hero__eyebrow-badge">
                            <span className="bharat-hero__eyebrow-dot" />
                            🇮🇳 Chandigarh University ,Mohali Campus 2026 · Official Ideathon
                        </div>

                        {/* Stacked 3D Title */}
                        <h1 className="bharat-hero__headline">
                            <span className="bharat-hero__title-bharat">BHARAT</span>
                            <span className="bharat-hero__title-buildathon">BUILDATHON</span>
                            <span className="bharat-hero__title-ideathon">
                                IDEATHON
                                <span className="bharat-hero__tricolor-bar" />
                            </span>
                        </h1>

                        {/* Tagline & Description */}
                        <p className="bharat-hero__tagline">
                            ‘Ideas to Ignite <span>VIKSIT BHARAT</span>’
                        </p>

                        <p className="bharat-hero__desc">
                            Empowering and accelerating innovation for India's growth. Join 100+ teams in an 8-hour device-free ideation & pitch sprint.
                        </p>

                        {/* Horizontal Specs Glass Bar */}
                        <div className="bharat-specs-bar">
                            <div className="bharat-spec-item">
                                <span className="bharat-spec-item__icon">📅</span>
                                <div className="bharat-spec-item__info">
                                    <span className="bharat-spec-item__label">DATE</span>
                                    <span className="bharat-spec-item__val">12th Aug 2026</span>
                                </div>
                            </div>

                            <div className="bharat-spec-item">
                                <span className="bharat-spec-item__icon">📍</span>
                                <div className="bharat-spec-item__info">
                                    <span className="bharat-spec-item__label">VENUE</span>
                                    <span className="bharat-spec-item__val">C1 & C3 Seminar, CU</span>
                                </div>
                            </div>

                            <div className="bharat-spec-item">
                                <span className="bharat-spec-item__icon">⏰</span>
                                <div className="bharat-spec-item__info">
                                    <span className="bharat-spec-item__label">WINDOW</span>
                                    <span className="bharat-spec-item__val">9:30 AM – 4:30 PM</span>
                                </div>
                            </div>

                            <div className="bharat-spec-item">
                                <span className="bharat-spec-item__icon">👥</span>
                                <div className="bharat-spec-item__info">
                                    <span className="bharat-spec-item__label">TEAM</span>
                                    <span className="bharat-spec-item__val">3–4 Members</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons & QR Code Card */}
                        <div className="bharat-hero__action-row">
                            <div className="bharat-hero__actions">
                                <a
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSdFxoWH_VBfuiZ3l421pqWCBLbH496XMPEk8RfkIDD2qr7hkw/viewform"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bharat-hero__btn-primary"
                                >
                                    REGISTER YOUR TEAM TODAY
                                </a>
                                <a href="#about" className="bharat-hero__btn-secondary">
                                    Explore Ideathon
                                </a>
                            </div>

                            {/* Floating QR Code Registration Card */}
                            <div className="bharat-qr-box">
                                <div className="bharat-qr-box__header">
                                    <span className="bharat-qr-box__title">Or scan to register</span>
                                    <svg className="bharat-qr-box__arrow" viewBox="0 0 40 40" fill="none">
                                        <path className="bharat-qr-box__arrow-path" d="M10 10 Q25 15 28 28" stroke="#1E293B" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                                        <path d="M22 26 L28 28 L26 22" stroke="#1E293B" strokeWidth="2" fill="none" />
                                    </svg>
                                </div>
                                <div className="bharat-qr-box__frame">
                                    <svg viewBox="0 0 100 100" className="bharat-qr-svg">
                                        <rect width="100" height="100" fill="#FFFFFF" />
                                        <rect x="5" y="5" width="28" height="28" fill="#1E293B" />
                                        <rect x="9" y="9" width="20" height="20" fill="#FFFFFF" />
                                        <rect x="13" y="13" width="12" height="12" fill="#FF6B35" />
                                        <rect x="67" y="5" width="28" height="28" fill="#1E293B" />
                                        <rect x="71" y="9" width="20" height="20" fill="#FFFFFF" />
                                        <rect x="75" y="13" width="12" height="12" fill="#0E9F6E" />
                                        <rect x="5" y="67" width="28" height="28" fill="#1E293B" />
                                        <rect x="9" y="71" width="20" height="20" fill="#FFFFFF" />
                                        <rect x="13" y="75" width="12" height="12" fill="#1E293B" />
                                        <rect x="38" y="8" width="6" height="6" fill="#1E293B" />
                                        <rect x="48" y="16" width="6" height="6" fill="#1E293B" />
                                        <rect x="38" y="24" width="12" height="6" fill="#0E9F6E" />
                                        <rect x="8" y="38" width="6" height="12" fill="#1E293B" />
                                        <rect x="20" y="44" width="12" height="6" fill="#FF6B35" />
                                        <rect x="40" y="40" width="20" height="20" fill="#1E293B" />
                                        <rect x="68" y="38" width="6" height="12" fill="#1E293B" />
                                        <rect x="82" y="44" width="10" height="6" fill="#0E9F6E" />
                                        <rect x="40" y="68" width="12" height="6" fill="#FF6B35" />
                                        <rect x="58" y="74" width="8" height="14" fill="#1E293B" />
                                        <rect x="72" y="68" width="18" height="18" fill="#1E293B" />
                                        <circle cx="50" cy="50" r="6" fill="#000080" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Organizers & Partners Section */}
                <div className="bharat-partners-footer">
                    <div className="bharat-partners-header">
                        <span className="bharat-partners-title">Our Organizers and Partners</span>
                        <div className="bharat-partners-brush" />
                    </div>

                    <div className="bharat-partners-card">
                        <img src="/assets/logos/cu.png" alt="Chandigarh University" className="bharat-partner-logo" />
                        <img src="/assets/logos/adc-cu.png" alt="Alexa Developers Community" className="bharat-partner-logo" />
                        <img src="/assets/logos/gfg-cu.png" alt="GeeksforGeeks" className="bharat-partner-logo" />
                    </div>

                    <p className="bharat-partners-subtext">
                        Organised by CSE Takshashila · Alexa Developers Community & GeeksforGeeks
                    </p>
                </div>
            </div>
        </section>
    );
}
