"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Layout } from "../../components/layout/layout";
import store from '../../store';
import { Provider } from "react-redux";
import dynamic from 'next/dynamic'

const DynamicBrowserRouter = dynamic(() => import('react-router-dom').then(mod => mod.BrowserRouter), { ssr: false })

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <Provider store={store}>
      <DynamicBrowserRouter>
        <NextUIProvider>
          <NextThemesProvider defaultTheme="system" attribute="class" {...themeProps}>
            <Layout>
              {children}
            </Layout>
          </NextThemesProvider>
        </NextUIProvider>
      </DynamicBrowserRouter>
    </Provider>
  );
};
