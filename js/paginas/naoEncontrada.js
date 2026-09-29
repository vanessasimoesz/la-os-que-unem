import { html, render } from '../base/template.js';
import { cabecalhoPagina } from '../componentes/cabecalhoPagina.js';

export const naoEncontradaView = {
  montar(outlet) {
    render(outlet, html`
      ${cabecalhoPagina({
        sobretitulo: 'Erro 404',
        titulo: 'Página não encontrada',
        descricao: 'O endereço que você acessou não existe.',
      })}
      <section class="section">
        <div class="container">
          <a class="btn btn-primary" href="#/">Voltar para o início</a>
        </div>
      </section>`);
  },
};
