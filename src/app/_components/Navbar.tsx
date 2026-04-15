'use client';

import { Icons } from '@/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathName = usePathname();

  return (
    <div className="animate-fade-in-up flex justify-center md:fixed md:right-16 md:bottom-16 md:z-50">
      <nav>
        <ul
          key={pathName}
          className="flex space-x-8 p-4 md:flex-col md:items-start md:space-y-8 md:space-x-0"
        >
          {pages.map((page) => (
            <li key={page.title} className="animate-spin-once cursor-pointer">
              <Link href={page.url}>{page.icon}</Link>
            </li>
          ))}
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
