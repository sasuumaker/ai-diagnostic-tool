/**
 * MBTI診断ロジック
 * 回答データからMBTIタイプを算出
 */

import type { Answer, ScoreBreakdown } from '@/types/api';

/**
 * 回答データからスコア内訳を計算
 * @param answers 回答データの配列
 * @returns スコア内訳
 */
export function calculateScoreBreakdown(answers: Answer[]): ScoreBreakdown {
  const breakdown: ScoreBreakdown = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
    AT: 0,
  };

  // 各回答のvalueを該当する軸に加算
  answers.forEach((answer) => {
    const dimension = answer.question_id; // 実際にはquestionsテーブルから取得する必要がある
    // この関数では、answersに既にdimensionが含まれていることを前提とする
    // 代わりに、呼び出し元でdimensionを含めた形でデータを渡す
  });

  return breakdown;
}

/**
 * スコア内訳からMBTIタイプを決定
 * @param breakdown スコア内訳
 * @returns MBTIタイプ（例: ENTJ-A）
 */
export function determineMBTIType(breakdown: ScoreBreakdown): string {
  // 各軸のタイプを決定
  const ei = breakdown.EI >= 0 ? 'E' : 'I';
  const sn = breakdown.SN >= 0 ? 'S' : 'N';
  const tf = breakdown.TF >= 0 ? 'T' : 'F';
  const jp = breakdown.JP >= 0 ? 'J' : 'P';
  const at = breakdown.AT >= 0 ? 'A' : 'T';

  // MBTI 4文字 + A/T
  return `${ei}${sn}${tf}${jp}-${at}`;
}

/**
 * 回答データからMBTIタイプを算出（メイン関数）
 * @param answersWithDimension 回答データ（dimension情報を含む）
 * @returns MBTIタイプとスコア内訳
 */
export function calculateMBTI(
  answersWithDimension: Array<Answer & { dimension: keyof ScoreBreakdown }>
): { mbti_type: string; score_breakdown: ScoreBreakdown } {
  // スコア内訳を計算
  const breakdown: ScoreBreakdown = {
    EI: 0,
    SN: 0,
    TF: 0,
    JP: 0,
    AT: 0,
  };

  answersWithDimension.forEach((answer) => {
    breakdown[answer.dimension] += answer.value;
  });

  // MBTIタイプを決定
  const mbti_type = determineMBTIType(breakdown);

  return {
    mbti_type,
    score_breakdown: breakdown,
  };
}

/**
 * セッションIDを生成（UUID v4）
 * @returns 新しいセッションID
 */
export function generateSessionId(): string {
  return crypto.randomUUID();
}
