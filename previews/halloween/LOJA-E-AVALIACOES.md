# Estudos da vitrine e das avaliações — 02/10/2026

Criados somente para a página de exemplos. **Nenhuma alteração no site principal, nas artes ou no deploy** nesta rodada. A loja existente foi preservada.

Comparação: `layouts.html#vitrine` e `layouts.html#avaliacoes`. Prototipação interativa: `experimento.html?parte=vitrine&opcao=1` ou `experimento.html?parte=avaliacoes&opcao=1` (opções 1–3).

## Vitrine

1. Modelo de fotos redondas do catálogo, agora em duas linhas/6 itens, dentro de um único card clicável. Recomendação inicial por preservar o padrão atual.
2. Fotos quadradas em duas linhas, com etiquetas de categorias e card clicável.
3. Duas linhas deslizáveis horizontalmente, com 8 itens. O gesto de arrastar não abre a loja; o clique/toque e o teclado abrem.

Todos usam as fotos reais do catálogo em `pompom-produtos` e abrem o modal existente do site local. A seta, o texto “Toque no card” e a faixa “Ver loja completa” tornam a ação explícita. Sem inventar preço, disponibilidade ou identidade do produto. A abertura por teclado e o fechamento com Escape também foram testados.

## Avaliações

1. Nota em destaque e um depoimento com anterior/próximo.
2. Resumo compacto e carrossel de depoimentos com leitura expandida.
3. Selo percentual, distribuição por estrelas e seis depoimentos expansíveis.

**A integração Google não está conectada.** O aviso aparece no controle e dentro de cada proposta. Os números são cenários sintéticos: seis notas 5; seis notas 5 mais uma nota 4; ou sem dados. Os textos e os autores são os seis depoimentos já presentes no site; não foram inventados, atualizados ou apresentados como importação ao vivo. As idades relativas antigas foram omitidas. O link abre uma busca de perfil no Maps, não presume um Place ID confirmado.

O exemplo “100%” refere-se a **avaliações com cinco estrelas**, nunca a satisfação de todos os clientes/atendimentos. Não se deve inferir unanimidade de uma média arredondada 5,0, de uma seleção de comentários positivos ou de uma página incompleta.

## Conectar o Google depois da escolha

- [Google Business Profile — listar todas as avaliações](https://developers.google.com/my-business/content/review-data): exige aplicação registrada e OAuth da conta que administra o perfil.
- [reviews.list](https://developers.google.com/my-business/reference/rest/v4/accounts.locations.reviews/list): localização verificada, paginação (até 50 por página), `averageRating`, `totalReviewCount`, `nextPageToken`. Buscar todas as páginas, deduplicar por review ID e comparar com o total antes de afirmar unanimidade. Filtrar as avaliações 5 **depois** de calcular a distribuição geral; identificar ao usuário a seleção e a ordenação.
- [Places API — Place resource](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places): `reviews` retorna **no máximo cinco** avaliações por relevância, portanto não é a fonte para validar que todas as avaliações são 5.
- Na integração real, credenciais/tokens devem ficar em um backend, não no HTML do site. Registrar a data da consulta, atualizar métricas e respeitar atribuições/políticas da API escolhida. Esta rodada não habilitou APIs, não criou credenciais nem custos e não acessou o perfil da empresa.
- A propriedade `canClaimAllFive` do helper da prévia só é verdadeira quando há conjunto completo, não vazio, total coerente, todas as notas 5 e verificação explícita. Os cenários demonstrativos não estão verificados.

## Verificação

As seis telas passaram em 320, 390 e 430px, sem overflow ou erros JavaScript. Testados: duas linhas de produtos, card abre catálogo real, sete categorias, troca de categoria, teclado/Enter, Escape, carrossel de depoimentos, expansão, cenário com nota 4, cenário desconectado e bloqueio de unanimidade para dados vazios, parciais ou não verificados. Capturas em `layouts/vitrine-*.png` e `layouts/avaliacoes-*.png`. Comparador ampliado de 21 para 27 propostas em nove partes.
