'use client';

import SvgSymbols from '@/components/SvgSymbols';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Rounds from '@/components/Rounds';
import Schedule from '@/components/Schedule';
import JudgingCriteria from '@/components/JudgingCriteria';
import FAQ from '@/components/FAQ';
import Prizes from '@/components/Prizes';
import DoubleMarquee from '@/components/DoubleMarquee';
import Footer from '@/components/Footer';
import TransitionScribble from '@/components/TransitionScribble';
import CursorBubble from '@/components/CursorBubble';
import SmoothScroll from '@/components/SmoothScroll';
import HorizontalWords from '@/components/HorizontalWords';

export default function Home() {
    return (
        <>
            <SvgSymbols />
            <SmoothScroll />
            <CursorBubble />
            <header className="main-header">
                <Navbar />
            </header>
            <Hero />
            <HorizontalWords />
            <main>
                <div className="content-section motion-cards-wrapper" id="about">
                    <About />
                </div>
                <div id="rounds">
                    <Rounds />
                </div>
                <div id="schedule">
                    <Schedule />
                </div>
                <div className="content-section service-cards-wrapper" id="judging">
                    <JudgingCriteria />
                </div>
                <Prizes />
                <div id="faq">
                    <FAQ />
                </div>
            </main>
            <section className="Double-marquee" id="sponsors">
                <DoubleMarquee />
            </section>
            <footer className="main-footer" id="contact">
                <Footer />
            </footer>
            <TransitionScribble />
        </>
    );
}
