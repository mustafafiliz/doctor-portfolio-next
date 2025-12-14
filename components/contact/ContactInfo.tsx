"use client";

import { useTranslations } from "@/components/I18nProvider";
import { useConfig } from "@/hooks/useConfig";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Link from "next/link";

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
      icon: Phone,
      title: t("phone"),
      content: config.contact.phone,
      link: `tel:${config.contact.phone}`,
      isLink: true,
      show: !!config.contact.phone
    },
    {
      icon: Phone,
      title: t("mobile"),
      content: config.contact.mobile,
      link: `tel:${config.contact.mobile}`,
      isLink: true,
      show: !!config.contact.mobile
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
                  {item.content}
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
