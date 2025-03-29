'use client';

import { Icons } from '@/icons';
import { motion } from 'framer-motion';

const Recommendations = () => {
  return (
    <div className="flex w-full flex-col items-center py-12">
      <h2 className="mb-2 text-center text-4xl font-bold">
        My Colleagues&apos; Speak
      </h2>
      <p className="mb-10 text-center">
        I have been working with people around the world.
      </p>
      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="flex flex-col items-center">
              <motion.div
                className={`${testimonial.bgColor} relative mb-8 flex h-full flex-col rounded-lg p-6 shadow-lg`}
                whileHover={{
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300 },
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="mb-4 text-center text-xl font-semibold text-white">
                  {testimonial.title}
                </h3>
                <p className="mb-6 flex-grow text-sm text-white">
                  {testimonial.content}
                </p>
                <motion.div
                  className={`${testimonial.bgColor} absolute -bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rotate-45 transform`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                />
              </motion.div>
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-300">
                  <Icons.about className="h-full w-full" />
                </div>
                <p className="mt-2 font-semibold">{testimonial.author}</p>
                <p className="text-xs text-gray-200">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex items-center gap-2">
        <span className="text-gray-200">See more in my</span>
        <a
          href="https://www.linkedin.com/in/eric-junqueira/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-slate-200 transition-colors hover:text-slate-400"
        >
          <Icons.linkedin className="h-5 w-5" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
};

export default Recommendations;

const testimonials = [
  {
    id: 0,
    title: 'Progressive growth',
    content: `"I had the great opportunity to work with Eric at Grupo Portfolio, and it was incredible to see his progress in software development projects. In terms of both technical skills and behavior, Eric has always been a committed and studious professional who always strives for high quality in everything he does (in all his deliveries)."`,
    author: 'Thiago S.',
    role: 'Product Manager at Grupo Portfolio',
    bgColor: 'bg-amber-700',
  },
  {
    id: 1,
    title: 'Smart Collaboration',
    content: `"Eric was a developer on my squad at Big Brain and from the beginning he demonstrated excellent communication, concern for the product and the quality of his work."`,
    author: 'Heloísa G.',
    role: 'Product Owner at  Big Brain',
    bgColor: 'bg-red-700',
  },
  {
    id: 2,
    title: 'Ownership!',
    content: `"Eric was one of my first colleagues when I started working in software development. What caught my attention the most about his way of working and planning was his search for the best technologies and methodologies on the market and his focus on creating scalable applications that could always evolve."`,
    author: 'Gabriel A.',
    role: 'Software Developer at Grupo Portfolio',
    bgColor: 'bg-purple-700',
  },
];
