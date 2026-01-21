'use client';

import { useActionState, useEffect } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { sendContactEmail } from '@/app/actions/contact';

const initialState = {
    success: false,
    message: '',
};

export function ContactForm() {
    const [state, formAction, isPending] = useActionState(sendContactEmail, initialState);
    const t = useTranslations('Contact.form');

    return (
        <div className="w-full max-w-2xl mx-auto">
            {state.success ? (
                <div className="glass-card p-8 rounded-2xl text-center animate-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-brand-100 dark:bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-200 dark:border-brand-500/50">
                        <CheckCircle className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">{t('successTitle')}</h3>
                    <p className="text-zinc-600 dark:text-slate-400">{t('successDesc')}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 text-sm font-semibold"
                    >
                        {t('sendAnother')}
                    </button>
                </div>
            ) : (
                <form action={formAction} className="glass-card p-8 rounded-2xl md:p-10 border-stone-200 dark:border-white/5 space-y-6">
                    {state.message && !state.success && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {state.message}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-slate-300">{t('name')}</label>
                            <input
                                name="name"
                                type="text"
                                id="name"
                                required
                                className="w-full bg-white dark:bg-black/20 border border-zinc-300 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                                placeholder={t('placeholderName')}
                            />
                            {state.errors?.name && <p className="text-red-500 text-xs">{state.errors.name[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-slate-300">{t('email')}</label>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                required
                                className="w-full bg-white dark:bg-black/20 border border-zinc-300 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                                placeholder={t('placeholderEmail')}
                            />
                            {state.errors?.email && <p className="text-red-500 text-xs">{state.errors.email[0]}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium text-zinc-700 dark:text-slate-300">{t('inquiryType')}</label>
                        <select
                            name="type"
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
                            name="message"
                            id="message"
                            required
                            rows={4}
                            className="w-full bg-white dark:bg-black/20 border border-zinc-300 dark:border-white/10 rounded-lg px-4 py-3 text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all resize-none"
                            placeholder={t('placeholderMessage')}
                        />
                        {state.errors?.message && <p className="text-red-500 text-xs">{state.errors.message[0]}</p>}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-600/20 hover:shadow-brand-600/40 transition-all flex items-center justify-center gap-2 group"
                        >
                            {isPending ? (
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
