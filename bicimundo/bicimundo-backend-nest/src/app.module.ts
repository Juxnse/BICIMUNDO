import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductosModule } from './productos/productos.module';
import { ClientesModule } from './clientes/clientes.module';
import { CarritosModule } from './carritos/carritos.module';
import { CarritoItemsModule } from './carrito_items/carrito_items.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ClientesModule,
    ProductosModule,
    CarritosModule,
    CarritoItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
