'use client';

import { useEffect, useState } from 'react';

const UNITS = [
    { key: 'days', label: 'Days' },
    { key: 'hours', label: 'Hrs' },
    { key: 'minutes', label: 'Min' },
    { key: 'seconds', label: 'Sec' },
];

function diff(target) {
    const ms = target - Date.now();
    if (ms <= 0) return null;
    return {
        days: Math.floor(ms / 86400000),
        hours: Math.floor((ms / 3600000) % 24),
        minutes: Math.floor((ms / 60000) % 60),
        seconds: Math.floor((ms / 1000) % 60),
    };
}

/**
 * Countdown to the event start.
 *
 * Renders em-dashes on the server and on first paint, then fills in after mount.
 * Reading the clock during render would produce a server/client mismatch and a
 * hydration error, so the first real value lands in an effect.
 */
export default function Countdown({ target, label = 'Kickoff in' }) {
    const targetMs = new Date(target).getTime();
    const [time, setTime] = useState(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setTime(diff(targetMs));

        const id = setInterval(() => {
            const next = diff(targetMs);
            setTime(next);
            if (!next) clearInterval(id);
        }, 1000);

        return () => clearInterval(id);
    }, [targetMs]);

    if (mounted && !time) {
        return (
            <div className="countdown">
                <span className="countdown__label">Underway</span>
                <p className="countdown__live">The build is on.</p>
            </div>
        );
    }

    return (
        <div className="countdown">
            <span className="countdown__label">{label}</span>
            <div className="countdown__units">
                {UNITS.map(({ key, label: unitLabel }) => (
                    <div className="countdown__unit" key={key}>
                        <span className="countdown__value">
                            {time ? String(time[key]).padStart(2, '0') : '––'}
                        </span>
                        <span className="countdown__unit-label">{unitLabel}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
