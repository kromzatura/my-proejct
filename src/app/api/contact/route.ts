import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, company, message } = body;
    
    if (!firstName || !lastName || !email || !company || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the contact request (in production, you'd save to database or send email)
    console.log('Contact form submission:', {
      name: `${firstName} ${lastName}`,
      email,
      company,
      phone: body.phone,
      subject: body.subject,
      message,
      interests: body.interests,
      timestamp: new Date().toISOString(),
    });

    // Here you could:
    // 1. Save to your database
    // 2. Send email notification
    // 3. Integrate with CRM
    // 4. Send to another service

    return NextResponse.json(
      { success: true, message: 'Contact form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
