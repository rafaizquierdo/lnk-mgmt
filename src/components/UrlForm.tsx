import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import { isValidUrl, validateCustomPath } from '../utils/urlUtils';
import { UrlFormData } from '../types/url';

interface UrlFormProps {
  onSubmit: (data: UrlFormData) => void;
}

export const UrlForm: React.FC<UrlFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<UrlFormData>({
    originalUrl: '',
    customPath: '',
    notes: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.originalUrl.trim() || !formData.customPath.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    if (!isValidUrl(formData.originalUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    if (!validateCustomPath(formData.customPath)) {
      setError('Custom path can only contain letters, numbers, and hyphens');
      return;
    }

    onSubmit(formData);
    setFormData({ originalUrl: '', customPath: '', notes: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create New Short URL</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Destination URL*
          </label>
          <input
            type="text"
            value={formData.originalUrl}
            onChange={(e) => setFormData({ ...formData, originalUrl: e.target.value })}
            placeholder="https://example.com/your-long-url"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Custom Path*
          </label>
          <div className="flex items-center">
            <span className="text-gray-500 bg-gray-50 px-3 py-2 rounded-l-lg border border-r-0 border-gray-300">
              lnk-mgmt.es/
            </span>
            <input
              type="text"
              value={formData.customPath}
              onChange={(e) => setFormData({ ...formData, customPath: e.target.value })}
              placeholder="your-custom-path"
              className="flex-1 px-4 py-2 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Add any notes about this URL..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Link2 size={20} />
          Create Short URL
        </button>
      </div>
    </form>
  );
};