export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthData {
  email: string;
  password: string;
  name?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}