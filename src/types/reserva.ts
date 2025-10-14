export type ReservaStatus = "pendente" | "confirmada" | "cancelada";

export interface Reserva {
  id: string;
  propriedade_id: string;
  hospede_nome: string | null;
  data_inicio: string; // ISO date (YYYY-MM-DD)
  data_fim: string; // ISO date (YYYY-MM-DD)
  status: ReservaStatus;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface ReservaWithPropriedade extends Reserva {
  propriedade?: { id: string; nome: string } | null;
}

