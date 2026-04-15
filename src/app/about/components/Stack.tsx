import Image from 'next/image';
import { tools } from '@/assets/icons/Tools';

const Stack = () => {
  return (
    <div className="overflow-y-auto">
      <div className="flex justify-center">
        <h1 className="text-fluid-4xl mb-4 cursor-pointer font-bold transition-transform duration-200 ease-out hover:translate-x-2 hover:scale-[1.02]">
          My Stack
        </h1>
      </div>
      <div className="flex flex-col flex-wrap gap-4">
        {tools.map((toolsGroup) => (
          <div key={toolsGroup.category} className="flex flex-col">
            <h3 className="mb-2">{toolsGroup.category}</h3>
            <div className="flex gap-4">
              {toolsGroup.tools.map((tool) => (
                <div
                  className="hover-scale hover-glow relative flex flex-col items-center"
                  key={tool.name}
                >
                  <div className="relative z-10">
                    <Image
                      height={40}
                      width={40}
                      alt={tool.name}
                      src={tool.icon}
                    />
                  </div>
                  <span className="mt-2 text-xs">{tool.name}</span>
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
