import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CarritoItemsService {
  constructor(private readonly supabase: SupabaseService) {}

  async agregarItem(carrito_id: number, producto_id: number, cantidad: number) {
    const client = this.supabase.getClient();

    const { data: producto, error: errorProducto } = await client
      .from('productos')
      .select('precio')
      .eq('id', producto_id)
      .maybeSingle();

    if (errorProducto) throw new Error(errorProducto.message);
    if (!producto) throw new Error('Producto no encontrado');

    const precio_unitario = producto.precio;
    const subtotal = precio_unitario * cantidad;

    const { data, error } = await client
      .from('carrito_items')
      .insert({
        carrito_id,
        producto_id,
        cantidad,
        precio_unitario,
        subtotal,
      })
      .select()
      .maybeSingle();

    if (error) throw new Error(error.message);
    return data;
  }

  async obtenerItems(carrito_id: number) {
    const client = this.supabase.getClient();

    const { data, error } = await client
      .from('carrito_items')
      .select('*, productos(*)')
      .eq('carrito_id', carrito_id);

    if (error) throw new Error(error.message);
    return data;
  }

  async eliminarItem(id: number) {
    const client = this.supabase.getClient();

    const { data, error } = await client.from('carrito_items').delete().eq('id', id);

    if (error) throw new Error(error.message);
    return data;
  }
}
