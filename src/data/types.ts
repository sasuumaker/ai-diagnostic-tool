// 質問の選択肢
export interface Option {
  id: string;
  label: string;
  value: number; // 1 or -1
}

// 質問
export interface Question {
  id: string;
  order: number;
  text: string;
  dimension: 'EI' | 'SN' | 'TF' | 'JP' | 'AT';
  options: Option[];
  version: string;
}

// 職種・キャリア
export interface Career {
  mbti_type: string; // e.g., "ENTJ-A", "ENTJ-T"
  title: string;
  summary: string;
  skills: string[];
  examples: string[];
  card_copy: string;
  ai_fit: string;
  diagnosis_message: string; // 診断メッセージ
  image_path: string;
  version: string;
}

// MBTIタイプから画像パスを取得するマッピング
export const MBTI_IMAGE_MAP: Record<string, string> = {
  'ENTJ': '/avatars/avatar-entj.png',
  'ENTP': '/avatars/avatar-entp.png',
  'ENFJ': '/avatars/avatar-enfj.png',
  'ENFP': '/avatars/avatar-enfp.png',
  'ESTJ': '/avatars/avatar-estj.png',
  'ESTP': '/avatars/avatar-estp.png',
  'ESFJ': '/avatars/avatar-esfj.png',
  'ESFP': '/avatars/avatar-esfp.png',
  'INTJ': '/avatars/avatar-intj.png',
  'INTP': '/avatars/avatar-intp.png',
  'INFJ': '/avatars/avatar-infj.png',
  'INFP': '/avatars/avatar-infp.png',
  'ISTJ': '/avatars/avatar-istj.png',
  'ISTP': '/avatars/avatar-istp.png',
  'ISFJ': '/avatars/avatar-isfj.png',
  'ISFP': '/avatars/avatar-isfp.png',
};

// MBTIタイプ（A/T除く）を取得
export function getBaseMbtiType(mbtiType: string): string {
  return mbtiType.replace(/-[AT]$/, '');
}

// MBTIタイプから画像パスを取得
export function getImagePath(mbtiType: string): string {
  const baseType = getBaseMbtiType(mbtiType);
  return MBTI_IMAGE_MAP[baseType] || '/avatars/avatar-default.png';
}
