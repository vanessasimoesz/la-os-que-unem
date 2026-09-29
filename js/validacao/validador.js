const estaVazio = (valor) => (Array.isArray(valor) ? valor.length === 0 : !String(valor ?? '').trim());

export const regras = {
  obrigatorio: (mensagem = 'Campo obrigatório.') => (valor) => (estaVazio(valor) ? mensagem : ''),

  minimo: (n) => (valor) =>
    estaVazio(valor) || valor.trim().length >= n ? '' : `Use pelo menos ${n} caracteres.`,

  maximo: (n) => (valor) =>
    String(valor ?? '').length <= n ? '' : `Máximo de ${n} caracteres (você usou ${valor.length}).`,

  somenteLetras: () => (valor) =>
    estaVazio(valor) || /^[A-Za-zÀ-ÿ\s'.-]+$/.test(valor.trim()) ? '' : 'Use apenas letras.',

  nomeCompleto: () => (valor) =>
    estaVazio(valor) || valor.trim().split(/\s+/).length >= 2 ? '' : 'Informe nome e sobrenome.',

  email: () => (valor) =>
    estaVazio(valor) || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor.trim()) ? '' : 'Digite um e-mail válido, como nome@email.com.',

  telefone: () => (valor) => {
    if (estaVazio(valor)) return '';
    const digitos = valor.replace(/\D/g, '').length;
    return digitos === 10 || digitos === 11 ? '' : 'Telefone incompleto: informe DDD + número.';
  },

  personalizada: (condicao, mensagem) => (valor, valores) =>
    !estaVazio(valor) && condicao(valor, valores) ? mensagem : '',
};

export function criarValidador(form, esquema) {
  const tocados = new Set();
  const nomes = Object.keys(esquema);

  function valores() {
    const checkboxes = [...form.querySelectorAll('input[type="checkbox"]')].map((c) => c.name);
    const grupos = new Set(checkboxes.filter((nome, i) => checkboxes.indexOf(nome) !== i));

    const dados = {};
    grupos.forEach((nome) => { dados[nome] = []; });
    for (const [nome, valor] of new FormData(form)) {
      if (grupos.has(nome)) dados[nome].push(valor);
      else dados[nome] = valor;
    }
    return dados;
  }

  const campoDe = (nome) => form.querySelector(`[name="${nome}"]`);

  function exibir(nome, erro, valor) {
    const grupo = campoDe(nome).closest('.campo');
    form.querySelector(`[data-erro="${nome}"]`).textContent = erro;
    grupo.classList.toggle('campo-invalido', Boolean(erro));
    grupo.classList.toggle('campo-valido', !erro && !estaVazio(valor));
    form.querySelectorAll(`[name="${nome}"]`).forEach((el) => el.setAttribute('aria-invalid', String(Boolean(erro))));
  }

  function limpar(nome) {
    form.querySelector(`[data-erro="${nome}"]`).textContent = '';
    campoDe(nome).closest('.campo').classList.remove('campo-invalido', 'campo-valido');
    form.querySelectorAll(`[name="${nome}"]`).forEach((el) => el.removeAttribute('aria-invalid'));
  }

  function validarCampo(nome) {
    const todos = valores();
    const valor = todos[nome] ?? '';
    const erro = esquema[nome].map((regra) => regra(valor, todos)).find(Boolean) || '';
    exibir(nome, erro, valor);
    return !erro;
  }

  function validarTudo() {
    nomes.forEach((nome) => tocados.add(nome));
    const invalidos = nomes.filter((nome) => !validarCampo(nome));
    if (invalidos.length) campoDe(invalidos[0]).focus();
    return invalidos;
  }

  form.addEventListener('focusout', (e) => {
    const nome = e.target.name;
    if (!nomes.includes(nome)) return;
    if (e.relatedTarget?.name === nome) return;
    tocados.add(nome);
    validarCampo(nome);
  });

  form.addEventListener('input', () => tocados.forEach(validarCampo));
  form.addEventListener('change', () => tocados.forEach(validarCampo));

  return { validarTudo, limpar, valores, nomes };
}
