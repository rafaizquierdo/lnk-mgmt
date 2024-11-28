export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  plan: 'free' | 'paid';
  verified: boolean;
  verificationToken?: string;
}

export interface AuthData {
  email: string;
  password: string;
  name?: string;
  plan?: 'free' | 'paid';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}