import Link from 'next/link';

const teasers = [
  {
    title: 'Vision',
    description: 'Erfahre, wie Foundation die Welt der Gesundheitsbegleitung verändern will.',
    href: '/vision',
  },
  {
    title: 'Wege',
    description: 'Welche Rolle passt zu dir? Nutzer, Empfehler oder Mitgestalter?',
    href: '/wege',
  },
  {
    title: 'Roadmap',
    description: 'Bleibe auf dem Laufenden mit unserer Entwicklungs-Roadmap.',
    href: '/roadmap',
  },
];

export default function TeaserSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
        {teasers.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-primary rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-200"
          >
            <h3 className="text-2xl font-semibold mb-2 text-green-900">{item.title}</h3>
            <p className="text-green-800">{item.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}