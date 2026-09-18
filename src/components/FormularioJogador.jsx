import React, { useState, useEffect } from 'react';
import { habilidades } from '../utils/habilidades';

export default function FormularioJogador({ onSalvar, jogadorEmEdicao, onCancelar }) {
  const notasIniciais = {
    folego: 5, velocidade: 5, finalizacao: 5, passe: 5, marcacao: 5,
    drible: 5, forca: 5, posicionamento: 5, reacao: 5, goleiro: 1
  };

  const [nome, setNome] = useState('');
  const [posicao1, setPosicao1] = useState('Zagueiro');
  const [posicao2, setPosicao2] = useState('');
  const [notas, setNotas] = useState(notasIniciais);

  // AS NOVAS POSIÇÕES DA SUA PELADA AQUI:
  const opcoesPosicao = ['Goleiro', 'Zagueiro', 'Meio-Campo', 'Atacante de Lado', 'Pivô'];

  useEffect(() => {
    if (jogadorEmEdicao) {
      const jogador = jogadorEmEdicao.jogador;
      setNome(jogador.nome);
      const posicoesSeguras = jogador.posicoes || []; 
      setPosicao1(posicoesSeguras[0] || 'Zagueiro');
      setPosicao2(posicoesSeguras[1] || '');
      setNotas(jogador.notas);
    } else {
      resetarFormulario();
    }
  }, [jogadorEmEdicao]);

  const resetarFormulario = () => {
    setNome('');
    setPosicao1('Zagueiro');
    setPosicao2('');
    setNotas(notasIniciais);
  };

  const handleChange = (id, valor) => {
    setNotas({ ...notas, [id]: parseInt(valor) });
  };

  const salvarJogador = (e) => {
    e.preventDefault();
    onSalvar({ 
      nome, 
      posicoes: [posicao1, posicao2].filter(p => p !== ''), 
      notas 
    });
    resetarFormulario();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-6 transition-all">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {jogadorEmEdicao ? '✏️ Editar Jogador' : 'Adicionar Jogador'}
      </h2>
      
      <form onSubmit={salvarJogador}>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Nome do Jogador</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Rafael" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Posição Principal</label>
            <select value={posicao1} onChange={(e) => setPosicao1(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-white">
              {opcoesPosicao.map(pos => <option key={pos} value={pos}>{pos}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-bold mb-2">Posição Secundária (Opcional)</label>
            <select value={posicao2} onChange={(e) => setPosicao2(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-white">
              <option value="">Nenhuma</option>
              {opcoesPosicao.map(pos => <option key={pos} value={pos}>{pos}</option>)}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {habilidades.map((hab) => (
            <div key={hab.id} className="bg-gray-50 p-3 rounded border border-gray-200">
              <label className="flex justify-between font-semibold text-gray-700 mb-2">
                <span>{hab.nome}</span>
                <span className="text-blue-600 font-bold">{notas[hab.id]}</span>
              </label>
              <input type="range" min="1" max="10" value={notas[hab.id]} onChange={(e) => handleChange(hab.id, e.target.value)} className="w-full cursor-pointer accent-blue-600" />
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 shadow-md">
            {jogadorEmEdicao ? 'Atualizar Jogador' : 'Guardar no Plantel'}
          </button>
          
          {jogadorEmEdicao && (
            <button type="button" onClick={onCancelar} className="flex-1 bg-gray-400 text-white font-bold py-3 rounded-lg hover:bg-gray-500 shadow-md">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}