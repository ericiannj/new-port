'use client';

import { useState } from 'react';
import { MapPin } from 'lucide-react';

const positions = [
  {
    id: 'location-based-software',
    label: 'Location-Based Software',
    name: 'Beakyn',
    designation: 'Full Stack Developer',
    country: 'USA',
    url: 'https://www.linkedin.com/company/beakyn',
  },
  {
    id: 'education',
    label: 'Education',
    name: 'Big Brain',
    designation: 'Full Stack Developer',
    country: 'Brazil',
    url: 'https://bigbrain.com.br',
  },
  {
    id: 'social-networks',
    label: 'Social Network',
    name: 'Grupo Portfolio',
    designation: 'Software Development Internship',
    country: 'Brazil',
    url: 'https://grupoportfolio.com.br/',
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
    <div className="mt-2 w-full">
      <ul>
        {positions.map((item) => (
          <li
            key={item.id}
            id={item.id}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg p-2 transition-all duration-200 ${
              selectedPositionId === item.id ? 'bg-blue-300' : ''
            }`}
            onClick={(event) => handleClick(event, item.url)}
          >
            <div className="flex min-w-0 flex-1 items-baseline gap-x-2">
              <span
                className={`shrink-0 ${selectedPositionId === item.id ? 'text-gray-900' : 'text-gray-50'}`}
                aria-hidden
              >
                •
              </span>
              <span
                className={`min-w-0 text-pretty ${selectedPositionId === item.id ? 'text-gray-900' : 'text-gray-50'}`}
              >
                {item.label}
              </span>
            </div>
            <div
              className={
                selectedPositionId === item.id
                  ? 'flex shrink-0 items-center'
                  : 'hidden'
              }
            >
              <div className="flex items-center gap-2 whitespace-nowrap">
                <div className="flex items-center text-gray-900">
                  <MapPin size={14} />
                  <span className="ml-1 text-xs">{item.country}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-600">{item.designation}</p>
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
