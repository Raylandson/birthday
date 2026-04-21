import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Função para gerar um número aleatório
const random = (min: number, max: number) => Math.random() * (max - min) + min;

interface Petal {
  id: number;
  xStart: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  rotationStart: number;
  rotationEnd: number;
  xEndOffset: number;
}

const COLORS = ['#DBEAFE', '#E0F2FE', '#BAE6FD', '#BFDBFE']; // Tons pastéis azuis e celestes

export const FallingPetals = () => {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    // Gerar 30 pétalas com valores iniciais aleatórios
    const generatedPetals = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      xStart: random(0, 100), // posição X inicial (vw)
      size: random(8, 16), // tamanho da pétala (px)
      duration: random(5, 12), // duração da queda (s)
      delay: random(0, 5), // delay inicial (s)
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotationStart: random(0, 360), // rotação inicial
      rotationEnd: random(0, 360) + 360 * (Math.random() > 0.5 ? 1 : -1), // rotação final (aleatória dir/esq)
      xEndOffset: random(-15, 15), // desvio no eixo X final (simulando vento)
    }));
    
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute rounded-full"
          style={{
            width: petal.size,
            height: petal.size * 1.5, // Levemente oval (pétala)
            backgroundColor: petal.color,
            left: `${petal.xStart}vw`,
            top: -50,
            opacity: 0.8,
            borderBottomRightRadius: '50% 100%',
            borderTopLeftRadius: '50% 100%',
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [`0vw`, `${petal.xEndOffset}vw`],
            rotate: [petal.rotationStart, petal.rotationEnd],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
