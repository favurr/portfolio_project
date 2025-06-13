import { getProjects } from '@/lib/projects'
import ProjectsWithSearch from '@/components/projects-with-search'

// Force fresh fetch (SSR)
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12 max-w-[400px]'>
          Some things I’ve worked on recently
          <span className='ml-[1px] text-red-700'>.</span>
        </h1>
        <p className='mb-12 max-w-[500px] text-[14px] font-extralight text-muted-foreground'>
          A collection of projects showing my work in development, design, and
          innovation.
        </p>

        <ProjectsWithSearch projects={projects} isAdmin={false} />
      </div>
    </section>
  )
}
