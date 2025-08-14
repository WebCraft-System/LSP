import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, language, level, message } = body

    // Server-side validation
    if (!name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name is required' }, 
        { status: 400 }
      )
    }

    if (!email?.trim() || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' }, 
        { status: 400 }
      )
    }

    if (!message?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Message is required' }, 
        { status: 400 }
      )
    }

    // Here you would typically send an email or save to database
    // For now, we'll just log the contact form submission
    console.log('Contact form submission:', {
      name,
      email,
      phone,
      language,
      level,
      message,
      timestamp: new Date().toISOString()
    })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.',
      data: { name, email }
    })
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again.' }, 
      { status: 500 }
    )
  }
}