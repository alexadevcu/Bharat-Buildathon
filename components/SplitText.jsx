'use client';

/**
 * SplitText — React Bits (https://reactbits.dev/text-animations/split-text)
 * Dependencies: gsap (SplitText ships with GSAP 3.13+), @gsap/react
 *
 * Local changes vs. upstream:
 *   • 'use client' for the Next.js App Router
 *   • `animateOnMount` runs the tween immediately instead of on scroll —
 *     the hero headline is above the fold, so ScrollTrigger would never fire
 *   • respects prefers-reduced-motion (text is left visible, no split)
 */

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

const SplitText = ({
    text,
    className = '',
    delay = 50,
    duration = 1.25,
    ease = 'power3.out',
    splitType = 'chars',
    from = { opacity: 0, y: 40 },
    to = { opacity: 1, y: 0 },
    threshold = 0.1,
    rootMargin = '-100px',
    textAlign = 'center',
    tag = 'p',
    animateOnMount = false,
    startDelay = 0,
    onLetterAnimationComplete,
}) => {
    const ref = useRef(null);
    const animationCompletedRef = useRef(false);
    const onCompleteRef = useRef(onLetterAnimationComplete);
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        onCompleteRef.current = onLetterAnimationComplete;
    }, [onLetterAnimationComplete]);

    /* Splitting before webfonts land measures the fallback face and reflows. */
    useEffect(() => {
        if (document.fonts.status === 'loaded') {
            setFontsLoaded(true);
        } else {
            document.fonts.ready.then(() => setFontsLoaded(true));
        }
    }, []);

    useGSAP(
        () => {
            if (!ref.current || !text) return;
            if (animationCompletedRef.current) return;

            /* Waiting on fonts means the raw text would paint, then snap to
               opacity:0 when the split lands. Keep the parent hidden until the
               split exists, then reveal it. */
            if (!fontsLoaded) {
                gsap.set(ref.current, { autoAlpha: 0 });
                return;
            }

            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                gsap.set(ref.current, { autoAlpha: 1 });
                return;
            }

            const el = ref.current;

            if (el._rbsplitInstance) {
                try {
                    el._rbsplitInstance.revert();
                } catch (_) {
                    /* noop */
                }
                el._rbsplitInstance = null;
            }

            const startPct = (1 - threshold) * 100;
            const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
            const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
            const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
            const sign =
                marginValue === 0
                    ? ''
                    : marginValue < 0
                      ? `-=${Math.abs(marginValue)}${marginUnit}`
                      : `+=${marginValue}${marginUnit}`;
            const start = `top ${startPct}%${sign}`;

            let targets;
            const assignTargets = (self) => {
                if (splitType.includes('chars') && self.chars.length) targets = self.chars;
                if (!targets && splitType.includes('words') && self.words.length) targets = self.words;
                if (!targets && splitType.includes('lines') && self.lines.length) targets = self.lines;
                if (!targets) targets = self.chars || self.words || self.lines;
            };

            const splitInstance = new GSAPSplitText(el, {
                type: splitType,
                smartWrap: true,
                autoSplit: splitType === 'lines',
                linesClass: 'split-line',
                wordsClass: 'split-word',
                charsClass: 'split-char',
                reduceWhiteSpace: false,
                onSplit: (self) => {
                    assignTargets(self);
                    /* Chars carry their own from-state now, so the parent is safe
                       to show without revealing unanimated text. */
                    gsap.set(el, { autoAlpha: 1 });
                    const tween = gsap.fromTo(
                        targets,
                        { ...from },
                        {
                            ...to,
                            duration,
                            ease,
                            stagger: delay / 1000,
                            delay: animateOnMount ? startDelay : 0,
                            /* Above the fold → animate now. Below → wait for scroll. */
                            scrollTrigger: animateOnMount
                                ? undefined
                                : {
                                      trigger: el,
                                      start,
                                      once: true,
                                      fastScrollEnd: true,
                                      anticipatePin: 0.4,
                                  },
                            onComplete: () => {
                                animationCompletedRef.current = true;
                                onCompleteRef.current?.();
                            },
                            willChange: 'transform, opacity',
                            force3D: true,
                        }
                    );
                    return tween;
                },
            });

            el._rbsplitInstance = splitInstance;

            return () => {
                ScrollTrigger.getAll().forEach((st) => {
                    if (st.trigger === el) st.kill();
                });
                try {
                    splitInstance.revert();
                } catch (_) {
                    /* noop */
                }
                el._rbsplitInstance = null;
            };
        },
        {
            dependencies: [
                text,
                delay,
                duration,
                ease,
                splitType,
                JSON.stringify(from),
                JSON.stringify(to),
                threshold,
                rootMargin,
                fontsLoaded,
                animateOnMount,
                startDelay,
            ],
            scope: ref,
        }
    );

    const style = {
        textAlign,
        overflow: 'hidden',
        display: 'inline-block',
        whiteSpace: 'normal',
        wordWrap: 'break-word',
        willChange: 'transform, opacity',
    };
    const Tag = tag || 'p';

    return (
        <Tag ref={ref} style={style} className={`split-parent ${className}`}>
            {text}
        </Tag>
    );
};

export default SplitText;
