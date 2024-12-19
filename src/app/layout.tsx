import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gluon Stablecoin Protocol",
  description: "Gluon is an autonomous crypto-backed stablecoin protocol inspired by nuclear physics and named after the sub-atomic particle responsible for stability of all matter in the universe. Gluon allows you to fission a cryptocurrency into its stable and volatile components, fusion them back and transmute one into the other.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased'
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
    </html>
  );
}
