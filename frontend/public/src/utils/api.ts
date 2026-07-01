const DEFAULT_API_BASE_URL = "https://j10a207.p.ssafy.io";

const rawApiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.URL ?? DEFAULT_API_BASE_URL;

const normalizeApiBaseUrl = (value: string) =>
  value.replace(/\/api\/?$/, "").replace(/\/$/, "");

export const API_BASE_URL = normalizeApiBaseUrl(rawApiBaseUrl);

export const apiUrl = (path: string) =>
  new URL(path.startsWith("/") ? path : `/${path}`, `${API_BASE_URL}/`).toString();

export const wsUrl = (path = "/ws") => apiUrl(path);

export const kakaoAuthUrl = () => apiUrl("/oauth2/authorization/kakao");
