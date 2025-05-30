import { forwardRef, Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { SupabaseService } from '../supabase/supabase.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [ClientesController],
  providers: [ClientesService, SupabaseService],
  exports: [ClientesService],
})
export class ClientesModule {}
