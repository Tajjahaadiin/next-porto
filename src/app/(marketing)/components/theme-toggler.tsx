'use client'

import { MoonIcon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const iconVar = 'group cursor-pointer rounded-full transition'

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevent mismatch on initial SSR

  const isLight = theme === 'light'

  return isLight ? (
    <MoonIcon onClick={() => setTheme('dark')} className={iconVar} />
  ) : (
    <Sun onClick={() => setTheme('light')} className={iconVar} />
  )
}
