import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { createServerSupabase } from '@/supabaseClient';

export const revalidate = 60;

interface RoadmapItem {
  id: string;
  category: 'lokal' | 'navi';
  title: string;
  status: string;
  updated_at: string;
}

async function getRoadmapData(): Promise<{ lokal: RoadmapItem[]; navi: RoadmapItem[] }> {
  const supabase = createServerSupabase();
  const { data, error } = await supabase.from('roadmap').select('*');
  if (error || !data) {
    console.error('Failed to fetch roadmap:', error);
    return { lokal: [], navi: [] };
  }
  const lokal = data.filter((item: any) => item.category === 'lokal');
  const navi = data.filter((item: any) => item.category === 'navi');
  return { lokal, navi };
}

export default async function Roadmap() {
  const { lokal, navi } = await getRoadmapData();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-12 flex-1">
        <h1 className="text-4xl font-bold mb-8 text-green-900">Roadmap</h1>
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-green-900">Lokale Roadmap</h2>
          {lokal.length === 0 && <p className="text-green-800">Keine Einträge vorhanden.</p>}
          <ul className="space-y-4">
            {lokal.map((item) => (
              <li key={item.id} className="bg-primary p-4 rounded shadow">
                <h3 className="font-semibold text-green-900">{item.title}</h3>
                <p className="text-green-800">Status: {item.status}</p>
                <p className="text-green-700 text-sm">Aktualisiert am {new Date(item.updated_at).toLocaleDateString('de-DE')}</p>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-3xl font-semibold mb-4 text-green-900">Navi &amp; Plattform Roadmap</h2>
          {navi.length === 0 && <p className="text-green-800">Keine Einträge vorhanden.</p>}
          <ul className="space-y-4">
            {navi.map((item) => (
              <li key={item.id} className="bg-primary p-4 rounded shadow">
                <h3 className="font-semibold text-green-900">{item.title}</h3>
                <p className="text-green-800">Status: {item.status}</p>
                <p className="text-green-700 text-sm">Aktualisiert am {new Date(item.updated_at).toLocaleDateString('de-DE')}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}