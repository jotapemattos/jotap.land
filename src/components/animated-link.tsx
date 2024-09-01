import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

interface AnimatedLinkProps {
  href: string
  text: string
}

export function AnimatedLink({ href, text }: AnimatedLinkProps) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        className="group flex items-center gap-x-1 hover:underline"
        rel="noopener noreferrer">
        {text}
        <ArrowUpRightIcon className="size-4 opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
      </a>
    </>
  )
}
