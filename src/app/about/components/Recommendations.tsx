'use client';

import { useState } from 'react';
import { Icons } from '@/icons';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Recommendations = () => {
  const [startIndex, setStartIndex] = useState(0);

  const visibleCount = 3;
  const maxStart = testimonials.length - visibleCount;

  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? maxStart : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === maxStart ? 0 : prev + 1));
  };

  const visibleTestimonials = testimonials.slice(
    startIndex,
    startIndex + visibleCount,
  );

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
          {visibleTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col items-center transition-opacity duration-300"
            >
              <div
                className={`${testimonial.bgColor} hover-card relative mb-8 flex h-80 flex-col rounded-lg p-6 shadow-lg`}
              >
                <h3 className="mb-4 text-center text-xl font-semibold text-white">
                  {testimonial.title}
                </h3>
                <p className="mb-6 grow overflow-hidden text-sm text-white">
                  {testimonial.content}
                </p>
                <div
                  className={`${testimonial.bgColor} absolute -bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rotate-45 transform`}
                />
              </div>
              <div className="flex flex-col items-center">
                <div
                  role="img"
                  aria-label={`${testimonial.author} avatar placeholder`}
                  className="h-12 w-12 overflow-hidden rounded-full bg-gray-300"
                >
                  <Icons.about className="h-full w-full" aria-hidden="true" />
                </div>
                <p className="mt-2 font-semibold">{testimonial.author}</p>
                <p className="text-xs text-gray-200">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-4">
        <button
          className="rounded-full bg-gray-800/50 p-1.5 transition-all hover:bg-gray-800/70"
          onClick={handlePrevious}
          aria-label="Previous testimonials"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          className="rounded-full bg-gray-800/50 p-1.5 transition-all hover:bg-gray-800/70"
          onClick={handleNext}
          aria-label="Next testimonials"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
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
    title: 'Leadership & Innovation',
    content: `"I've had the pleasure of managing Eric at Beakyn, and he's been an essential part of our success across multiple projects. Always curious, proactive, and eager to learn (...) a leading voice in our team discussions on AI, exploring new ways to apply these technologies to real-world challenges."`,
    author: 'Juan P.',
    role: 'CEO at Beakyn',
    bgColor: 'bg-blue-700',
  },
  {
    id: 1,
    title: 'Excellent Learning Skill',
    content: `"It was Eric's first point of contact at Beakyn (...) During this onboarding period, Eric demonstrated an excellent learning skill, grasping new concepts with impressive speed. He consistently applied what he learned effectively (...) a valuable asset to any team."`,
    author: 'Abraão A.',
    role: 'Senior Software Engineer at Beakyn',
    bgColor: 'bg-emerald-700',
  },
  {
    id: 2,
    title: 'Progressive growth',
    content: `"I had the great opportunity to work with Eric at Grupo Portfolio, and it was incredible to see his progress (...) Eric has always been a committed and studious professional who always strives for high quality in everything he does."`,
    author: 'Thiago S.',
    role: 'Product Manager at Grupo Portfolio',
    bgColor: 'bg-amber-700',
  },
  {
    id: 3,
    title: 'Smart Collaboration',
    content: `"Eric was a developer on my squad at Big Brain and from the beginning he demonstrated excellent communication, concern for the product and the quality of his work."`,
    author: 'Heloísa G.',
    role: 'Product Owner at Big Brain',
    bgColor: 'bg-red-700',
  },
  {
    id: 4,
    title: 'Ownership!',
    content: `"What caught my attention the most about Eric was his search for the best technologies and methodologies on the market and his focus on creating scalable applications that could always evolve."`,
    author: 'Gabriel A.',
    role: 'Software Developer at Grupo Portfolio',
    bgColor: 'bg-purple-700',
  },
];
