import './globals.css';

export const metadata = {
    title: 'Bharat Buildathon 2026 — Ideate. Build. Pitch. Win.',
    description: 'Bharat Buildathon is an innovation-focused Ideathon that challenges participants to develop creative and practical solutions for real-world problems aligned with India\'s growth and development.',
    icons: {
        icon: '/assets/logos/cu-logo-placeholder.png', // We'll add this later or use a generic one
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
