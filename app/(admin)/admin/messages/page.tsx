'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Message {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch('/api/messages', { credentials: 'include' })
      const json = await res.json()
      if (res.ok) {
        setMessages(json.data)
      }
      setLoading(false)
    }
    fetchMessages()
  }, [])

  return (
    <section className='pb-24 pt-40'>
      <div className='container max-w-3xl'>
        <h1 className='mb-4 font-serif text-2xl font-bold'>Inbox</h1>

        {loading ? (
          <p className='text-muted-foreground'>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className='text-muted-foreground'>No messages yet.</p>
        ) : (
          <div className='space-y-4'>
            {messages.map(msg => (
              <Card key={msg.id}>
                <CardHeader>
                  <CardTitle className='text-base'>
                    {msg.name} —{' '}
                    <span className='text-sm text-muted-foreground'>
                      {msg.email}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='whitespace-pre-wrap text-sm'>{msg.message}</p>
                  <p className='mt-2 text-xs text-muted-foreground'>
                    {new Date(msg.created_at).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
