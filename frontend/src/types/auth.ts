export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<{
    success: boolean;
    error?: string;
  }>;
  logout: () => Promise<void>;
  updateUser: (updatedUser: UserProfile | null) => void;
}

export type PasswordInputProps = {
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};
