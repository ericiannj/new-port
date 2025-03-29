'use client';
import { Icons } from '@/icons';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';

const ContactsContainer = () => {
  return (
    <motion.div
      className="left-16 md:fixed md:bottom-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex justify-center space-x-4 md:mb-0 md:flex-col md:items-center md:justify-end md:space-x-0 md:space-y-4">
        <ContactIcon
          href="/resume.pdf"
          icon={<Icons.resume />}
          label="My resume"
        />
        <ContactIcon
          href="mailto:ian.developmentbr@gmail.com"
          icon={<Icons.mail />}
          label="Send Email"
        />
        <ContactIcon
          href="https://www.linkedin.com/in/eric-junqueira/"
          icon={<Icons.linkedin />}
          label="LinkedIn Profile"
        />
        <ContactIcon
          href="https://github.com/ericiannj"
          icon={<Icons.github />}
          label="GitHub Profile"
        />
        <div className="hidden h-24 w-0.5 space-y-4 bg-slate-200 md:flex" />
      </div>
    </motion.div>
  );
};

export default ContactsContainer;

type ContactIconProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
};

const ContactIcon = ({ href, icon, label }: ContactIconProps) => {
  const [showToolTip, setShowToolTip] = useState(false);

  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );

  const translateX = useSpring(
    useTransform(x, [-100, 100], [-75, 75]),
    springConfig,
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const halfWidth = event.currentTarget.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={() => setShowToolTip(true)}
      onMouseLeave={() => setShowToolTip(false)}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        onMouseMove={handleMouseMove}
      >
        {icon}
      </a>
      <AnimatePresence mode="wait">
        {!!showToolTip && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: 'spring',
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: -20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: 'nowrap',
            }}
            className="text-md absolute left-8 z-50 rounded-lg bg-slate-900 px-2 py-1 shadow-xl"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
