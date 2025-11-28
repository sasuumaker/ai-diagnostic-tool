/**
 * GET /api/stats
 * 診断統計データを取得
 */

import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { ApiResponse, GetStatsResponse, StatsData } from '@/types/api';

export async function GET(): Promise<
  NextResponse<ApiResponse<GetStatsResponse>>
> {
  try {
    const supabase = await createClient();

    // 統計データを取得（最新7日分）
    const { data: stats, error } = await supabase
      .from('stats_daily')
      .select('*')
      .order('date', { ascending: false })
      .limit(7);

    if (error) {
      throw error;
    }

    // レスポンス形式に変換
    const statsData: StatsData[] = (stats || []).map((stat) => ({
      date: stat.date,
      mbti_counts: stat.mbti_counts as Record<string, number>,
      career_counts: stat.career_counts as Record<string, number>,
    }));

    return NextResponse.json({
      data: { stats: statsData },
    });
  } catch (error) {
    console.error('統計取得エラー:', error);
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: '統計データの取得に失敗しました',
          details: error instanceof Error ? { message: error.message } : {},
        },
      },
      { status: 500 }
    );
  }
}
