// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientesService } from '../clientes/clientes.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly clientesService: ClientesService,
    private readonly jwtService: JwtService,
  ) {}


  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.clientesService.login(email, password);
      const { password: _, ...sinPassword } = user;
      return sinPassword;
    } catch {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
  }


  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = { sub: user.id, email: user.email, rol: user.rol };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}