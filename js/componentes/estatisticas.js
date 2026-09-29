import { html } from '../base/template.js';
import { formatarImpacto } from '../ferramentas/formatacao.js';

export const estatisticas = (itens) => html`
  <div class="stats">
    ${itens.map((item) => html`
      <div class="stat">
        <span class="stat-number" data-contador="${item.numero}" data-formato="${item.formato ?? ''}">
          ${formatarImpacto(item.numero, item.formato)}
        </span>
        <span class="stat-label">${item.rotulo}</span>
      </div>`)}
  </div>`;

export function animarContadores(container, signal) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  container.querySelectorAll('[data-contador]').forEach((el) => {
    const alvo = Number(el.dataset.contador);
    const formato = el.dataset.formato;
    const duracao = 1000;
    const inicio = performance.now();

    function passo(agora) {
      if (signal?.aborted) return;
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const suavizado = 1 - (1 - progresso) ** 3;
      el.textContent = formatarImpacto(Math.round(alvo * suavizado), formato);
      if (progresso < 1) requestAnimationFrame(passo);
    }
    requestAnimationFrame(passo);
  });
}
