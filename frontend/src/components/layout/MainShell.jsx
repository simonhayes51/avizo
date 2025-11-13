
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';

export default function MainShell() {
  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a_0,_#020617_55%,_#000_100%)] text-slate-100">
      <div className="mx-auto flex max-w-6xl gap-4 px-3 py-4 sm:px-4 sm:py-6">
        <Sidebar />
        <main className="flex-1">
          <div className="glass-panel mb-4 hidden items-center justify-between px-4 py-2 text-xs text-slate-300 md:flex">
            <span>Demo mode · Backed by a real API & database.</span>
            <span className="text-slate-400">v0.1 · Avizo Preview</span>
          </div>
          <TopBar />
          <div className="space-y-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
