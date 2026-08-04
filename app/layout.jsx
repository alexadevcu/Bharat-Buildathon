import './globals.css';

export const metadata = {
    title: 'Bharat Buildathon 2026 — Ideate. Build. Pitch. Win.',
    description: 'Bharat Buildathon is an innovation-focused Ideathon that challenges participants to develop creative and practical solutions for real-world problems aligned with India\'s growth and development.',
    icons: {
        icon: '/assets/Alexa%20Circular%20logo.png',
    },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
