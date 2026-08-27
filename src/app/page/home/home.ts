import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {Menu} from '../../component/menu/menu';


@Component({
  selector: 'app-home',
  imports: [Menu],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

  private router = inject(Router);
  //Variavel para armazenar o estado do menu
  menuAberto: boolean = false;

  //Função para alternar o estado de aberto/fechado
  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  logout(): void {
    this.router.navigate(['/index']);

  }

}
