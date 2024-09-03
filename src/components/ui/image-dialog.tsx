import { XMarkIcon } from '@heroicons/react/24/outline'
import {
  Dialog,
  DialogClose,
  DialogContainer,
  DialogContent,
  DialogImage,
  DialogTrigger
} from './compound-dialog'

interface DialogBasicImageProps {
  contentImage: string
  alt: string
}

export function DialogBasicImage({ contentImage, alt }: DialogBasicImageProps) {
  return (
    <Dialog
      transition={{
        duration: 0.3,
        ease: 'easeInOut'
      }}>
      <DialogTrigger>
        <em className="text-contrast-100">Bragança Paulista,</em>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent className="relative">
          <DialogImage
            src={contentImage}
            alt={alt}
            className="h-auto w-full max-w-[90vw] rounded-3xl object-cover lg:h-[90vh]"
          />
        </DialogContent>
        <DialogClose
          className="fixed top-6 flex h-fit w-fit items-center justify-center rounded-full bg-stone-50 p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 }
            },
            exit: { opacity: 0, transition: { duration: 0 } }
          }}>
          <XMarkIcon className="h-5 w-5 text-contrast-950" />
        </DialogClose>
      </DialogContainer>
    </Dialog>
  )
}
