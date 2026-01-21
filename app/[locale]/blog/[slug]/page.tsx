import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getPostSlugs } from '@/lib/blog';



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return { title: 'Post Not Found' };

    return {
        title: `${post.title} | Zaamsflow`,
        description: post.excerpt,
    };
}

export async function generateStaticParams() {
    const slugs = getPostSlugs();
    return slugs.map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

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
