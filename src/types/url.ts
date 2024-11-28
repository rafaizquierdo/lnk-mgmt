export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  customPath: string;
  notes: string;
  createdAt: Date;
  userId: string;
  lastModified: Date;
}

export interface UrlFormData {
  originalUrl: string;
  customPath: string;
  notes?: string;
}

export interface UrlUpdateData {
  originalUrl?: string;
  customPath?: string;
  notes?: string;
}