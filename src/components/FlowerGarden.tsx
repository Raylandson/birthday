import { useState } from 'react';
import { Flower } from './Flower';
import { messages } from '../data/messages';
import { motion } from 'framer-motion';

export const FlowerGarden = () => {
  const [openedCount, setOpenedCount] = useState(0);

  const handleOpen = () => {
    setOpenedCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center mt-12 md:mt-20 w-full px-6">
      <motion.div 
        layout 
        className="grid grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14 place-items-center justify-items-center"
      >
        {messages.map((msg, index) => (
          <motion.div 
            key={msg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 + 0.5, duration: 0.6 }}
          >
            <Flower
              message={msg.text}
              budColor={msg.budColor}
              cardColor={msg.cardColor}
              onOpen={handleOpen}
            />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-16 md:mt-24 text-slate-400 font-serif text-xs md:text-sm tracking-[0.2em] uppercase"
      >
        {openedCount === messages.length 
          ? "Todas as sementes floresceram" 
          : `${openedCount} de ${messages.length} lidas`}
      </motion.div>
    </div>
  );
};
