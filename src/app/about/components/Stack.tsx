import Image from 'next/image';
import { motion } from 'framer-motion';
import { tools } from '@/assets/icons/Tools';

const Stack = () => {
  const headingVariants = {
    hover: {
      x: [10, 30, 10],
      scale: 1.02,
      transition: {
        x: {
          repeat: Infinity,
          duration: 1.5,
          ease: 'easeInOut',
        },
        scale: {
          duration: 0.2,
          ease: 'easeOut',
        },
      },
    },
  };

  return (
    <div className="overflow-y-auto">
      <div className="flex justify-center">
        <motion.h1
          className="mb-4 cursor-pointer text-fluid-4xl font-bold"
          whileHover="hover"
          variants={headingVariants}
        >
          My Stack
        </motion.h1>
      </div>
      <div className="flex flex-col flex-wrap gap-4">
        {tools.map((toolsGroup) => (
          <div key={toolsGroup.category} className="flex flex-col">
            <h3 className="mb-2">{toolsGroup.category}</h3>
            <div className="flex gap-4">
              {toolsGroup.tools.map((tool) => (
                <motion.div
                  className="relative flex flex-col items-center"
                  key={tool.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white blur-md"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 0.2 }}
                      transition={{ duration: 0.2 }}
                    />
                    <motion.div
                      className="relative z-10"
                      initial={{ filter: 'brightness(1)' }}
                      whileHover={{ filter: 'brightness(1.3)' }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        height={40}
                        width={40}
                        alt={tool.name}
                        src={tool.icon}
                      />
                    </motion.div>
                  </div>
                  <span className="mt-2 text-xs">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stack;
