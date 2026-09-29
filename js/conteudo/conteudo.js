export const PROJETOS = [
  {
    id: 'apoio-a-pacientes',
    titulo: 'Apoio a pacientes',
    resumo: 'Acolhimento emocional, orientação e rede de apoio para pacientes e familiares durante o tratamento oncológico.',
    descricao: 'Acompanhamos pacientes e familiares desde o diagnóstico, oferecendo escuta, orientação sobre direitos e uma rede de pessoas que entendem o que é atravessar o tratamento. Ninguém precisa passar por isso sozinho.',
    atividades: [
      'Rodas de conversa semanais com pacientes e familiares',
      'Visitas de acolhimento em hospitais parceiros',
      'Orientação sobre direitos do paciente oncológico',
      'Companhia em consultas e sessões de tratamento',
    ],
    comoAjudar: ['Visitas e acompanhamento', 'Apoio nas rodas de conversa', 'Transporte para consultas'],
  },
  {
    id: 'doacao-de-livros',
    titulo: 'Doação de livros',
    resumo: 'Arrecadamos e distribuímos livros para leitos de tratamento, salas de espera e bibliotecas comunitárias.',
    descricao: 'A leitura ajuda a atravessar as longas horas de tratamento. Recebemos, triamos e levamos livros a hospitais, casas de apoio e bibliotecas comunitárias, com carrinhos de leitura que circulam pelos leitos.',
    atividades: [
      'Pontos de coleta de livros na cidade',
      'Triagem e higienização dos exemplares',
      'Carrinhos de leitura em hospitais parceiros',
      'Montagem de bibliotecas em salas de espera',
    ],
    comoAjudar: ['Triagem e organização do acervo', 'Leitura em voz alta nos leitos', 'Doação de livros'],
  },
  {
    id: 'captacao-de-recursos',
    titulo: 'Captação de recursos',
    resumo: 'Campanhas e parcerias que financiam tratamentos, transporte e materiais de apoio para as famílias atendidas.',
    descricao: 'Muitas famílias deixam de seguir o tratamento por falta de dinheiro para transporte, alimentação ou medicamentos. Organizamos campanhas, bazares e parcerias com empresas para cobrir esses custos.',
    atividades: [
      'Campanhas de arrecadação on-line',
      'Bazares e eventos beneficentes',
      'Parcerias com empresas da região',
      'Prestação de contas aberta às famílias e doadores',
    ],
    comoAjudar: ['Organização de eventos', 'Divulgação nas redes sociais', 'Contato com empresas parceiras'],
  },
];

export const IMPACTO = [
  { chave: 'familias', numero: 100, rotulo: 'famílias apoiadas' },
  { chave: 'livros', numero: 3500, rotulo: 'livros doados' },
  { chave: 'voluntarios', numero: 42, rotulo: 'voluntários ativos' },
  { chave: 'recursos', numero: 5000, rotulo: 'em recursos captados', formato: 'moeda' },
];

export const DISPONIBILIDADES = [
  { valor: 'manha', rotulo: 'Manhã' },
  { valor: 'tarde', rotulo: 'Tarde' },
  { valor: 'noite', rotulo: 'Noite' },
  { valor: 'fim-de-semana', rotulo: 'Fins de semana' },
];

export const obterProjeto = (id) => PROJETOS.find((p) => p.id === id) ?? null;
