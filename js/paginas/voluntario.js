import { html, render } from '../base/template.js';
import { PROJETOS, DISPONIBILIDADES, obterProjeto } from '../conteudo/conteudo.js';
import { listar, salvar, remover, jaInscrito, rascunho } from '../regras/voluntarios.js';
import { regras, criarValidador } from '../validacao/validador.js';
import { mascaraTelefone, formatarData } from '../ferramentas/formatacao.js';
import { cabecalhoPagina } from '../componentes/cabecalhoPagina.js';
import { toast } from '../componentes/toast.js';

const LIMITE_MENSAGEM = 500;

const { obrigatorio, minimo, maximo, somenteLetras, nomeCompleto, email, telefone, personalizada } = regras;

const ESQUEMA = {
  nome: [obrigatorio('Informe seu nome.'), minimo(3), somenteLetras(), nomeCompleto()],
  email: [
    obrigatorio('Informe seu e-mail.'),
    email(),
    personalizada((valor, valores) => jaInscrito(valor, valores.projeto), 'Este e-mail já está inscrito neste projeto.'),
  ],
  telefone: [obrigatorio('Informe um telefone para contato.'), telefone()],
  cidade: [obrigatorio('Informe sua cidade.'), minimo(2)],
  projeto: [obrigatorio('Escolha em qual projeto quer ajudar.')],
  disponibilidade: [obrigatorio('Marque pelo menos um período.')],
  mensagem: [maximo(LIMITE_MENSAGEM)],
  termos: [obrigatorio('Você precisa concordar para enviar a inscrição.')],
};

const VAZIO = { nome: '', email: '', telefone: '', cidade: '', projeto: '', disponibilidade: [], mensagem: '' };

const campo = ({ nome, rotulo, obrigatorio: obrig = true, cheio = false, conteudo }) => html`
  <div class="campo ${cheio ? 'campo-cheio' : ''}">
    <label for="${nome}">${rotulo}${obrig ? html` <span class="asterisco" aria-hidden="true">*</span>` : ''}</label>
    ${conteudo}
    <p class="erro-msg" id="erro-${nome}" data-erro="${nome}"></p>
  </div>`;

function formulario(v, temRascunho) {
  return html`
    <form class="form-card" novalidate>
      ${temRascunho ? html`
        <div class="aviso-rascunho" role="status">
          <span>Recuperamos o que você tinha preenchido antes.</span>
          <button type="button" class="link-botao" data-acao="descartar">Limpar formulário</button>
        </div>` : ''}

      <div class="form-grade">
        ${campo({
          nome: 'nome', rotulo: 'Nome completo', cheio: true,
          conteudo: html`<input id="nome" name="nome" type="text" value="${v.nome}" autocomplete="name" aria-required="true" aria-describedby="erro-nome">`,
        })}
        ${campo({
          nome: 'email', rotulo: 'E-mail',
          conteudo: html`<input id="email" name="email" type="email" value="${v.email}" autocomplete="email" placeholder="nome@email.com" aria-required="true" aria-describedby="erro-email">`,
        })}
        ${campo({
          nome: 'telefone', rotulo: 'Telefone (WhatsApp)',
          conteudo: html`<input id="telefone" name="telefone" type="tel" value="${v.telefone}" autocomplete="tel" inputmode="numeric" placeholder="(16) 99999-9999" aria-required="true" aria-describedby="erro-telefone">`,
        })}
        ${campo({
          nome: 'cidade', rotulo: 'Cidade',
          conteudo: html`<input id="cidade" name="cidade" type="text" value="${v.cidade}" autocomplete="address-level2" aria-required="true" aria-describedby="erro-cidade">`,
        })}
        ${campo({
          nome: 'projeto', rotulo: 'Projeto de interesse',
          conteudo: html`
            <select id="projeto" name="projeto" aria-required="true" aria-describedby="erro-projeto">
              <option value="">Selecione…</option>
              ${PROJETOS.map((p) => html`<option value="${p.id}" ${v.projeto === p.id ? 'selected' : ''}>${p.titulo}</option>`)}
            </select>`,
        })}

        <fieldset class="campo campo-cheio">
          <legend>Disponibilidade <span class="asterisco" aria-hidden="true">*</span><span class="sr-only"> (obrigatório)</span></legend>
          <div class="opcoes">
            ${DISPONIBILIDADES.map((d) => html`
              <label class="opcao">
                <input type="checkbox" name="disponibilidade" value="${d.valor}" ${v.disponibilidade.includes(d.valor) ? 'checked' : ''} aria-describedby="erro-disponibilidade">
                <span>${d.rotulo}</span>
              </label>`)}
          </div>
          <p class="erro-msg" id="erro-disponibilidade" data-erro="disponibilidade"></p>
        </fieldset>

        ${campo({
          nome: 'mensagem', rotulo: 'Conte um pouco sobre você (opcional)', obrigatorio: false, cheio: true,
          conteudo: html`
            <textarea id="mensagem" name="mensagem" rows="4" aria-describedby="erro-mensagem contador-mensagem"
              placeholder="Experiências, habilidades, por que quer ajudar…">${v.mensagem}</textarea>
            <span class="contador" id="contador-mensagem"></span>`,
        })}

        <div class="campo campo-cheio">
          <label class="opcao opcao-termos">
            <input type="checkbox" name="termos" value="sim" aria-required="true" aria-describedby="erro-termos">
            <span>Autorizo a Laços que Unem a entrar em contato comigo sobre o voluntariado. <span class="asterisco" aria-hidden="true">*</span></span>
          </label>
          <p class="erro-msg" id="erro-termos" data-erro="termos"></p>
        </div>
      </div>

      <div class="form-rodape">
        <p class="nota"><span class="asterisco">*</span> Campos obrigatórios</p>
        <button type="submit" class="btn btn-primary">Enviar inscrição</button>
      </div>
    </form>`;
}

