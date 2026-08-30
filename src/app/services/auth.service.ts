import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001';

  isAuthenticated(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Envia { nome, senha } exatamente como a API do professor espera
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { nome: username, senha: password }).pipe(
      tap((response) => {
        localStorage.setItem('isLoggedIn', 'true');
        if (response.nome) {
          localStorage.setItem('usuarioLogado', response.nome);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('authToken');
  }
}
