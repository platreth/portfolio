'use client';

import { useState } from 'react';
import { repurposeContent } from '@/app/actions/repurposer';
import { Loader2, ArrowRight, Share2, Linkedin, Twitter, Mail, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function RepurposerPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData(event.currentTarget);
        const response = await repurposeContent(formData);

        if (response.error) {
            setError(response.error);
        } else {
            setResult(response.data);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black py-20">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-mono mb-4 border border-purple-200 dark:border-purple-800">
                        <Share2 className="w-3 h-3" /> AI Playground: Tool 02
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 mb-4">
                        The Content Repurposer
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
                        Drop a URL. Get a Tweet, a LinkedIn post, and a Newsletter blurb instanty.
                        Scale your presence without scaling your effort.
                    </p>
                </div>

                {/* Input */}
                <div className="max-w-2xl mx-auto mb-16">
                    <div className="flex justify-end mb-2">
                        <button
                            type="button"
                            onClick={() => {
                                const input = document.querySelector('input[name="url"]') as HTMLInputElement;
                                if (input) input.value = 'https://vercel.com/blog/ai-sdk-3-generative-ui';
                            }}
                            className="text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 px-3 py-1.5 rounded-lg transition-colors font-mono"
                        >
                            Load Example
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <div className="flex-1 relative">
                            <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
                            <input
                                name="url"
                                type="url"
                                required
                                placeholder="https://your-blog-post.com/awesome-article"
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-brand-500 outline-none transition-all shadow-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={twMerge(
                                "px-8 py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 min-w-[160px]",
                                loading ? "bg-zinc-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-500/20"
                            )}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Generate <ArrowRight className="w-5 h-5" /></>}
                        </button>
                    </form>
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" /> {error}
                        </div>
                    )}
                </div>

                {/* Results Grid */}
                {result && (
                    <div className="grid md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                        {/* Tweet Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
                            <div className="flex items-center gap-2 mb-4 text-sky-500 font-bold">
                                <Twitter className="w-5 h-5" />
                                Twitter / X
                            </div>
                            <textarea
                                readOnly
                                className="flex-1 w-full bg-zinc-50 dark:bg-black rounded-lg p-3 text-sm resize-none outline-none border-0 font-medium text-zinc-800 dark:text-zinc-200"
                                value={result.tweet}
                            />
                        </div>

                        {/* LinkedIn Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
                            <div className="flex items-center gap-2 mb-4 text-blue-700 font-bold">
                                <Linkedin className="w-5 h-5" />
                                LinkedIn
                            </div>
                            <textarea
                                readOnly
                                className="flex-1 w-full bg-zinc-50 dark:bg-black rounded-lg p-3 text-sm resize-none outline-none border-0 font-medium text-zinc-800 dark:text-zinc-200 min-h-[300px]"
                                value={result.linkedin}
                            />
                        </div>

                        {/* Newsletter Card */}
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col">
                            <div className="flex items-center gap-2 mb-4 text-orange-500 font-bold">
                                <Mail className="w-5 h-5" />
                                Newsletter
                            </div>
                            <textarea
                                readOnly
                                className="flex-1 w-full bg-zinc-50 dark:bg-black rounded-lg p-3 text-sm resize-none outline-none border-0 font-medium text-zinc-800 dark:text-zinc-200"
                                value={result.newsletter}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
