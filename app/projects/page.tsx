import Projects from '@/components/projects'
import { getProjects } from '@/lib/projects'

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='title mb-12 max-w-[400px] '>
          Projects I worked on, putting my skills to work
          <span className='ml-[1px] text-red-700'>.</span>
        </h1>
        <p className='mb-12 text-[14px] max-w-[500px] font-extralight text-muted-foreground'>
          I've worked on a variety of projects over the years and I'm proud of
          the progress I've made. Many of these projects are open-source and
          available for others to explore and contribute to. If you're
          interested in any of the projects I've worked on, please feel free to
          check out the code and suggest any improvements or enhancements you
          might have in mind. Collaborating with others is a great way to learn
          and grow, and I'm always open to new ideas and feedback.
        </p>

        <Projects projects={projects} />
      </div>
    </section>
  )
}
