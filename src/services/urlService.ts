import axiosInstance from './axiosInstance';

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

export async function fetchUrls(): Promise<UrlInfo[]> {
  const response = await axiosInstance.get('/api/urls');
  return response.data;
}

export async function addUrl(url: string): Promise<any> {
  const response = await axiosInstance.post('/api/urls', { url });
  return response.data;
}

export async function deleteUrls(ids: number[]): Promise<any> {
  return axiosInstance.delete('/api/urls', { data: { ids } });
} 