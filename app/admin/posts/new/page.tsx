'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'

const postSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  summary: z.string().min(1),
  image: z.string().url(),
  content: z.string().min(1)
})

type PostForm = z.infer<typeof postSchema>
type Author = { id: string; name: string }

export default function NewPostPage() {
  const router = useRouter()
  const [authors, setAuthors] = useState<Author[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<PostForm>({
    resolver: zodResolver(postSchema)
  })

  // Fetch authors from DB
  useEffect(() => {
    const fetchAuthors = async () => {
      const res = await fetch('/api/authors')
      const json = await res.json()
      if (res.ok) setAuthors(json.data)
    }
    fetchAuthors()
  }, [])

  const onSubmit = async (data: PostForm) => {
    const slug = data.title.toLowerCase().trim().replace(/\s+/g, '-') // ✅ create slug
    const res = await fetch('/api/mdx-posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, slug }) // ✅ attach slug
    })

    if (res.status === 409) {
      toast.error('A post with that title already exists.')
      return
    }

    if (res.ok) {
      toast.success('Post created successfully!')
      reset()
      router.push('/admin/posts')
    } else {
      const json = await res.json()
      toast.error(json.error || 'Something went wrong')
    }
  }

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-2xl'>
        <h1 className='mb-6 text-xl font-bold'>Create New Post</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label>Title</Label>
            <Input {...register('title')} />
            {errors.title && (
              <p className='text-sm text-destructive'>{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label>Author</Label>
            <Select
              onValueChange={value => setValue('author', value)}
              defaultValue=''
            >
              <SelectTrigger>
                <SelectValue placeholder='Select author' />
              </SelectTrigger>
              <SelectContent>
                {authors.map(author => (
                  <SelectItem key={author.id} value={author.name}>
                    {author.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.author && (
              <p className='text-sm text-destructive'>
                {errors.author.message}
              </p>
            )}
          </div>

          <div>
            <Label>Summary</Label>
            <Textarea {...register('summary')} rows={3} />
            {errors.summary && (
              <p className='text-sm text-destructive'>
                {errors.summary.message}
              </p>
            )}
          </div>

          <div>
            <Label>Image/Video URL</Label>
            <Input {...register('image')} />
            {errors.image && (
              <p className='text-sm text-destructive'>{errors.image.message}</p>
            )}
          </div>

          <div>
            <Label>MDX Content</Label>
            <Textarea rows={10} {...register('content')} />
            {errors.content && (
              <p className='text-sm text-destructive'>
                {errors.content.message}
              </p>
            )}
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Post'}
          </Button>
        </form>
      </div>
    </section>
  )
}
