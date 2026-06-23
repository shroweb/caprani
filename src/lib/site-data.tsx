import { createContext, useContext, type ReactNode } from "react";
import type { CmsNavigation, CmsServiceSummary, CmsSiteSettings } from "@/lib/cms/types";

export type SiteData = {
  siteSettings: CmsSiteSettings;
  navigation: CmsNavigation;
  services: CmsServiceSummary[];
};

const SiteDataContext = createContext<SiteData | null>(null);

export function SiteDataProvider({ value, children }: { value: SiteData; children: ReactNode }) {
  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>;
}

export function useSiteData() {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used within SiteDataProvider");
  return ctx;
}
