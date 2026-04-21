export interface Message {
  id: number;
  text: string;
  budColor: string;
  cardColor: string;
}

export const messages: Message[] = [
  {
    id: 1,
    text: 'Venho desejar um feliz aniversário para a garota mais fofa do mundo.',
    budColor: 'bg-blue-400',
    cardColor: 'bg-blue-50 border border-blue-200',
  },
  {
    id: 2,
    text: 'Você é uma pessoa especial, única e insubstituível.',
    budColor: 'bg-sky-400',
    cardColor: 'bg-sky-50 border border-sky-200',
  },
  {
    id: 3,
    text: 'Que Deus te abençoe e que você nunca perca esse brilho imenso que você tem.',
    budColor: 'bg-cyan-400',
    cardColor: 'bg-cyan-50 border border-cyan-200',
  },
  {
    id: 4,
    text: 'Pode contar comigo para o que você precisar, vou estar aqui por você.',
    budColor: 'bg-blue-400',
    cardColor: 'bg-indigo-50 border border-indigo-200',
  },
];
