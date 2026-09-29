export function toast(mensagem, tipo = 'sucesso') {
  const area = document.getElementById('toasts');
  if (!area) return;

  const aviso = document.createElement('div');
  aviso.className = `toast toast-${tipo}`;
  aviso.setAttribute('role', tipo === 'erro' ? 'alert' : 'status');
  aviso.textContent = mensagem;
  area.append(aviso);

  setTimeout(() => aviso.classList.add('saindo'), 3500);
  setTimeout(() => aviso.remove(), 3900);
}