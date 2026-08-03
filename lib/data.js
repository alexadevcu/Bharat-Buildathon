// ─── lib/data.js — All static data for the Bharat Buildathon website ─────────────
// ES Module exports — imported by React components

// Sponsor and Partner logos
export const brands = [
    { name: "Chandigarh University", src: "/assets/logos/cu-logo-placeholder.svg" },
    { name: "ADC", src: "/assets/logos/adc-logo-placeholder.svg" },
    { name: "GeeksforGeeks", src: "/assets/logos/gfg-logo-placeholder.svg" },
    { name: "Placeholder Sponsor", src: "/assets/logos/sponsor-placeholder-1.svg" },
    { name: "Placeholder Partner", src: "/assets/logos/sponsor-placeholder-2.svg" },
    { name: "Tech Partner", src: "/assets/logos/sponsor-placeholder-3.svg" },
    { name: "Innovation Partner", src: "/assets/logos/sponsor-placeholder-4.svg" },
    { name: "Community Partner", src: "/assets/logos/sponsor-placeholder-5.svg" }
];

// Marquee background colors (using the new palette)
export const colors = [
    "var(--color-navy)",
    "var(--color-saffron)",
    "var(--color-green)",
    "var(--color-gold)",
    "var(--color-lightblue)",
    "var(--color-darkblue)",
    "var(--color-purple)"
];

