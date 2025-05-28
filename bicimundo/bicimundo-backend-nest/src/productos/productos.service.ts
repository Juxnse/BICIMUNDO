import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ProductosService {
  constructor(private readonly supabase: SupabaseService) {}

  async getAll() {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('productos').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async create(producto: any) {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('productos').insert([producto]);
    if (error) throw new Error(error.message);
    return data;
  }

  async delete(id: string) {
  const client = this.supabase.getClient();

  // 1. Eliminar registros del carrito relacionados al producto
  const { error: errorCarrito } = await client
    .from('carrito_items')
    .delete()
    .eq('producto_id', id);

  if (errorCarrito) {
    console.error('❌ Error al eliminar del carrito:', errorCarrito);
    throw new Error('Error al eliminar del carrito: ' + errorCarrito.message);
  }

  const { error } = await client
    .from('productos')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('❌ Error al eliminar producto:', error);
    throw new Error(error.message);
  }

  console.log(`✅ Producto con ID ${id} eliminado correctamente.`);
  return { message: 'Producto eliminado correctamente' };
}


async update(id: string, body: Partial<any>) {
  const client = this.supabase.getClient();

  const { id: _id, created_at, ...actualizado } = body;

  console.log('🟡 Actualizando producto ID', id);
  console.log('🟡 Datos enviados a Supabase:', actualizado);

const { data, error } = await client
  .from('productos')
  .update(actualizado)
  .eq('id', parseInt(id))
  .select();


  if (error) {
    console.error('❌ Error al actualizar en Supabase:', error);
    throw new Error(error.message);
  }

  console.log('✅ Respuesta de Supabase:', data);
  return { message: 'Producto actualizado correctamente' };
}

}
