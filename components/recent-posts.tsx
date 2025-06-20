import Link from 'next/link'
import { getPosts } from '@/lib/posts'
import Posts from '@/components/posts'
import { SquarePen } from 'lucide-react'

export default async function RecentPosts() {
  const allPosts = await getPosts()
  const posts = allPosts.slice(0, 4)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>
          {' '}
          <SquarePen className='inline-block size-6 text-red-700' />
          <span className='ml-4' />
          Recent posts
        </h2>
        <Posts posts={posts} />

        <Link
          href='/posts'
          className='mt-8 inline-flex items-center gap-2 text-muted-foreground underline decoration-1 underline-offset-2 transition-colors hover:text-foreground'
        >
          <span>All posts</span>
        </Link>
      </div>
    </section>
  )
}
