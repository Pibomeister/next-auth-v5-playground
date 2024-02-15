import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '../auth';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next-Auth | Auth Playground',
  description: 'A playground for Next.js authentication strategies. 🎢',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <SessionProvider session={session}>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
