import React, { useState, useEffect } from 'react';
import FormularioJogador from './components/FormularioJogador';
import ListaJogadores from './components/ListaJogadores';
import Sorteio from './components/Sorteio';

function App() {
  const [jogadores, setJogadores] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('elenco');
  const [jogadorEmEdicao, setJogadorEmEdicao] = useState(null);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('elencoRessacaFC');
    if (dadosSalvos) {
      setJogadores(JSON.parse(dadosSalvos));
    }
  }, []);

  const salvarJogador = (dadosJogador) => {
    let novaLista = [...jogadores];
    if (jogadorEmEdicao !== null) {
      // Se estava a editar, atualiza a posição exata na lista
      novaLista[jogadorEmEdicao.index] = dadosJogador;
      setJogadorEmEdicao(null); // Limpa o modo de edição
    } else {
      // Se não, adiciona um novo ao final
      novaLista.push(dadosJogador);
    }
    setJogadores(novaLista);
    localStorage.setItem('elencoRessacaFC', JSON.stringify(novaLista));
  };

  const removerJogador = (indexParaRemover) => {
    const novaLista = jogadores.filter((_, index) => index !== indexParaRemover);
    setJogadores(novaLista);
    localStorage.setItem('elencoRessacaFC', JSON.stringify(novaLista));
  };

  // Função nova: Pega os dados do jogador clicado e rola a tela para o topo
  const iniciarEdicao = (index) => {
    setJogadorEmEdicao({ index, jogador: jogadores[index] });
    setAbaAtiva('elenco');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setJogadorEmEdicao(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-12">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-blue-600">MatchMaker FC ⚽</h1>
        <p className="text-gray-500 mt-2 font-medium">Gestão de Elenco - Ressaca FC</p>
      </header>
      
      <div className="flex justify-center mb-6 space-x-4">
        <button onClick={() => setAbaAtiva('elenco')} className={`px-6 py-2 rounded-lg font-bold transition ${abaAtiva === 'elenco' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
          📋 Gerenciar Elenco
        </button>
        <button onClick={() => setAbaAtiva('sorteio')} className={`px-6 py-2 rounded-lg font-bold transition ${abaAtiva === 'sorteio' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
          🏆 Sortear Times
        </button>
      </div>

      <main>
        {abaAtiva === 'elenco' ? (
          <>
            <FormularioJogador 
              onSalvar={salvarJogador} 
              jogadorEmEdicao={jogadorEmEdicao} 
              onCancelar={cancelarEdicao} 
            />
            <ListaJogadores 
              jogadores={jogadores} 
              removerJogador={removerJogador} 
              iniciarEdicao={iniciarEdicao} 
            />
          </>
        ) : (
          <Sorteio />
        )}
      </main>
    </div>
  );
}

export default App;