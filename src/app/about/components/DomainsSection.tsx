import { useState } from 'react';
import { MapPin } from 'lucide-react';

const positions = [
  {
    id: 'social-networks',
    label: 'Social Network',
    name: 'Big Brain',
    designation: 'Full Stack Developer',
    country: 'Brazil',
    url: 'https://grupoportfolio.com.br/portfolio-tech/pinmais/',
  },
  {
    id: 'education',
    label: 'Education',
    name: 'Grupo Portfolio',
    designation: 'Software Development Internship',
    country: 'Brazil',
    url: 'https://bigbrain.com.br/educacao-publica-secretarias-de-educacao-e-universidades/sala-de-aula-conectada/',
  },
  {
    id: 'location-based-software',
    label: 'Location-Based Software',
    name: 'Beakyn',
    designation: 'Full Stack Developer',
    country: 'USA',
    url: 'https://beakyn.com/',
  },
];

const DomainsSection = () => {
  const [selectedPositionId, setSelectedPositionId] = useState<string | null>(
    null,
  );

  const handleMouseEnter = (id: string) => {
    setSelectedPositionId(id);
  };

  const handleMouseLeave = () => {
    setSelectedPositionId(null);
  };

  const handleClick = (e: React.SyntheticEvent, url: string) => {
    e.preventDefault();
    console.log('handleClick', url);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full">
      <ul className="space-y-2">
        {positions.map((item) => (
          <li
            key={item.id}
            id={item.id}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            className={`flex cursor-pointer items-center justify-between rounded-lg p-4 transition-all duration-200 ${
              selectedPositionId === item.id ? 'bg-blue-300' : ''
            }`}
            onClick={(event) => handleClick(event, item.url)}
          >
            <span
              className={`${selectedPositionId === item.id ? 'text-gray-900' : 'text-gray-50'}`}
            >
              {item.label}
            </span>
            <div
              className={`transition-opacity duration-200 ${
                selectedPositionId === item.id ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center text-gray-500">
                  <MapPin size={16} />
                  <span className="ml-1 text-sm">{item.country}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.designation}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DomainsSection;
