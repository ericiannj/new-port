'use client';

import { Icons } from '@/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
  const pathName = usePathname();

  return (
    <div className="animate-fade-in-up flex justify-center md:fixed md:right-16 md:bottom-16 md:z-50">
      <nav aria-label="Primary">
        <ul
          key={pathName}
          className="flex space-x-8 p-4 md:flex-col md:items-start md:space-y-8 md:space-x-0"
        >
          {pages.map((page) => (
            <li key={page.title} className="animate-spin-once">
              <Link
                href={page.url}
                aria-label={page.title}
                aria-current={pathName === page.url ? 'page' : undefined}
                className="inline-flex rounded-md focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
              >
                {page.icon}
              </Link>
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
  {
    title: 'Projects',
    url: '/projects',
    icon: <Icons.projects />,
  },
];
