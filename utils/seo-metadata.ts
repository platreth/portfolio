
import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'Hugo Platret',
  title: 'AI Software Engineer & Full-Stack Developer',
  description: 'AI Software Engineer with 7 years of full-stack experience. Building AI-powered systems, agentic workflows, and production-grade web applications. Available remotely and in the Netherlands.',
  url: 'https://www.hugoplatret.nl',
  location: 'Netherlands / Remote',
};

export function generateProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Utrecht',
      addressRegion: 'Utrecht',
      addressCountry: 'NL',
    },
    areaServed: [
      { '@type': 'Place', name: 'Utrecht' },
      { '@type': 'Place', name: 'Randstad' },
      { '@type': 'Place', name: 'Netherlands' },
    ],
    knowsAbout: ['Agentic AI', 'LLM Integration', 'Python', 'PHP', 'Symfony', 'Django', 'Claude API', 'MCP Servers', 'Full-Stack Development'],
    founder: {
      '@type': 'Person',
      name: 'Hugo Platret',
    },
  };
}

export function generateSoftwareSourceCodeSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    programmingLanguage: ['Python', 'PHP', 'TypeScript', 'JavaScript'],
    targetProduct: {
      '@type': 'SoftwareApplication',
      name: 'AI-Powered Solutions',
      applicationCategory: 'BusinessApplication',
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function constructMetadata({
  title,
  description,
  image = '/og-image',
  ...opts
}: {
  title?: string;
  description?: string;
  image?: string;
} & Metadata): Metadata {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.title} | ${SITE_CONFIG.name}`;

  return {
    title: fullTitle,
    description: description || SITE_CONFIG.description,
    openGraph: {
      title: fullTitle,
      description: description || SITE_CONFIG.description,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || SITE_CONFIG.description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...opts,
  };
}
