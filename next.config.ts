import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/click2gig',
        destination: '/click2gig.html',
      },
    ];
  },
};

export default withNextIntl(nextConfig);
