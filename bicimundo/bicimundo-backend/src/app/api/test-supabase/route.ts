import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabase.from('productos').select('*').limit(1);

  if (error) {
    return NextResponse.json({ conectado: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ conectado: true, ejemplo: data });
}
