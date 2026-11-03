# Carrossel de destaque — Halloween na PomPom

Implementado em `mobile.html` e `desktop.html`, substituindo o bloco estático pelo carrossel. Publicado no oficial em 07/10/2026 após aprovação da revisão 5; detalhes e reversão em [PUBLICACAO-CARROSSEL-2026-10-07.md](PUBLICACAO-CARROSSEL-2026-10-07.md).

O primeiro card preserva “Pequenos monstros. Grandes fofuras.” e os três pets juntos, conforme a primeira versão aprovada. Os seguintes mostram fachada, recepção, cantinho de espera e abóbora, com textos próprios e link para contato. Fotos originais preservadas na pasta Pictures; cópias otimizadas WebP em `fotos/halloween/ambiente/`.

- `halloween-showcase.js`: conteúdo, ciclo automático a cada 5,5 segundos, setas laterais, gesto horizontal e pausa. Removidas as bolinhas e a navegação inferior; embaixo fica somente Pausar/Continuar. Revisão 5: setas sutis de 25px, sem fundo claro, borda ou sombra, centralizadas verticalmente nos dois lados do card. Área de toque de 44px preservada, sem alterar seu tamanho.
- `halloween-showcase.css`: layout fixo entre slides e fotos inteiras sem cortes. Revisão 3: restaurado tamanho da primeira versão (fotos de ambiente com 155px no mobile, 249px no desktop); removida galeria individual dos pets. Todo o card, incluindo fundo, borda, textos, fotos e controles, desliza lateralmente em 780ms via Web Animations. A revisão 2, com fotos maiores, foi rejeitada pelo usuário.
- Pausa quando fora da tela, com aba oculta, mouse sobre o card, foco dentro ou tema normal. Preferência de movimento reduzido desativa a passagem automática inicial.
- Tema normal continua sem o bloco e sem a abertura de Halloween. Laboratório existente utiliza as páginas reais e já reflete esta mudança.
- Sem scripts/eventos inline ou dependências novas no site; compatível com a política de segurança existente.

Prévia: `http://localhost:8000/previews/` ou `http://localhost:8000/mobile.html?previewThemes=1&theme=halloween&opening=none`.

Validação:

```sh
POMPOM_TEST_NODE_MODULES=/caminho/para/node_modules node tests/showcase.mjs
POMPOM_TEST_NODE_MODULES=/caminho/para/node_modules node tests/themes.mjs
POMPOM_TEST_NODE_MODULES=/caminho/para/node_modules node tests/security.mjs
```

O teste do carrossel usa Playwright e Chrome instalado no Mac. `POMPOM_TEST_BROWSER` e `POMPOM_TEST_URL` permitem outro executável e servidor. Verifica fotos, cinco cards, controles, passagem automática, pausa, altura constante, largura sem transbordamento, tema normal e movimento reduzido.

O teste verifica altura constante, animação do painel com fundo próprio e restauração das três fotos dos pets juntas. A largura é verificada no carrossel: a página desktop já tinha transbordamento temporário nas animações de outras seções, fora desta alteração.
