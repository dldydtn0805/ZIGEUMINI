const trimTrailingSlash = (value?: string) => value?.replace(/\/+$/, "") ?? "";

export const API_ORIGIN = trimTrailingSlash(process.env.NEXT_PUBLIC_API_ORIGIN);

export const API_BASE_URL =
  trimTrailingSlash(process.env.NEXT_PUBLIC_API_BASE_URL) ||
  (API_ORIGIN ? `${API_ORIGIN}/api` : "/api");

export const HADOOP_BASE_URL =
  trimTrailingSlash(process.env.NEXT_PUBLIC_HADOOP_BASE_URL) ||
  (API_ORIGIN ? `${API_ORIGIN}/hadoop` : "/hadoop");

export const SOCKET_URL =
  trimTrailingSlash(process.env.NEXT_PUBLIC_SOCKET_URL) ||
  (API_ORIGIN ? `${API_ORIGIN}/ws` : "/ws");

const joinUrl = (baseUrl: string, path: string) =>
  `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const apiUrl = (path: string) => joinUrl(API_BASE_URL, path);

export const hadoopUrl = (path: string) => joinUrl(HADOOP_BASE_URL, path);
