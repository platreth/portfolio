import { ArrowLeft, CheckCircle, Trophy, BarChart3, Code } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

const CASE_STUDIES: Record<string, {
    title: string;
    client: string;
    description: string;
    results: { label: string; value: string }[];
    tech: string[];
    challenge: string;
    solution: string;
}> = {
    'automating-returns': {
        title: 'Automating E-commerce Returns with Agents',
        client: 'Major Dutch Retailer',
        description: 'Reduced customer service load by 60% by implementing a smart classification agent directly within a Laravel webshop.',
        results: [
            { label: 'CS Ticket Volume', value: '-60%' },
            { label: 'Processing Speed', value: 'Instant' },
            { label: 'Cost Savings', value: '€45k/yr' }
        ],
        tech: ['Laravel', 'LangChain', 'OpenAI', 'Livewire'],
        challenge: 'The client was overwhelmed with return requests. 40% of returns were invalid (wrong reasons), but staff spent 15 minutes manually checking each one.',
        solution: 'We built a "Triage Agent" that intercepts the return request. The customer uploads a photo, and GPT-4o Vision analyzes the damage, compares it to the policy, and immediately approves or rejects the claim with a personalized explanation.'
    },
    'legacy-migration': {
        title: 'Zend Framework to AI-Ready Laravel',
        client: 'SaaS Platform',
        description: 'Refactoring a 10-year old codebase to define clear context boundaries for future LLM integration.',
        results: [
            { label: 'Code Base', value: 'Modernized' },
            { label: 'Deploy Time', value: '30s' },
            { label: 'Bugs', value: '-80%' }
        ],
        tech: ['Zend 1', 'Laravel 11', 'Rector', 'PHPStan'],
        challenge: 'A critical business application was stuck on PHP 5.6 and Zend Framework 1. New feature development was impossible, and integration with modern AI tools was a pipe dream.',
        solution: 'We used the Strangler Fig pattern to migrate completely to Laravel 11. We set up strict typing (PHPStan Level 8) and automated test suites, creating a stable foundation that can now securely interact with LLM APIs.'
    },
    'agentic-dashboard': {
        title: 'The "Agentic" Admin Panel',
        client: 'Internal Tool',
        description: 'Building a custom dashboard where Staff can delegate tasks to AI colleagues.',
        results: [
            { label: 'Productivity', value: '+200%' },
            { label: 'Task Time', value: '-30m' },
            { label: 'Adoption', value: '100%' }
        ],
        tech: ['Next.js', 'Supabase', 'MCP', 'Vercel AI SDK'],
        challenge: 'Staff were manually copying data between email, the CRM, and the ERP. It was repetitive, soul-crushing work.',
        solution: 'We built a "Delegation Dashboard". Staff simply type "Process the invoice from Jan" into the chat. The Agent (empowered by MCP) fetches the email, reads the PDF, updates the ERP, and drafts a reply. The human just clicks "Approve".'
    }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const study = CASE_STUDIES[slug];
    if (!study) return { title: 'Case Study Not Found' };

    return {
        title: `${study.title} | Case Study`,
        description: study.description,
    };
}

export async function generateStaticParams() {
    return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const study = CASE_STUDIES[slug];

    if (!study) {
        notFound();
    }

    return (
        <article className="pt-32 pb-24 min-h-screen">
            <div className="container mx-auto px-4">
                <Link href="/#case-studies" className="inline-flex items-center gap-2 text-zinc-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Work
                </Link>

                <header className="max-w-4xl mx-auto mb-16 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 mb-6 font-mono text-sm text-brand-600 dark:text-brand-300 uppercase tracking-widest">
                        {study.client}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">{study.title}</h1>

                    {/* Results Grid */}
                    <div className="grid grid-cols-3 gap-4 md:gap-12 border-y border-stone-200 dark:border-white/5 py-8">
                        {study.results.map((result, i) => (
                            <div key={i} className="text-center md:text-left">
                                <div className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-2">{result.value}</div>
                                <div className="text-xs md:text-sm text-zinc-500 dark:text-slate-500 font-mono uppercase tracking-wider">{result.label}</div>
                            </div>
                        ))}
                    </div>
                </header>

                <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                                <AlertCircle className="w-6 h-6 text-brand-600 dark:text-brand-400" /> The Challenge
                            </h2>
                            <p className="text-lg text-zinc-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-black/20 p-6 rounded-xl border border-stone-200 dark:border-white/5 shadow-sm dark:shadow-none">
                                {study.challenge}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                                <Trophy className="w-6 h-6 text-accent-500 dark:text-accent-400" /> The Solution
                            </h2>
                            <p className="text-lg text-zinc-600 dark:text-slate-300 leading-relaxed">
                                {study.solution}
                            </p>
                        </section>
                    </div>

                    <aside className="space-y-8">
                        <div className="glass-card p-6 rounded-xl border-stone-200 dark:border-white/5">
                            <h3 className="font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                                <Code className="w-5 h-5 text-brand-600 dark:text-brand-400" /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {study.tech.map(t => (
                                    <span key={t} className="px-3 py-1 bg-zinc-100 dark:bg-white/5 rounded-full text-xs font-mono text-zinc-600 dark:text-slate-300 border border-zinc-200 dark:border-white/10">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 rounded-xl bg-gradient-to-br from-brand-50 to-white dark:from-brand-900/50 dark:to-black border border-brand-200 dark:border-brand-500/20 text-center">
                            <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Want results like this?</h3>
                            <p className="text-sm text-zinc-600 dark:text-slate-400 mb-4">Let's audit your current setup.</p>
                            <Link href="/#contact" className="block w-full py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-lg font-semibold transition-colors shadow-lg shadow-brand-500/20">
                                Book Strategy Call
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </article>
    );
}

// Icon helper
function AlertCircle({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
    )
}
