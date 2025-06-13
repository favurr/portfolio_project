import PrivacyPolicy from '@/components/privacy'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'

export default function Privacy() {
  return (
    <section className='pb-24 pt-32'>
      <div className='container max-w-3xl'>
        <Link
          href='/'
          className='mb- inline-flex items-center gap-2 text-sm font-light text-muted-foreground transition-colors hover:text-foreground'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back home</span>
        </Link>
      <div className='prose dark:prose-invert'>
        <PrivacyPolicy />
      </div>
      </div>
    </section>
  )
}
