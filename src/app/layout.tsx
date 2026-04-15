import type { Metadata } from 'next';
import './globals.css';
import Navbar from './_components/Navbar';
import TransitionWrapper from './_components/TransitionWrapper';
import ContactsContainer from './_components/ContactsContainer';
import LazyAnimatedBackground from './_components/LazyAnimatedBackground';
import { Rubik } from 'next/font/google';

export const metadata: Metadata = {
  metadataBase: new URL('https://ericjunqueira.com'),
  title: {
    default: 'Eric Junqueira — Full Stack Developer',
    template: '%s · Eric Junqueira',
  },
  description:
    'Portfolio of Eric Junqueira, a full stack developer with a front-end focus. Projects, experience, and recommendations.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ericjunqueira.com',
    siteName: 'Eric Junqueira',
    title: 'Eric Junqueira — Full Stack Developer',
    description:
      'Portfolio of Eric Junqueira, a full stack developer with a front-end focus.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eric Junqueira — Full Stack Developer',
    description:
      'Portfolio of Eric Junqueira, a full stack developer with a front-end focus.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
          <LazyAnimatedBackground />
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
