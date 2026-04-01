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
                <div className="card p-8 rounded-xl text-center">
                    <div className="w-16 h-16 bg-brand-50 dark:bg-brand-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-brand-200 dark:border-brand-800">
                        <CheckCircle className="w-8 h-8 text-brand-600 dark:text-brand-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-50 mb-2">{t('successTitle')}</h3>
                    <p className="text-stone-600 dark:text-stone-400">{t('successDesc')}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 text-brand-600 dark:text-brand-400 hover:text-brand-500 dark:hover:text-brand-300 text-sm font-semibold"
                    >
                        {t('sendAnother')}
                    </button>
                </div>
            ) : (
                <form action={formAction} className="card p-8 rounded-xl md:p-10 space-y-6">
                    {state.message && !state.success && (
                        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4" />
                            {state.message}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-stone-700 dark:text-stone-300">{t('name')}</label>
                            <input
                                name="name"
                                type="text"
                                id="name"
                                required
                                className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                                placeholder={t('placeholderName')}
                            />
                            {state.errors?.name && <p className="text-red-500 text-xs">{state.errors.name[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-stone-700 dark:text-stone-300">{t('email')}</label>
                            <input
                                name="email"
                                type="email"
                                id="email"
                                required
                                className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all"
                                placeholder={t('placeholderEmail')}
                            />
                            {state.errors?.email && <p className="text-red-500 text-xs">{state.errors.email[0]}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="type" className="text-sm font-medium text-stone-700 dark:text-stone-300">{t('inquiryType')}</label>
                        <select
                            name="type"
                            id="type"
                            className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-50 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all appearance-none"
                        >
                            <option value="ai">{t('typeAI')}</option>
                            <option value="development">{t('typeDev')}</option>
                            <option value="consulting">{t('typeConsulting')}</option>
                            <option value="other">{t('typeOther')}</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-stone-700 dark:text-stone-300">{t('message')}</label>
                        <textarea
                            name="message"
                            id="message"
                            required
                            rows={4}
                            className="w-full bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg px-4 py-3 text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-transparent transition-all resize-none"
                            placeholder={t('placeholderMessage')}
                        />
                        {state.errors?.message && <p className="text-red-500 text-xs">{state.errors.message[0]}</p>}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-stone-900 dark:bg-stone-50 hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-70 disabled:cursor-not-allowed text-white dark:text-stone-900 font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 group"
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
