import "@/styles/globals.css";
import type { Metadata } from 'next';
import { fontSans } from '@/config/fonts';
import clsx from "clsx";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'Admin HealthHub',
  description: 'Trang quản trị sàn HealthHub',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx("font-sans antialiased", fontSans.className)}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
