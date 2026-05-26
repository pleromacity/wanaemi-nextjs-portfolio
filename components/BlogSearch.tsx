'use client'

import { useState, useMemo } from 'react'
import { Search, X } from 'lucide-react'
import PostCard from './PostCard'
interface PostMeta {
  slug: string
  title: string
  date: string
  summary: string
  tags: string[]
  readingTime: string
  published: boolean
}

interface Props {
  posts: PostMeta[]
  allTags: string[]
}

export default function BlogSearch({ posts, allTags }: Props) {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchesQuery = query === '' ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.summary.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))

      const matchesTag = !activeTag || p.tags.includes(activeTag)
      return matchesQuery && matchesTag
    })
  }, [posts, query, activeTag])

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <Search
          size={14}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          type="text"
          placeholder="Search posts…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-9 pr-9 py-2.5 text-sm rounded-lg
                     border border-zinc-200 dark:border-zinc-800
                     bg-white dark:bg-zinc-900
                     text-zinc-900 dark:text-zinc-100
                     placeholder:text-zinc-400 dark:placeholder:text-zinc-500
                     focus:outline-none focus:ring-2 focus:ring-indigo-500/30
                     transition-all"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Tag filters */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTag(null)}
            className={`tag cursor-pointer transition-all ${!activeTag
              ? 'bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white'
              : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
          >
            All
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`tag cursor-pointer transition-all ${activeTag === tag
                ? 'bg-indigo-500 text-white dark:bg-indigo-500 dark:text-white'
                : 'hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length > 0 ? (
        <div>
          {filtered.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            No posts match <span className="font-medium text-zinc-600 dark:text-zinc-300">"{query}"</span>
          </p>
          <button
            onClick={() => { setQuery(''); setActiveTag(null) }}
            className="mt-3 text-xs text-indigo-500 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
