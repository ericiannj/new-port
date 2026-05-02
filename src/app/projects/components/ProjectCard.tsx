'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Icons } from '@/icons';
import type { Project } from '../data';

type AnimatedProjectCardProps = {
  project: Project;
  priority?: boolean;
};

export default function AnimatedProjectCard({
  project,
  priority = false,
}: AnimatedProjectCardProps) {
  const { title, description, stack, image, repo, demo } = project;
  const hasDemo = Boolean(demo);

  return (
    <motion.article
      className="mx-auto flex w-full max-w-[min(25rem,calc(100vw-4rem))] min-w-0 flex-col overflow-hidden rounded-lg bg-gray-900/60 shadow-lg md:max-w-[400px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-[150px] w-full sm:h-[170px] md:h-[180px]">
        <Image
          src={image}
          alt={`${title} preview screenshot`}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          priority={priority}
        />
      </div>
      <div className="flex min-w-0 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <h3 className="text-lg font-bold wrap-break-word text-white sm:text-xl">
          {title}
        </h3>
        <p
          className="line-clamp-3 min-h-[3lh] text-sm leading-relaxed wrap-break-word text-gray-200"
          title={description}
        >
          {description}
        </p>
        <ul
          className="flex flex-wrap gap-1.5"
          aria-label={`${title} tech stack`}
        >
          {stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-gray-700/70 px-2 py-0.5 text-xs text-gray-100"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-2 flex gap-2">
          <a
            href={repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} source code on GitHub`}
            className="flex items-center gap-1.5 rounded-md bg-gray-700 px-3 py-1.5 text-sm text-white transition-colors hover:bg-gray-600 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
          >
            <Icons.github className="h-4 w-4" aria-hidden="true" />
            Code
          </a>
          {hasDemo ? (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${title} live demo`}
              className="flex items-center gap-1.5 rounded-md bg-blue-700 px-3 py-1.5 text-sm text-white transition-colors hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Demo
            </a>
          ) : (
            <span
              role="button"
              aria-disabled="true"
              tabIndex={-1}
              title="Demo not available"
              className="flex cursor-not-allowed items-center gap-1.5 rounded-md bg-gray-800 px-3 py-1.5 text-sm text-gray-500"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Demo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
