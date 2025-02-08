import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { cn } from '../../lib/utils'

type GarnishProps = {
  className?: string
}

export function Garnish({ className }: GarnishProps) {
  return (
    <span
      className={cn(
        '*:ease-bounce relative flex size-4 items-center justify-center overflow-hidden *:transition-transform *:duration-[400ms]',
        className
      )}
    >
      <ArrowLeftIcon className="absolute translate-x-5 font-bold sm:group-hover:translate-x-0" />
      <ArrowLeftIcon className="font-bold sm:group-hover:-translate-x-5" />
    </span>
  )
}
