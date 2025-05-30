// src/app/services/cliente-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClienteApiService {
  private apiUrl = 'http://localhost:3000/clientes';
  private authApiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  crearCliente(cliente: any) {
    return this.http.post(this.apiUrl, cliente);
  }

  loginCliente(credentials: { email: string; password: string }) {
    return this.http.post<{ access_token: string; user: any }>(
      `${this.authApiUrl}/login`,
      credentials
    );
  }

  actualizarCliente(id: string, clienteActualizado: any) {
    return this.http.patch(`${this.apiUrl}/${id}`, clienteActualizado);
  }
}
