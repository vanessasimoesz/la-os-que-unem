export function marcarMenuAtivo(caminho) {
  document.querySelectorAll('header [data-rota]').forEach((link) => {
    const ativo = caminho.startsWith(link.dataset.rota);
    if (ativo) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
}
