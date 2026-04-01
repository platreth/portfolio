import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="border-t border-stone-200 dark:border-stone-800 py-12 mt-0">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">{t('title')}</h3>
                        <p className="text-sm text-stone-500 dark:text-stone-500">{t('rights')}</p>
                    </div>

                    <nav aria-label="Footer Links" className="flex items-center gap-6">
                        <a
                            href="https://linkedin.com/in/hugoplatret"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-stone-600 dark:text-stone-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                        >
                            LinkedIn
                        </a>
                        <a
                            href="https://github.com/hugoplatret"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-stone-600 dark:text-stone-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                        >
                            GitHub
                        </a>
                        <a
                            href="mailto:hugo.platret@gmail.com"
                            className="text-sm text-stone-600 dark:text-stone-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                        >
                            Email
                        </a>
                    </nav>

                    <p className="text-xs text-stone-400 dark:text-stone-600">
                        © {new Date().getFullYear()} Hugo Platret
                    </p>
                </div>
            </div>
        </footer>
    );
}
