'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const t = useTranslations('Contact.form');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // TODO: Connect to real API route
        setStatus('success');
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {status === 'success' ? (
                <div className="glass-card p-8 rounded-2xl text-center animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-brand-100 dark:bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-200 dark:border-brand-500/50">
                        <CheckCircle className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t('successTitle')}</h3>
                    <p className="text-zinc-600 dark:text-slate-400">{t('successDesc')}</p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="mt-6 text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 text-sm font-semibold"
                    >
                        {t('sendAnother')}
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl md:p-10 border-stone-200 dark:border-white/5 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-slate-300">{t('name')}</label>
                            <input
                                type="text"
                                id="name"
                                required
                                className="w-full bg-white dark:bg-black/20 border border-zinc-300 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                                placeholder={t('placeholderName')}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-slate-300">{t('email')}</label>
                            <input
                                type="email"
                                id="email"
                                required
                                className="w-full bg-white dark:bg-black/20 border border-zinc-300 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                                placeholder={t('placeholderEmail')}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium text-zinc-700 dark:text-slate-300">{t('inquiryType')}</label>
                        <select
                            id="type"
                            className="w-full bg-white dark:bg-black/20 border border-zinc-300 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="consultation">{t('typeConsultation')}</option>
                            <option value="development">{t('typeDevelopment')}</option>
                            <option value="legacy">{t('typeLegacy')}</option>
                            <option value="other">{t('typeOther')}</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-zinc-700 dark:text-slate-300">{t('message')}</label>
                        <textarea
                            id="message"
                            required
                            rows={4}
                            className="w-full bg-white dark:bg-black/20 border border-zinc-300 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all resize-none"
                            placeholder={t('placeholderMessage')}
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-600/20 hover:shadow-brand-600/40 transition-all flex items-center justify-center gap-2 group"
                        >
                            {status === 'submitting' ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    {t('submit')} <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
