import ContactForm from '@/components/contact-form'
import CSocials from '@/components/csocials'

export default function Contact() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h2 className='title mb-12 max-w-[400px]'>
          Let's Get in Touch<span className='ml-[1px] text-red-700'>:</span>
          <br /> Ways to Connect with Me
        </h2>

        <div className='mb-12 text-[14px] font-extralight text-muted-foreground'>
          <p className='mb-2 font-bold'>
            Thanks for stopping by I appreciate you wanting to reach out.
          </p>
          <p className='mb-2'>
            Whether it's feedback, questions, ideas, or just a quick hello, I'm
            always open to hearing from you. You can email me directly at
            emekafavi2019@gmail.com. I make an effort to respond to all messages
            within 24 hours, although it may take me longer during busy periods.
          </p>
          <p className='mb-2'>
            Prefer something quicker? Feel free to use the contact form on my
            site I’ll get back to you as soon as I can. And if you’d rather
            connect on social, I’m active on Instagram: @say.hi.to.favurr. I
            share updates there and love hearing from people, so don’t be shy.
          </p>
          Looking forward to hearing from you!
        </div>

        <div className='flex max-w-3xl flex-row items-center justify-center gap-8 md:gap-4 lg:gap-2'>
          <CSocials />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
