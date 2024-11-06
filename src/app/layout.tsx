import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import TransitionWrapper from '../components/TransitionWrapper';
import ContactsContainer from '@/components/ContactsContainer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Eric Junqueira',
  description: 'Eric Junqueira Portfolio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <div>
          <TransitionWrapper>{children}</TransitionWrapper>
          <ContactsContainer />
          <Navbar />
        </div>
      </body>
    </html>
  );
}
