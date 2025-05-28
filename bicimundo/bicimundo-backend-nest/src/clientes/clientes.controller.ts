import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() body: any) {
    return this.clientesService.create(body);
  }

  @Post('login')
login(@Body() body: any) {
  const { email, password } = body;
  return this.clientesService.login(email, password);
}

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.clientesService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientesService.delete(id);
  }
}
