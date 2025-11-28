/**
 * GET /api/questions
 * 診断用の質問リストを取得
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type {
  ApiResponse,
  GetQuestionsResponse,
  QuestionOption,
} from '@/types/api';

export async function GET(): Promise<
  NextResponse<ApiResponse<GetQuestionsResponse>>
> {
  try {
    const supabase = await createClient();

    // 質問をorderの昇順で取得
    const { data: questions, error } = await supabase
      .from('questions')
      .select('*')
      .order('order', { ascending: true });

    if (error) {
      throw error;
    }

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        {
          error: {
            code: 'QUESTIONS_NOT_FOUND',
            message: '質問データが見つかりません',
          },
        },
        { status: 404 }
      );
    }

    // JSONBのoptionsをパース
    const parsedQuestions = questions.map((q) => ({
      id: q.id,
      order: q.order,
      text: q.text,
      dimension: q.dimension as 'EI' | 'SN' | 'TF' | 'JP' | 'AT',
      options: q.options as unknown as QuestionOption[],
    }));

    // バージョンは最初の質問から取得（全質問で統一されている前提）
    const version = questions[0].version;

    return NextResponse.json({
      data: {
        questions: parsedQuestions,
        version,
      },
    });
  } catch (error) {
    console.error('質問取得エラー:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '質問の取得に失敗しました',
          details: error instanceof Error ? { message: error.message } : {},
        },
      },
      { status: 500 }
    );
  }
}
