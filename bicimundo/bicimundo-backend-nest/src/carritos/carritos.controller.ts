import { Controller, Get, Param } from '@nestjs/common';
import { CarritosService } from './carritos.service';

@Controller('carritos')
export class CarritosController {
  constructor(private readonly carritosService: CarritosService) {}

  @Get(':clienteId')
  getOrCreate(@Param('clienteId') clienteId: string) {
    return this.carritosService.getOrCreateByClienteId(Number(clienteId));
  }
}
