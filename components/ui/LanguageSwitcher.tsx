"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter, locales } from "@/i18n/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <div className="relative">
            <select
                defaultValue={locale}
                className="bg-transparent py-1 pl-2 pr-6 border border-zinc-200 dark:border-white/10 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 appearance-none cursor-pointer"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="en">EN</option>
                <option value="nl">NL</option>
                <option value="fr">FR</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
}
