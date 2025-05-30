// src/clientes/clientes.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ClientesService } from './clientes.service';
import { LoginClienteDto } from './dto/login-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() body: any) {
    return this.clientesService.create(body);
  }

  @Post('login')
  async login(@Body() loginDto: LoginClienteDto) {
    const { email, password } = loginDto;
    try {
      const user = await this.clientesService.login(email, password);
      return user;
    } catch (err) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.clientesService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.clientesService.delete(id);
  }
}
