"use client";

import { useTranslations } from "@/components/I18nProvider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { getRoute } from "@/lib/routes";
import { Container } from "@/components/Container";
import { ArrowRight } from "lucide-react";
import type { FAQ } from "@/lib/types";

interface HomeFAQSectionProps {
  faqs: FAQ[];
}

export function HomeFAQSection({ faqs }: HomeFAQSectionProps) {
  const t = useTranslations("faq");
  const pathname = usePathname();
  const currentLocale = (pathname?.split("/")[1] || "tr") as Locale;

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-24 bg-white">
      <Container>
        <div className="text-left mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 max-w-2xl text-base md:text-lg">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-4xl mx-0 mb-8 md:mb-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq._id}
                value={`item-${faq._id}`}
                className="border border-gray-200 rounded-sm bg-white data-[state=open]:border-primary data-[state=open]:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-gray-900 hover:text-primary transition-colors px-4 py-3 md:px-6 md:py-4 hover:no-underline [&[data-state=open]]:text-primary">
                  <span className="flex items-center gap-3 md:gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed px-4 pb-4 md:px-6 md:pb-6 pt-0 ml-0 md:ml-12">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-left">
          <Link
            href={`/${currentLocale}${getRoute("faq", currentLocale)}`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-sm bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Tümünü Gör
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
