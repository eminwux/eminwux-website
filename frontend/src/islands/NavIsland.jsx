import React from "react";
import Nav from "../components/Nav";
import { LanguageProvider } from "../i18n/LanguageContext";

/**
 * Lightweight island used by static MDX/blog pages — renders the
 * sticky Nav (with language switcher) while the rest of the page
 * remains server-rendered Astro/MDX.
 */
export default function NavIsland() {
  return (
    <LanguageProvider>
      <Nav />
    </LanguageProvider>
  );
}
