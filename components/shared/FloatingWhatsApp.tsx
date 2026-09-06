'use client';

import { useState, useEffect } from 'react';

type Props = {
  whatsappUrl?: string;
  label?: string;
};

export default function FloatingWhatsApp({
  whatsappUrl = 'https://wa.me/201020130946',
  label = 'Chat with Agarli',
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [url, setUrl] = useState(whatsappUrl);
  const [displayLabel, setDisplayLabel] = useState(label);

  // Always fetch the latest values from the API so admin changes reflect immediately
  useEffect(() => {
    fetch('/api/content')
      .then(r => r.json())
      .then(data => {
        const freshUrl = data.floatingWhatsapp?.url || data.contact?.whatsapp || whatsappUrl;
        const freshLabel = data.floatingWhatsapp?.label || label;
        setUrl(freshUrl);
        setDisplayLabel(freshLabel);
      })
      .catch(() => {}); // silently fall back to server-provided prop
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 99,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      {/* Tooltip badge that reveals on hover / looks premium */}
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat with Agarli on WhatsApp"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.625rem',
          background: '#25D366',
          color: '#ffffff',
          borderRadius: '9999px',
          padding: isHovered ? '0.75rem 1.35rem 0.75rem 1rem' : '0.85rem',
          boxShadow: isHovered
            ? '0 16px 36px -8px rgba(37, 211, 102, 0.6), 0 4px 12px rgba(11, 26, 48, 0.15)'
            : '0 10px 25px -5px rgba(37, 211, 102, 0.45), 0 4px 10px rgba(11, 26, 48, 0.12)',
          transform: isHovered ? 'translateY(-3px) scale(1.02)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          textDecoration: 'none',
          cursor: 'pointer',
        }}
      >
        {/* Official WhatsApp SVG icon */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', flexShrink: 0 }}
          >
            <path
              d="M17.472 14.382C17.152 14.222 15.58 13.447 15.286 13.34C14.992 13.233 14.779 13.18 14.566 13.499C14.353 13.818 13.742 14.536 13.555 14.749C13.368 14.962 13.181 14.989 12.861 14.829C12.541 14.669 11.509 14.331 10.285 13.24C9.333 12.392 8.69 11.344 8.503 11.025C8.316 10.706 8.483 10.533 8.643 10.374C8.788 10.23 8.965 10.001 9.125 9.815C9.285 9.629 9.338 9.496 9.445 9.283C9.552 9.07 9.499 8.884 9.419 8.724C9.339 8.564 8.7 7.001 8.434 6.363C8.175 5.742 7.912 5.826 7.716 5.816C7.531 5.807 7.318 5.807 7.105 5.807C6.892 5.807 6.546 5.887 6.253 6.206C5.96 6.525 5.135 7.296 5.135 8.865C5.135 10.434 6.28 11.949 6.44 12.162C6.6 12.375 8.683 15.578 11.871 16.953C12.63 17.28 13.224 17.476 13.687 17.623C14.449 17.865 15.143 17.831 15.69 17.749C16.301 17.658 17.57 16.981 17.836 16.236C18.102 15.491 18.102 14.853 18.022 14.72C17.942 14.587 17.792 14.542 17.472 14.382Z"
              fill="currentColor"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.004 2C6.484 2 2 6.484 2 12.004C2 13.882 2.52 15.639 3.424 17.151L2.091 22.016L7.087 20.706C8.549 21.543 10.228 22.008 12.004 22.008C17.524 22.008 22.008 17.524 22.008 12.004C22.008 6.484 17.524 2 12.004 2ZM12.004 20.316C10.428 20.316 8.944 19.897 7.656 19.167L7.334 18.984L4.372 19.761L5.163 16.877L4.962 16.557C4.161 15.284 3.692 13.695 3.692 12.004C3.692 7.42 7.42 3.692 12.004 3.692C16.588 3.692 20.316 7.42 20.316 12.004C20.316 16.588 16.588 20.316 12.004 20.316Z"
              fill="currentColor"
            />
          </svg>
          {/* Active online indicator dot */}
          <span
            style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '10px',
              height: '10px',
              background: '#ffffff',
              border: '2px solid #25D366',
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Text appears smoothly when hovered or on wider viewports */}
        <div
          style={{
            overflow: 'hidden',
            maxWidth: isHovered ? '200px' : '0px',
            opacity: isHovered ? 1 : 0,
            whiteSpace: 'nowrap',
            transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '-0.01em',
          }}
        >
          {displayLabel}
        </div>
      </a>
    </div>
  );
}
