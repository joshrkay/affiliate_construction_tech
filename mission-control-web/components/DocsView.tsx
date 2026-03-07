"use client";

import { useEffect, useMemo, useState } from 'react';
import type { Project, ProjectReference } from '../lib/types';

type DocItem = {
  id: string;
  path: string;
  name: string;
  ext: string;
  category: string;
  size: number;
  mtimeMs: number;
};

export default function DocsView({
  projects,
  setReferences,
}: {
  projects: Project[];
  setReferences: React.Dispatch<React.SetStateAction<ProjectReference[]>>;
}) {
  const [docs, setDocs] = useState<DocItem[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [content, setContent] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [findText, setFindText] = useState('');
  const [linkProjectId, setLinkProjectId] = useState(projects[0]?.id || '');

  useEffect(() => {
    fetch('/api/docs-files')
      .then((r) => r.json())
      .then((d) => {
        setDocs(d.items || []);
        if (d.items?.length) setSelected(d.items[0].path);
      })
      .catch(() => setDocs([]));
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetch(`/api/docs-read?file=${encodeURIComponent(selected)}`)
      .then((r) => r.json())
      .then((d) => setContent(d.content || ''))
      .catch(() => setContent(''));
  }, [selected]);

  const categories = useMemo(() => ['All', ...Array.from(new Set(docs.map((d) => d.category)))], [docs]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return docs.filter((d) => {
      const passCategory = category === 'All' || d.category === category;
      const passSearch = !q || d.name.toLowerCase().includes(q) || d.path.toLowerCase().includes(q);
      return passCategory && passSearch;
    });
  }, [docs, search, category]);

  const selectedDoc = docs.find((d) => d.path === selected);

  const foundLines = useMemo(() => {
    const q = findText.trim().toLowerCase();
    if (!q) return [] as string[];
    return content
      .split('\n')
      .filter((line) => line.toLowerCase().includes(q))
      .slice(0, 12);
  }, [content, findText]);

  const attachToProject = () => {
    if (!selectedDoc || !linkProjectId) return;
    setReferences((prev) => [
      {
        id: crypto.randomUUID(),
        projectId: linkProjectId,
        kind: 'document',
        label: selectedDoc.name,
        url: selectedDoc.path,
      },
      ...prev,
    ]);
  };

  return (
    <div className="card" style={{ padding: 0 }}>
      <div className="memory-layout">
        <aside className="memory-sidebar">
          <div className="memory-head">
            <h2>Docs</h2>
            <input placeholder="Search documents..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>

          <div className="bubble-row" style={{ marginTop: 8, marginBottom: 8 }}>
            {categories.map((c) => (
              <button key={c} className={`bubble ${category === c ? 'memory-item active' : ''}`} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="memory-list">
            {filtered.map((d) => (
              <button
                key={d.id}
                className={`memory-item ${selected === d.path ? 'active' : ''}`}
                onClick={() => setSelected(d.path)}
              >
                <div>{d.name}</div>
                <div className="ticket-meta">{d.category} • {d.ext}</div>
              </button>
            ))}
            {!filtered.length && <div className="muted">No docs matched.</div>}
          </div>
        </aside>

        <section className="memory-reader">
          <div className="memory-reader-head" style={{ display: 'grid', gap: 8 }}>
            <strong>{selectedDoc?.name || 'No document selected'}</strong>
            <div className="ticket-meta">{selectedDoc?.path || ''}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <select value={linkProjectId} onChange={(e) => setLinkProjectId(e.target.value)}>
                {projects.map((p) => (
                  <option value={p.id} key={p.id}>{p.name}</option>
                ))}
              </select>
              <button onClick={attachToProject}>Link doc to project</button>
              <input
                placeholder="Find in document..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                style={{ minWidth: 220 }}
              />
            </div>
          </div>

          {!!findText.trim() && (
            <div style={{ marginBottom: 10 }}>
              <div className="muted" style={{ marginBottom: 4 }}>Search matches</div>
              {foundLines.length ? (
                foundLines.map((l, i) => (
                  <div className="ticket-meta" key={i}>• {l}</div>
                ))
              ) : (
                <div className="muted">No matches.</div>
              )}
            </div>
          )}

          <pre className="memory-pre">{content || 'No content.'}</pre>
        </section>
      </div>
    </div>
  );
}
