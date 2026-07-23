import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const shopId = process.env.ETSY_SHOP_ID;
    const apiKey = process.env.ETSY_API_KEY;

    if (!shopId || !apiKey) {
      console.error('Missing Etsy API credentials in .env.local');
      return NextResponse.json(
        { error: 'Missing Etsy API credentials' },
        { status: 500 }
      );
    }

    // Fetch shop listings using API key in header
    const response = await fetch(
      `https://openapi.etsy.com/v3/application/shops/${shopId}/listings/active`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': apiKey // Use x-api-key header for authentication
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Etsy API Error (${response.status}): ${errorText}`);
      return NextResponse.json(
        { error: `Etsy API responded with status: ${response.status}. Check server logs for details.` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/etsy route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Etsy products. Check server logs.' },
      { status: 500 }
    );
  }
}
