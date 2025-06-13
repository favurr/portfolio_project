import { LogoutButton } from '@/components/logoutButton'
import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='mb-4 font-serif text-3xl font-bold'>
          Welcome back, Admin 👋
        </h1>
        <p>This is your dashboard. Use the sidebar or nav to manage content.</p>
        <p className='mt-2 text-muted-foreground'>
          You can view messages, manage posts, and more.
          <Link
            href='/admin/messages'
            className='text-muted-foreground hover:text-foreground'
          >
            View Messages
          </Link>
        </p>
        <p className='mt-4 text-muted-foreground'>
          If you need help, check the documentation or contact support.
        </p>
        <p className='mt-4 text-muted-foreground'>
          Remember to log out when you're done.
        </p>
        <p className='mt-4 text-muted-foreground'>
          <strong>Note:</strong> This dashboard is for admin use only.
        </p>
        <p className='mt-4 text-muted-foreground'>
          If you see this page, you are logged in as an admin. If you think this
          is a mistake, please contact support.
        </p>
        <LogoutButton />
        <div className='mt-8'>
          <p className='text-muted-foreground'>
            This is a protected area. Only admins can access this dashboard.
          </p>
        </div>
      </div>
    </section>
  )
}
