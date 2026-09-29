const MAPA_ESCAPE = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export function escaparHTML(valor) {
  return String(valor).replace(/[&<>"']/g, (c) => MAPA_ESCAPE[c]);
}

class HTMLSeguro {
  constructor(valor) { this.valor = valor; }
  toString() { return this.valor; }
}

export const raw = (texto) => new HTMLSeguro(texto);

function paraMarcacao(valor) {
  if (valor === null || valor === undefined || valor === false) return '';
  if (valor instanceof HTMLSeguro) return valor.valor;
  if (Array.isArray(valor)) return valor.map(paraMarcacao).join('');
  return escaparHTML(valor);
}

export function html(partes, ...valores) {
  const resultado = partes.reduce(
    (saida, parte, i) => saida + parte + (i < valores.length ? paraMarcacao(valores[i]) : ''),
    ''
  );
  return new HTMLSeguro(resultado);
}

export function render(alvo, template) {
  alvo.innerHTML = paraMarcacao(template);
}
