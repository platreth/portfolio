"use client";

import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";

export function Navbar() {
    const t = useTranslations('Navbar');

    const NAV_ITEMS = [
        { label: t('home'), href: '/' },
        { label: t('services'), href: '/#services' },
        { label: t('experience'), href: '/#experience' },
        { label: t('projects'), href: '/#projects' },
        { label: t('blog'), href: '/blog' },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-40 hidden md:block">
            <div className="container mx-auto px-6 lg:px-8 py-5 flex items-center justify-between">
                <Link href="/" className="font-heading font-bold text-xl text-stone-900 dark:text-stone-50 hover:opacity-80 transition-opacity">
                    Hugo Platret
                </Link>

                <nav className="flex items-center gap-1 p-1 rounded-full bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-sm">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="px-4 py-2 rounded-full text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-3">
                    <LanguageSwitcher />
                    <Link
                        href="/#contact"
                        className="px-4 py-2 bg-stone-900 dark:bg-stone-50 text-white dark:text-stone-900 rounded-full text-sm font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                    >
                        {t('letsTalk')}
                    </Link>
                    <ThemeToggle className="bg-transparent hover:bg-stone-100 dark:hover:bg-stone-800" />
                </div>
            </div>
        </header>
    );
}
