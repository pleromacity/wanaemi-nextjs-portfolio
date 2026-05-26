import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/posts'
import { siteConfig } from '@/lib/config'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post not found' }
  return {
    title:       post.title,
    description: post.summary,
    openGraph: {
      title:       post.title,
      description: post.summary,
      type:        'article',
      publishedTime: post.date,
      authors:     [siteConfig.name],
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <div className="max-w-3xl mx-auto px-5 py-16 sm:py-24">

      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 dark:text-zinc-500
                   hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-10 group"
      >
        <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
        All posts
      </Link>

      {/* Header */}
      <header className="mb-10">
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="tag-accent">#{tag}</span>
            ))}
          </div>
        )}

        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-4">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4">
          <span className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            <Calendar size={11} />
            {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            <Clock size={11} />
            {post.readingTime}
          </span>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            by {siteConfig.name}
          </span>
        </div>

        {post.summary && (
          <p className="mt-4 text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-2 border-indigo-400 pl-4">
            {post.summary}
          </p>
        )}
      </header>

      <div className="divider mb-10" />

      {/* MDX content */}
      <article className="prose prose-zinc dark:prose-invert max-w-none
                          prose-headings:font-bold prose-headings:tracking-tight
                          prose-a:text-indigo-600 dark:prose-a:text-indigo-400
                          prose-code:font-mono prose-pre:rounded-xl
                          prose-img:rounded-xl prose-img:border prose-img:border-zinc-100 dark:prose-img:border-zinc-800">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </article>

      {/* Footer nav */}
      <div className="divider mt-12 mb-8" />
      <div className="flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors group"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          All posts
        </Link>
        <Link
          href="/about"
          className="text-sm text-zinc-400 hover:text-indigo-500 transition-colors"
        >
          About the author →
        </Link>
      </div>
    </div>
  )
}
