import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { careers } from '@/data/careers';
import ResultContent from './ResultContent';

// 32パターンの静的ページを事前生成
export function generateStaticParams() {
  // MBTI 16タイプ × A/T 2パターン = 32
  const mbtiTypes = [
    'entj-a', 'entj-t', 'entp-a', 'entp-t',
    'enfj-a', 'enfj-t', 'enfp-a', 'enfp-t',
    'estj-a', 'estj-t', 'estp-a', 'estp-t',
    'esfj-a', 'esfj-t', 'esfp-a', 'esfp-t',
    'intj-a', 'intj-t', 'intp-a', 'intp-t',
    'infj-a', 'infj-t', 'infp-a', 'infp-t',
    'istj-a', 'istj-t', 'istp-a', 'istp-t',
    'isfj-a', 'isfj-t', 'isfp-a', 'isfp-t',
  ];

  return mbtiTypes.map((id) => ({ id }));
}

interface ResultPageProps {
  params: Promise<{ id: string }>;
}

// キャリアデータをMBTIタイプから取得
function getCareerByType(typeSlug: string) {
  // entj-a -> ENTJ-A のように変換
  const mbtiType = typeSlug.toUpperCase();
  return careers.find((c) => c.mbti_type === mbtiType);
}

// 動的メタデータ生成
export async function generateMetadata({
  params,
}: ResultPageProps): Promise<Metadata> {
  const { id } = await params;
  const career = getCareerByType(id);

  if (!career) {
    return {
      title: '診断結果 | 2030年 AI適職診断',
      description: 'あなたのAI時代の適職を診断しました',
    };
  }

  const title = `${career.mbti_type} - ${career.title} | 2030年 AI適職診断`;
  const description = career.card_copy || 'あなたのAI時代の適職を診断しました';
  const ogImageUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/og/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

// 静的ページ生成
export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;
  const career = getCareerByType(id);

  if (!career) {
    notFound();
  }

  // ResultContentに渡すデータ形式に整形
  const result = {
    id,
    session_id: '',
    mbti_type: career.mbti_type,
    career_id: '',
    created_at: new Date().toISOString(),
    careers: {
      id: '',
      mbti_type: career.mbti_type,
      title: career.title,
      summary: career.summary,
      skills: career.skills,
      examples: career.examples,
      card_copy: career.card_copy,
      ai_fit: career.ai_fit,
      diagnosis_message: career.diagnosis_message,
      image_path: career.image_path,
    },
  };

  return <ResultContent result={result} />;
}
