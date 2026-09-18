import React, { useState } from 'react';

export default function ModoJogo({ timeA, timeB, encerrarPartida }) {
  const [placarA, setPlacarA] = useState(0);
  const [placarB, setPlacarB] = useState(0);
  const [estatisticas, setEstatisticas] = useState({});

  const registrarAcao = (nomeJogador, tipo, time) => {
    setEstatisticas(prev => ({
      ...prev,
      [nomeJogador]: {
        ...prev[nomeJogador],
        gols: (prev[nomeJogador]?.gols || 0) + (tipo === 'gol' ? 1 : 0),
        assistencias: (prev[nomeJogador]?.assistencias || 0) + (tipo === 'assistencia' ? 1 : 0)
      }
    }));

    if (tipo === 'gol') {
      if (time === 'A') setPlacarA(prev => prev + 1);
      else setPlacarB(prev => prev + 1);
    }
  };

  const getStats = (nome) => estatisticas[nome] || { gols: 0, assistencias: 0 };

  return (
    <div className="max-w-5xl mx-auto mt-2">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6 flex text-center">
        <div className="flex-1 bg-blue-600 text-white p-6">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">Time A</h2>
          <span className="text-6xl font-black">{placarA}</span>
        </div>
        <div className="bg-gray-800 text-white px-6 flex items-center justify-center font-bold text-xl">X</div>
        <div className="flex-1 bg-red-600 text-white p-6">
          <h2 className="text-2xl font-bold uppercase tracking-wider mb-2">Time B</h2>
          <span className="text-6xl font-black">{placarB}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4 border-t-8 border-blue-600">
          <h3 className="text-xl font-bold text-blue-800 border-b pb-2 mb-4">Adicionar Eventos (Time A)</h3>
          <div className="space-y-3">
            {timeA.map((jogador, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                <div>
                  <p className="font-bold text-gray-800 text-lg">{jogador.nome}</p>
                  <p className="text-sm text-gray-500 font-medium">⚽ {getStats(jogador.nome).gols} Gols | 👟 {getStats(jogador.nome).assistencias} Assis.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => registrarAcao(jogador.nome, 'assistencia', 'A')} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 rounded shadow-sm">+ 👟</button>
                  <button onClick={() => registrarAcao(jogador.nome, 'gol', 'A')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded shadow-sm">+ ⚽</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 border-t-8 border-red-600">
          <h3 className="text-xl font-bold text-red-800 border-b pb-2 mb-4">Adicionar Eventos (Time B)</h3>
          <div className="space-y-3">
            {timeB.map((jogador, idx) => (
              <div key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                <div>
                  <p className="font-bold text-gray-800 text-lg">{jogador.nome}</p>
                  <p className="text-sm text-gray-500 font-medium">⚽ {getStats(jogador.nome).gols} Gols | 👟 {getStats(jogador.nome).assistencias} Assis.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => registrarAcao(jogador.nome, 'assistencia', 'B')} className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-3 rounded shadow-sm">+ 👟</button>
                  <button onClick={() => registrarAcao(jogador.nome, 'gol', 'B')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-3 rounded shadow-sm">+ ⚽</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={encerrarPartida} className="w-full mt-8 bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-lg shadow-md uppercase tracking-widest transition">
        Encerrar Partida
      </button>
    </div>
  );
}