import { User, AuthData } from '../types/auth';
import { sendVerificationEmail } from './email';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'current_user';

export const registerUser = async (data: AuthData): Promise<User | null> => {
  const users = getUsers();
  const existingUser = users.find(u => u.email === data.email);
  
  if (existingUser) {
    return null;
  }

  const verificationToken = crypto.randomUUID();
  
  const newUser: User = {
    id: crypto.randomUUID(),
    email: data.email,
    name: data.name || data.email.split('@')[0],
    createdAt: new Date(),
    plan: data.plan || 'free',
    verified: false,
    verificationToken
  };

  const emailSent = await sendVerificationEmail(data.email, verificationToken);
  
  if (!emailSent) {
    return null;
  }

  users.push({ ...newUser, password: data.password });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return newUser;
};

export const loginUser = (data: AuthData): User | null => {
  const users = getUsers();
  const user = users.find(
    u => u.email === data.email && u.password === data.password
  );
  
  if (!user || !user.verified) {
    return null;
  }

  const { password, ...userWithoutPassword } = user;
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
  return userWithoutPassword;
};

export const verifyEmail = (token: string): boolean => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.verificationToken === token);
  
  if (userIndex === -1) {
    return false;
  }

  users[userIndex].verified = true;
  delete users[userIndex].verificationToken;
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
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