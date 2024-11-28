import React, { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { AuthData } from '../types/auth';

interface AuthFormProps {
  onLogin: (data: AuthData) => void;
  onRegister: (data: AuthData) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onRegister }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: '',
    name: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isLogin && !formData.name) {
      setError('Please provide a name for registration');
      return;
    }

    if (isLogin) {
      onLogin(formData);
    } else {
      onRegister(formData);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">
        {isLogin ? 'Login' : 'Create Account'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 hover:text-blue-600"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
};