import React, { useState, useEffect } from 'react';
import ModoJogo from './ModoJogo';

export default function Sorteio() {
  const [elenco, setElenco] = useState([]);
  const [presentes, setPresentes] = useState([]);
  const [timeA, setTimeA] = useState([]);
  const [timeB, setTimeB] = useState([]);
  const [partidaIniciada, setPartidaIniciada] = useState(false);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('elencoRessacaFC');
    if (dadosSalvos) {
      const jogadores = JSON.parse(dadosSalvos);
      setElenco(jogadores);
      setPresentes(jogadores.map(j => j.nome));
    }
  }, []);

  const togglePresenca = (nome) => {
    if (presentes.includes(nome)) setPresentes(presentes.filter(p => p !== nome));
    else setPresentes([...presentes, nome]);
  };

  const calcularForcaTotal = (notas) => Object.values(notas).reduce((acc, nota) => acc + nota, 0);
  const calcularVelocidadeEquipe = (equipe) => equipe.reduce((acc, j) => acc + j.notas.velocidade, 0);
  const calcularForcaEquipe = (equipe) => equipe.reduce((acc, j) => acc + calcularForcaTotal(j.notas), 0);

  const gerarTimes = () => {
    const jogadoresParaSorteio = elenco.filter(j => presentes.includes(j.nome));

    let equipeA = [];
    let equipeB = [];

    const pesoEquipe = (equipe) => calcularForcaEquipe(equipe) + (calcularVelocidadeEquipe(equipe) * 3);

    let goleiros = jogadoresParaSorteio.filter(j => j.posicoes && j.posicoes[0] === 'Goleiro');
    goleiros.sort((a, b) => calcularForcaTotal(b.notas) - calcularForcaTotal(a.notas));

    if (goleiros.length > 0) equipeA.push(goleiros[0]);
    if (goleiros.length > 1) equipeB.push(goleiros[1]);

    const posicoesLinha = ['Zagueiro', 'Meio-Campo', 'Atacante de Lado', 'Pivô', undefined];

    posicoesLinha.forEach(pos => {
      let jogadoresPos = jogadoresParaSorteio.filter(j => 
        (j.posicoes && j.posicoes[0] === pos && j.posicoes[0] !== 'Goleiro') || (!j.posicoes && pos === undefined)
      );

      jogadoresPos.sort((a, b) => {
        const pesoA = calcularForcaTotal(a.notas) + (a.notas.velocidade * 3);
        const pesoB = calcularForcaTotal(b.notas) + (b.notas.velocidade * 3);
        return pesoB - pesoA;
      });

      jogadoresPos.forEach(jogador => {
        // REGRA DE OURO: O tamanho da equipa tem prioridade absoluta sobre a força
        if (equipeA.length < equipeB.length) {
          equipeA.push(jogador);
        } else if (equipeB.length < equipeA.length) {
          equipeB.push(jogador);
        } else {
          // Se tiverem o mesmo número de jogadores, aloca na equipa mais fraca
          if (pesoEquipe(equipeA) <= pesoEquipe(equipeB)) {
            equipeA.push(jogador);
          } else {
            equipeB.push(jogador);
          }
        }
      });
    });

    setTimeA(equipeA);
    setTimeB(equipeB);
    setPartidaIniciada(false);
  };

  if (elenco.length === 0) return <p className="text-center mt-10 text-gray-500">Cadastre jogadores primeiro!</p>;

  if (partidaIniciada) {
    return <ModoJogo timeA={timeA} timeB={timeB} encerrarPartida={() => setPartidaIniciada(false)} />;
  }

  return (
    <div className="max-w-5xl mx-auto mt-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Quem vai jogar hoje?</h2>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {elenco.map((jogador, idx) => (
            <button key={idx} onClick={() => togglePresenca(jogador.nome)} 
              className={`px-4 py-2 rounded-full font-semibold border transition shadow-sm ${presentes.includes(jogador.nome) ? 'bg-blue-100 border-blue-500 text-blue-700 hover:bg-blue-200' : 'bg-gray-50 border-gray-300 text-gray-500 hover:bg-gray-100'}`}>
              {jogador.nome}
            </button>
          ))}
        </div>
        <button onClick={gerarTimes} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg shadow-md transition transform hover:scale-[1.01]">
          ⚽ Sortear Times Equilibrados
        </button>
      </div>

      {timeA.length > 0 && (
        <>
          <button onClick={() => setPartidaIniciada(true)} className="w-full mb-8 bg-gray-800 hover:bg-gray-900 text-white font-bold py-4 rounded-lg shadow-xl uppercase tracking-widest animate-pulse">
            ▶️ Iniciar Partida Oficial
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time A */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-blue-600 text-white p-4">
                <h3 className="text-2xl font-bold text-center">Time A (Colete)</h3>
                <div className="flex justify-center gap-4 mt-2 text-sm font-medium bg-blue-700 py-1 rounded-md">
                  <span>Total Força: {calcularForcaEquipe(timeA)}</span>
                  <span>|</span>
                  <span>Total Vel: {calcularVelocidadeEquipe(timeA)}</span>
                </div>
              </div>
              <ul className="p-4 space-y-3">
                {timeA.map((j, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <div>
                      <span className="font-bold text-gray-800">{j.nome} </span>
                      <span className="text-xs text-gray-600 font-semibold bg-gray-100 px-2 py-0.5 rounded">{j.posicoes ? j.posicoes[0] : ''}</span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <p>Força: <span className="font-bold text-gray-700">{calcularForcaTotal(j.notas)}</span></p>
                      <p>Velocidade: <span className="font-bold text-gray-700">{j.notas.velocidade}</span></p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Time B */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="bg-red-600 text-white p-4">
                <h3 className="text-2xl font-bold text-center">Time B (Sem Colete)</h3>
                <div className="flex justify-center gap-4 mt-2 text-sm font-medium bg-red-700 py-1 rounded-md">
                  <span>Total Força: {calcularForcaEquipe(timeB)}</span>
                  <span>|</span>
                  <span>Total Vel: {calcularVelocidadeEquipe(timeB)}</span>
                </div>
              </div>
              <ul className="p-4 space-y-3">
                {timeB.map((j, i) => (
                  <li key={i} className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <div>
                      <span className="font-bold text-gray-800">{j.nome} </span>
                      <span className="text-xs text-gray-600 font-semibold bg-gray-100 px-2 py-0.5 rounded">{j.posicoes ? j.posicoes[0] : ''}</span>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      <p>Força: <span className="font-bold text-gray-700">{calcularForcaTotal(j.notas)}</span></p>
                      <p>Velocidade: <span className="font-bold text-gray-700">{j.notas.velocidade}</span></p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}