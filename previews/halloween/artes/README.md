# Estudos da arte principal — Stitch

Projeto: https://stitch.google.com/projects/6568277818132960064

As cinco artes usam como referência o logo de Halloween aprovado (`fotos/halloween/logo-halloween.webp`). Cachorro creme de orelhas caídas e gato laranja, ambos com chapéus de bruxa; paleta berinjela, abóbora, lilás e creme.

| Opção | Estilo | Tela no Stitch | Arquivo de arte |
| --- | --- | --- | --- |
| 1 | Cartoon 2D | `84ecf4a3878345f2b5e5a1b52223e476` | `cartoon-2d.webp` |
| 2 | 3D fofinho | `5807f0b8c9fe4beeba37ad4e6478c84f` | `3d-fofo.webp` |
| 3 | Aquarela | `9e8c2ec80b8f4887a04213e934b1d1b2` | `aquarela.webp` |
| 4 | Realista | `98fc240b4db04274bea45f770466ca88` | `realista.webp` |
| 5 | Vetor editorial | `3408c1073aec4e8b8e56fd5b4f1c3400` | `vetor-editorial.webp` |

Cada arquivo `*.html` é a exportação original da tela do Stitch; `*-stitch.png` registra a tela e `*-original.png` conserva a ilustração original gerada. As versões WebP apenas otimizam o formato para a comparação.

`../artes.html` aplica a opção selecionada ao mesmo topo do site mobile em um iframe local, permitindo julgar a integração com o layout real.

Em 02/10/2026 o usuário escolheu a **opção 3 — Aquarela**. Ela foi aplicada às capas mobile e desktop locais como `fotos/halloween/pets-aquarela.webp` (512 × 512). Os preloads usam o mesmo arquivo. A arte anterior e todas as cinco alternativas foram preservadas. Sem novo deploy.

## Correção da abertura

O texto “Um sustinho de fofura espera por você.” agora recebe a mesma animação de desaparecimento rápido do botão: começa aos 4,5 s e fica invisível aos 5,6 s. A regra anterior exigia uma classe que não existia no parágrafo. A revisão corrigida do teste Cloud Run é `pompom-site-halloween-preview-00003-47d`.
