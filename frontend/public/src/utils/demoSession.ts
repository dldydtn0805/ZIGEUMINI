"use client";

import { isDemoMode } from "./demoMode";

const DEMO_ACCESS_TOKEN = "demo-access-token";
const DEMO_REFRESH_TOKEN = "demo-refresh-token";

export const startDemoSession = () => {
  if (!isDemoMode() || typeof window === "undefined") return;

  sessionStorage.setItem("accessToken", DEMO_ACCESS_TOKEN);
  sessionStorage.setItem("isLogin", "true");
  document.cookie = `refreshToken=${DEMO_REFRESH_TOKEN}; path=/`;
};

