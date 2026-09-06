'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import ConsultationModal from './ConsultationModal';

interface ConsultationContextType {
  isOpen: boolean;
  openConsultation: () => void;
  closeConsultation: () => void;
}

const ConsultationContext = createContext<ConsultationContextType | null>(null);

export function ConsultationProvider({
  children,
  whatsappNumber,
}: {
  children: React.ReactNode;
  whatsappNumber?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [liveWhatsapp, setLiveWhatsapp] = useState(whatsappNumber);

  // Fetch latest WhatsApp number from API so admin changes reflect immediately
  useEffect(() => {
    fetch('/api/content')
      .then(r => r.json())
      .then(data => {
        const fresh = data.floatingWhatsapp?.phone || data.contact?.phone || whatsappNumber;
        setLiveWhatsapp(fresh);
      })
      .catch(() => {});
  }, []);

  // Global listener: any anchor or button with href="#consultation" or data-open-consultation opens the modal
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href');
      const hasDataAttr = target.hasAttribute('data-open-consultation');

      if (
        hasDataAttr ||
        href === '#consultation' ||
        href === '/consultation' ||
        (href && href.includes('forms.gle'))
      ) {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <ConsultationContext.Provider
      value={{
        isOpen,
        openConsultation: () => setIsOpen(true),
        closeConsultation: () => setIsOpen(false),
      }}
    >
      {children}
      <ConsultationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        whatsappNumber={liveWhatsapp}
      />
    </ConsultationContext.Provider>
  );
}

export function useConsultation() {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
}
