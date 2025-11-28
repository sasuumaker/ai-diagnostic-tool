/**
 * Supabase クライアントサイド設定
 * ブラウザで使用するSupabaseクライアントを提供
 */

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

/**
 * ブラウザ用のSupabaseクライアントを作成
 * 環境変数から接続情報を取得
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
