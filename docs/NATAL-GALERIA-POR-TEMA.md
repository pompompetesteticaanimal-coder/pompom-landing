# Galeria de bolinhas — fotos originais por tema

Em 03/11/2026 o usuário pediu preservar as fotos reais da galeria circular e separar cada linha por tema. A mudança foi aplicada nas bases mobile e desktop do laboratório de Natal, sem alterar arquivos de imagens ou publicar no Cloud Run.

Ordem das quatro fileiras:

1. Dia a dia — 21 fotos do dia a dia já usadas de `fotos/cachorros/`, conferidas visualmente.
2. Halloween — 17 fotos já usadas de `fotos/datas-comemorativas/halloween/`.
3. Natal — 14 fotos já usadas de `fotos/datas-comemorativas/natal/`.
4. Páscoa — 23 fotos já usadas de `fotos/datas-comemorativas/pascoa/` e fotos de Páscoa que estavam em `fotos/cachorros/`.

As fontes são exatamente as que estavam no HTML anterior. Não foram geradas, editadas, reprocessadas ou copiadas novas fotos. As imagens de Carnaval continuam na pasta; as quatro fileiras agora correspondem aos temas pedidos. Cada conjunto é duplicado apenas para continuidade do movimento; a cópia fica oculta das tecnologias assistivas. Os círculos, direções alternadas e apresentação existentes foram preservados. A duração acompanha o número de fotos para manter uma velocidade de leitura semelhante; a largura do trilho agora corresponde ao conjunto completo para percorrer todas as imagens.

`data-gallery-theme` identifica cada linha e exclui suas imagens do embrulho natalino de `reset-theme.js`. Essa preferência substitui o embrulho geral apenas na galeria circular. Os três cartões da campanha Natal na PomPom continuam com papel de presente e faixa Em breve, enquanto suas fotos não estão prontas.

Entrada: `/previews/natal/?parte=galeria&v=18`. O seletor Galeria · fotos por tema leva diretamente às fileiras. A abertura Teatro com personagens ilustrados continua disponível.

A pasta de cães misturava retratos do dia a dia e fotos de Páscoa. A seleção foi conferida visualmente: fotos com orelhas de coelho ou cenário de Páscoa foram movidas para a linha de Páscoa; duplicatas com os mesmos bytes foram evitadas sem alterar os arquivos.
