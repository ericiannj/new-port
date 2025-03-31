import type { Metadata } from 'next';
import './globals.css';
import Navbar from './_components/Navbar';
import TransitionWrapper from './_components/TransitionWrapper';
import ContactsContainer from './_components/ContactsContainer';
import AnimatedBackground from './_components/AnimatedBackground';
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
          <AnimatedBackground />
          <TransitionWrapper>
            <>
              <Navbar />
              {children}
              <ContactsContainer />
            </>
          </TransitionWrapper>
        </div>
      </body>
    </html>
  );
}
