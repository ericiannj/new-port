import { ReactNode } from 'react';

type AboutSectionProps = {
  id: string;
  bgColor: string;
  children: ReactNode;
  /** Tall sections scroll "full viewport"; shorter last sections avoid huge empty gaps above the footer. */
  variant?: 'tall' | 'auto';
};

const AboutSection = ({
  id,
  bgColor,
  children,
  variant = 'tall',
}: AboutSectionProps) => {
  const sizing =
    variant === 'auto'
      ? 'min-h-0 w-full items-start justify-center pt-16 pb-8 md:pb-10 md:pt-20'
      : 'min-h-[90vh] w-full items-center justify-center';

  return (
    <section id={id} className={`flex ${sizing} ${bgColor}`}>
      {/* Extra inline-end gutter on smaller viewports only so fixed nav dots do not overlap text */}
      <div className="w-full max-w-4xl py-8 pr-11 pl-8 sm:pr-12 lg:p-8">
        {children}
      </div>
    </section>
  );
};

export default AboutSection;
