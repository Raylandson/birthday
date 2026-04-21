import { useState, useRef, useEffect, useMemo } from 'react';
import { Flower } from './Flower';
import { messages } from '../data/messages';
import { motion, AnimatePresence } from 'framer-motion';

// Componente para a explosão final de "confetes" em forma de pétalas azuis
const PetalExplosion = () => {
  const COLORS = ['#DBEAFE', '#E0F2FE', '#BAE6FD', '#BFDBFE'];
  
  // Gerando os valores aleatórios no useMemo uma só vez pra não recriar do zero em re-renders isolados
  const petals = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 80 + Math.random() * 200; // força da explosão
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        rotation: Math.random() * 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 10 + 8, // tamanhos variados entre 8px e 18px
        duration: 1.5 + Math.random() * 1.5,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute shadow-sm"
          style={{
            width: p.size,
            height: p.size * 1.5,
            backgroundColor: p.color,
            borderBottomRightRadius: '50% 100%',
            borderTopLeftRadius: '50% 100%',
          }}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{
            scale: [0, 1, 0.5],
            x: [0, p.x],
            y: [0, p.y + (Math.random() * 50)], // Dá uma certa gravidade à queda
            rotate: p.rotation,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

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
          <div key={msg.id} className="flex flex-col items-center w-full relative">
            
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
              
              {/* Confete de pétalas azuis se for a última flor sendo aberta */}
              {openedCount === messages.length && index === messages.length - 1 && (
                <PetalExplosion />
              )}
            </motion.div>
          </div>
        ))}
      </AnimatePresence>
      
      {/* Referência invisível no fundo pra ajudar no scroll em telas menores */}
      <div ref={bottomRef} className="h-8 w-full" />
    </div>
  );
};
