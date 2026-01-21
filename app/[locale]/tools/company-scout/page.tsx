'use client';

import { useState } from 'react';
import { scoutCompany } from '@/app/actions/scout';
import { Loader2, ArrowRight, Search, Target, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function ScoutPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData(event.currentTarget);
        const response = await scoutCompany(formData);

        if (response.error) {
            setError(response.error);
        } else {
            setResult(response.data);
        }
        setLoading(false);
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono mb-4 border border-emerald-200 dark:border-emerald-800">
                        <Search className="w-3 h-3" /> AI Playground: Tool 03
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 mb-4">
                        The Company Scout
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                        Paste a URL. Get a brutal, honest breakdown of their business strategy, audience, and messaging clarity.
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 mb-8">
                    <div className="flex justify-end mb-2">
                        <button
                            type="button"
                            onClick={() => {
                                const input = document.querySelector('input[name="url"]') as HTMLInputElement;
                                if (input) input.value = 'https://stripe.com';
                            }}
                            className="text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 px-3 py-1.5 rounded-lg transition-colors font-mono"
                        >
                            Load Example
                        </button>
                    </div>
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <div className="flex-1">
                            <input
                                name="url"
                                type="url"
                                required
                                placeholder="https://competitor-site.com"
                                className="w-full px-6 py-4 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className={twMerge(
                                "px-8 py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 min-w-[140px]",
                                loading ? "bg-zinc-400 cursor-not-allowed" : "bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20"
                            )}
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Scout <ArrowRight className="w-5 h-5" /></>}
                        </button>
                    </form>
                    {error && (
                        <div className="mt-4 text-red-500 text-sm flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" /> {error}
                        </div>
                    )}
                </div>

                {/* Results */}
                {result && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">

                        {/* Score Card */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800">
                                <h3 className="text-zinc-500 uppercase text-xs font-bold tracking-wider mb-2">What they actually do</h3>
                                <p className="text-2xl font-bold text-zinc-900 dark:text-white leading-relaxed">
                                    {result.oneLiner}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
                                <div className="text-5xl font-black text-emerald-500 mb-2">{result.rating}/10</div>
                                <div className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Messaging Clarity</div>
                            </div>
                        </div>

                        {/* Analysis Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                                <h3 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-6">
                                    <Target className="w-5 h-5 text-blue-500" /> Target Audience
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400">{result.targetAudience}</p>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
                                <h3 className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-6">
                                    <TrendingUp className="w-5 h-5 text-purple-500" /> Key Value Props
                                </h3>
                                <ul className="space-y-2">
                                    {result.valueProps.map((prop: string, i: number) => (
                                        <li key={i} className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400 text-sm">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                                            {prop}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Improvement Tip */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-amber-100 dark:border-amber-900/50">
                            <h3 className="font-bold text-amber-800 dark:text-amber-200 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" /> Pro Tip for Improvement
                            </h3>
                            <p className="text-amber-900 dark:text-amber-100 opacity-80">
                                {result.improvement}
                            </p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
