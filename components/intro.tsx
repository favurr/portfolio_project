import Image from 'next/image'
import authorImage from '@/public/images/authors/favurr.jpg'

export default function Intro() {
  return (
    <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-24 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='title no-underline'>Hey, I&#39;m Favurr.</h1>
        <p className='text-muted-foreground mt-3 font-light'>
          I&#39;m a full-stack web developer with 5+ years of experience crafting
          responsive, user-friendly websites and web apps. <br /> 🛠️ I
          specialize in JavaScript, React, Node.js, and love turning static
          designs into functional, scalable solutions using modern frameworks
          like Vite and Next.js. <br /> 💼 I build for real people and brands —
          from portfolios to <br />e-commerce, fashion, beauty, and charity projects.{' '}
          <br /> 🚀 Always learning, always building. Let&#39;s connect and
          collaborate!
        </p>
      </div>
      <div className='relative'>
        <Image
          className='flex-1 rounded-lg grayscale'
          src={authorImage}
          alt='Hamed Bahram'
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}
