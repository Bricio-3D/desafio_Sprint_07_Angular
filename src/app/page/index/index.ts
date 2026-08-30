import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  imports: [FormsModule],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private router = inject(Router);
  private authService = inject(AuthService); // Injeta o serviço HTTP de autenticação

  username: string = '';
  password: string = '';
  remember: boolean = false;

  errorMessage: string = '';
  mostrarSenha: boolean = false;

  toggleMostrarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  limparErro(): void {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }

  // Faz a chamada HTTP para a API validar o login
  fazerLogin(): void {
    this.errorMessage = '';

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        // Se a API validar com sucesso, redireciona para a Home
        this.router.navigate(['/home']);
      },
      error: () => {
        // Se a API recusar o login (usuário ou senha errados)
        this.errorMessage = 'Usuário ou senha incorretos';
      }
    });
  }
}
