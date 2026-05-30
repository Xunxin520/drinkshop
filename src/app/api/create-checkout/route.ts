import { NextRequest, NextResponse } from 'next/server';
import { CartItem } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { items } = (await request.json()) as { items: CartItem[] };

    // In production, create a Stripe Checkout Session here:
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create({
    //   mode: 'payment',
    //   line_items: items.map((item) => ({
    //     price_data: {
    //       currency: 'cny',
    //       product_data: { name: item.product.name },
    //       unit_amount: item.product.price * 100,
    //     },
    //     quantity: item.quantity,
    //   })),
    //   success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${request.nextUrl.origin}/checkout`,
    // });
    // return NextResponse.json({ url: session.url! });

    // Demo mode: simulate a checkout URL
    console.log('Order received:', JSON.stringify(items, null, 2));

    const total = items.reduce((sum: number, i: CartItem) => sum + i.product.price * i.quantity, 0);

    return NextResponse.json({
      url: `/success?demo=true&total=${total}&items=${items.length}`,
    });
  } catch {
    return NextResponse.json(
      { error: '创建支付会话失败' },
      { status: 500 }
    );
  }
}
