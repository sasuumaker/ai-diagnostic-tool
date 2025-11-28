import Link from 'next/link';

/**
 * Footer コンポーネント
 * アプリケーション共通のフッター
 */
export function Footer() {
  return (
    <footer className="w-full bg-[var(--background-sub)] border-t border-slate-200 mt-auto">
      <div className="max-w-screen-lg mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* コピーライト */}
          <p className="text-sm text-slate-600">
            © 2025 AI診断ツール. All rights reserved.
          </p>

          {/* リンク */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/privacy"
              className="text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors"
            >
              プライバシーポリシー
            </Link>
            <Link
              href="/terms"
              className="text-sm text-slate-600 hover:text-[var(--color-primary)] transition-colors"
            >
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
