import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MapPin, Globe, Coffee } from 'lucide-react';

export function AboutMe() {
    const t = useTranslations('AboutMe');

    return (
        <section className="py-24 border-y border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
            <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
                <div className="grid md:grid-cols-5 gap-12 items-center">
                    {/* Photo Side */}
                    <div className="md:col-span-2 relative">
                        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                            <Image
                                src="/images/hugo-profile.jpg"
                                alt="Hugo Platret"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-white dark:bg-stone-900 rounded-xl shadow-lg p-3 border border-stone-200 dark:border-stone-700">
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="w-4 h-4 text-brand-500" />
                                <span className="font-medium text-stone-900 dark:text-stone-50">Netherlands</span>
                            </div>
                        </div>
                    </div>

                    {/* Story Side */}
                    <div className="md:col-span-3 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50">
                            {t('title')}
                        </h2>

                        <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
                            <p>{t('intro')}</p>
                            <p>{t('philosophy')}</p>
                        </div>

                        <div className="space-y-3 pt-2">
                            {[
                                { icon: <span className="text-lg">🇫🇷</span>, text: t('fact1') },
                                { icon: <Globe className="w-5 h-5 text-brand-600 dark:text-brand-400" />, text: t('fact2') },
                                { icon: <Coffee className="w-5 h-5 text-brand-600 dark:text-brand-400" />, text: t('fact3') },
                            ].map((fact, i) => (
                                <div key={i} className="flex items-center gap-3 text-stone-700 dark:text-stone-300">
                                    <div className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
                                        {fact.icon}
                                    </div>
                                    <span className="text-sm">{fact.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
