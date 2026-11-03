# Natal — nova base de trabalho

Entrada única: `index.html`. A prévia usa `base-mobile.html` e `base-desktop.html`, copiados do código atual do site Halloween. O layout, as fotos e os componentes dessa base são preservados; os endereços originais das fotos ficam em `data-halloween-original` enquanto o papel cobre cada imagem.

O laboratório mantém o iframe interativo montado e visível. No desktop, apenas o painel de controles rola. No celular, a prévia ocupa a parte superior fixa e os controles rolam abaixo. Trocar papel ou paleta atualiza o iframe existente e preserva o ponto de navegação. Ampliar oferece uma vista maior.

## Controles

- Paleta: vermelho/dourado, vermelho/creme ou vermelho/verde pinheiro.
- Papel: Natal detalhado (novo padrão), vermelho/dourado, kraft/vermelho ou claro/vermelho.
- Navegação: capa, três cards de Natal, menu, serviços, apresentação, espaço, galeria, vitrine, avaliações, catálogo, produto, zoom e contato.
- Abertura manual: marca PomPom, brilho natalino e botão para entrar.
- Comparação: alterna para a base Halloween original e volta ao Natal.

Fotos de conteúdo, incluindo imagens adicionadas por galeria, carrossel, catálogo e ampliação, recebem o papel. Logotipos e ornamentos ficam visíveis. As faixas “Em breve” são sobreposições em HTML; não alteram o fluxo do layout. Os três cards mantêm os assuntos solicitados: fotos dos cachorros, pet enfeitado e lembranças aos clientes.

As quatro bolas de Natal continuam no topo, com brilho dourado suave e respeito a movimento reduzido. A nova estampa de papel tem relevo, estrelas, árvores, flocos, patinhas, folhagem e fitas com textura.

Arquivos ativos: `reset-lab.js`, `reset-lab.css`, `reset-theme.js`, `reset-theme.css`. A versão anterior do laboratório foi preservada em `historico-v10/` com os demais estudos e imagens ainda disponíveis na pasta de prévias. Os arquivos ativos permanecem fora do build público.

## Arte do novo papel

Ferramenta: `image_gen` integrada. Arquivo: `papeis/natal-detalhado.png`. Imagem em estilo fotográfico gerada, usada como embrulho de prévia.

## Escolha dos mascotes

O painel “Mascotes com fantasia de Natal” reaproveita os cinco estudos salvos em `artes/`: cartoon 2D, 3D fofinho, aquarela, realista estilizado e vetor editorial. O cachorro creme e o gato laranja mantêm a identidade do logo, com gorro de Natal e cachecol. A prévia troca a capa sem recriar o iframe e mantém o celular visível. “Escolher este estilo” registra uma decisão explícita no navegador (`approvedArt`), separada do estilo apenas em visualização (`art`).

Os mascotes da capa são exibidos sem papel de presente, conforme a etapa de escolha. As demais fotos continuam cobertas. Conferidos os cinco estilos, persistência da escolha, troca do papel sem cobrir os mascotes e ausência de rolagem horizontal em 390 px.

## Abertura: três cenas com Papai Noel

A seção de abertura oferece as direções cinematográfica, aquarela noturna e profundidade, todas com o texto aprovado para estudo, trenó e renas em silhueta e desaparecimento atrás da lua. Usa GSAP e SVG em camadas, com biblioteca local sob demanda. O laboratório permite repetir, pausar e conferir três momentos da cena, além de registrar a abertura escolhida. Guia: `abertura/README.md`.
