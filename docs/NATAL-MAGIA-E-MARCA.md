# Laço, varinha e fumaça entre duas fotos — revisão 22

Correção do usuário em 03/11/2026: ele fornecerá fotos de antes e depois, como no Halloween. O pedido é mudar somente a forma da passagem entre essas duas imagens, com varinha, fumaça mágica e brilho. Os acessórios desenhados sobre o cachorro no estudo v21 foram retirados; essa abordagem está descartada.

## Fluxo atual

1. A foto do antes aparece com o laço. No modo Caixa surpresa, há também o embrulho vermelho/dourado.
2. Ao puxar ou tocar, o laço vira uma varinha e nasce uma nuvem de fumaça com estrelas.
3. A fumaça cobre completamente o quadro. Nesse momento, o componente troca para a foto do depois.
4. A nuvem se dispersa; varinha e partículas saem, deixando a foto do depois limpa, sem gorros, enfeites ou cenário desenhados sobre ela.

A troca ocorre em 54% do progresso, dentro do intervalo de cobertura opaca. A densidade da fumaça cresce de 22% a 44%, permanece alta até 63% e se dispersa até 96%. O slider permite inspecionar a passagem; o toque/arraste usa mola amortecida e subpassos para concluir a animação. Puxada curta retorna, botão repete e teclado funciona. Movimento reduzido revela diretamente sem fumaça animada. O evento de retorno histórico reinicia.

Canvas 2D desenha a fumaça por sprites de nuvens gerados em memória, com DPR limitado a 1,5. Não usa fotos como textura, não modifica imagens e não requer biblioteca extra. Os desenhos dos acessórios da versão anterior foram removidos do módulo e do CSS.

## Fotos pendentes

As fotos de Natal ainda serão fornecidas. A configuração inicial usa apenas fotos anteriores já existentes como demonstração do antes; o depois está nulo e mostra A foto do depois entra aqui. Não foi inventada, gerada ou publicada uma foto do depois como se fosse o resultado final.

Cada pet tem campos before/after no início de magia.js. Para testar em tempo de execução, o controlador aceita `PomPomChristmasMagic.setPair(chave, {before, after})`. Apenas arquivos de imagem na origem local e sob /fotos/ são aceitos; chave desconhecida, endereço externo, query ou fragmento são rejeitados. A API só muda a prévia em memória; não faz upload, não grava arquivo nem substitui a configuração persistida. Quando as fotos chegarem, adicionar os arquivos e atualizar os pares/nome dos pets.

O teste usa um par antigo de Halloween como fixture temporária para comprovar a troca entre duas fotos, sem gravar essa configuração no site. Depois restaura o placeholder. Esses arquivos não são apresentados como novas fotos de Natal.

## Marca mantida

A logo natalina continua sendo a mesma arte selecionada no laboratório para capa e abertura. Ela acompanha cabeçalho, sticky e rodapé. O nome PomPom Pet mantém texto/fonte com gorro, azevinho e cordão de luz decorativos em SVG; esses enfeites são da marca, não das fotos dos pets. O brilho respeita movimento reduzido.

## Preservação e segurança

Escopo em previews/natal/. Fotos de álbuns, bolinhas e estoque mantêm as exceções aprovadas; três cartões de campanha seguem embrulhados. O componente mágico também é excluído do embrulho geral. Catálogo, eventos públicos, CSP/cabeçalhos, Nginx, Dockerfile e fotos existentes ficaram intactos. Sem novos domínios, bibliotecas, eval ou eventos inline na aplicação. Sem deploy no Cloud Run.

## Verificação

Teste reproduzível: com servidor estático e Chrome temporário com CDP, executar `POMPOM_CDP_URL=http://127.0.0.1:9237 POMPOM_TEST_URL=http://127.0.0.1:8011 node tests/natal-magia.mjs` (Node 22+). Cobre mobile/desktop, ausência de acessórios, placeholder, configuração de um par real em memória, imagem do depois decodificada, troca sob fumaça opaca, origem permitida, dois modos, quatro pets de demonstração, mouse/ponteiro, teclado, reset, movimento reduzido, retorno histórico, estilos da logo e larguras 320/390/430.

Entrada: `/previews/natal/?parte=magia&v=22`. Marca na capa: `/previews/natal/?parte=capa&v=22`.
