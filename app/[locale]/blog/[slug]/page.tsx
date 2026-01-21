import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// In a real app, you'd fetch this from a file system or CMS
const POSTS: Record<string, { title: string; date: string; content: string; tags: string[] }> = {
    'why-mcp-is-future': {
        title: 'Why the Model Context Protocol (MCP) is the Future of E-commerce',
        date: '2025-10-15',
        tags: ['Architecture', 'Agents'],
        content: `
The Model Context Protocol (MCP) is revolutionizing how we connect LLMs to existing data sources. instead of building custom brittle integrations, we can now expose data safely.

## The Problem with Legacy API Integration

Most e-commerce stores run on legacy PHP monoliths (Magento, custom layouts). Building an AI agent that "knows" your inventory usually involves:
1.  Scraping the site (brittle)
2.  Building a custom API just for the AI (expensive)
3.  dumping SQL into a vector DB (stale data)

## Enter MCP

MCP provides a standardized way to expose resources (files, database rows) and tools (functions) to an LLM.

\`\`\`typescript
const server = new McpServer({
  name: "Magento-Adapter",
  version: "1.0.0"
});
\`\`\`

By wrapping your legacy logic in an MCP server, you create a "universal adapter" that any AI client (Claude, Cursor, custom agents) can talk to.
    `,
    },
    'migrating-legacy-php': {
        title: 'Migrating Legacy PHP to AI-Ready Infrastructure',
        date: '2025-09-22',
        tags: ['Tech Debt', 'PHP'],
        content: `
Refactoring legacy PHP is no longer just about stability—it's about preparing for the Agentic future.

## Defining Context Boundaries

LLMs suffer from limited context windows. If you feed a 10,000 line "God Class" controller to an agent, it will hallucinate.
The first step in migration is **Vertical Slicing**.

## The Strangler Fig Pattern

Don't rewrite. Replace.
1.  Identify a seam (e.g., Shipping Calculation)
2.  Write a new microservice or module in a modern framework (Next.js/Laravel)
3.  Route traffic to the new service for that specific context.
    `,
    },
    'local-ai-vs-openai': {
        title: 'Local AI vs. OpenAI for Dutch Businesses',
        date: '2025-08-10',
        tags: ['Privacy', 'Benchmarks'],
        content: `
GDPR compliance is the elephant in the room. Can you send customer PII to OpenAI? Often, the answer is "No".

## Llama 3 on Consumer Hardware

We benchmarked Llama 3 8B on a standard MacBook Pro M3 vs a hosted Azure endpoint. The results were surprising.
For RAG tasks (Retrieval Augmented Generation), local models often outperform larger models because the *context* is more important than the *reasoning* power for simple lookup tasks.
    `,
    },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = POSTS[slug];
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | Zaamsflow`,
        description: `Read about ${post.title} and other insights on AI Engineering.`,
    };
}

export async function generateStaticParams() {
    return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = POSTS[slug];

    if (!post) {
        notFound();
    }

    return (
        <article className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-4">
                <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Engineering Log
                </Link>

                <header className="max-w-3xl mx-auto mb-16 text-center md:text-left">
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-xs font-mono text-brand-600 dark:text-brand-300">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">{post.title}</h1>

                    <div className="flex items-center justify-center md:justify-start gap-6 text-zinc-500 dark:text-slate-400 font-mono text-sm border-t border-stone-200 dark:border-white/5 pt-6">
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> 5 min read</span>
                    </div>
                </header>

                <div className="max-w-3xl mx-auto">
                    <div className="prose prose-lg dark:prose-invert mx-auto glass-card p-8 md:p-12 rounded-2xl border-stone-200 dark:border-white/5 bg-white dark:bg-black/20 shadow-sm dark:shadow-none">
                        <MDXRemote source={post.content} />
                    </div>
                </div>
            </div>
        </article>
    );
}
