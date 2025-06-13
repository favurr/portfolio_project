'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeftIcon } from '@radix-ui/react-icons'

export default function NotFound() {
  const router = useRouter()

  return (
    <section className='pb-24 pt-40'>
      <div className='min-h-full px-4 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8'>
        <div className='mx-auto max-w-max'>
          <main className='sm:flex'>
            <p className='text-4xl font-bold tracking-tight text-muted-foreground sm:text-5xl'>
              404
            </p>
            <div className='sm:ml-6'>
              <div className='sm:border-l sm:border-gray-200 sm:pl-6'>
                <h1 className='text-3xl font-bold tracking-tight sm:text-5xl'>
                  Wrong page<span className=' text-red-700 ml-2  '>?</span>
                </h1>
                <p className='mt-1 text-base text-muted-foreground'>
                  Let's help you find your way back.
                </p>
              </div>
              <div className='mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
                <span
                  onClick={() => router.back()}
                  className='inline-flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground cursor-pointer'
                >
                  <ArrowLeftIcon className='h-5 w-5' />
                  Click Here
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  )
}
