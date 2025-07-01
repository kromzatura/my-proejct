import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { companyName, contactName, email, productName, quantity } = body;
    
    if (!companyName || !contactName || !email || !productName || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Log the quote request (in production, you'd save to database or send email)
    console.log('Quote request submission:', {
      companyName,
      contactName,
      email,
      phone: body.phone,
      productName,
      quantity,
      usage: body.usage,
      specifications: body.specifications,
      deliveryLocation: body.deliveryLocation,
      preferredDelivery: body.preferredDelivery,
      additionalInfo: body.additionalInfo,
      locale: body.locale,
      timestamp: new Date().toISOString(),
    });

    // Here you could:
    // 1. Save to your database
    // 2. Send email notification to sales team
    // 3. Integrate with CRM
    // 4. Generate quote number
    // 5. Send confirmation email to customer

    return NextResponse.json(
      { 
        success: true, 
        message: 'Quote request submitted successfully',
        quoteNumber: `QR-${Date.now()}` // Simple quote reference
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing quote request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
