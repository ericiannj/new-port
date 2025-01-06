'use client';

import { Icons } from '@/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathName = usePathname();

  return (
    <motion.div
      className="flex justify-center md:absolute md:bottom-16 md:right-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav>
        <ul className="flex space-x-8 p-4 md:flex-col md:items-start md:space-x-0 md:space-y-8">
          <AnimatePresence key={pathName}>
            {pages.map((page) => (
              <motion.li
                key={page.title}
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.25 }}
                className="cursor-pointer"
              >
                <Link href={page.url}>{page.icon}</Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </nav>
    </motion.div>
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
  // {
  //   title: 'Contact',
  //   url: '/contact',
  //   icon: <Icons.contact />,
  // },
  {
    title: 'Projects',
    url: '/projects',
    icon: <Icons.projects />,
  },
];
