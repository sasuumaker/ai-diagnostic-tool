import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

/**
 * 利用規約ページ
 */
export default function TermsPage() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-8 text-center">
          利用規約
        </h1>

        <Card padding="lg">
          <CardContent>
            <div className="prose prose-slate max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  1. サービス概要
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  AI診断ツール（以下「本サービス」）は、MBTI理論をベースとしたAI未来職診断サービスを提供します。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  2. 利用条件
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  本サービスを利用するユーザーは、以下の条件に同意したものとみなします：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                  <li>本規約を遵守すること</li>
                  <li>正確な情報を提供すること</li>
                  <li>本サービスを適切に利用すること</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  3. 禁止事項
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  以下の行為を禁止します：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                  <li>本サービスの運営を妨害する行為</li>
                  <li>不正アクセスやクラッキング行為</li>
                  <li>第三者の権利を侵害する行為</li>
                  <li>法令に違反する行為</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  4. 免責事項
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  本サービスの診断結果は参考情報として提供されるものであり、実際のキャリア選択における唯一の判断材料とすることは推奨されません。
                  診断結果に基づく行動により生じた損害について、当サービスは一切の責任を負いません。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  5. 規約の変更
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  当サービスは、必要に応じて本規約を変更することがあります。
                  変更後も本サービスを継続して利用する場合、変更内容に同意したものとみなします。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  6. お問い合わせ
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  利用規約に関するお問い合わせは、以下までご連絡ください：<br />
                  メール: terms@example.com
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
