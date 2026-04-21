export interface Message {
  id: number;
  text: string;
  budColor: string;
  cardColor: string;
}

export const messages: Message[] = [
  {
    id: 1,
    text: 'Você é a luz do meu dia!',
    budColor: 'bg-blue-400',
    cardColor: 'bg-blue-50 border border-blue-200',
  },
  {
    id: 2,
    text: 'Você é muuuito incrível, carinhosa, brilhante, linda, inteligente.',
    budColor: 'bg-sky-400',
    cardColor: 'bg-sky-50 border border-sky-200',
  },
  {
    id: 3,
    text: 'Um novo ciclo cheio de paz, amor e descobertas incríveis.',
    budColor: 'bg-cyan-400',
    cardColor: 'bg-cyan-50 border border-cyan-200',
  },
  {
    id: 4,
    text: 'Que a serenidade acompanhe todos os seus passos neste ano.',
    budColor: 'bg-indigo-400',
    cardColor: 'bg-indigo-50 border border-indigo-200',
  },
  {
    id: 5,
    text: 'Nunca perca essa essência doce que transforma tudo ao redor.',
    budColor: 'bg-teal-400',
    cardColor: 'bg-teal-50 border border-teal-200',
  },
  {
    id: 6,
    text: 'Muitas felicidades, saúde e um caminho adornado de flores.',
    budColor: 'bg-blue-500',
    cardColor: 'bg-blue-100 border border-blue-300',
  }
];
