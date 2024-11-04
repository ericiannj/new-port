'use client';

import { Icons } from '@/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathName = usePathname();

  return (
    <div className="absolute bottom-16 right-16">
      <nav>
        <ul className="flex flex-col items-start space-y-8 p-4">
          <AnimatePresence key={pathName}>
            {pages.map((page) => (
              <motion.li
                key={page.title}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.25 }}
              >
                <Link href={page.url}>{page.icon}</Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </nav>
    </div>
  );
}

const pages = [
  {
    title: 'Home',
    url: '/',
    icon: <Icons.home />,
  },
  {
    title: 'About',
    url: '/about',
    icon: <Icons.about />,
  },
  {
    title: 'Contact',
    url: '/contact',
    icon: <Icons.contact />,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: <Icons.projects />,
  },
  {
    title: 'Recommendations',
    url: '/recommendations',
    icon: <Icons.recommendations />,
  },
];