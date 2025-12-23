import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden max-w-full">
      <Header />
      <main className="flex-1 overflow-x-hidden max-w-full">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}







