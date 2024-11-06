import { Icons } from '@/icons';

const ContactsContainer = () => {
  return (
    <div className="absolute bottom-0 left-16">
      <div className="flex flex-row space-x-8">
        <div className="flex flex-col items-center justify-end space-y-4">
          <div className="space-y-4">
            <a
              href="https://www.linkedin.com/in/eric-junqueira/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex"
            >
              <Icons.linkedin />
            </a>
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
        <div className="flex flex-col items-center justify-end space-y-[120px]">
          <a href="mailto:ian.developmentbr@gmail.com" aria-label="Send Email">
            <p className="-rotate-90 transform">ian.developmentbr@gmail.com</p>
          </a>
          <div className="h-36 w-0.5 bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default ContactsContainer;
