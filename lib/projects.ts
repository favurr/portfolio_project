// lib/projects.ts
import { supabaseAdmin } from '@/lib/supabase';

export type Project = {
  id: string;
  title: string;
  summary: string;
  image: string;
  author: string;
  content: string;
  created_at: string;
  slug: string;
};

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching projects:', error.message); // ✅ Add for debugging
    return [];
  }

  console.log('Fetched projects:', data); // ✅ Helpful log
  return data as Project[];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const { data, error } = await supabaseAdmin
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    console.error('Error fetching project by slug:', error?.message || 'No data');
    return null;
  }

  return data as Project;
}
