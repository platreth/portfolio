import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/utils/seo-metadata';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_CONFIG.url;

    // Static Pages
    const routes = [
        '',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Blog Posts
    const blogPosts = [
        'why-mcp-is-future',
        'migrating-legacy-php',
        'local-ai-vs-openai',
    ].map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    // Case Studies (New)
    const caseStudies = [
        'automating-returns',
        'legacy-migration',
        'agentic-dashboard',
    ].map((slug) => ({
        url: `${baseUrl}/work/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...routes, ...blogPosts, ...caseStudies];
}
