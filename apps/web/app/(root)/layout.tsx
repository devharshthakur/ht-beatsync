import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <div className="mt-auto">
        <Footer />
      </div>
    </>
  );
}
