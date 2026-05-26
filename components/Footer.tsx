import Link from 'next/link'
import { Github, Linkedin, Mail, Phone, MessageCircle } from 'lucide-react'
import { siteConfig } from '@/lib/config'

const socials = [
  { icon: Github,        href: siteConfig.github,                          label: 'GitHub'    },
  { icon: Linkedin,      href: siteConfig.linkedin,                        label: 'LinkedIn'  },
  { icon: Mail,          href: `mailto:${siteConfig.email}`,               label: 'Email'     },
  { icon: Phone,         href: `tel:${siteConfig.phone}`,                  label: 'Call'      },
  { icon: MessageCircle, href: `https://wa.me/${siteConfig.whatsapp}`,     label: 'WhatsApp'  },
]

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800 mt-20">
      <div className="max-w-3xl mx-auto px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.location}
        </p>

        <div className="flex items-center gap-1">
          {socials.map(({ icon: Icon, href, label }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="p-2 rounded-lg text-zinc-400 dark:text-zinc-500
                         hover:text-zinc-900 dark:hover:text-zinc-100
                         hover:bg-zinc-100 dark:hover:bg-zinc-800
                         transition-all duration-150"
            >
              <Icon size={15} />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}
