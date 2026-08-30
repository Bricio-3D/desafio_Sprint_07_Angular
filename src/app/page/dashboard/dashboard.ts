import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../../component/menu/menu';
import { AuthService } from '../../services/auth.service';
import { VeiculoService } from '../../services/veiculo';
import { Veiculo } from '../../models/veiculo.model';

@Component({
  selector: 'app-dashboard',
  imports: [Menu],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  private veiculoService = inject(VeiculoService);

  menuAberto: boolean = false;
  veiculos: Veiculo[] = [];
  veiculoSelecionado?: any;

  // VINs cadastrados na API do professor para cada modelo
  private vinsPorVeiculo: { [key: string]: string } = {
    'Ranger': '2FRHDUYS2Y63NHD22454',
    'Mustang': '2RFAASDY54E4HDU34874',
    'Territory': '2FRHDUYS2Y63NHD22455',
    'Bronco Sport': '2RFAASDY54E4HDU34875'
  };

  ngOnInit(): void {
    this.veiculoService.getVeiculos().subscribe({
      next: (dados) => {
        this.veiculos = dados.map((v: any) => {
          const nomeCarro = v.vehicle || v.nome;
          const vinCarro = this.vinsPorVeiculo[nomeCarro] || '2FRHDUYS2Y63NHD22454';
          return {
            ...v,
            nome: nomeCarro,
            vendas: v.volumetotal || v.vendas || 0,
            conectados: v.connected || v.conectados || 0,
            updateSoftware: v.softwareUpdates || v.updateSoftware || 0,
            imagem: v.img || v.imagem || `img/${nomeCarro.toLowerCase().replace(/\s+/g, '')}.png`,
            vin: vinCarro
          };
        });

        if (this.veiculos.length > 0) {
          this.veiculoSelecionado = this.veiculos[0];
          this.carregarDadosTabela(this.veiculoSelecionado.vin);
        }

        this.veiculos.forEach((v: any) => {
          if (v.imagem) {
            const img = new Image();
            img.src = v.imagem;
          }
        });
      },
      error: (err) => {
        console.error('Erro ao buscar veículos da API:', err);
      }
    });
  }

  // Aceita vin como opcional (vin?: string) para satisfazer o TypeScript
  carregarDadosTabela(vin?: string): void {
    if (!vin) return;

    this.veiculoService.getVehicleData(vin).subscribe({
      next: (detalhes) => {
        if (this.veiculoSelecionado) {
          this.veiculoSelecionado = {
            ...this.veiculoSelecionado,
            odometro: `${detalhes.odometro} Km`,
            combustivel: `${detalhes.nivelCombustivel} %`,
            status: detalhes.status,
            lat: detalhes.lat,
            long: detalhes.long
          };
        }
      },
      error: (err) => {
        console.error('Erro ao carregar dados da tabela:', err);
      }
    });
  }

  toggleMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/index']);
  }

  onVeiculoChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const nomeVeiculo = selectElement.value;
    const encontrado = this.veiculos.find((v: any) => (v.nome || v.vehicle) === nomeVeiculo);
    if (encontrado) {
      this.veiculoSelecionado = encontrado;
      this.carregarDadosTabela(encontrado.vin);
    }
  }
}
