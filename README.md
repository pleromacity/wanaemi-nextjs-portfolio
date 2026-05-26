# Wanaemi Watson — Portfolio & Blog

A clean, minimalist Next.js 14 portfolio and blog built with the App Router, Tailwind CSS, and MDX.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + `@tailwindcss/typography`
- **Theme**: `next-themes` (dark/light toggle)
- **Blog**: MDX via `next-mdx-remote` + `gray-matter`
- **Icons**: Lucide React
- **Projects**: GitHub API (auto-fetched)

---

## Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set up environment variables (optional but recommended)

Create a `.env.local` file:

```env
# Prevents GitHub API rate limiting on the /projects page
GITHUB_TOKEN=your_github_personal_access_token
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout (Header + Footer + ThemeProvider)
│   ├── page.tsx            # Home page (/)
│   ├── about/
│   │   └── page.tsx        # About page (/about)
│   ├── blog/
│   │   ├── page.tsx        # Blog listing (/blog)
│   │   └── [slug]/
│   │       └── page.tsx    # Dynamic blog post (/blog/[slug])
│   └── projects/
│       └── page.tsx        # Projects page (/projects)
│
├── components/
│   ├── Header.tsx          # Sticky nav + theme toggle
│   ├── Footer.tsx          # Social links footer
│   ├── ThemeProvider.tsx   # next-themes wrapper
│   ├── Typewriter.tsx      # Animated role typewriter
│   ├── PostCard.tsx        # Blog post list item
│   ├── ProjectCard.tsx     # GitHub repo card
│   └── BlogSearch.tsx      # Client-side search + tag filter
│
├── lib/
│   ├── config.ts           # All site config (name, bio, stack, socials)
│   ├── posts.ts            # MDX post utilities
│   └── github.ts           # GitHub API fetcher
│
├── content/
│   └── posts/              # Your MDX blog posts go here
│       └── *.mdx
│
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

---

## Writing Blog Posts

Create a new `.mdx` file inside `content/posts/`:

```mdx
---
title: "Your Post Title"
date: "2025-07-01"
summary: "A brief one-sentence description of the post."
tags: ["Kubernetes", "DevOps", "AWS"]
published: true
---

## Your content here

Write in standard Markdown. Code blocks, tables, blockquotes all work.
```

---

## Deploying to Netlify

1. Push to GitHub
2. Connect repo on [netlify.com](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add the `GITHUB_TOKEN` environment variable in Netlify site settings

---

## Deploying to Vercel

```bash
npx vercel
```

---

## Customising

All personal content lives in **`lib/config.ts`** — update your name, bio, social links, tech stack, and GitHub username there. Everything else updates automatically.
