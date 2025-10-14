export interface Propriedade {
  id: string;
  owner_id: string;
  nome: string;
  endereco: string | null;
  descricao: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

export interface PropriedadeImagem {
  id: string;
  propriedade_id: string;
  url: string;
  created_at: string;
}
