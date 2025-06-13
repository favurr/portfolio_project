import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from '@/lib/supabase'

const getEnv = (key: string): string => {
  const val = process.env[key]
  if (!val) throw new Error(`Missing env: ${key}`)
  return val
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()
    const JWT_SECRET = getEnv('JWT_SECRET')

    const { data: user, error } = await supabaseAdmin
      .from('admin_users')
      .select('*')
      .eq('email', email)
      .single()

    console.log('Supabase user fetch:', { user, error })

    if (!user || error) return invalid()

    const isMatch = await bcrypt.compare(password, user.password_hash)
    if (!isMatch) return invalid()

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' })

    const res = NextResponse.json({ success: true })
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60,
      sameSite: 'lax',
      path: '/'
    })

    return res
  } catch (err) {
    console.error('Login error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

const invalid = () =>
  NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
