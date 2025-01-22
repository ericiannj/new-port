import Image from 'next/image';
import StyledComponentsImage from '../../../assets/images/styled-comp.svg';

const Stack = () => {
  return (
    <div className="overflow-y-auto">
      <h1 className="mb-4 text-fluid-4xl font-bold">My Stack</h1>
      <div className="flex flex-col flex-wrap gap-4">
        {tools.map((toolsGroup) => (
          <div key={toolsGroup.category} className="flex flex-col">
            <h3 className="mb-2">{toolsGroup.category}</h3>
            <div className="flex gap-4">
              {toolsGroup.tools.map((tool) => (
                <div className="flex flex-col items-center" key={tool.name}>
                  <Image
                    height={40}
                    width={40}
                    alt={tool.name}
                    src={tool.icon}
                  />
                  <span className="text-xs">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stack;

const tools = [
  {
    category: 'The Fundamentals',
    tools: [
      {
        name: 'HTML',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
      },
      {
        name: 'CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
      },
      {
        name: 'JavaScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      },
    ],
  },
  {
    category: 'Front-end Focus',
    tools: [
      {
        name: 'TypeScript',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      },
      {
        name: 'React.JS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      },
      {
        name: 'Next.JS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
      },
      {
        name: 'Tailwind CSS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
      },
      {
        name: 'Styled Components',
        icon: StyledComponentsImage,
      },
      {
        name: 'Sass',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
      },
      {
        name: 'Material UI',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg',
      },
      {
        name: 'Framer Motion',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg',
      },
      {
        name: 'GraphQL',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/graphql/graphql-plain.svg',
      },
      {
        name: 'Jest',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg',
      },
      {
        name: 'Cypress',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg',
      },
    ],
  },
  {
    category: 'Back-end',
    tools: [
      {
        name: 'Node.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      },
      {
        name: 'Express.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg',
      },
      {
        name: 'Nest.js',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nestjs/nestjs-original.svg',
      },
      {
        name: 'Go',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg',
      },
      {
        name: 'AWS',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
      },
      {
        name: 'Firebase',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain-wordmark.svg',
      },
    ],
  },
];
