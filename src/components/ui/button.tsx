import { cn } from '../../lib/utils'
import { Garnish } from './garnish'

type ButtonProps = {
  aria?: string
  as: 'a' | 'button'
  children?: React.ReactNode
  className?: string
  external?: boolean
  garnish?: boolean
  href?: string
  onClick?: () => void
  state?: boolean
  title: string
  type?: 'submit' | 'reset' | 'button' | undefined
  variant?: 'default' | 'link'
}

export function Button({
  as,
  aria,
  children,
  className,
  external,
  garnish = false,
  href,
  onClick,
  state,
  title,
  type,
  variant = 'default'
}: ButtonProps) {
  const Component = as

  return (
    <Component
      aria-label={aria ?? title}
      className={cn(
        'group flex w-max items-center justify-center gap-2.5 rounded-xl px-4 py-2.5 active:scale-95 sm:transition-transform',
        {
          'bg-stone-950 text-sm font-medium text-contrast-50':
            variant === 'default',

          'bg-transparent font-serif text-sm text-stone-300 underline transition-colors duration-200 hover:text-stone-500 md:text-base':
            variant === 'link'
        },
        className
      )}
      href={href || ''}
      onClick={onClick}
      rel={external ? 'noopener noreferrer' : undefined}
      target={external ? '_blank' : undefined}
      type={type}>
      {garnish && <Garnish />}
      {title}
      {children}
    </Component>
  )
}
