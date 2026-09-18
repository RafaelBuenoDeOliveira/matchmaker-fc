import React from 'react';

export default function ListaJogadores({ jogadores, removerJogador, iniciarEdicao }) {
  if (jogadores.length === 0) return <p className="text-center text-gray-500 mt-8 font-medium">O elenco está vazio!</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Elenco Cadastrado ({jogadores.length})</h2>
      <div className="space-y-4">
        {jogadores.map((jogador, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-600 flex justify-between items-center">
            <div>
              <p className="font-bold text-lg text-gray-800">{jogador.nome}</p>
              <p className="text-sm text-blue-600 font-bold mb-1">
                {jogador.posicoes ? jogador.posicoes.join(' / ') : 'Sem Posição Registada'}
              </p>
              <p className="text-xs text-gray-500">
                Vel: {jogador.notas.velocidade} | Fôl: {jogador.notas.folego} | Mar: {jogador.notas.marcacao}
              </p>
            </div>
            
            {/* Adicionámos os dois botões agrupados */}
            <div className="flex gap-2">
              <button onClick={() => iniciarEdicao(index)} className="text-blue-500 hover:text-blue-700 font-semibold px-3 py-1 border border-blue-500 rounded hover:bg-blue-50 transition">
                Editar
              </button>
              <button onClick={() => removerJogador(index)} className="text-red-500 hover:text-red-700 font-semibold px-3 py-1 border border-red-500 rounded hover:bg-red-50 transition">
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}