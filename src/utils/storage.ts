import { ShortenedUrl, UrlUpdateData } from '../types/url';
import { User } from '../types/auth';

const URLS_KEY = 'shortened_urls';

export const saveUrl = (url: ShortenedUrl): void => {
  const urls = getUrls();
  urls.push(url);
  localStorage.setItem(URLS_KEY, JSON.stringify(urls));
};

export const updateUrl = (id: string, data: UrlUpdateData): void => {
  const urls = getUrls();
  const index = urls.findIndex(url => url.id === id);
  
  if (index !== -1) {
    urls[index] = {
      ...urls[index],
      ...data,
      lastModified: new Date()
    };
    localStorage.setItem(URLS_KEY, JSON.stringify(urls));
  }
};

export const getUrls = (user?: User | null): ShortenedUrl[] => {
  const urls = localStorage.getItem(URLS_KEY);
  const allUrls = urls ? JSON.parse(urls) : [];
  return user ? allUrls.filter(url => url.userId === user.id) : allUrls;
};

export const findUrlByCustomPath = (customPath: string): ShortenedUrl | undefined => {
  const urls = getUrls();
  return urls.find(url => url.customPath === customPath);
};

export const findUrlByShortCode = (shortCode: string): ShortenedUrl | undefined => {
  const urls = getUrls();
  return urls.find(url => url.customPath === shortCode);
};