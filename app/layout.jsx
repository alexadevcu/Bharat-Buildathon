import './globals.css';

export const metadata = {
    title: 'Bharat Buildathon 2026 — Ideate. Build. Pitch. Win.',
    description: 'Bharat Buildathon is an innovation-focused Ideathon that challenges participants to develop creative and practical solutions for real-world problems aligned with India\'s growth and development.',
    icons: {
        icon: [
            { url: '/assets/image.png', type: 'image/png' },
        ],
        shortcut: '/assets/image.png',
        apple: '/assets/image.png',
    },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Global polyfill/patch to prevent Google Translate & browser extension removeChild crashes
if (typeof window !== 'undefined') {
  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child && child.parentNode !== this) {
      if (child.parentNode) {
        return child.parentNode.removeChild(child);
      }
      return child;
    }
    return originalRemoveChild.apply(this, arguments);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) {
      return this.appendChild(newNode);
    }
    return originalInsertBefore.apply(this, arguments);
  };
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
