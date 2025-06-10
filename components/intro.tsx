import Image from 'next/image'
import authorImage from '@/public/images/authors/favurr.jpg'
import Socials from './socials'

export default function Intro() {
  return (
    <>
      <section className='flex flex-col-reverse items-start gap-x-10 gap-y-4 pb-4 md:flex-row md:items-center'>
        <div className='mt-2 flex-1 md:mt-0'>
          <h1 className='title text-4xl no-underline'>
            Full-stack web developer by day, <br /> CSS wizard by night
            <span className='ml-1 text-red-700'>.</span>
          </h1>
          <p className='mt-3 text-[12px] font-extralight text-muted-foreground'>
            I am a full-stack web developer with expertise in React and Node.js.
            Proficient in modern frameworks like Vite and Next.js, I enjoy
            transforming static designs into scalable, secure, and reliable
            digital solutions. I&#39;ve worked across various industries -
            including fashion, e-commerce, and nonprofit sectors, delivering
            clean, efficient, and maintainable code. I'm passionate about
            writing high-quality code that follows best practices and delivers
            real value to users. Always exploring new technologies, I'm
            constantly seeking opportunities to grow and collaborate.
          </p>
        </div>
        <div className='relative'>
          <Image
            className='flex-1 rounded-3xl grayscale'
            src={authorImage}
            alt='Favurr'
            width={230}
            height={230}
            priority
          />
        </div>
      </section>
      <Socials />
    </>
  )
}
