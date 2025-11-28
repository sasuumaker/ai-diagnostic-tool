/**
 * Supabaseデータベース型定義
 * データベーススキーマに対応する型を定義
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      careers: {
        Row: {
          ai_fit: string
          card_copy: string
          examples: string[]
          id: string
          image_path: string
          mbti_type: string
          skills: string[]
          summary: string
          title: string
          updated_at: string | null
          version: string
        }
        Insert: {
          ai_fit: string
          card_copy: string
          examples: string[]
          id?: string
          image_path: string
          mbti_type: string
          skills: string[]
          summary: string
          title: string
          updated_at?: string | null
          version?: string
        }
        Update: {
          ai_fit?: string
          card_copy?: string
          examples?: string[]
          id?: string
          image_path?: string
          mbti_type?: string
          skills?: string[]
          summary?: string
          title?: string
          updated_at?: string | null
          version?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string | null
          dimension: string
          id: string
          options: Json
          order: number
          text: string
          version: string
        }
        Insert: {
          created_at?: string | null
          dimension: string
          id?: string
          options: Json
          order: number
          text: string
          version?: string
        }
        Update: {
          created_at?: string | null
          dimension?: string
          id?: string
          options?: Json
          order?: number
          text?: string
          version?: string
        }
        Relationships: []
      }
      responses: {
        Row: {
          answered_at: string | null
          id: string
          option_id: string
          question_id: string
          session_id: string
          value: number
          version: string
        }
        Insert: {
          answered_at?: string | null
          id?: string
          option_id: string
          question_id: string
          session_id: string
          value: number
          version?: string
        }
        Update: {
          answered_at?: string | null
          id?: string
          option_id?: string
          question_id?: string
          session_id?: string
          value?: number
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "responses_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
        ]
      }
      results: {
        Row: {
          career_id: string
          created_at: string | null
          id: string
          mbti_type: string
          score_breakdown: Json
          session_id: string
          version: string
        }
        Insert: {
          career_id: string
          created_at?: string | null
          id?: string
          mbti_type: string
          score_breakdown: Json
          session_id: string
          version?: string
        }
        Update: {
          career_id?: string
          created_at?: string | null
          id?: string
          mbti_type?: string
          score_breakdown?: Json
          session_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "results_career_id_fkey"
            columns: ["career_id"]
            isOneToOne: false
            referencedRelation: "careers"
            referencedColumns: ["id"]
          },
        ]
      }
      stats_daily: {
        Row: {
          career_counts: Json
          created_at: string | null
          date: string
          mbti_counts: Json
        }
        Insert: {
          career_counts?: Json
          created_at?: string | null
          date: string
          mbti_counts?: Json
        }
        Update: {
          career_counts?: Json
          created_at?: string | null
          date?: string
          mbti_counts?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
