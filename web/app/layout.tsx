import { ReactElement } from "react";
// import { AppProps } from "next/app";
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

const RootLayout = ({ children }: { children: ReactElement }) => (
  <>
    <Head>
      <title>{SITE_TITLE}</title>
    </Head>
    <StoreProvider>
      {/* <ThemeProvider themes={THEMES} defaultTheme="system"> */}
      {/* <AppProvider></AppProvider> */}
      {children}
      {/* </ThemeProvider> */}
    </StoreProvider>
  </>
);

export default RootLayout;
