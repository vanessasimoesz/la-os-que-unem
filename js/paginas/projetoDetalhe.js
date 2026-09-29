import { html, render } from '../base/template.js';
import { PROJETOS, obterProjeto } from '../conteudo/conteudo.js';
import { contarPorProjeto } from '../regras/voluntarios.js';
import { listaDeProjetos } from '../componentes/cartaoProjeto.js';
import { cabecalhoPagina } from '../componentes/cabecalhoPagina.js';
import { naoEncontradaView } from './naoEncontrada.js';

function template(projeto) {
  const inscritos = contarPorProjeto(projeto.id);
  const outros = PROJETOS.filter((p) => p.id !== projeto.id);

  return html`
    ${cabecalhoPagina({ sobretitulo: 'Projeto', titulo: projeto.titulo, descricao: projeto.resumo })}

    <section class="section">
      <div class="container detalhe-layout">
        <div class="detalhe-conteudo">
          <nav class="trilha" aria-label="Trilha de navegação">
            <a href="#/projetos">Projetos</a> <span aria-hidden="true">/</span> <span aria-current="page">${projeto.titulo}</span>
          </nav>

          <h2>Sobre o projeto</h2>
          <p>${projeto.descricao}</p>

          <h2>O que fazemos</h2>
          <ul class="lista-check">
            ${projeto.atividades.map((a) => html`<li>${a}</li>`)}
          </ul>
        </div>

        <aside class="aside-card">
          <h2>Como você pode ajudar</h2>
          <ul class="lista-check">
            ${projeto.comoAjudar.map((a) => html`<li>${a}</li>`)}
          </ul>
          ${inscritos
            ? html`<p class="nota">${inscritos} ${inscritos === 1 ? 'pessoa já se inscreveu' : 'pessoas já se inscreveram'} por este site.</p>`
            : ''}
          <a class="btn btn-primary btn-bloco" href="#/voluntario?projeto=${projeto.id}">Quero ajudar neste projeto</a>
        </aside>
      </div>
    </section>

    <section class="section section-white">
      <div class="container">
        <h2>Outros projetos</h2>
        <p class="section-intro">Veja também as outras frentes da Laços que Unem.</p>
        ${listaDeProjetos(outros)}
      </div>
    </section>`;
}

export const projetoDetalheView = {
  montar(outlet, contexto) {
    const projeto = obterProjeto(contexto.params.id);
    if (!projeto) {
      naoEncontradaView.montar(outlet, contexto);
      return;
    }
    render(outlet, template(projeto));
  },
};
