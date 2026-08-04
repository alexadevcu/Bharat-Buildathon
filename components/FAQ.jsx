'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../app/styles/faq.css';

gsap.registerPlugin(ScrollTrigger);

const FAQ_DATA = [
    {
        q: "Who can participate?",
        a: "Any university student with a valid student ID can participate. Engineering students, designers, and innovators are all welcome!"
    },
    {
        q: "What's the team size?",
        a: "Teams can consist of 2 to 4 members. We encourage cross-disciplinary teams for diverse perspectives."
    },
    {
        q: "Do I need prior coding experience?",
        a: "Not necessarily! While technical skills help, ideation, problem-solving, and presentation skills are equally important, especially for Round 1."
    },
    {
        q: "What should we bring?",
        a: "Bring your valid student ID. Note that Round 1 is device-free, so you won't need laptops or phones until Round 2."
    },
    {
        q: "Is there a registration fee?",
        a: "No, participation in Bharat Buildathon is completely free."
    },
    {
        q: "What's the format — online or offline?",
        a: "The event is completely offline and will be held in person at the venue."
    },
    {
        q: "Can I participate solo?",
        a: "No, this is a team-based event. You must register with a team of 2 to 4 members."
    }
];

export default function FAQ() {
    const sectionRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(0); // First one open by default

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = gsap.utils.toArray('.faq-item');
            
            gsap.from(items, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section ref={sectionRef} className="faq-section content-section" id="faq-section">
            <div className="faq__container">
                <div className="faq__header">
                    <h2 className="display faq__title">FAQ</h2>
                    <p className="faq__subtitle">Frequently Asked Questions</p>
                </div>
                
                <div className="faq__list">
                    {FAQ_DATA.map((item, index) => (
                        <div 
                            key={index} 
                            className={`faq-item ${openIndex === index ? 'active' : ''}`}
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="faq-item__header">
                                <h3 className="faq-item__question">{item.q}</h3>
                                <div className="faq-item__icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d={openIndex === index ? "M5 12h14" : "M12 5v14M5 12h14"} stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </div>
                            </div>
                            <div className="faq-item__content" style={{ maxHeight: openIndex === index ? '200px' : '0' }}>
                                <p className="faq-item__answer">{item.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
