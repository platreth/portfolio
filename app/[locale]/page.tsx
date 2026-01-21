import { generateSoftwareSourceCodeSchema } from "@/utils/seo-metadata";
import { ArrowRight, Terminal, Brain, MapPin, Server, Sparkles, ClipboardCheck, Database, Bot } from 'lucide-react';
import { ContactForm } from "@/components/ui/Contact";
import { AboutMe } from "@/components/sections/AboutMe";
import { Link } from '@/i18n/navigation';
import { useTranslations } from "next-intl";

export default function Home() {
  const tHero = useTranslations('Hero');
  const tAbout = useTranslations('About');
  const tServices = useTranslations('Services');
  const tExperience = useTranslations('Experience');
  const tCaseStudies = useTranslations('CaseStudies');
  const tContact = useTranslations('Contact');
  const tHub = useTranslations('Hub');
  const jsonLd = generateSoftwareSourceCodeSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-brand-600/20 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-accent-400/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent-400 animate-pulse" />
              <span className="text-sm font-mono text-accent-400">{tHero('available')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
              <span className="bg-gradient-to-r from-brand-700 via-brand-600 to-accent-600 dark:from-white dark:via-brand-100 dark:to-brand-300 bg-clip-text text-transparent text-glow">
                {tHero('titlePrefix')}
              </span>
              <br />
              <span className="text-zinc-900 dark:text-white">{tHero('titleSuffix')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-700 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed mx-auto md:mx-0">
              {tHero.rich('description', {
                highlight: (chunks) => <span className="text-brand-700 dark:text-brand-400 font-semibold">{chunks}</span>
              })}
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start">
              <a href="#contact" className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2">
                {tHero('ctaStrategy')} <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#case-studies" className="glass-card text-zinc-900 dark:text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/50 dark:hover:bg-white/5 flex items-center justify-center gap-2">
                {tHero('ctaCases')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <AboutMe />

      {/* Entity/About Section */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-zinc-900 dark:text-white">
                {tAbout('titlePrefix')} <span className="text-brand-700 dark:text-brand-400">{tAbout('titleSuffix')}</span>
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p>
                  {tAbout.rich('intro', {
                    em: (chunks) => <em>{chunks}</em>
                  })}
                </p>
                <div className="my-6 p-4 bg-brand-50 dark:bg-brand-900/10 border-l-4 border-brand-500 rounded-r-lg">
                  <h3 className="font-bold text-brand-700 dark:text-brand-300 mb-1">{tAbout('bridgeTitle')}</h3>
                  <p className="text-sm text-zinc-700 dark:text-slate-300 m-0!">
                    {tAbout.rich('bridgeDesc', {
                      strong: (chunks) => <strong>{chunks}</strong>
                    })}
                  </p>
                </div>
                <p>
                  {tAbout.rich('stability', {
                    strong: (chunks) => <strong>{chunks}</strong>
                  })}
                </p>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                {[
                  { title: "PHP", sub: "Modern & Legacy", icon: Terminal },
                  { title: "Agents", sub: "Autonomous Logic", icon: Brain },
                  { title: "Utrecht", sub: "Local Partner", icon: MapPin }
                ].map((item, i) => (
                  <div key={i} className="p-4 glass-card rounded-xl flex flex-col items-center">
                    <item.icon className="w-6 h-6 text-brand-700 dark:text-brand-400 mb-2" />
                    <div className="font-bold text-zinc-900 dark:text-white text-lg">{item.title}</div>
                    <div className="text-xs text-zinc-500 dark:text-slate-400 font-mono mt-1">{item.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Grid */}
            {/* Entity Pillars */}
            <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl border-brand-500/20 col-span-2">
                <h3 className="font-bold mb-4 text-brand-700 dark:text-brand-300 flex items-center gap-2">
                  <MapPin className="w-5 h-5" /> Strategic Engineering
                </h3>
                <p className="text-sm text-zinc-700 dark:text-slate-300 mb-4">
                  I don't just write code; I design systems. Whether it's a <strong>RAG pipeline</strong> or a <strong>SaaS refactor</strong>, I prioritize ROI and long-term maintainability.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-2 py-1 rounded">Architecture</span>
                  <span className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-2 py-1 rounded">Vector DBs</span>
                  <span className="text-xs font-mono bg-zinc-100 dark:bg-white/10 px-2 py-1 rounded">PHP Modernization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Labs Section */}
      <section className="py-20 bg-zinc-50 dark:bg-black/20 border-y border-zinc-200 dark:border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{tServices('title')} <span className="text-sm font-mono font-normal text-amber-500 border border-amber-500/20 bg-amber-500/10 px-2 py-1 rounded ml-2 align-middle">{tServices('subtitle')}</span></h2>
              <p className="text-zinc-700 dark:text-slate-400 max-w-xl">
                {tServices('description')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Solution 1 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-brand-500/50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{tServices('auditTitle')}</h3>
              <p className="text-sm text-zinc-700 dark:text-slate-400 mb-4">{tServices('auditDesc')}</p>
              <div className="text-xs font-mono text-zinc-400 dark:text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {tServices('available')}
              </div>
            </div>

            {/* Solution 2 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-brand-500/50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{tServices('mcpTitle')}</h3>
              <p className="text-sm text-zinc-700 dark:text-slate-400 mb-4">{tServices('mcpDesc')}</p>
              <div className="text-xs font-mono text-zinc-400 dark:text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {tServices('available')}
              </div>
            </div>

            {/* Solution 3 */}
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 hover:border-brand-500/50 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center mb-4 text-brand-700 dark:text-brand-400">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2 group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">{tServices('agentTitle')}</h3>
              <p className="text-sm text-zinc-700 dark:text-slate-400 mb-4">{tServices('agentDesc')}</p>
              <div className="text-xs font-mono text-zinc-400 dark:text-slate-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {tServices('available')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-zinc-900 dark:text-white">
            {tExperience('title')} <span className="text-brand-700 dark:text-brand-400">{tExperience('titleSuffix')}</span>
          </h2>

          <div className="space-y-8">
            {/* Zoomflow */}
            <div className="flex gap-4 md:gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-brand-600 dark:bg-brand-400 mt-2 ring-4 ring-brand-100 dark:ring-brand-900/30" />
                <div className="flex-1 w-px bg-zinc-200 dark:bg-zinc-800 my-2 group-last:hidden" />
              </div>
              <div className="pb-8">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{tExperience('zoomflowTitle')}</h3>
                  <span className="text-sm px-2 py-1 bg-zinc-100 dark:bg-white/10 rounded text-zinc-700 dark:text-slate-300 w-fit">{tExperience('zoomflowRole')}</span>
                </div>
                <div className="text-sm text-zinc-500 dark:text-slate-400 font-mono mb-4">{tExperience('zoomflowDate')}</div>
                <p className="text-zinc-700 dark:text-slate-400 mb-4">
                  {tExperience.rich('zoomflowDesc', {
                    em: (chunks) => <em>{chunks}</em>
                  })}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs border border-zinc-200 dark:border-white/10 px-2 py-1 rounded text-zinc-500 dark:text-slate-400">System Architecture</span>
                  <span className="text-xs border border-zinc-200 dark:border-white/10 px-2 py-1 rounded text-zinc-500 dark:text-slate-400">Agentic AI</span>
                </div>
              </div>
            </div>

            {/* Rentman */}
            <div className="flex gap-4 md:gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600 mt-2" />
                <div className="flex-1 w-px bg-zinc-200 dark:bg-zinc-800 my-2 group-last:hidden" />
              </div>
              <div className="pb-8">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{tExperience('rentmanTitle')}</h3>
                  <span className="text-sm px-2 py-1 bg-zinc-100 dark:bg-white/10 rounded text-zinc-700 dark:text-slate-300 w-fit">{tExperience('rentmanRole')}</span>
                </div>
                <div className="text-sm text-zinc-500 dark:text-slate-400 font-mono mb-4">{tExperience('rentmanDate')}</div>
                <p className="text-zinc-700 dark:text-slate-400 mb-4">
                  {tExperience('rentmanDesc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs border border-zinc-200 dark:border-white/10 px-2 py-1 rounded text-zinc-500 dark:text-slate-400">Scrum Leadership</span>
                  <span className="text-xs border border-zinc-200 dark:border-white/10 px-2 py-1 rounded text-zinc-500 dark:text-slate-400">DDD</span>
                </div>
              </div>
            </div>

            {/* Tikanica */}
            <div className="flex gap-4 md:gap-8 group">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600 mt-2" />
                <div className="flex-1 w-px bg-zinc-200 dark:bg-zinc-800 my-2 group-last:hidden" />
              </div>
              <div className="pb-8">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{tExperience('tikanicaTitle')}</h3>
                  <span className="text-sm px-2 py-1 bg-zinc-100 dark:bg-white/10 rounded text-zinc-700 dark:text-slate-300 w-fit">{tExperience('tikanicaRole')}</span>
                </div>
                <div className="text-sm text-zinc-500 dark:text-slate-400 font-mono mb-4">{tExperience('tikanicaDate')}</div>
                <p className="text-zinc-700 dark:text-slate-400 mb-4">
                  {tExperience('tikanicaDesc')}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs border border-zinc-200 dark:border-white/10 px-2 py-1 rounded text-zinc-500 dark:text-slate-400">Symfony</span>
                  <span className="text-xs border border-zinc-200 dark:border-white/10 px-2 py-1 rounded text-zinc-500 dark:text-slate-400">Kubernetes</span>
                  <span className="text-xs border border-zinc-200 dark:border-white/10 px-2 py-1 rounded text-zinc-500 dark:text-slate-400">GCP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies (Bento Grid) */}
      <section id="case-studies" className="py-24 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-zinc-900 dark:text-white">
            {tCaseStudies('title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-500 dark:from-brand-400 dark:to-accent-400">{tCaseStudies('titleSuffix')}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tool 1: Un-Messifier */}
            <Link href="/tools/unmessifier" className="group glass-card p-8 rounded-2xl border-zinc-200 dark:border-white/5 hover:border-blue-500/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">The Un-Messifier</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">Process messy text into structured JSON data instantly. Perfect for invoices, emails, and logs.</p>
              <div className="flex items-center gap-2 text-sm font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Try Tool <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Tool 2: Content Repurposer */}
            <Link href="/tools/content-repurposer" className="group glass-card p-8 rounded-2xl border-zinc-200 dark:border-white/5 hover:border-purple-500/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">Content Repurposer</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">Turn any URL into a viral Tweet, LinkedIn post, and Newsletter blurb automatically.</p>
              <div className="flex items-center gap-2 text-sm font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Try Tool <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Tool 3: Company Scout */}
            <Link href="/tools/company-scout" className="group glass-card p-8 rounded-2xl border-zinc-200 dark:border-white/5 hover:border-emerald-500/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">The Company Scout</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">Instant 360° analysis of any company website. Target audience, value props, and messaging score.</p>
              <div className="flex items-center gap-2 text-sm font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Try Tool <ArrowRight className="w-4 h-4" />
              </div>
            </Link>

            {/* Tool 4: Code Translator */}
            <Link href="/tools/code-translator" className="group glass-card p-8 rounded-2xl border-zinc-200 dark:border-white/5 hover:border-orange-500/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-6 text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors">Code Translator</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">Natural Language to Regex/SQL converter. Or explain complex code in plain English.</p>
              <div className="flex items-center gap-2 text-sm font-mono text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Try Tool <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-900 dark:text-white">{tContact('titlePrefix')} <span className="text-brand-700 dark:text-brand-400">{tContact('titleSuffix')}</span></h2>
            <p className="text-xl text-zinc-700 dark:text-slate-400 max-w-2xl mx-auto">
              {tContact('description')}
            </p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Mini-Hub */}
      <section className="py-24 border-t border-zinc-200 dark:border-white/5 bg-gradient-to-b from-transparent to-zinc-100/50 dark:to-black/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">{tHub('title')}</h2>
              <p className="text-zinc-700 dark:text-slate-400">{tHub('description')}</p>
            </div>
            <a href="/blog" className="text-brand-700 dark:text-brand-400 font-mono hover:text-brand-500 dark:hover:text-brand-300 transition-colors flex items-center gap-2">{tHub('viewAll')} <ArrowRight className="w-4 h-4" /></a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Why MCP is the Future of E-commerce", tag: "Architecture", slug: "why-mcp-is-future" },
              { title: "Migrating Legacy PHP to AI-Ready Infrastructure", tag: "Tech Debt", slug: "migrating-legacy-php" },
              { title: "Local AI vs. OpenAI for Dutch Businesses", tag: "Privacy", slug: "local-ai-vs-openai" }
            ].map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="group block glass-card p-6 rounded-xl hover:-translate-y-1 hover:shadow-lg transition-all border-stone-200 dark:border-white/5 hover:border-brand-500/30">
                <span className="text-xs font-bold text-brand-700 dark:text-brand-500 tracking-wider uppercase mb-3 block font-mono">{post.tag}</span>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors mb-4">{post.title}</h3>
                <div className="flex items-center text-sm text-zinc-500 dark:text-slate-500 group-hover:text-zinc-800 dark:group-hover:text-slate-300 transition-colors">
                  <span>{tHub('readArticle')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
