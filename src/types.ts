export interface Reseller {
  CodigoRevendedor: string;
  Nome: string;
  CPFCNPJ: string;
  Situacao: string;
  CodigoEstrutura: string;
  TelResidencial: string;
  TelCelular: string;
  cidade: string;
  isActive: boolean;
}

export interface DashboardStats {
  total: number;
  active: number;
  inactive: number;
  topCities: { city: string; count: number }[];
}
