'use client'

import { useEffect, useState } from 'react'
import type { Project } from '@/lib/projects'
import ProjectsWithSearch from '@/components/projects-with-search'
import { toast } from 'sonner'

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/mdx-projects')
        const json = await res.json()
        if (res.ok) {
          setProjects(json.data)
        } else {
          toast.error(json.error || 'Failed to load projects')
        }
      } catch {
        toast.error('Could not fetch projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        {loading ? (
          <p className='text-sm text-muted-foreground'>Loading projects...</p>
        ) : (
          <ProjectsWithSearch projects={projects} isAdmin />
        )}
      </div>
    </section>
  )
}
