/**
 * GET /api/results/[id]
 * 診断結果を取得
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type {
  ApiResponse,
  GetResultResponse,
  ScoreBreakdown,
  Career,
} from '@/types/api';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
): Promise<NextResponse<ApiResponse<GetResultResponse>>> {
  try {
    const { id } = await params;

    const supabase = await createClient();

    // 結果とキャリア情報を取得
    const { data: result, error } = await supabase
      .from('results')
      .select(
        `
        id,
        session_id,
        mbti_type,
        score_breakdown,
        created_at,
        careers!inner (
          id,
          mbti_type,
          title,
          summary,
          skills,
          examples,
          card_copy,
          ai_fit,
          image_path
        )
      `
      )
      .eq('id', id)
      .single();

    if (error || !result) {
      return NextResponse.json(
        {
          error: {
            code: 'RESULT_NOT_FOUND',
            message: '診断結果が見つかりません',
          },
        },
        { status: 404 }
      );
    }

    // レスポンス形式に変換
    const careerData = result.careers as unknown as Career;
    const response = {
      id: result.id,
      session_id: result.session_id,
      mbti_type: result.mbti_type,
      career: careerData,
      score_breakdown: result.score_breakdown as unknown as ScoreBreakdown,
      created_at: result.created_at || new Date().toISOString(),
    };

    return NextResponse.json({
      data: { result: response },
    });
  } catch (error) {
    console.error('結果取得エラー:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '結果の取得に失敗しました',
          details: error instanceof Error ? { message: error.message } : {},
        },
      },
      { status: 500 }
    );
  }
}
