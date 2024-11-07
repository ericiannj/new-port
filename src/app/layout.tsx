import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import TransitionWrapper from '../components/TransitionWrapper';
import ContactsContainer from '@/components/ContactsContainer';
import { Rubik } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Eric Junqueira',
  description: 'Eric Junqueira Portfolio',
};

const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} h-full antialiased`}>
        <div>
          <TransitionWrapper>
            <>
              {children}
              <ContactsContainer />
              <Navbar />
            </>
          </TransitionWrapper>
        </div>
      </body>
    </html>
  );
}
