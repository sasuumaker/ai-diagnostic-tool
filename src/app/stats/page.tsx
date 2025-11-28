import { Metadata } from 'next';
import { createClient } from '@supabase/supabase-js';
import StatsContent from './StatsContent';

export const metadata: Metadata = {
  title: '診断統計 | 2030年 AI適職診断',
  description: 'みんなの診断結果の統計情報をチェック',
};

// 動的レンダリングを強制（Supabase環境変数がない場合のビルドエラーを回避）
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// MBTIタイプの日本語名マッピング
const MBTI_LABELS: Record<string, string> = {
  'ENTJ-A': 'AIプロダクトディレクター',
  'ENTJ-T': 'AIプロダクトディレクター',
  'ENTP-A': 'AI新規事業プランナー',
  'ENTP-T': 'AI新規事業プランナー',
  'ENFJ-A': 'AI導入コンサルタント',
  'ENFJ-T': 'AI導入コンサルタント',
  'ENFP-A': 'AIコミュニティマネージャー',
  'ENFP-T': 'AIコミュニティマネージャー',
  'ESTJ-A': 'AI業務改善リーダー',
  'ESTJ-T': 'AI業務改善リーダー',
  'ESTP-A': 'AIセールスエンジニア',
  'ESTP-T': 'AIセールスエンジニア',
  'ESFJ-A': 'AIカスタマーサクセス',
  'ESFJ-T': 'AIカスタマーサクセス',
  'ESFP-A': 'AI動画クリエイター',
  'ESFP-T': 'AI動画クリエイター',
  'INTJ-A': 'AIリサーチサイエンティスト',
  'INTJ-T': 'AIリサーチサイエンティスト',
  'INTP-A': 'プロンプトエンジニア',
  'INTP-T': 'プロンプトエンジニア',
  'INFJ-A': 'AIシナリオライター',
  'INFJ-T': 'AIシナリオライター',
  'INFP-A': 'AI体験デザイナー',
  'INFP-T': 'AI体験デザイナー',
  'ISTJ-A': 'AIシステムオーナー',
  'ISTJ-T': 'AIシステムオーナー',
  'ISTP-A': 'AIエンジニア（MLOps/推論基盤）',
  'ISTP-T': 'AIエンジニア（MLOps/推論基盤）',
  'ISFJ-A': 'AIナレッジキュレーター',
  'ISFJ-T': 'AIナレッジキュレーター',
  'ISFP-A': 'AIビジュアルデザイナー',
  'ISFP-T': 'AIビジュアルデザイナー',
};

interface TypeCount {
  mbti_type: string;
  count: number;
}

export default async function StatsPage() {
  // 環境変数がない場合はダミーデータを表示
  if (!supabaseUrl || !supabaseAnonKey) {
    return (
      <StatsContent
        totalCount={0}
        sortedStats={[]}
        topTypes={[]}
        mbtiLabels={MBTI_LABELS}
      />
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // 結果の集計を取得
  const { data: results, error } = await supabase
    .from('results')
    .select('mbti_type');

  if (error) {
    console.error('Stats fetch error:', error);
  }

  // MBTIタイプごとにカウント
  const typeCounts: Record<string, number> = {};
  let totalCount = 0;

  if (results) {
    results.forEach((result) => {
      const type = result.mbti_type;
      typeCounts[type] = (typeCounts[type] || 0) + 1;
      totalCount++;
    });
  }

  // 配列に変換してソート
  const sortedStats: TypeCount[] = Object.entries(typeCounts)
    .map(([mbti_type, count]) => ({ mbti_type, count }))
    .sort((a, b) => b.count - a.count);

  // 上位5タイプを取得
  const topTypes = sortedStats.slice(0, 5);

  return (
    <StatsContent
      totalCount={totalCount}
      sortedStats={sortedStats}
      topTypes={topTypes}
      mbtiLabels={MBTI_LABELS}
    />
  );
}
