import { html } from '../base/template.js';

// nivel: 2 quando a lista vem logo abaixo do <h1>, 3 quando está dentro de uma seção com <h2>
export const cartaoProjeto = (projeto, nivel = 3) => html`
  <article class="card">
    ${nivel === 2 ? html`<h2>${projeto.titulo}</h2>` : html`<h3>${projeto.titulo}</h3>`}
    <p>${projeto.resumo}</p>
    <a href="#/projetos/${projeto.id}">Ver este projeto <span aria-hidden="true">→</span></a>
  </article>`;

export const listaDeProjetos = (projetos, nivel = 3) => html`
  <div class="cards">${projetos.map((p) => cartaoProjeto(p, nivel))}</div>`;
