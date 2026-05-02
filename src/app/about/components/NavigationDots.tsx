type Section = {
  id: 'summary' | 'achievements' | 'stack' | 'recommendations' | 'perspectives';
  bgColor: string;
};

interface NavigationDotsProps {
  sections: readonly Section[];
  activeSection: Section['id'];
}

export default function NavigationDots({
  sections,
  activeSection,
}: NavigationDotsProps) {
  return (
    <div className="pointer-events-none fixed top-1/2 right-[max(0.625rem,env(safe-area-inset-right))] z-[45] flex -translate-y-1/2 flex-col items-center gap-4 px-2 sm:right-8 sm:px-0 [&>a]:pointer-events-auto">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`block h-3 w-3 rounded-full border border-gray-400 transition-colors duration-300 hover:border-blue-400 ${
            activeSection === section.id
              ? 'border-blue-300 bg-blue-300'
              : 'bg-transparent'
          }`}
          aria-label={`Navigate to ${section.id} section`}
        />
      ))}
    </div>
  );
}
