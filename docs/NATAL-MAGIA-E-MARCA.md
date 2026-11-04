# Kiara: do Halloween ao Natal com um toque de varinha — revisão 30

O usuário rejeitou laço, caixa e papel de presente nesta interação. A foto aparece livre, e um toque/click com a varinha dispara fumaça, estrelas e brilho para trocar de imagem. Esta decisão substitui os modos Laço mágico e Caixa surpresa da revisão 22. Os três cartões da campanha continuam com seu próprio embrulho; esta mudança pertence apenas à transformação.

## Par confirmado pelo usuário

O usuário escolheu a Kiara, Shih-tzu branca, e confirmou expressamente as duas fotos candidatas:

- Halloween: `fotos/datas-comemorativas/halloween/IMG_4076.JPG.webp`, com laço laranja de bruxinha.
- Natal do acervo: `fotos/datas-comemorativas/natal/87aac4ca-87cd-4aab-a735-b385b6ffd7b4.jpg.webp`, com gorro vermelho, galhinhos dourados e coleira vermelha.

Foi encontrada também a referência identificada `Pictures/Pompompet/copa/fotos/BRA-06-kiara.jpeg`, usada somente para comparar a identidade. A confirmação do usuário é a autoridade para o par escolhido; não foi necessário presumir o nome pelo visual. Não foi verificado metadado de ano dessas fotos: o site descreve como acervo, sem inventar uma data.

As duas fotos existentes são usadas diretamente, sem edição, geração, acessórios desenhados ou recorte dos arquivos. `object-fit: contain` preserva o enquadramento. A versão de Halloween já tem acessórios na própria foto, preservados como solicitado.

## Interação

A foto inteira é um botão acessível; mouse usa cursor de varinha, e uma varinha visível indica a interação no celular. O toque posiciona o efeito, dispara a magia e oculta a varinha no final. Enter/espaço e barra nativa permitem testar sem mouse; Repetir volta ao Halloween. A fumaça Canvas cobre o quadro antes da troca em 54% do progresso e depois se dissipa. O resultado é a foto natalina limpa. Movimento reduzido revela diretamente; retorno do histórico reinicia o estado.

`PomPomChristmasMagic.setPair('kiara',{before,after})` aceita somente imagens locais sob `/fotos/`, sem query/fragmento. A API muda apenas a prévia em memória; não faz upload nem altera arquivos. O placeholder de foto pendente continua disponível se um futuro par tiver after:null.

## Preservação e validação

A abertura com seis renas, paleta vermelho/dourado e mascotes aquarela permanece aprovada. Álbums, bolinhas, estoque, scripts públicos, CSP, Nginx, Dockerfile e Cloud Run não foram alterados. Escopo local de prévia; sem novos domínios ou bibliotecas na aplicação.

`node tests/natal-magia.mjs` usa Chrome temporário via CDP e servidor local: verifica par da Kiara, ausência de embrulho, imagens decodificadas, troca sob fumaça opaca inclusive no canto, mouse real, teclado, slider, reset, movimento reduzido, validação da origem, placeholder e larguras 320/390/430. Capturas de antes, fumaça e depois foram conferidas.

Entrada: `/previews/natal/?parte=magia&v=30`.

## Exportação da logo para Instagram

A arte aquarela escolhida foi exportada sem alteração como `~/Downloads/PomPom-Natal-Aquarela-Instagram.png`, 1254 × 1254 px. É uma cópia binária de `previews/natal/artes/aquarela.png` (SHA-256 41d77c1fe0879a393e4569e73ebfbd2151e42813867bd91874d0e86c00e70fa6). A cópia de Downloads não faz parte do repositório; a origem já está versionada.

## Efeito visível e pesquisa — revisão 30

O usuário considerou o efeito anterior imperceptível. Foi identificado um salto de tempo: a mola inicial usava timestamp menos zero, integrando até 200 ms no primeiro quadro e avançando abruptamente o progresso. A reprodução agora usa uma sequência de 3400 ms, com o primeiro quadro no progresso atual, sem avanço. Ocultar a aba pausa o relógio; ao retornar, a animação continua. Slider, reset e API cancelam o relógio corretamente.

Canvas desenha três órbitas de energia, ponto de contato, 92 partículas/estrelas e 30 nuvens com sprites reutilizados. A varinha se aproxima do toque antes de disparar o encanto. A foto troca sob a cobertura opaca aos 54%; a nuvem sobe e se dispersa até o final. O Canvas fica transparente e para de solicitar quadros ao concluir. As fotos não são usadas como texturas ou modificadas.

Pesquisa em documentação primária:

- [MDN — animações JavaScript e requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Performance/JavaScript): atualização sincronizada com pintura e interrupção de trabalho desnecessário.
- [MDN — fundamentos de desempenho](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Fundamentals): Canvas para conteúdo visual dinâmico.
- [PixiJS — ParticleContainer](https://pixijs.com/8.x/guides/components/scene-objects/particle-container): alternativa considerada para grandes sistemas de partículas. Não foi adicionada: a quantidade deste efeito permite manter o desenho Canvas já existente, sem novo download de biblioteca.
- [MDN — movimento reduzido](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/%40media/prefers-reduced-motion): preferência preservada, com revelação direta.

O efeito é código local, sem CDN, rastreamento, upload, eval ou novas permissões na aplicação. DPR máximo 1,5; nuvens pré-desenhadas em três sprites 192 × 192; trabalho limitado à interação e resize. Testes confirmam progressão dos primeiros dez quadros reais, sem salto inicial, além das verificações do par, cobertura, entrada, teclado e responsividade. Isso valida no Chrome local, sem prometer o mesmo FPS em todo aparelho.

## Aprovação do efeito

O usuário aprovou por enquanto a sequência v30 e pediu mantê-la como está, acrescentando os próximos pares de antes/depois conforme forem enviados. Kiara é o primeiro par. Não redesenhar o efeito ao cadastrar novas fotos. Os pares devem pertencer ao mesmo pet e ter a identidade confirmada. Cadastro persistente no objeto `pets` de `previews/natal/magia/magia.js`; a API `setPair` serve apenas para teste em memória.
