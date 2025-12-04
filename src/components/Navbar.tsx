import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-primary shadow-md py-4">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl font-semibold text-green-800">Foundation</span>
        </Link>
        <div className="flex space-x-6">
          <Link href="/vision" className="hover:underline">Vision</Link>
          <Link href="/wege" className="hover:underline">Wege</Link>
          <Link href="/roadmap" className="hover:underline">Roadmap</Link>
          <Link href="/admin" className="hover:underline">Admin</Link>
        </div>
      </div>
    </nav>
  );
}