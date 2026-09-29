import { html, render } from '../base/template.js';
import { PROJETOS } from '../conteudo/conteudo.js';
import { numerosDeImpacto } from '../regras/impacto.js';
import { listaDeProjetos } from '../componentes/cartaoProjeto.js';
import { estatisticas, animarContadores } from '../componentes/estatisticas.js';

const template = () => html`
  <section class="hero">
    <div class="container hero-inner">
      <div>
        <h1>Cuidado, leitura e comunidade para quem enfrenta o câncer</h1>
        <p>A Laços que Unem apoia pacientes oncológicos e suas famílias com acolhimento, doação de livros e uma rede de voluntários, do diagnóstico ao tratamento.</p>
        <div class="btn-group">
          <a class="btn btn-primary" href="#/voluntario">Seja voluntário</a>
          <a class="btn btn-secondary" href="#/projetos">Conheça os projetos</a>
        </div>
      </div>
      <img class="hero-imagem" src="img/imagem-lacos.png" alt="" width="260" height="260" />
    </div>
  </section>

  <section class="section">
    <div class="container">
      <h2>Como ajudamos</h2>
      <p class="section-intro">Três frentes de atuação que sustentam nosso trabalho todos os dias.</p>
      ${listaDeProjetos(PROJETOS)}
    </div>
  </section>

  <section class="section section-white">
    <div class="container">
      <h2>Nosso impacto</h2>
      <p class="section-intro">Números atualizados com base nos projetos ativos em 2026.</p>
      ${estatisticas(numerosDeImpacto())}
    </div>
  </section>

  <section class="cta">
    <div class="container">
      <h2>Você pode fazer parte dessa rede</h2>
      <p>Seja com tempo, livros ou doações, toda ajuda amplia nosso alcance.</p>
      <div class="btn-group">
        <a class="btn btn-primary btn-escuro" href="#/voluntario">Seja voluntário</a>
        <a class="btn btn-secondary" href="#/impacto">Veja nosso impacto</a>
      </div>
    </div>
  </section>`;

export const inicioView = {
  montar(outlet, { signal }) {
    render(outlet, template());
    animarContadores(outlet, signal);
  },
};
