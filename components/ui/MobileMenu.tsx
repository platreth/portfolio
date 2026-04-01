'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight, Home, Briefcase, Mail, BookOpen, Code, FolderOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useTranslations } from 'next-intl';

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const t = useTranslations('Navbar');

    const NAV_ITEMS = [
        { label: t('home'), href: '/', icon: Home },
        { label: t('services'), href: '/#services', icon: Code },
        { label: t('experience'), href: '/#experience', icon: Briefcase },
        { label: t('projects'), href: '/#projects', icon: FolderOpen },
        { label: t('blog'), href: '/blog', icon: BookOpen },
        { label: t('contact'), href: '/#contact', icon: Mail },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-5 right-5 z-50 p-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200 dark:border-stone-700 rounded-full text-stone-900 dark:text-stone-50 shadow-lg transition-all"
                aria-label="Open Menu"
            >
                <Menu className="w-5 h-5" />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed inset-y-0 right-0 w-[280px] bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 z-[70] p-8 md:hidden transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex justify-between items-center mb-10">
                    <span className="text-lg font-bold text-stone-900 dark:text-stone-50">Menu</span>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-stone-500 hover:text-stone-900 dark:hover:text-stone-50 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <nav className="flex flex-col gap-4">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center justify-between py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 font-medium transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="w-4 h-4 text-brand-600 dark:text-brand-400" />
                                {item.label}
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-8 left-8 right-8">
                    <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                        <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-2 uppercase tracking-wider">Available for hire</div>
                        <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">Utrecht / Remote</p>
                        <Link
                            href="/#contact"
                            onClick={() => setIsOpen(false)}
                            className="block w-full py-2 bg-stone-900 dark:bg-stone-50 text-center text-white dark:text-stone-900 rounded-lg text-sm font-semibold transition-colors"
                        >
                            {t('letsTalk')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
