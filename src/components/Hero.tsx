import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-primary py-20">
      <div className="container text-center">
        <h1 className="text-5xl font-bold mb-6 text-green-900">Willkommen bei Foundation</h1>
        <p className="text-xl mb-8 text-green-800 max-w-2xl mx-auto">
          Foundation ist die Plattform hinter Navi – deiner persönlichen Gesundheitsbegleitung. Erforsche unsere Vision,
          entdecke verschiedene Wege der Mitgestaltung und sieh dir unsere Roadmap an.
        </p>
        <Link href="#chat" className="inline-block bg-accent text-green-900 px-8 py-4 rounded-full text-lg font-semibold shadow-md hover:opacity-90">
          Mit Navi chatten
        </Link>
      </div>
    </section>
  );
}