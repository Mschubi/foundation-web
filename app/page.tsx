import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TeaserSection from '@/components/TeaserSection';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

// ChatWidget uses "use client", so we need dynamic import with SSR disabled
const ChatWidget = dynamic(() => import('@/components/ChatWidget'), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <TeaserSection />
      <div className="container">
        <ChatWidget />
      </div>
      <Footer />
    </div>
  );
}