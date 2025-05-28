import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ClienteApiService {
  private apiUrl = 'http://localhost:3000/clientes';

  constructor(private http: HttpClient) {}

  crearCliente(cliente: any) {
    return this.http.post(this.apiUrl, cliente);
  }

  loginCliente(credentials: { email: string, password: string }) {
  return this.http.post('http://localhost:3000/clientes/login', credentials);
}

actualizarCliente(id: string, clienteActualizado: any) {
  return this.http.patch(`http://localhost:3000/clientes/${id}`, clienteActualizado);
}



}
