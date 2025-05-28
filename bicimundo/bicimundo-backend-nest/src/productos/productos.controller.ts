import { Controller, Get, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { ProductosService } from './productos.service';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async findAll() {
    return await this.productosService.getAll();
  }

  @Post()
  async create(@Body() body: any) {
    return await this.productosService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productosService.delete(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    console.log(`🛠 PATCH recibido para ID ${id}`, body); // 👈 para forzar recompilación
    return await this.productosService.update(id, body);
  }
}
