import { ImageResponse } from 'next/og';
import { SITE_CONFIG } from '@/utils/seo-metadata';

export const runtime = 'edge';

// Image metadata
export const alt = 'Senior PHP Developer & AI Solutions Consultant - Utrecht';
export const size = {
    width: 1200,
    height: 630,
};

export default async function Image() {
    // We can fetch Google Fonts here if needed, but for stability we stick to basic styling

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #1a1a1a, #2d2d2d)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                    padding: '40px',
                    textAlign: 'center',
                }}
            >
                <div
                    style={{
                        fontSize: 24,
                        opacity: 0.6,
                        marginBottom: 20,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                    }}
                >
                    {SITE_CONFIG.location}
                </div>
                <div
                    style={{
                        fontSize: 64,
                        fontWeight: 'bold',
                        lineHeight: 1.1,
                        marginBottom: 20,
                        background: 'linear-gradient(to right, #d946ef, #a855f7)',
                        backgroundClip: 'text',
                        color: 'transparent',
                    }}
                >
                    {SITE_CONFIG.name}
                </div>
                <div
                    style={{
                        fontSize: 32,
                        maxWidth: 800,
                    }}
                >
                    Senior PHP Developer & AI Consultant
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        fontSize: 18,
                        opacity: 0.4,
                    }}
                >
                    {SITE_CONFIG.url}
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
