'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';

// 質問データの型定義
interface Question {
  id: string;
  dimension: string;
  order: number;
  text: string;
  options: {
    id: string;
    text: string;
    value: number;
  }[];
}

// 7段階の選択肢ラベル
const SCALE_LABELS = [
  { value: 3, label: 'とても当てはまる' },
  { value: 2, label: 'やや当てはまる' },
  { value: 1, label: '少し当てはまる' },
  { value: 0, label: 'どちらでもない' },
  { value: -1, label: '少し当てはまる' },
  { value: -2, label: 'やや当てはまる' },
  { value: -3, label: 'とても当てはまる' },
];

// ローカルの質問データ（40問）
const LOCAL_QUESTIONS: Question[] = [
  // E/I（外向/内向）8問
  { id: 'q1', dimension: 'EI', order: 1, text: '休日は新しい人に会いに行く方が好きだ / 家で好きなことに没頭する方が好きだ', options: [{ id: 'a', text: '休日は新しい人に会いに行く方が好きだ', value: 1 }, { id: 'b', text: '家で好きなことに没頭する方が好きだ', value: -1 }] },
  { id: 'q2', dimension: 'EI', order: 2, text: 'アイデアは人に話しながら整理する / メモに書き出してから整理する', options: [{ id: 'a', text: 'アイデアは人に話しながら整理する', value: 1 }, { id: 'b', text: 'メモに書き出してから整理する', value: -1 }] },
  { id: 'q3', dimension: 'EI', order: 3, text: 'イベントでは自然と人を巻き込む / まず観察してから動く', options: [{ id: 'a', text: 'イベントでは自然と人を巻き込む', value: 1 }, { id: 'b', text: 'まず観察してから動く', value: -1 }] },
  { id: 'q4', dimension: 'EI', order: 4, text: '新しいチームで自己紹介をリードする / 様子を見てから話し始める', options: [{ id: 'a', text: '新しいチームで自己紹介をリードする', value: 1 }, { id: 'b', text: '様子を見てから話し始める', value: -1 }] },
  { id: 'q5', dimension: 'EI', order: 5, text: '雑談しながら仕事を進める方が楽しい / 静かな環境の方が集中できる', options: [{ id: 'a', text: '雑談しながら仕事を進める方が楽しい', value: 1 }, { id: 'b', text: '静かな環境の方が集中できる', value: -1 }] },
  { id: 'q6', dimension: 'EI', order: 6, text: '大人数の場で発言するのは苦にならない / 小人数や1対1の方が話しやすい', options: [{ id: 'a', text: '大人数の場で発言するのは苦にならない', value: 1 }, { id: 'b', text: '小人数や1対1の方が話しやすい', value: -1 }] },
  { id: 'q7', dimension: 'EI', order: 7, text: '初対面でもすぐ打ち解ける / 慣れるまで時間をかける', options: [{ id: 'a', text: '初対面でもすぐ打ち解ける', value: 1 }, { id: 'b', text: '慣れるまで時間をかける', value: -1 }] },
  { id: 'q8', dimension: 'EI', order: 8, text: '企画を話して反応を見たい / 自分で練ってから出したい', options: [{ id: 'a', text: '企画を話して反応を見たい', value: 1 }, { id: 'b', text: '自分で練ってから出したい', value: -1 }] },
  // S/N（現実/直観）8問
  { id: 'q9', dimension: 'SN', order: 9, text: '具体的な手順があると安心する / 大まかな方向性があれば動ける', options: [{ id: 'a', text: '具体的な手順があると安心する', value: 1 }, { id: 'b', text: '大まかな方向性があれば動ける', value: -1 }] },
  { id: 'q10', dimension: 'SN', order: 10, text: 'データや実例を重視する / コンセプトや可能性を重視する', options: [{ id: 'a', text: 'データや実例を重視する', value: 1 }, { id: 'b', text: 'コンセプトや可能性を重視する', value: -1 }] },
  { id: 'q11', dimension: 'SN', order: 11, text: 'まずは今ある情報で進める / 未来のシナリオを考えて準備する', options: [{ id: 'a', text: 'まずは今ある情報で進める', value: 1 }, { id: 'b', text: '未来のシナリオを考えて準備する', value: -1 }] },
  { id: 'q12', dimension: 'SN', order: 12, text: '小さな改善を積み上げるのが得意 / 大きく作り変える方が得意', options: [{ id: 'a', text: '小さな改善を積み上げるのが得意', value: 1 }, { id: 'b', text: '大きく作り変える方が得意', value: -1 }] },
  { id: 'q13', dimension: 'SN', order: 13, text: '詳細な仕様を詰めたい / 先に全体像を描きたい', options: [{ id: 'a', text: '詳細な仕様を詰めたい', value: 1 }, { id: 'b', text: '先に全体像を描きたい', value: -1 }] },
  { id: 'q14', dimension: 'SN', order: 14, text: '決まったやり方を守る方が安心 / 新しいやり方を試す方がワクワクする', options: [{ id: 'a', text: '決まったやり方を守る方が安心', value: 1 }, { id: 'b', text: '新しいやり方を試す方がワクワクする', value: -1 }] },
  { id: 'q15', dimension: 'SN', order: 15, text: '現場の感覚や体験を重視する / 抽象的なアイデアで発想する', options: [{ id: 'a', text: '現場の感覚や体験を重視する', value: 1 }, { id: 'b', text: '抽象的なアイデアで発想する', value: -1 }] },
  { id: 'q16', dimension: 'SN', order: 16, text: '目の前の課題から片付ける / 少し先を見越して動く', options: [{ id: 'a', text: '目の前の課題から片付ける', value: 1 }, { id: 'b', text: '少し先を見越して動く', value: -1 }] },
  // T/F（思考/感情）8問
  { id: 'q17', dimension: 'TF', order: 17, text: '判断は合理性や効率を優先する / 人の気持ちや影響を優先する', options: [{ id: 'a', text: '判断は合理性や効率を優先する', value: 1 }, { id: 'b', text: '人の気持ちや影響を優先する', value: -1 }] },
  { id: 'q18', dimension: 'TF', order: 18, text: '率直なフィードバックを歓迎する / 相手に配慮した伝え方を重視する', options: [{ id: 'a', text: '率直なフィードバックを歓迎する', value: 1 }, { id: 'b', text: '相手に配慮した伝え方を重視する', value: -1 }] },
  { id: 'q19', dimension: 'TF', order: 19, text: '数字や根拠で説得する / 共感やストーリーで伝える', options: [{ id: 'a', text: '数字や根拠で説得する', value: 1 }, { id: 'b', text: '共感やストーリーで伝える', value: -1 }] },
  { id: 'q20', dimension: 'TF', order: 20, text: '議論で意見がぶつかっても平気 / 空気が悪くなるのを避けたい', options: [{ id: 'a', text: '議論で意見がぶつかっても平気', value: 1 }, { id: 'b', text: '空気が悪くなるのを避けたい', value: -1 }] },
  { id: 'q21', dimension: 'TF', order: 21, text: '役割分担が明確だとやりやすい / みんなで助け合う雰囲気が大切', options: [{ id: 'a', text: '役割分担が明確だとやりやすい', value: 1 }, { id: 'b', text: 'みんなで助け合う雰囲気が大切', value: -1 }] },
  { id: 'q22', dimension: 'TF', order: 22, text: 'ルールや仕組みで解決したい / 話し合いで調整したい', options: [{ id: 'a', text: 'ルールや仕組みで解決したい', value: 1 }, { id: 'b', text: '話し合いで調整したい', value: -1 }] },
  { id: 'q23', dimension: 'TF', order: 23, text: '目標達成のために厳しく進めることがある / みんなが納得するペースを大事にする', options: [{ id: 'a', text: '目標達成のために厳しく進めることがある', value: 1 }, { id: 'b', text: 'みんなが納得するペースを大事にする', value: -1 }] },
  { id: 'q24', dimension: 'TF', order: 24, text: '「正しいこと」を基準に動く / 「優しいこと」を基準に動く', options: [{ id: 'a', text: '「正しいこと」を基準に動く', value: 1 }, { id: 'b', text: '「優しいこと」を基準に動く', value: -1 }] },
  // J/P（判断/知覚）8問
  { id: 'q25', dimension: 'JP', order: 25, text: '計画を立ててから動きたい / 走りながら考えたい', options: [{ id: 'a', text: '計画を立ててから動きたい', value: 1 }, { id: 'b', text: '走りながら考えたい', value: -1 }] },
  { id: 'q26', dimension: 'JP', order: 26, text: '締め切り前に早めに終わらせる / 期限ギリギリまで練ることがある', options: [{ id: 'a', text: '締め切り前に早めに終わらせる', value: 1 }, { id: 'b', text: '期限ギリギリまで練ることがある', value: -1 }] },
  { id: 'q27', dimension: 'JP', order: 27, text: '優先順位を決めて順番に進める / 気になったところから着手する', options: [{ id: 'a', text: '優先順位を決めて順番に進める', value: 1 }, { id: 'b', text: '気になったところから着手する', value: -1 }] },
  { id: 'q28', dimension: 'JP', order: 28, text: '手順が決まっている方が安心 / 状況に合わせて柔軟に変えたい', options: [{ id: 'a', text: '手順が決まっている方が安心', value: 1 }, { id: 'b', text: '状況に合わせて柔軟に変えたい', value: -1 }] },
  { id: 'q29', dimension: 'JP', order: 29, text: '予定通り進むと気持ちいい / 変化に合わせて予定を変えるのが得意', options: [{ id: 'a', text: '予定通り進むと気持ちいい', value: 1 }, { id: 'b', text: '変化に合わせて予定を変えるのが得意', value: -1 }] },
  { id: 'q30', dimension: 'JP', order: 30, text: 'ToDoリストで管理する / 思いついたときに動く方がうまくいく', options: [{ id: 'a', text: 'ToDoリストで管理する', value: 1 }, { id: 'b', text: '思いついたときに動く方がうまくいく', value: -1 }] },
  { id: 'q31', dimension: 'JP', order: 31, text: '決めたことを崩したくない / 途中で方向転換するのも平気', options: [{ id: 'a', text: '決めたことを崩したくない', value: 1 }, { id: 'b', text: '途中で方向転換するのも平気', value: -1 }] },
  { id: 'q32', dimension: 'JP', order: 32, text: '事前準備を厚くする / 現場対応で何とかする', options: [{ id: 'a', text: '事前準備を厚くする', value: 1 }, { id: 'b', text: '現場対応で何とかする', value: -1 }] },
  // A/T 傾向（自己主張/慎重）8問
  { id: 'q33', dimension: 'AT', order: 33, text: 'すぐ決断して動きたい / もう少し確かめてから動きたい', options: [{ id: 'a', text: 'すぐ決断して動きたい', value: 1 }, { id: 'b', text: 'もう少し確かめてから動きたい', value: -1 }] },
  { id: 'q34', dimension: 'AT', order: 34, text: '新しいアイデアはまず試す / 影響を考えてから試す', options: [{ id: 'a', text: '新しいアイデアはまず試す', value: 1 }, { id: 'b', text: '影響を考えてから試す', value: -1 }] },
  { id: 'q35', dimension: 'AT', order: 35, text: 'リスクはとりあえず受け入れて前に進む / リスクを洗い出してから進む', options: [{ id: 'a', text: 'リスクはとりあえず受け入れて前に進む', value: 1 }, { id: 'b', text: 'リスクを洗い出してから進む', value: -1 }] },
  { id: 'q36', dimension: 'AT', order: 36, text: '多少の失敗は織り込み済みで進める / 失敗を減らす対策を厚くする', options: [{ id: 'a', text: '多少の失敗は織り込み済みで進める', value: 1 }, { id: 'b', text: '失敗を減らす対策を厚くする', value: -1 }] },
  { id: 'q37', dimension: 'AT', order: 37, text: 'フィードバックは即反映したい / 一度整理してから反映したい', options: [{ id: 'a', text: 'フィードバックは即反映したい', value: 1 }, { id: 'b', text: '一度整理してから反映したい', value: -1 }] },
  { id: 'q38', dimension: 'AT', order: 38, text: '速度重視で実験を回す / 品質重視で精度を高める', options: [{ id: 'a', text: '速度重視で実験を回す', value: 1 }, { id: 'b', text: '品質重視で精度を高める', value: -1 }] },
  { id: 'q39', dimension: 'AT', order: 39, text: '前に出てリードするのが得意 / じっくり整えて支えるのが得意', options: [{ id: 'a', text: '前に出てリードするのが得意', value: 1 }, { id: 'b', text: 'じっくり整えて支えるのが得意', value: -1 }] },
  { id: 'q40', dimension: 'AT', order: 40, text: '「まずやってみよう」で動く / 「準備ができてから」で動く', options: [{ id: 'a', text: '「まずやってみよう」で動く', value: 1 }, { id: 'b', text: '「準備ができてから」で動く', value: -1 }] },
];

