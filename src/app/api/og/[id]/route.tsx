import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import { careers } from '@/data/careers';

export const runtime = 'edge';

// キャリアデータをMBTIタイプから取得
function getCareerByType(typeSlug: string) {
  // entj-a -> ENTJ-A のように変換
  const mbtiType = typeSlug.toUpperCase();
  return careers.find((c) => c.mbti_type === mbtiType);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    // 静的データからキャリア情報を取得
    const career = getCareerByType(id);

    if (!career) {
      // デフォルトOGP画像を返す
      return new ImageResponse(
        (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #FFE5F1 0%, #E5F7FF 100%)',
              fontFamily: 'sans-serif',
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 'bold',
                color: '#1F2933',
                marginBottom: 16,
              }}
            >
              2030年 AI適職診断
            </div>
            <div
              style={{
                fontSize: 24,
                color: '#616E7C',
              }}
            >
              あなたにぴったりのAI時代の職業を診断
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    const mbtiType = career.mbti_type;
    const title = career.title;
    const subtitle = career.summary;

    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            padding: 48,
            background: 'linear-gradient(135deg, #FFE5F1 0%, #E5F7FF 100%)',
            fontFamily: 'sans-serif',
          }}
        >
          {/* メインカード */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 48,
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* 左側: テキスト */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                justifyContent: 'center',
                paddingRight: 32,
              }}
            >
              {/* MBTIタイプバッジ */}
              <div
                style={{
                  display: 'flex',
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    backgroundColor: '#FF7AC3',
                    color: 'white',
                    fontSize: 24,
                    fontWeight: 'bold',
                    padding: '8px 24px',
                    borderRadius: 24,
                  }}
                >
                  {mbtiType}
                </div>
              </div>

              {/* タイトル */}
              <div
                style={{
                  fontSize: 44,
                  fontWeight: 'bold',
                  color: '#1F2933',
                  lineHeight: 1.3,
                  marginBottom: 16,
                }}
              >
                {title}
              </div>

              {/* サブタイトル */}
              <div
                style={{
                  fontSize: 22,
                  color: '#616E7C',
                  lineHeight: 1.4,
                  marginBottom: 32,
                }}
              >
                {subtitle}
              </div>

              {/* ブランド */}
              <div
                style={{
                  fontSize: 16,
                  color: '#9AA5B1',
                }}
              >
                2030年 AI適職診断
              </div>
            </div>

            {/* 右側: アバター画像プレースホルダー */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 280,
              }}
            >
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #7AD7F0 0%, #FF7AC3 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 56,
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                {mbtiType.replace('-', '\n').split('\n')[0]}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OGP generation error:', error);

    // エラー時のフォールバック
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #FFE5F1 0%, #E5F7FF 100%)',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              fontSize: 48,
              fontWeight: 'bold',
              color: '#1F2933',
            }}
          >
            2030年 AI適職診断
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
