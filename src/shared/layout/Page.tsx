import type { HTMLAttributes } from 'react';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /** Fija la altura al viewport y desactiva scroll (útil en móvil). */
  noScroll?: boolean;
}

export function Page({ children, className = '', noScroll, ...props }: PageProps) {
  return (
    <div
      className={`bg-app ${noScroll ? 'h-screen min-h-dvh overflow-hidden' : 'min-h-screen'} ${className}`}
      {...props}
    >
      <div className="max-w-xl mx-auto">
        {children}
      </div>
    </div>
  );
}