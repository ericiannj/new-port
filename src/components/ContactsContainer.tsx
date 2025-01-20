'use client';
import { Icons } from '@/icons';
import { motion } from 'framer-motion';

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

const ContactIcon = ({ href, icon, label }: ContactIconProps) => (
  <div className="cursor-pointer">
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {icon}
    </a>
  </div>
);
