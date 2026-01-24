interface HeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onReset?: () => void;
}

export function Header({ title, subtitle, onBack, onReset }: HeaderProps) {
  return (
    <header className="bg-orange-500 px-5 py-4">
      <div className="max-w-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            >
              ←
            </button>
          )}
          <div className="text-white">
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            {subtitle && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm">👥</span>
                <p className="text-sm">{subtitle}</p>
              </div>
            )}
          </div>
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white text-sm font-medium transition-colors flex items-center gap-2"
          >
            <span>🔄</span>
            Nuevo
          </button>
        )}
      </div>
    </header>
  );
}
