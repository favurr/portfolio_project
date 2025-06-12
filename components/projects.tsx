'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { SquarePen, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import type { Project } from '@/lib/projects';

export default function Projects({ projects }: { projects: Project[] }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin/projects');

  const [items, setItems] = useState(projects); // ✅ local state

  async function handleDelete(id: string) {
    const ok = confirm('Are you sure you want to delete this project?');
    if (!ok) return;

    const res = await fetch(`/api/mdx-projects?id=${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Project deleted');
      setItems((prev) => prev.filter((project) => project.id !== id)); // ✅ no reload
    } else {
      toast.error('Failed to delete project');
    }
  }

  return (
    <ul className="flex flex-col gap-8">
      {items.map((project) => (
        <li key={project.id}>
          <div className="flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row">
            <Link href={`/projects/${project.slug}`} className="max-w-lg">
              <p className="text-lg font-semibold">{project.title}</p>
              <p className="mt-1 line-clamp-2 text-sm font-light text-muted-foreground">
                {project.summary}
              </p>
            </Link>

            <div className="flex flex-col items-end">
              <p className="mt-1 text-sm font-light">
                {new Date(project.created_at).toLocaleDateString()}
              </p>

              {isAdminPage && (
                <div className="mt-2 flex gap-3">
                  <Link href={`/admin/projects/edit/${project.id}`}>
                    <SquarePen size={20} className="text-muted-foreground hover:text-foreground" />
                  </Link>
                  <button onClick={() => handleDelete(project.id)}>
                    <Trash2 size={20} className="text-red-600 hover:text-red-700" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
