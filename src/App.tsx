import { FallingPetals } from './components/FallingPetals';
import { FlowerGarden } from './components/FlowerGarden';
import './App.css'; // Mantenha isso caso hajam estilos base globais necessários do Tailwind

function App() {
  return (
    <div className="relative w-full min-h-screen bg-slate-50 overflow-x-clip">
      <FallingPetals />
      
      {/* Container principal para o conteúdo por cima dos efeitos de fundo */}
      <main className="relative z-10 flex flex-col items-center pt-24 pb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold z-50 text-blue-950 drop-shadow-md tracking-wider">
          Feliz Aniversário!
        </h1>
        <FlowerGarden />
      </main>
    </div>
  );
}

export default App;
