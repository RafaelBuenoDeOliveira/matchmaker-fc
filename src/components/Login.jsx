import React, { useState } from 'react';
import { supabase } from '../supabase';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        // Fluxo de entrada
        const { error } = await supabase.auth.signInWithPassword({ email, password: senha });
        if (error) throw error;
      } else {
        // Fluxo de criação de conta
        const { data, error } = await supabase.auth.signUp({ email, password: senha });
        if (error) throw error;
        
        // Assim que cria a autenticação, já grava o perfil como mensalista
        if (data.user) {
          const { error: perfilError } = await supabase.from('perfis').insert([
            { id: data.user.id, nome, email, nivel_acesso: 'mensalista' }
          ]);
          if (perfilError) throw perfilError;

          alert('Conta criada com sucesso! Você já pode entrar.');
          setIsLogin(true); // Volta para a tela de login
        }
      }
    } catch (error) {
      alert('Erro: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">MatchMaker FC ⚽</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          {isLogin ? 'Entrar no Vestiário' : 'Criar o seu Passe'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-bold mb-1">Seu Nome</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required={!isLogin} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          )}
          <div>
            <label className="block text-gray-700 font-bold mb-1">E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-1">Senha (mín. 6 caracteres)</label>
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          
          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
            {loading ? 'A carregar...' : (isLogin ? 'Entrar' : 'Registrar')}
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          {isLogin ? 'Ainda não faz parte do time? ' : 'Já tem o seu cadastro? '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 font-bold hover:underline">
            {isLogin ? 'Criar conta' : 'Fazer Login'}
          </button>
        </p>
      </div>
    </div>
  );
}