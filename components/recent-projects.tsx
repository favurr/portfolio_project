import Link from 'next/link'
import { getProjects } from '@/lib/projects'
import Projects from '@/components/projects'
import { LayersIcon } from '@radix-ui/react-icons'

export default async function RecentProjects() {
  const projects = await getProjects(2)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>
          <LayersIcon className='inline-block size-6 text-red-700' />
          <span className='ml-4' />
          Recent projects
        </h2>
        <Projects projects={projects} />

        <Link
          href='/projects'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span>All projects</span>
        </Link>
      </div>
    </section>
  )
}
