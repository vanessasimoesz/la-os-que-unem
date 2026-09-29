import { storage } from '../base/storage.js';

const CHAVE = 'voluntarios';
const CHAVE_RASCUNHO = 'rascunhoVoluntario';

const gerarId = () =>
  crypto.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export const listar = () => storage.ler(CHAVE, []);

export const obter = (id) => listar().find((v) => v.id === id) ?? null;

export function salvar(dados) {
  const nova = { ...dados, id: gerarId(), criadoEm: new Date().toISOString() };
  return storage.gravar(CHAVE, [...listar(), nova]) ? nova : null;
}

export function remover(id) {
  storage.gravar(CHAVE, listar().filter((v) => v.id !== id));
}

export function jaInscrito(email, projeto) {
  const alvo = email.trim().toLowerCase();
  return listar().some((v) => v.email === alvo && v.projeto === projeto);
}

export const contarPorProjeto = (projetoId) => listar().filter((v) => v.projeto === projetoId).length;

export const rascunho = {
  ler() {
    const salvo = storage.ler(CHAVE_RASCUNHO, null);
    if (!salvo || typeof salvo !== 'object' || Array.isArray(salvo)) return null;
    const texto = (v) => (typeof v === 'string' ? v : '');
    return {
      nome: texto(salvo.nome),
      email: texto(salvo.email),
      telefone: texto(salvo.telefone),
      cidade: texto(salvo.cidade),
      projeto: texto(salvo.projeto),
      mensagem: texto(salvo.mensagem),
      disponibilidade: Array.isArray(salvo.disponibilidade) ? salvo.disponibilidade.filter((d) => typeof d === 'string') : [],
    };
  },
  salvar: (dados) => storage.gravar(CHAVE_RASCUNHO, dados),
  limpar: () => storage.remover(CHAVE_RASCUNHO),
};
