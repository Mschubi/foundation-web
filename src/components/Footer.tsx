export default function Footer() {
  return (
    <footer className="mt-auto py-6 bg-primary text-center text-green-900">
      <p className="text-sm">© {new Date().getFullYear()} Foundation. Alle Rechte vorbehalten.</p>
    </footer>
  );
}