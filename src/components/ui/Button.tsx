import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  asChild?: boolean;
  children: React.ReactNode;
}

/**
 * Button コンポーネント
 * ポップでかわいいデザインのボタンコンポーネント
 */
export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  asChild = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  // ベーススタイル
  const baseStyles =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // バリアント別スタイル
  const variantStyles = {
    primary:
      'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]',
    secondary:
      'bg-[var(--color-secondary)] text-white hover:bg-[var(--color-secondary-dark)] focus:ring-[var(--color-secondary)]',
    outline:
      'border-2 border-[var(--color-primary)] text-[var(--color-primary)] bg-transparent hover:bg-[var(--color-primary)] hover:text-white focus:ring-[var(--color-primary)]',
    ghost:
      'bg-pink-50 text-[var(--color-primary)] hover:bg-pink-100 focus:ring-[var(--color-primary)]',
  };

  // サイズ別スタイル
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-full',
    md: 'px-5 py-3 text-base rounded-full',
    lg: 'px-6 py-4 text-lg rounded-full',
  };

  // 幅スタイル
  const widthStyle = fullWidth ? 'w-full' : '';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;

  // asChildの場合、子要素にクラスを適用
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${combinedClassName} ${children.props.className || ''}`,
    } as any);
  }

  return (
    <button className={combinedClassName} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
