import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Eric Junqueira — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background:
          'linear-gradient(135deg, #0a0a0a 0%, #1e1b4b 50%, #0a0a0a 100%)',
        color: 'white',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ fontSize: 36, opacity: 0.75 }}>Hey there 👋🏾</div>
      <div style={{ fontSize: 96, fontWeight: 700, marginTop: 16 }}>
        Eric Junqueira
      </div>
      <div
        style={{
          fontSize: 48,
          marginTop: 16,
          background: 'linear-gradient(90deg, #3b82f6, #a855f7, #ef4444)',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Full Stack Developer
      </div>
    </div>,
    size,
  );
}
