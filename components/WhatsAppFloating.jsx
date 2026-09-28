'use client';

import { usePathname } from 'next/navigation';
import { WHATSAPP_URL } from '@/data/brand';

export default function WhatsAppFloating() {
  const pathname = usePathname();

  // Hide on map and studio pages to prevent UI overlap
  if (pathname?.startsWith('/map') || pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp floating"
      aria-label="Contact Two Roots Realty on WhatsApp"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        fontWeight: 500,
        letterSpacing: '0.02em',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease'
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
      <span>WhatsApp</span>
    </a>
  );
}
