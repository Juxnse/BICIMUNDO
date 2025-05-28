import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  controllers: [ProductosController],
  providers: [ProductosService, SupabaseService],
})
export class ProductosModule {}
