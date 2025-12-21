"use client";

import { createContext, useContext, ReactNode } from "react";
import { SiteConfig } from "@/lib/config";

interface ConfigContextType {
  config: SiteConfig;
}

// Empty config - No fallback values
const emptyConfig: SiteConfig = {
  colors: {
    primary: "",
    secondary: "",
    accent: ""
  },
  meta: {
    siteName: "",
    defaultTitle: "",
    defaultDescription: "",
    defaultKeywords: ""
  },
  contact: {
    phone: "",
    mobile: "",
    email: "",
    address: "",
    whatsapp: ""
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: ""
  }
};

const ConfigContext = createContext<ConfigContextType>({
  config: emptyConfig
});

export function ConfigProvider({
  children,
  config
}: {
  children: ReactNode;
  config: SiteConfig;
}) {
  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfigContext() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfigContext must be used within a ConfigProvider");
  }
  return context;
}
