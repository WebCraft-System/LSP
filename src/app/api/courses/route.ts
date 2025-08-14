import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    // Add error handling for database connection
    const { data: testConnection } = await supabase.from('courses').select('count').limit(1)
    
    const { data: courses, error } = await supabase
      .from('courses')
      .select(`
        *,
        course_instructors (
          instructors (
            id,
            name,
            photo_url
          )
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      throw new Error(`Database query failed: ${error.message}`)
    }

    const coursesWithInstructors = courses?.map(course => ({
      ...course,
      instructors: course.course_instructors?.map((ci: any) => ci.instructors) || []
    })) || []

    return NextResponse.json(coursesWithInstructors)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch courses',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title_en || !body.language || !body.level) {
      return NextResponse.json(
        { error: 'Missing required fields: title_en, language, level' },
        { status: 400 }
      )
    }
    
    const { data: course, error } = await supabase
      .from('courses')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      throw new Error(`Failed to create course: ${error.message}`)
    }

    return NextResponse.json(course)
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json({ 
      error: 'Failed to create course',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}