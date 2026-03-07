"use client";

import { useEffect, useMemo, useState } from 'react';

type FileIndex = { longTerm: string | null; daily: string[] };

export default function MemoryView() {
  const [index, setIndex] = useState<FileIndex>({ longTerm: null, daily: [] });
  const [selected, setSelected] = useState<string>('');
  const [content, setContent] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/memory-files')
      .then((r) => r.json())
      .then((d: FileIndex) => {
        setIndex(d);
        const first = d.longTerm ? 'MEMORY.md' : d.daily[0] ? `memory/${d.daily[0]}` : '';
        setSelected(first);
      })
      .catch(() => setIndex({ longTerm: null, daily: [] }));
  }, []);

  useEffect(() => {
    if (!selected) return;
    fetch(`/api/memory-read?file=${encodeURIComponent(selected)}`)
      .then((r) => r.json())
      .then((d) => setContent(d.content || ''))
      .catch(() => setContent(''));
  }, [selected]);

  const filteredDaily = useMemo(() => {
    if (!query.trim()) return index.daily;
    return index.daily.filter((d) => d.toLowerCase().includes(query.toLowerCase()));
  }, [index.daily, query]);

  return (
    <div className="card" style={{ padding: 0 }}>
      <div className="memory-layout">
        <aside className="memory-sidebar">
          <div className="memory-head">
            <h2>Memory</h2>
            <input placeholder="Search days…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </div>

          {index.longTerm && (
            <button className={`memory-item ${selected === 'MEMORY.md' ? 'active' : ''}`} onClick={() => setSelected('MEMORY.md')}>
              Long-Term Memory
            </button>
          )}

          <div className="muted" style={{ margin: '10px 0 6px 0' }}>Daily Memory</div>
          <div className="memory-list">
            {filteredDaily.length ? (
              filteredDaily.map((d) => {
                const key = `memory/${d}`;
                return (
                  <button key={d} className={`memory-item ${selected === key ? 'active' : ''}`} onClick={() => setSelected(key)}>
                    {d.replace('.md', '')}
                  </button>
                );
              })
            ) : (
              <div className="muted">No daily files found.</div>
            )}
          </div>
        </aside>

        <section className="memory-reader">
          <div className="memory-reader-head">
            <strong>{selected || 'No file selected'}</strong>
          </div>
          <pre className="memory-pre">{content || 'No content.'}</pre>
        </section>
      </div>
    </div>
  );
}
