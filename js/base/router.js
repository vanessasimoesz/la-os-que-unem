export function criarRoteador({ outlet, rotas, naoEncontrada, aoMudar }) {
  const rotasCompiladas = rotas.map((rota) => ({ ...rota, ...compilar(rota.caminho) }));
  let controlador = null;
  let primeiraCarga = true;

  function compilar(caminho) {
    const chaves = [];
    const padrao = caminho.replace(/:(\w+)/g, (_, chave) => {
      chaves.push(chave);
      return '([^/]+)';
    });
    return { regex: new RegExp(`^${padrao}/?$`), chaves };
  }

  function lerHash() {
    const bruto = location.hash.slice(1) || '/';
    const [caminho, busca = ''] = bruto.split('?');
    return {
      caminho: caminho || '/',
      query: Object.fromEntries(new URLSearchParams(busca)),
    };
  }

  function encontrar(caminho) {
    for (const rota of rotasCompiladas) {
      const achou = caminho.match(rota.regex);
      if (achou) {
        try {
          const params = {};
          rota.chaves.forEach((chave, i) => { params[chave] = decodeURIComponent(achou[i + 1]); });
          return { rota, params };
        } catch {
          return { rota: naoEncontrada, params: {} };
        }
      }
    }
    return { rota: naoEncontrada, params: {} };
  }

  function resolver() {
    const { caminho, query } = lerHash();
    const { rota, params } = encontrar(caminho);

    controlador?.abort();
    controlador = new AbortController();

    outlet.classList.remove('view-entrando');
    rota.view.montar(outlet, { params, query, navegar, signal: controlador.signal });
    document.title = rota.titulo ? `${rota.titulo} · Laços que Unem` : 'Laços que Unem';

    void outlet.offsetWidth;
    outlet.classList.add('view-entrando');

    if (!primeiraCarga) {
      window.scrollTo(0, 0);
      outlet.focus({ preventScroll: true }); 
    }
    primeiraCarga = false;

    aoMudar?.(caminho);
  }

  function navegar(caminho) {
    const destino = `#${caminho}`;
    if (location.hash === destino) resolver();
    else location.hash = destino;
  }

  function iniciar() {
    window.addEventListener('hashchange', resolver);
    if (!location.hash) history.replaceState(null, '', '#/');
    resolver();
  }

  return { iniciar, navegar };
}
