interface SocialsButtonProps {
  href: string
  text: string
}

export function SocialsButton({ href, text }: SocialsButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      className="group relative inline-flex items-center justify-center font-serif text-sm text-stone-300 underline transition-colors duration-200 hover:text-stone-500 md:text-base">
      <>
        <span>{text}</span>
      </>
    </a>
  )
}
