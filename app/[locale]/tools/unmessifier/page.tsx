'use client';

import { useState } from 'react';
import { extractData } from '@/app/actions/unmessifier';
import { Loader2, ArrowRight, Database, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function UnMessifierPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData(event.currentTarget);
        const response = await extractData(formData);

        if (response.error) {
            setError(response.error);
        } else if (response.data) {
            setResult(response.data);
        }
        setLoading(false);
    }

    const demoText = `Hey, just sending over the orders from the weekend. 
- John Doe ordered 3 Premium Plans ($99 each) on Saturday. 
- Then Sarah Smith grabbed 1 Basic Plan for $29 on Sunday morning. 
- Oh, and Mike Ross bought 5 Enterprise licenses ($499/mo) late Sunday night. 
Cheers.`;
    const demoFields = "Customer, Product, Quantity, Price, Day";

    const loadExample = () => {
        const textInput = document.getElementById('text') as HTMLTextAreaElement;
        const fieldsInput = document.getElementById('fields') as HTMLInputElement;
        if (textInput && fieldsInput) {
            textInput.value = demoText;
            fieldsInput.value = demoFields;
        }
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-mono mb-4 border border-blue-200 dark:border-blue-800">
                        <Database className="w-3 h-3" /> AI Playground: Tool 01
                    </div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500 mb-4">
                        The Un-Messifier
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                        Turn messy emails, invoices, or copy-pastes into clean, structured JSON data instantly.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-semibold text-zinc-900 dark:text-white">Input Data</h2>
                            <button
                                type="button"
                                onClick={loadExample}
                                className="text-xs bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 px-3 py-1.5 rounded-lg transition-colors font-mono"
                            >
                                Load Example
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="text" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Messy Text Input
                                </label>
                                <textarea
                                    name="text"
                                    id="text"
                                    required
                                    placeholder="Paste your chaotic text here (e.g. 'John bought 2 apples on Monday, Sarah bought 5 oranges on Tuesday...')"
                                    className="w-full h-48 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="fields" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Fields to Extract
                                </label>
                                <input
                                    name="fields"
                                    id="fields"
                                    type="text"
                                    required
                                    placeholder="Name, Item, Day, Quantity"
                                    className="w-full p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
                                />
                                <p className="text-xs text-zinc-500 mt-2">Comma separated values (e.g. Name, Email, Role)</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={twMerge(
                                    "w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2",
                                    loading ? "bg-zinc-400 cursor-not-allowed" : "bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-500/20"
                                )}
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Extract Data <ArrowRight className="w-5 h-5" /></>}
                            </button>
                        </form>
                    </div>

                    {/* Output Section */}
                    <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col h-[600px]">
                        <h2 className="text-sm font-bold text-zinc-900 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500" /> Structure Output
                        </h2>

                        <div className="flex-1 overflow-auto bg-white dark:bg-black rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 font-mono text-sm">
                            {loading ? (
                                <div className="h-full flex items-center justify-center flex-col gap-4 text-zinc-400">
                                    <Database className="w-8 h-8 animate-bounce opacity-50" />
                                    <p>Analyzing chaos...</p>
                                </div>
                            ) : error ? (
                                <div className="h-full flex items-center justify-center flex-col gap-4 text-red-500">
                                    <AlertCircle className="w-8 h-8" />
                                    <p>{error}</p>
                                </div>
                            ) : result ? (
                                <div className="space-y-6">
                                    {/* Render as simple table preview if possible */}
                                    {result.length > 0 && (
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs">
                                                <thead>
                                                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                                                        {Object.keys(result[0]).map((key) => (
                                                            <th key={key} className="py-2 px-2 font-semibold text-zinc-500">{key}</th>
                                                        ))}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {result.map((item, i) => (
                                                        <tr key={i} className="border-b border-zinc-100 dark:border-zinc-900 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                                                            {Object.values(item).map((val: any, j) => (
                                                                <td key={j} className="py-2 px-2 text-zinc-700 dark:text-zinc-300">
                                                                    {typeof val === 'object' ? JSON.stringify(val) : String(val)}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    <div className="relative group">
                                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs bg-zinc-200 dark:bg-zinc-800 px-2 py-1 rounded">JSON</span>
                                        </div>
                                        <pre className="text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap word-break-break-all">
                                            {JSON.stringify(result, null, 2)}
                                        </pre>
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center flex-col gap-2 text-zinc-400">
                                    <p>No data extracted yet.</p>
                                    <p className="text-xs">Enter text and fields to see the magic.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
