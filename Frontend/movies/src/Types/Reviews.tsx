export interface Review {
  id: string; // O ID da review
  author_details: AuthorDetails; // O objeto que contém os detalhes do autor
  content: string; // O conteúdo da avaliação
  created_at: string; // A data de criação da avaliação
  updated_at: string; // A data de atualização da avaliação
  url: string; // URL da avaliação (se aplicável)
}

export interface AuthorDetails {
  avatar_path: string | null; // Caminho da imagem do avatar
  username: string; // Nome de usuário do autor
  rating: number | null; // Avaliação dada pelo autor (se aplicável)
}
  
