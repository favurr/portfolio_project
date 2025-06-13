// lib/posts.ts
import { supabaseAdmin } from '@/lib/supabase';

export type Post = {
  id: string;
  title: string;
  author: string;
  summary: string;
  image: string;
  slug: string;
  content: string;
  created_at: string;
};


export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error.message); // ✅ Debug log
    return [];
  }

  console.log('Fetched posts:', data); // ✅ See what's loading
  return data as Post[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    console.error('Error fetching post:', error?.message || 'No data');
    return null;
  }

  return data as Post;
}

