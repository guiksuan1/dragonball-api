export interface Personagem {
  id: number;
  nome: string;
  raca: string;
  poderDeLuta: number;
  planetaOrigem: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PersonagemPayload {
  nome: string;
  raca: string;
  poderDeLuta: number;
  planetaOrigem: string;
}

export interface ApiErrorResponse {
  erro?: string;
  detalhe?: string;
}

export interface HealthResponse {
  status: string;
  uptime?: number;
  mensagem: string;
  timestamp?: string;
}
