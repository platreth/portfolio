"use client";

import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export function Navbar() {
    const t = useTranslations('Navbar');

    const NAV_ITEMS = [
        { label: t('home'), href: '/' },
        { label: t('caseStudies'), href: '/#case-studies' },
        { label: t('blog'), href: '/blog' },
        { label: t('contact'), href: '/#contact' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-40 hidden md:block">
            <div className="container mx-auto px-4 py-6 flex items-center justify-between">
                {/* Logo / Home Link */}
                <Link href="/" className="font-heading font-bold text-xl text-zinc-900 dark:text-white hover:opacity-80 transition-opacity">
                    ZAAMSFLOW<span className="text-brand-600 dark:text-brand-400">.</span>
                </Link>

                {/* Desktop Nav Items */}
                <nav className="flex items-center gap-1 p-1 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-zinc-200 dark:border-white/10 shadow-sm">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-5 py-2 rounded-full text-sm font-medium text-zinc-700 dark:text-slate-300 hover:text-zinc-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/10 transition-all"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <Link
                        href="/#contact"
                        className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
                    >
                        {t('letsTalk')}
                    </Link>
                    <ThemeToggle className="bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800" />
                </div>
            </div>
        </header>
    );
}
