import { Link } from '@/i18n/navigation';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
    title: 'AI Engineering Blog - Zaamsflow',
    description: 'Technical deep-dives into Agentic AI, PHP refactoring strategies, and building reliable systems.',
};

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-4">
                <header className="max-w-4xl mx-auto mb-16 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50/50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 mb-6">
                        <span className="text-sm font-mono text-brand-600 dark:text-brand-400">Engineering Log</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white leading-tight">
                        Building the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500 dark:from-brand-400 dark:to-accent-400">Agentic Web</span>
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-slate-400">
                        Thoughts on bridging the gap between stable Enterprise PHP and probabilistic AI Agents.
                    </p>
                </header>

                <div className="max-w-4xl mx-auto grid gap-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="glass-card p-8 rounded-2xl group border-stone-200 dark:border-white/5 hover:border-brand-500/30 dark:hover:border-brand-500/30 transition-all shadow-sm">
                            <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-4">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/5 text-xs font-mono text-brand-600 dark:text-brand-300 border border-zinc-200 dark:border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-slate-500 font-mono">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h2>
                            <p className="text-zinc-600 dark:text-slate-400 mb-6 leading-relaxed">
                                {post.excerpt}
                            </p>

                            <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold hover:text-brand-500 dark:hover:text-brand-300 transition-colors">
                                Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
