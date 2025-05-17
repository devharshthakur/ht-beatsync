import { Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/global/providers';
import '@workspace/ui/globals.css';

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontMono.variable} font-mono`}>
      <body className="flex min-h-screen flex-col">
        <Providers>
          <main className="flex-1">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
