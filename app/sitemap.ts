import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/utils/seo-metadata';
import { getPostSlugs } from '@/lib/blog';
import fs from 'fs';
import path from 'path';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = SITE_CONFIG.url;
    const locales = ['en', 'nl', 'fr'];

    // Static Pages for all locales
    const routes = locales.flatMap(locale =>
        ['', '/blog'].map((route) => ({
            url: `${baseUrl}/${locale}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: route === '' ? 1 : 0.8,
        }))
    );

    // Blog Posts (Dynamic from filesystem)
    const blogSlugs = getPostSlugs();
    const blogPosts = locales.flatMap(locale =>
        blogSlugs.map((slug) => {
            const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`);
            let lastModified = new Date();

            try {
                if (fs.existsSync(filePath)) {
                    lastModified = fs.statSync(filePath).mtime;
                }
            } catch (e) {
                // Ignore error
            }

            return {
                url: `${baseUrl}/${locale}/blog/${slug}`,
                lastModified,
                changeFrequency: 'monthly' as const,
                priority: 0.6,
            };
        })
    );

    // Case Studies (New)
    const caseStudies = locales.flatMap(locale =>
        ['automating-returns', 'legacy-migration', 'agentic-dashboard'].map((slug) => ({
            url: `${baseUrl}/${locale}/work/${slug}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        }))
    );

    return [...routes, ...blogPosts, ...caseStudies];
}

