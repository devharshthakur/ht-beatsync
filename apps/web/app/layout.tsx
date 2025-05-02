import { JetBrains_Mono } from 'next/font/google';
import '@repo/ui/globals.css';
import { Providers } from '@/components/providers';

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: '200',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontMono.variable} font-mono`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
