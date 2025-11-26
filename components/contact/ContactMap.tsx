'use client';

import { useConfig } from '@/hooks/useConfig';

export function ContactMap() {
  const { config } = useConfig();
  
  // Google Maps embed URL - API key gerektirmeyen yöntem
  const mapAddress = encodeURIComponent(config.contact.address);
  const mapUrl = `https://www.google.com/maps?q=${mapAddress}&output=embed`;

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] rounded-xl overflow-hidden shadow-2xl border border-border/50 group">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 w-full h-full"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/5 via-transparent to-transparent pointer-events-none" />
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}

