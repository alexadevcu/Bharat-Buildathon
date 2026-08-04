'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCHEDULE_DATA } from '@/lib/data';
import '../app/styles/schedule.css';

gsap.registerPlugin(ScrollTrigger);

export default function Schedule() {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);

    useEffect(() => {
        // Only run GSAP horizontal scroll on desktop
        if (window.innerWidth <= 768) return;

        const ctx = gsap.context(() => {
            const track = trackRef.current;
            const items = gsap.utils.toArray('.timeline-node');

            const getScrollAmount = () => {
                return -(track.scrollWidth - window.innerWidth);
            };

            const tween = gsap.to(track, {
                x: getScrollAmount,
                ease: "none"
            });

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${getScrollAmount() * -1}`,
                pin: true,
                animation: tween,
                scrub: 1,
                invalidateOnRefresh: true
            });

            items.forEach((item) => {
                const circle = item.querySelector('.timeline-circle');
                const content = item.querySelector('.timeline-content');
                const startDate = item.querySelector('.timeline-start-date');

                if (startDate) {
                    gsap.from(startDate, {
                        x: -50,
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: item,
                            containerAnimation: tween,
                            start: "left 85%",
                            toggleActions: "play none none reverse"
                        }
                    });
                }

                gsap.from([circle, content], {
                    scale: 0.5,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'back.out(1.7)',
                    scrollTrigger: {
                        trigger: item,
                        containerAnimation: tween,
                        start: "left 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const colors = ['var(--color-saffron)', 'var(--color-green)', 'var(--color-lightblue)', 'var(--color-orange)', 'var(--color-purple)'];

    return (
        <section ref={sectionRef} className="schedule-section content-section" id="schedule-section">
            <div className="schedule-header-sticky">
                <h2 className="display schedule__title">Event Schedule</h2>
                <p className="schedule__subtitle">12 Aug 2026 • Minute-to-Minute Timeline</p>
            </div>

            <div className="schedule-track-container">
                <div className="schedule-track" ref={trackRef}>
                    {SCHEDULE_DATA.map((item, i) => (
                        <div key={i} className="timeline-node">
                            {i === 0 && (
                                <div className="timeline-start-date">12 Aug 2026</div>
                            )}
                            <div className="timeline-circle" style={{ borderColor: colors[i % colors.length] }}>
                                <span className="timeline-time">{item.time.split(' - ')[0]}</span>
                            </div>
                            <div className="timeline-content">
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                                <span className="timeline-time-full" style={{ color: colors[i % colors.length] }}>{item.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
