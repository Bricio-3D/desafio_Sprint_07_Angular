import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Veiculo, VeiculosAPI } from '../models/veiculo.model';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001';

  // Busca os veículos da rota /vehicles da API
  getVeiculos(): Observable<Veiculo[]> {
    return this.http.get<VeiculosAPI>(`${this.apiUrl}/vehicles`).pipe(
      map(response => response.vehicles)
    );
  }

  // Busca a telemetria da tabela via POST /vehicleData na API
  getVehicleData(vin: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/vehicleData`, { vin });
  }
}
