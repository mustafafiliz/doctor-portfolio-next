'use client';

import { useTranslations } from '@/components/I18nProvider';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';

export function ContactForm() {
  const t = useTranslations('contact.form');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // In production, this would send to an API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
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

  return (
    <div className="bg-gradient-to-br from-background via-muted/30 to-background rounded-sm p-6 sm:p-8 shadow-xl border border-border/50 backdrop-blur-xl">
      <div className="mb-5 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
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
            <Input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="h-11 sm:h-12 bg-background/50 border-border/50 focus:border-primary transition-all text-sm sm:text-base"
              placeholder="+90 5XX XXX XX XX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-xs sm:text-sm font-semibold">
              {t('subject')}
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="h-11 sm:h-12 bg-background/50 border-border/50 focus:border-primary transition-all text-sm sm:text-base"
              placeholder="Konu (Opsiyonel)"
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
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="bg-background/50 border-border/50 focus:border-primary transition-all resize-none text-sm sm:text-base"
            placeholder="Mesajınızı buraya yazın..."
          />
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
