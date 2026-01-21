'use client';

import { useState } from 'react';
import { Menu, X, ArrowRight, Home, Briefcase, Mail, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Case Studies', href: '/#case-studies', icon: Briefcase },
    { label: 'Blog', href: '/blog', icon: BookOpen },
    { label: 'Contact', href: '/#contact', icon: Mail },
];

export function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden fixed top-6 right-6 z-50 p-3 bg-white/80 dark:bg-brand-950/80 backdrop-blur-md border border-zinc-200 dark:border-brand-500/30 rounded-full text-zinc-900 dark:text-white shadow-lg hover:bg-zinc-100 dark:hover:bg-brand-900 transition-all"
                aria-label="Open Menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden animate-in fade-in duration-200"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sheet Panel */}
            <div
                className={`fixed inset-y-0 right-0 w-[300px] bg-zinc-50 dark:bg-[#0B0B10] border-l border-zinc-200 dark:border-white/10 z-[70] p-8 md:hidden transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex justify-between items-center mb-12">
                    <span className="text-xl font-bold font-heading text-zinc-900 dark:text-white">Menu</span>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 text-zinc-500 dark:text-slate-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <nav className="flex flex-col gap-6">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="group flex items-center justify-between text-lg text-zinc-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white font-medium transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <item.icon className="w-5 h-5 text-brand-600 dark:text-brand-500 group-hover:text-brand-500 dark:group-hover:text-brand-400" />
                                {item.label}
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-brand-600 dark:text-brand-400" />
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-8 left-8 right-8">
                    <div className="p-4 rounded-xl bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-500/20">
                        <div className="text-xs text-brand-600 dark:text-brand-300 font-mono mb-2">AVAILABLE FOR HIRE</div>
                        <p className="text-sm text-zinc-700 dark:text-slate-400 mb-4">Ready to upgrade your PHP stack with AI?</p>
                        <Link
                            href="/#contact"
                            onClick={() => setIsOpen(false)}
                            className="block w-full py-2 bg-brand-600 hover:bg-brand-500 text-center text-white rounded-lg text-sm font-semibold transition-colors"
                        >
                            Book Consultation
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
