"use client";

import { useTranslations } from "@/components/I18nProvider";
import { useConfig } from "@/hooks/useConfig";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";

// Telefon numarasını formatla: 905551234567 -> +90 555 1234 567
const formatPhoneNumber = (phoneNumber: string | undefined) => {
  if (!phoneNumber) return '';
  let cleaned = ('' + phoneNumber).replace(/\D/g, '');

  // "90" ile başlıyorsa kaldır (ülke kodu)
  if (cleaned.startsWith('90') && cleaned.length >= 9) {
    cleaned = cleaned.slice(2);
  }
  // "0" ile başlıyorsa kaldır
  else if (cleaned.startsWith('0')) {
    cleaned = cleaned.slice(1);
  }

  // 10 haneli numara: +90 XXX XXXX XXX
  if (cleaned.length === 10) {
    return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`;
  }

  // 7 haneli numara (444 numaraları vb): +90 XXX XXXX
  if (cleaned.length === 7) {
    return `+90 ${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
  }

  // Diğer uzunluklar için basit format
  if (cleaned.length > 0) {
    return `+90 ${cleaned}`;
  }

  return phoneNumber;
};

export function ContactInfo() {
  const t = useTranslations("contact.info");
  const { config } = useConfig();

  // Working hours from API or fallback
  const workingHours = config.workingHours && config.workingHours.length > 0
    ? config.workingHours
    : [
      { day: "Pazartesi - Cuma", hours: "09:00 - 18:00" },
      { day: "Cumartesi", hours: "09:00 - 13:00" }
    ];

  const contactItems = [
    {
      icon: MapPin,
      title: t("address"),
      content: config.contact.address,
      link: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        config.contact.address
      )}`,
      isLink: true,
      show: !!config.contact.address
    },
    {
      icon: Mail,
      title: t("email"),
      content: config.contact.email,
      link: `mailto:${config.contact.email}`,
      isLink: true,
      show: !!config.contact.email
    },
    {
      icon: Phone,
      title: t("phone"),
      content: (
        <a
          href="tel:03124167000"
          className="hover:text-primary transition-colors block text-xs sm:text-sm text-muted-foreground"
        >
          03124167000
        </a>
      ),
      isLink: false,
      show: true
    },
    {
      icon: Phone,
      title: t("phone"),
      content: (
        <a
          href={`tel:${config.contact.phone?.replace(/\D/g, '').replace('+90', '').replace(' 90', '')}`}
          className="hover:text-primary transition-colors block text-xs sm:text-sm text-muted-foreground"
        >
          {formatPhoneNumber(config.contact.phone).replace('+90', '').replace(/\s/g, '').replace('90', "")}
        </a>
      ),
      isLink: false,
      show: !!config.contact.phone
    },
    {
      icon: Phone,
      title: t("mobile"),
      content: formatPhoneNumber(config.contact.mobile).replace(' 90', ''),
      link: `tel:${config.contact.mobile?.replace(/\D/g, '').replace(' 90', '')}`,
      isLink: true,
      show: !!config.contact.mobile
    },
    {
      icon: Clock,
      title: t("workingHours"),
      content: (
        <>
          {workingHours.map((wh, idx) => (
            <p key={idx} className="text-sm text-muted-foreground">
              {wh.day}: {wh.hours}
            </p>
          ))}
        </>
      ),
      isLink: false,
      show: true
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {contactItems.filter(item => item.show).map((item, index) => {
        const Icon = item.icon;
        const content = (
          <div className="flex items-start space-x-3 sm:space-x-4 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-sm bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold mb-1 text-foreground">
                {item.title}
              </h3>
              {typeof item.content === "string" ? (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed break-words">
                  {item.content.replace(' 90', '')}
                </p>
              ) : (
                item.content
              )}
            </div>
          </div>
        );

        if (item.isLink && item.link) {
          return (
            <Link
              key={index}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : undefined}
              rel={
                item.link.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="block p-4 sm:p-5 rounded-sm bg-gradient-to-br from-background via-muted/30 to-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              {content}
            </Link>
          );
        }

        return (
          <div
            key={index}
            className="p-4 sm:p-5 rounded-sm bg-gradient-to-br from-background via-muted/30 to-background border border-border/50"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
