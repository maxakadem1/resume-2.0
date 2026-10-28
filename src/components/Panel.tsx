import { animated } from '@react-spring/web'
import { useId, type ComponentProps, type ReactNode } from 'react'

export type PanelStyle = ComponentProps<typeof animated.section>['style']

export interface PanelProps {
  style: PanelStyle
  onBack: () => void
}

interface Props extends PanelProps {
  title: string
  children: ReactNode
  bodyClassName?: string
}

export default function Panel({
  title,
  style,
  onBack,
  children,
  bodyClassName = 'flex flex-col gap-4',
}: Props) {
  const headingId = useId()

  return (
    <animated.section style={style} aria-labelledby={headingId}>
      <div className='flex flex-col lg:h-[65vh] md:h-[60vh] h-[75vh]'>
        <header className='flex flex-col pb-6'>
          <h2 id={headingId} className='text-xl font-semibold text-gray-300'>
            {title}
          </h2>
          <button
            type='button'
            onClick={onBack}
            className='text-gray-500 hover:text-white w-fit'
          >
            Go Back
          </button>
        </header>
        <div className={`overflow-y-auto relative pr-4 ${bodyClassName}`}>
          {children}
        </div>
      </div>
    </animated.section>
  )
}
