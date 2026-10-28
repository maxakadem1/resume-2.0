import Panel, { type PanelProps } from '@/components/Panel'
import { InlineLink } from '@/components/links'
import { profile } from '@/content/profile'

export default function AboutMeContent({ style, onBack }: PanelProps) {
  return (
    <Panel
      title='About'
      style={style}
      onBack={onBack}
      bodyClassName='flex flex-col gap-4 text-base text-gray-300'
    >
      <p>
        I’m a frontend developer in Winnipeg. I build the shared platform behind
        Pollard Banknote’s lottery products: the widget system, component
        library, and API layer that client web and mobile apps for 8 lottery
        clients are built on, serving millions of players.
      </p>
      <p>
        I like owning systems end to end: making the architecture call,
        building it, getting it to production, and making it easy for the next
        developer to work in. Lately that means acting as technical lead on
        client launches and being the person about 15 developers come to when
        something is stuck.
      </p>
      <p>
        I studied art and design before computer science, and it still shapes
        how I work. I care about how an interface feels, not only whether it
        works. I still draw in my spare time, and some of it is{' '}
        <InlineLink href='/projects/artwork'>here</InlineLink>.
      </p>
      <p>
        For roles or collaborations, reach me by{' '}
        <InlineLink href={`mailto:${profile.email}`} newTab={false}>
          email
        </InlineLink>{' '}
        or on{' '}
        <InlineLink href={profile.links.linkedin}>LinkedIn</InlineLink>.
      </p>
    </Panel>
  )
}
