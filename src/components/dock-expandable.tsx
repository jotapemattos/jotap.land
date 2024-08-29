import {
  BeakerIcon,
  HomeIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import useClickOutside from '../hooks/use-click-outside'
import { cn } from '../lib/utils'
import AnimatedBackground from './ui/animated-background'

type NavItems = {
  id: number
  label: string
  title: JSX.Element
  content?: JSX.Element
  href?: string
}

const transition = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.25
}

const CONTACT_TABS = [
  {
    label: 'Twitter',
    href: 'https://x.com/devjotape'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jo%C3%A3o-pedro-mattos-rodrigues-camargo/'
  },
  {
    label: 'GitHub',
    href: 'https://github.com/jotapemattos'
  },
  {
    label: 'Email',
    href: 'mailto:jotapemattos.dev@gmail.com'
  }
]
const CRAFT_TABS = ['Crafts', 'Study Cases', 'Side Projects']

const ITEMS: NavItems[] = [
  {
    id: 1,
    label: 'Home',
    title: (
      <span className="flex items-center gap-2 text-contrast-50">
        <HomeIcon className="size-6" />
        Home
      </span>
    ),
    href: '/'
  },
  {
    id: 2,
    label: 'Messages',
    title: (
      <span className="flex items-center gap-2 text-contrast-50">
        <BeakerIcon className="size-6" />
        Crafts
      </span>
    ),
    content: (
      <div className="flex flex-col">
        <AnimatedBackground
          className="rounded-lg bg-stone-600 px-2"
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.3
          }}
          enableHover>
          {CRAFT_TABS.map((tab, index) => (
            <button
              key={index}
              data-id={tab}
              type="button"
              className="p-2 text-contrast-50 transition-colors duration-300">
              {tab}
            </button>
          ))}
        </AnimatedBackground>
      </div>
    )
  },
  {
    id: 3,
    label: 'Documents',
    title: (
      <span className="flex items-center gap-2 text-contrast-50">
        <PaperAirplaneIcon className="size-6" />
        Contact
      </span>
    ),
    content: (
      <div className="flex w-full flex-col">
        <AnimatedBackground
          className="rounded-lg bg-stone-600 px-2"
          transition={{
            type: 'spring',
            bounce: 0.2,
            duration: 0.3
          }}
          enableHover>
          {CONTACT_TABS.map((tab, index) => (
            <a
              key={index}
              data-id={tab.label}
              href={tab.href}
              target="_blank"
              className="w-full p-2 text-contrast-50 transition-colors duration-300">
              {tab.label}
            </a>
          ))}
        </AnimatedBackground>
      </div>
    )
  }
]

export default function DockExpandable() {
  const [active, setActive] = useState<number | null>(null)
  const [contentRef, { height: heightContent }] = useMeasure()
  const [menuRef, { width: widthContainer }] = useMeasure()
  const ref = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [maxWidth, setMaxWidth] = useState(0)
  const [isLink, setIsLink] = useState(true)

  useClickOutside(ref, () => {
    setIsOpen(false)
    setActive(null)
  })

  useEffect(() => {
    if (!widthContainer || maxWidth > 0) return

    setMaxWidth(widthContainer)
  }, [widthContainer, maxWidth])

  return (
    <MotionConfig transition={transition}>
      <div className="absolute bottom-8" ref={ref}>
        <div className="h-full w-full rounded-2xl border border-zinc-950/10 bg-stone-800">
          <div className="overflow-hidden">
            <AnimatePresence initial={false} mode="sync">
              {isOpen && !isLink ? (
                <motion.div
                  key="content"
                  initial={{ height: 0 }}
                  animate={{ height: heightContent || 0 }}
                  exit={{ height: 0 }}
                  style={{
                    width: maxWidth
                  }}>
                  <div ref={contentRef} className="p-1">
                    {ITEMS.map((item) => {
                      const isSelected = active === item.id

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: isSelected ? 1 : 0 }}
                          exit={{ opacity: 0 }}>
                          <div
                            className={cn(
                              'px-2 pt-2 text-sm',
                              isSelected ? 'block' : 'hidden'
                            )}>
                            {item.content}
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
          <div className="flex space-x-2 p-2" ref={menuRef}>
            {ITEMS.map((item) =>
              item.content ? (
                <button
                  key={item.id}
                  aria-label={item.label}
                  className={cn(
                    'relative flex size-fit shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg p-2 text-sm text-zinc-500 transition-colors hover:bg-stone-950 hover:text-zinc-100 focus-visible:ring-2 active:scale-[0.98]',
                    active === item.id ? 'bg-stone-950 text-stone-300' : ''
                  )}
                  type="button"
                  onClick={() => {
                    setIsLink(false)
                    if (!isOpen) setIsOpen(true)
                    if (active === item.id) {
                      setIsOpen(false)
                      setActive(null)
                      return
                    }

                    setActive(item.id)
                  }}>
                  {item.title}
                </button>
              ) : (
                <a
                  href={item.href}
                  key={item.id}
                  aria-label={item.label}
                  className={cn(
                    'relative flex size-fit shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg p-2 text-sm text-zinc-500 transition-colors hover:bg-stone-950 hover:text-zinc-100 focus-visible:ring-2 active:scale-[0.98]',
                    active === item.id ? 'bg-stone-950 text-stone-300' : ''
                  )}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsLink(true)
                    if (!isOpen) setIsOpen(true)
                    if (active === item.id) {
                      setIsOpen(false)
                      setActive(null)
                      return
                    }

                    setActive(item.id)
                  }}>
                  {item.title}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </MotionConfig>
  )
}
