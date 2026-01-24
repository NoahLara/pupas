import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses = 'px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/25 focus-visible:outline-orange-500 active:scale-[0.98]',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm focus-visible:outline-slate-400 active:scale-[0.98]',
    success: 'bg-green-500 text-white hover:bg-green-600 hover:shadow-md hover:shadow-green-500/25 focus-visible:outline-green-500 active:scale-[0.98]',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}