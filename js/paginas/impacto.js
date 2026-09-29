import { html, render } from '../base/template.js';
import { numerosDeImpacto, inscricoesPorProjeto } from '../regras/impacto.js';
import { estatisticas, animarContadores } from '../componentes/estatisticas.js';
import { cabecalhoPagina } from '../componentes/cabecalhoPagina.js';

function barras(itens) {
  const maior = Math.max(1, ...itens.map((i) => i.total));
  return html`
    <ul class="barras">
      ${itens.map((i) => html`
        <li>
          <a href="#/projetos/${i.id}">${i.titulo}</a>
          <span class="barra" aria-hidden="true"><span style="width: ${Math.round((i.total / maior) * 100)}%"></span></span>
          <strong>${i.total}</strong>
        </li>`)}
    </ul>`;
}

function template() {
  const porProjeto = inscricoesPorProjeto();
  const total = porProjeto.reduce((soma, i) => soma + i.total, 0);

  return html`
    ${cabecalhoPagina({
      sobretitulo: 'Nosso impacto',
      titulo: 'Cada laço faz diferença',
      descricao: 'Números atualizados com base nos projetos ativos em 2026.',
    })}

    <section class="section section-white">
      <div class="container">
        ${estatisticas(numerosDeImpacto())}
      </div>
    </section>

    <section class="section">
      <div class="container estreito">
        <h2>Inscrições de voluntários pelo site</h2>
        <p class="section-intro">
          ${total
            ? `${total} ${total === 1 ? 'inscrição feita' : 'inscrições feitas'} neste navegador, por projeto:`
            : 'Ainda não há inscrições feitas por este navegador. Que tal ser a primeira pessoa?'}
        </p>
        ${barras(porProjeto)}
        <a class="btn btn-primary" href="#/voluntario">Quero ser voluntário</a>
      </div>
    </section>`;
}

export const impactoView = {
  montar(outlet, { signal }) {
    render(outlet, template());
    animarContadores(outlet, signal);
  },
};
