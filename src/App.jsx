import React, { useState, useEffect } from 'react';
import FormularioJogador from './components/FormularioJogador';
import ListaJogadores from './components/ListaJogadores';
import Sorteio from './components/Sorteio';
import { supabase } from './supabase';

export default function App() {
  const [jogadores, setJogadores] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('elenco');
  const [jogadorEmEdicao, setJogadorEmEdicao] = useState(null);

  useEffect(() => {
    buscarJogadores();
  }, []);

  const buscarJogadores = async () => {
    const { data, error } = await supabase
      .from('jogadores')
      .select('*')
      .order('created_at', { ascending: true });
    
    if (error) console.error("Erro ao buscar dados:", error);
    else setJogadores(data || []);
  };

  const handleSalvar = () => {
    buscarJogadores(); // Recarrega a lista da base de dados
    setJogadorEmEdicao(null);
  };

  const removerJogador = async (indexParaRemover) => {
    const jogador = jogadores[indexParaRemover];
    if (jogador.id) {
      await supabase.from('jogadores').delete().eq('id', jogador.id);
      buscarJogadores();
    }
  };

  const iniciarEdicao = (index) => {
    setJogadorEmEdicao({ index, jogador: jogadores[index] });
    setAbaAtiva('elenco');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <FormularioJogador onSalvar={handleSalvar} jogadorEmEdicao={jogadorEmEdicao} onCancelar={() => setJogadorEmEdicao(null)} />
            <ListaJogadores jogadores={jogadores} removerJogador={removerJogador} iniciarEdicao={iniciarEdicao} />
          </>
        ) : (
          <Sorteio elenco={jogadores} />
        )}
      </main>
    </div>
  );
}