# Central de Natal · organização v41

Entrada única: `http://localhost:8011/previews/natal/?v=41`. Na rede, substituir localhost pelo IP do computador servidor. Servidor em 0.0.0.0:8011.

## Fluxo de trabalho

1. Use a navegação fixa para abrir **Entrada · Papai Noel** ou escolher uma das partes em **Experiência e conteúdo** e **Loja e produtos**.
2. O painel contextual mostra três propostas da parte selecionada. O celular ao lado mostra o resultado; mudar de parte pela navegação mantém o mesmo iframe vivo.
3. Teste uma proposta só nessa parte, ou use **Testar opção N em todas as partes** para aplicar às 16 partes e à abertura.
4. Compare com **Halloween · referência** ou **Lado a lado**, sempre acima dos celulares.
5. Use **Identidade e acabamentos** para as cinco artes dos mascotes, paletas e papéis das três fotos de campanha. O papel só aparece no contexto dos três cards; a arte da marca aparece na capa. O efeito da Kiara continua sendo magia sem presente.
6. **48 propostas e plano** reúne todas as capturas nomeadas e suas referências, com links para testar cada uma no laboratório.

A entrada tem link principal próprio e botão **Testar entrada / Repetir entrada** sempre acima do celular. Abrir `?parte=abertura&v=41` inicia a animação e mostra os controles de renas, repetição, pausa, momentos, escolha e outras aberturas. Não confundir entrada animada com capa do site.

## Organização visual

No computador, três áreas independentes: navegação de 212 px, painel contextual de 300 px e prévia flexível. Cada lateral tem rolagem própria. A prévia começa no topo e permite Natal/Halloween lado a lado, ampliar e escolher o tamanho do aparelho.

Até 1100 px, a navegação vira menu superior recolhível. Até 760 px, o celular fica acima dos controles com ambas as áreas disponíveis na tela. O menu tem aria-expanded e fechamento por Escape; links reais continuam funcionando por URL. Os grupos da navegação e o painel refletem a parte em teste. Um seletor compacto de partes também fica disponível no painel.

## Histórico

O arquivo reúne nove referências: laboratório de Natal v10, Natal mobile/desktop antigos, Halloween layouts, identidade, abertura, estilos dos mascotes, vitrine/avaliações e apresentação da identidade. As páginas históricas abrem dentro do arquivo, com a navegação externa disponível. Não se injeta outra barra em iframes. Links internos continuam dentro do visor, mantendo a central ao redor. Experimentos de layout e arte individuais continuam acessíveis pelos respectivos estudos de Halloween.

`ideias.html` encaminha ao laboratório; `layouts.html` ao planejamento. Parâmetros e âncora são mantidos, exceto mode antigo que não era usado. Navegar entre ferramentas preserva as escolhas; mudar uma proposta individual não apaga a combinação das outras partes. Estados ficam neste navegador e não são enviados a um servidor.

## Implementação e verificação

- `central/navegacao.js` e `.css`: navegação compartilhada, rotas e catálogo histórico.
- `central/laboratorio.js`: composição do painel contextual, ajustes recolhíveis e controles da prévia.
- `reset-lab.js`: estado existente e API local de seleção de partes, vistas e abertura. Emite `pompom:labstate` para sincronizar navegação e painel.
- `arquivo.html` e `central/arquivo.js`: visor histórico. O parâmetro pagina aceita apenas nove chaves conhecidas; não vira uma URL arbitrária de iframe.

`node tests/natal-navegacao.mjs` verifica rotas, escolhas preservadas, nove fontes históricas, iframe sem barra duplicada, chaves inválidas, menu/Escape, aliases, navegação contextual sem recarregar o iframe, entrada real e espaço de trabalho em 320/390/768/1100/1500 px. `node tests/natal-laboratorio.mjs` cobre controles, propostas globais, fotos, catálogo e comparação. Executar em sequência: os testes usam o mesmo armazenamento do perfil Chrome de teste. Ambos requerem servidor e CDP na porta 9237, configuráveis por POMPOM_TEST_URL/POMPOM_CDP_URL.

Conferidos screenshots desktop e mobile. Alteração restrita ao laboratório e documentação. Fotos, animações, estoque e site público preservados. Sem deploy Cloud Run.

## Acesso à arte dos mascotes · v42

O seletor de cinco artes do cachorro e gato saiu do acordeão e fica aberto na Capa, antes das propostas de layout. O menu principal tem **Arte do cachorro e gato** com acesso direto a `?parte=capa&v=42#art-section`. Paleta e papéis continuam em Identidade e acabamentos.

## Paleta aplicada integralmente · v43

Corrigidos fundos roxos/escuros herdados do Halloween nos cartões de fotos, vitrine, avaliações, contato, loja e rodapé. As regras anteriores de temas com seletores de ID tinham prioridade sobre a apresentação escolhida. Os alvos reais das seções agora dão prioridade aos estilos da proposta; superfícies internas usam as variáveis da própria seção, incluindo combinações de opções. A opção 1 usa vermelho natalino e dourado; a opção 2 mantém creme/vermelho e a 3 mantém seu cenário noturno intencional.

Rodapé passa a acompanhar a opção de Contato. Fotos, inventário, estrutura, magia e animação não foram alterados. As 48 capturas foram atualizadas. O teste do laboratório verifica cores computadas reais de elementos internos e do rodapé, além dos atributos de escolha.

Link `?conjunto=1&v=43` aplica a opção 1 às 16 partes e à abertura. Aceita conjuntos 1/2/3. O parâmetro é consumido e retirado da URL após aplicar, para que recarregar depois não apague eventuais ajustes individuais; a combinação fica no localStorage. A arte da marca e a abertura aprovada continuam independentes das opções em teste.

Verificação visual feita em Chrome temporário, sem SwiftShader. Encerrar o navegador de QA ao terminar, além das abas temporárias, para evitar consumo residual de animações em segundo plano.

## Fotos reais recebidas · v44

As quatro imagens fornecidas em natal 2026 foram incorporadas à prévia mobile e desktop: fachada, árvore e entrada empilhadas no segundo card de Natal na PomPom; Deisiane com o cachorro na apresentação dela. A pilha permite trazer cada foto à frente e pausa o carrossel ao interagir. A foto da Deisiane mostra o retrato inteiro, sem embrulho. O segundo card passa a se chamar Nossa loja · Pronta para o Natal; os cards de pets e lembranças continuam Em breve. Nosso espaço conserva as fotos padrão, conforme decisão anterior.

Arquivos, origem e destinos em `previews/natal/fotos-2026/README.md`. Novas fotos são protegidas por data-christmas-photo contra o papel. Teste `node tests/natal-fotos-reais.mjs` verifica quatro fontes, carregamento, pilha, papel, retrato, fotos padrão e larguras320/390/430/1440. Seis capturas afetadas foram atualizadas. O capturador aceita `POMPOM_CAPTURE_PARTS=natal,sobre` para atualizar só partes alteradas. O link `?parte=natal&destaque=loja&v=44` abre diretamente a loja no laboratório. Sem deploy Cloud Run.

A inicialização da apresentação de Natal ocorre quando o DOM está pronto, sem esperar o carregamento de todas as fotos, fontes e mapa para habilitar os controles do laboratório.
