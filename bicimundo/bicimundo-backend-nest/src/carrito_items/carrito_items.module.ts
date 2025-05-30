import { Module } from '@nestjs/common';
import { CarritoItemsService } from './carrito_items.service';
import { CarritoItemsController } from './carrito_items.controller';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  providers: [CarritoItemsService],
  controllers: [CarritoItemsController],
})
export class CarritoItemsModule {}
