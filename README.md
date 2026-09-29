# Laços que Unem

Site da ONG fictícia **Laços que Unem**, que apoia pessoas com câncer e suas famílias com acolhimento, doação de livros e uma rede de voluntários.

É uma **Single Page Application (SPA)** feita com HTML, CSS e JavaScript puro (sem frameworks), desenvolvida como projeto acadêmico do curso de Análise e Desenvolvimento de Sistemas.

🔗 **Site publicado:** https://vanessasimoesz.github.io/la-os-que-unem/

---

## Sumário

1. [Funcionalidades](#funcionalidades)
2. [Tecnologias](#tecnologias)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação e execução local](#instalação-e-execução-local)
5. [Estrutura de pastas](#estrutura-de-pastas)
6. [Páginas (rotas)](#páginas-rotas)
7. [Acessibilidade](#acessibilidade)
8. [Testes](#testes)
9. [Deploy](#deploy)
10. [Fluxo de trabalho com Git](#fluxo-de-trabalho-com-git)
11. [Autora](#autora)

---

## Funcionalidades

- Navegação entre páginas sem recarregar o site (roteamento por hash `#/`)
- Página de detalhe para cada projeto da ONG
- Números de impacto com animação de contagem (desativada para quem prefere menos movimento)
- Formulário de inscrição de voluntários com:
  - validação em tempo real e mensagem de erro por campo
  - máscara de telefone e contador de caracteres
  - rascunho salvo automaticamente
  - bloqueio de inscrição duplicada
- Inscrições salvas no navegador (`localStorage`), com opção de cancelar
- Página 404 para endereços inexistentes

## Tecnologias

| Tecnologia | Uso no projeto |
|---|---|
| **HTML5** | Estrutura semântica (`header`, `nav`, `main`, `aside`, `footer`) |
| **CSS3** | Variáveis (custom properties), Flexbox, Grid, media queries, `@font-face`, `prefers-reduced-motion` |
| **JavaScript (ES Modules)** | Roteador da SPA, sistema de templates com escape anti-XSS, validação de formulário |
| **localStorage** | Persistência das inscrições e do rascunho do formulário |
| **Git + GitHub** | Versionamento com GitFlow, issues, milestones e pull requests |
| **GitHub Pages** | Hospedagem e deploy |
| **Lighthouse / DevTools** | Auditoria de acessibilidade e desempenho |

Fontes: Fraunces (títulos) e Source Sans 3 (texto), hospedadas no próprio projeto.

## Pré-requisitos

- [Git](https://git-scm.com/) instalado
- Um navegador atualizado (Chrome, Edge ou Firefox)
- Um **servidor local**, por exemplo:
  - extensão **Live Server** do VS Code, **ou**
  - [Node.js](https://nodejs.org/) (para usar `npx serve`), **ou**
  - Python 3 (para usar `python -m http.server`)

> ⚠️ O site **não funciona abrindo o `index.html` com dois cliques**. Como o JavaScript usa módulos (`import`/`export`), o navegador bloqueia os arquivos quando abertos direto do disco (`file://`). É preciso um servidor local.

## Instalação e execução local

1. Clone o repositório:
   ```bash
   git clone https://github.com/vanessasimoesz/la-os-que-unem.git
   ```
2. Entre na pasta:
   ```bash
   cd la-os-que-unem
   ```
3. Inicie um servidor local (escolha uma opção):
   - **VS Code:** clique com o botão direito no `index.html` → **Open with Live Server**
   - **Node.js:**
     ```bash
     npx serve .
     ```
   - **Python:**
     ```bash
     python -m http.server 8000
     ```
4. Abra no navegador o endereço exibido no terminal (ex.: `http://localhost:8000`).

O projeto não tem dependências para instalar: todos os arquivos (fontes, imagens, scripts) já estão no repositório.

## Estrutura de pastas

```
la-os-que-unem/
├── index.html          # esqueleto: cabeçalho, <main id="app"> e rodapé
├── css/style.css       # todos os estilos
├── fonts/              # Fraunces e Source Sans 3
├── img/                # logo, favicon e imagens
└── js/
    ├── app.js          # ponto de entrada: registra as rotas
    ├── base/           # o "motor" do site: roteador, templates, localStorage
    ├── conteudo/       # textos e dados do site (projetos, números)
    ├── regras/         # salvar e contar voluntários, calcular impacto
    ├── validacao/      # regras e motor de validação do formulário
    ├── componentes/    # peças reutilizáveis (cartão, números, aviso…)
    ├── paginas/        # uma página por arquivo
    └── ferramentas/    # funções auxiliares (formatação e máscaras)
```

## Páginas (rotas)

| Endereço | Página |
|---|---|
| `#/` | Início |
| `#/projetos` | Lista de projetos |
| `#/projetos/:id` | Detalhe de um projeto |
| `#/impacto` | Números de impacto e inscrições por projeto |
| `#/voluntario` | Formulário de inscrição |
| `#/voluntario/obrigado/:id` | Confirmação da inscrição |
| qualquer outro | Página 404 |

## Acessibilidade

O projeto segue as diretrizes da **WCAG 2.1, nível AA**. Recursos já implementados:

- Idioma da página declarado (`lang="pt-BR"`) e estrutura com landmarks semânticos
- A cada troca de página, o foco vai para o conteúdo principal e o título da aba é atualizado (leitores de tela anunciam a mudança)
- Link ativo do menu marcado com `aria-current="page"`
- Erros do formulário ligados ao campo (`aria-describedby`, `aria-invalid`) e foco levado ao primeiro erro
- Avisos com `role="status"` / `role="alert"`
- Imagens decorativas com `alt=""`
- Respeito a `prefers-reduced-motion`

As correções da auditoria WCAG são registradas nas issues com a label `acessibilidade`.

## Testes

O projeto não possui testes automatizados. A verificação é feita manualmente a cada entrega:

- **Lighthouse** (Chrome DevTools → aba Lighthouse), nas categorias Performance, Accessibility, Best Practices e SEO
- **Navegação só por teclado** (Tab, Shift+Tab, Enter, Esc) em todas as páginas
- **Telas pequenas:** DevTools → modo dispositivo em 320px de largura, e zoom de 200%
- **Formulário:** envio vazio (deve mostrar os erros), envio válido e tentativa de inscrição duplicada
- **Console** (F12) sem erros em todas as rotas

## Deploy

O site é publicado pelo **GitHub Pages** a partir da branch `master`:

- Configuração: **Settings → Pages → Deploy from a branch → `master` / `(root)`**
- Todo merge na `master` atualiza o site automaticamente em cerca de 1 minuto (acompanhe na aba **Actions**)
- Endereço: https://vanessasimoesz.github.io/la-os-que-unem/

## Fluxo de trabalho com Git

### Branches (GitFlow)

| Branch | Função |
|---|---|
| `master` | Versões estáveis, em produção (publicada no GitHub Pages). Nada é desenvolvido direto nela. |
| `develop` | Integração: recebe as funcionalidades concluídas antes de irem para produção. |
| `feature/*` | Uma branch por funcionalidade, criada a partir da `develop` (ex.: `feature/acessibilidade`). |
| `hotfix/*` | Correção urgente de falha em produção, criada a partir da `master` e integrada na `master` e na `develop`. |

Toda integração é feita por **Pull Request**, com descrição do que mudou e referência à issue (`Closes #n`).

### Mensagens de commit (Conventional Commits)

Formato: `tipo: descrição no imperativo`

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feat` | Nova funcionalidade | `feat: adiciona link para pular ao conteúdo` |
| `fix` | Correção de erro | `fix: corrige overflow da página Impacto` |
| `perf` | Melhoria de desempenho | `perf: converte fontes para WOFF2` |
| `docs` | Documentação | `docs: atualiza README` |
| `refactor` | Reorganização sem mudar comportamento | `refactor: renomeia pastas do JS` |
| `chore` | Manutenção | `chore: adiciona .gitignore` |

### Versionamento semântico

As versões seguem o padrão **MAJOR.MINOR.PATCH** e são marcadas com tags na `master`:

- **PATCH** (`0.1.1`): correção sem nova funcionalidade
- **MINOR** (`0.2.0`): nova funcionalidade compatível
- **MAJOR** (`1.0.0`): primeira versão estável ou mudança incompatível

A lista de versões está na página **Releases** do repositório.

## Autora

**Vanessa Simões** · Análise e Desenvolvimento de Sistemas
GitHub: [@vanessasimoesz](https://github.com/vanessasimoesz)

---

Projeto acadêmico, sem fins comerciais. A ONG Laços que Unem é fictícia.
