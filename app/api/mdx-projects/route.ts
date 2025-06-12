import { supabaseAdmin } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { title, author, summary, image, content } = await req.json()
  const slug = title.toLowerCase().trim().replace(/\s+/g, '-')

  if (!title || !author || !summary || !image || !content) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Check if a project with the same slug already exists
  const { data: existing } = await supabaseAdmin
    .from('projects')
    .select('id')
    .eq('slug', slug)
    .maybeSingle()

  if (existing) {
    return NextResponse.json(
      { error: 'A project with this title already exists' },
      { status: 409 }
    )
  }

  const { error } = await supabaseAdmin.from('projects').insert([
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
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ data })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing project ID' }, { status: 400 });
  }

  const { error } = await supabaseAdmin.from('projects').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
