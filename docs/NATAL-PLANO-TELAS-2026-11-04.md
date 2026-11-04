# Natal PomPom — plano de três propostas por parte

Pedido atual: usar o Halloween como referência de proporção, detalhe e organização, com três propostas nomeadas para cada parte. Não redesenhar toda a navegação ou a estrutura do site. As novas opções são estudos locais; não substituem automaticamente aprovações anteriores ou a produção.

## Direções

- **Natal em aquarela**: Vermelho profundo, pinheiros pintados, dourado delicado e personagens pequenos, próximos da proporção do Halloween.
- **Natal de papel**: Creme e vermelho, recortes em camadas, bordas de cartão e sombras suaves. Composição gráfica e artesanal.
- **Natal iluminado**: Bordô noturno, estrelas, luzes quentes e detalhes com volume. Arte menor em uma cena com mais respiro.

## Matriz das 48 telas

| Parte | Proposta 1 | Proposta 2 | Proposta 3 |
| --- | --- | --- | --- |
| Capa | Guirlanda em aquarela | Cartão recortado | Noite das Estrelas |
| Menu | Menu de veludo | Índice de Natal | Navegação iluminada |
| Natal na PomPom · três cards | Molduras de pinheiro | Postais de Natal | Janelas iluminadas |
| Serviços | Cuidados emoldurados | Cartões de cuidado | Medalhões de luz |
| Apresentação | Nossa história em aquarela | Carta da PomPom | História sob as estrelas |
| Nosso espaço | Álbum com pinheiros | Postais do nosso espaço | Nosso espaço iluminado |
| Magia da Kiara | Portal de Natal | Cartão encantado | Constelação mágica |
| Momentos do ano | Álbum de veludo | Memórias em papel | Lembranças estreladas |
| Bolinhas por tema | Trilhas de pinheiro | Etiquetas do álbum | Órbitas do ano |
| Vitrine | Vitrine clássica | Catálogo em cartões | Vitrine de luz |
| Avaliações | Carinho emoldurado | Cartas dos clientes | Cinco estrelas de Natal |
| Catálogo | Prateleira clássica | Fichas de papel | Prateleira iluminada |
| Produto ampliado | Ficha clássica | Cartão do produto | Produto em destaque |
| Zoom do produto | Moldura clássica | Passe-partout de papel | Moldura noturna |
| Contato | Convite de Natal | Cartão de visita | Encontre a PomPom |
| Abertura | Teatro encantado | Recortes de Natal | Noite cinematográfica |

## O que muda e o que permanece

A estrutura e a sequência dos componentes seguem o site/Halloween atual. As variações mudam apresentação, molduras, tratamento de títulos, composição da capa, materiais, arte e ornamentos. Cada parte tem escolhas independentes, salvas no navegador. A capa usa três cenas novas e separadas da logo: mascotes pequenos em aquarela narrativa, cenário de papel recortado e vila em miniatura iluminada. A logo escolhida em aquarela permanece na marca.

As fotos de Nosso espaço são as originais padrão, excluídas do embrulho; apenas as molduras mudam. Fotos de estoque, bolinhas e álbuns não são alteradas. A magia da Kiara de 3,4 s permanece idêntica, com propostas só para a moldura. Abertura atual com seis renas de papel, Papai Noel ilustrado e contador continua disponível como primeira proposta; as outras duas são estudos já existentes do teatro inteiro de papel e da noite cinematográfica.

Os botões Natal/Halloween/Lado a lado ficam sempre acima da prévia. As duas telas navegam independentemente; o seletor de seção também leva a referência à seção equivalente quando ela existe. A página sem link de seção ignora a última parte salva e começa na capa. Ao voltar a Natal ou reiniciar, começa no topo; os celulares ficam alinhados pelo alto. Links explícitos de seção continuam funcionando para revisão.

## Referências

- Halloween local: previews/halloween/layouts/estudos.json, layouts.html e fotos/halloween/pets-aquarela.webp.
- Rifle Paper Co., cartões natalinos e ilustração pintada: https://riflepaperco.com/collections/holiday-greeting-cards .
- Meri Meri, recortes/camadas e ornamentos: https://merimerieu.com/collections/christmas .
- Ellie Hooi, ilustrações de pets em cenas/cartões: https://elliehooiillustration.com/products/christmas-dogs-card-pack-pack-of-4 .

Referências de direção, não fontes de assets copiados. As três capas foram geradas com imagegen a partir dos mascotes PomPom e da composição de Halloween do projeto; nenhuma foto real foi editada. PNGs e WebPs em previews/natal/sugestoes/artes/.

## Arquivos e revisão

Manifesto único: previews/natal/sugestoes/catalogo.js. Aplicação das variações: aplicar.js + layouts.css. Página de planejamento: previews/natal/planejamento.html. As 48 telas são capturas reais das variações locais em sugestoes/previas/, geradas com node scripts/capturar-natal-sugestoes.mjs usando servidor local e Chrome CDP temporário. O capturador verifica três propostas por parte, nomes únicos, apresentação distinta e fontes de fotos protegidas intactas.

Durante a revisão foi corrigida uma corrida da prévia ao fechar/reabrir o catálogo na troca de sugestão: usa as ações nativas, sem mudar scripts públicos nem as proteções da loja. A navegação de produto aguarda o catálogo; a alteração é somente no controlador local.

Sem deploy Cloud Run, sem modificação de arquivos de fotos, eventos públicos, CSP, Nginx ou Dockerfile. Tudo na branch codex/natal-laboratorio.

Planejamento: http://192.168.3.120:8011/previews/natal/planejamento.html . Comparação: http://192.168.3.120:8011/previews/natal/?comparar=lado-a-lado&v=37 .
