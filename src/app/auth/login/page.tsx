'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AuthModal } from '@/components/auth/AuthModal'
import { useAuth } from '@/contexts/AuthProvider'

export default function LoginPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && user) {
      router.push('/admin')
    }
  }, [user, router, mounted])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        <AuthModal
          isOpen={true}
          onClose={() => router.push('/')}
          initialMode="login"
        />
      </div>
    </div>
  )
}