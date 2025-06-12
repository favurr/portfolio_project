import { notFound } from 'next/navigation'
import { getProjectBySlug } from '@/lib/projects'
import MDXContent from '@/components/mdx-content'
import { formatDate } from '@/lib/utils'
import NewsletterForm from '@/components/newsletter-form'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProjectPage({
  params
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const project = await getProjectBySlug(slug)

  if (!project) notFound()

  const { title, author, image, content, created_at } = project

  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/projects'
          className='mb-8 inline-block text-sm font-light text-muted-foreground underline-offset-4 hover:underline'
        >
          ← Back to projects
        </Link>

        {image && (
          <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
            {image.match(/\.(mp4|webm|ogg)$/i) ? (
              <video
                src={image}
                controls
                className='h-full w-full object-cover'
              />
            ) : (
              <Image src={image} alt={title} fill className='object-cover' />
            )}
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <p className='mt-3 text-xs text-muted-foreground'>
            {author} / {formatDate(created_at)}
          </p>
        </header>

        <main className='prose mt-16 dark:prose-invert'>
          <MDXContent source={content} />
        </main>

        <footer className='mt-16'>
          <NewsletterForm />
        </footer>
      </div>
    </section>
  )
}
