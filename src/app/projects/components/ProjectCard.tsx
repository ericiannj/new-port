'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Code2, ExternalLink } from 'lucide-react';
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
      className="flex w-[400px] flex-col overflow-hidden rounded-lg bg-gray-900/60 shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-[180px] w-full">
        <Image
          src={image}
          alt={`${title} preview screenshot`}
          className="object-cover"
          fill
          sizes="400px"
          priority={priority}
        />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
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
            <Code2 className="h-4 w-4" aria-hidden="true" />
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
              aria-disabled="true"
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
