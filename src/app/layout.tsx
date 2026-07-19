import type { Metadata } from 'next';
import MainProvider from '@/layout/provider/MainProvider';
import { Gnb } from '@/layout/navigation/Gnb';
import './globals.css';

export const metadata: Metadata = {
  title: 'CERTICOS BOOKS',
  description: 'certico books',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`m-0 p-0 antialiased`}>
        <MainProvider>
          <Gnb />
          <div>{children}</div>
        </MainProvider>
      </body>
    </html>
  );
}
