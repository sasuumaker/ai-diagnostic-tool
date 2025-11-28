'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

// ダミー質問データ（実際はAPIから取得）
const QUESTIONS = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  question: `質問${i + 1}：あなたは${i % 2 === 0 ? '計画的に' : '柔軟に'}物事を進めるタイプですか？`,
  options: [
    { id: 'a', text: 'はい、そうです', value: 'E' },
    { id: 'b', text: 'いいえ、違います', value: 'I' },
  ],
}));

/**
 * 診断ページ
 * 40問のMBTI診断を実施
 */
export default function QuizPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentStep];
  const totalQuestions = QUESTIONS.length;
  const isLastQuestion = currentStep === totalQuestions - 1;
  const canGoNext = selectedOption !== null;
  const canGoBack = currentStep > 0;

  // 選択肢を選択
  const handleSelectOption = (optionId: string, value: string) => {
    setSelectedOption(optionId);
    // すぐに回答を保存
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  // 次へ進む
  const handleNext = () => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      // 診断完了 - 結果ページへ
      // 実際にはここでAPIに送信してセッションIDを取得
      router.push('/result/demo');
    } else {
      // 次の質問へ
      setCurrentStep((prev) => prev + 1);
      // 次の質問で既に回答済みの選択肢があればセット
      const nextQuestionId = QUESTIONS[currentStep + 1].id;
      const existingAnswer = answers[nextQuestionId];
      if (existingAnswer) {
        const option = QUESTIONS[currentStep + 1].options.find(
          (opt) => opt.value === existingAnswer
        );
        setSelectedOption(option?.id || null);
      } else {
        setSelectedOption(null);
      }
    }
  };

  // 戻る
  const handleBack = () => {
    if (!canGoBack) return;

    setCurrentStep((prev) => prev - 1);
    // 前の質問の回答を復元
    const prevQuestionId = QUESTIONS[currentStep - 1].id;
    const existingAnswer = answers[prevQuestionId];
    if (existingAnswer) {
      const option = QUESTIONS[currentStep - 1].options.find(
        (opt) => opt.value === existingAnswer
      );
      setSelectedOption(option?.id || null);
    } else {
      setSelectedOption(null);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex items-center justify-center py-8">
      <div className="max-w-2xl w-full mx-auto px-4 md:px-6">
        <Card padding="md">
          {/* プログレスバー */}
          <ProgressBar current={currentStep + 1} total={totalQuestions} />

          {/* 質問カード */}
          <div className="mt-6 space-y-6">
            <h2 className="text-xl md:text-2xl font-semibold text-slate-900 leading-snug">
              {currentQuestion.question}
            </h2>

            {/* 選択肢 */}
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option.id, option.value)}
                    className={`w-full rounded-xl border-2 px-4 py-4 text-left text-base font-semibold transition-all ${
                      isSelected
                        ? 'border-[var(--color-primary)] bg-pink-50 text-[var(--color-primary)]'
                        : 'border-slate-200 bg-white text-slate-800 hover:border-pink-300 hover:bg-pink-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.text}</span>
                      {isSelected && (
                        <svg
                          className="w-6 h-6 text-[var(--color-primary)]"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ナビゲーションボタン */}
            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                disabled={!canGoBack}
              >
                ← 戻る
              </Button>
              <Button
                size="md"
                onClick={handleNext}
                disabled={!canGoNext}
              >
                {isLastQuestion ? '結果を見る' : '次へ →'}
              </Button>
            </div>
          </div>
        </Card>

        {/* 進捗情報 */}
        <p className="text-center text-sm text-slate-500 mt-4">
          残り {totalQuestions - currentStep - 1} 問
        </p>
      </div>
    </div>
  );
}
