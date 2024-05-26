"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { LayoutLogin } from "../../components/layout/layout-login";
import { Provider } from 'react-redux';
import store from '../../store';
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
            <LayoutLogin>
              {children}
            </LayoutLogin>
          </NextThemesProvider>
        </NextUIProvider>
      </DynamicBrowserRouter>
    </Provider>
  );
};
