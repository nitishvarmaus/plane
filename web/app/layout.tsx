import { ReactElement } from "react";
import { Metadata } from "next";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
// styles
import "@/styles/globals.css";
import "@/styles/command-pallette.css";
import "@/styles/nprogress.css";
import "@/styles/emoji.css";
import "@/styles/react-day-picker.css";
// constants
import { SITE_TITLE } from "@/constants/seo-variables";
import { THEMES } from "@/constants/themes";
// mobx store provider
import { StoreProvider } from "@/contexts/store-context";
// types
import { AppProvider } from "@/lib/app-provider";

export const metadata: Metadata = {
  title: SITE_TITLE,
};

const RootLayout = ({ children }: { children: ReactElement }) => (
  <>
    <html lang="en">
      <body className={`antialiased`}>
        <StoreProvider>
          <ThemeProvider themes={THEMES} defaultTheme="system">
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  </>
);

export default RootLayout;