const QUESTIONS_PER_PAGE = 10;
const TOTAL_PAGES = 4;

/**
 * 診断ページ
 * 1ページ10問、7段階選択
 */
export default function QuizPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 現在のページの質問を取得
  const currentQuestions = LOCAL_QUESTIONS.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  // 進捗率
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / LOCAL_QUESTIONS.length) * 100;

  // 現在のページの質問がすべて回答されているか
  const isPageComplete = currentQuestions.every((q) => answers[q.id] !== undefined);

  // 回答を保存
  const handleAnswer = (questionId: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // 次のページへ
  const handleNext = () => {
    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 前のページへ
  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 診断結果を計算
  const calculateResult = () => {
    const scores: Record<string, number> = {
      EI: 0,
      SN: 0,
      TF: 0,
      JP: 0,
      AT: 0,
    };

    // 各次元のスコアを集計
    LOCAL_QUESTIONS.forEach((q) => {
      const answerValue = answers[q.id];
      if (answerValue !== undefined) {
        scores[q.dimension] += answerValue;
      }
    });

    // MBTIタイプを決定
    const E_I = scores.EI >= 0 ? 'E' : 'I';
    const S_N = scores.SN >= 0 ? 'S' : 'N';
    const T_F = scores.TF >= 0 ? 'T' : 'F';
    const J_P = scores.JP >= 0 ? 'J' : 'P';
    const A_T = scores.AT >= 0 ? 'A' : 'T';

    const mbtiType = `${E_I}${S_N}${T_F}${J_P}-${A_T}`;
    return { mbtiType, scores };
  };

  // 結果を送信
  const handleSubmit = () => {
    if (answeredCount < LOCAL_QUESTIONS.length) {
      alert('すべての質問に回答してください');
      return;
    }

    setIsSubmitting(true);

    const { mbtiType } = calculateResult();

    // 静的ページにリダイレクト（例: /result/entj-a）
    const typeSlug = mbtiType.toLowerCase();
    router.push(`/result/${typeSlug}`);
  };

  return (
    <div className="w-full">
      {/* スティッキーヘッダー（進捗表示） */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-screen-md mx-auto px-4 md:px-6 py-3">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold text-[var(--color-primary)]">
              ページ {currentPage + 1} / {TOTAL_PAGES}
            </p>
            <p className="text-sm font-medium text-slate-600">
              Q{Math.min(answeredCount + 1, LOCAL_QUESTIONS.length)} / {LOCAL_QUESTIONS.length}
            </p>
          </div>
          <ProgressBar current={answeredCount} total={LOCAL_QUESTIONS.length} />
        </div>
      </div>

      <div className="max-w-screen-md mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* 質問リスト */}
        <div className="space-y-6">
          {currentQuestions.map((question, index) => {
            const questionNumber = currentPage * QUESTIONS_PER_PAGE + index + 1;
            const [leftOption, rightOption] = question.options;
            const currentAnswer = answers[question.id];

            return (
              <Card key={question.id} padding="md">
                <div className="space-y-4">
                  {/* 質問番号と質問文 */}
                  <div className="flex items-start gap-2">
                    <span className="text-base font-bold text-[var(--color-primary)] shrink-0">
                      Q{questionNumber}.
                    </span>
                    <p className="text-base font-bold text-slate-900 leading-relaxed">
                      {question.text.split(' / ')[0]}
                    </p>
                  </div>

                  {/* 7段階スケール */}
                  <div className="space-y-3">
                    {/* 7段階ボタン */}
                    <div className="flex justify-between items-center gap-1 sm:gap-2">
                      {SCALE_LABELS.map((scale, i) => {
                        const isSelected = currentAnswer === scale.value;
                        const size = Math.abs(scale.value) === 3 ? 'w-10 h-10 sm:w-12 sm:h-12'
                          : Math.abs(scale.value) === 2 ? 'w-9 h-9 sm:w-11 sm:h-11'
                          : Math.abs(scale.value) === 1 ? 'w-8 h-8 sm:w-10 sm:h-10'
                          : 'w-7 h-7 sm:w-9 sm:h-9';

                        const bgColor = scale.value > 0
                          ? 'bg-pink-100 hover:bg-pink-200 border-pink-200'
                          : scale.value < 0
                          ? 'bg-blue-100 hover:bg-blue-200 border-blue-200'
                          : 'bg-slate-100 hover:bg-slate-200 border-slate-200';

                        const selectedColor = scale.value > 0
                          ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
                          : scale.value < 0
                          ? 'bg-[var(--color-secondary)] border-[var(--color-secondary)]'
                          : 'bg-slate-500 border-slate-500';

                        return (
                          <button
                            key={i}
                            onClick={() => handleAnswer(question.id, scale.value)}
                            className={`
                              ${size} rounded-full border-2 transition-all duration-200
                              ${isSelected ? selectedColor : bgColor}
                              ${isSelected ? 'ring-2 ring-offset-2 ring-slate-400' : ''}
                              flex items-center justify-center
                            `}
                            title={scale.label}
                          >
                            {isSelected && (
                              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* スケールの説明 */}
                    <div className="flex text-xs text-slate-600 font-medium">
                      <span className="flex-1 text-left">当てはまる</span>
                      <span className="flex-1 text-center">どちらでもない</span>
                      <span className="flex-1 text-right">当てはまらない</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* ナビゲーション */}
        <div className="flex justify-between items-center mt-8 pt-4 border-t border-slate-100">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentPage === 0}
          >
            ← 戻る
          </Button>

          {currentPage < TOTAL_PAGES - 1 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              disabled={!isPageComplete}
            >
              次へ →
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={answeredCount < LOCAL_QUESTIONS.length || isSubmitting}
            >
              {isSubmitting ? '診断中...' : '結果を見る'}
            </Button>
          )}
        </div>

        {/* 残り質問数 */}
        <p className="text-center text-sm text-slate-500 mt-4">
          回答済み: {answeredCount} / {LOCAL_QUESTIONS.length} 問
        </p>
      </div>
    </div>
  );
}