function listaInscricoes(inscricoes) {
  if (!inscricoes.length) return html`<p class="nota">Nenhuma inscrição feita neste navegador ainda.</p>`;

  return html`
    <ul class="inscricoes">
      ${inscricoes.map((i) => html`
        <li>
          <div>
            <strong>${obterProjeto(i.projeto)?.titulo ?? 'Projeto'}</strong>
            <span>${i.nome} · ${formatarData(i.criadoEm)}</span>
          </div>
          <button type="button" class="link-botao perigo" data-cancelar="${i.id}">Cancelar</button>
        </li>`)}
    </ul>`;
}

const template = (v, temRascunho) => html`
  ${cabecalhoPagina({
    sobretitulo: 'Seja voluntário',
    titulo: 'Faça parte dessa rede',
    descricao: 'Preencha o formulário e nossa equipe entra em contato para combinar os próximos passos.',
  })}

  <section class="section">
    <div class="container voluntario-layout">
      ${formulario(v, temRascunho)}

      <aside class="form-aside">
        <div class="aside-card">
          <h2>O que acontece depois?</h2>
          <ol class="passos">
            <li>Recebemos sua inscrição.</li>
            <li>Entramos em contato em até 5 dias úteis.</li>
            <li>Você participa de uma conversa de boas-vindas.</li>
          </ol>
        </div>
        <div class="aside-card">
          <h2>Suas inscrições</h2>
          <div id="minhas-inscricoes"></div>
        </div>
      </aside>
    </div>
  </section>`;

export const voluntarioView = {
  montar(outlet, { query, navegar, signal }) {
    const salvo = rascunho.ler();
    const inicial = { ...VAZIO, ...(salvo ?? {}) };
    if (obterProjeto(query.projeto)) inicial.projeto = query.projeto;

    render(outlet, template(inicial, Boolean(salvo)));

    const form = outlet.querySelector('form');
    const contador = outlet.querySelector('#contador-mensagem');
    const areaInscricoes = outlet.querySelector('#minhas-inscricoes');

    const desenharInscricoes = () => render(areaInscricoes, listaInscricoes(listar()));

    function atualizarContador() {
      const tamanho = form.elements.mensagem.value.length;
      contador.textContent = `${tamanho}/${LIMITE_MENSAGEM}`;
      contador.classList.toggle('excedido', tamanho > LIMITE_MENSAGEM);
    }

    form.addEventListener('input', (e) => {
      if (e.target.name === 'telefone') e.target.value = mascaraTelefone(e.target.value);
    });

    const validador = criarValidador(form, ESQUEMA);

    const salvarRascunho = () => {
      const { termos, ...dados } = validador.valores();
      rascunho.salvar(dados);
    };
    form.addEventListener('input', () => { atualizarContador(); salvarRascunho(); });
    form.addEventListener('change', salvarRascunho);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const invalidos = validador.validarTudo();
      if (invalidos.length) {
        toast(invalidos.length === 1 ? 'Falta corrigir 1 campo.' : `Faltam corrigir ${invalidos.length} campos.`, 'erro');
        return;
      }

      const v = validador.valores();
      const inscricao = salvar({
        nome: v.nome.trim().replace(/\s+/g, ' '),
        email: v.email.trim().toLowerCase(),
        telefone: v.telefone,
        cidade: v.cidade.trim(),
        projeto: v.projeto,
        disponibilidade: v.disponibilidade,
        mensagem: v.mensagem.trim(),
      });

      if (!inscricao) {
        toast('Não foi possível salvar sua inscrição neste navegador. Verifique se o armazenamento do site está permitido e tente de novo.', 'erro');
        return;
      }

      rascunho.limpar();
      toast('Inscrição enviada com sucesso!');
      navegar(`/voluntario/obrigado/${inscricao.id}`);
    });

    outlet.addEventListener('click', (e) => {
      if (e.target.closest('[data-acao="descartar"]')) {
        rascunho.limpar();
        toast('Formulário limpo.', 'info');
        navegar('/voluntario');
        return;
      }

      const cancelar = e.target.closest('[data-cancelar]');
      if (cancelar && confirm('Cancelar esta inscrição?')) {
        remover(cancelar.dataset.cancelar);
        toast('Inscrição cancelada.', 'info');
        desenharInscricoes();
      }
    }, { signal });

    desenharInscricoes();
    atualizarContador();
  },
};
