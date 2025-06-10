'use client'

import ASocials from '@/components/asocials'
import { useEffect, useRef } from 'react'

export default function About() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.3 // Adjust speed here (0.5 = half speed)
    }
  }, [])

  return (
    <section className='container max-w-3xl pb-24 pt-40'>
      <div className='flex flex-col-reverse items-start gap-x-10 gap-y-4 md:flex-row md:items-center'>
        <div className='mt-2 flex-1 md:mt-0'>
          <h1 className='title mb-12 max-w-[400px]'>
            I’m Emeka Favour, a Nigerian builder and thinker, designing tomorrow
            today
            <span className='ml-[1px] text-red-700'>.</span>
          </h1>
          <div className='mb-12 max-w-[500px] text-[14px] font-extralight text-muted-foreground'>
            <p className='mb-2'>
              I’ve worked on a wide range of projects over the years, from
              passion-driven experiments to polished production apps, and I’m
              proud of how far I’ve come. Many of these projects are open source
              because I believe in building in public, learning out loud, and
              giving back to the community that helped shape me.
            </p>
            <p className='mb-2'>
              You’ll find everything from tools and utilities to creative
              interfaces and full-stack products. If anything catches your eye,
              feel free to explore the code, suggest improvements, or
              contribute. Collaboration excites me, and I’m always open to fresh
              ideas, pair programming, or just nerding out over cool solutions.
            </p>
            <p className='mb-2'>
              Outside of shipping code, I care about thoughtful design,
              performance, accessibility, and user experience. I enjoy the
              process of turning complex problems into simple, intuitive
              solutions. I also love mentoring, helping newer developers find
              their footing, and being part of communities that challenge me to
              grow.
            </p>
            <p className='mb-2'>
              Whether I’m working solo, collaborating with others, or just
              tinkering for fun, one thing stays the same: I’m always learning
              and always building.
            </p>
          </div>
        </div>
        <div className='relative'>
          <video
            src='/videos/about.mp4'
            className='mb-8 h-[230px] w-[230px] flex-1 rounded-3xl object-cover'
            ref={videoRef}
            width={230}
            height={230}
            autoPlay
            loop
            muted
          />

          <ASocials />
        </div>
      </div>
    </section>
  )
}
