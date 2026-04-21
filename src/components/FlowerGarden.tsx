import { useState, useRef, useEffect } from 'react';
import { Flower } from './Flower';
import { messages } from '../data/messages';
import { motion, AnimatePresence } from 'framer-motion';

export const FlowerGarden = () => {
  const [openedCount, setOpenedCount] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setOpenedCount((prev) => prev + 1);
  };

  useEffect(() => {
    // Ao abrir uma nova flor, damos um pequeno tempo para a linha terminar de desenhar 
    // e rolamos suavemente para o fim
    if (openedCount > 0) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 300); // 300ms dá uma margem pro layout do flex expandir com a nova flor sendo inserida
    }
  }, [openedCount]);

  const visibleMessages = messages.slice(0, openedCount + 1);

  return (
    <div className="flex flex-col items-center mt-12 md:mt-20 w-full px-6 pb-32">
      <AnimatePresence mode="popLayout">
        {visibleMessages.map((msg, index) => (
          <div key={msg.id} className="flex flex-col items-center w-full">
            
            {/* O Caminho de Pontinhos Animados (aparece depois do primeiro, por baixo da flor) */}
            {index > 0 && (
              <div className="flex flex-col items-center justify-between h-24 md:h-32 -my-8 md:-my-10 relative z-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-300 opacity-80"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index === openedCount ? i * 0.15 : 0, duration: 0.4 }}
                  />
                ))}
              </div>
            )}

            <motion.div 
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index === openedCount && index > 0 ? 6 * 0.15 : 0.2, duration: 0.6 }}
              className="relative z-10"
            >
              <Flower
                message={msg.text}
                budColor={msg.budColor}
                cardColor={msg.cardColor}
                onOpen={handleOpen}
              />
            </motion.div>
          </div>
        ))}
      </AnimatePresence>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-16 md:mt-24 text-slate-400 font-serif text-xs md:text-sm tracking-[0.2em] uppercase text-center"
      >
        {openedCount === messages.length 
          ? "Todas as sementes floresceram" 
          : `${openedCount} de ${messages.length} lidas`}
      </motion.div>

      {/* Referência invisível no fundo pra ajudar no scroll em telas menores */}
      <div ref={bottomRef} className="h-8 w-full" />
    </div>
  );
};
