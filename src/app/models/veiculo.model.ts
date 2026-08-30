export interface Veiculo {
  id: number | string;
  vehicle: string;
  volumetotal: number | string;
  connected: number | string;
  softwareUpdates: number | string;
  nome?: string;
  vendas?: number | string;
  conectados?: number | string;
  updateSoftware?: number | string;
  vin?: string;
  odometro?: string;
  combustivel?: string;
  status?: string;
  lat?: string;
  long?: string;
  imagem?: string;
}

export interface Veiculos extends Array<Veiculo> {}

export interface VeiculosAPI {
  vehicles: Veiculos;
}
