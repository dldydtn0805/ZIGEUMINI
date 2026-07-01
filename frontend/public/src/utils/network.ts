import axios from "axios";
import { API_BASE_URL } from "./api";
import { isDemoMode } from "./demoMode";
import { installDemoMock } from "./demoMock";

const LEGACY_API_ORIGIN = "https://j10a207.p.ssafy.io";

const rewriteUrl = (value: string) => value.replace(LEGACY_API_ORIGIN, API_BASE_URL);

let installed = false;

export const installNetworkPatches = () => {
  if (installed) return;
  installed = true;

  if (isDemoMode()) {
    installDemoMock();
    return;
  }

  axios.interceptors.request.use((config) => {
    if (typeof config.url === "string") {
      config.url = rewriteUrl(config.url);
    }
    return config;
  });

  const originalFetch = globalThis.fetch.bind(globalThis);
  globalThis.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
    if (typeof input === "string") {
      return originalFetch(rewriteUrl(input), init);
    }

    if (input instanceof URL) {
      return originalFetch(new URL(rewriteUrl(input.toString())), init);
    }

    if (input instanceof Request) {
      return originalFetch(new Request(rewriteUrl(input.url), input), init);
    }

    return originalFetch(input, init);
  }) as typeof fetch;
};

installNetworkPatches();
