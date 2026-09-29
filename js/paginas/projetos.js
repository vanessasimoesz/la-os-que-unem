import { html, render } from '../base/template.js';
import { PROJETOS } from '../conteudo/conteudo.js';
import { listaDeProjetos } from '../componentes/cartaoProjeto.js';
import { cabecalhoPagina } from '../componentes/cabecalhoPagina.js';

const template = () => html`
  ${cabecalhoPagina({
    sobretitulo: 'Nossos projetos',
    titulo: 'Três frentes, um mesmo cuidado',
    descricao: 'Conheça como cada projeto funciona e escolha onde você quer ajudar.',
  })}

  <section class="section">
    <div class="container">
      ${listaDeProjetos(PROJETOS)}
    </div>
  </section>`;

export const projetosView = {
  montar(outlet) {
    render(outlet, template());
  },
};
