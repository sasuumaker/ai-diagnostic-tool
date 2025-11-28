'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface TypeCount {
  mbti_type: string;
  count: number;
}

interface StatsContentProps {
  totalCount: number;
  sortedStats: TypeCount[];
  topTypes: TypeCount[];
  mbtiLabels: Record<string, string>;
}

// MBTIタイプに対応する色
const TYPE_COLORS: Record<string, string> = {
  ENTJ: '#FF7AC3',
  ENTP: '#FF9A8B',
  ENFJ: '#FF6B6B',
  ENFP: '#FFA07A',
  ESTJ: '#7AD7F0',
  ESTP: '#87CEEB',
  ESFJ: '#98D8C8',
  ESFP: '#77DD77',
  INTJ: '#9B59B6',
  INTP: '#8E44AD',
  INFJ: '#E74C3C',
  INFP: '#E91E63',
  ISTJ: '#3498DB',
  ISTP: '#2980B9',
  ISFJ: '#1ABC9C',
  ISFP: '#16A085',
};

export default function StatsContent({
  totalCount,
  sortedStats,
  topTypes,
  mbtiLabels,
}: StatsContentProps) {
  const maxCount = sortedStats.length > 0 ? sortedStats[0].count : 1;

  return (
    <div className="w-full py-8 md:py-12">
      <div className="max-w-screen-lg mx-auto px-4 md:px-6">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">
            診断統計
          </h1>
          <p className="text-base text-slate-600">
            みんなの診断結果をチェック！
          </p>
        </div>

        {/* 総診断数 */}
        <Card padding="md" className="mb-8 text-center">
          <CardContent>
            <p className="text-sm text-slate-500 mb-2">総診断数</p>
            <p className="text-5xl font-bold text-[var(--color-primary)]">
              {totalCount.toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 mt-2">回</p>
          </CardContent>
        </Card>

        {totalCount === 0 ? (
          <Card padding="md" className="text-center">
            <CardContent>
              <p className="text-slate-600 mb-4">
                まだ診断結果がありません。最初の診断者になりましょう！
              </p>
              <Button variant="primary" asChild>
                <Link href="/quiz">診断を始める</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* 人気ランキング */}
            <Card padding="md" className="mb-8">
              <CardHeader>
                <CardTitle>🏆 人気タイプランキング TOP5</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topTypes.map((stat, index) => {
                    const baseType = stat.mbti_type.replace(/-[AT]$/, '');
                    const color = TYPE_COLORS[baseType] || '#FF7AC3';
                    const percentage = Math.round((stat.count / totalCount) * 100);

                    return (
                      <div key={stat.mbti_type} className="flex items-center gap-4">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold text-slate-900">
                              {stat.mbti_type}
                            </span>
                            <span className="text-sm text-slate-500">
                              {stat.count}人 ({percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3">
                            <div
                              className="h-3 rounded-full transition-all duration-500"
                              style={{
                                width: `${(stat.count / maxCount) * 100}%`,
                                backgroundColor: color,
                              }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {mbtiLabels[stat.mbti_type] || ''}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 全タイプ分布 */}
            <Card padding="md" className="mb-8">
              <CardHeader>
                <CardTitle>📊 全タイプ分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {sortedStats.map((stat) => {
                    const baseType = stat.mbti_type.replace(/-[AT]$/, '');
                    const color = TYPE_COLORS[baseType] || '#FF7AC3';
                    const percentage = Math.round((stat.count / totalCount) * 100);

                    return (
                      <div
                        key={stat.mbti_type}
                        className="p-4 rounded-xl text-center"
                        style={{ backgroundColor: `${color}20` }}
                      >
                        <p
                          className="text-lg font-bold"
                          style={{ color }}
                        >
                          {stat.mbti_type}
                        </p>
                        <p className="text-2xl font-bold text-slate-900">
                          {stat.count}
                        </p>
                        <p className="text-xs text-slate-500">
                          {percentage}%
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* タイプ分類説明 */}
            <Card padding="md" className="mb-8">
              <CardHeader>
                <CardTitle>💡 MBTIタイプの見方</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">エネルギーの方向</h4>
                    <p className="text-slate-600">
                      <span className="font-medium">E (外向型)</span>: 外の世界からエネルギーを得る
                    </p>
                    <p className="text-slate-600">
                      <span className="font-medium">I (内向型)</span>: 内の世界からエネルギーを得る
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">情報の取り方</h4>
                    <p className="text-slate-600">
                      <span className="font-medium">S (感覚型)</span>: 具体的・現実的な情報を重視
                    </p>
                    <p className="text-slate-600">
                      <span className="font-medium">N (直観型)</span>: 抽象的・可能性を重視
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">判断の仕方</h4>
                    <p className="text-slate-600">
                      <span className="font-medium">T (思考型)</span>: 論理的・客観的に判断
                    </p>
                    <p className="text-slate-600">
                      <span className="font-medium">F (感情型)</span>: 価値観・感情を重視
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">生活スタイル</h4>
                    <p className="text-slate-600">
                      <span className="font-medium">J (判断型)</span>: 計画的・決断を好む
                    </p>
                    <p className="text-slate-600">
                      <span className="font-medium">P (知覚型)</span>: 柔軟・選択肢を好む
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-2">自己主張タイプ (A/T)</h4>
                  <p className="text-slate-600">
                    <span className="font-medium">A (自己主張型)</span>: ストレスに強く、自信がある
                  </p>
                  <p className="text-slate-600">
                    <span className="font-medium">T (慎重型)</span>: 完璧主義で、成功志向が強い
                  </p>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* 診断ボタン */}
        <div className="text-center">
          <Button variant="primary" size="lg" asChild>
            <Link href="/quiz">あなたも診断してみる</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
