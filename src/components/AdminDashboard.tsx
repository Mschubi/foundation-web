"use client";
import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';

interface TextEntry {
  id: string;
  key: string;
  content: string;
}

interface RoadmapEntry {
  id: string;
  category: string;
  title: string;
  status: string;
}

interface NaviRule {
  id: string;
  trigger: string;
  behavior: string;
  priority: string;
  tags: string[];
}

interface RoleEntry {
  user_id: string;
  role: string;
}

export default function AdminDashboard() {
  const [texts, setTexts] = useState<TextEntry[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapEntry[]>([]);
  const [rules, setRules] = useState<NaviRule[]>([]);
  const [roles, setRoles] = useState<RoleEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [{ data: textData }, { data: roadmapData }, { data: ruleData }, { data: roleData }] = await Promise.all([
        supabase.from('texts').select('*'),
        supabase.from('roadmap').select('*'),
        supabase.from('navi_brain_rules').select('*'),
        supabase.from('roles').select('*'),
      ]);
      setTexts(textData || []);
      setRoadmap(roadmapData || []);
      setRules(ruleData || []);
      setRoles(roleData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const updateText = async (id: string, content: string) => {
    await supabase.from('texts').update({ content }).eq('id', id);
    setTexts((prev) => prev.map((t) => (t.id === id ? { ...t, content } : t)));
  };

  const updateRoadmap = async (id: string, fields: Partial<RoadmapEntry>) => {
    await supabase.from('roadmap').update(fields).eq('id', id);
    setRoadmap((prev) => prev.map((r) => (r.id === id ? { ...r, ...fields } : r)));
  };

  const updateRule = async (id: string, fields: Partial<NaviRule>) => {
    await supabase.from('navi_brain_rules').update(fields).eq('id', id);
    setRules((prev) => prev.map((r) => (r.id === id ? { ...r, ...fields } : r)));
  };

  const updateRole = async (user_id: string, role: string) => {
    await supabase.from('roles').update({ role }).eq('user_id', user_id);
    setRoles((prev) => prev.map((r) => (r.user_id === user_id ? { ...r, role } : r)));
  };

  if (loading) {
    return <p>Lade Daten…</p>;
  }
  return (
    <div className="space-y-12">
      {/* Texts Module */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-900">Texte bearbeiten</h2>
        {texts.map((text) => (
          <div key={text.id} className="mb-4 p-4 bg-primary rounded">
            <h3 className="font-semibold text-green-900">{text.key}</h3>
            <textarea
              className="w-full border border-green-300 rounded p-2 mt-2 text-green-800"
              rows={4}
              value={text.content}
              onChange={(e) => updateText(text.id, e.target.value)}
            />
          </div>
        ))}
      </section>

      {/* Roadmap Module */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-900">Roadmap-Pflege</h2>
        {roadmap.map((item) => (
          <div key={item.id} className="mb-4 p-4 bg-primary rounded">
            <input
              className="w-full border border-green-300 rounded p-2 mb-2"
              value={item.title}
              onChange={(e) => updateRoadmap(item.id, { title: e.target.value })}
            />
            <div className="flex space-x-4 mb-2">
              <select
                className="border border-green-300 rounded p-2 flex-1"
                value={item.category}
                onChange={(e) => updateRoadmap(item.id, { category: e.target.value })}
              >
                <option value="lokal">Lokal</option>
                <option value="navi">Navi</option>
              </select>
              <input
                className="border border-green-300 rounded p-2 flex-1"
                value={item.status}
                onChange={(e) => updateRoadmap(item.id, { status: e.target.value })}
              />
            </div>
          </div>
        ))}
      </section>

      {/* Roles Module */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-900">Rollenverwaltung</h2>
        {roles.map((roleEntry) => (
          <div key={roleEntry.user_id} className="mb-4 p-4 bg-primary rounded">
            <p className="mb-2">User ID: {roleEntry.user_id}</p>
            <select
              className="border border-green-300 rounded p-2"
              value={roleEntry.role}
              onChange={(e) => updateRole(roleEntry.user_id, e.target.value)}
            >
              <option value="admin">Admin</option>
              <option value="mastermind">Mastermind</option>
              <option value="partner">Partner</option>
              <option value="user">User</option>
            </select>
          </div>
        ))}
      </section>

      {/* Navi Brain Rules Module */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-green-900">Navi-Regeln bearbeiten</h2>
        {rules.map((rule) => (
          <div key={rule.id} className="mb-4 p-4 bg-primary rounded">
            <input
              className="w-full border border-green-300 rounded p-2 mb-2"
              value={rule.trigger}
              onChange={(e) => updateRule(rule.id, { trigger: e.target.value })}
            />
            <textarea
              className="w-full border border-green-300 rounded p-2 mb-2"
              rows={3}
              value={rule.behavior}
              onChange={(e) => updateRule(rule.id, { behavior: e.target.value })}
            />
            <select
              className="border border-green-300 rounded p-2 mb-2"
              value={rule.priority}
              onChange={(e) => updateRule(rule.id, { priority: e.target.value })}
            >
              <option value="low">Niedrig</option>
              <option value="medium">Mittel</option>
              <option value="high">Hoch</option>
            </select>
            <input
              className="w-full border border-green-300 rounded p-2"
              value={rule.tags.join(', ')}
              onChange={(e) => updateRule(rule.id, { tags: e.target.value.split(',').map((t) => t.trim()) })}
              placeholder="Tags (kommagetrennt)"
            />
          </div>
        ))}
      </section>
    </div>
  );
}