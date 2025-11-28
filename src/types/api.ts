/**
 * API型定義
 * リクエスト/レスポンスの型を定義
 */

/**
 * 質問の選択肢
 */
export interface QuestionOption {
  id: string;
  label: string;
  value: number; // +1 または -1
}

/**
 * 質問データ
 */
export interface Question {
  id: string;
  order: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP' | 'AT';
  options: QuestionOption[];
}

/**
 * 回答データ
 */
export interface Answer {
  question_id: string;
  option_id: string;
  value: number;
}

/**
 * スコア内訳
 */
export interface ScoreBreakdown {
  EI: number;
  SN: number;
  TF: number;
  JP: number;
  AT: number;
}

/**
 * キャリア情報
 */
export interface Career {
  id: string;
  mbti_type: string;
  title: string;
  summary: string;
  skills: string[];
  examples: string[];
  card_copy: string;
  ai_fit: string;
  image_path: string;
}

/**
 * 診断結果
 */
export interface DiagnosisResult {
  id: string;
  session_id: string;
  mbti_type: string;
  career: Career;
  score_breakdown: ScoreBreakdown;
  created_at: string;
}

/**
 * API レスポンス（共通）
 */
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
}

/**
 * API エラー
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * POST /api/diagnosis/start のレスポンス
 */
export interface StartDiagnosisResponse {
  session_id: string;
}

/**
 * GET /api/questions のレスポンス
 */
export interface GetQuestionsResponse {
  questions: Question[];
  version: string;
}

/**
 * POST /api/answers のリクエスト
 */
export interface SubmitAnswersRequest {
  session_id: string;
  answers: Answer[];
}

/**
 * POST /api/diagnosis/submit のリクエスト
 */
export interface SubmitDiagnosisRequest {
  session_id: string;
}

/**
 * POST /api/diagnosis/submit のレスポンス
 */
export interface SubmitDiagnosisResponse {
  result_id: string;
  mbti_type: string;
}

/**
 * GET /api/results/[id] のレスポンス
 */
export interface GetResultResponse {
  result: DiagnosisResult;
}

/**
 * 統計データ
 */
export interface StatsData {
  date: string;
  mbti_counts: Record<string, number>;
  career_counts: Record<string, number>;
}

/**
 * GET /api/stats のレスポンス
 */
export interface GetStatsResponse {
  stats: StatsData[];
}
