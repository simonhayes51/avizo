
export default function TopBar() {
  return (
    <header className="flex items-center justify-between gap-3 pb-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-slate-50">
          Welcome back
        </h1>
        <p className="text-xs text-slate-400">
          Here&apos;s what&apos;s happening with your customers today.
        </p>
      </div>
    </header>
  );
}
