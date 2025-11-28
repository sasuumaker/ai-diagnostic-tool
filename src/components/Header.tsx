'use client';

import Link from 'next/link';
import { Button } from './ui';

/**
 * Header コンポーネント
 * アプリケーション共通のヘッダー
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
      <div className="max-w-screen-lg mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ/タイトル */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-lg">AI</span>
            </div>
            <span className="text-xl font-semibold text-slate-900 hidden sm:block">
              AI診断ツール
            </span>
          </Link>

          {/* ナビゲーション */}
          <nav className="flex items-center gap-3">
            <Link
              href="/quiz"
              className="text-sm font-medium text-slate-700 hover:text-[var(--color-primary)] transition-colors hidden md:block"
            >
              診断を受ける
            </Link>
            <Button size="sm" asChild>
              <Link href="/quiz">診断を始める</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
