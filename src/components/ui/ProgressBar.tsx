import React from 'react';

export interface ProgressBarProps {
  current: number;
  total: number;
  showLabel?: boolean;
  className?: string;
}

/**
 * ProgressBar コンポーネント
 * 診断の進捗を表示するプログレスバー
 */
export function ProgressBar({
  current,
  total,
  showLabel = true,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[var(--color-primary)]">
            Q{current} / {total}
          </p>
          <p className="text-xs text-slate-500">{percentage}%</p>
        </div>
      )}
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--color-primary)] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
