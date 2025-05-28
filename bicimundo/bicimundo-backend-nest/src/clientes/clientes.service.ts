import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class ClientesService {
  constructor(private readonly supabase: SupabaseService) {}

async create(cliente: any) {
  const client = this.supabase.getClient();

  // Transformar fechaNacimiento → fecha_nacimiento
  const clienteTransformado = {
    ...cliente,
    fecha_nacimiento: cliente.fechaNacimiento,
  };
  delete clienteTransformado.fechaNacimiento;

  const { data, error } = await client.from('clientes').insert([clienteTransformado]);
  if (error) throw new Error(error.message);
  return data?.[0]; // Devolvemos el cliente insertado
}

async login(email: string, password: string) {
  const client = this.supabase.getClient();

  const { data, error } = await client
    .from('clientes')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .maybeSingle();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('Correo o contraseña incorrectos');

  return data;
}

  async findAll() {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('clientes').select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: string, body: Partial<any>) {
    const client = this.supabase.getClient();
    const { error } = await client.from('clientes').update(body).eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Cliente actualizado correctamente' };
  }

  async delete(id: string) {
    const client = this.supabase.getClient();
    const { error } = await client.from('clientes').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { message: 'Cliente eliminado correctamente' };
  }
}
