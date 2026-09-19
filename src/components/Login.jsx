import React, { useState } from 'react';
import { supabase } from '../supabase';
import escudo from '../assets/escudo.png';

export default function Login() {
  const [view, setView] = useState('home');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (view === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
      } else if (view === 'register') {
        const { data, error } = await supabase.auth.signUp({ email, password: senha });
        if (error) throw error;

        if (data.user) {
          const { error: perfilError } = await supabase.from('perfis').insert([
            { id: data.user.id, nome, email, nivel_acesso: 'mensalista' }
          ]);
          if (perfilError) throw perfilError;

          alert('Conta criada com sucesso! Já pode entrar.');
          setView('login');
        }
      }
    } catch (error) {
      alert('Erro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full px-4 py-3 bg-[#2a2a2a]/90 text-white border border-gray-500 rounded-lg focus:ring-1 focus:ring-red-600 outline-none transition-all placeholder-gray-400 [&:-webkit-autofill]:[box-shadow:0_0_0px_1000px_#2a2a2a_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:white]";

  return (
    <div className="relative min-h-screen bg-[#1a1c23] flex flex-col font-sans overflow-hidden">
      
      {/* Imagem de Fundo - Opacidade aumentada para 75% para acender o estádio */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=1000&auto=format&fit=crop')" }}
      ></div>
      
      {/* Gradiente ajustado: Topo transparente, base escura para dar leitura aos botões */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/70 to-transparent"></div>

      {/* Conteúdo Central */}
      <div className="relative z-10 flex-1 flex flex-col p-6 pb-12">
        
        {/* Escudo e Título */}
        <div className="text-center pt-12 mb-auto flex flex-col items-center">
          <img 
            src={escudo} 
            alt="Escudo MatchMaker FC" 
            className="w-40 h-40 object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.6)] mb-2"
          />
          <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-lg">
            MatchMaker <span className="text-red-600">FC</span>
          </h1>
          <p className="text-gray-200 mt-2 text-sm font-medium drop-shadow-md">A evolução do seu futebol começa aqui.</p>
        </div>

        {view === 'home' && (
          <div className="w-full max-w-sm mx-auto space-y-4 transition-opacity">
            <button 
              onClick={() => setView('register')} 
              className="w-full bg-red-600 text-white font-bold text-base py-3.5 rounded-xl hover:bg-red-700 transition-colors shadow-[0_4px_15px_rgba(220,38,38,0.5)]"
            >
              Novo por aqui?
            </button>
            <button 
              onClick={() => setView('login')} 
              className="w-full bg-black/40 backdrop-blur-md border border-white/30 text-white font-bold text-base py-3.5 rounded-xl hover:bg-black/60 transition-all shadow-lg"
            >
              Já sou membro
            </button>
          </div>
        )}

        {view !== 'home' && (
          <div className="w-full max-w-sm mx-auto bg-black/60 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-gray-600/50 transition-all">
            <button onClick={() => setView('home')} className="text-gray-300 text-sm mb-6 flex items-center gap-1 hover:text-white transition-colors">
              ← Voltar
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">
              {view === 'login' ? 'Entrar na Conta' : 'Criar Perfil'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {view === 'register' && (
                <div>
                  <label className="block text-gray-300 text-[10px] uppercase tracking-wider font-bold mb-1 ml-1 drop-shadow-sm">Nome Completo</label>
                  <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required className={inputClasses} placeholder="Ex: Rafael Bueno" />
                </div>
              )}
              <div>
                <label className="block text-gray-300 text-[10px] uppercase tracking-wider font-bold mb-1 ml-1 drop-shadow-sm">E-mail</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputClasses} placeholder="seu@email.com" />
              </div>
              <div>
                <label className="block text-gray-300 text-[10px] uppercase tracking-wider font-bold mb-1 ml-1 drop-shadow-sm">Senha</label>
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required className={inputClasses} placeholder="Mínimo 6 caracteres" />
              </div>
              
              <button type="submit" disabled={loading} className="w-full mt-4 bg-red-600 text-white font-bold text-base py-3.5 rounded-xl hover:bg-red-700 transition-colors shadow-lg">
                {loading ? 'A carregar...' : (view === 'login' ? 'Entrar no Vestiário' : 'Cadastrar')}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}