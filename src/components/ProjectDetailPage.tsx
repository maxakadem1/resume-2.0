import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudy, Metric, Project } from '@/content/projects'
import { profile } from '@/content/profile'

function MetricValue({ metric }: { metric: Metric }) {
  if (!metric.before) return <>{metric.value}</>

  return (
    <>
      <span className='text-gray-600'>{metric.before}</span>
      <span className='text-gray-600 px-2' aria-hidden>
        →
      </span>
      <span className='sr-only'> to </span>
      {metric.value}
    </>
  )
}

function CaseStudyBody({ study }: { study: CaseStudy }) {
  return (
    <>
      <p className='text-gray-400'>{study.summary}</p>
      {study.sections.map((section) => (
        <section key={section.heading}>
          <h2 className='text-gray-500 text-base pb-1'>{section.heading}</h2>
          <p>{section.body}</p>
        </section>
      ))}
      <ul className='flex flex-wrap gap-2 pt-2 text-sm' aria-label='Stack'>
        {study.stack.map((item) => (
          <li
            key={item}
            className='border border-gray-800 text-gray-400 px-2 py-0.5'
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  )
}

function MetricsAside({ metrics }: { metrics: Metric[] }) {
  return (
    <dl className='grid sm:grid-cols-2 gap-x-8 gap-y-10 md:px-6'>
      {metrics.map((metric) => (
        <div key={metric.label} className='flex flex-col gap-2'>
          <dt className='text-gray-500'>{metric.label}</dt>
          <dd className='text-3xl md:text-4xl font-light text-gray-100'>
            <MetricValue metric={metric} />
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default function ProjectDetailPage({ project }: { project: Project }) {
  const isCaseStudy = project.kind === 'case-study'

  return (
    <main className='flex md:h-screen h-auto w-screen md:flex-row flex-col md:items-center items-start justify-between md:gap-12 gap-2 md:p-10 p-4 text-sm bg-black'>
      <div className='flex flex-col h-full md:w-[50%] w-full pb-4'>
        <header className='mb-8 md:flex hidden flex-col'>
          <Link href='/' className='text-gray-300 hover:text-white w-fit'>
            {profile.name}
          </Link>
          <p className='text-gray-500'>{profile.role}</p>
          <p className='text-gray-600'>{profile.stack}</p>
        </header>

        <div className='flex flex-col pb-6'>
          <h1 className='text-xl font-semibold text-gray-300'>
            {project.title}
          </h1>
          <Link href='/' className='text-gray-500 hover:text-white w-fit'>
            Go Back
          </Link>
        </div>

        <article className='flex flex-col gap-4 overflow-y-auto relative pr-4 md:h-full md:w-full w-[90vw] text-gray-300 text-lg'>
          {isCaseStudy ? <CaseStudyBody study={project} /> : project.body}
        </article>
      </div>

      <div className='md:w-[50%] w-full flex flex-col md:justify-center md:h-[90vh] overflow-y-auto'>
        {isCaseStudy ? (
          <MetricsAside metrics={project.metrics} />
        ) : (
          <div className='flex flex-col gap-4 overflow-y-auto relative pr-4'>
            {/* Images are portfolio screenshots from the public directory. */}
            {project.images.map((image, index) => (
              <Image
                key={image}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                width={1400}
                height={1000}
                className='w-full h-auto object-contain mb-4'
                priority={index === 0}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
