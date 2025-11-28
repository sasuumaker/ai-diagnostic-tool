'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface Career {
  id: string;
  mbti_type: string;
  title: string;
  summary: string;
  skills: string[];
  examples: string[];
  card_copy: string;
  ai_fit: string;
  diagnosis_message?: string;
  image_path: string;
}

interface Result {
  id: string;
  session_id: string;
  mbti_type: string;
  career_id: string;
  created_at: string;
  careers: Career;
}

interface ResultContentProps {
  result: Result;
}

/**
 * 結果ページのクライアントコンポーネント
 * 診断結果の詳細を表示
 */
export default function ResultContent({ result }: ResultContentProps) {
  const [copied, setCopied] = useState(false);

  const career = result.careers;
  const mbtiType = result.mbti_type;

  // シェア機能
  const handleShareTwitter = () => {
    const text = `私の診断結果は「${mbtiType} - ${career.title}」でした！\n#AI適職診断 #MBTI`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      '_blank'
    );
  };

  const handleShareLine = () => {
    const text = `私の診断結果は「${mbtiType} - ${career.title}」でした！`;
    const url = window.location.href;
    window.open(
      `https://line.me/R/msg/text/?${encodeURIComponent(`${text} ${url}`)}`,
      '_blank'
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full py-8 md:py-12">
      <div className="max-w-screen-lg mx-auto px-4 md:px-6">
        {/* 結果ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
            診断結果
          </h1>
          {career.diagnosis_message && (
            <p className="text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto">
              {career.diagnosis_message}
            </p>
          )}
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* ビジュアルカード */}
          <Card padding="md">
            <div className="flex flex-col items-center gap-4">
              {/* キャラクター画像 */}
              <div className="w-64 h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-pink-100 to-blue-100 relative">
                <Image
                  src={career.image_path}
                  alt={career.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* 職種名 */}
              <h2 className="text-2xl font-semibold text-slate-900 text-center">
                {career.title}
              </h2>

              {/* サマリー */}
              <p className="text-base text-slate-700 text-center leading-relaxed">
                {career.summary}
              </p>
            </div>
          </Card>

          {/* テキスト詳細カード */}
          <div className="space-y-4">
            {/* 適正スキル */}
            <Card padding="md">
              <CardHeader>
                <CardTitle>適正スキル</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                  {career.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* 適職例 */}
            <Card padding="md">
              <CardHeader>
                <CardTitle>適職例</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {career.examples.join(' / ')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AIとの相性コメント */}
        <Card padding="md" className="mb-8">
          <CardHeader>
            <CardTitle>AIとの相性</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                {career.ai_fit}
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {career.card_copy}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* シェアボタン */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold text-slate-900">
            結果をシェアしよう！
          </h3>
          <div className="flex flex-col md:flex-row gap-3 justify-center items-center">
            <button
              className="inline-flex items-center justify-center px-5 py-3 text-base font-semibold rounded-full bg-black text-white hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
              onClick={handleShareTwitter}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Xでシェア
            </button>
            <button
              className="inline-flex items-center justify-center px-5 py-3 text-base font-semibold rounded-full bg-[#06C755] text-white hover:bg-[#05b34d] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handleShareLine}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINEで送る
            </button>
            <button
              className={`inline-flex items-center justify-center px-5 py-3 text-base font-semibold rounded-full border-2 border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ${copied ? 'bg-green-50 border-green-500 text-green-700' : ''}`}
              onClick={handleCopyLink}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {copied ? 'コピーしました！' : 'リンクをコピー'}
            </button>
          </div>
        </div>

        {/* 再診断ボタン */}
        <div className="text-center mt-8">
          <Button variant="ghost" size="lg" asChild>
            <Link href="/quiz">もう一度診断する</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
