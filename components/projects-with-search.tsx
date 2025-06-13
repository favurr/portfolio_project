'use client'

import { useState } from 'react'
import type { Project } from '@/lib/projects'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import Projects from './projects'

type Props = {
  projects: Project[]
  isAdmin?: boolean
}

export default function ProjectsWithSearch({
  projects,
  isAdmin = false
}: Props) {
  const [query, setQuery] = useState('')
  const filtered = projects.filter(project =>
    project.title.toLowerCase().includes(query.toLowerCase())
  )

  const isFiltered = query.length > 0

  return (
    <div>
      <div className='mb-12 flex items-center gap-3'>
        <Input
          type='text'
          placeholder='Search projects...'
          className='h-9 w-full sm:w-1/2'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {isFiltered && (
          <Button
            size='sm'
            variant='secondary'
            onClick={() => setQuery('')}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>

      <Projects projects={filtered} isAdmin={isAdmin} />
    </div>
  )
}
