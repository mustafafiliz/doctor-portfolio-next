"use client";

import { useConfigContext } from "@/contexts/ConfigContext";

export function useConfig() {
  const { config } = useConfigContext();

  // loading is always false since config is pre-fetched in layout
  return { config, loading: false };
}
