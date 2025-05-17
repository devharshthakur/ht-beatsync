import { Navbar } from '@/components/global/navbar';
import { Footer } from '@/components/global/footer';

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
