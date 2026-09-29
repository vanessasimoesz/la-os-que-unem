import { html, render } from '../base/template.js';
import { obterProjeto, DISPONIBILIDADES } from '../conteudo/conteudo.js';
import { obter } from '../regras/voluntarios.js';
import { primeiroNome } from '../ferramentas/formatacao.js';
import { cabecalhoPagina } from '../componentes/cabecalhoPagina.js';

function template(inscricao) {
  const projeto = obterProjeto(inscricao.projeto);
  const periodos = DISPONIBILIDADES
    .filter((d) => inscricao.disponibilidade.includes(d.valor))
    .map((d) => d.rotulo)
    .join(', ');

  return html`
    ${cabecalhoPagina({
      sobretitulo: 'Inscrição recebida',
      titulo: `Que bom ter você com a gente, ${primeiroNome(inscricao.nome)}!`,
      descricao: 'Sua inscrição foi registrada. Em breve nossa equipe entra em contato.',
    })}

    <section class="section">
      <div class="container estreito">
        <div class="aside-card resumo">
          <h2>Resumo da inscrição</h2>
          <dl>
            <dt>Nome</dt><dd>${inscricao.nome}</dd>
            <dt>E-mail</dt><dd>${inscricao.email}</dd>
            <dt>Telefone</dt><dd>${inscricao.telefone}</dd>
            <dt>Cidade</dt><dd>${inscricao.cidade}</dd>
            <dt>Projeto</dt><dd>${projeto?.titulo ?? '—'}</dd>
            <dt>Disponibilidade</dt><dd>${periodos}</dd>
            ${inscricao.mensagem ? html`<dt>Mensagem</dt><dd>${inscricao.mensagem}</dd>` : ''}
          </dl>
        </div>

        <div class="btn-group">
          <a class="btn btn-primary" href="#/">Voltar ao início</a>
          ${projeto ? html`<a class="btn btn-contorno" href="#/projetos/${projeto.id}">Ver o projeto</a>` : ''}
          <a class="btn btn-contorno" href="#/voluntario">Fazer outra inscrição</a>
        </div>
      </div>
    </section>`;
}

export const obrigadoView = {
  montar(outlet, { params, navegar }) {
    const inscricao = obter(params.id);
    if (!inscricao) {
      navegar('/voluntario');
      return;
    }
    render(outlet, template(inscricao));
  },
};
