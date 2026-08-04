'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Rounds() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.normal-round-card');

            gsap.fromTo(
                cards,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.25,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="normal-rounds-section" id="rounds">
            <div className="normal-rounds-container" ref={containerRef}>
                {/* Header */}
                <div className="normal-rounds-header">
                    <span className="normal-eyebrow">COMPETITION ROADMAP</span>
                    <h2 className="normal-rounds-title">Event Flow</h2>
                    <p className="normal-rounds-subtitle">
                        Bharat Buildathon consists of two structured competition rounds.
                    </p>
                </div>

                {/* 2-Column Standard Card Layout */}
                <div className="normal-rounds-grid">
                    {/* ROUND 1 */}
                    <div className="normal-round-card">
                        <div className="normal-card-badge badge-saffron">ROUND 1</div>

                        <h3 className="normal-card-title">Think Tank</h3>
                        <p className="normal-card-subtitle">Idea Generation Round</p>

                        <div className="normal-card-body">
                            <div className="normal-info-row">
                                <strong>Participation:</strong>
                                <span>25–30 teams (maximum 4 members per team).</span>
                            </div>

                            <div className="normal-info-row">
                                <strong>Spin The Wheel Challenge:</strong>
                                <span>Each team spins two wheels: <em>Wheel 1 (Domain)</em> and <em>Wheel 2 (Constraint)</em>.</span>
                            </div>

                            <div className="normal-info-row">
                                <strong>Brainstorming Window:</strong>
                                <span>30 minutes to brainstorm an innovative solution based on the assigned combination.</span>
                            </div>

                            <div className="normal-info-row">
                                <strong>Device Policy:</strong>
                                <span>Laptops and mobile phones are strictly prohibited. Teams rely purely on discussion and creativity.</span>
                            </div>

                            <div className="normal-worksheet-section">
                                <strong>Physical Worksheet Deliverable:</strong>
                                <ul>
                                    <li>Problem Statement</li>
                                    <li>Target Audience</li>
                                    <li>Existing Challenges</li>
                                    <li>Proposed Solution</li>
                                    <li>Unique Features</li>
                                    <li>Constraint Satisfaction</li>
                                </ul>
                            </div>
                        </div>

                        <div className="normal-card-footer footer-saffron">
                            <strong>Qualification:</strong> Internal judges evaluate this round. The <strong>Top 10 teams</strong> qualify for the finals.
                        </div>
                    </div>

                    {/* ROUND 2 */}
                    <div className="normal-round-card">
                        <div className="normal-card-badge badge-green">ROUND 2</div>

                        <h3 className="normal-card-title">Pitch Perfect</h3>
                        <p className="normal-card-subtitle">Final Presentation Round</p>

                        <div className="normal-card-body">
                            <div className="normal-info-row">
                                <strong>Finalists:</strong>
                                <span>The Top 10 teams present their solutions.</span>
                            </div>

                            <div className="normal-info-row">
                                <strong>Presentation Format:</strong>
                                <span>Teams prepare a short PowerPoint presentation.</span>
                            </div>

                            <div className="normal-info-row">
                                <strong>Live Pitch:</strong>
                                <span>Deliver a Shark Tank-style pitch before the expert judging panel.</span>
                            </div>

                            <div className="normal-worksheet-section">
                                <strong>Judging Criteria:</strong>
                                <ul>
                                    <li>Innovation</li>
                                    <li>Problem-Solving</li>
                                    <li>Feasibility</li>
                                    <li>Presentation</li>
                                    <li>Overall Impact</li>
                                </ul>
                            </div>
                        </div>

                        <div className="normal-card-footer footer-green">
                            <strong>Grand Finale:</strong> The <strong>Top 3 teams</strong> will be announced as official winners.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
