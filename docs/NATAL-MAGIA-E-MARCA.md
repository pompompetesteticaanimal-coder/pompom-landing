# Laço mágico, caixa surpresa e marca de Natal — revisão 21

Pedidos de 03/11/2026: substituir o comparador que revelava monstros por uma experiência de presente/laço/varinha natalina; aplicar no cabeçalho a logo natalina escolhida e enfeitar o nome PomPom Pet.

## Experiência

A prévia substitui visualmente o comparador mobile, preservando o código e o DOM anterior escondidos para referência. O desktop recebe o mesmo estudo acima dos álbuns. Dois modos:

- Laço mágico: foto original visível com fita dourada; puxar o laço o transforma em uma varinha e revela a composição natalina.
- Caixa surpresa: papel vermelho com detalhes dourados, tampa e laço; ao puxar, as partes do embrulho se afastam e revelam a composição.

Os quatro pets são Cacau, Lufi, Snoopy e Dexter, e Yoshi. O protótipo usa os arquivos antes.webp existentes e camadas SVG/CSS de gorros, luzes, enfeites, moldura e partículas. Não há foto nova gerada nem edição dos arquivos originais. A composição é uma brincadeira com acessórios ilustrados, indicada junto ao controle. Isso permite testar a interação antes de decidir as artes definitivas.

O usuário pode puxar para baixo, tocar no laço ou usar a barra nativa por mouse, toque e teclado. Puxada insuficiente volta ao estado inicial; acima do limiar, uma mola amortecida termina a revelação. A fita acompanha o gesto, vira varinha e produz um breve brilho com estrelas. Há reinício, seleção de pet e dos dois modos. Movimento reduzido termina sem animação longa; o evento de retorno pelo histórico reinicia a experiência. A interação também acompanha o dedo quando ele deixa a área visível do laço. Nenhuma biblioteca extra foi adicionada.

## Marca

`setArt` aplica a mesma arte de mascotes selecionada no laboratório à capa, à abertura e às imagens da marca nos cabeçalhos e rodapé. O cabeçalho do próprio laboratório também acompanha essa escolha. O texto e a fonte de PomPom Pet foram preservados; um SVG decorativo acrescenta gorro, azevinho, bolinhas e cordão de luz. Decoração não recebe cliques e fica fora da leitura assistiva. Movimento reduzido desliga o brilho pulsante. Não foi criada uma nova arte raster de logo.

## Preservação e segurança

A mudança está em `previews/natal/`. As fotos de álbuns, bolinhas e estoque mantêm as exceções aprovadas; os três cartões da campanha continuam embrulhados. O componente mágico também é excluído do embrulho geral. O observador da prévia agora reavalia imagens quando src muda ou quando elementos com imagens entram/saem do DOM; atualizações de texto da animação não provocam varreduras de todas as fotos a cada quadro.

Fotos e nomes dos pets vêm de uma lista fixa. Modos e chaves desconhecidas são ignorados; nomes são inseridos como texto. Recursos novos são locais. Não foram acrescentados eventos inline ou eval ao site. Catálogo, CSP/cabeçalhos, Nginx, Docker e Cloud Run não foram alterados; não houve deploy.

## Verificação

Chrome em perfil temporário: mobile/desktop, quatro pets, duas versões, revelação e varinha, reset, controle deslizante, logo acompanhando estilos, mudança de papel sem cobrir o componente, movimento reduzido e retorno pelo histórico. Arraste real por eventos de ponteiro abre e não fecha novamente por clique sintético; puxada curta retorna fechada; tecla End da barra abre. Laboratório conferido em 320, 390 e 430 px sem rolagem horizontal.

Teste reproduzível: com o servidor estático rodando e um Chrome temporário com CDP habilitado, execute `POMPOM_CDP_URL=http://127.0.0.1:9237 POMPOM_TEST_URL=http://127.0.0.1:8011 node tests/natal-magia.mjs`. Requer Node 22 ou superior. Não usa o perfil pessoal do navegador.

Entrada: `/previews/natal/?parte=magia&v=21`. Para conferir a marca na capa: `/previews/natal/?parte=capa&v=21`.
