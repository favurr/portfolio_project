'use client';

import Link from 'next/link';
import { SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import type { Project } from '@/lib/projects';
import { DeletePostDialog } from './deletePostDialog';
import Image from 'next/image';

type Props = {
  projects: Project[];
  isAdmin?: boolean;
};

export default function Projects({ projects, isAdmin = false }: Props) {
  const [items, setItems] = useState(projects);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoadingId(id);
    const { error } = await supabase.from('projects').delete().eq('id', id);

    if (error) {
      toast.error('Failed to delete project');
    } else {
      toast.success('Project deleted successfully');
      setItems(prev => prev.filter(p => p.id !== id));
    }

    setLoadingId(null);
  };

  return (
    <ul className='grid grid-cols-2 gap-8 sm:grid-cols-2'>
      {projects.map(project => (
        
        <li key={project.slug} className='group relative'>
          <Link href={`/projects/${project.slug}`}>
            {project.image && (
              <div className='h-40 w-full overflow-hidden bg-muted sm:h-60'>
                <Image
                  src={project.image}
                  alt={project.title || ''}
                  fill
                  className='rounded-lg object-cover object-center transition-transform duration-500 group-hover:scale-105'
                />
              </div>
            )}

            <div className='absolute inset-[1px] rounded-lg bg-background/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

            <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100'>
              <h2 className='title line-clamp-1 text-xl no-underline'>
                {project.title}
              </h2>
              <p className='line-clamp-1 text-sm text-muted-foreground'>
                {project.summary}
              </p>
              <p className='text-xs font-light text-muted-foreground'>
                {new Date(project.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </p>
            </div>
          </Link>

          {isAdmin && (
            <div className="absolute right-3 top-3 flex gap-3">
              <Link href={`/admin/projects/edit/${project.id}`}>
                <SquarePen
                  size={18}
                  className="text-muted-foreground hover:text-foreground"
                />
              </Link>
              <DeletePostDialog
                onConfirm={() => handleDelete(project.id)}
                isLoading={loadingId === project.id}
              >
                <Trash2
                  size={18}
                  className="text-red-600 hover:text-red-700"
                />
              </DeletePostDialog>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
