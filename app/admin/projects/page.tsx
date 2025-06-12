import { getProjects } from '@/lib/projects';
import ProjectsWithSearch from '@/components/projects-with-search';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="pb-24 pt-40">
      <div className="container max-w-3xl">
        <ProjectsWithSearch projects={projects} />
      </div>
    </section>
  );
}
