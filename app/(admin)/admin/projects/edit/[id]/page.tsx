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

import { supabase } from '@/lib/supabase'
import MDXContent from '@/components/mdx-content'

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  summary: z.string().min(1),
  image: z.string().url(),
  content: z.string().min(1)
})

type FormValues = z.infer<typeof formSchema>
type Author = { id: string; name: string }

export default function EditProjectPage({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [authors, setAuthors] = useState<Author[]>([])
  const [livePreview, setLivePreview] = useState('')
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  })

  const content = watch('content')

  useEffect(() => {
    const fetchProjectAndAuthors = async () => {
      try {
        const [projectRes, authorsRes] = await Promise.all([
          supabase.from('projects').select('*').eq('id', params.id).single(),
          supabase.from('authors').select('*')
        ])

        if (projectRes.error) throw new Error(projectRes.error.message)
        if (authorsRes.error) throw new Error(authorsRes.error.message)

        const project = projectRes.data
        setAuthors(authorsRes.data)

        reset({
          title: project.title,
          author: project.author,
          summary: project.summary,
          image: project.image,
          content: project.content
        })
        setLivePreview(project.content)
      } catch (err: any) {
        toast.error(err.message || 'Failed to load data')
        router.push('/admin/projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjectAndAuthors()
  }, [params.id, reset, router])

  const onSubmit = async (data: FormValues) => {
    const slug = data.title.toLowerCase().trim().replace(/\s+/g, '-')

    const { error } = await supabase
      .from('projects')
      .update({
        title: data.title,
        slug,
        author: data.author,
        summary: data.summary,
        image: data.image,
        content: data.content
      })
      .eq('id', params.id)

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Project updated!')
      router.push('/admin/projects')
    }
  }

  if (loading)
    return <p className='text-sm text-muted-foreground'>Loading...</p>

  return (
    <section className='pb-24 pt-40'>
      <div className='container grid grid-cols-1 gap-8 lg:grid-cols-2'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <h1 className='text-xl font-bold'>Edit Project</h1>

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
              defaultValue={watch('author')}
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
            <Textarea rows={3} {...register('summary')} />
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
            <Textarea
              rows={10}
              {...register('content')}
              onChange={e => {
                setLivePreview(e.target.value)
              }}
            />
            {errors.content && (
              <p className='text-sm text-destructive'>
                {errors.content.message}
              </p>
            )}
          </div>

          <Button type='submit' disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Update Project'}
          </Button>
        </form>

        <div className='prose mt-12 hidden max-w-none dark:prose-invert lg:block'>
          <h2 className='mb-4 text-xl font-semibold'>Live Preview</h2>
          <MDXContent source={livePreview} />
        </div>
      </div>
    </section>
  )
}
