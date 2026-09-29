/**
 * Botão de tema (claro / escuro)
 * - Sem escolha salva, o site segue o tema do sistema (prefers-color-scheme).
 * - Ao clicar, a escolha é salva no localStorage e aplicada em <html data-tema="...">.
 * - aria-pressed informa ao leitor de tela se o modo escuro está ligado.
 */
import { storage } from '../base/storage.js';

const CHAVE = 'tema';
const sistemaEscuro = matchMedia('(prefers-color-scheme: dark)');

function temaAtual() {
  const salvo = document.documentElement.dataset.tema;
  if (salvo === 'claro' || salvo === 'escuro') return salvo;
  return sistemaEscuro.matches ? 'escuro' : 'claro';
}

function atualizarBotao(botao) {
  const escuro = temaAtual() === 'escuro';
  botao.setAttribute('aria-pressed', String(escuro));
}

export function iniciarTema() {
  const botao = document.querySelector('.botao-tema');
  if (!botao) return;

  atualizarBotao(botao);

  botao.addEventListener('click', () => {
    const novo = temaAtual() === 'escuro' ? 'claro' : 'escuro';
    document.documentElement.dataset.tema = novo;
    storage.gravar(CHAVE, novo);
    atualizarBotao(botao);
  });

  // Se a pessoa não escolheu nada e o sistema mudar de tema, o botão acompanha
  sistemaEscuro.addEventListener('change', () => atualizarBotao(botao));
}
