import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { error } = await supabase
      .from('questionnaires')
      .insert({
        client_name: body.clientName || '',
        wechat: body.wechat || '',
        email: body.email || null,
        industry: body.industry || '',
        industry_other: body.industryOther || null,
        product_count: body.productCount || null,
        styles: body.styles || [],
        colors: body.colors || [],
        reference_urls: body.referenceUrls || null,
        assets: body.assets || null,
        features: body.features || [],
        need_lang: body.needLang || 'no',
        payments: body.payments || [],
        market: body.market || 'china',
        budget: body.budget || null,
        timeline: body.timeline || null,
        notes: body.notes || null,
      });

    if (error) {
      console.error('Questionnaire insert error:', error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Questionnaire API error:', error);
    return NextResponse.json({ success: false, error: '提交失败，请稍后再试' }, { status: 500 });
  }
}
