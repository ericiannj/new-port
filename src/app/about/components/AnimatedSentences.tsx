'use client';
import { motion } from 'framer-motion';

const sentenceVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedSentences = () => {
  return (
    <div className="m-4 hidden justify-center gap-4 md:flex">
      {sentences.map((sentence, index) => (
        <motion.div
          key={index}
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
          transition={{
            delay: index * 1,
            duration: 0.8,
          }}
        >
          {sentence}
        </motion.div>
      ))}
    </div>
  );
};

const sentences = [
  '💡 Create and Implement Ideas.',
  '🎯 Make Real Impact.',
  '🔋 Strengthen Business.',
  '🫂 Help People.',
];

export default AnimatedSentences;