// Footer social icon links + SVG markup
export const SOCIAL_ICONS = [
    {
        href: 'https://discord.com',
        label: 'Discord',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 127.14 96.36" fill="currentColor"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14c2.64-27.38-4.51-51.11-19.32-72.1ZM42.63,65.22C38.41,65.22,34.88,61.26,34.88,56.4s3.43-8.82,7.75-8.82c4.35,0,7.86,4,7.75,8.82C50.38,61.26,46.98,65.22,42.63,65.22Zm41.87,0c-4.22,0-7.75-4-7.75-8.82s3.43-8.82,7.75-8.82c4.35,0,7.86,4,7.75,8.82C92.25,61.26,88.85,65.22,84.5,65.22Z"/></svg>'
    },
    {
        href: 'https://twitter.com',
        label: 'Twitter/X',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>'
    },
    {
        href: 'https://instagram.com',
        label: 'Instagram',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 40 40" fill="none" data-wiggle-target="" aria-hidden="true"><path d="M35.9653 20.2209C35.9393 17.6695 36.1018 15.1165 35.8873 12.5586C35.7589 10.8912 35.2828 9.24659 34.3662 7.94651C33.3083 6.48229 31.714 5.09445 29.8338 4.89131C28.719 4.7808 27.7 4.3274 26.5511 4.42165C26.0603 4.4444 25.5776 4.38103 25.0933 4.31765C24.5099 4.26077 23.8973 4.38265 23.3009 4.32902C21.6644 4.22989 20.0263 4.0625 18.3882 4.14213C17.5285 4.01538 16.6525 4.04625 15.7896 4.01538C15.3557 3.98937 14.9202 3.991 14.4895 4.0625C13.2171 4.27539 11.9397 4.51591 10.6673 4.74992C10.1326 4.84906 9.58821 4.97256 9.1023 5.21958C8.34663 5.60961 7.75509 6.27427 7.10017 6.81056C6.78165 7.0982 6.56389 7.46873 6.40463 7.862C6.08123 8.64368 5.6327 9.37823 5.39056 10.1973C5.15329 11.2195 4.80227 12.2205 4.70152 13.2622C4.39275 16.6343 4.00922 19.9983 4.08397 23.3915C4.09535 23.9733 3.98809 24.5551 4.0011 25.1271C4.09698 26.3622 4.38137 27.5859 4.62839 28.7999C4.78277 29.5328 5.03466 30.2446 5.40844 30.8946C6.48263 32.6904 8.01023 34.7851 10.313 34.946C12.9116 35.1947 15.4776 35.7456 18.0891 35.8626C19.5891 35.9016 21.094 36.1697 22.6021 35.9812C23.01 35.9341 23.4162 35.8821 23.8274 35.8626C24.2223 35.8366 24.5652 35.874 24.9113 35.8447C25.5988 35.7764 26.2764 35.5408 26.9622 35.4677C28.3907 35.4027 29.8468 35.2759 31.168 34.7299C33.0629 34.1156 34.0396 32.8805 34.701 31.0506C35.4274 29.2842 35.611 27.3779 35.6452 25.4798C35.7167 24.7469 35.9101 24.0221 35.9279 23.281C35.9588 22.7203 35.8304 22.1564 35.8499 21.6088C35.8629 21.1554 35.9686 20.7052 35.9637 20.2518V20.2209H35.9653ZM33.6642 19.3304C33.5163 20.0584 33.3911 20.7231 33.4301 21.4788C33.2221 23.3704 33.3993 25.2961 33.1913 27.1829C33.1458 28.6114 33.0531 30.2153 31.9594 31.27C31.3858 31.8356 30.7698 32.4011 30.0304 32.6579C29.5543 32.8383 29.0391 32.8789 28.5353 32.9276C27.9633 32.9861 27.4091 33.1308 26.842 33.2153C25.0121 33.4948 23.1822 33.8426 21.3247 33.6541C20.0506 33.6151 18.7749 33.6004 17.5009 33.5501C16.1731 33.4948 14.8536 33.4298 13.5307 33.3274C12.3964 33.2299 11.2361 33.1665 10.2041 32.6757C7.34719 31.3107 6.80603 27.8443 6.58176 25.0101C6.429 22.5416 6.26974 20.0227 6.61264 17.572C6.89703 15.2107 7.20255 12.8543 7.78434 10.5369C8.07361 9.36035 9.04867 8.66481 9.99774 7.98226C10.7307 7.44273 11.5676 7.08358 12.424 6.79918C13.0887 6.52941 13.8249 6.58142 14.5188 6.50341C15.8579 6.25477 17.2165 6.10689 18.5783 6.07764C20.1205 6.06139 21.6676 6.07764 23.2034 6.20602C25.0316 6.43028 26.842 6.75368 28.68 6.91782C29.8939 7.01857 31.0786 7.4931 31.8002 8.52667C32.2828 9.17346 32.7183 9.86413 32.9556 10.6312C33.1246 11.135 33.1197 11.6843 33.1994 12.2108C33.4854 13.2899 33.4838 14.4031 33.5455 15.5114C33.6918 16.3272 33.5797 17.143 33.6203 17.962C33.6495 18.4073 33.7113 18.8575 33.6674 19.3028L33.6642 19.3336V19.3304Z" fill="currentColor"/><path d="M27.7674 17.988C27.3595 16.1712 26.1066 14.6907 24.6391 13.6392C23.7875 13.0591 22.7751 12.6853 21.7318 12.5114C21.2166 12.4253 20.721 12.2482 20.2318 12.253C18.4442 12.3505 16.7622 13.0851 15.3695 14.1934C14.8722 14.5542 14.5147 15.0271 14.1393 15.5146C13.8581 15.8673 13.5607 16.2215 13.356 16.6148C13.0358 17.2145 12.8717 17.8791 12.7384 18.5406C12.5792 19.3174 12.4427 20.1445 12.5174 20.9408C12.7628 23.5703 14.6723 26.2419 17.1246 27.2771C17.8039 27.6103 18.4621 27.8199 19.1999 27.8345C20.7242 28.1547 22.3184 27.9451 23.6413 27.0935C24.4587 26.567 25.3509 26.0876 26.0204 25.366C27.3238 23.8839 28.0144 22.0882 28.0924 20.0649C28.1705 19.345 27.9982 18.721 27.7772 18.0189L27.769 17.9864L27.7674 17.988ZM25.4711 21.2854C25.073 22.54 24.1434 24.2366 22.9311 24.872C22.034 25.3091 21.0249 25.5171 20.0384 25.6407C19.1527 25.6195 18.1874 25.5009 17.4626 25.0264C17.1831 24.8411 16.9296 24.6217 16.6761 24.4007C14.5407 22.7382 14.084 19.6066 15.2752 17.2681C15.493 16.8098 15.8635 16.4539 16.273 16.163C17.2205 15.4756 18.1809 14.8532 19.3201 14.6647C20.1619 14.5038 20.9907 14.7589 21.826 14.8597C23.053 15.0433 23.8217 15.929 24.514 16.857C25.4663 18.0579 25.9083 19.7643 25.4809 21.2561L25.4728 21.287L25.4711 21.2854Z" fill="currentColor"/><path d="M30.2261 11.8094C29.8621 13.3451 28.991 13.766 27.5382 13.1468C26.4754 12.708 26.2137 11.4583 26.971 10.6149C27.4846 10.0396 28.2012 9.35057 29.0414 9.69835C29.2705 9.80885 29.4412 10.0006 29.6281 10.1696C30.1058 10.5759 30.4292 11.1414 30.2326 11.7769L30.2245 11.8077L30.2261 11.8094Z" fill="currentColor"/></svg>'
    }
];

