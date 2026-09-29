import { html } from '../base/template.js';

export const cabecalhoPagina = ({ sobretitulo, titulo, descricao }) => html`
  <section class="page-hero">
    <div class="container">
      ${sobretitulo ? html`<p class="sobretitulo">${sobretitulo}</p>` : ''}
      <h1>${titulo}</h1>
      ${descricao ? html`<p>${descricao}</p>` : ''}
    </div>
  </section>`;