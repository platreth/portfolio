"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <button className={`p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 ${className}`} aria-label="Toggle Theme">
                <div className="w-5 h-5" />
            </button>
        )
    }

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={`relative p-2 rounded-full transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-500 ${className}`}
            aria-label="Toggle Theme"
        >
            <div className="relative w-5 h-5">
                <Sun className="absolute inset-0 w-5 h-5 transition-all scale-100 rotate-0 dark:scale-0 dark:-rotate-90 text-amber-500" />
                <Moon className="absolute inset-0 w-5 h-5 transition-all scale-0 rotate-90 dark:scale-100 dark:rotate-0 text-brand-400" />
            </div>
        </button>
    )
}
