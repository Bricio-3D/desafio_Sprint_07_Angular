import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../component/menu/menu';



// Estrutura de dados para cada veículo
interface VeiculoData {
  nome: string;
  imagem: string;
  vendas: number;
  conectados: number;
  updateSoftware: number;
  vin: string;
  odometro: string;
  combustivel: string;
  status: string;
  lat: string;
  long: string;
}



@Component({
  selector: 'app-dashboard',
  imports: [Menu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  private router = inject(Router);
  menuAberto: boolean = false;
  // Lista com as informações de cada carro (usando as imagens da pasta public/img)
  veiculos: VeiculoData[] = [
    {
      nome: 'Mustang',
      imagem: 'img/mustang.png',
      vendas: 1500,
      conectados: 500,
      updateSoftware: 750,
      vin: '2FBHDUV52Y63NHD22455',
      odometro: '50.000 Km',
      combustivel: '90 %',
      status: 'on',
      lat: '-12,2322',
      long: '-35,2314'
    },
    {
      nome: 'Ranger',
      imagem: 'img/ranger.png',
      vendas: 3200,
      conectados: 1200,
      updateSoftware: 1100,
      vin: '1FMCU0GD9KUA83421',
      odometro: '35.000 Km',
      combustivel: '75 %',
      status: 'on',
      lat: '-23,5505',
      long: '-46,6333'
    },
    {
      nome: 'Territory',
      imagem: 'img/territory.png',
      vendas: 980,
      conectados: 400,
      updateSoftware: 300,
      vin: '3FA6P0H74LR123987',
      odometro: '15.000 Km',
      combustivel: '50 %',
      status: 'off',
      lat: '-22,9068',
      long: '-43,1729'
    },
    {
      nome: 'Bronco Sport',
      imagem: 'img/broncoSport.png',
      vendas: 2100,
      conectados: 850,
      updateSoftware: 600,
      vin: '4S4BRBFC8M3456789',
      odometro: '22.000 Km',
      combustivel: '85 %',
      status: 'on',
      lat: '-15,7801',
      long: '-47,9292'
    }
  ];

  // Guarda o veículo selecionado atualmente (inicia no Mustang)
  veiculoSelecionado: VeiculoData = this.veiculos[0];

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  logout(): void {
    this.router.navigate(['/index']);
  }

  // Função chamada quando o usuário escolhe um carro diferente no <select>
  onVeiculoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const nomeVeiculo = selectElement.value;
    const encontrado = this.veiculos.find(v => v.nome === nomeVeiculo);
    if (encontrado) {
      this.veiculoSelecionado = encontrado;
    }

  }
  }
