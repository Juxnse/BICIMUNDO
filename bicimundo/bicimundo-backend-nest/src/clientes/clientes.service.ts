import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientesService {
  constructor(private readonly supabase: SupabaseService) {}

  private SALT_ROUNDS = 10;

  async create(cliente: any) {
    // Validación de campos obligatorios
    const { nombre, cedula, email, fechaNacimiento, password, rol } = cliente;
    if (!nombre || cedula || !email || !fechaNacimiento || !password) {
      throw new BadRequestException('Por favor, llena todos los campos.');
    }

    // Validación de formato de email
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('El correo electrónico no tiene un formato válido.');
    }

    // Validación de edad >= 18 años
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear() -
      (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate()) ? 1 : 0);
    if (edad < 18) {
      throw new BadRequestException('Debes ser mayor de 18 años para registrarte.');
    }

    const client = this.supabase.getClient();

    let passwordToStore: string;
    if (rol === 'admin') {
      passwordToStore = password;
    } else {
      passwordToStore = await bcrypt.hash(password, this.SALT_ROUNDS);
    }

    const clienteTransformado = {
      ...cliente,
      password: passwordToStore,
      fecha_nacimiento: fechaNacimiento,
    };
    delete (clienteTransformado as any).fechaNacimiento;

    const { data, error } = await client.from('clientes').insert([clienteTransformado]);

    if (error) {
      if (error.code === '23505' || /duplicate key value violates unique constraint/.test(error.message)) {
        throw new ConflictException('El correo ya está registrado.');
      }
      throw new BadRequestException(error.message);
    }

    return data?.[0];
  }

  async login(email: string, password: string) {
    const client = this.supabase.getClient();

    const { data, error } = await client
      .from('clientes')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw new BadRequestException(error.message);
    if (!data) throw new UnauthorizedException('Correo o contraseña incorrectos');

    const match = data.rol === 'admin'
      ? password === data.password
      : await bcrypt.compare(password, data.password);

    if (!match) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const { password: _, ...sinPassword } = data;
    return sinPassword;
  }

async update(
      id: string,
      body: { currentPassword?: string; newPassword?: string; [k: string]: any },
    ) {
      const client = this.supabase.getClient();

      if (!body.currentPassword) {
        throw new UnauthorizedException('Debes proveer la contraseña actual');
      }

      const { data: existing, error: fetchErr } = await client
        .from('clientes')
        .select('rol, password')
        .eq('id', id)
        .maybeSingle();
      if (fetchErr) throw new BadRequestException(fetchErr.message);
      if (!existing) throw new BadRequestException('Usuario no encontrado');

      const validCurrent = existing.rol === 'admin'
        ? body.currentPassword === existing.password
        : await bcrypt.compare(body.currentPassword, existing.password);
      if (!validCurrent) {
        throw new UnauthorizedException('Contraseña actual incorrecta');
      }

      if (body.newPassword) {
        if (body.newPassword === body.currentPassword) {
          throw new BadRequestException('La contraseña nueva debe ser diferente a la actual.');
        }
        body.password = existing.rol === 'admin'
          ? body.newPassword
          : await bcrypt.hash(body.newPassword, this.SALT_ROUNDS);
      }

      delete body.currentPassword;
      delete body.newPassword;

      const { error: updateErr } = await client.from('clientes').update(body).eq('id', id);
      if (updateErr) throw new BadRequestException(updateErr.message);

      return { message: 'Cliente actualizado correctamente' };
    }

  async findAll(): Promise<any[]> {
    const client = this.supabase.getClient();
    const { data, error } = await client.from('clientes').select('*');
    if (error) throw new BadRequestException(error.message);
    return data;
  }

  async delete(id: string) {
    const client = this.supabase.getClient();
    const { error } = await client.from('clientes').delete().eq('id', id);
    if (error) throw new BadRequestException(error.message);
    return { message: 'Cliente eliminado correctamente' };
  }
}
