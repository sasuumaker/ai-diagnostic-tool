import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient';
  padding?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Card コンポーネント
 * 角丸でシャドウ付きのカードコンポーネント
 */
export function Card({
  variant = 'default',
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  // ベーススタイル
  const baseStyles = 'rounded-2xl';

  // バリアント別スタイル
  const variantStyles = {
    default: 'bg-white shadow-md',
    gradient:
      'bg-gradient-to-r from-pink-50 via-white to-blue-50 shadow-md',
  };

  // パディング別スタイル
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-10',
  };

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`;

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardHeader({ className = '', children, ...props }: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function CardTitle({ className = '', children, ...props }: CardTitleProps) {
  return (
    <h3 className={`text-lg md:text-xl font-semibold text-slate-900 leading-snug ${className}`} {...props}>
      {children}
    </h3>
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function CardContent({ className = '', children, ...props }: CardContentProps) {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
}
