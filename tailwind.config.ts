import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'JetBrains Mono', 'monospace'],
        serif: ['Georgia', 'Cambria', 'serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#6366f1',
          dark:    '#818cf8',
        },
      },
      typography: (theme: (key: string) => string) => ({
        DEFAULT: {
          css: {
            maxWidth: '72ch',
            color: theme('colors.zinc.700'),
            a: { color: theme('colors.indigo.600'), textDecoration: 'none', '&:hover': { textDecoration: 'underline' } },
            h1: { color: theme('colors.zinc.900'), fontWeight: '700' },
            h2: { color: theme('colors.zinc.900'), fontWeight: '700' },
            h3: { color: theme('colors.zinc.900'), fontWeight: '600' },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
            code: {
              backgroundColor: theme('colors.zinc.100'),
              color: theme('colors.zinc.800'),
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: theme('colors.zinc.950'),
              color: theme('colors.zinc.100'),
              borderRadius: '10px',
              padding: '1.25rem 1.5rem',
            },
            blockquote: {
              borderLeftColor: theme('colors.indigo.400'),
              color: theme('colors.zinc.600'),
              fontStyle: 'normal',
            },
          },
        },
        invert: {
          css: {
            color: theme('colors.zinc.300'),
            a: { color: theme('colors.indigo.400') },
            h1: { color: theme('colors.zinc.50') },
            h2: { color: theme('colors.zinc.50') },
            h3: { color: theme('colors.zinc.100') },
            code: {
              backgroundColor: theme('colors.zinc.800'),
              color: theme('colors.zinc.100'),
            },
            blockquote: { color: theme('colors.zinc.400') },
          },
        },
      }),
      animation: {
        'fade-up':   'fadeUp 0.5s ease both',
        'fade-in':   'fadeIn 0.4s ease both',
        'blink':     'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp:  { from: { opacity: '0', transform: 'translateY(18px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        blink:   { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config
