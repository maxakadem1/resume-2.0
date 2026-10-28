import Panel, { type PanelProps } from '@/components/Panel'
import { MenuLink } from '@/components/links'
import { profile } from '@/content/profile'

export default function ContactMeContent({ style, onBack }: PanelProps) {
  return (
    <Panel
      title='Contact'
      style={style}
      onBack={onBack}
      bodyClassName='flex flex-col gap-4'
    >
      <ul className='flex flex-col gap-2'>
        <li>
          <MenuLink href={`mailto:${profile.email}`} newTab={false}>
            {profile.email}
          </MenuLink>
        </li>
        <li>
          <MenuLink href={profile.links.linkedin}>LinkedIn</MenuLink>
        </li>
        <li>
          <MenuLink href={profile.links.github}>GitHub</MenuLink>
        </li>
        <li>
          <MenuLink href='/resume'>Resume (PDF)</MenuLink>
        </li>
      </ul>
    </Panel>
  )
}
