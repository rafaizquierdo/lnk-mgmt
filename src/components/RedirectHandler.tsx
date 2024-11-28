import React, { useEffect, useState } from 'react';
import { findUrlByShortCode } from '../utils/storage';

interface RedirectHandlerProps {
  shortCode: string;
}

export const RedirectHandler: React.FC<RedirectHandlerProps> = ({ shortCode }) => {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const url = findUrlByShortCode(shortCode);
    if (url) {
      window.location.href = url.originalUrl;
    } else {
      setError('URL not found');
    }
  }, [shortCode]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-medium text-lg">{error}</p>
          <a 
            href="/"
            className="mt-4 inline-block text-blue-500 hover:text-blue-600"
          >
            Go back home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
};