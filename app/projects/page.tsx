import type { Metadata } from 'next'
import Link from 'next/link'
import { Github } from 'lucide-react'
import ProjectCard from '@/components/ProjectCard'
import { getGithubRepos } from '@/lib/github'
import { siteConfig } from '@/lib/config'

export const metadata: Metadata = {
  title: 'Projects',
  description: `Open-source work and professional projects by ${siteConfig.name}.`,
}

export default async function ProjectsPage() {
  const repos = await getGithubRepos(siteConfig.githubUsername)

  return (
    <div className="max-w-3xl mx-auto px-5 py-16 sm:py-24">

      {/* Header */}
      <div className="mb-10 animate-fade-up">
        <p className="section-label">Projects</p>
        <div className="flex items-end justify-between gap-4 mb-3">
          <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            Open Source
          </h1>
          <Link
            href={siteConfig.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500
                       hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-1"
          >
            <Github size={13} />
            @{siteConfig.githubUsername}
          </Link>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          A selection of repositories from my GitHub — infrastructure tools, automation scripts, and
          cloud-native experiments.
          {repos.length > 0 && (
            <span className="ml-1 text-zinc-400 dark:text-zinc-500">
              {repos.length} public repos
            </span>
          )}
        </p>
      </div>

      {/* Grid */}
      <div className="animate-fade-up" style={{ animationDelay: '0.08s' }}>
        {repos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repos.map(repo => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <Github size={28} className="mx-auto mb-3 text-zinc-300 dark:text-zinc-600" />
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mb-1">
              No public repositories found
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
              Repos will appear here automatically once they&apos;re public.
            </p>
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium
                         bg-zinc-900 text-white dark:bg-white dark:text-zinc-900
                         hover:opacity-80 transition-opacity"
            >
              <Github size={12} />
              View on GitHub
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