// Service cards data (Judging Criteria)
export const CARDS_DATA = [
    {
        color: 'saffron',
        sticker: 'camera', // We will replace these SVGs later, keeping IDs for now
        title: 'Innovation',
        services: ['Originality', 'Creativity', 'Novelty of the idea', 'Out-of-the-box thinking']
    },
    {
        color: 'navy',
        sticker: 'phone',
        title: 'Feasibility',
        services: ['Technical viability', 'Implementation plan', 'Resource requirements', 'Time to market']
    },
    {
        color: 'green',
        sticker: 'smiley',
        title: 'Impact',
        services: ['Social relevance', 'Scalability', 'Potential positive change', 'Target audience reach']
    },
    {
        color: 'gold',
        sticker: 'hand',
        title: 'Scalability',
        services: ['Growth potential', 'Market readiness', 'Business model viability']
    },
    {
        color: 'purple',
        sticker: 'heart',
        title: 'Presentation',
        services: ['Clarity of thought', 'Storytelling', 'Pitch delivery', 'Q&A handling']
    }
];

export const SCHEDULE_DATA = [
    { time: "9:30 AM - 10:15 AM", title: "Registration", desc: "Arrival, team check-in, and networking." },
    { time: "10:15 AM - 10:30 AM", title: "Opening Ceremony", desc: "Welcome Address & Event Kickoff." },
    { time: "10:30 AM - 11:00 AM", title: "Briefing", desc: "Rulebook, Evaluation Criteria & Guidelines." },
    { time: "11:00 AM - 11:45 AM", title: "Round 1: Ideation", desc: "Device-free ideation & Solution Development." },
    { time: "11:45 AM - 1:00 PM", title: "Round 1 Evaluation", desc: "Q&A with Judges." },
    { time: "1:00 PM - 1:40 PM", title: "Lunch Break", desc: "Recharge and refuel." },
    { time: "1:40 PM - 1:55 PM", title: "Announcement", desc: "Qualified Teams & Instructions for Round 2." },
    { time: "1:55 PM - 2:30 PM", title: "Round 2 Preparation", desc: "PPT Preparation & Final Pitch Readiness." },
    { time: "2:30 PM - 3:45 PM", title: "Final Presentations", desc: "Round 2 Pitches & Jury Evaluation." },
    { time: "3:45 PM - 4:05 PM", title: "Jury Evaluation", desc: "Final deliberation & Audience Interaction." },
    { time: "4:05 PM - 4:30 PM", title: "Closing Ceremony", desc: "Results, Prize Distribution, Group Photo." }
];

// ─── Wiggle Intensity Config ────────────────────────────────────────────────
export const WIGGLE_CONFIG = {
    logoTruus: 4,
    socials: 5,
    jobHeading: 1,
    googleMap: 1,
    email: 1,
    whatsapp: 1,
};

// ─── Animation Configurations ─────────────────────────────────────────────
export const ANIMATION_CONFIG = {
    transitionScribble: {
        strokeWidthStart: "8%",
        strokeWidthMax: "31%",
        scale: 0.7,
        durationIn: 2.2,
        durationOut: 2.7
    }
};
