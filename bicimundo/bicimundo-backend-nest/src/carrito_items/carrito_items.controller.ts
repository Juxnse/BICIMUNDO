import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CarritoItemsService } from './carrito_items.service';

@Controller('carrito-items')
export class CarritoItemsController {
  constructor(private readonly service: CarritoItemsService) {}

  @Post()
  agregar(@Body() body: { carrito_id: number; producto_id: number; cantidad: number }) {
    return this.service.agregarItem(body.carrito_id, body.producto_id, body.cantidad);
  }

  @Get(':carrito_id')
  obtenerPorCarrito(@Param('carrito_id') carrito_id: string) {
    return this.service.obtenerItems(Number(carrito_id));
  }

  @Delete(':id')
  eliminar(@Param('id') id: string) {
    return this.service.eliminarItem(Number(id));
  }
}
