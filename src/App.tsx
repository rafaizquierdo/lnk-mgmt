import React, { useState, useEffect } from 'react';
import { AuthForm } from './components/AuthForm';
import { Header } from './components/Header';
import { UrlForm } from './components/UrlForm';
import { UrlList } from './components/UrlList';
import { RedirectHandler } from './components/RedirectHandler';
import { LandingPage } from './components/LandingPage';
import { ShortenedUrl, UrlFormData, UrlUpdateData } from './types/url';
import { AuthData, User } from './types/auth';
import { saveUrl, getUrls, updateUrl, findUrlByCustomPath } from './utils/storage';
import { registerUser, loginUser, logoutUser, getCurrentUser } from './utils/auth';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const shortCode = window.location.pathname.slice(1);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setUrls(getUrls(currentUser));
    }
  }, []);

  const handleLogin = (data: AuthData) => {
    const loggedInUser = loginUser(data);
    if (loggedInUser) {
      setUser(loggedInUser);
      setUrls(getUrls(loggedInUser));
    }
  };

  const handleRegister = (data: AuthData) => {
    const newUser = registerUser(data);
    if (newUser) {
      setUser(newUser);
      setUrls([]);
    }
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setUrls([]);
  };

  const handleSubmit = (data: UrlFormData) => {
    if (!user) return;

    if (user.plan === 'free' && urls.length >= 1) {
      alert('Free plan users can only have 1 active short URL. Please upgrade to create more.');
      return;
    }

    const existingUrl = findUrlByCustomPath(data.customPath);
    if (existingUrl) {
      alert('This custom path is already taken. Please choose another one.');
      return;
    }

    const newUrl: ShortenedUrl = {
      id: crypto.randomUUID(),
      originalUrl: data.originalUrl,
      customPath: data.customPath,
      notes: data.notes || '',
      createdAt: new Date(),
      lastModified: new Date(),
      userId: user.id,
    };

    saveUrl(newUrl);
    setUrls(getUrls(user));
  };

  const handleUpdateUrl = (id: string, data: UrlUpdateData) => {
    updateUrl(id, data);
    setUrls(getUrls(user));
  };

  if (shortCode) {
    return <RedirectHandler shortCode={shortCode} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        {!user ? (
          <>
            <LandingPage />
            <div className="mt-16">
              <AuthForm onLogin={handleLogin} onRegister={handleRegister} />
            </div>
          </>
        ) : (
          <div className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <UrlForm onSubmit={handleSubmit} />
            </div>

            {urls.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Your Shortened URLs
                </h2>
                <UrlList urls={urls} onUpdateUrl={handleUpdateUrl} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;