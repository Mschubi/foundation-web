"use client";

import { useState } from 'react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });
      const data = await res.json();
      if (data.message) {
        const assistantMessage: Message = {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.message,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="chat" className="mt-10 p-6 bg-primary rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-green-900">Chat mit Navi (Alpha)</h2>
      <div className="h-64 overflow-y-auto bg-secondary p-4 rounded mb-4 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-2 rounded ${msg.role === 'user' ? 'bg-accent text-green-900 self-end' : 'bg-white text-green-800'}`}>
            {msg.content}
          </div>
        ))}
        {loading && <p className="text-sm text-gray-500">Denken…</p>}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 border border-green-300 p-2 rounded"
          type="text"
          placeholder="Deine Nachricht…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button onClick={sendMessage} className="bg-accent text-green-900 px-4 py-2 rounded font-semibold disabled:opacity-50" disabled={loading}>
          Senden
        </button>
      </div>
    </div>
  );
}