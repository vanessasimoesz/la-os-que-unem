import { criarRoteador } from './base/router.js';
import { marcarMenuAtivo } from './componentes/navegacao.js';

import { inicioView } from './paginas/inicio.js';
import { projetosView } from './paginas/projetos.js';
import { projetoDetalheView } from './paginas/projetoDetalhe.js';
import { impactoView } from './paginas/impacto.js';
import { voluntarioView } from './paginas/voluntario.js';
import { obrigadoView } from './paginas/obrigado.js';
import { naoEncontradaView } from './paginas/naoEncontrada.js';

const roteador = criarRoteador({
  outlet: document.getElementById('app'),
  rotas: [
    { caminho: '/', titulo: '', view: inicioView },
    { caminho: '/projetos', titulo: 'Projetos', view: projetosView },
    { caminho: '/projetos/:id', titulo: 'Projeto', view: projetoDetalheView },
    { caminho: '/impacto', titulo: 'Impacto', view: impactoView },
    { caminho: '/voluntario', titulo: 'Seja Voluntário', view: voluntarioView },
    { caminho: '/voluntario/obrigado/:id', titulo: 'Inscrição recebida', view: obrigadoView },
  ],
  naoEncontrada: { titulo: 'Página não encontrada', view: naoEncontradaView },
  aoMudar: marcarMenuAtivo,
});

roteador.iniciar();
