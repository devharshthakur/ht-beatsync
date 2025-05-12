import { JetBrains_Mono } from 'next/font/google';
import '@workspace/ui/globals.css';
import { Providers } from '@/components/providers';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

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
      <body className="flex min-h-screen flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <div className="mt-auto">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
