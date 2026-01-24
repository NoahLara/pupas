import type { HTMLAttributes } from 'react';

interface PageProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Page({ children, className = '', ...props }: PageProps) {
  return (
    <div
      className={`min-h-screen bg-[#fafbfc] ${className}`}
      {...props}
    >
      <div className="max-w-xl mx-auto">
        {children}
      </div>
    </div>
  );
}