import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RoleCard from '@/components/RoleCard';

const roles = [
  {
    title: 'Nutzer',
    description: 'Als Nutzer profitierst du von Navi und erhältst personalisierte Gesundheitsbegleitung.',
  },
  {
    title: 'Empfehler',
    description: 'Empfehler teilen Navi mit Freunden oder Kunden und unterstützen damit den Wachstum der Community.',
  },
  {
    title: 'Mitgestalter',
    description: 'Mitgestalter bringen eigene Ideen ein, helfen bei der Produktentwicklung und gestalten die Zukunft von Foundation aktiv mit.',
  },
];

export default function Wege() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-12 flex-1">
        <h1 className="text-4xl font-bold mb-8 text-green-900">Wege</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <RoleCard key={role.title} title={role.title} description={role.description} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}