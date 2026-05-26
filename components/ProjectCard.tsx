import Link from 'next/link'
import { Star, GitFork, ExternalLink } from 'lucide-react'
import type { GithubRepo } from '@/lib/github'
import { LANG_COLORS } from '@/lib/github'

interface Props {
  repo: GithubRepo
}

export default function ProjectCard({ repo }: Props) {
  const color = repo.language ? (LANG_COLORS[repo.language] ?? LANG_COLORS.default) : LANG_COLORS.default

  return (
    <div className="card group flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 leading-snug">
          {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
        </h3>
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          aria-label="View on GitHub"
          className="flex-shrink-0 text-zinc-400 hover:text-indigo-500 transition-colors"
        >
          <ExternalLink size={13} />
        </Link>
      </div>

      {/* Description */}
      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed flex-1 line-clamp-3">
        {repo.description ?? 'No description provided.'}
      </p>

      {/* Topics */}
      {repo.topics?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map(t => (
            <span key={t} className="tag-accent">{t}</span>
          ))}
        </div>
      )}

      {/* Footer meta */}
      <div className="flex items-center gap-4 pt-1 border-t border-zinc-100 dark:border-zinc-800">
        {repo.language && (
          <span className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: color }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
          <Star size={11} />
          {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
          <GitFork size={11} />
          {repo.forks_count}
        </span>
        {repo.homepage && (
          <Link
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            className="ml-auto text-xs text-indigo-500 hover:underline"
          >
            Live demo →
          </Link>
        )}
      </div>
    </div>
  )
}
