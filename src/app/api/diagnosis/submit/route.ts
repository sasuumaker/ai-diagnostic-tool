/**
 * POST /api/diagnosis/submit
 * 回答データからMBTIタイプを算出し、結果を保存
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculateMBTI } from '@/lib/diagnosis/calculator';
import type {
  ApiResponse,
  SubmitDiagnosisRequest,
  SubmitDiagnosisResponse,
  Answer,
  ScoreBreakdown,
} from '@/types/api';
import type { Database } from '@/types/database';

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<SubmitDiagnosisResponse>>> {
  try {
    const body = (await request.json()) as SubmitDiagnosisRequest;
    const { session_id } = body;

    // バリデーション
    if (!session_id) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_REQUEST',
            message: 'セッションIDが必要です',
          },
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // セッションの回答データを取得（questionsテーブルとjoinしてdimensionを取得）
    const { data: responses, error: responsesError } = await supabase
      .from('responses')
      .select(
        `
        question_id,
        option_id,
        value,
        questions!inner (
          dimension
        )
      `
      )
      .eq('session_id', session_id);

    if (responsesError) {
      throw responsesError;
    }

    if (!responses || responses.length === 0) {
      return NextResponse.json(
        {
          error: {
            code: 'RESPONSES_NOT_FOUND',
            message: '回答データが見つかりません',
          },
        },
        { status: 404 }
      );
    }

    // 回答データを変換
    const answersWithDimension = responses.map((r) => ({
      question_id: r.question_id,
      option_id: r.option_id,
      value: r.value,
      dimension: (r.questions as unknown as { dimension: keyof ScoreBreakdown })
        .dimension,
    }));

    // MBTIタイプを計算
    const { mbti_type, score_breakdown } = calculateMBTI(answersWithDimension);

    // MBTIタイプに対応するキャリアを取得
    const { data: career, error: careerError } = await supabase
      .from('careers')
      .select('id')
      .eq('mbti_type', mbti_type)
      .single();

    if (careerError || !career) {
      return NextResponse.json(
        {
          error: {
            code: 'CAREER_NOT_FOUND',
            message: '対応するキャリアが見つかりません',
          },
        },
        { status: 404 }
      );
    }

    // 結果を保存
    const resultToInsert: Database['public']['Tables']['results']['Insert'] = {
      session_id,
      mbti_type,
      career_id: career.id,
      score_breakdown: JSON.parse(JSON.stringify(score_breakdown)),
      version: '1.0',
    };

    const { data: result, error: resultError } = await supabase
      .from('results')
      .insert(resultToInsert)
      .select('id')
      .single();

    if (resultError || !result) {
      throw resultError;
    }

    return NextResponse.json({
      data: {
        result_id: result.id,
        mbti_type,
      },
    });
  } catch (error) {
    console.error('診断結果算出エラー:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '診断結果の算出に失敗しました',
          details: error instanceof Error ? { message: error.message } : {},
        },
      },
      { status: 500 }
    );
  }
}
