import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface UrlInfo {
  ID: number;
  URL: string;
  HTMLVersion: string;
  PageTitle: string;
  Headings: string;
  InternalLinks: number;
  ExternalLinks: number;
  BrokenLinks: number;
  HasLoginForm: boolean;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export async function fetchUrls(token: string): Promise<UrlInfo[]> {
  const response = await axios.get(`${API_URL}/api/urls`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
} 