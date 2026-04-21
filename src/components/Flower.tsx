import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlowerProps {
  message: string;
  budColor: string;
  cardColor: string;
  onOpen: () => void;
}

export const Flower = ({ message, budColor, cardColor, onOpen }: FlowerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (!hasOpened) {
        setHasOpened(true);
        onOpen();
      }
    }
  };

  return (
    <div 
      className={`flex items-center justify-center w-48 h-48 md:w-56 md:h-56 relative ${!isOpen ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        animate={isOpen ? "open" : "closed"}
      >
        {/* As Pétalas (Background) reestruradas usando variants */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={index}
            variants={{
              closed: { 
                scale: [0.4, 0.43, 0.4], 
                rotate: index * 45 - 15, // Leve torção para parecer um miolo fechado
                opacity: 0.9,
                transition: { scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }
              },
              open: { 
                scale: 1, 
                rotate: index * 45, 
                opacity: 1,
                transition: { 
                  type: "spring", 
                  stiffness: 100, 
                  damping: 15, 
                  delay: index * 0.04 
                } 
              }
            }}
            className={`absolute w-12 h-24 md:w-16 md:h-28 rounded-t-full rounded-b-md origin-bottom ${cardColor}`}
            style={{ bottom: "50%" }}
          />
        ))}
        
        {/* Usamos AnimatePresence sem 'mode="wait"' para que o centro transite junto com a abertura */}
        <AnimatePresence>
          {!isOpen ? (
            <motion.div
              key="bud-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: [1, 1.05, 1], 
                opacity: 1,
                transition: { scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }
              }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.2 } }}
              className={`absolute z-20 shadow-sm hover:shadow-md transition-shadow rounded-full w-12 h-12 md:w-16 md:h-16 ${budColor}`}
            />
          ) : (
            <motion.div
              key="text-card"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
              className="absolute z-10 bg-white/95 rounded-full w-40 h-40 md:w-48 md:h-48 shadow-sm flex items-center justify-center p-4 md:p-6"
            >
              <p className="text-slate-800 font-serif text-center text-sm md:text-base leading-relaxed tracking-wide">
                {message}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
