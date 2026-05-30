import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { CartItem } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { items } = (await request.json()) as { items: CartItem[] };

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map((item) => ({
        price_data: {
          currency: 'cny',
          product_data: {
            name: item.product.name,
            description: item.product.size,
            images: [], // Add product image URL if available
          },
          unit_amount: item.product.price * 100, // Stripe uses cents
        },
        quantity: item.quantity,
      })),
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout`,
    });

    return NextResponse.json({ url: session.url! });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: '创建支付会话失败' },
      { status: 500 }
    );
  }
}
