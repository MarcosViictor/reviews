export interface Review {
    name: string | null;
    username: string;
    avatar_path: string | null;
    rating: number | null;
    author: string;
    content: string;
    created_at: string; // Usando string, pois a data geralmente vem como ISO8601
    id: string;
    updated_at: string;
    url: string;
  }
  
