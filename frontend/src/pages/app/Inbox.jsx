
import { useEffect, useState } from 'react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import { api } from '../../api.js';

export default function Inbox() {
  const [threads, setThreads] = useState([]);
  const [active, setActive] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');

  async function loadThreads() {
    try {
      const data = await api.getThreads();
      setThreads(data);
      if (data.length && !active) {
        selectThread(data[0].id);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function selectThread(id) {
    setActive(id);
    try {
      const data = await api.getThread(id);
      setMessages(data.messages);
    } catch (e) {
      console.error(e);
    }
  }

  async function send(e) {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    try {
      const res = await api.sendMessage(active, { sender: 'you', text: draft.trim() });
      setMessages((m) => [...m, res]);
      setDraft('');
      loadThreads();
    } catch (e) {
      console.error(e);
      alert('Error sending message');
    }
  }

  useEffect(() => {
    loadThreads();
  }, []);

  const activeThread = threads.find((t) => t.id === active);

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
      <Card className="p-0 flex flex-col">
        <div className="border-b border-slate-800 px-4 py-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-100">Inbox</h2>
          <span className="pill bg-slate-800/80 text-slate-200 border border-slate-700/80">
            {threads.length} threads
          </span>
        </div>
        <div className="flex-1 divide-y divide-slate-800">
          {threads.map((t) => (
            <button
              key={t.id}
              onClick={() => selectThread(t.id)}
              className={`w-full text-left px-4 py-3 flex flex-col gap-1 hover:bg-slate-800/70 transition ${
                t.id === active ? 'bg-slate-900/80' : ''
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-100">{t.customer_name || `Customer #${t.customer_id}`}</span>
                <span className="text-slate-500">{t.last_time || ''}</span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                {t.last_message || 'No messages yet'}
              </p>
            </button>
          ))}
          {threads.length === 0 && (
            <p className="px-4 py-3 text-xs text-slate-400">
              No conversations yet. Once messages are sent, they&apos;ll appear here.
            </p>
          )}
        </div>
      </Card>

      <Card className="flex flex-col">
        {activeThread ? (
          <>
            <div className="mb-2 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-100">
                  {activeThread.customer_name || `Customer #${activeThread.customer_id}`}
                </div>
                <div className="text-[11px] text-slate-400">
                  Demo conversation via the API
                </div>
              </div>
              <Button variant="ghost" className="text-xs px-3 py-1.5">
                Open customer
              </Button>
            </div>
            <div className="flex-1 rounded-xl bg-slate-950/60 border border-slate-800/80 p-3 space-y-3 text-xs overflow-y-auto max-h-80">
              <div className="text-slate-400 text-[11px] text-center mb-1">
                Messages below are stored in the database.
              </div>
              <div className="space-y-2">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-xs rounded-2xl px-3 py-2 ${
                      m.sender === 'you'
                        ? 'ml-auto bg-brand-500/90 text-slate-50'
                        : 'bg-slate-800/80 text-slate-100'
                    }`}
                  >
                    <div className="text-[10px] text-slate-300 mb-0.5">
                      {m.sender === 'you' ? 'You' : 'Them'} ·{' '}
                      {new Date(m.created_at).toLocaleTimeString()}
                    </div>
                    <div>{m.text}</div>
                  </div>
                ))}
                {messages.length === 0 && (
                  <p className="text-[11px] text-slate-400">
                    No messages yet. Say hi below.
                  </p>
                )}
              </div>
            </div>
            <form
              onSubmit={send}
              className="mt-3 flex items-center gap-2"
            >
              <input
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-brand-400 focus:outline-none focus:ring-1 focus:ring-brand-400"
                placeholder="Type a reply…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
              />
              <Button className="text-xs px-3 py-2">Send</Button>
            </form>
          </>
        ) : (
          <p className="text-xs text-slate-400">
            Select a thread on the left to view messages.
          </p>
        )}
      </Card>
    </div>
  );
}
