import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { title, author, summary, image, content } = await req.json()
  const slug = title.toLowerCase().replace(/\s+/g, '-')

  if (!title || !author || !summary || !image || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // 🔍 Check for existing slug
  const { data: existing } = await supabaseAdmin
    .from('posts')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existing) {
    return NextResponse.json(
      { error: 'A post with this title already exists' },
      { status: 409 }
    )
  }

  const { error } = await supabaseAdmin.from('posts').insert([
    {
      title,
      slug,
      author,
      summary,
      image,
      content
    }
  ])

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data })
}
