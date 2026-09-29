# Laços que Unem

Site da ONG Laços que Unem, transformado de uma página estática em uma
**Single Page Application** com HTML, CSS e JavaScript puro (sem frameworks).


## Páginas

| Endereço | Página |
|---|---|
| `#/` | Início (conteúdo original do site) |
| `#/projetos` | Lista de projetos |
| `#/projetos/:id` | Detalhe de um projeto |
| `#/impacto` | Números de impacto + inscrições por projeto |
| `#/voluntario` | Formulário de inscrição |
| `#/voluntario/obrigado/:id` | Confirmação da inscrição |
| qualquer outro | Página 404 |

## Requisitos

| Requisito | Onde |
|---|---|
| SPA com navegação fluida | `js/base/router.js`: rotas por hash, sem recarregar a página, com parâmetros, animação de transição e 404 |
| Sistema de templates JS | `js/base/template.js`: tag `html\`...\`` com escape automático (anti-XSS) e `render()`; o conteúdo vem de `js/conteudo/conteudo.js` |
| Validação com feedback | `js/validacao/validador.js` (regras reutilizáveis) + `js/paginas/voluntario.js`: mensagem por campo, borda vermelha/verde, foco no 1º erro, aviso com a quantidade de erros, contador de caracteres, máscara de telefone, bloqueio de inscrição duplicada |
| localStorage | `js/base/storage.js` + `js/regras/voluntarios.js`: inscrições, rascunho automático do formulário e cancelamento de inscrição |
| Código modular | pastas `base/`, `conteudo/`, `regras/`, `validacao/`, `componentes/`, `paginas/`, `ferramentas/` |

## Estrutura

PROJETO IV/
├── index.html          # esqueleto: cabeçalho, <main id="app"> e rodapé
├── css/style.css
├── fonts/              # Fraunces e Source Sans 3
├── img/                # logo e favicon
└── js/
    ├── app.js          # ponto de entrada: registra as rotas
    ├── base/           # o "motor" do site: roteador, templates, localStorage
    ├── conteudo/       # textos e dados do site (projetos, números)
    ├── regras/         # salvar e contar voluntários, calcular impacto
    ├── validacao/      # regras e motor de validação do formulário
    ├── componentes/    # peças reutilizáveis (cartão, números, toast…)
    ├── paginas/        # uma página por arquivo
    └── ferramentas/    # funções auxiliares (formatação e máscaras)

