'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { useAuth } from '@/contexts/AuthProvider'

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router, mounted])

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return <AdminDashboard />
}