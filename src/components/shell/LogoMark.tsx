import { cn } from '@/components/ui'

/** A small glass tile with a cross, after the Blender render on the home page. */
export default function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'relative grid size-5 shrink-0 place-items-center overflow-hidden rounded-[6px] bg-gradient-to-br from-[#5b7cff] to-[#2a3fc4] shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_0_12px_rgb(61_99_240/0.45)]',
        className,
      )}
    >
      <svg viewBox='0 0 20 20' className='size-[70%]'>
        <path
          d='M8 3.5h4v4.5h4.5v4H12v4.5H8V12H3.5V8H8z'
          fill='white'
          fillOpacity='0.92'
        />
      </svg>
    </span>
  )
}
