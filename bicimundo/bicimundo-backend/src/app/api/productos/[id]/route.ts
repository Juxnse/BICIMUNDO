import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = await context.params;

  const { error } = await supabase
    .from('productos')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }

  return NextResponse.json(
    { mensaje: 'Producto eliminado' },
    { status: 200, headers: corsHeaders }
  );
}
