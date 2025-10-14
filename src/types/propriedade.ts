export interface Propriedade {
  id: string;
  owner_id: string;
  nome: string;
  endereco: string | null;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

