import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { ClientesModule } from './clientes/clientes.module';
import { CarritosModule } from './carritos/carritos.module';
import { CarritoItemsModule } from './carrito_items/carrito_items.module';

@Module({
  imports: [
    ProductosModule,
    ClientesModule,
    CarritosModule,
    CarritoItemsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
