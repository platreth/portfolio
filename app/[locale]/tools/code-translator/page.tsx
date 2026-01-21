'use client';

import { useState } from 'react';
import { translateCode } from '@/app/actions/translator';
import { Loader2, ArrowRight, Terminal, Code2, MessageSquare, Clipboard, Check } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function TranslatorPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any | null>(null);
    const [mode, setMode] = useState<'to-code' | 'explain'>('to-code');
    const [copied, setCopied] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setResult(null);

        const formData = new FormData(event.currentTarget);
        formData.append('mode', mode);

        const response = await translateCode(formData);

        if (response.error) {
            // simple alert for now
            alert(response.error);
        } else {
            setResult(response.data);
        }
        setLoading(false);
    }

    const copyToClipboard = () => {
        if (result?.output) {
            navigator.clipboard.writeText(result.output);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-xs font-mono mb-4 border border-orange-200 dark:border-orange-800">
                        <Terminal className="w-3 h-3" /> AI Playground: Tool 04
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 mb-4">
                        The Code Translator
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                        Speak in English, get Regex/SQL. Or paste confusing code, get English.
                    </p>
                </div>

                {/* Toggle Switch */}
                <div className="flex bg-zinc-200 dark:bg-zinc-800 p-1 rounded-xl w-fit mb-8">
                    <button
                        onClick={() => { setMode('to-code'); setResult(null); }}
                        className={twMerge(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                            mode === 'to-code' ? "bg-white dark:bg-black shadow-sm text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        )}
                    >
                        <MessageSquare className="w-4 h-4" /> Natural Language → Code
                    </button>
                    <button
                        onClick={() => { setMode('explain'); setResult(null); }}
                        className={twMerge(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2",
                            mode === 'explain' ? "bg-white dark:bg-black shadow-sm text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                        )}
                    >
                        <Code2 className="w-4 h-4" /> Code → Explanation
                    </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Input */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 h-fit">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300">
                                    {mode === 'to-code' ? "Describe what you need:" : "Paste Code Snippet:"}
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const textarea = document.querySelector('textarea[name="input"]') as HTMLTextAreaElement;
                                        if (textarea) {
                                            textarea.value = mode === 'to-code'
                                                ? 'Extract all email addresses from a string'
                                                : 'lambda x: x**2 if x > 0 else 0';
                                        }
                                    }}
                                    className="text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 px-3 py-1.5 rounded-lg transition-colors font-mono"
                                >
                                    Load Example
                                </button>
                            </div>
                            <textarea
                                name="input"
                                required
                                className="w-full h-48 p-4 rounded-xl bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-brand-500 outline-none transition-all resize-none font-mono text-sm"
                                placeholder={mode === 'to-code' ? "Find all emails ending with @gmail.com..." : "const regex = /^([a-z0-9_\\.-]+)@([\\da-z\\.-]+)\\.([a-z\\.]{2,6})$/"}
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className={twMerge(
                                    "w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2",
                                    loading ? "bg-zinc-400 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-500/20"
                                )}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{mode === 'to-code' ? "Generate Code" : "Explain Code"} <ArrowRight className="w-5 h-5" /></>}
                            </button>
                        </form>
                    </div>

                    {/* Output */}
                    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-lg text-white flex flex-col h-[400px]">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            {result && (
                                <button onClick={copyToClipboard} className="text-zinc-400 hover:text-white transition-colors">
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Clipboard className="w-4 h-4" />}
                                </button>
                            )}
                        </div>

                        <div className="flex-1 overflow-auto font-mono text-sm">
                            {loading ? (
                                <div className="h-full flex items-center justify-center text-zinc-500 animate-pulse">
                                    Processing logic...
                                </div>
                            ) : result ? (
                                <div className="space-y-4">
                                    <span className="text-xs text-orange-400 font-bold uppercase tracking-wider block mb-2">{result.language}</span>
                                    <pre className="text-green-400 whitespace-pre-wrap">
                                        {result.output}
                                    </pre>
                                    <div className="pt-4 border-t border-white/10 text-zinc-400 text-xs leading-relaxed">
                                        {result.explanation}
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-zinc-600">
                                    Waiting for input...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
