'use client'

interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  readingTime: string
  published: boolean
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'

interface Props {
  post: PostMeta
  compact?: boolean
}

export default function PostCard({ post, compact = false }: Props) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className={`py-5 border-b border-zinc-100 dark:border-zinc-800 last:border-0
                           transition-all duration-150 ${compact ? '' : 'hover:pl-1'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Date + read time */}
            <div className="flex items-center gap-3 mb-1.5">
              <time className="text-xs text-zinc-400 dark:text-zinc-500">
                {formatDate(post.date)}
              </time>
              <span className="text-zinc-200 dark:text-zinc-700">·</span>
              <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                <Clock size={10} />
                {post.readingTime}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100
                           group-hover:text-indigo-600 dark:group-hover:text-indigo-400
                           transition-colors leading-snug mb-1.5">
              {post.title}
            </h3>

            {/* Summary */}
            {!compact && post.summary && (
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                {post.summary}
              </p>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {post.tags.map(tag => (
                  <span key={tag} className="tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>

          <ArrowRight
            size={14}
            className="flex-shrink-0 mt-1 text-zinc-300 dark:text-zinc-600
                       group-hover:text-indigo-500 group-hover:translate-x-0.5
                       transition-all duration-150"
          />
        </div>
      </article>
    </Link>
  )
}
