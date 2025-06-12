import { getProjects } from '@/lib/projects';
import ProjectsWithSearch from '@/components/projects-with-search';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="pb-24 pt-40">
      <div className="container max-w-3xl">
        <h1 className="title mb-12 max-w-[400px]">
          A showcase of what I’ve built, designed, or contributed to
          <span className="ml-[1px] text-red-700">.</span>
        </h1>

        <p className="mb-12 text-[14px] max-w-[500px] font-extralight text-muted-foreground">
          These are real-world apps, websites, experiments, and creative ideas brought to life.
        </p>

        <ProjectsWithSearch projects={projects} />
      </div>
    </section>
  );
}
