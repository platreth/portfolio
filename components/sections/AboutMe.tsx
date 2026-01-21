import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MapPin, Coffee, Heart } from 'lucide-react';

export function AboutMe() {
    const t = useTranslations('AboutMe');

    return (
        <section className="py-24 bg-gradient-to-b from-white to-zinc-50 dark:from-black dark:to-zinc-950">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Photo Side */}
                    <div className="relative">
                        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800">
                            <Image
                                src="/images/hugo-profile.jpg"
                                alt="Hugo Platret"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-4 border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-brand-500" />
                                <span className="font-medium text-zinc-900 dark:text-white">Utrecht, NL 🇳🇱</span>
                            </div>
                        </div>
                    </div>

                    {/* Story Side */}
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4">
                                {t('title')}
                            </h2>
                            <div className="w-20 h-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-full mb-6" />
                        </div>

                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {t('intro')}
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {t('philosophy')}
                            </p>
                        </div>

                        {/* Quick Facts */}
                        <div className="grid grid-cols-1 gap-3 pt-4">
                            <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                                    <span className="text-xl">🇫🇷</span>
                                </div>
                                <span className="text-sm">{t('fact1')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                                    <Coffee className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                                </div>
                                <span className="text-sm">{t('fact2')}</span>
                            </div>
                            <div className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                                    <Heart className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                                </div>
                                <span className="text-sm">{t('fact3')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
