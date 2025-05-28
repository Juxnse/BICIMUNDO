import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CarritosService {
  constructor(private readonly supabase: SupabaseService) {}

  async getOrCreateByClienteId(cliente_id: number) {
    const client = this.supabase.getClient();

    const { data: carritoExistente, error: errorBuscar } = await client
      .from('carritos')
      .select('*')
      .eq('cliente_id', cliente_id)
      .maybeSingle();

    if (errorBuscar) throw new Error(`Error al buscar carrito: ${errorBuscar.message}`);
    if (carritoExistente) return carritoExistente;

    const { data: cliente, error: errorCliente } = await client
      .from('clientes')
      .select('id')
      .eq('id', cliente_id)
      .maybeSingle();

    if (errorCliente) throw new Error(`Error al verificar cliente: ${errorCliente.message}`);
    if (!cliente) throw new Error(`El cliente con id ${cliente_id} no existe.`);

    const { data: nuevoCarrito, error: errorInsertar } = await client
      .from('carritos')
      .insert({ cliente_id })
      .select()
      .maybeSingle();

    if (errorInsertar) throw new Error(`Error al crear carrito: ${errorInsertar.message}`);
    return nuevoCarrito;
  }
}
