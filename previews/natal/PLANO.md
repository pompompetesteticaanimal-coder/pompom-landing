# Tema de Natal PomPom — plano local

**Estado:** estudos locais; nenhuma alteração no site publicado.

## Direção aprovada para os estudos

Usar como base a estrutura e a ordem de seções do site local no tema Halloween, que é a apresentação visual de referência. Preservar navegação, conteúdo, componentes, ações, fotos e composição atuais dessa versão. O estudo de Natal altera o acabamento sazonal: paleta, ornamentos e arte; não cria nem remove seções e não reorganiza cartões ou controles.

Vermelho rubi e bordô conduzem o tema. Creme e dourado equilibram os fundos e os detalhes. Verde aparece apenas em pequenos elementos de folhagem. As opções mantêm a mesma estrutura Halloween e comparam acabamentos, não layouts diferentes.

## Etapas

1. Comparar a página Halloween e a apresentação de Natal lado a lado no laboratório local.
2. Usar o comparador de 12 partes para registrar paleta e ornamentos preferidos mantendo a mesma estrutura.
3. Exportar do Google Stitch apenas referências visuais compatíveis com a estrutura Halloween; importar os estudos em HTML/CSS em `previews/natal/opcoes/`.
4. Revisar em celular e desktop, inclusive contraste, movimento reduzido e abertura que pode ser dispensada.
5. Só depois de escolher, planejar a integração do tema no site; publicação será etapa separada.

## Abertura

Testar luzes, laço e boas-vindas dos pets em uma camada curta sobre a mesma marca, com botão de entrada visível, Escape e alternativa de movimento reduzido. A abertura não pode bloquear o site nem alterar a sequência de seções.

## Referências locais

- `layouts.html`: comparador de 12 partes e três acabamentos, com estrutura de referência explícita.
- `ideias.html`: apresentação interativa que carrega a página real local no tema Halloween e aplica a paleta de Natal só dentro da prévia.
- `../halloween/layouts.html`: comparador original Halloween.
- `../../mobile.html?previewThemes=1&theme=halloween&opening=none`: página Halloween sem abertura para comparação.
- `estudos.json`: opções e descrições.

O laboratório `previews/` permanece fora do build de produção.

## Laboratório consolidado

Entrada única: `index.html`. As antigas páginas `layouts.html` e `ideias.html` encaminham para os modos estático e interativo dessa entrada.

O laboratório oferece 16 telas de Natal, três opções por tela, capturas estáticas reais na pasta `telas/`, seleção explícita salva no navegador, revisão e cópia das escolhas. A mesma moldura de celular alterna entre captura estática e site interativo a qualquer momento. Também reúne as 12 partes e 36 estudos históricos do Halloween como referência.

Cobertura: capa, menu, serviços, galeria, lojinha, apresentação, espaço, contato, vitrine, avaliações, abertura, marca, catálogo aberto, produto ampliado, zoom e antes/depois histórico. Os arquivos `site-mobile.html` e `site-desktop.html` são cópias locais da estrutura atual; estilos e script de Natal aplicam a campanha apenas às cópias.

O modo interativo combina as escolhas de acabamento das seções suportadas e usa a opção selecionada para a abertura. A animação é dispensável; inclui entrada, pular, Escape e movimento reduzido. As capturas permanecem na largura 390; os tamanhos de celular selecionados são efetivos no site interativo.

Servidor na rede: `python3 -m http.server 8011 --bind 0.0.0.0`. Acessar `/previews/natal/` pelo IP atual do Mac.

## Arte da capa

A capa deve usar o cachorro creme e o gato laranja do logo, como no Halloween. Cinco variantes natalinas: cartoon 2D, 3D fofinho, aquarela, realista e vetor editorial. Referências, prompts e arquivos em `artes/README.md`. A etapa “Arte dos mascotes” foi adicionada ao laboratório consolidado; paleta e estilo são escolhas independentes.

## Revisão de layouts e fotos natalinas

As três opções de cada parte agora são composições, mantendo as mesmas seções do Halloween: clássico, claro com cartões/fotos e molduras natalinas. A paleta compartilhada é vermelho, creme, dourado e pequenos acentos de verde pinheiro. Foram eliminadas as opções de fundo berinjela/bordô como variação principal.

O modo Natal usa apenas o acervo `fotos/datas-comemorativas/natal/` nos blocos sazonais, mosaicos, carrossel e álbum. Não apresenta os pares artísticos do Halloween como se fossem Natal: essa área vira um álbum natalino real. Fotos institucionais e produtos permanecem reais. O modo Halloween mantém o material histórico original separado.

As novas capturas ficam em `telas-v6/`, com auditoria de fotos e arquivos, evitando reutilizar capturas antigas com temas misturados.

## Natal na PomPom — três cards ainda sem fotos

Os três slides do carrossel mantêm sua função: fotos dos cachorros no cenário natalino; pet enfeitado para Natal; lembranças para os clientes. Como essas fotos ainda não existem, todas as molduras dos três slides usam papel de presente natalino com faixa “Em breve”. Não usar fotos de anos anteriores para ilustrar esses conteúdos futuros. A galeria histórica continua separada. O laboratório inclui a tela “Natal na PomPom” para conferir cada card estático e no celular interativo.

O acabamento das fotos embrulhadas foi revisado para molduras douradas em relevo, com espessura lateral, luz/sombra, papel vermelho acetinado e laço volumoso. As faixas “Em breve” permanecem em todas as molduras dos três cards.

## Comparação de caixas de presente

A etapa “Estilos das caixas de presente” compara quatro imagens originais (veludo vermelho/dourado, kraft com laço vermelho, 3D com patinhas, caixa clara/laço vermelho), com quatro telas lado a lado e teste no celular. A escolha aplica o mesmo estilo aos três cards de Natal. Há 12 capturas correspondentes, todas com “Em breve”. Referências e prompts completos em `presentes/README.md`.

## Correção: formato fotográfico e medidas originais

As caixas pequenas isoladas foram substituídas por fotos retangulares inteiramente embrulhadas, com papel e fitas fotografados de ponta a ponta. As molduras, proporções, espaçamentos e quantidade repetem as fotos originais do Halloween. Medidas do mobile de 390 px conferidas no navegador: fotos comuns 146 × 110 px; foto principal de lembranças 300 × 169 px. Os quatro estilos permanecem comparáveis e os três cards mantêm a faixa “Em breve”. Arquivos atuais: `presentes/fotos/`.
