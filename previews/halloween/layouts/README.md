# Laboratório de layouts mobile — Halloween

## Nova rodada: vitrine e avaliações

O comparador agora tem **nove partes e 27 opções**, incluindo três novas vitrines com duas linhas de produtos e três apresentações das avaliações. Os protótipos são interativos e preservam a loja atual; a integração Google não foi realizada. Números demonstrativos identificados, cenários de nota 4/desconectado e limites para afirmar unanimidade. Detalhes e fontes oficiais: [LOJA-E-AVALIACOES.md](../LOJA-E-AVALIACOES.md). Todas as seis telas novas também estão preservadas no Stitch, com IDs no `estudos.json`.

Projeto Stitch: https://stitch.google.com/projects/3957235714949665270

Comparador: `../layouts.html` (servido pelo servidor local). Três alternativas para sete partes: menu, capa, serviços, galeria, lojinha, apresentação e contato. Escopo mobile. A aquarela escolhida, o **menu 2** e o **contato 2** foram aplicados ao site mobile local. Esta revisão ainda não foi publicada.

## Arquivos preservados

- `*-atual.png`: capturas de referência do site real, já com aquarela.
- `*-original.html` e `*-stitch.png`: exportações originais intactas do Stitch.
- `parte-N.html`: protótipos revisados; imagens provisórias substituídas pela aquarela e fotos reais da PomPom, links WhatsApp corrigidos, preços/alegações inventados retirados. São experimentos visuais, não páginas de produção. Algumas interações são apenas representativas.
- `parte-N.png`: renderizações revisadas em viewport 390 × 844, também enviadas ao Stitch com título **VALIDADO mobile com assets PomPom**. Preferir estas telas no canvas, especialmente na galeria que originalmente veio com renderização desktop.
- `estudos.json`: ordem canônica das opções, nomes e IDs de proveniência.

## Verificação

As 21 telas renderizaram sem imagens quebradas, erros JavaScript ou overflow horizontal em 390px. Corrigidos selector CSS inválido gerado na lojinha 2 e overflow de decoração na apresentação 2. Comparador testado: sete abas, três opções por aba, zoom/fechar com Escape, seleção persistida, cópia de escolhas e layout sem overflow em celular. O teste usa contexto temporário isolado, sem gravar escolhas no navegador do usuário.

## Decisões de UX para a próxima rodada

O usuário aprovou **menu 2 — compacto** e **contato 2 — localização em destaque**. A opção 1 de menu conserva o padrão lateral; a 3 prioriza os atalhos inferiores, mas exige conciliar a barra com WhatsApp e área segura do iPhone. As demais seções mantêm o layout anterior, com a aquarela aprovada. É possível combinar opções de diferentes seções.

## Ajustes aprovados em 02/10/2026

- Menu compacto com seis destinos, ícones de linha, sem CTA WhatsApp redundante; acessível também no cabeçalho fixo ao rolar. Escape, retorno de foco, foco contido e clique fora preservados.
- Contato com mapa real, cartão de endereço, atalhos Google Maps/Waze, horários e bloco de redes sociais. Sem outro CTA WhatsApp: o flutuante foi mantido.
- Horário confirmado explicitamente: **terça a sábado, 9h–17h; fechado domingo e segunda**. A especificação estruturada do site já correspondia a esses dias.
- Instagram: `https://www.instagram.com/pompompet_esteticaanimal/`.
- TikTok informado pelo usuário: `https://www.tiktok.com/@deiisii.rodrigues`.
- Aviso **Lives todos os dias**, sem inventar horário para as lives.
- Capturas atualizadas `menu-2.png` e `contato-2.png`; exportações originais do Stitch intactas. “Abrir protótipo” dessas opções agora leva ao site real local.
- Teste funcional: menu no topo/ao rolar, seis destinos, foco/Escape, lojinha, links de redes, horário, ausência de WhatsApp duplicado nestas duas partes, botão flutuante mantido. Sem erros JS ou overflow nas larguras 320, 390 e 430px.

## Telas no Stitch

| Parte/opção | Composição | Original gerado | Revisado VALIDADO |
| --- | --- | --- | --- |
| Menu 1 | Painel lateral | `5cfcf0cd337b4382b91a449e225c443c` | `13097454256564653677` |
| Menu 2 | Menu compacto abaixo do topo | `82a7adf15ea740149e4ee1fc311c4c39` | `267576520002188532` |
| Menu 3 | Barra inferior + painel Mais | `ee0a60da006b4e76a0a293c964554f01` | `4460158058958685526` |
| Capa 1 | Editorial com aquarela | `5e1537760bc3486e8196ed48d86c066a` | `11001024769347005458` |
| Capa 2 | Capa imersiva | `8149c2a32a6045e38a43efc78557d29d` | `11628674663760482607` |
| Capa 3 | Capa compacta com atalhos | `3043a9eeab17432c832c6129daaf8488` | `7759975159503523883` |
| Serviços 1 | Cartões em duas colunas | `e814ec51c1854c1c97e3d01ef1cb31c9` | `4536108252157336428` |
| Serviços 2 | Acordeão de serviços | `d932ab9e3527441bba3f809ef100b2af` | `17091460137635975336` |
| Serviços 3 | Carrossel horizontal | `623eea49297740b3ab3acaed1e07dc69` | `8047366117127479415` |
| Galeria 1 | Mosaico com filtros | `2327472986904dfaa4277bb4e6a11080` | `2578133884286261963` |
| Galeria 2 | Stories e cartões deslizáveis | `d7ccf6ff15f949f299eccb790ae4c4f8` | `335842823292157859` |
| Galeria 3 | Abas com álbuns | `1e8f5f74f8d0486ea7093d62c30ff03f` | `8279609576791346137` |
| Lojinha 1 | Catálogo em painel inferior | `930873bb627f4c58a15649c503ff904e` | `1511560816400335798` |
| Lojinha 2 | Catálogo com busca | `2c0346e512ea4f2fbfe878e384ae3d9b` | `4425439787935524975` |
| Lojinha 3 | Lista com produto em destaque | `3e8f7c8aadcc488da573f0c92c76acbe` | `4460158058958687197` |
| Apresentação 1 | Retrato editorial | `eb7b87a1142d4cb895be7178ee8cd378` | `4087981209324588869` |
| Apresentação 2 | Cartão com trajetória | `d86b40b361a64a9fbbbdba52fcc5ec54` | `4259231491351373304` |
| Apresentação 3 | Blocos com indicadores | `9902bcaef18f4f9a8e21f7d7b971c769` | `12285938864172055137` |
| Contato 1 | Ações rápidas | `825f0863653343fdacd0cf16d75a7e0d` | `3512097727833795646` |
| Contato 2 | Mapa e localização em destaque | `9bd027b0c75c44d0ad93e76149d621d5` | `6255491994576876991` |
| Contato 3 | Ficha compacta com agendamento | `20bb681a93b543509503a9c8afc86f10` | `4245962534532158095` |
