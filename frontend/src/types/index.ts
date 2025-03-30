export interface Usuario {
  _id: string;
  name: string;
  username: string;
  avatar?: string;
}

export interface Comentario {
  _id: string;
  comentario: string;
  usuarioId: Usuario;
  createdAt: string;
}

export interface Frase {
  _id: string;
  frase: string;
  autor: string;
  gif: string;
  likes: number;
  visualizaciones: number;
  comentarios: Comentario[];
  usuarioId?: Usuario;
  createdAt: string;
  updatedAt: string;
}

export interface PostCardProps {
  frase: Frase;
  onLike: (id: string) => void;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateUser: (updatedUser: UserProfile | null) => void;
}