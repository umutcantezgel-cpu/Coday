import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        borderRadius: '20%',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
        <path
          d="M336 176 A 120 120 0 1 0 336 336"
          fill="none"
          stroke="#111827"
          strokeWidth="72"
          strokeLinecap="round"
        />
      </svg>
    </div>,
    { ...size }
  );
}
