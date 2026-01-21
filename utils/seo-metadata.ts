
import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'Zaamsflow',
  title: 'Senior PHP Developer & AI Solutions Consultant',
  description: 'Building high-performance, AI-ready web solutions. Specializing in PHP optimization and Agentic AI implementation in Utrecht.',
  url: 'http://zaamsflow.com',
  location: 'Utrecht, Netherlands',
};

// --- JSON-LD Generators ---

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
      {
        '@type': 'Place',
        name: 'Utrecht',
      },
      {
        '@type': 'Place',
        name: 'Randstad',
      },
      {
        '@type': 'Place',
        name: 'Leidsche Rijn',
      },
    ],
    knowsAbout: ['PHP', 'Laravel', 'Symfony', 'Agentic AI', 'Next.js', 'Python', 'Machine Learning'],
    priceRange: '€€€',
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
    programmingLanguage: ['PHP', 'Python', 'TypeScript'],
    targetProduct: {
      '@type': 'SoftwareApplication',
      name: 'Agentic AI Solutions',
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

// --- Metadata Helpers ---

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
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.title} in Utrecht`;

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
