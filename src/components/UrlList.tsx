import React, { useState } from 'react';
import { Copy, ExternalLink, Edit2, Check, X } from 'lucide-react';
import { ShortenedUrl, UrlUpdateData } from '../types/url';
import { formatDate } from '../utils/urlUtils';

interface UrlListProps {
  urls: ShortenedUrl[];
  onUpdateUrl: (id: string, data: UrlUpdateData) => void;
}

export const UrlList: React.FC<UrlListProps> = ({ urls, onUpdateUrl }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<UrlUpdateData>({
    originalUrl: '',
    customPath: '',
    notes: ''
  });

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const getFullUrl = (customPath: string) => {
    return `https://lnk-mgmt.es/${customPath}`;
  };

  const handleEdit = (url: ShortenedUrl) => {
    setEditingId(url.id);
    setEditData({
      originalUrl: url.originalUrl,
      customPath: url.customPath,
      notes: url.notes || ''
    });
  };

  const handleSave = (id: string) => {
    if (!editData.originalUrl) return;
    onUpdateUrl(id, editData);
    setEditingId(null);
    setEditData({
      originalUrl: '',
      customPath: '',
      notes: ''
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditData({
      originalUrl: '',
      customPath: '',
      notes: ''
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-white rounded-lg shadow-md">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short URL</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {urls.map((url) => (
            <tr key={url.id}>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-900">
                    {getFullUrl(url.customPath)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(getFullUrl(url.customPath))}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Copy size={16} className="text-gray-500" />
                  </button>
                </div>
              </td>
              <td className="px-6 py-4">
                {editingId === url.id ? (
                  <input
                    type="text"
                    value={editData.originalUrl || ''}
                    onChange={(e) => setEditData({ ...editData, originalUrl: e.target.value })}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900 truncate max-w-xs">
                      {url.originalUrl}
                    </span>
                    <a
                      href={url.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                {editingId === url.id ? (
                  <input
                    type="text"
                    value={editData.notes || ''}
                    onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                    className="w-full px-2 py-1 border rounded"
                  />
                ) : (
                  <span className="text-sm text-gray-900">{url.notes}</span>
                )}
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-900">
                  {formatDate(url.createdAt)}
                </span>
              </td>
              <td className="px-6 py-4">
                {editingId === url.id ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleSave(url.id)}
                      className="p-1 text-green-500 hover:bg-green-50 rounded"
                    >
                      <Check size={18} />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit(url)}
                    className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                  >
                    <Edit2 size={18} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};