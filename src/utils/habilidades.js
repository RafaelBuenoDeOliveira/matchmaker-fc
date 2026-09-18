export const habilidades = [
  {
    id: 'folego',
    nome: 'Fôlego',
    descricao: 'Resistência física durante a partida',
    niveis: {
      1: 'Nulo - Não aguenta dar um pique; fica apenas no ataque ou defesa.',
      2: 'Muito Baixo - Cansa nos primeiros 10 minutos.',
      3: 'Baixo - Corre apenas em lances curtos; trote lento.',
      4: 'Abaixo da Média - Aguenta o primeiro tempo, mas cai de rendimento.',
      5: 'Mediano - Faz o básico sem grande intensidade física.',
      6: 'Acima da Média - Ritmo constante, mas evita piques desnecessários.',
      7: 'Bom - Consegue atacar e defender bem na maior parte do jogo.',
      8: 'Muito Bom - Intenso; pressiona a saída e volta para marcar.',
      9: 'Excelente - Corre o campo todo em alta intensidade quase sempre.',
      10: 'Incansável - Muito fôlego até o apito final; parece ter dois pulmões.'
    }
  },
  {
    id: 'velocidade',
    nome: 'Velocidade',
    descricao: 'Arranque e corrida (Preencha os níveis depois)',
    niveis: {} 
  },
  { id: 'finalizacao', nome: 'Finalização', descricao: 'Chute a gol', niveis: {} },
  { id: 'passe', nome: 'Passe', descricao: 'Visão e precisão de passes', niveis: {} },
  { id: 'marcacao', nome: 'Marcação', descricao: 'Capacidade de desarme', niveis: {} },
  { id: 'drible', nome: 'Drible', descricao: 'Controle de bola e 1x1', niveis: {} },
  { id: 'forca', nome: 'Força', descricao: 'Ponto de equilíbrio e divididas', niveis: {} },
  { id: 'posicionamento', nome: 'Posicionamento', descricao: 'Noção tática em campo', niveis: {} },
  { id: 'reacao', nome: 'Reação', descricao: 'Reflexo e tempo de bola', niveis: {} },
  {
    id: 'goleiro',
    nome: 'Goleiro',
    descricao: 'Técnica específica para a posição',
    niveis: {
      1: 'Foge da bola - Tem medo, vira a cara.',
      5: 'Quebra-galho - Vai à baliza se ninguém quiser, defende o básico.',
      10: 'Parede - Reflexos apurados, comando de área e segurança total.'
    }
  }
];