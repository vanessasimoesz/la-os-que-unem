export const formatarNumero = (n) => n.toLocaleString('pt-BR', { maximumFractionDigits: 1 });

export function formatarImpacto(numero, formato) {
  if (formato === 'moeda') {
    return numero >= 1000 ? `R$ ${formatarNumero(numero / 1000)} mil` : `R$ ${formatarNumero(numero)}`;
  }
  return formatarNumero(numero);
}

export function mascaraTelefone(valor) {
  const d = valor.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const formatarData = (iso) =>
  new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

export const primeiroNome = (nome) => nome.trim().split(/\s+/)[0];
