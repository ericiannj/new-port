import { ReactNode } from 'react';

type AboutSectionProps = {
  id: string;
  bgColor: string;
  children: ReactNode;
};

const AboutSection = ({ id, bgColor, children }: AboutSectionProps) => {
  return (
    <section
      id={id}
      className={`flex min-h-screen w-full items-center justify-center ${bgColor}`}
    >
      <div className="w-full max-w-4xl p-8">{children}</div>
    </section>
  );
};

export default AboutSection;
