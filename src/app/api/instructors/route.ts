import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const { data: instructors, error } = await supabase
      .from('instructors')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error

    return NextResponse.json(instructors || [])
  } catch (error) {
    console.error('Error fetching instructors:', error)
    return NextResponse.json({ error: 'Failed to fetch instructors' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const body = await request.json()
    
    const { data: instructor, error } = await supabase
      .from('instructors')
      .insert([body])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(instructor)
  } catch (error) {
    console.error('Error creating instructor:', error)
    return NextResponse.json({ error: 'Failed to create instructor' }, { status: 500 })
  }
}