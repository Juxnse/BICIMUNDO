import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

// Habilita CORS para todas las rutas
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  const { data, error } = await supabase.from('productos').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
  return NextResponse.json(data, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { nombre, precio, descripcion, imagen, stock } = body;

  const { data, error } = await supabase.from('productos').insert([
    { nombre, precio, descripcion, imagen, stock },
  ]);

  console.log('🔴 Error Supabase:', error);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }

  return NextResponse.json(data, { status: 201, headers: corsHeaders });
}