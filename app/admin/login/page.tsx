'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required')
})

type FormValues = z.infer<typeof formSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: FormValues) => {
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include' // ← this is the fix
    })

    if (res.ok) {
  window.location.href = '/admin/dashboard';
}

  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-background'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader>
          <CardTitle className='text-center font-serif text-xl'>
            Admin Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <Label>Email</Label>
              <Input type='email' {...register('email')} />
              {errors.email && (
                <p className='mt-1 text-sm text-destructive'>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label>Password</Label>
              <Input type='password' {...register('password')} />
              {errors.password && (
                <p className='mt-1 text-sm text-destructive'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && <p className='text-sm text-destructive'>{error}</p>}

            <Button type='submit' className='w-full' disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}
