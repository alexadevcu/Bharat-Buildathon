'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import GridScan from '@/components/GridScan';
import SplitText from '@/components/SplitText';
import Countdown from '@/components/Countdown';
import { EVENT, ORGANISERS } from '@/lib/data';

/**
 * Logo with a wordmark fallback.
 * The organiser PNGs are dark-on-transparent, so they sit on a white chip to
 * stay legible on navy. If a file is missing we render the short name instead
 * of a broken-image icon.
 */
function OrganiserMark({ name, short, logo }) {
    const [failed, setFailed] = useState(false);
    const imgRef = useRef(null);

    /* The img is server-rendered, so a 404 can fire before React attaches
       onError. Re-check the decoded size once on mount to catch that case. */
    useEffect(() => {
        const img = imgRef.current;
        if (img && img.complete && img.naturalWidth === 0) setFailed(true);
    }, []);

    if (failed || !logo) {
        return <span className="hero__org-name">{short}</span>;
    }

    return (
        <span className="hero__org-chip">
            <img
                ref={imgRef}
                src={logo}
                alt={name}
                className="hero__org-logo"
                loading="eager"
                onError={() => setFailed(true)}
            />
        </span>
    );
}

export default function Hero() {
    const rootRef = useRef(null);
    const [preloaderDone, setPreloaderDone] = useState(true);

    useEffect(() => {
        const trigger = () => setPreloaderDone(true);

        window.addEventListener('preloaderReveal', trigger);
        window.addEventListener('preloaderFinished', trigger);

        return () => {
            window.removeEventListener('preloaderReveal', trigger);
            window.removeEventListener('preloaderFinished', trigger);
        };
    }, []);

    /* Sequential character fade-up typewriter cadence calculations */
    const CHAR_STAGGER = 0.042; // ~42ms per character for typewriter cadence
    const BASE_DELAY = 0.15;

    const lineDelays = [];
    let currentDelay = BASE_DELAY;
    EVENT.title.forEach((lineText) => {
        lineDelays.push(currentDelay);
        currentDelay += lineText.length * CHAR_STAGGER + 0.05;
    });

    const ruleDelay = lineDelays[1] ? lineDelays[1] + (EVENT.title[1]?.length || 10) * CHAR_STAGGER : 0.85;
    const taglineDelay = currentDelay + 0.08;

    /* Staged fade-up keeps the registration path clear after the title arrives. */
    useGSAP(
        () => {
            if (!preloaderDone) return;
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

            gsap.from('.hero__kicker', { y: 12, autoAlpha: 0, duration: 0.6, delay: 0.1, ease: 'power3.out' });
            gsap.from('.hero__conversion', { y: 16, autoAlpha: 0, duration: 0.65, delay: taglineDelay + 0.15, ease: 'power3.out' });
            gsap.from('.hero__spec', { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.07, delay: taglineDelay + 0.35, ease: 'power3.out' });
            gsap.from('.countdown__unit', { y: 18, autoAlpha: 0, duration: 0.6, stagger: 0.07, delay: taglineDelay + 0.5, ease: 'power3.out' });
            gsap.from('.countdown__label', { autoAlpha: 0, duration: 0.5, delay: taglineDelay + 0.5, ease: 'power3.out' });
            gsap.from('.hero__organisers > *', { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.06, delay: taglineDelay + 0.65, ease: 'power3.out' });
            gsap.from('.hero__scroll-hint', { autoAlpha: 0, duration: 0.6, delay: taglineDelay + 0.75, ease: 'power3.out' });

            gsap.fromTo(
                '.hero__rule',
                { scaleX: 0, transformOrigin: 'left center' },
                { scaleX: 1, duration: 0.55, ease: 'power3.out', delay: ruleDelay }
            );
        },
        { scope: rootRef, dependencies: [preloaderDone] }
    );

    return (
        <section className="hero" aria-labelledby="hero-title" ref={rootRef}>
            <div className="hero__bg">
                <GridScan
                    sensitivity={0.55}
                    lineThickness={1}
                    linesColor="#2F293A"
                    gridScale={0.1}
                    scanColor="#FF9FFC"
                    scanOpacity={0.4}
                    enablePost
                    bloomIntensity={0.6}
                    chromaticAberration={0.002}
                    noiseIntensity={0.01}
                    lineJitter={0.1}
                    scanGlow={0.5}
                    scanSoftness={2}
                    enableWebcam={false}
                    showPreview={false}
                />
            </div>

            <div className="hero__scrim" />

            <div className="hero__inner">
                {/* ── Headline ── */}
                <div className="hero__headline">
                    <p className="hero__kicker">
                        <span className="hero__kicker-dot" aria-hidden="true" />
                        {EVENT.kicker}
                    </p>

                    <h1 className="hero__title" id="hero-title">
                        <span className="sr-only">{EVENT.title.join(' ')}</span>
                        {EVENT.title.map((line, i) => (
                            <span
                                className={`hero__line${
                                    line === EVENT.ruleOn ? ' hero__line--ruled' : ''
                                }`}
                                key={line}
                                aria-hidden="true"
                            >
                                <SplitText
                                    tag="span"
                                    text={line}
                                    className="hero__line-text"
                                    splitType="chars"
                                    delay={CHAR_STAGGER * 1000}
                                    duration={0.45}
                                    ease="power3.out"
                                    from={{ opacity: 0, yPercent: 85, filter: 'blur(6px)' }}
                                    to={{ opacity: 1, yPercent: 0, filter: 'blur(0px)' }}
                                    textAlign="left"
                                    animateOnMount={preloaderDone}
                                    startDelay={preloaderDone ? lineDelays[i] : 99999}
                                />
                                {line === EVENT.ruleOn && (
                                    <span className="hero__rule" aria-hidden="true" />
                                )}
                            </span>
                        ))}
                    </h1>

                    {preloaderDone && (
                        <p className="hero__tagline">
                            <SplitText
                                tag="span"
                                text={EVENT.tagline}
                                className="hero__tagline-text"
                                splitType="chars"
                                delay={34}
                                duration={0.38}
                                ease="power3.out"
                                from={{ opacity: 0, yPercent: 75, filter: 'blur(4px)' }}
                                to={{ opacity: 1, yPercent: 0, filter: 'blur(0px)' }}
                                textAlign="left"
                                animateOnMount={preloaderDone}
                                startDelay={preloaderDone ? taglineDelay : 99999}
                            />
                            <span className="hero__caret" aria-hidden="true">_</span>
                        </p>
                    )}
                </div>

                <div className="hero__conversion">
                    <div className="hero__actions">
                        <a className="hero__cta hero__cta--primary" href="https://docs.google.com/forms/d/e/1FAIpQLSdFxoWH_VBfuiZ3l421pqWCBLbH496XMPEk8RfkIDD2qr7hkw/viewform" target="_blank" rel="noopener noreferrer">
                            Register Your Team
                        </a>
                        <a className="hero__cta hero__cta--ghost" href="#about">
                            Explore the Ideathon
                        </a>
                    </div>
                    <p className="hero__trust-line">Free to enter <span aria-hidden="true">·</span> Teams of 3–4 <span aria-hidden="true">·</span> Chandigarh University</p>
                </div>

                {/* ── Facts ── */}
                <dl className="hero__specs">
                    {EVENT.specs.map(({ label, value, priority }) => (
                        <div className={`hero__spec${priority === 'secondary' ? ' hero__spec--secondary' : ''}`} key={label}>
                            <dt className="hero__spec-label">{label}</dt>
                            <dd className="hero__spec-value">{value}</dd>
                        </div>
                    ))}
                </dl>

                {/* ── Countdown + organisers ── */}
                <div className="hero__foot">
                    <Countdown target={EVENT.startsAt} />

                    <div className="hero__organisers">
                        <span className="hero__organisers-label">Organised by</span>
                        <span className="hero__organisers-rule" aria-hidden="true" />
                        <ul className="hero__organisers-list">
                            {ORGANISERS.map((org) => (
                                <li className="hero__org" key={org.name}>
                                    <OrganiserMark {...org} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <span className="hero__scroll-hint" aria-hidden="true">
                Scroll
            </span>
        </section>
    );
}
