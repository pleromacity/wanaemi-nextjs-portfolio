import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Mail, Phone, MessageCircle } from 'lucide-react'
import Typewriter from '@/components/Typewriter'
import PostCard from '@/components/PostCard'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/lib/config'

const socials = [
  { icon: Github,        href: siteConfig.github,                      label: 'GitHub',   value: 'github.com/pleromacity' },
  { icon: Linkedin,      href: siteConfig.linkedin,                    label: 'LinkedIn', value: 'wanaemi-watson' },
  { icon: Mail,          href: `mailto:${siteConfig.email}`,           label: 'Email',    value: siteConfig.email },
  { icon: Phone,         href: `tel:${siteConfig.phone}`,              label: 'Call',     value: siteConfig.phone },
  { icon: MessageCircle, href: `https://wa.me/${siteConfig.whatsapp}`, label: 'WhatsApp', value: '+234 818 515 0882' },
]

export default function HomePage() {
  const posts = getAllPosts().slice(0, 4)

  return (
    <div className="max-w-3xl mx-auto px-5 py-16 sm:py-24">

      {/* ── HERO ── */}
      <section className="mb-20 animate-fade-up">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-3 py-1 rounded-full
                        bg-emerald-50 dark:bg-emerald-950/40
                        border border-emerald-100 dark:border-emerald-900/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            Open to opportunities
          </span>
        </div>

        {/* Greeting */}
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-2">
          Hi, I&apos;m {siteConfig.name.split(' ')[0]} 👋
        </h1>

        {/* Typewriter role */}
        <p className="text-xl sm:text-2xl font-semibold mb-6 h-8 flex items-center">
          <Typewriter words={siteConfig.roles} />
        </p>

        {/* Bio */}
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl mb-8">
          Platform Engineering Architect specializing in{' '}
          <span className="text-zinc-900 dark:text-zinc-100 font-medium">cloud-native design</span>,{' '}
          <span className="text-zinc-900 dark:text-zinc-100 font-medium">DevOps automation</span>, and{' '}
          <span className="text-zinc-900 dark:text-zinc-100 font-medium">site reliability</span>.
          I build resilient platforms that scale, empower teams, and keep systems running smoothly.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                       bg-zinc-900 text-white dark:bg-white dark:text-zinc-900
                       hover:opacity-80 transition-opacity"
          >
            About me <ArrowRight size={13} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                       border border-zinc-200 dark:border-zinc-700
                       text-zinc-700 dark:text-zinc-300
                       hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors"
          >
            View projects
          </Link>
        </div>
      </section>

      {/* ── LATEST POSTS ── */}
      <section className="mb-20 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between mb-6">
          <p className="section-label">Latest posts</p>
          <Link
            href="/blog"
            className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 transition-colors flex items-center gap-1"
          >
            All posts <ArrowRight size={11} />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div>
            {posts.map(post => (
              <PostCard key={post.slug} post={post} compact />
            ))}
          </div>
        ) : (
          <div className="py-10 text-center rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              No posts yet — check back soon.
            </p>
          </div>
        )}
      </section>

      {/* ── CONTACT / SOCIAL ── */}
      <section className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <p className="section-label">Connect</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socials.map(({ icon: Icon, href, label, value }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg
                         border border-zinc-100 dark:border-zinc-800
                         hover:border-zinc-200 dark:hover:border-zinc-700
                         hover:bg-zinc-50 dark:hover:bg-zinc-900
                         transition-all group"
            >
              <div className="p-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800
                              group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950
                              transition-colors">
                <Icon size={13} className="text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-500 transition-colors" />
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">{label}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">{value}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
