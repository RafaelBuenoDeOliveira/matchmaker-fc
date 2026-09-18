import React from 'react';

export default function ListaJogadores({ jogadores, removerJogador, iniciarEdicao }) {
  if (jogadores.length === 0) return <p className="text-center text-gray-500 mt-8 font-medium">O elenco está vazio ou a carregar!</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Elenco na Nuvem ({jogadores.length})</h2>
      <div className="space-y-4">
        {jogadores.map((jogador, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-600 flex justify-between items-center">
            
            <div className="flex items-center gap-4">
              {/* Mostra a foto se existir, caso contrário mostra um círculo com a inicial */}
              {jogador.foto_url ? (
                <img src={jogador.foto_url} alt={jogador.nome} className="w-14 h-14 rounded-full object-cover border-2 border-gray-200" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-400 border-2 border-gray-200">
                  {jogador.nome.charAt(0)}
                </div>
              )}
              
              <div>
                <p className="font-bold text-lg text-gray-800">{jogador.nome}</p>
                <p className="text-sm text-blue-600 font-bold mb-1">{jogador.posicoes ? jogador.posicoes.join(' / ') : ''}</p>
                <p className="text-xs text-gray-500">Vel: {jogador.notas.velocidade} | Fôl: {jogador.notas.folego} | Mar: {jogador.notas.marcacao}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button onClick={() => iniciarEdicao(index)} className="text-blue-500 hover:text-blue-700 font-semibold px-3 py-1 border border-blue-500 rounded">
                Editar
              </button>
              <button onClick={() => removerJogador(index)} className="text-red-500 hover:text-red-700 font-semibold px-3 py-1 border border-red-500 rounded">
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}