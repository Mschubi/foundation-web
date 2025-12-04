"use client";
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminDashboard from '@/components/AdminDashboard';
import { supabase } from '@/supabaseClient';

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
    // Listen for changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    if (!email) return;
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage('Magic-Link wurde gesendet. Bitte prüfe dein E‑Mail‑Postfach.');
      }
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-12 flex-1">
        {!session ? (
          <div className="max-w-md mx-auto bg-primary p-6 rounded shadow">
            <h1 className="text-2xl font-semibold mb-4 text-green-900">Admin Login</h1>
            <p className="mb-4 text-green-800">
              Bitte gib deine E-Mail-Adresse ein, um einen Magic-Link zu erhalten.
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail-Adresse"
              className="w-full border border-green-300 rounded p-2 mb-4"
            />
            <button
              onClick={handleLogin}
              className="bg-accent text-green-900 px-4 py-2 rounded font-semibold w-full"
            >
              Magic-Link senden
            </button>
            {message && <p className="mt-4 text-sm text-green-700">{message}</p>}
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold mb-6 text-green-900">Admin-Bereich</h1>
            <p className="mb-4 text-green-800">
              Willkommen! Du bist eingeloggt. Hier kannst du Inhalte der Plattform pflegen.
            </p>
            <AdminDashboard />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}