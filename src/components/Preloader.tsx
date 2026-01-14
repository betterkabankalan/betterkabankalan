export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-700">
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-end gap-1 h-10">
          <span className="w-2 h-6 bg-white rounded animate-wave delay-0" />
          <span className="w-2 h-8 bg-white rounded animate-wave delay-100" />
          <span className="w-2 h-10 bg-white rounded animate-wave delay-200" />
          <span className="w-2 h-8 bg-white rounded animate-wave delay-300" />
          <span className="w-2 h-6 bg-white rounded animate-wave delay-400" />
        </div>

        <p className="text-white text-sm tracking-wide opacity-80">
          Loading BetterKabankalan…
        </p>
      </div>
    </div>
  );
}
