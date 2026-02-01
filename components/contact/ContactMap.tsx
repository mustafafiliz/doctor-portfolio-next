'use client';

import { useConfig } from '@/hooks/useConfig';

export function ContactMap() {
  const { config } = useConfig();

  // Use embed URL from API if available, otherwise generate from address
  let mapUrl = '';

  // User provided specific map location correction
  // Priority 1: Use the specific corrected location
  const specificLocation = "Prof.Dr. Kadriye Ufuk Elgin I Göz Hastalıkları Uzmanı-Ankara Kavaklıdere Tunus Cd No:28 06640 Çankaya/Ankara";
  const encodedLocation = encodeURIComponent(specificLocation);
  mapUrl = `https://www.google.com/maps?q=${encodedLocation}&ll=39.9109217,32.8567298&z=15&output=embed`;

  /* 
  // Fallback to config if needed in future (currently overridden by specific fix)
  if (config.maps?.embedUrl) {
    mapUrl = config.maps.embedUrl;
  } else if (config.maps?.latitude && config.maps?.longitude) {
    mapUrl = `https://www.google.com/maps?q=${config.maps.latitude},${config.maps.longitude}&output=embed`;
  } else if (config.contact.address) {
    const mapAddress = encodeURIComponent(config.contact.address);
    mapUrl = `https://www.google.com/maps?q=${mapAddress}&output=embed`;
  }
  */

  if (!mapUrl) {
    return (
      <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] rounded-sm overflow-hidden shadow-2xl border border-border/50 bg-muted flex items-center justify-center">
        <p className="text-muted-foreground">Harita bilgisi mevcut değil</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px] rounded-sm overflow-hidden shadow-2xl border border-border/50 group">
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
      <div className="absolute inset-0 rounded-sm border-2 border-primary/20 group-hover:border-primary/40 transition-colors duration-300 pointer-events-none" />
    </div>
  );
}
