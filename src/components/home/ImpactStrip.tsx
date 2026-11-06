const items = [
  { value: 'Millions', label: 'of players on the platform I own' },
  { value: '8', label: 'lottery clients, 40+ widgets each' },
  { before: '7–8 h', value: '<10 min', label: 'QA per widget after my dev environment' },
  { before: '5.1 s', value: '1.3 s', label: 'Speed Index after my Next.js migration' },
]

export default function ImpactStrip() {
  return (
    <dl className='mt-3 grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-line gap-px lg:grid-cols-4'>
      {items.map((item) => (
        <div key={item.label} className='flex flex-col gap-1.5 bg-black px-5 py-5 sm:px-6'>
          <dt className='text-[13px] leading-snug text-muted'>{item.label}</dt>
          <dd className='order-first flex items-baseline gap-2 text-2xl font-medium tracking-tight text-foreground sm:text-[28px]'>
            {item.before && (
              <>
                <span className='text-base text-faint line-through decoration-faint/60 sm:text-lg'>
                  {item.before}
                </span>
                <span className='sr-only'> to </span>
              </>
            )}
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}
