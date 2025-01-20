interface NavigationDotsProps {
  sections: string[];
  activeSection: string;
}

export default function NavigationDots({
  sections,
  activeSection,
}: NavigationDotsProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 space-y-4">
      {sections.map((sectionId) => (
        <a
          key={sectionId}
          href={`#${sectionId}`}
          className={`block h-3 w-3 rounded-full border border-gray-400 transition-colors ${
            activeSection === sectionId ? 'bg-blue-300' : 'bg-transparent'
          }`}
          aria-label={`Navigate to ${sectionId} section`}
        />
      ))}
    </div>
  );
}
