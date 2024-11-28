import { User, AuthData } from '../types/auth';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

export const registerUser = (data: AuthData): User | null => {
  const users = getUsers();
  const existingUser = users.find(u => u.email === data.email);
  
  if (existingUser) {
    return null;
  }

  const newUser: User = {
    id: crypto.randomUUID(),
    email: data.email,
    name: data.name || data.email.split('@')[0],
    createdAt: new Date(),
  };

  users.push({ ...newUser, password: data.password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  const { password, ...userWithoutPassword } = users[users.length - 1];
  return userWithoutPassword;
};

export const loginUser = (data: AuthData): User | null => {
  const users = getUsers();
  const user = users.find(
    u => u.email === data.email && u.password === data.password
  );
  
  if (!user) {
    return null;
  }

  const { password, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  return userWithoutPassword;
};

export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

const getUsers = (): (User & { password: string })[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};