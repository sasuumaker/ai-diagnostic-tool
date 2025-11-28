import Link from 'next/link';
import { Button } from '@/components/ui';

/**
 * ランディングページ
 * AI診断ツールのトップページ
 */
export default function HomePage() {
  return (
    <div className="w-full">
      {/* ヒーローセクション */}
      <section className="max-w-screen-lg mx-auto px-4 md:px-6 py-12">
        <div className="rounded-3xl bg-gradient-to-r from-pink-50 via-white to-blue-50 shadow-md p-6 md:p-10 flex flex-col gap-6">
          <p className="text-sm font-semibold text-[var(--color-primary)]">
            AI Diagnostic Tool
          </p>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight text-slate-900">
            あなたにぴったりの<br />
            AI未来職を見つけよう
          </h1>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            40の質問に答えるだけで、MBTIベースのAI職種とキャラ画像がわかるよ。<br />
            あなたの適性に合ったAI時代のキャリアを診断します。
          </p>
          <div className="flex flex-col md:flex-row gap-3">
            <Button size="lg" asChild>
              <Link href="/quiz">診断を始める</Link>
            </Button>
            <Button variant="ghost" size="lg" asChild>
              <Link href="/stats">みんなの結果を見る</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section className="max-w-screen-lg mx-auto px-4 md:px-6 py-10 md:py-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-slate-900 mb-8">
          3つの特徴
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* 特徴1 */}
          <div className="rounded-2xl bg-white shadow-md p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-100 to-pink-50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--color-primary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              MBTI診断40問
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              科学的根拠のあるMBTI理論をベースにした40の質問で、あなたの性格タイプを正確に診断します。
            </p>
          </div>

          {/* 特徴2 */}
          <div className="rounded-2xl bg-white shadow-md p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--color-secondary)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              AIキャラ表示
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              診断結果に合わせたオリジナルのAIキャラクター画像を表示。あなたのタイプを視覚的に表現します。
            </p>
          </div>

          {/* 特徴3 */}
          <div className="rounded-2xl bg-white shadow-md p-6 flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[var(--color-accent)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              結果シェア
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              診断結果をX（Twitter）やLINEで簡単にシェア。友達と診断結果を比較して盛り上がろう！
            </p>
          </div>
        </div>
      </section>

      {/* CTAセクション */}
      <section className="max-w-screen-lg mx-auto px-4 md:px-6 py-10 md:py-12">
        <div className="rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] shadow-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            さあ、診断を始めよう！
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed">
            たった5分で、あなたのAI時代のキャリアが見えてきます
          </p>
          <Button size="lg" variant="outline" className="bg-white text-[var(--color-primary)] border-white hover:bg-white/90" asChild>
            <Link href="/quiz">無料で診断を始める</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
