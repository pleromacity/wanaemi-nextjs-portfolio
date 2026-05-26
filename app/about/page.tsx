import type { Metadata } from 'next'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'About',
  description: `Learn more about ${siteConfig.name} — ${siteConfig.role}.`,
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 py-16 sm:py-24">

      {/* ── HEADER ── */}
      <section className="mb-16 animate-fade-up">
        <p className="section-label mb-3">About</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 leading-tight">
          Platform Engineering Architect
          <br />
          <span className="text-zinc-400 dark:text-zinc-500 font-normal text-2xl">
            building where infrastructure meets reliability
          </span>
        </h1>

        {/* Bio paragraphs */}
        <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-[15px]">
          {siteConfig.bio.split(/\. (?=[A-Z])/).map((sentence, i) => (
            <p key={i}>{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</p>
          ))}
        </div>
      </section>

      {/* ── QUICK FACTS ── */}
      <section className="mb-16 animate-fade-up" style={{ animationDelay: '0.05s' }}>
        <p className="section-label">Quick facts</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { label: 'Location',       value: siteConfig.location },
            { label: 'Specialisation', value: 'Cloud & DevOps'    },
            { label: 'Certified',      value: 'PSM I · HSE L1–3'  },
            { label: 'Platforms',      value: 'AWS · Azure · GCP' },
            { label: 'Availability',   value: 'Open to roles'     },
            { label: 'GitHub',         value: '@pleromacity'      },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800
                         bg-white dark:bg-zinc-900"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
                {label}
              </p>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK GRID ── */}
      <section className="mb-16 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <p className="section-label">Tech stack & tools</p>
        <div className="space-y-6">
          {siteConfig.stack.map(({ category, items }) => (
            <div key={category}>
              <h3 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-3 flex items-center gap-2">
                <span className="w-4 h-px bg-zinc-200 dark:bg-zinc-700" />
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <span
                    key={item}
                    className="px-3 py-1 text-xs font-medium rounded-full
                               bg-zinc-50 dark:bg-zinc-900
                               border border-zinc-100 dark:border-zinc-800
                               text-zinc-700 dark:text-zinc-300
                               hover:border-indigo-200 dark:hover:border-indigo-800
                               hover:text-indigo-600 dark:hover:text-indigo-400
                               transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="animate-fade-up" style={{ animationDelay: '0.15s' }}>
        <p className="section-label">Certifications & credentials</p>
        <div className="space-y-3">
          {[
            { title: 'Professional Scrum Master I (PSM I)', org: 'Scrum.org',         year: '2024' },
            { title: 'HSE Level 1 – 3',                    org: 'Safety Certification', year: '2023' },
            { title: 'AWS Solutions Architect (in view)',   org: 'Amazon Web Services', year: '2025' },
            { title: 'Azure Administrator (in view)',       org: 'Microsoft',           year: '2025' },
          ].map(({ title, org, year }) => (
            <div
              key={title}
              className="flex items-center justify-between p-4 rounded-xl
                         border border-zinc-100 dark:border-zinc-800
                         bg-white dark:bg-zinc-900"
            >
              <div>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">{org}</p>
              </div>
              <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">{year}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
