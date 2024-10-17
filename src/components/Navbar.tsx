import { Icons } from '@/icons';

export default function Navbar() {
  return (
    <div className="absolute bottom-16 right-16">
      <nav>
        <ul className="flex flex-col items-start space-y-8 p-4">
          {pages.map((page) => (
            <li key={page.title}>
              <a href={page.url}>{page.icon}</a>
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
