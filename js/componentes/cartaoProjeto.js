import { html } from '../base/template.js';

export const cartaoProjeto = (projeto) => html`
  <article class="card">
    <h3>${projeto.titulo}</h3>
    <p>${projeto.resumo}</p>
    <a href="#/projetos/${projeto.id}">Ver este projeto <span aria-hidden="true">→</span></a>
  </article>`;

export const listaDeProjetos = (projetos) => html`
  <div class="cards">${projetos.map(cartaoProjeto)}</div>`;
