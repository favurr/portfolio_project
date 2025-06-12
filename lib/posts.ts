// lib/posts.ts
import { supabaseAdmin } from '@/lib/supabase'

export type Post = {
  id: string
  title: string
  summary: string
  image: string
  author: string
  content: string
  created_at: string
  slug: string
}

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as Post[]
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const decodedSlug = slug.replace(/-/g, ' ').toLowerCase()
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .limit(1)
    .single()

  if (error || !data) return null
  return data as Post
}
