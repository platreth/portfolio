import { useTranslations } from "next-intl";

export function Footer() {
    const t = useTranslations('Footer');

    return (
        <footer className="border-t border-brand-200 dark:border-brand-800 bg-background py-12 mt-24">
            <div className="container mx-auto px-4 text-center">
                <h3 className="text-lg font-semibold mb-4 text-foreground">{t('verified')}</h3>

                <nav aria-label="Footer Verification Links" className="flex justify-center gap-8 mb-8">
                    <a
                        href="https://linkedin.com/in/hugoplatret"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-700 dark:text-brand-400 hover:underline hover:text-brand-600 transition-colors"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/hugoplatret"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-700 dark:text-brand-400 hover:underline hover:text-brand-600 transition-colors"
                    >
                        GitHub
                    </a>
                    <a
                        href="mailto:contact@hugoplatret.nl"
                        className="text-brand-700 dark:text-brand-400 hover:underline hover:text-brand-600 transition-colors"
                    >
                        Email
                    </a>
                </nav>

                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    <p>© {new Date().getFullYear()} Zaamsflow. {t('rights')}</p>
                    <p className="mt-2 text-xs">
                        Utrecht, Netherlands • LvK #12345678 (Example)
                    </p>
                </div>
            </div>
        </footer>
    );
}
