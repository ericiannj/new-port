'use client';

import { Icons } from '@/icons';
import { motion } from 'framer-motion';

const ContactsContainer = () => {
  return (
    <motion.div
      className="absolute bottom-0 left-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-row">
        <div className="flex flex-col items-center justify-end space-y-4">
          <div className="space-y-4">
            <div className="flex cursor-pointer">
              <a
                href="https://www.linkedin.com/in/eric-junqueira/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Icons.linkedin />
              </a>
            </div>
            <a
              href="https://github.com/ericiannj"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex"
            >
              <Icons.github />
            </a>
          </div>
          <div className="h-36 w-0.5 bg-slate-200" />
        </div>
        <div className="ml-[-50px] flex flex-col items-center justify-end space-y-[120px]">
          <a href="mailto:ian.developmentbr@gmail.com" aria-label="Send Email">
            <p className="-rotate-90 transform">ian.developmentbr@gmail.com</p>
          </a>
          <div className="h-36 w-0.5 bg-slate-200" />
        </div>
      </div>
    </motion.div>
  );
};

export default ContactsContainer;
