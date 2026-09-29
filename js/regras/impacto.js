import { IMPACTO, PROJETOS } from '../conteudo/conteudo.js';
import { listar, contarPorProjeto } from './voluntarios.js';

export function numerosDeImpacto() {
  const inscritos = listar().length;
  return IMPACTO.map((item) =>
    item.chave === 'voluntarios' ? { ...item, numero: item.numero + inscritos } : item
  );
}

export function inscricoesPorProjeto() {
  return PROJETOS.map((p) => ({ id: p.id, titulo: p.titulo, total: contarPorProjeto(p.id) }));
}
