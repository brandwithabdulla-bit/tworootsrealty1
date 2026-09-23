'use client';

import { ArrowUpRight } from '@/components/ui';

export default function SpeakToAdvisorLink({ className = 'hero-link', children }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-callback-modal', {
          detail: {
            title: 'Speak to an Advisor',
            subtitle: 'Our senior advisory team will connect with you to guide your property decisions.'
          }
        })
      );
    }
  };

  return (
    <a 
      href="#speak-to-advisor" 
      onClick={handleClick} 
      className={className}
      role="button"
    >
      {children || (
        <>
          <span>Speak to an Advisor</span> <ArrowUpRight size={14} />
        </>
      )}
    </a>
  );
}
