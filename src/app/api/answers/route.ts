/**
 * POST /api/answers
 * 診断の回答を一括で送信・保存
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ApiResponse, SubmitAnswersRequest } from '@/types/api';
import type { Database } from '@/types/database';

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<{ success: boolean }>>> {
  try {
    const body = (await request.json()) as SubmitAnswersRequest;
    const { session_id, answers } = body;

    // バリデーション
    if (!session_id || !answers || !Array.isArray(answers)) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_REQUEST',
            message: '不正なリクエストです',
          },
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 回答データを一括挿入
    const responsesToInsert: Database['public']['Tables']['responses']['Insert'][] =
      answers.map((answer) => ({
        session_id,
        question_id: answer.question_id,
        option_id: answer.option_id,
        value: answer.value,
        version: '1.0',
      }));

    const { error } = await supabase
      .from('responses')
      .insert(responsesToInsert);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      data: { success: true },
    });
  } catch (error) {
    console.error('回答保存エラー:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '回答の保存に失敗しました',
          details: error instanceof Error ? { message: error.message } : {},
        },
      },
      { status: 500 }
    );
  }
}
