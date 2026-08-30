import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../component/menu/menu';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [Menu],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  private router = inject(Router);
  private authService = inject(AuthService);
  menuAberto: boolean = false;

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  logout(): void {
    this.authService.logout(); // Limpa a sessão
    this.router.navigate(['/index']);
  }
}
