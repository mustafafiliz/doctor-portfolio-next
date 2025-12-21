'use client';

import { useTranslations } from '@/components/I18nProvider';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';
import { contactApi } from '@/lib/api';
import { getWebsiteId } from '@/lib/config';
import { IMaskInput } from 'react-imask';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mesaj validasyonu
    if (formData.message.trim().length < 10) {
      setMessageError('Mesajınız en az 10 karakter olmalıdır.');
      toast({
        title: 'Hata',
        description: 'Mesajınız en az 10 karakter olmalıdır.',
        variant: 'destructive',
      });
      return;
    }
    
    setMessageError(null);
    setLoading(true);

    try {
      const websiteId = getWebsiteId();
      
      if (websiteId) {
        const cleanPhone = getCleanPhoneNumber(formData.phone);
        await contactApi.submit(websiteId, {
          name: formData.name,
          email: formData.email,
          phone: cleanPhone ? `90${cleanPhone}` : undefined,
          subject: formData.subject || undefined,
          message: formData.message,
        });
      } else {
        // Fallback for demo mode
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      
      toast({
        title: t('success'),
        description: 'Mesajınız başarıyla gönderildi.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setMessageError(null);
    } catch (error) {
      toast({
        title: t('error'),
        description: 'Bir hata oluştu. Lütfen tekrar deneyin.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, message: value });
    
    // Real-time validation
    if (value.trim().length > 0 && value.trim().length < 10) {
      setMessageError('Mesajınız en az 10 karakter olmalıdır.');
    } else {
      setMessageError(null);
    }
  };

  // Telefon numarasını API için temizle (sadece rakamlar)
  const getCleanPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, '');
  };

  return (
    <div className="bg-gradient-to-br from-background via-muted/30 to-background rounded-sm p-6 sm:p-8 shadow-xl border border-border/50 backdrop-blur-xl">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-900">
          İletişim Formu
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground">Bize ulaşmak için formu doldurun</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs sm:text-sm font-semibold">
              {t('name')} *
            </Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-11 sm:h-12 bg-background/50 border-border/50 focus:border-primary transition-all text-sm sm:text-base"
              placeholder="Adınız Soyadınız"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-xs sm:text-sm font-semibold">
              {t('email')} *
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-11 sm:h-12 bg-background/50 border-border/50 focus:border-primary transition-all text-sm sm:text-base"
              placeholder="ornek@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-xs sm:text-sm font-semibold">
              {t('phone')} *
            </Label>
            <IMaskInput
              id="phone"
              mask="(500) 000 00 00"
              definitions={{
                '5': /[5]/,
                '0': /[0-9]/,
              }}
              value={formData.phone}
              unmask={false}
              onAccept={(value: string) => setFormData({ ...formData, phone: value })}
              placeholder="(5__) ___ __ __"
              className="flex h-11 sm:h-12 w-full rounded-md border border-border/50 bg-background/50 px-3 py-2 text-sm sm:text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs sm:text-sm font-semibold">
              {t('subject')} (Opsiyonel)
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="h-11 sm:h-12 bg-background/50 border-border/50 focus:border-primary transition-all text-sm sm:text-base"
              placeholder="Konu"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-xs sm:text-sm font-semibold">
            {t('message')} *
          </Label>
          <Textarea
            id="message"
            required
            minLength={10}
            rows={5}
            value={formData.message}
            onChange={handleMessageChange}
            onBlur={(e) => {
              if (e.target.value.trim().length > 0 && e.target.value.trim().length < 10) {
                setMessageError('Mesajınız en az 10 karakter olmalıdır.');
              } else {
                setMessageError(null);
              }
            }}
            className={`bg-background/50 border-border/50 focus:border-primary transition-all resize-none text-sm sm:text-base ${
              messageError ? 'border-red-500 focus:border-red-500' : ''
            }`}
            placeholder="Mesajınızı buraya yazın... (En az 10 karakter)"
          />
          {messageError && (
            <p className="text-xs sm:text-sm text-red-500 mt-1">{messageError}</p>
          )}
          {formData.message.length > 0 && !messageError && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {formData.message.trim().length}/10 karakter
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full h-11 sm:h-12 bg-gradient-to-r from-primary via-primary/90 to-accent hover:from-primary/90 hover:via-primary hover:to-accent/90 text-primary-foreground text-sm sm:text-base font-semibold shadow-lg shadow-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/40"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {t('sending')}
            </>
          ) : (
            <>
              <Send className="mr-2 h-5 w-5" />
              {t('send')}
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
