/**
 * POST /api/diagnosis/start
 * 診断セッションを開始し、セッションIDを発行
 */

import { NextResponse } from 'next/server';
import { generateSessionId } from '@/lib/diagnosis/calculator';
import type { ApiResponse, StartDiagnosisResponse } from '@/types/api';

export async function POST(): Promise<
  NextResponse<ApiResponse<StartDiagnosisResponse>>
> {
  try {
    // セッションIDを生成
    const session_id = generateSessionId();

    return NextResponse.json({
      data: { session_id },
    });
  } catch (error) {
    console.error('診断開始エラー:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '診断の開始に失敗しました',
          details: error instanceof Error ? { message: error.message } : {},
        },
      },
      { status: 500 }
    );
  }
}
