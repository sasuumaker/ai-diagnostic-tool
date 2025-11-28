import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

/**
 * プライバシーポリシーページ
 */
export default function PrivacyPage() {
  return (
    <div className="w-full py-8 md:py-12">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-8 text-center">
          プライバシーポリシー
        </h1>

        <Card padding="lg">
          <CardContent>
            <div className="prose prose-slate max-w-none space-y-6">
              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  1. 収集する情報
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  当サービスでは、診断結果の提供とサービス改善のため、以下の情報を収集します：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                  <li>診断の回答内容</li>
                  <li>診断結果</li>
                  <li>アクセスログ（IPアドレス、ブラウザ情報など）</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  2. 情報の利用目的
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  収集した情報は以下の目的で利用します：
                </p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                  <li>診断結果の提供</li>
                  <li>サービスの改善・分析</li>
                  <li>統計データの作成（個人を特定できない形式）</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  3. 情報の第三者提供
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  当サービスは、法令に基づく場合を除き、ユーザーの同意なく個人情報を第三者に提供することはありません。
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">
                  4. お問い合わせ
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  プライバシーポリシーに関するお問い合わせは、以下までご連絡ください：<br />
                  メール: privacy@example.com
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
