
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import TopBar from './TopBar.jsx';

export default function MainShell() {
  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_top,_#0f172a_0,_#020617_55%,_#000_100%)] text-slate-100">
      <div className="mx-auto flex max-w-6xl gap-4 px-3 py-4 sm:px-4 sm:py-6">
        <Sidebar />
        <main className="flex-1">
          <TopBar />
          <div className="space-y-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
