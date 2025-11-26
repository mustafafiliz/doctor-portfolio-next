'use client';

import { useTranslations } from '@/components/I18nProvider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Container } from '@/components/Container';

export function FAQSection() {
  const t = useTranslations('faq');

  const faqs = [
    {
      id: 1,
      question: 'Göz muayenesi ne kadar sürer?',
      answer: 'Rutin göz muayenesi genellikle 30-45 dakika sürer. Detaylı muayene veya özel testler gerektiğinde bu süre uzayabilir.',
    },
    {
      id: 2,
      question: 'Katarakt ameliyatı ne kadar sürer?',
      answer: 'Katarakt ameliyatı genellikle 15-20 dakika sürer. Ameliyat sonrası hasta aynı gün evine dönebilir.',
    },
    {
      id: 3,
      question: 'Glokom tedavisi nasıl yapılır?',
      answer: 'Glokom tedavisi öncelikle ilaçlarla başlar. İlaç tedavisi yeterli olmadığında lazer veya cerrahi tedavi uygulanabilir.',
    },
    {
      id: 4,
      question: 'Göz muayenesi için randevu nasıl alınır?',
      answer: 'Randevu almak için telefon numaramızdan veya WhatsApp üzerinden bizimle iletişime geçebilirsiniz.',
    },
    {
      id: 5,
      question: 'Sigorta kapsamında mı?',
      answer: 'Evet, SGK ve özel sigorta anlaşmalarımız bulunmaktadır. Detaylı bilgi için iletişime geçebilirsiniz.',
    },
    {
      id: 6,
      question: 'Çocuk muayenesi yapıyor musunuz?',
      answer: 'Evet, çocuk göz muayenesi de yapmaktayız. Çocuklar için özel muayene protokollerimiz bulunmaktadır.',
    },
    {
      id: 7,
      question: 'Katarakt ameliyatı sonrası ne zaman normal hayata dönebilirim?',
      answer: 'Katarakt ameliyatı sonrası genellikle 1-2 gün içinde günlük aktivitelere dönebilirsiniz. Ağır fiziksel aktivitelerden 1 hafta süreyle kaçınmanız önerilir.',
    },
    {
      id: 8,
      question: 'Glokom hastalığı tamamen iyileşir mi?',
      answer: 'Glokom kronik bir hastalıktır ve tamamen iyileşmez ancak erken teşhis ve düzenli tedavi ile görme kaybı önlenebilir. Tedavi ömür boyu sürmelidir.',
    },
    {
      id: 9,
      question: 'Göz damlası kullanımında nelere dikkat etmeliyim?',
      answer: 'Göz damlalarını kullanmadan önce ellerinizi yıkayın, damlayı gözün alt kapağına damlatın ve gözü kapatıp birkaç dakika bekleyin. Damlaları buzdolabında saklayın ve son kullanma tarihine dikkat edin.',
    },
    {
      id: 10,
      question: 'Lazer göz ameliyatı kimlere yapılabilir?',
      answer: 'Lazer göz ameliyatı genellikle 18 yaş üstü, göz numarası stabil olan ve kornea kalınlığı yeterli olan kişilere yapılabilir. Detaylı muayene sonrası uygunluk belirlenir.',
    },
    {
      id: 11,
      question: 'Göz kuruluğu nasıl tedavi edilir?',
      answer: 'Göz kuruluğu suni gözyaşı damlaları, göz merhemleri ve yaşam tarzı değişiklikleri ile tedavi edilir. Şiddetli vakalarda tıkaçlar veya ilaç tedavisi gerekebilir.',
    },
    {
      id: 12,
      question: 'Retina yırtığı nedir ve nasıl tedavi edilir?',
      answer: 'Retina yırtığı acil müdahale gerektiren bir durumdur. Lazer veya dondurma (kriyopeksi) ile tedavi edilebilir. Erken müdahale görme kaybını önler.',
    },
    {
      id: 13,
      question: 'Göz tansiyonu normal değerleri nedir?',
      answer: 'Normal göz tansiyonu 10-21 mmHg arasındadır. Ancak bu değer kişiden kişiye değişebilir ve düzenli kontroller önemlidir.',
    },
    {
      id: 14,
      question: 'Şaşılık tedavisi ne zaman yapılmalı?',
      answer: 'Şaşılık tedavisi mümkün olan en kısa sürede başlatılmalıdır. Çocuklarda erken tedavi görme gelişimi için kritik öneme sahiptir.',
    },
    {
      id: 15,
      question: 'Göz alerjisi nasıl önlenir?',
      answer: 'Göz alerjisini önlemek için alerjenlerden kaçınmak, gözleri sık sık yıkamak, antihistaminik damlalar kullanmak ve gerekirse alerji testi yaptırmak önerilir.',
    },
  ];

  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground px-4">{t('subtitle')}</p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-border/50">
              <AccordionTrigger className="text-left text-sm sm:text-base px-4 sm:px-6">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground px-4 sm:px-6">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}
