import { generateSoftwareSourceCodeSchema } from "@/utils/seo-metadata";
import { ArrowRight, ArrowDown, Brain, Code, Cpu, Briefcase, MapPin, Zap, Truck, FileText, Microscope } from 'lucide-react';
import { ContactForm } from "@/components/ui/Contact";
import { AboutMe } from "@/components/sections/AboutMe";
import { Link } from '@/i18n/navigation';
import { useTranslations } from "next-intl";
import { getAllPosts } from "@/lib/blog";

export default function Home() {
  const tHero = useTranslations('Hero');
  const tAbout = useTranslations('About');
  const tServices = useTranslations('Services');
  const tExperience = useTranslations('Experience');
  const tProjects = useTranslations('Projects');
  const tSkills = useTranslations('Skills');
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
      <section className="relative min-h-[90vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 mb-8">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-sm font-medium text-brand-700 dark:text-brand-300">{tHero('available')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2 text-stone-900 dark:text-stone-50 leading-[1.1]">
              {tHero('title')}
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-brand-600 dark:text-brand-400 leading-[1.1]">
              {tHero('subtitle')}
            </h1>

            <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 mb-10 max-w-2xl leading-relaxed">
              {tHero('description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-stone-900 dark:bg-stone-50 text-white dark:text-stone-900 px-7 py-3.5 rounded-lg font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors">
                {tHero('ctaContact')} <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#experience" className="inline-flex items-center justify-center gap-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-7 py-3.5 rounded-lg font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                {tHero('ctaWork')} <ArrowDown className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <AboutMe />

      {/* About / Stats Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900 dark:text-stone-50">
              {tAbout('title')}
            </h2>
            <div className="space-y-4 text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
              <p dangerouslySetInnerHTML={{ __html: tAbout('intro') }} />
              <p>{tAbout('paragraph1')}</p>
              <p>{tAbout('paragraph2')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: tAbout('statsYears'), label: tAbout('statsYearsLabel') },
              { value: tAbout('statsAI'), label: tAbout('statsAILabel') },
              { value: tAbout('statsUsers'), label: tAbout('statsUsersLabel') },
              { value: tAbout('statsLanguages'), label: tAbout('statsLanguagesLabel') },
            ].map((stat, i) => (
              <div key={i} className="card rounded-xl p-6 text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-600 dark:text-brand-400 mb-1">{stat.value}</div>
                <div className="text-sm text-stone-500 dark:text-stone-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 border-y border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-900 dark:text-stone-50">{tServices('title')}</h2>
            <p className="text-lg text-stone-600 dark:text-stone-400">{tServices('description')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-brand-50 dark:bg-brand-950 flex items-center justify-center mb-5 text-brand-600 dark:text-brand-400">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">{tServices('aiTitle')}</h3>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{tServices('aiDesc')}</p>
            </div>

            <div className="card rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-brand-50 dark:bg-brand-950 flex items-center justify-center mb-5 text-brand-600 dark:text-brand-400">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">{tServices('devTitle')}</h3>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{tServices('devDesc')}</p>
            </div>

            <div className="card rounded-xl p-8">
              <div className="w-12 h-12 rounded-lg bg-brand-50 dark:bg-brand-950 flex items-center justify-center mb-5 text-brand-600 dark:text-brand-400">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-3">{tServices('consultTitle')}</h3>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">{tServices('consultDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-stone-900 dark:text-stone-50">
            {tExperience('title')}
          </h2>

          <div className="space-y-0">
            {[
              {
                title: tExperience('zaamsflowTitle'),
                role: tExperience('zaamsflowRole'),
                date: tExperience('zaamsflowDate'),
                location: tExperience('zaamsflowLocation'),
                desc: tExperience('zaamsflowDesc'),
                tech: tExperience('zaamsflowTech'),
                current: true,
              },
              {
                title: tExperience('rentmanTitle'),
                role: tExperience('rentmanRole'),
                date: tExperience('rentmanDate'),
                location: tExperience('rentmanLocation'),
                desc: tExperience('rentmanDesc'),
                tech: tExperience('rentmanTech'),
                current: false,
              },
              {
                title: tExperience('tikamoonTitle'),
                role: tExperience('tikamoonRole'),
                date: tExperience('tikamoonDate'),
                location: tExperience('tikamoonLocation'),
                desc: tExperience('tikamoonDesc'),
                tech: tExperience('tikamoonTech'),
                current: false,
              },
              {
                title: tExperience('insitactionTitle'),
                role: tExperience('insitactionRole'),
                date: tExperience('insitactionDate'),
                location: tExperience('insitactionLocation'),
                desc: tExperience('insitactionDesc'),
                tech: tExperience('insitactionTech'),
                current: false,
              },
            ].map((job, i) => (
              <div key={i} className="flex gap-6 md:gap-8">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mt-2 ${job.current ? 'bg-brand-500 ring-4 ring-brand-100 dark:ring-brand-900/40' : 'bg-stone-300 dark:bg-stone-600'}`} />
                  <div className="flex-1 w-px bg-stone-200 dark:bg-stone-800 my-2" />
                </div>
                <div className="pb-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50">{job.title}</h3>
                    <span className="text-sm px-2.5 py-0.5 bg-stone-100 dark:bg-stone-800 rounded-md text-stone-600 dark:text-stone-400 w-fit">{job.role}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-500 mb-4">
                    <span>{job.date}</span>
                    <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600" />
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">{job.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tech.split(', ').map((t) => (
                      <span key={t} className="text-xs px-2 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 border-y border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-stone-900 dark:text-stone-50">{tSkills('title')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, label: tSkills('aiLabel'), items: tSkills('aiItems') },
              { icon: Code, label: tSkills('langLabel'), items: tSkills('langItems') },
              { icon: Briefcase, label: tSkills('frameworkLabel'), items: tSkills('frameworkItems') },
              { icon: Cpu, label: tSkills('infraLabel'), items: tSkills('infraItems') },
            ].map((group, i) => (
              <div key={i} className="card rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <group.icon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                  <h3 className="font-bold text-stone-900 dark:text-stone-50">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.split(', ').map((item) => (
                    <span key={item} className="text-xs px-2 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Side Projects Section */}
      <section id="projects" className="py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-stone-900 dark:text-stone-50">{tProjects('title')}</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="card rounded-xl p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">{tProjects('vanBuilderTag')}</span>
                <Truck className="w-5 h-5 text-stone-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">{tProjects('vanBuilderTitle')}</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">{tProjects('vanBuilderDesc')}</p>
              <span className="text-xs font-medium text-brand-600 dark:text-brand-400">{tProjects('prototype')}</span>
            </div>

            <div className="card rounded-xl p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">{tProjects('invoiceTag')}</span>
                <FileText className="w-5 h-5 text-stone-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">{tProjects('invoiceTitle')}</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">{tProjects('invoiceDesc')}</p>
              <span className="text-xs font-medium text-brand-600 dark:text-brand-400">{tProjects('prototype')}</span>
            </div>

            <div className="card rounded-xl p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">{tProjects('llmTag')}</span>
                <Microscope className="w-5 h-5 text-stone-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-stone-50 mb-2">{tProjects('llmTitle')}</h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-4">{tProjects('llmDesc')}</p>
              <span className="text-xs font-medium text-stone-500 dark:text-stone-500">{tProjects('experiment')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 border-t border-stone-200 dark:border-stone-800">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-stone-900 dark:text-stone-50">{tContact('title')}</h2>
            <p className="text-lg text-stone-600 dark:text-stone-400">{tContact('description')}</p>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Blog Mini-Hub */}
      <section className="py-24 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2 text-stone-900 dark:text-stone-50">{tHub('title')}</h2>
              <p className="text-stone-600 dark:text-stone-400">{tHub('description')}</p>
            </div>
            <Link href="/blog" className="text-brand-600 dark:text-brand-400 font-medium hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex items-center gap-2">
              {tHub('viewAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {getAllPosts().slice(0, 3).map((post, i) => (
              <Link key={i} href={`/blog/${post.slug}`} className="group block card p-6 rounded-xl">
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider mb-3 block">
                  {post.tags?.[0] || 'Article'}
                </span>
                <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-4 line-clamp-2">
                  {post.title}
                </h3>
                <span className="text-sm text-stone-500 dark:text-stone-500 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors flex items-center gap-1">
                  {tHub('readArticle')} <ArrowRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
