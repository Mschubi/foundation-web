import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createServerSupabase } from '@/supabaseClient';

export const revalidate = 60; // revalidate at most every minute

export default async function Vision() {
  let content = 'Unsere Vision: Platzhalter. Diese Inhalte werden bald von Marvin aktualisiert.';
  try {
    const supabase = createServerSupabase();
    const { data } = await supabase
      .from('texts')
      .select('content')
      .eq('key', 'vision')
      .single();
    if (data?.content) {
      content = data.content as string;
    }
  } catch (error) {
    console.error('Failed to fetch vision content:', error);
  }
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-12 flex-1">
        <h1 className="text-4xl font-bold mb-6 text-green-900">Vision</h1>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      </main>
      <Footer />
    </div>
  );
}