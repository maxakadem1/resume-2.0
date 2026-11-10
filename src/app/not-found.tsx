import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      id='main'
      className='flex min-h-[100svh] flex-col items-start justify-end px-5 pb-12 pt-32 sm:px-8 lg:px-12'
    >
      <p className='label'>Error 404</p>
      <h1 className='display mt-4 [font-size:clamp(4rem,18vw,18rem)]'>
        Blank <em className='mark'>plate.</em>
      </h1>
      <p className='mt-6 max-w-md text-lg text-muted'>
        Nothing was ever engraved at this address.
      </p>
      <Link href='/' className='btn btn-solid mt-8'>
        ← Back to the start
      </Link>
    </main>
  )
}
