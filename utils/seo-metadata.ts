
import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'Hugo Platret',
  title: 'AI Software Engineer & Full-Stack Developer',
  url: 'https://www.hugoplatret.nl',
  location: 'Netherlands / Remote',
  descriptions: {
    en: 'AI Software Engineer in the Netherlands. I build custom AI chatbots, agentic workflows, LLM integrations, and production web applications with Django, Symfony, and Laravel. Available remotely worldwide.',
    fr: 'Ingénieur Logiciel IA aux Pays-Bas. Je construis des chatbots IA sur mesure, des workflows agentiques, des intégrations LLM et des applications web avec Django, Symfony et Laravel. Disponible en remote.',
    nl: 'AI Software Engineer in Nederland. Ik bouw custom AI-chatbots, agentische workflows, LLM-integraties en productie webapplicaties met Django, Symfony en Laravel. Beschikbaar remote en on-site.',
  },
};

// LocalBusiness schema for local SEO
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_CONFIG.url}/#business`,
    name: 'ZaamsFlow',
    alternateName: 'Hugo Platret - AI Software Engineer',
    description: SITE_CONFIG.descriptions.en,
    url: SITE_CONFIG.url,
    telephone: '+33761774207',
    email: 'hugo.platret@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Utrecht',
      addressRegion: 'Utrecht',
      addressCountry: 'NL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 52.0907,
      longitude: 5.1214,
    },
    areaServed: [
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'City', name: 'Utrecht' },
      { '@type': 'City', name: 'Amsterdam' },
      { '@type': 'City', name: 'Rotterdam' },
      { '@type': 'City', name: 'The Hague' },
      { '@type': 'City', name: 'Eindhoven' },
    ],
    serviceType: [
      'AI Software Development',
      'Custom AI Chatbot Development',
      'LLM Integration',
      'Full-Stack Web Development',
      'AI Readiness Audit',
      'Workflow Automation',
      'MCP Server Development',
    ],
    knowsAbout: [
      'Artificial Intelligence', 'Agentic AI', 'LLM Integration',
      'Claude API', 'OpenAI', 'Python', 'PHP', 'Symfony', 'Django',
      'Laravel', 'MCP Servers', 'RAG', 'Full-Stack Development',
    ],
    founder: {
      '@type': 'Person',
      name: 'Hugo Platret',
      jobTitle: 'AI Software Engineer',
      nationality: 'French',
      knowsLanguage: ['French', 'English'],
    },
    priceRange: '€€-€€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    sameAs: [
      'https://linkedin.com/in/hugoplatret',
      'https://github.com/hugoplatret',
    ],
  };
}

export function generateProfessionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.descriptions.en,
    url: SITE_CONFIG.url,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Utrecht',
      addressRegion: 'Utrecht',
      addressCountry: 'NL',
    },
    areaServed: [
      { '@type': 'Country', name: 'Netherlands' },
      { '@type': 'Place', name: 'Europe' },
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
  locale = 'en',
  image = '/og-image',
  ...opts
}: {
  title?: string;
  description?: string;
  locale?: string;
  image?: string;
} & Metadata): Metadata {
  const fullTitle = title ? `${title} | ${SITE_CONFIG.name}` : `${SITE_CONFIG.title} | ${SITE_CONFIG.name}`;
  const localeKey = (locale === 'fr' || locale === 'nl') ? locale : 'en';
  const desc = description || SITE_CONFIG.descriptions[localeKey as keyof typeof SITE_CONFIG.descriptions];

  const localeMap: Record<string, string> = {
    en: 'en_US',
    fr: 'fr_FR',
    nl: 'nl_NL',
  };

  return {
    title: fullTitle,
    description: desc,
    alternates: {
      canonical: SITE_CONFIG.url,
      languages: {
        'en': `${SITE_CONFIG.url}/en`,
        'fr': `${SITE_CONFIG.url}/fr`,
        'nl': `${SITE_CONFIG.url}/nl`,
        'x-default': `${SITE_CONFIG.url}/en`,
      },
    },
    openGraph: {
      title: fullTitle,
      description: desc,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      locale: localeMap[localeKey] || 'en_US',
      alternateLocale: Object.values(localeMap).filter(l => l !== (localeMap[localeKey] || 'en_US')),
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
      description: desc,
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
