import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, SupabaseService],
})
export class ClientesModule {}
