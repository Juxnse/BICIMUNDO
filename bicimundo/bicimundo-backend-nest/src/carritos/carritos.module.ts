import { Module } from '@nestjs/common';
import { CarritosService } from './carritos.service';
import { CarritosController } from './carritos.controller';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  controllers: [CarritosController],
  providers: [CarritosService, SupabaseService],
  exports: [CarritosService],
})
export class CarritosModule {}
