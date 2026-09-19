import React, { useState, useEffect } from 'react';
import FormularioJogador from './components/FormularioJogador';
import ListaJogadores from './components/ListaJogadores';
import Sorteio from './components/Sorteio';
import Login from './components/Login';
import PainelMaster from './components/PainelMaster';
import { supabase } from './supabase';

export default function App() {
  const [session, setSession] = useState(null);
  const [perfil, setPerfil] = useState(null);
  
  const [jogadores, setJogadores] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState('elenco');
  const [jogadorEmEdicao, setJogadorEmEdicao] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) buscarPerfil(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        buscarPerfil(session.user.id);
      } else {
        setPerfil(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const buscarPerfil = async (userId) => {
    const { data, error } = await supabase.from('perfis').select('*').eq('id', userId).single();
    if (data) setPerfil(data);
  };

  useEffect(() => {
    if (session) buscarJogadores();
  }, [session]);

  const buscarJogadores = async () => {
    const { data, error } = await supabase.from('jogadores').select('*').order('created_at', { ascending: true });
    if (!error) setJogadores(data || []);
  };

  const handleSalvar = () => {
    buscarJogadores();
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return <Login />;
  }

  if (!perfil) {
    return <div className="min-h-screen flex items-center justify-center">Carregando dados do usuário...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-12">
      <header className="text-center py-6 relative">
        <h1 className="text-4xl font-bold text-blue-600">MatchMaker FC ⚽</h1>
        <p className="text-gray-500 mt-2 font-medium">Gestão de Elenco - Ressaca FC</p>
        
        <div className="absolute top-4 right-4 text-right">
          <p className="text-sm font-bold text-gray-700">Olá, {perfil.nome}</p>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full uppercase mr-2">{perfil.nivel_acesso}</span>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:text-red-700 font-bold underline">Sair</button>
        </div>
      </header>
      
      <div className="flex justify-center mb-6 space-x-4">
        <button onClick={() => setAbaAtiva('elenco')} className={`px-6 py-2 rounded-lg font-bold transition ${abaAtiva === 'elenco' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
          📋 Elenco
        </button>
        
        {/* Aba Sorteio apenas para Master e Admin */}
        {(perfil.nivel_acesso === 'master' || perfil.nivel_acesso === 'admin') && (
          <button onClick={() => setAbaAtiva('sorteio')} className={`px-6 py-2 rounded-lg font-bold transition ${abaAtiva === 'sorteio' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
            🏆 Sortear Times
          </button>
        )}

        {/* Aba de Administração apenas para Master */}
        {perfil.nivel_acesso === 'master' && (
          <button onClick={() => setAbaAtiva('admin')} className={`px-6 py-2 rounded-lg font-bold transition ${abaAtiva === 'admin' ? 'bg-purple-700 text-white shadow-md' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}>
            ⚙️ Painel Master
          </button>
        )}
      </div>

      <main>
        {abaAtiva === 'elenco' && (
          <>
            {/* Esconde o formulário de adição se for apenas mensalista */}
            {(perfil.nivel_acesso === 'master' || perfil.nivel_acesso === 'admin') && (
              <FormularioJogador onSalvar={handleSalvar} jogadorEmEdicao={jogadorEmEdicao} onCancelar={() => setJogadorEmEdicao(null)} />
            )}
            
            {/* Passamos o perfil para a lista saber se desenha os botões ou não */}
            <ListaJogadores jogadores={jogadores} removerJogador={removerJogador} iniciarEdicao={iniciarEdicao} perfil={perfil} />
          </>
        )}

        {abaAtiva === 'sorteio' && (perfil.nivel_acesso === 'master' || perfil.nivel_acesso === 'admin') && (
          <Sorteio elenco={jogadores} />
        )}

        {abaAtiva === 'admin' && perfil.nivel_acesso === 'master' && (
          <PainelMaster />
        )}
      </main>
    </div>
  );
}