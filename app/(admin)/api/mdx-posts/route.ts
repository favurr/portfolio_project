import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server' // Adjust if yours is in a different path

export async function POST(req: Request) {
  const body = await req.json()

  const { slug, content, metadata } = body

  // Validate required metadata fields
  if (!slug || !content || !metadata?.title || !metadata?.author || !metadata?.summary || !metadata?.image) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Import your Supabase URL and service key from environment variables or a config file
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  
  // Check if a post with the same slug already exists
  const { data: existingPost, error: existingError } = await supabase
    .from('posts')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existingPost) {
    return NextResponse.json({ error: 'Post with this title already exists' }, { status: 409 })
  }

  const { error } = await supabase.from('posts').insert([
    {
      slug,
      content,
      metadata,
    },
  ])

  if (error) {
    console.error('Error inserting post:', error)
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 })
  }

  return NextResponse.json({ message: 'Post created' }, { status: 201 })
}
