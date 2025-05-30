import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CarritosService } from './carritos.service';

@Controller('carritos')
@UseGuards(JwtAuthGuard)
export class CarritosController {
  constructor(private readonly carritosService: CarritosService) {}

  @Get(':clienteId')
  getOrCreate(@Param('clienteId') clienteId: string) {
    return this.carritosService.getOrCreateByClienteId(Number(clienteId));
  }
}
