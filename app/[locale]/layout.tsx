import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "../globals.css";
import { constructMetadata, generateProfessionalServiceSchema, generateLocalBusinessSchema } from "@/utils/seo-metadata";
import { Footer } from "@/components/ui/Footer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Navbar } from "@/components/ui/Navbar";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

import { SITE_CONFIG } from "@/utils/seo-metadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return constructMetadata({
    metadataBase: new URL(SITE_CONFIG.url),
    locale,
  });
}

import { MobileMenu } from "@/components/ui/MobileMenu";

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  const professionalServiceSchema = generateProfessionalServiceSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href={`${SITE_CONFIG.url}/en`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_CONFIG.url}/fr`} />
        <link rel="alternate" hrefLang="nl" href={`${SITE_CONFIG.url}/nl`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_CONFIG.url}/en`} />
      </head>
      <body
        suppressHydrationWarning
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased min-h-screen flex flex-col font-body bg-background text-foreground selection:bg-brand-500/20 selection:text-brand-900 dark:selection:text-brand-200`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
            />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
            />
            <Navbar />
            <MobileMenu />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
