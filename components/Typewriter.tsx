'use client'

import { useEffect, useState } from 'react'

interface Props {
  words: string[]
  speed?: number
  pause?: number
}

export default function Typewriter({ words, speed = 60, pause = 2000 }: Props) {
  const [wordIndex, setWordIndex]   = useState(0)
  const [charIndex, setCharIndex]   = useState(0)
  const [deleting, setDeleting]     = useState(false)
  const [displayed, setDisplayed]   = useState('')

  useEffect(() => {
    const current = words[wordIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex(c => c + 1)
      }, speed)
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && charIndex >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex(c => c - 1)
      }, speed / 2)
    } else {
      setDeleting(false)
      setWordIndex(i => (i + 1) % words.length)
      setCharIndex(0)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, deleting, wordIndex, words, speed, pause])

  return (
    <span className="text-indigo-500 dark:text-indigo-400">
      {displayed}
      <span className="animate-blink ml-0.5 inline-block w-0.5 h-5 bg-indigo-400 align-middle" />
    </span>
  )
}
