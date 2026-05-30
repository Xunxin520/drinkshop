import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabase } from '@/lib/supabase';
import { CartItem } from '@/lib/types';

interface ShippingInfo {
  name: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  note: string;
}

export async function POST(request: NextRequest) {
  try {
    const { items, shipping } = (await request.json()) as { items: CartItem[]; shipping: ShippingInfo };

    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

    // Store order in Supabase with shipping info
    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        customer_email: shipping.phone + '@order.local', // Use phone as identifier
        items: {
          products: items.map((i) => ({
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          shipping,
        },
        total,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase order error:', error);
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: '标准配送',
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'cny' },
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
      ],
      metadata: {
        supabase_order_id: order?.id || '',
        shipping_name: shipping.name,
        shipping_phone: shipping.phone,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_zip: shipping.zip,
        shipping_note: shipping.note,
      },
      line_items: items.map((item) => ({
        price_data: {
          currency: 'cny',
          product_data: {
            name: item.product.name,
            description: item.product.size,
          },
          unit_amount: item.product.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/checkout`,
    });

    // Update order with Stripe session ID
    if (order?.id) {
      await supabase
        .from('orders')
        .update({ stripe_session_id: session.id, customer_email: shipping.phone + '@order.local' })
        .eq('id', order.id);
    }

    return NextResponse.json({ url: session.url! });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: '创建支付会话失败' },
      { status: 500 }
    );
  }
}
