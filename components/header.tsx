'use client'

import Link from 'next/link'
import { ThemeToggle } from './theme-toggle'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Header() {
  const logoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 })

    // Reveal logo from top to bottom
    tl.fromTo(
      logoRef.current,
      {
        clipPath: 'inset(0% 0% 100% 0%)',
        opacity: 0
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      }
    )

    // Nav items start while logo is still animating
    tl.to(
      '.nav li',
      {
        opacity: 1,
        duration: 0.8,
        stagger: 0.2
      },
      '<0.5' // Start 0.5s after logo animation begins (overlap)
    )

    // Toggle starts while nav items are still animating
    tl.to(
      '.toggle',
      {
        opacity: 1,
        duration: 0.8
      },
      '<0.3' // Start 0.3s after nav starts (more overlap)
    )
  }, [])

  return (
    <header className='fixed inset-x-0 top-0 z-50 bg-background/75 py-6 backdrop-blur-sm'>
      <nav className='container flex max-w-3xl items-center justify-between'>
        <div>
          <Link
            href='/'
            id='logo'
            ref={logoRef}
            className='font-serif text-2xl font-bold'
          >
            Favurr
            <span className='ml-[1px] text-red-700'>.</span>
          </Link>
        </div>

        <ul className='nav flex items-center gap-6 text-sm font-light text-muted-foreground sm:gap-10'>
          <li className='opacity-0 transition-colors hover:text-foreground'>
            <Link href='/about'>About</Link>
          </li>
          <li className='opacity-0 transition-colors hover:text-foreground'>
            <Link href='/projects'>Projects</Link>
          </li>
          <li className='opacity-0 transition-colors hover:text-foreground'>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>

        <div className='toggle opacity-0'>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
