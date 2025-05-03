import { UserProfile } from './auth';

export interface Comment {
  _id: string;
  comentario: string;
  usuarioId: UserProfile;
  createdAt: string;
}

export interface CommentsProps {
  comentarios: Array<{
    _id: string;
    comentario: string;
    gif?: string;
    usuarioId: {
      name?: string;
      username?: string;
      avatar?: string;
    };
    createdAt: string;
  }>;
}

export interface Frase {
  _id: string;
  frase: string;
  autor: string;
  gif: string;
  likes: number;
  visualizaciones: number;
  comentarios: Comment[];
  usuarioId?: UserProfile;
  createdAt: string;
  updatedAt: string;
}

export interface PostCardProps {
  frase: Frase;
  onLike: (id: string) => void;
}

export interface PostActionsProps {
  likes: number;
  comments: number;
  views: number;
  id: string;
  onLike: (id: string) => void;
}

export interface AddCommentProps {
  onSubmit: (content: string, gifUrl?: string) => Promise<void>;
  placeholder?: string;
  onFocus?: () => void;
}